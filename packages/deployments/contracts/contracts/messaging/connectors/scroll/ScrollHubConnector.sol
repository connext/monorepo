// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BaseScroll} from "./BaseScroll.sol";
import {Connector} from "../Connector.sol";
import {ConnectorsLib} from "../ConnectorsLib.sol";
import {HubConnector} from "../HubConnector.sol";
import {IL1ScrollMessenger} from "../../interfaces/ambs/scroll/IL1ScrollMessenger.sol";
import {IRootManager} from "../../interfaces/IRootManager.sol";

/**
 * @title ScrollHubConnector
 * @notice Scroll Hub Connector contract in charge of sending messages to the L2 Scroll Hub Connector through the
 * L1 Scroll Messenger, and receiving messages from the L2 Scroll Hub Connector through the L1 Scroll Messenger
 */
contract ScrollHubConnector is HubConnector, BaseScroll {
  /**
   * @notice Thrown when the message length is not 32 bytes
   */
  error ScrollHubConnector_DataLengthIsNot32();
  /**
   * @notice Thrown when the origin sender of the cross domain message is not the mirror connector
   */
  error ScrollHubConnector_OriginSenderIsNotMirror();

  /**
   * @notice Thrown when the refund address is empty
   */
  error ScrollHubConnector_EmptyRefundAddress();

  /**
   * @notice L1 Scroll Messenger
   */
  IL1ScrollMessenger public immutable L1_SCROLL_MESSENGER;

  /**
   * @notice Creates a new ScrollHubConnector instance
   * @param _domain L1 domain
   * @param _mirrorDomain L2 domain
   * @param _amb Arbitrary Message Bridge address
   * @param _rootManager Root manager address
   * @param _mirrorConnector Mirror connector address
   * @param _gasCap Gas limit for cross domain message
   */
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _gasCap
  ) HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector) BaseScroll(_gasCap) {
    L1_SCROLL_MESSENGER = IL1ScrollMessenger(_amb);
  }

  /**
   * @notice Checks that the message length is 32 bytes
   * @param _data Message data
   */
  modifier checkMessageLength(bytes memory _data) {
    if (!ConnectorsLib.checkMessageLength(_data)) revert ScrollHubConnector_DataLengthIsNot32();
    _;
  }

  /**
   * @notice Sends a message to the mirror connector through the L1 Scroll Messenger
   * @param _data Message data
   * @param _encodedData Encoded data, used to get the refund address
   * @dev The message length must be 32 bytes
   */
  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override checkMessageLength(_data) {
    // refund address must be specified
    address _refundAddress = (_encodedData.length > 0) ? abi.decode(_encodedData, (address)) : address(0);
    if (_refundAddress == address(0)) {
      revert ScrollHubConnector_EmptyRefundAddress();
    }

    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    L1_SCROLL_MESSENGER.sendMessage{value: msg.value}(
      mirrorConnector,
      ZERO_MSG_VALUE,
      _calldata,
      gasCap,
      _refundAddress
    );
  }

  /**
   * @notice Receives a message from the L1 Scroll Messenger and aggregates it on the root manager
   * @param _data Message data
   * @dev The sender must be the L1 Scroll Messenger
   * @dev The message length must be 32 bytes
   * @dev The origin sender of the cross domain message must be the mirror connector
   */
  function _processMessage(bytes memory _data) internal override checkMessageLength(_data) {
    if (!_verifySender(mirrorConnector)) revert ScrollHubConnector_OriginSenderIsNotMirror();
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, bytes32(_data));
  }

  /**
   * @notice Verifies that the origin sender of the cross domain message is the mirror connector
   * @param _mirrorSender The mirror sender address
   * @return _isValid True if the origin sender is the mirror connector, otherwise false
   */
  function _verifySender(address _mirrorSender) internal view override returns (bool _isValid) {
    _isValid = L1_SCROLL_MESSENGER.xDomainMessageSender() == _mirrorSender;
  }
}
