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
}

contract Base is ConnectorHelper {
  address public user = makeAddr("user");
  address public owner = makeAddr("owner");
  address public stranger = makeAddr("stranger");
  address public refundAddress = makeAddr("refundAddress");
  bytes32 public rootSnapshot = keccak256(abi.encodePacked("rootSnapshot"));
  bytes32 public aggregateRoot = keccak256(abi.encodePacked("aggregateRoot"));
  FuelHubConnectorForTest public fuelHubConnector;

  function setUp() public {
    vm.prank(owner);
    fuelHubConnector = new FuelHubConnectorForTest(_l1Domain, _l2Domain, _amb, _rootManager, _l2Connector);
  }
}

contract Unit_Connector_FuelHubConnector_Constructor is Base {
  function test_checkConstructorArgs() public {
    assertEq(fuelHubConnector.DOMAIN(), _l1Domain);
    assertEq(fuelHubConnector.MIRROR_DOMAIN(), _l2Domain);
    assertEq(fuelHubConnector.AMB(), _amb);
    assertEq(fuelHubConnector.ROOT_MANAGER(), _rootManager);
    assertEq(fuelHubConnector.mirrorConnector(), _l2Connector);
  }
}

contract Unit_Connector_FuelHubConnector_SendMessage is Base {
  function test_revertIfDataIsNot32Length(bytes memory _data) public {
    vm.assume(_data.length != 32);
    bytes memory _encodedData = "";

    vm.prank(user);
    vm.expectRevert(FuelHubConnector.FuelHubConnector_DataLengthIsNot32.selector);
    fuelHubConnector.forTest_sendMessage(_data, _encodedData);
  }
}
