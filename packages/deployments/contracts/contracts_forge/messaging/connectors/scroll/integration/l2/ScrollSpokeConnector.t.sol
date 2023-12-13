// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Common} from "./Common.sol";
import {Connector} from "../../../../../../contracts/messaging/connectors/Connector.sol";

contract Integration_Connector_ScrollSpokeConnector is Common {
  event AggregateRootReceived(bytes32 indexed root);

  event SentMessage(
    address indexed sender,
    address indexed target,
    uint256 value,
    uint256 messageNonce,
    uint256 gasLimit,
    bytes message
  );

  /**
   * @notice Tests that the tx for sending the message succeeds
   */
  function test_sendMessage() public {
    // Get the root that will be sent from the merkle tree manager
    bytes32 _root = merkleTreeManager.root();
    bytes memory _data = abi.encodePacked(_root);
    bytes memory _functionCall = abi.encodeWithSelector(Connector.processMessage.selector, _data);

    // Expect the `SentMessage` event to be emitted by the scroll messenger AMB
    vm.expectEmit(true, true, true, true, address(L2_SCROLL_MESSENGER));
    // Nonce grabbed from the L2 scroll messenger. This is the nonce that will be emitted by the L2 scroll messenger on the next message
    uint256 _nonce = 11766;
    emit SentMessage(
      address(scrollSpokeConnector),
      mirrorConnector,
      scrollSpokeConnector.ZERO_MSG_VALUE(),
      _nonce,
      _gasCap,
      _functionCall
    );

    vm.prank(user);
    bytes memory _extraData = "";
    scrollSpokeConnector.send(_extraData);
  }

  /**
   * @notice Tests that the message is received and processed correctly
   */
  function test_processMessage() public {
    // Get a root and parse it
    bytes32 _root = merkleTreeManager.root();
    bytes memory _data = abi.encodePacked(_root);

    // Expect the `AggregateRootReceived` event to be emitted by scroll spoke connector
    vm.expectEmit(true, true, true, true, address(scrollSpokeConnector));
    emit AggregateRootReceived(_root);

    // Relay the message on the AMB and expect the `processMessage` function to be called on scroll spoke connector
    uint256 _value = 0;
    uint256 _nonce = 0; // No need to set the nonce here
    vm.prank(SCROLL_RELAYER);
    L2_SCROLL_MESSENGER.relayMessage(
      mirrorConnector,
      address(scrollSpokeConnector),
      _value,
      _nonce,
      abi.encodeWithSelector(Connector.processMessage.selector, _data)
    );
  }
}
