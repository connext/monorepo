// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../Connector.sol";
import {ConnectorsLib} from "../ConnectorsLib.sol";
import {HubConnector} from "../HubConnector.sol";
import {IFuelMessagePortal} from "../../interfaces/ambs/fuel/IFuelMessagePortal.sol";
import {IRootManager} from "../../interfaces/IRootManager.sol";

/**
 * @title FuelHubConnector
 * @notice Fuel Hub Connector contract in charge of sending messages to the L2 Fuel Spoke Connector through the
 * L1 Fuel Message Portal, and receiving messages from the L2 Fuel Hub Connector through the same Fuel Message Portal
 */
contract FuelHubConnector is HubConnector {
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
  IFuelMessagePortal public immutable FUEL_MESSAGE_PORTAL;

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
    FUEL_MESSAGE_PORTAL = IFuelMessagePortal(_amb);
  }

  /**
   * @notice Checks that the message length is 32 bytes
   * @param _data Message data
   */
  modifier checkMessageLength(bytes memory _data) {
    if (!ConnectorsLib.checkMessageLength(_data)) revert FuelHubConnector_DataLengthIsNot32();
    _;
  }

  /**
   * @notice Sends a message to the mirror connector through the Fuel Messenger Portal (AMB)
   * @param _data Message data
   * @param _encodedData Encoded data, used to get the recipient address
   * @dev The message length must be 32 bytes
   * @dev No fees needed to pay for the message execution. If you add `msg.value` it will go the recipient address
   */
  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override checkMessageLength(_data) {
    address _recipient = (_encodedData.length > 0) ? abi.decode(_encodedData, (address)) : address(0);
    bytes32 _bytes32RecipientAddress = _addressToBytes32(_recipient);
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    FUEL_MESSAGE_PORTAL.sendMessage{value: msg.value}(_bytes32RecipientAddress, _calldata);
  }

  /**
   * @notice Receives a message from the Fuel Messenger Portal and aggregates it on the root manager
   * @param _data Message data
   * @dev The sender must be the Fuel Messenger Portal (AMB)
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
   * @return _isValid True if the origin sender is the mirror connector, false otherwise
   * @dev Fuel returns the origin sender as a bytes32, so it needs to be converted into an address
   */
  function _verifySender(address _mirrorSender) internal view override returns (bool _isValid) {
    _isValid = _bytes32ToAddress(FUEL_MESSAGE_PORTAL.messageSender()) == _mirrorSender;
  }

  /**
   * @notice Converts bytes32 to address
   * @param _bytes The bytes32 value
   * @return _address The address value
   */
  function _bytes32ToAddress(bytes32 _bytes) internal pure returns (address _address) {
    _address = address(uint160(uint256(_bytes)));
  }

  /**
   * @notice Converts address to bytes32
   * @param _address The address value
   * @return _bytes The bytes32 value
   */
  function _addressToBytes32(address _address) internal pure returns (bytes32 _bytes) {
    _bytes = bytes32(uint256(uint160(_address)));
  }
}
