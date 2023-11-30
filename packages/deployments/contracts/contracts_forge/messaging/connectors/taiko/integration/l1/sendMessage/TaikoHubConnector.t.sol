// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Common} from "./Common.sol";

contract Integration_Connector_TaikoHubConnector_SendMessage is Common {
  function test_sendMessage() public {
    // Send message from the root manager
    vm.prank(address(rootManager));
    bytes32 _message = bytes32("aggregateRoot");
    bytes memory _encodedData = "";
    taikoHubConnector.sendMessage(abi.encode(_message), _encodedData);

    // Check is signal sent to be true
    bool _isSignalSent = SIGNAL_SERVICE.isSignalSent(address(taikoHubConnector), _message);
    assertEq(_isSignalSent, true, "signal not sent");
  }
}
