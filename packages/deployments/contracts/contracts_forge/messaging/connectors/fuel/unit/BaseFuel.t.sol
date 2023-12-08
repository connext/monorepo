// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BaseFuel} from "../../../../../contracts/messaging/connectors/fuel/BaseFuel.sol";
import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";

contract BaseFuelForTest is BaseFuel {
  constructor(address _amb) {}

  function forTest_checkMessageLength(bytes memory _data) external pure returns (bool _isValid) {
    _isValid = _checkMessageLength(_data);
  }

  function forTest_bytes32ToAddress(bytes32 _bytes) external pure returns (address _address) {
    _address = _bytes32ToAddress(_bytes);
  }

  function forTest_addressToBytes32(address _address) external pure returns (bytes32 _bytes) {
    _bytes = _addressToBytes32(_address);
  }
}

contract Base is ConnectorHelper {
  address public user = makeAddr("user");
  BaseFuelForTest public baseFuel;

  function setUp() public {
    baseFuel = new BaseFuelForTest(_amb);
  }
}

contract Unit_Connector_BaseFuel_Constructor is Base {
  function test_constants() public {
    uint256 _expectedZeroMsgValue = 0;
    uint256 _expectedMessageLength = 32;
    assertEq(baseFuel.ZERO_MSG_VALUE(), _expectedZeroMsgValue);
    assertEq(baseFuel.MESSAGE_LENGTH(), _expectedMessageLength);
  }
}

contract Unit_Connector_BaseFuel_CheckMessageLength is Base {
  uint256 internal constant VALID_MSG_LENGTH = 32;

  function test_returnFalseOnInvalidLength(bytes memory _data) public {
    vm.assume(_data.length != VALID_MSG_LENGTH);
    assertEq(baseFuel.forTest_checkMessageLength(_data), false);
  }

  function test_checkMessageLength(bytes32 _msg) public {
    bytes memory _data = abi.encode(_msg);
    assertEq(baseFuel.forTest_checkMessageLength(_data), true);
  }
}

contract Unit_Connector_BaseFuel_Bytes32ToAddress is Base {
  function test_bytes32ToAddress(bytes32 _bytes) public {
    address _expectedAddress = address(uint160(uint256(_bytes)));
    assertEq(baseFuel.forTest_bytes32ToAddress(_bytes), _expectedAddress);
  }
}

contract Unit_Connector_BaseFuel_AddressToBytes32 is Base {
  function test_addressToBytes32(address _address) public {
    vm.assume(_address != address(0));
    bytes32 _expectedBytes = bytes32(uint256(uint160(_address)));
    assertEq(baseFuel.forTest_addressToBytes32(_address), _expectedBytes);
  }
}
