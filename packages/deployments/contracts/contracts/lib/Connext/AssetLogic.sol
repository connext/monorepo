// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {IWrapped} from "../../interfaces/IWrapped.sol";
import {IStableSwap} from "../../interfaces/IStableSwap.sol";
import {ConnextMessage} from "../../nomad-xapps/contracts/connext/ConnextMessage.sol";
import {ITokenRegistry} from "../../nomad-xapps/interfaces/bridge/ITokenRegistry.sol";

import {SafeERC20Upgradeable, IERC20Upgradeable, AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

library AssetLogic {
  error AssetLogic__handleIncomingAsset_notAmount();
  error AssetLogic__handleIncomingAsset_ethWithErcTransfer();
  error AssetLogic__transferAssetFromContract_notNative();

  /**
   * @notice Handles transferring funds from msg.sender to the Connext contract.
   * @dev If using the native asset, will automatically wrap
   * @param _assetId - The address to transfer
   * @param _assetAmount - The specified amount to transfer. May not be the
   * actual amount transferred (i.e. fee on transfer tokens)
   * @param _fee - The fee amount in native asset included as part of the transaction that
   * should not be considered for the transfer amount.
   * @param _wrapper - The address of the wrapper for the native asset on this domain
   * @return The assetId of the transferred asset
   * @return The amount of the asset that was seen by the contract (may not be the specifiedAmount
   * if the token is a fee-on-transfer token)
   */
  function handleIncomingAsset(
    address _assetId,
    uint256 _assetAmount,
    uint256 _fee,
    IWrapped _wrapper
  ) internal returns (address, uint256) {
    uint256 trueAmount = _assetAmount;

    if (_assetId == address(0)) {
      if (msg.value != _assetAmount + _fee) revert AssetLogic__handleIncomingAsset_notAmount();

      // When transferring native asset to the contract, always make sure that the
      // asset is properly wrapped
      wrapNativeAsset(_assetAmount, _wrapper);
      _assetId = address(_wrapper);
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
   * @param _wrapper - The address of the wrapper for the native asset on this domain
   */
  function wrapNativeAsset(uint256 _amount, IWrapped _wrapper) internal {
    _wrapper.deposit{value: _amount}();
  }

  /**
   * @notice Transfer asset funds from msg.sender to the Connext contract.
   * @param _assetId - The address to transfer
   * @param _amount - The specified amount to transfer
   * @return The amount of the asset that was seen by the contract
   */
  function transferAssetToContract(address _assetId, uint256 _amount) internal returns (uint256) {
    // Validate correct amounts are transferred
    uint256 starting = IERC20Upgradeable(_assetId).balanceOf(address(this));

    SafeERC20Upgradeable.safeTransferFrom(IERC20Upgradeable(_assetId), msg.sender, address(this), _amount);
    // Calculate the *actual* amount that was sent here
    return IERC20Upgradeable(_assetId).balanceOf(address(this)) - starting;
  }

  /**
   * @notice Handles transferring funds from msg.sender to the Connext contract.
   * @dev If using the native asset, will automatically unwrap
   * @param _assetId - The address to transfer
   * @param _to - The account that will receive the withdrawn funds
   * @param _amount - The amount to withdraw from contract
   * @param _wrapper - The address of the wrapper for the native asset on this domain
   */
  function transferAssetFromContract(
    address _assetId,
    address _to,
    uint256 _amount,
    IWrapped _wrapper
  ) internal {
    // No native assets should ever be stored on this contract
    if (_assetId == address(0)) revert AssetLogic__transferAssetFromContract_notNative();

    if (_assetId == address(_wrapper)) {
      // If dealing with wrapped assets, make sure they are properly unwrapped
      // before sending from contract
      _wrapper.withdraw(_amount);
      AddressUpgradeable.sendValue(payable(_to), _amount);
    } else {
      // Transfer ERC20 asset
      SafeERC20Upgradeable.safeTransfer(IERC20Upgradeable(_assetId), _to, _amount);
    }
  }

  /**
   * @notice Swaps an adopted asset to the local (representation or canonical) nomad asset
   * @dev Will not swap if the asset passed in is the local asset
   * @param _canonical - The canonical token
   * @param _pool - The StableSwap pool
   * @param _tokenRegistry - The local nomad token registry
   * @param _asset - The address of the adopted asset to swap into the local asset
   * @param _amount - The amount of the adopted asset to swap
   * @return The amount of local asset received from swap
   * @return The address of asset received post-swap
   */
  function swapToLocalAssetIfNeeded(
    ConnextMessage.TokenId memory _canonical,
    IStableSwap _pool,
    ITokenRegistry _tokenRegistry,
    address _asset,
    uint256 _amount
  ) internal returns (uint256, address) {
    // Check to see if the asset must be swapped because it is not the local asset
    if (_canonical.id == bytes32(0)) {
      // This is *not* the adopted asset, meaning it must be the local asset
      return (_amount, _asset);
    }

    // Get the local token for this domain (may return canonical or representation)
    address local = _tokenRegistry.getLocalAddress(_canonical.domain, _canonical.id);

    // if theres no amount, no need to swap
    if (_amount == 0) {
      return (_amount, local);
    }

    // Check the case where the adopted asset *is* the local asset
    if (local == _asset) {
      // No need to swap
      return (_amount, _asset);
    }

    // Approve pool
    SafeERC20Upgradeable.safeApprove(IERC20Upgradeable(_asset), address(_pool), _amount);

    // Swap the asset to the proper local asset
    return (_pool.swapExact(_amount, _asset, local), local);
  }

  /**
   * @notice Swaps a local nomad asset for the adopted asset using the stored stable swap
   * @dev Will not swap if the asset passed in is the adopted asset
   * @param _canonicalToAdopted - Mapping of adopted to canonical on this domain
   * @param _adoptedToLocalPools - Mapping holding the AMMs for swapping in and out of local assets
   * @param _tokenRegistry - The local nomad token registry
   * @param _asset - The address of the local asset to swap into the adopted asset
   * @param _amount - The amount of the local asset to swap
   * @return The amount of adopted asset received from swap
   * @return The address of asset received post-swap
   */
  function swapFromLocalAssetIfNeeded(
    mapping(bytes32 => address) storage _canonicalToAdopted,
    mapping(bytes32 => IStableSwap) storage _adoptedToLocalPools,
    ITokenRegistry _tokenRegistry,
    address _asset,
    uint256 _amount
  ) internal returns (uint256, address) {
    // Get the token id
    (, bytes32 id) = _tokenRegistry.getTokenId(_asset);

    // If the adopted asset is the local asset, no need to swap
    address adopted = _canonicalToAdopted[id];
    if (adopted == _asset) {
      return (_amount, _asset);
    }

    // Approve pool
    IStableSwap pool = _adoptedToLocalPools[id];
    SafeERC20Upgradeable.safeApprove(IERC20Upgradeable(_asset), address(pool), _amount);

    // Otherwise, swap to adopted asset
    return (pool.swapExact(_amount, _asset, adopted), adopted);
  }
}
