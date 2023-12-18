// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {Common} from "./Common.sol";

contract Integration_Connector_FuelHubConnector is Common {
  /**
   * @notice Emitted when a message is sent from Ethereum to Fuel
   * @dev Emitted by the `FuelMessagePortal`
   */
  event MessageSent(
    bytes32 indexed sender,
    bytes32 indexed recipient,
    uint256 indexed nonce,
    uint64 amount,
    bytes data
  );

  /**
   * @notice Sends a message trough the Fuel AMB using the Fuel Hub Connector and
   * checks the `MessageSent` event is successfully emitted by the `FuelMessagePortal`
   */
  function test_sendMessage() public {
    // Encode the root
    bytes memory _root = abi.encode(bytes32("aggregateRoot"));
    // Encode the mirror connector, which is the recipient address
    bytes memory _encodedData = abi.encode(mirrorConnector);

    // Expect `MessageSent` event to be emitted with the correct values
    // Parse the sender (fuel hub connector) and recipient (mirror connector) to bytes32
    bytes32 _sender = bytes32(uint256(uint160(address(fuelHubConnector))));
    bytes32 _recipient = bytes32(uint256(uint160(mirrorConnector)));
    // Declare the calldata, which is the message to be bridged
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _root);
    // Nonce grabbed from fuel network
    uint256 _nonce = 3;
    // Value is 0 since no `msg.value` will be sent on the tx
    uint64 _value = 0;
    vm.expectEmit(true, true, true, true, address(FUEL_MESSAGE_PORTAL));
    emit MessageSent(_sender, _recipient, _nonce, _value, _calldata);

    vm.prank(address(rootManager));
    fuelHubConnector.sendMessage(_root, _encodedData);
  }

  function test_receiveMessage() public {}
}
