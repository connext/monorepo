// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ConnectorsLib} from "../../../contracts/messaging/connectors/ConnectorsLib.sol";
import {ConnectorHelper} from "../../utils/ConnectorHelper.sol";

contract Unit_Connector_ConnectorsLib_CheckMessageLength is ConnectorHelper {
  function setUp() public {}

  /**
   * @notice Tests that returns true when the message length is 32 bytes
   * @param _root Message root
   */
  function test_returnTrueIfMessageLengthIs32(bytes32 _root) public {
    bytes memory _data = abi.encode(_root);
    assertEq(ConnectorsLib.checkMessageLength(_data), true);
  }

  /**
   * @notice Tests that returns false when the message length is not 32 bytes
   * @param _data Message data
   */
  function test_returnFalseIfMessageLengthIsNot32(bytes memory _data) public {
    vm.assume(_data.length != ROOT_LENGTH);
    assertEq(ConnectorsLib.checkMessageLength(_data), false);
  }
}
