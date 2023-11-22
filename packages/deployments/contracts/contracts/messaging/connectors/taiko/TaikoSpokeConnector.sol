// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import {BaseTaiko} from "./BaseTaiko.sol";
import {Connector} from "../Connector.sol";
import {ProposedOwnable} from "../../../../contracts/shared/ProposedOwnable.sol";
import {SpokeConnector} from "../SpokeConnector.sol";
import {ISignalService} from "../../interfaces/ambs/taiko/ISignalService.sol";

/**
 * @title TaikoSpokeConnector
 * @notice Taiko Spoke Connector contract in charge of sending messages to the L1 Taiko Hub Connector,
 * and receiving messages from the L1 Taiko Hub Connector.
 */
contract TaikoSpokeConnector is SpokeConnector, BaseTaiko {
  /**
   * @notice Thrown when the message length is not 32 bytes
   */
  error TaikoSpokeConnector_LengthIsNot32();

  /**
   * @notice Thrown when the sender is not connext
   */
  error TaikoSpokeConnector_SenderIsNotConnext();

  /**
   * @notice Thrown when the message is not received on the destination chain yet
   */
  error TaikoSpokeConnector_SignalNotReceived();

  constructor(
    SpokeConnector.ConstructorParams memory _constructorParams,
    address _taikoSignalService,
    uint256 _gasCap
  ) SpokeConnector(_constructorParams) BaseTaiko(_taikoSignalService, _gasCap) {}

  /**
   * @notice Checks that the message length is 32 bytes
   * @param _data Message data
   */
  modifier checkMessageLength(bytes memory _data) {
    if (!_checkMessageLength(_data)) revert TaikoSpokeConnector_LengthIsNot32();
    _;
  }

  /**
   * @notice Renounces ownership
   * @dev Should not be able to renounce ownership
   */
  function renounceOwnership() public virtual override(ProposedOwnable, SpokeConnector) onlyOwner {}

  /**
   * @notice Sends a message to the mirror connector through the L2 Taiko Signal Service
   * @param _data Message data
   * @dev The message length must be 32 bytes
   */
  function _sendMessage(bytes memory _data, bytes memory) internal override checkMessageLength(_data) {
    // TODO: emit returned slot on event?
    _sendSignal(bytes32(_data));
  }

  /**
   * @notice Receives a message sent from the L1 Scroll Hub Connector through the L2 Taiko Signal Service
   * @param _data Message data
   * @dev The sender must be the connext off-chain agent
   * @dev The message length must be 32 bytes
   */
  function _processMessage(bytes memory _data) internal override checkMessageLength(_data) {
    if (!_verifySender(address(AMB))) revert TaikoSpokeConnector_SenderIsNotConnext();
    (bool _received, bytes32 _signal) = _verifyAndGetignal(_data);
    if (!_received) revert TaikoSpokeConnector_SignalNotReceived();
    receiveAggregateRoot(_signal);
  }

  /**
   * @notice Verifies that the origin sender of the cross domain message is the mirror connector
   * @param _mirrorSender Mirror sender address
   * @return _isValid True if the origin sender is the mirror connector, otherwise false
   */
  function _verifySender(address _mirrorSender) internal view override returns (bool _isValid) {
    _isValid = msg.sender == _mirrorSender;
  }
}
