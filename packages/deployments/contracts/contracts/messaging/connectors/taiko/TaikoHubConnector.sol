// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity =0.8.17;

import {BaseTaiko} from "./BaseTaiko.sol";
import {ConnectorsLib} from "../ConnectorsLib.sol";
import {HubConnector} from "../HubConnector.sol";
import {IBridge} from "../../interfaces/ambs/taiko/IBridge.sol";
import {IRootManager} from "../../interfaces/IRootManager.sol";

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
   * @notice Thrown when the message `srcChainId` is not the Taiko's spoke chain id
   */
  error TaikoHubConnector_SourceChainNotSpoke();

  /**
   * @notice Thrown when the message `from` is not the mirror connector
   */
  error TaikoHubConnector_OriginSenderNotMirror();

  /**
   * @notice Creates a new TaikoHubConnector instance
   * @param _domain L1 domain
   * @param _mirrorDomain L2 domain
   * @param _offChainAgent The off-chain agent address allowed to call `processMessage`
   * @param _rootManager Root manager address
   * @param _mirrorConnector Mirror connector address
   * @param _amb The Taiko Bridge address
   * @param _spokeChainId The Taiko's spoke chain id
   */
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _offChainAgent,
    address _rootManager,
    address _mirrorConnector,
    address _amb,
    uint256 _spokeChainId,
    uint256 _gasCap
  )
    HubConnector(_domain, _mirrorDomain, _offChainAgent, _rootManager, _mirrorConnector)
    BaseTaiko(_amb, _spokeChainId, _gasCap)
  {}

  /**
   * @notice Checks that the message length is 32 bytes
   * @param _data Message data
   */
  modifier checkMessageLength(bytes memory _data) {
    if (!ConnectorsLib.checkMessageLength(_data)) revert TaikoHubConnector_LengthIsNot32();
    _;
  }

  /**
   * @notice Sends a message to the mirror connector through the L1 Taiko Signal Service
   * @param _data Message data
   * @dev The message length must be 32 bytes
   */
  function _sendMessage(bytes memory _data, bytes memory) internal override checkMessageLength(_data) {
    _sendMessage(_data, mirrorConnector);
  }

  /**
   * @notice Receives a message sent from the L2 Taiko Signal Service and aggregates it on the root manager
   * @param _data Message data containing the signal and the proof
   * @dev The sender must be the allowed off-chain agent
   * @dev The signal must be received on the chain
   */
  function _processMessage(bytes memory _data) internal override checkMessageLength(_data) {
    IBridge.Context memory _msgContext = BRIDGE.context();
    if (_msgContext.srcChainId != MIRROR_CHAIN_ID) revert TaikoHubConnector_SourceChainNotSpoke();
    if (!_verifySender(_msgContext.from)) revert TaikoHubConnector_OriginSenderNotMirror();
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, bytes32(_data));
  }

  /**
   * @notice Verifies that the origin sender of the cross domain message is the mirror connector
   * @param _from The message's origin sender address
   * @return _isValid True if the origin sender is the mirror connector, otherwise false
   */
  function _verifySender(address _from) internal view override returns (bool _isValid) {
    _isValid = _from == mirrorConnector;
  }
}
