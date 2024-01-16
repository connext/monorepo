// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BaseScroll} from "./BaseScroll.sol";
import {Connector} from "../Connector.sol";
import {ConnectorsLib} from "../ConnectorsLib.sol";
import {SpokeConnector} from "../SpokeConnector.sol";
import {ProposedOwnable} from "../../../../contracts/shared/ProposedOwnable.sol";
import {WatcherClient} from "../../WatcherClient.sol";
import {IL2ScrollMessenger} from "../../interfaces/ambs/scroll/IL2ScrollMessenger.sol";

/**
 * @title ScrollSpokeConnector
 * @notice Scroll Spoke Connector contract in charge of sending messages to the L1 Scroll Hub Connector through the
 * L2 Scroll Messenger, and receiving messages from the L1 Scroll Hub Connector through the L2 Scroll Messenger
 */
contract ScrollSpokeConnector is SpokeConnector, BaseScroll {
  /**
   * @notice Thrown when the message length is not 32 bytes
   */
  error ScrollSpokeConnector_DataLengthIsNot32();
  /**
   * @notice Thrown when the origin sender of the cross domain message is not the mirror connector
   */
  error ScrollSpokeConnector_OriginSenderIsNotMirror();
  /**
   * @notice Thrown when `renounceOwnership` is called
   */
  error ScrollSpokeConnector_NotImplementedMethod();

  /**
   * @notice L2 Scroll Messenger
   */
  IL2ScrollMessenger public immutable L2_SCROLL_MESSENGER;

  /**
   * @notice Creates a new ScrollSpokeConnector instance
   * @param _spokeConstructorParams Spoke Connector constructor params
   * @param _gasCap Gas limit to be provided on L1 cross domain message execution
   */
  constructor(
    SpokeConnector.ConstructorParams memory _spokeConstructorParams,
    uint256 _gasCap
  ) SpokeConnector(_spokeConstructorParams) BaseScroll(_gasCap) {
    L2_SCROLL_MESSENGER = IL2ScrollMessenger(_spokeConstructorParams.amb);
  }

  /**
   * @notice Checks that the message length is 32 bytes
   * @param _data Message data
   */
  modifier checkMessageLength(bytes memory _data) {
    if (!ConnectorsLib.checkMessageLength(_data)) revert ScrollSpokeConnector_DataLengthIsNot32();
    _;
  }

  /**
   * @notice Renounces ownership
   * @dev Should not be able to renounce ownership
   */
  function renounceOwnership() public pure override(ProposedOwnable, SpokeConnector) {
    revert ScrollSpokeConnector_NotImplementedMethod();
  }

  /**
   * @notice Sends a message to the mirror connector through the L2 Scroll Messenger
   * @param _data Message data
   * @dev The message length must be 32 bytes
   */
  function _sendMessage(bytes memory _data, bytes memory) internal override checkMessageLength(_data) {
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    L2_SCROLL_MESSENGER.sendMessage(mirrorConnector, ZERO_MSG_VALUE, _calldata, gasCap);
  }

  /**
   * @notice Receives a message from the L1 Scroll Hub Connector through the L2 Scroll Messenger
   * @param _data Message data
   * @dev The sender must be the L1 Scroll Messenger
   * @dev The message length must be 32 bytes
   * @dev The origin sender of the cross domain message must be the mirror connector
   */
  function _processMessage(bytes memory _data) internal override checkMessageLength(_data) {
    if (!_verifySender(mirrorConnector)) revert ScrollSpokeConnector_OriginSenderIsNotMirror();
    receiveAggregateRoot(bytes32(_data));
  }

  /**
   * @notice Verifies that the origin sender of the cross domain message is the mirror connector
   * @param _mirrorSender The mirror sender
   * @return _isValid True if the origin sender is the mirror connector, otherwise false
   */
  function _verifySender(address _mirrorSender) internal view override returns (bool _isValid) {
    _isValid = L2_SCROLL_MESSENGER.xDomainMessageSender() == _mirrorSender;
  }
}
