// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../../contracts/messaging/connectors/Connector.sol";
import {Common} from "./Common.sol";
import {IFuelMessagePortal} from "../../../../../../contracts/messaging/interfaces/ambs/fuel/IFuelMessagePortal.sol";
import {Message} from "../forTest/FuelMessagePortalForTest.sol";

contract Integration_Connector_FuelHubConnector_ReceiveMessage is Common {
  /**
   * @notice Event emitted by the root manager when a root is received
   * @param domain Domain id
   * @param receivedRoot Received root
   * @param queueIndex Index of the message in the queue
   */
  event RootReceived(uint32 domain, bytes32 receivedRoot, uint256 queueIndex);

  function test_receiveMessage() public {
    // Get the root and the calldata of the `processMessage` function to be used as message
    bytes32 _root = bytes32("aggregateRoot");
    bytes memory _data = abi.encodeWithSelector(Connector.processMessage.selector, abi.encode(_root));

    // Queue index is 1 because the recently deployed root manager on the test is receiving the first message
    uint256 _queueIndex = 1;
    vm.expectEmit(true, true, true, true, address(rootManager));
    emit RootReceived(MIRROR_DOMAIN, _root, _queueIndex);

    // Use the message grabbed from Fuel network
    Message memory _message = Message({
      sender: senderOnFuel,
      recipient: bytes32(uint256(uint160(address(fuelHubConnector)))),
      nonce: 0x6e73dbd15aba133ee97b8fb33e0b996e1768ddbf4f66d306c5e788747d7f9548,
      amount: 0,
      data: _data
    });
    fuelMessagePortal.relayMessage(_message);
  }
}
