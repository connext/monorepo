// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import {BaseTaiko} from "./BaseTaiko.sol";
import {Connector} from "../Connector.sol";
import {ConnectorsLib} from "../ConnectorsLib.sol";
import {ProposedOwnable} from "../../../../contracts/shared/ProposedOwnable.sol";
import {SpokeConnector} from "../SpokeConnector.sol";
import {IBridge} from "../../interfaces/ambs/taiko/IBridge.sol";

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
   * @notice Thrown when the message `srcChainId` is not the Taiko's hub chain id
   */
  error TaikoSpokeConnector_SourceChainNotHub();

  /**
   * @notice Thrown when the message `from` is not the mirror connector
   */
  error TaikoSpokeConnector_OriginSenderNotMirror();

  /**
   * @notice Thrown when `renounceOwnership` is called
   */
  error TaikoSpokeConnector_NotImplementedMethod();

  /**
   * @notice Creates a new TaikoSpokeConnector instance
   * @param _constructorParams Spoke Connector constructor params
   * @param _hubChainId The Taiko's hub chain id
   */
  constructor(
    SpokeConnector.ConstructorParams memory _constructorParams,
    uint256 _hubChainId,
    uint256 _gasCap
  ) SpokeConnector(_constructorParams) BaseTaiko(_constructorParams.amb, _hubChainId, _gasCap) {}

  /**
   * @notice Checks that the message length is 32 bytes
   * @param _data Message data
   */
  modifier checkMessageLength(bytes memory _data) {
    if (!ConnectorsLib.checkMessageLength(_data)) revert TaikoSpokeConnector_LengthIsNot32();
    _;
  }

  /**
   * @notice Renounces ownership
   * @dev Should not be able to renounce ownership
   */
  function renounceOwnership() public pure override(SpokeConnector, ProposedOwnable) {
    revert TaikoSpokeConnector_NotImplementedMethod();
  }

  /**
   * @notice Sends a message to the mirror connector through the L2 Taiko Signal Service
   * @param _data Message data
   * @dev The message length must be 32 bytes
   */
  function _sendMessage(bytes memory _data, bytes memory) internal override checkMessageLength(_data) {
    _sendMessage(_data, mirrorConnector);
  }

  /**
   * @notice Receives a message sent from the L1 Scroll Hub Connector through the L2 Taiko Signal Service
   * @param _data Message data containing the signal (the root) and the proof
   * @dev The sender must be the allowed off-chain agent
   * @dev The signal must be received on the chain
   */
  function _processMessage(bytes memory _data) internal override checkMessageLength(_data) {
    IBridge.Context memory _msgContext = BRIDGE.context();
    if (_msgContext.srcChainId != MIRROR_CHAIN_ID) revert TaikoSpokeConnector_SourceChainNotHub();
    if (!_verifySender(_msgContext.from)) revert TaikoSpokeConnector_OriginSenderNotMirror();
    receiveAggregateRoot(bytes32(_data));
  }

  /**
   * @notice Verifies that the origin sender of the cross domain message is the mirror connector
   * @param _from The message's origin sender address
   * @return _isValid True if the origin sender is allowed off-chain agent (declared as AMB), false otherwise
   */
  function _verifySender(address _from) internal view override returns (bool _isValid) {
    _isValid = _from == mirrorConnector;
  }
}
