// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Common} from "./Common.sol";

contract Integration_Connector_TaikoHubConnector is Common {
  /**
   * @notice Tests that the tx for sending the message through the taik signal service the message
   */
  function test_sendMessage() public {
    // Send message from the root manager
    vm.prank(address(rootManager));
    bytes32 _message = bytes32("aggregateRoot");
    bytes memory _encodedData = abi.encode("encodedData");
    taikoHubConnector.sendMessage(abi.encode(_message), _encodedData);

    // Check is signal sent to be true
    bool _isSignalSent = SIGNAL_SERVICE.isSignalSent(address(taikoHubConnector), _message);
    assertEq(_isSignalSent, true, "signal not sent");
  }

  /**
   * @notice Tests that the message is received from the off chain agent and processed correctly
   * @dev This test is using a real signal sent by the Bridge contract on Taiko network
   */
  function test_receiveMessage() public {
    vm.prank(offChainAgent);
    bytes memory _data = abi.encode(SIGNAL, PROOF);
    taikoHubConnector.processMessage(_data);
  }
}
