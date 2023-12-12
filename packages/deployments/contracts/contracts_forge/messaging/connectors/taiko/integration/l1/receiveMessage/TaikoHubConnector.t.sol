// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Common} from "./Common.sol";

contract Integration_Connector_TaikoHubConnector_ReceiveMessage is Common {
  function test_receiveMessage() public {
    vm.prank(offChainAgent);
    bytes memory _data = abi.encode(SIGNAL, PROOF);
    taikoHubConnector.processMessage(_data);
  }
}
