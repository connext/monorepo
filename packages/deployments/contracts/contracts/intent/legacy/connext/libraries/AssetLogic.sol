// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

import {TypeCasts} from "../../../shared/libraries/TypeCasts.sol";

import {IStableSwap} from "../interfaces/IStableSwap.sol";

import {LibConnextStorage, AppStorage, TokenConfig} from "./LibConnextStorage.sol";
import {Constants} from "./Constants.sol";
import {TokenId} from "./TokenId.sol";

library AssetLogic {
  // ============ Libraries ============

  using SwapUtils for SwapUtils.Swap;
  using SafeERC20 for IERC20Metadata;

  // ============ Errors ============

  error AssetLogic__handleIncomingAsset_nativeAssetNotSupported();
  error AssetLogic__handleIncomingAsset_feeOnTransferNotSupported();
  error AssetLogic__handleOutgoingAsset_notNative();
  error AssetLogic__getTokenIndexFromStableSwapPool_notExist();
  error AssetLogic__getConfig_notRegistered();
  error AssetLogic__swapAsset_externalStableSwapPoolDoesNotExist();

  // ============ Internal: Handle Transfer ============

  function getConfig(bytes32 _key) internal view returns (TokenConfig storage) {
    AppStorage storage s = LibConnextStorage.connextStorage();
    TokenConfig storage config = s.tokenConfigs[_key];

    // Sanity check: not empty
    // NOTE: adopted decimals will *always* be nonzero (or reflect what is onchain
    // for the asset). The same is not true for the representation assets, which
    // will always have 0 decimals on the canonical domain
    if (config.adoptedDecimals < 1) {
      revert AssetLogic__getConfig_notRegistered();
    }

    return config;
  }

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

    IERC20Metadata asset = IERC20Metadata(_asset);

    // Record starting amount to validate correct amount is transferred.
    uint256 starting = asset.balanceOf(address(this));

    // Transfer asset to contract.
    asset.safeTransferFrom(msg.sender, address(this), _amount);

    // Ensure correct amount was transferred (i.e. this was not a fee-on-transfer token).
    if (asset.balanceOf(address(this)) - starting != _amount) {
      revert AssetLogic__handleIncomingAsset_feeOnTransferNotSupported();
    }
  }

  /**
   * @notice Handles transferring funds from the Connext contract to a specified address
   * @param _asset - The address of the ERC20 token to transfer.
   * @param _to - The recipient address that will receive the funds.
   * @param _amount - The amount to withdraw from contract.
   */
  function handleOutgoingAsset(address _asset, address _to, uint256 _amount) internal {
    // Sanity check: if amount is 0, do nothing.
    if (_amount == 0) {
      return;
    }
    // Sanity check: asset address is not zero.
    if (_asset == address(0)) revert AssetLogic__handleOutgoingAsset_notNative();

    // Transfer ERC20 asset to target recipient.
    SafeERC20.safeTransfer(IERC20Metadata(_asset), _to, _amount);
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
   * @notice This function translates the _amount in _in decimals
   * to _out decimals
   *
   * @param _in The decimals of the asset in / amount in
   * @param _out The decimals of the target asset
   * @param _amount The value to normalize to the `_out` decimals
   * @return uint256 Normalized decimals.
   */
  function normalizeDecimals(uint8 _in, uint8 _out, uint256 _amount) internal pure returns (uint256) {
    if (_in == _out) {
      return _amount;
    }
    // Convert this value to the same decimals as _out
    uint256 normalized;
    if (_in < _out) {
      normalized = _amount * (10 ** (_out - _in));
    } else {
      normalized = _amount / (10 ** (_in - _out));
    }
    return normalized;
  }
}
