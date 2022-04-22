// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../../interfaces/IConnext.sol";
import "../../interfaces/IStableSwap.sol";

import "../../nomad-xapps/contracts/bridge/TokenRegistry.sol";
import "../../nomad-xapps/contracts/bridge/BridgeMessage.sol";
import "../../nomad-xapps/contracts/bridge/BridgeRouter.sol";
import {TypeCasts} from "../../nomad-core/contracts/XAppConnectionManager.sol";

import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

library ConnextUtils {
  /**
   * @notice Gets unique identifier from nonce + domain
   * @param _nonce - The nonce of the contract
   * @param _params - The call params of the transfer
   * @return The transfer id
   */
  function getTransferId(
    uint256 _nonce,
    address _sender,
    IConnext.CallParams calldata _params
  ) external pure returns (bytes32) {
    return keccak256(abi.encode(_nonce, _sender, _params));
  }

  /**
   * @notice Gets the hash for information returned across the bridge
   * @param _local - The asset delivered by the bridge
   * @param _to - The address that should receive the funds, or fallback address if the external call
   * fails
   * @param _amount - The amount delivered through the bridge
   * @return The hash of the `ReconciledTransfer`
   */
  function getReconciledHash(
    address _local,
    address _to,
    uint256 _amount
  ) external pure returns (bytes32) {
    IConnext.ReconciledTransfer memory transfer = IConnext.ReconciledTransfer({
      local: _local,
      amount: _amount,
      to: _to
    });

    return keccak256(abi.encode(transfer));
  }

  /**
   * @notice Holds the logic to recover the signer from an encoded payload.
   * @dev Will hash and convert to an eth signed message.
   * @param _encoded The payload that was signed
   * @param _sig The signature you are recovering the signer from
   */
  function recoverSignature(bytes memory _encoded, bytes calldata _sig) external pure returns (address) {
    // Recover
    return ECDSAUpgradeable.recover(ECDSAUpgradeable.toEthSignedMessageHash(keccak256(_encoded)), _sig);
  }

  /**
   * @notice Sends a message over the bridge
   * @param _bridgeRouter - The local nomad bridge router
   * @param _destination - The destination domain for the message
   * @param _recipient - The address that should receive the funds, or fallback address if the external call
   * fails
   * @param _local - The asset delivered by the bridge
   * @param _amount - The amount delivered through the bridge
   * @param _id - The unique identifier of the transaction
   */
  function sendMessage(
    BridgeRouter _bridgeRouter,
    uint32 _destination,
    address _recipient,
    address _local,
    uint256 _amount,
    bytes32 _id
  ) external {
    // Approve the bridge router
    SafeERC20Upgradeable.safeIncreaseAllowance(IERC20Upgradeable(_local), address(_bridgeRouter), _amount);

    _bridgeRouter.send(_local, _amount, _destination, TypeCasts.addressToBytes32(_recipient), true, _id);
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
    BridgeMessage.TokenId memory _canonical,
    IStableSwap _pool,
    TokenRegistry _tokenRegistry,
    address _asset,
    uint256 _amount
  ) external returns (uint256, address) {
    // Check to see if the asset must be swapped because it is not the local asset
    if (_canonical.id == bytes32(0)) {
      // This is *not* the adopted asset, meaning it must be the local asset
      return (_amount, _asset);
    }

    // Get the local token for this domain (may return canonical or representation)
    address local = _tokenRegistry.getLocalAddress(_canonical.domain, _canonical.id);

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
    TokenRegistry _tokenRegistry,
    address _asset,
    uint256 _amount
  ) external returns (uint256, address) {
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
