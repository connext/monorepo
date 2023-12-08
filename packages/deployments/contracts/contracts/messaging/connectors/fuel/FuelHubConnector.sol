// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BaseFuel} from "./BaseFuel.sol";
import {Connector} from "../Connector.sol";
import {HubConnector} from "../HubConnector.sol";
import {IFuelMessagePortal} from "../../interfaces/ambs/fuel/IFuelMessagePortal.sol";
import {IRootManager} from "../../interfaces/IRootManager.sol";

/**
 * @title FuelHubConnector
 * @notice Fuel Hub Connector contract in charge of sending messages to the L2 Fuel Hub Connector through the
 * L1 Fuel Messenger, and receiving messages from the L2 Fuel Hub Connector through the L1 Fuel Messenger
 */
contract FuelHubConnector is HubConnector, BaseFuel {
  /**
   * @notice Thrown when the message length is not 32 bytes
   */
  error FuelHubConnector_DataLengthIsNot32();
  /**
   * @notice Thrown when the origin sender of the cross domain message is not the mirror connector
   */
  error FuelHubConnector_OriginSenderIsNotMirror();

  /**
   * @notice L1 Fuel Messenge portal
   */
  IFuelMessagePortal public immutable FUEL_MESSENGER_PORTAL;

  /**
   * @notice Creates a new FuelHubConnector instance
   * @param _domain L1 domain
   * @param _mirrorDomain L2 domain
   * @param _amb Arbitrary Message Bridge address
   * @param _rootManager Root manager address
   * @param _mirrorConnector Mirror connector address
   */
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector
  ) HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector) {
    FUEL_MESSENGER_PORTAL = IFuelMessagePortal(_amb);
  }

  /**
   * @notice Checks that the message length is 32 bytes
   * @param _data Message data
   */
  modifier checkMessageLength(bytes memory _data) {
    if (!_checkMessageLength(_data)) revert FuelHubConnector_DataLengthIsNot32();
    _;
  }

  /**
   * @notice Sends a message to the mirror connector through the Fuel Messenger Portal
   * @param _data Message data
   * @param _encodedData Encoded data, used to get the refund address
   * @dev The message length must be 32 bytes
   */
  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override checkMessageLength(_data) {
    address _refundAddress = (_encodedData.length > 0) ? abi.decode(_encodedData, (address)) : address(0);
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    bytes32 _bytes32RefoundAddress = _addressToBytes32(_refundAddress);
    FUEL_MESSENGER_PORTAL.sendMessage{value: msg.value}(_bytes32RefoundAddress, _calldata);
  }

  /**
   * @notice Receives a message from the Fuel Messenger Portal and aggregates it on the root manager
   * @param _data Message data
   * @dev The sender must be the Fuel Messenger Portal
   * @dev The message length must be 32 bytes
   * @dev The origin sender of the cross domain message must be the mirror connector
   */
  function _processMessage(bytes memory _data) internal override onlyAMB checkMessageLength(_data) {
    if (!_verifySender(mirrorConnector)) revert FuelHubConnector_OriginSenderIsNotMirror();
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, bytes32(_data));
  }

  /**
   * @notice Verifies that the origin sender of the cross domain message is the mirror connector
   * @param _mirrorSender The mirror sender address
   * @dev    Fuel returns the origin sender as a bytes32, so we need to convert it to an address
   * @return _isValid True if the origin sender is the mirror connector, otherwise false
   */
  function _verifySender(address _mirrorSender) internal view override returns (bool _isValid) {
    _isValid = _bytes32ToAddress(FUEL_MESSENGER_PORTAL.messageSender()) == _mirrorSender;
  }
}
