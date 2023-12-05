// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BaseTaiko} from "./BaseTaiko.sol";
import {Connector} from "../Connector.sol";
import {HubConnector} from "../HubConnector.sol";
import {IRootManager} from "../../interfaces/IRootManager.sol";
import {ISignalService} from "../../interfaces/ambs/taiko/ISignalService.sol";

/**
 * @title TaikoHubConnector
 * @notice Taiko Hub Connector contract in charge of sending messages to the L2 Taiko Spoke Connector
 * and receiving messages from the L2 Taiko Spoke Connector.
 */
contract TaikoHubConnector is HubConnector, BaseTaiko {
  /**
   * @notice Thrown when the message length is not 32 bytes
   */
  error TaikoHubConnector_LengthIsNot32();
  /**
   * @notice Thrown when the message is not received on the destination chain yet
   */
  error TaikoHubConnector_SenderIsNotConnext();
  /**
   * @notice Thrown when the message is not received on the destination chain yet
   */
  error TaikoHubConnector_SignalNotReceived();

  /**
   * @notice The spoke chain id
   */
  uint256 public immutable SPOKE_CHAIN_ID;

  /**
   * @notice Creates a new TaikoHubConnector instance
   * @param _domain L1 domain
   * @param _mirrorDomain L2 domain
   * @param _offChainAgent The off-chain agent address allowed to call `processMessage`
   * @param _rootManager Root manager address
   * @param _mirrorConnector Mirror connector address
   * @param _gasCap Gas limit for cross domain message
   */
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _offChainAgent,
    address _rootManager,
    address _mirrorConnector,
    address _taikoSignalService,
    uint256 _spokeChainId,
    uint256 _gasCap
  )
    HubConnector(_domain, _mirrorDomain, _offChainAgent, _rootManager, _mirrorConnector)
    BaseTaiko(_taikoSignalService, _gasCap)
  {
    SPOKE_CHAIN_ID = _spokeChainId;
  }

  /**
   * @notice Sends a message to the mirror connector through the L1 Taiko Signal Service
   * @param _data Message data
   * @dev The message length must be 32 bytes
   */
  function _sendMessage(bytes memory _data, bytes memory) internal override {
    if (!_checkMessageLength(_data)) revert TaikoHubConnector_LengthIsNot32();
    _sendSignal(bytes32(_data));
  }

  /**
   * @notice Receives a message sent from the L1 Taiko Signal Service and aggregates it on the root manager
   * @param _data Message data
   * @dev The sender must be the connext off-chain agent
   * @dev The message length must be 32 bytes
   */
  function _processMessage(bytes memory _data) internal override {
    if (!_verifySender(address(AMB))) revert TaikoHubConnector_SenderIsNotConnext();
    (bool _received, bytes32 _signal) = _verifyAndGetSignal(SPOKE_CHAIN_ID, mirrorConnector, _data);
    if (!_received) revert TaikoHubConnector_SignalNotReceived();
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, _signal);
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
