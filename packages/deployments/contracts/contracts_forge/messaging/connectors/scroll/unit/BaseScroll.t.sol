// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BaseScroll} from "../../../../../contracts/messaging/connectors/scroll/BaseScroll.sol";
import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";

/**
 * @dev For test contract to access internal functions of `BaseScroll`
 */
contract BaseScrollForTest is BaseScroll {
  constructor(address _amb, uint256 _gasCap) BaseScroll(_gasCap) {}

  function forTest_gasCap() public view returns (uint256 _gasCap) {
    _gasCap = gasCap;
  }

  function forTest_checkMessageLength(bytes memory _data) external pure returns (bool _isValid) {
    _isValid = _checkMessageLength(_data);
  }
}

/**
 * @dev Base contract for the `BaseScroll` unit tests contracts to inherit from
 */
contract Base is ConnectorHelper {
  address public user = makeAddr("user");
  BaseScrollForTest public baseScroll;

  /**
   * @notice Deploys a new `BaseScrollForTest` contract instance
   */
  function setUp() public {
    baseScroll = new BaseScrollForTest(_amb, _gasCap);
  }
}

contract Unit_Connector_BaseScroll_Constructor is Base {
  /**
   * @notice Tests the values of the constants
   */
  function test_constants() public {
    uint256 _expectedZeroMsgValue = 0;
    uint256 _expectedMessageLength = 32;
    assertEq(baseScroll.ZERO_MSG_VALUE(), _expectedZeroMsgValue);
    assertEq(baseScroll.MESSAGE_LENGTH(), _expectedMessageLength);
  }
}

contract Unit_Connector_BaseScroll_CheckMessageLength is Base {
  // The root length in bytes for a message
  uint256 internal constant VALID_MSG_LENGTH = 32;

  /**
   * @notice Tests that reverts when called with invalid length data
   * @param _data Message data
   */
  function test_returnFalseOnInvalidLength(bytes memory _data) public {
    vm.assume(_data.length != VALID_MSG_LENGTH);
    assertEq(baseScroll.forTest_checkMessageLength(_data), false);
  }

  /**
   * @notice Tests that returns true on data valid length
   */
  function test_returnTrue(bytes32 _msg) public {
    bytes memory _data = abi.encode(_msg);
    assertEq(baseScroll.forTest_checkMessageLength(_data), true);
  }
}
