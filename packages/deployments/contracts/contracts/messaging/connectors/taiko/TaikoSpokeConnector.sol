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
   * @notice Thrown when the `msg.sender` is not the allowed agent
   */
  error TaikoSpokeConnector_SenderNotAllowedAgent();

  /**
   * @notice Thrown when the message is not received on the destination chain yet
   */
  error TaikoSpokeConnector_SignalNotReceived();
  /**
   * @notice Thrown when `renounceOwnership` is called
   */
  error TaikoSpokeConnector_NotImplementedMethod();

  /**
   * @notice The Taiko's hub chain id
   */
  uint256 public immutable HUB_CHAIN_ID;

  /**
   * @notice Creates a new TaikoSpokeConnector instance
   * @param _constructorParams Spoke Connector constructor params
   * @param _taikoSignalService Taiko Signal Service address
   * @param _hubChainId The Taiko's hub chain id
   */
  constructor(
    SpokeConnector.ConstructorParams memory _constructorParams,
    address _taikoSignalService,
    uint256 _hubChainId
  ) SpokeConnector(_constructorParams) BaseTaiko(_taikoSignalService) {
    HUB_CHAIN_ID = _hubChainId;
  }

  /**
   * @notice Renounces ownership
   * @dev Should not be able to renounce ownership
   */
  function renounceOwnership() public virtual override(SpokeConnector) {
    revert TaikoSpokeConnector_NotImplementedMethod();
  }

  /**
   * @notice Sends a message to the mirror connector through the L2 Taiko Signal Service
   * @param _data Message data
   * @dev The message length must be 32 bytes
   */
  function _sendMessage(bytes memory _data, bytes memory) internal override {
    if (!_checkMessageLength(_data)) revert TaikoSpokeConnector_LengthIsNot32();
    _sendSignal(bytes32(_data));
  }

  /**
   * @notice Receives a message sent from the L1 Scroll Hub Connector through the L2 Taiko Signal Service
   * @param _data Message data containing the signal (the root) and the proof
   * @dev The sender must be the allowed off-chain agent
   * @dev The signal must be received on the chain
   */
  function _processMessage(bytes memory _data) internal override {
    if (!_verifySender(address(AMB))) revert TaikoSpokeConnector_SenderNotAllowedAgent();
    (bool _received, bytes32 _signal) = _verifyAndGetSignal(HUB_CHAIN_ID, mirrorConnector, _data);
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
