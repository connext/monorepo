// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../../interfaces/IConnext.sol";

import "../../nomad-xapps/contracts/bridge/BridgeRouter.sol";
import {TypeCasts} from "../../nomad-core/contracts/XAppConnectionManager.sol";

import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";

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
    IConnext.ReconciledTransfer memory transfer = IConnext.ReconciledTransfer({local: _local, amount: _amount, to: _to});

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
}
