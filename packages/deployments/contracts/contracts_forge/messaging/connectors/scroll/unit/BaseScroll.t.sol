// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BaseScroll} from "../../../../../contracts/messaging/connectors/scroll/BaseScroll.sol";
import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";

contract BaseScrollForTest is BaseScroll {
  constructor(address _amb, uint256 _gasCap) BaseScroll(_gasCap) {}

  function forTest_gasCap() public view returns (uint256 _gasCap) {
    _gasCap = gasCap;
  }

  function forTest_checkMessageLength(bytes memory _data) external pure returns (bool _isValid) {
    _isValid = _checkMessageLength(_data);
  }
}

contract Base is ConnectorHelper {
  address public user = makeAddr("user");
  BaseScrollForTest public baseScroll;

  function setUp() public {
    baseScroll = new BaseScrollForTest(_amb, _gasCap);
  }
}

contract Unit_Connector_BaseScroll_Constructor is Base {
  function test_constants() public {
    uint256 _expectedZeroMsgValue = 0;
    uint256 _expectedMessageLength = 32;
    assertEq(baseScroll.ZERO_MSG_VALUE(), _expectedZeroMsgValue);
    assertEq(baseScroll.MESSAGE_LENGTH(), _expectedMessageLength);
  }
}

contract Unit_Connector_BaseScroll_CheckMessageLength is Base {
  function test_returnFalseOnInvalidLength(bytes memory _data) public {
    uint256 _validMessageLength = 32;
    vm.assume(_data.length != _validMessageLength);
    assertEq(baseScroll.forTest_checkMessageLength(_data), false);
  }

  function test_checkMessageLength() public {
    uint256 _validMessageLength = 32;
    bytes memory _data = new bytes(_validMessageLength);
    assertEq(baseScroll.forTest_checkMessageLength(_data), true);
  }
}
