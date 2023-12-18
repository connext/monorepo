// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {FuelHubConnector} from "../../../../../contracts/messaging/connectors/fuel/FuelHubConnector.sol";
import {IFuelMessagePortal} from "../../../../../contracts/messaging/interfaces/ambs/fuel/IFuelMessagePortal.sol";
import {IRootManager} from "../../../../../contracts/messaging/interfaces/IRootManager.sol";

contract FuelHubConnectorForTest is FuelHubConnector {
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector
  ) FuelHubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector) {}

  function forTest_sendMessage(bytes memory _data, bytes memory _extraData) external {
    _sendMessage(_data, _extraData);
  }

  function forTest_processMessage(bytes memory _data) external {
    _processMessage(_data);
  }

  function forTest_verifySender(address _expected) external view returns (bool _isValid) {
    _isValid = _verifySender(_expected);
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
  address public owner = makeAddr("owner");
  address public stranger = makeAddr("stranger");
  address public recipientAddress = makeAddr("recipientAddress");
  FuelHubConnectorForTest public fuelHubConnector;

  function setUp() public {
    vm.prank(owner);
    fuelHubConnector = new FuelHubConnectorForTest(_l1Domain, _l2Domain, _amb, _rootManager, _l2Connector);
  }
}

contract Unit_Connector_FuelHubConnector_Constructor is Base {
  function test_constants() public {
    uint256 _expectedZeroMsgValue = 0;
    uint256 _expectedMessageLength = 32;
    assertEq(fuelHubConnector.ZERO_MSG_VALUE(), _expectedZeroMsgValue);
    assertEq(fuelHubConnector.MESSAGE_LENGTH(), _expectedMessageLength);
  }

  function test_checkConstructorArgs() public {
    assertEq(fuelHubConnector.DOMAIN(), _l1Domain);
    assertEq(fuelHubConnector.MIRROR_DOMAIN(), _l2Domain);
    assertEq(fuelHubConnector.AMB(), _amb);
    assertEq(fuelHubConnector.ROOT_MANAGER(), _rootManager);
    assertEq(fuelHubConnector.mirrorConnector(), _l2Connector);
    assertEq(address(fuelHubConnector.FUEL_MESSENGER_PORTAL()), _amb);
  }
}

contract Unit_Connector_FuelHubConnector_SendMessage is Base {
  function test_revertIfDataIsNot32Length(bytes memory _data, bytes memory _encodedData) public {
    vm.assume(_data.length != 32);
    vm.prank(user);
    vm.expectRevert(FuelHubConnector.FuelHubConnector_DataLengthIsNot32.selector);
    fuelHubConnector.forTest_sendMessage(_data, _encodedData);
  }

  function test_callSendMessage(bytes32 _root, address _recipientAddress) public {
    // Encode the root
    bytes memory _data = abi.encode(_root);

    // Parse the encoded refund address into a bytes32
    bytes32 _bytes32recipientAddress = fuelHubConnector.forTest_addressToBytes32(_recipientAddress);
    // Get the calldata for the `processMessage` function
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);

    // Mock `sendMessage` call on Fuel Messenger Portal and expect it to be called with the correct arguments
    _mockAndExpect(
      _amb,
      abi.encodeWithSelector(IFuelMessagePortal.sendMessage.selector, _bytes32recipientAddress, _calldata),
      ""
    );

    // Encode  the refund address
    bytes memory _encodedData = abi.encode(_recipientAddress);
    vm.prank(user);
    fuelHubConnector.forTest_sendMessage(_data, _encodedData);
  }
}

contract Unit_Connector_FuelHubConnector_ProcessMessage is Base {
  function test_revertIfCallerNotAMB(address _caller, bytes memory _data) public {
    vm.assume(_caller != _amb);
    // The message error of the revert is not specified since foundry doesn't able to use '!AMB' as arg on `vm.expectRevert()`
    vm.expectRevert();
    vm.prank(_caller);
    fuelHubConnector.forTest_processMessage(_data);
  }

  function test_revertIfDataIsNot32Length(bytes memory _data) public {
    vm.assume(_data.length != 32);
    vm.expectRevert();
    vm.prank(_amb);
    fuelHubConnector.forTest_processMessage(_data);
  }

  function test_callMessageSender(bytes32 _root) public {
    // Mock `messageSender` call on Fuel Messenger Portal and expect it to be called with the correct arguments
    _mockAndExpect(_amb, abi.encodeWithSelector(IFuelMessagePortal.messageSender.selector), abi.encode(_l2Connector));
    // Mock `aggregate` call on Root Manager
    vm.mockCall(_rootManager, abi.encodeWithSelector(IRootManager.aggregate.selector, _l2Domain, _root), "");

    // Encode the root
    bytes memory _data = abi.encode(_root);
    vm.prank(_amb);
    fuelHubConnector.forTest_processMessage(_data);
  }

  function test_callAggregate(bytes32 _root) public {
    // Mock `aggregate` call on Root Manager and expect it to be called with the correct arguments
    _mockAndExpect(_rootManager, abi.encodeWithSelector(IRootManager.aggregate.selector, _l2Domain, _root), "");

    // Mock `messageSender` call on Fuel Messenger Portal to return the mirror sender
    vm.mockCall(_amb, abi.encodeWithSelector(IFuelMessagePortal.messageSender.selector), abi.encode(_l2Connector));

    // Encode the root
    bytes memory _data = abi.encode(_root);
    vm.prank(_amb);
    fuelHubConnector.forTest_processMessage(_data);
  }
}

contract Unit_Connector_FuelHubConnector_VerifySender is Base {
  function test_returnFalseIfSenderNotMirror(address _sender) public {
    vm.assume(_sender != _l2Connector);
    vm.mockCall(_amb, abi.encodeWithSelector(IFuelMessagePortal.messageSender.selector), abi.encode(_l2Connector));
    assertEq(fuelHubConnector.forTest_verifySender(_sender), false);
  }

  function test_returnTrueIfSenderIsMirror() public {
    vm.mockCall(_amb, abi.encodeWithSelector(IFuelMessagePortal.messageSender.selector), abi.encode(_l2Connector));
    assertEq(fuelHubConnector.forTest_verifySender(_l2Connector), true);
  }
}

contract Unit_Connector_FuelHubConnector_Bytes32ToAddress is Base {
  function test_bytes32ToAddress(bytes32 _bytes) public {
    address _expectedAddress = address(uint160(uint256(_bytes)));
    assertEq(fuelHubConnector.forTest_bytes32ToAddress(_bytes), _expectedAddress);
  }
}

contract Unit_Connector_FuelHubConnector_AddressToBytes32 is Base {
  function test_addressToBytes32(address _address) public {
    bytes32 _expectedBytes = bytes32(abi.encode(_address));
    assertEq(fuelHubConnector.forTest_addressToBytes32(_address), _expectedBytes);
  }
}
