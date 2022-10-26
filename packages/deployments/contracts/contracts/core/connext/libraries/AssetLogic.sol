// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {SafeERC20, Address} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {TypeCasts} from "../../../shared/libraries/TypeCasts.sol";

import {IStableSwap} from "../interfaces/IStableSwap.sol";

import {LibConnextStorage, AppStorage, TokenId} from "./LibConnextStorage.sol";
import {SwapUtils} from "./SwapUtils.sol";

library AssetLogic {
  // ============ Libraries ============

  using SwapUtils for SwapUtils.Swap;

  // ============ Errors ============

  error AssetLogic__handleIncomingAsset_nativeAssetNotSupported();
  error AssetLogic__handleIncomingAsset_feeOnTransferNotSupported();
  error AssetLogic__handleOutgoingAsset_notNative();
  error AssetLogic__swapToLocalAssetIfNeeded_swapPaused();
  error AssetLogic__swapFromLocalAssetIfNeeded_swapPaused();
  error AssetLogic__getTokenIndexFromStableSwapPool_notExist();

  // ============ Internal: Handle Transfer ============

  /**
   * @notice Handles transferring funds from msg.sender to the Connext contract.
   * @dev Does NOT work with fee-on-transfer tokens: will revert.
   *
   * @param _asset - The address of the ERC20 token to transfer.
   * @param _amount - The specified amount to transfer.
   */
  function handleIncomingAsset(address _asset, uint256 _amount) internal {
    // Sanity check: if amount is 0, do nothing.
    if (_amount == 0) {
      return;
    }
    // Sanity check: asset address is not zero.
    if (_asset == address(0)) {
      revert AssetLogic__handleIncomingAsset_nativeAssetNotSupported();
    }

    // Record starting amount to validate correct amount is transferred.
    uint256 starting = IERC20(_asset).balanceOf(address(this));

    // Transfer asset to contract.
    SafeERC20.safeTransferFrom(IERC20(_asset), msg.sender, address(this), _amount);

    // Ensure correct amount was transferred (i.e. this was not a fee-on-transfer token).
    if (IERC20(_asset).balanceOf(address(this)) - starting != _amount) {
      revert AssetLogic__handleIncomingAsset_feeOnTransferNotSupported();
    }
  }

  /**
   * @notice Handles transferring funds from the Connext contract to msg.sender.
   * @param _asset - The address of the ERC20 token to transfer.
   * @param _to - The recipient address that will receive the funds.
   * @param _amount - The amount to withdraw from contract.
   */
  function handleOutgoingAsset(
    address _asset,
    address _to,
    uint256 _amount
  ) internal {
    // Sanity check: if amount is 0, do nothing.
    if (_amount == 0) {
      return;
    }
    // Sanity check: asset address is not zero.
    if (_asset == address(0)) revert AssetLogic__handleOutgoingAsset_notNative();

    // Transfer ERC20 asset to target recipient.
    SafeERC20.safeTransfer(IERC20(_asset), _to, _amount);
  }

  // ============ Internal: StableSwap Pools ============

  /**
   * @notice Return the index of the given token address. Reverts if no matching
   * token is found.
   * @param key the hash of the canonical id and domain
   * @param tokenAddress address of the token
   * @return the index of the given token address
   */
  function getTokenIndexFromStableSwapPool(bytes32 key, address tokenAddress) internal view returns (uint8) {
    AppStorage storage s = LibConnextStorage.connextStorage();
    uint8 index = s.tokenIndexes[key][tokenAddress];
    if (address(s.swapStorages[key].pooledTokens[index]) != tokenAddress)
      revert AssetLogic__getTokenIndexFromStableSwapPool_notExist();
    return index;
  }

  // ============ Internal: Handle Swap ============

  /**
   * @notice Swaps an adopted asset to the local (representation or canonical) nomad asset.
   * @dev Will not swap if the asset passed in is the local asset.
   * @param _key - The hash of canonical id and domain.
   * @param _asset - The address of the adopted asset to swap into the local asset.
   * @param _amount - The amount of the adopted asset to swap.
   * @param _slippage - The maximum amount of slippage user will take on from _amount in BPS.
   * @return uint256 The amount of local asset received from swap.
   */
  function swapToLocalAssetIfNeeded(
    bytes32 _key,
    address _asset,
    address _local,
    uint256 _amount,
    uint256 _slippage
  ) internal returns (uint256) {
    // If there's no amount, no need to swap.
    if (_amount == 0) {
      return _amount;
    }

    // Check the case where the adopted asset *is* the local asset. If so, no need to swap.
    if (_local == _asset) {
      return _amount;
    }

    // Swap the asset to the proper local asset.
    (uint256 out, ) = _swapAsset(
      _key,
      _asset,
      _local,
      _amount,
      calculateSlippageBoundary(ERC20(_asset).decimals(), ERC20(_local).decimals(), _amount, _slippage)
    );
    return out;
  }

  /**
   * @notice Swaps a local nomad asset for the adopted asset using the stored stable swap
   * @dev Will not swap if the asset passed in is the adopted asset
   * @param _key the hash of the canonical id and domain
   * @param _asset - The address of the local asset to swap into the adopted asset
   * @param _amount - The amount of the local asset to swap
   * @param _slippage - The minimum amount of slippage user will take on from _amount in BPS
   * @param _normalizedIn - The amount sent in on xcall to take the slippage from, in 18 decimals
   * by convention
   * @return The amount of adopted asset received from swap
   * @return The address of asset received post-swap
   */
  function swapFromLocalAssetIfNeeded(
    bytes32 _key,
    address _asset,
    uint256 _amount,
    uint256 _slippage,
    uint256 _normalizedIn
  ) internal returns (uint256, address) {
    AppStorage storage s = LibConnextStorage.connextStorage();

    // If the adopted asset is the local asset, no need to swap.
    address adopted = s.canonicalToAdopted[_key];
    if (adopted == _asset) {
      return (_amount, _asset);
    }

    // If there's no amount, no need to swap.
    if (_amount == 0) {
      return (_amount, adopted);
    }

    // Swap the asset to the proper local asset
    return
      _swapAsset(
        _key,
        _asset,
        adopted,
        _amount,
        // NOTE: To get the slippage boundary here, you must take the slippage % off of the
        // normalized amount in (at 18 decimals by convention), then convert that amount
        // to the proper decimals of adopted.
        calculateSlippageBoundary(uint8(18), ERC20(adopted).decimals(), _normalizedIn, _slippage)
      );
  }

  /**
   * @notice Swaps a local nomad asset for the adopted asset using the stored stable swap
   * @dev Will not swap if the asset passed in is the adopted asset
   * @param _key the hash of the canonical id and domain
   * @param _asset - The address of the local asset to swap into the adopted asset
   * @param _amount - The exact amount to receive out of the swap
   * @param _maxIn - The most you will supply to the swap
   * @return The amount of local asset put into  swap
   * @return The address of asset received post-swap
   */
  function swapFromLocalAssetIfNeededForExactOut(
    bytes32 _key,
    address _asset,
    uint256 _amount,
    uint256 _maxIn
  )
    internal
    returns (
      bool,
      uint256,
      address
    )
  {
    AppStorage storage s = LibConnextStorage.connextStorage();

    // If the adopted asset is the local asset, no need to swap.
    address adopted = s.canonicalToAdopted[_key];
    if (adopted == _asset) {
      return (true, _amount, _asset);
    }

    return _swapAssetOut(_key, _asset, adopted, _amount, _maxIn);
  }

  /**
   * @notice Swaps assetIn to assetOut using the stored stable swap or internal swap pool.
   * @dev Will not swap if the asset passed in is the adopted asset
   * @param _key - The canonical token id
   * @param _assetIn - The address of the from asset
   * @param _assetOut - The address of the to asset
   * @param _amount - The amount of the local asset to swap
   * @param _minOut - The minimum amount of `_assetOut` the user will accept
   * @return The amount of assetOut
   * @return The address of assetOut
   */
  function _swapAsset(
    bytes32 _key,
    address _assetIn,
    address _assetOut,
    uint256 _amount,
    uint256 _minOut
  ) internal returns (uint256, address) {
    AppStorage storage s = LibConnextStorage.connextStorage();

    // Retrieve internal swap pool reference.
    SwapUtils.Swap storage ipool = s.swapStorages[_key];

    if (ipool.exists()) {
      // Swap via the internal pool.
      return (
        ipool.swapInternal(
          getTokenIndexFromStableSwapPool(_key, _assetIn),
          getTokenIndexFromStableSwapPool(_key, _assetOut),
          _amount,
          _minOut
        ),
        _assetOut
      );
    } else {
      // Otherwise, swap via external stableswap pool.
      IStableSwap pool = s.adoptedToLocalPools[_key];

      SafeERC20.safeApprove(IERC20(_assetIn), address(pool), 0);
      SafeERC20.safeIncreaseAllowance(IERC20(_assetIn), address(pool), _amount);

      // NOTE: If pool is not registered here, then this call will revert.
      return (pool.swapExact(_amount, _assetIn, _assetOut, _minOut, block.timestamp + 3600), _assetOut);
    }
  }

  /**
   * @notice Swaps assetIn to assetOut using the stored stable swap or internal swap pool.
   * @param _key - The hash of the canonical id and domain.
   * @param _assetIn - The address of the from asset.
   * @param _assetOut - The address of the to asset.
   * @param _amountOut - The amount of the _assetOut to swap.
   * @param _maxIn - The most you will supply to the swap.
   * @return success Success value. Will be false if the swap was unsuccessful (slippage too
   * high).
   * @return amountIn The amount of assetIn. Will be 0 if the swap was unsuccessful (slippage
   * too high).
   * @return assetOut The address of assetOut.
   */
  function _swapAssetOut(
    bytes32 _key,
    address _assetIn,
    address _assetOut,
    uint256 _amountOut,
    uint256 _maxIn
  )
    internal
    returns (
      bool success,
      uint256 amountIn,
      address assetOut
    )
  {
    AppStorage storage s = LibConnextStorage.connextStorage();

    assetOut = _assetOut;

    // Retrieve internal swap pool reference. If it doesn't exist, we'll resort to using an
    // external stableswap below.
    SwapUtils.Swap storage ipool = s.swapStorages[_key];

    // Swap the asset to the proper local asset.
    // NOTE: IFF slippage was too high to perform swap in either case: success = false, amountIn = 0
    if (ipool.exists()) {
      // Swap via the internal pool.
      uint8 tokenIndexIn = getTokenIndexFromStableSwapPool(_key, _assetIn);
      uint8 tokenIndexOut = getTokenIndexFromStableSwapPool(_key, _assetOut);

      // Calculate slippage before performing swap.
      // NOTE: This is less efficient then relying on the `swapInternalOut` revert, but makes it easier
      // to handle slippage failures (this can be called during reconcile, so must not fail).
      if (_maxIn >= ipool.calculateSwapInv(tokenIndexIn, tokenIndexOut, _amountOut)) {
        success = true;
        amountIn = ipool.swapInternalOut(tokenIndexIn, tokenIndexOut, _amountOut, _maxIn);
      }
    } else {
      // Otherwise, swap via external stableswap pool.
      IStableSwap pool = s.adoptedToLocalPools[_key];

      // NOTE: This call will revert if the external stableswap pool doesn't exist.
      uint256 _amountIn = pool.calculateSwapOutFromAddress(_assetIn, _assetOut, _amountOut);
      if (_amountIn <= _maxIn) {
        success = true;

        // Perform the swap.
        // Edge case with some tokens: Example USDT in ETH Mainnet, after the backUnbacked call
        // there could be a remaining allowance if not the whole amount is pulled by aave.
        // Later, if we try to increase the allowance it will fail. USDT demands if allowance
        // is not 0, it has to be set to 0 first.
        // Example: https://github.com/aave/aave-v3-periphery/blob/ca184e5278bcbc10d28c3dbbc604041d7cfac50b/contracts/adapters/paraswap/ParaSwapRepayAdapter.sol#L138-L140
        SafeERC20.safeApprove(IERC20(_assetIn), address(pool), 0);
        SafeERC20.safeIncreaseAllowance(IERC20(_assetIn), address(pool), _amountIn);
        amountIn = pool.swapExactOut(_amountOut, _assetIn, _assetOut, _maxIn, block.timestamp + 3600);
      }
    }
  }

  /**
   * @notice Calculate amount of tokens you receive on a local nomad asset for the adopted asset
   * using the stored stable swap
   * @dev Will not use the stored stable swap if the asset passed in is the local asset
   * @param _key - The hash of the canonical id and domain
   * @param _asset - The address of the local asset to swap into the local asset
   * @param _amount - The amount of the local asset to swap
   * @return The amount of local asset received from swap
   * @return The address of asset received post-swap
   */
  function calculateSwapFromLocalAssetIfNeeded(
    bytes32 _key,
    address _asset,
    uint256 _amount
  ) internal view returns (uint256, address) {
    AppStorage storage s = LibConnextStorage.connextStorage();

    // If the adopted asset is the local asset, no need to swap.
    address adopted = s.canonicalToAdopted[_key];
    if (adopted == _asset) {
      return (_amount, _asset);
    }

    SwapUtils.Swap storage ipool = s.swapStorages[_key];

    // Calculate the swap using the appropriate pool.
    if (ipool.exists()) {
      // Calculate with internal swap pool.
      uint8 tokenIndexIn = getTokenIndexFromStableSwapPool(_key, _asset);
      uint8 tokenIndexOut = getTokenIndexFromStableSwapPool(_key, adopted);
      return (ipool.calculateSwap(tokenIndexIn, tokenIndexOut, _amount), adopted);
    } else {
      // Otherwise, try to calculate with external pool.
      IStableSwap pool = s.adoptedToLocalPools[_key];
      // NOTE: This call will revert if no external pool exists.
      return (pool.calculateSwapFromAddress(_asset, adopted, _amount), adopted);
    }
  }

  /**
   * @notice Calculate amount of tokens you receive of a local nomad asset for the adopted asset
   * using the stored stable swap
   * @dev Will not use the stored stable swap if the asset passed in is the local asset
   * @param _asset - The address of the asset to swap into the local asset
   * @param _amount - The amount of the asset to swap
   * @return The amount of local asset received from swap
   * @return The address of asset received post-swap
   */
  function calculateSwapToLocalAssetIfNeeded(
    bytes32 _key,
    address _asset,
    address _local,
    uint256 _amount
  ) internal view returns (uint256, address) {
    AppStorage storage s = LibConnextStorage.connextStorage();

    // If the asset is the local asset, no swap needed
    if (_asset == _local) {
      return (_amount, _asset);
    }

    SwapUtils.Swap storage ipool = s.swapStorages[_key];

    // Calculate the swap using the appropriate pool.
    if (ipool.exists()) {
      // if internal swap pool exists
      uint8 tokenIndexIn = getTokenIndexFromStableSwapPool(_key, _asset);
      uint8 tokenIndexOut = getTokenIndexFromStableSwapPool(_key, _local);
      return (ipool.calculateSwap(tokenIndexIn, tokenIndexOut, _amount), _local);
    } else {
      IStableSwap pool = s.adoptedToLocalPools[_key];

      return (pool.calculateSwapFromAddress(_asset, _local, _amount), _local);
    }
  }

  // ============ Internal: Token ID Helpers ============

  /**
   * @notice Gets the canonical information for a given candidate.
   * @dev First checks the `address(0)` convention, then checks if the asset given is the
   * adopted asset, then calculates the local address.
   * @return TokenId The canonical token ID information for the given candidate.
   */
  function getCanonicalTokenId(address _candidate, AppStorage storage s) internal view returns (TokenId memory) {
    TokenId memory _canonical;
    // If candidate is address(0), return an empty `_canonical`.
    if (_candidate == address(0)) {
      return _canonical;
    }

    // Check to see if candidate is an adopted asset.
    _canonical = s.adoptedToCanonical[_candidate];
    if (_canonical.domain != 0) {
      // Candidate is an adopted asset, return canonical info.
      return _canonical;
    }

    // Candidate was not adopted; it could be the local address.
    // IFF this domain is the canonical domain, then the local == canonical.
    // Otherwise, it will be the representation asset.
    if (isLocalOrigin(_candidate, s)) {
      // The token originates on this domain, canonical information is the information
      // of the candidate
      _canonical.domain = s.domain;
      _canonical.id = TypeCasts.addressToBytes32(_candidate);
    } else {
      // on a remote domain, return the representation
      _canonical = s.representationToCanonical[_candidate];
    }
    return _canonical;
  }

  /**
   * @notice Determine if token is of local origin (i.e. it is a locally originating contract,
   * and NOT a token deployed by the bridge).
   * @param s AppStorage instance.
   * @return bool true if token is locally originating, false otherwise.
   */
  function isLocalOrigin(address _token, AppStorage storage s) internal view returns (bool) {
    // If the token contract WAS deployed by the bridge, it will be stored in this mapping.
    // If so, the token is NOT of local origin.
    if (s.representationToCanonical[_token].domain != 0) {
      return false;
    }
    // If the contract was NOT deployed by the bridge, but the contract does exist, then it
    // IS of local origin. Returns true if code exists at `_addr`.
    uint256 _codeSize;
    // solhint-disable-next-line no-inline-assembly
    assembly {
      _codeSize := extcodesize(_token)
    }
    return _codeSize != 0;
  }

  /**
   * @notice Get the local asset address for a given canonical key, id, and domain.
   * @param _key Canonical hash.
   * @param _id Canonical ID.
   * @param _domain Canonical domain.
   * @param s AppStorage instance.
   * @return address of the the local asset.
   */
  function getLocalAsset(
    bytes32 _key,
    bytes32 _id,
    uint32 _domain,
    AppStorage storage s
  ) internal view returns (address) {
    if (_domain == s.domain) {
      // Token is of local origin
      return TypeCasts.bytes32ToAddress(_id);
    } else {
      // Token is a representation of a token of remote origin
      return s.canonicalToRepresentation[_key];
    }
  }

  /**
   * @notice Calculates the hash of canonical ID and domain.
   * @dev This hash is used as the key for many asset-related mappings.
   * @param _id Canonical ID.
   * @param _domain Canonical domain.
   * @return bytes32 Canonical hash, used as key for accessing token info from mappings.
   */
  function calculateCanonicalHash(bytes32 _id, uint32 _domain) internal pure returns (bytes32) {
    return keccak256(abi.encode(_id, _domain));
  }

  // ============ Internal: Math ============

  /**
   * @notice This function calculates slippage as a %age of the amount in, and normalizes
   * That to the `_out` decimals.
   *
   * @dev This *ONLY* works for 1:1 assets
   *
   * @param _in The decimals of the asset in / amount in
   * @param _out The decimals of the target asset
   * @param _amountIn The starting amount for the swap
   * @param _slippage The slippage allowed for the swap, in BPS
   * @return uint256 The minimum amount out for the swap
   */
  function calculateSlippageBoundary(
    uint8 _in,
    uint8 _out,
    uint256 _amountIn,
    uint256 _slippage
  ) internal pure returns (uint256) {
    if (_amountIn == 0) {
      return 0;
    }
    // Get the min recieved (in same decimals as _amountIn)
    uint256 min = (_amountIn * (10_000 - _slippage)) / 10_000;
    return normalizeDecimals(_in, _out, min);
  }

  /**
   * @notice This function translates the _amount in _in decimals
   * to _out decimals
   *
   * @param _in The decimals of the asset in / amount in
   * @param _out The decimals of the target asset
   * @param _amount The value to normalize to the `_out` decimals
   * @return uint256 Normalized decimals.
   */
  function normalizeDecimals(
    uint8 _in,
    uint8 _out,
    uint256 _amount
  ) internal pure returns (uint256) {
    if (_in == _out) {
      return _amount;
    }
    // Convert this value to the same decimals as _out
    uint256 normalized;
    if (_in < _out) {
      normalized = _amount * (10**(_out - _in));
    } else {
      normalized = _amount / (10**(_in - _out));
    }
    return normalized;
  }
}
