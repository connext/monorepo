// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../../interfaces/IConnext.sol";
import "../../interfaces/IStableSwap.sol";

import "../../nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import "../../nomad-xapps/contracts/connext/ConnextMessage.sol";
import "../../nomad-xapps/contracts/relayer-fee-router/RelayerFeeRouter.sol";
import {TypeCasts} from "../../nomad-core/contracts/XAppConnectionManager.sol";

import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

library ConnextUtils {
  // ========== Custom Errors ===========
  error ConnextUtils__initiateClaim_notRelayer(bytes32 transferId);

  // ========== Logic ===========

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
  ) external returns (uint256, address) {
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

  /**
   * @notice Called by relayer when they want to claim owed funds on a given domain
   * @dev Domain should be the origin domain of all the transfer ids
   * @param _domain - domain to claim funds on
   * @param _recipient - address on origin chain to send claimed funds to
   * @param _transferIds - transferIds to claim
   * @param _relayerFeeRouter - The local nomad relayer fee router
   * @param _transferRelayer - Mapping of transactionIds to relayer
   */
  function initiateClaim(
    uint32 _domain,
    address _recipient,
    bytes32[] calldata _transferIds,
    RelayerFeeRouter _relayerFeeRouter,
    mapping(bytes32 => address) storage _transferRelayer
  ) external {
    // Ensure the relayer can claim all transfers specified
    for (uint256 i; i < _transferIds.length; ) {
      if (_transferRelayer[_transferIds[i]] != msg.sender)
        revert ConnextUtils__initiateClaim_notRelayer(_transferIds[i]);
      unchecked {
        i++;
      }
    }

    // Send transferIds via nomad
    _relayerFeeRouter.send(_domain, _recipient, _transferIds);
  }

  /**
   * @notice Pays out a relayer for the given fees
   * @dev Called by the RelayerFeeRouter.handle message. The validity of the transferIds is
   * asserted before dispatching the message.
   * @param _recipient - address on origin chain to send claimed funds to
   * @param _transferIds - transferIds to claim
   * @param _relayerFees - Mapping of transactionIds to fee
   */
  function claim(
    address _recipient,
    bytes32[] calldata _transferIds,
    mapping(bytes32 => uint256) storage _relayerFees
  ) external returns (uint256) {
    // Tally amounts owed
    uint256 total;
    for (uint256 i; i < _transferIds.length; ) {
      total += _relayerFees[_transferIds[i]];
      _relayerFees[_transferIds[i]] = 0;
      unchecked {
        i++;
      }
    }

    AddressUpgradeable.sendValue(payable(_recipient), total);

    return total;
  }
}
