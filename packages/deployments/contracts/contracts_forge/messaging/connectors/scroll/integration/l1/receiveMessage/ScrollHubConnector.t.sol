// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Common} from "./Common.sol";
import {Connector} from "../../../../../../../contracts/messaging/connectors/Connector.sol";

contract Integration_Connector_ScrollHubConnector_ReceiveMessage is Common {
  // Events
  event RootReceived(uint32 domain, bytes32 receivedRoot, uint256 queueIndex);

  /**
   * @notice Tests that the message is received from the scroll relayer and processed correctly
   */
  function test_processMessage(uint256 _nonce) public {
    // Get a root and parse it
    bytes32 _root = merkleTreeManager.root();
    bytes memory _data = abi.encodePacked(_root);
    // Get the value
    uint256 _value = scrollHubConnector.ZERO_MSG_VALUE();
    // Get the last index (must be one because the contract doesn't store any root since is a mock)
    uint256 _lastIndex = 1;

    // Expect the `RootReceived` event to be emitted by scroll hub connector
    vm.expectEmit(true, true, true, true, address(rootManager));
    emit RootReceived(MIRROR_DOMAIN, _root, _lastIndex);

    // Relay message
    vm.prank(relayer);
    l1ScrollMessenger.relayMessage(
      mirrorConnector,
      address(scrollHubConnector),
      _value,
      _nonce,
      abi.encodeWithSelector(Connector.processMessage.selector, _data)
    );
  }
}
