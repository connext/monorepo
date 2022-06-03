// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {SafeERC20, IERC20, Address} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {IWrapped} from "../interfaces/IWrapped.sol";
import {IStableSwap} from "../interfaces/IStableSwap.sol";
import {ITokenRegistry} from "../interfaces/ITokenRegistry.sol";

import {ConnextMessage} from "./ConnextMessage.sol";
import {LibConnextStorage, AppStorage, PausedFunctions} from "./LibConnextStorage.sol";
import {SwapUtils} from "./SwapUtils.sol";

library AssetLogic {
  using SwapUtils for SwapUtils.Swap;

  error AssetLogic__handleIncomingAsset_notAmount();
  error AssetLogic__handleIncomingAsset_ethWithErcTransfer();
  error AssetLogic__transferAssetFromContract_notNative();
  error AssetLogic__swapToLocalAssetIfNeeded_swapPaused();
  error AssetLogic__swapFromLocalAssetIfNeeded_swapPaused();
  error AssetLogic__getTokenIndexFromStableSwapPool_notExist();

  /**
   * @notice Check if the stabelswap pool exists or not
   * @param canonicalId the canonical token id
   */
  function stableSwapPoolExist(bytes32 canonicalId) internal view returns (bool) {
    AppStorage storage s = LibConnextStorage.connextStorage();
    return s.swapStorages[canonicalId].pooledTokens.length != 0;
  }

  /**
   * @notice Return the index of the given token address. Reverts if no matching
   * token is found.
   * @param canonicalId the canonical token id
   * @param tokenAddress address of the token
   * @return the index of the given token address
   */
  function getTokenIndexFromStableSwapPool(bytes32 canonicalId, address tokenAddress) internal view returns (uint8) {
    AppStorage storage s = LibConnextStorage.connextStorage();
    uint8 index = s.tokenIndexes[canonicalId][tokenAddress];
    if (address(s.swapStorages[canonicalId].pooledTokens[index]) != tokenAddress)
      revert AssetLogic__getTokenIndexFromStableSwapPool_notExist();
    return index;
  }

  /**
   * @notice Handles transferring funds from msg.sender to the Connext contract.
   * @dev If using the native asset, will automatically wrap
   * @param _assetId - The address to transfer
   * @param _assetAmount - The specified amount to transfer. May not be the
   * actual amount transferred (i.e. fee on transfer tokens)
   * @param _fee - The fee amount in native asset included as part of the transaction that
   * should not be considered for the transfer amount.
   * @return The assetId of the transferred asset
   * @return The amount of the asset that was seen by the contract (may not be the specifiedAmount
   * if the token is a fee-on-transfer token)
   */
  function handleIncomingAsset(
    address _assetId,
    uint256 _assetAmount,
    uint256 _fee
  ) internal returns (address, uint256) {
    AppStorage storage s = LibConnextStorage.connextStorage();

    uint256 trueAmount = _assetAmount;

    if (_assetId == address(0)) {
      if (msg.value != _assetAmount + _fee) revert AssetLogic__handleIncomingAsset_notAmount();

      // When transferring native asset to the contract, always make sure that the
      // asset is properly wrapped
      wrapNativeAsset(_assetAmount);
      _assetId = address(s.wrapper);
    } else {
      if (msg.value != _fee) revert AssetLogic__handleIncomingAsset_ethWithErcTransfer();

      // Transfer asset to contract
      trueAmount = transferAssetToContract(_assetId, _assetAmount);
    }

    return (_assetId, trueAmount);
  }

  /**
   * @notice Wrap the native asset
   * @param _amount - The specified amount to wrap
   */
  function wrapNativeAsset(uint256 _amount) internal {
    AppStorage storage s = LibConnextStorage.connextStorage();

    s.wrapper.deposit{value: _amount}();
  }

  /**
   * @notice Transfer asset funds from msg.sender to the Connext contract.
   * @param _assetId - The address to transfer
   * @param _amount - The specified amount to transfer
   * @return The amount of the asset that was seen by the contract
   */
  function transferAssetToContract(address _assetId, uint256 _amount) internal returns (uint256) {
    // Validate correct amounts are transferred
    uint256 starting = IERC20(_assetId).balanceOf(address(this));

    SafeERC20.safeTransferFrom(IERC20(_assetId), msg.sender, address(this), _amount);
    // Calculate the *actual* amount that was sent here
    return IERC20(_assetId).balanceOf(address(this)) - starting;
  }

  /**
   * @notice Handles transferring funds from msg.sender to the Connext contract.
   * @dev If using the native asset, will automatically unwrap
   * @param _assetId - The address to transfer
   * @param _to - The account that will receive the withdrawn funds
   * @param _amount - The amount to withdraw from contract
   */
  function transferAssetFromContract(
    address _assetId,
    address _to,
    uint256 _amount
  ) internal {
    AppStorage storage s = LibConnextStorage.connextStorage();

    // No native assets should ever be stored on this contract
    if (_assetId == address(0)) revert AssetLogic__transferAssetFromContract_notNative();

    if (_assetId == address(s.wrapper)) {
      // If dealing with wrapped assets, make sure they are properly unwrapped
      // before sending from contract
      s.wrapper.withdraw(_amount);
      Address.sendValue(payable(_to), _amount);
    } else {
      // Transfer ERC20 asset
      SafeERC20.safeTransfer(IERC20(_assetId), _to, _amount);
    }
  }

  /**
   * @notice Swaps an adopted asset to the local (representation or canonical) nomad asset
   * @dev Will not swap if the asset passed in is the local asset
   * @param _canonical - The canonical token
   * @param _asset - The address of the adopted asset to swap into the local asset
   * @param _amount - The amount of the adopted asset to swap
   * @return The amount of local asset received from swap
   * @return The address of asset received post-swap
   */
  function swapToLocalAssetIfNeeded(
    ConnextMessage.TokenId memory _canonical,
    address _asset,
    uint256 _amount
  ) internal returns (uint256, address) {
    AppStorage storage s = LibConnextStorage.connextStorage();

    // Check to see if the asset must be swapped because it is not the local asset
    if (_canonical.id == bytes32(0)) {
      // This is *not* the adopted asset, meaning it must be the local asset
      return (_amount, _asset);
    }

    // Get the local token for this domain (may return canonical or representation)
    address local = s.tokenRegistry.getLocalAddress(_canonical.domain, _canonical.id);

    // if theres no amount, no need to swap
    if (_amount == 0) {
      return (_amount, local);
    }

    // Check the case where the adopted asset *is* the local asset
    if (local == _asset) {
      // No need to swap
      return (_amount, _asset);
    }

    // NOTE: Normally, this would be checked via the `whenSwapNotPaused` modifier (as in the
    // StableSwapFacet). However, when entering an internal swap, the best place to check
    // is in these swap functions where swaps can be stopped. You can check here for only
    // swap pauses (general pauses are checked before this function is called)
    if (s._paused == PausedFunctions.Swap) revert AssetLogic__swapToLocalAssetIfNeeded_swapPaused();

    // Swap the asset to the proper local asset
    return _swapAsset(_canonical.id, _asset, local, _amount);
  }

  /**
   * @notice Swaps a local nomad asset for the adopted asset using the stored stable swap
   * @dev Will not swap if the asset passed in is the adopted asset
   * @param _asset - The address of the local asset to swap into the adopted asset
   * @param _amount - The amount of the local asset to swap
   * @return The amount of adopted asset received from swap
   * @return The address of asset received post-swap
   */
  function swapFromLocalAssetIfNeeded(address _asset, uint256 _amount) internal returns (uint256, address) {
    AppStorage storage s = LibConnextStorage.connextStorage();

    // Get the token id
    (, bytes32 id) = s.tokenRegistry.getTokenId(_asset);

    // If the adopted asset is the local asset, no need to swap
    address adopted = s.canonicalToAdopted[id];
    if (adopted == _asset) {
      return (_amount, _asset);
    }

    // NOTE: Normally, this would be checked via the `whenSwapNotPaused` modifier (as in the
    // StableSwapFacet). However, when entering an internal swap, the best place to check
    // is in these swap functions where swaps can be stopped. You can check here for only
    // swap pauses (general pauses are checked before this function is called)
    if (s._paused == PausedFunctions.Swap) revert AssetLogic__swapFromLocalAssetIfNeeded_swapPaused();

    // Swap the asset to the proper local asset
    return _swapAsset(id, _asset, adopted, _amount);
  }

  /**
   * @notice Swaps assetIn t assetOut using the stored stable swap or internal swap pool
   * @dev Will not swap if the asset passed in is the adopted asset
   * @param _canonicalId - The canonical token id
   * @param _assetIn - The address of the from asset
   * @param _assetOut - The address of the to asset
   * @param _amount - The amount of the local asset to swap
   * @return The amount of assetOut
   * @return The address of assetOut
   */
  function _swapAsset(
    bytes32 _canonicalId,
    address _assetIn,
    address _assetOut,
    uint256 _amount
  ) internal returns (uint256, address) {
    AppStorage storage s = LibConnextStorage.connextStorage();

    // Swap the asset to the proper local asset

    if (stableSwapPoolExist(_canonicalId)) {
      // if internal swap pool exists
      uint8 tokenIndexIn = getTokenIndexFromStableSwapPool(_canonicalId, _assetIn);
      uint8 tokenIndexOut = getTokenIndexFromStableSwapPool(_canonicalId, _assetOut);
      return (s.swapStorages[_canonicalId].swapInternal(tokenIndexIn, tokenIndexOut, _amount, 0), _assetOut);
    } else {
      // Otherwise, swap via stable swap pool
      IStableSwap pool = s.adoptedToLocalPools[_canonicalId];
      SafeERC20.safeApprove(IERC20(_assetIn), address(pool), _amount);

      return (pool.swapExact(_amount, _assetIn, _assetOut), _assetOut);
    }
  }
}
