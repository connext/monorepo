// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {TypeCasts} from "../../../contracts/nomad-core/libs/TypeCasts.sol";
import {Message} from "../../../contracts/nomad-core/libs/Message.sol";

import {RootManager} from "../../../contracts/core/messaging/RootManager.sol";
import {Messaging} from "../../../contracts/core/messaging/Messaging.sol";

import "../../utils/ForgeHelper.sol";
import "../../utils/Mock.sol";

import "forge-std/console.sol";

/**
 * @notice This contract is designed to test the full messaging flow using
 * mocked mainnet and l2 connectors
 */
contract PingPong is ForgeHelper {
  // ============ Events ============
  event MessageSent(bytes data, address caller);
  event MessageProcessed(address from, bytes data, address caller);

  // ============ Storage ============

  // ============ config
  uint32 _originDomain = uint32(123);
  address _originAMB = address(123);

  uint32 _destinationDomain = uint32(456);
  address _destinationAMB = address(456);

  uint32 _mainnetDomain = uint32(345);
  address _destinationMainnetAMB = address(456456);
  address _originMainnetAMB = address(123123);

  uint256 PROCESS_GAS = 850_000;
  uint256 RESERVE_GAS = 15_000;

  // ============ connectors
  address _originConnectorL2;
  address _originConnectorL1;
  address _destinationConnectorL2;
  address _destinationConnectorL1;

  // ============ root manager
  address _rootManager;

  // ============ destination router
  bytes32 _destinationRouter;

  // ============ Test set up ============
  function setUp() public {
    // deploy the contracts
    utils_deployContracts();
    // deploy + configure the root manager
    utils_configureContracts();
  }

  // ============ Utils ============
  function utils_deployContracts() public {
    // deploy root manager
    _rootManager = address(new RootManager());
    // Mock sourceconnector on l2
    _originConnectorL2 = address(
      new MockConnector(
        _originDomain, // uint32 _domain,
        _originAMB, // address _amb,
        _rootManager, // address _rootManager,
        PROCESS_GAS, // uint256 _processGas,
        RESERVE_GAS, // uint256 _reserveGas
        _mainnetDomain,
        address(0)
      )
    );
    // Mock sourceconnector on l1
    _originConnectorL1 = address(
      new MockConnector(
        _mainnetDomain, // uint32 _domain,
        _originMainnetAMB, // address _amb,
        _rootManager, // address _rootManager,
        PROCESS_GAS, // uint256 _processGas,
        RESERVE_GAS, // uint256 _reserveGas
        _originDomain, // uint32 _mirrorDomain,
        _originConnectorL2 // address _mirrorConnector
      )
    );
    // Mock dest connector on l2
    _destinationConnectorL2 = address(
      new MockConnector(
        _destinationDomain, // uint32 _domain,
        _destinationAMB, // address _amb,
        _rootManager, // address _rootManager,
        PROCESS_GAS, // uint256 _processGas,
        RESERVE_GAS, // uint256 _reserveGas
        _mainnetDomain,
        address(0)
      )
    );
    // Mock dest connector on l1
    _destinationConnectorL1 = address(
      new MockConnector(
        _destinationDomain, // uint32 _domain,
        _destinationMainnetAMB, // address _amb,
        _rootManager, // address _rootManager,
        PROCESS_GAS, // uint256 _processGas,
        RESERVE_GAS, // uint256 _reserveGas
        _destinationDomain,
        _destinationConnectorL2
      )
    );
    _destinationRouter = TypeCasts.addressToBytes32(address(new MockRelayerFeeRouter()));
  }

  function utils_configureContracts() public {
    // enroll this as approved sender for messaging
    Messaging(_originConnectorL2).addSender(address(this));
    Connector(_originConnectorL2).setMirrorConnector(_originConnectorL1);
    Connector(_destinationConnectorL2).setMirrorConnector(_destinationConnectorL1);
    // check setup
    assertEq(Connector(_destinationConnectorL2).mirrorConnector(), _destinationConnectorL1);
    assertEq(Connector(_originConnectorL2).mirrorConnector(), _originConnectorL1);
    assertEq(Connector(_destinationConnectorL1).mirrorConnector(), _destinationConnectorL2);
    assertEq(Connector(_originConnectorL1).mirrorConnector(), _originConnectorL2);

    MockConnector(_destinationConnectorL2).setUpdatesAggregate(true);

    // configure root manager with connectors
    RootManager(_rootManager).addConnector(_originDomain, _originConnectorL1);
    RootManager(_rootManager).addConnector(_destinationDomain, _destinationConnectorL1);
    // check setup
    assertEq(RootManager(_rootManager).connectors(_originDomain), _originConnectorL1);
    assertEq(RootManager(_rootManager).connectors(_destinationDomain), _destinationConnectorL1);
    assertEq(RootManager(_rootManager).domains(0), _originDomain);
    assertEq(RootManager(_rootManager).domains(1), _destinationDomain);
  }

  // ============ Testing scenarios ============
  function test_messageFlowsWork() public {
    // 1. Send message through Messaging contract
    bytes memory body = abi.encode(_destinationDomain * _originDomain);
    assertEq(Messaging(_originConnectorL2).outboundRoot(), bytes32(0));
    Messaging(_originConnectorL2).dispatch(_destinationDomain, _destinationRouter, body);
    // assert added to outboundRoot
    assertEq(Messaging(_originConnectorL2).count(), 1);
    // TODO: actually assert this is the correct root outside of using hardcoded values
    assertEq(
      Messaging(_originConnectorL2).outboundRoot(),
      bytes32(0x86fa2992f68fd0ba27a6303c3704838c670c809d4f602481f9bcdefc5687aa23)
    );

    // 2. Send outboundRoot through Connector to mainnet
    bytes32 outboundRoot = Messaging(_originConnectorL2).outboundRoot();
    vm.expectEmit(true, true, true, true);
    emit MessageSent(abi.encode(outboundRoot), address(this));
    Messaging(_originConnectorL2).send();
    assertEq(keccak256(abi.encode(outboundRoot)), MockConnector(_originConnectorL2).lastOutbound());

    // 3. Process outboundRoot on mainnet
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(address(this), abi.encode(outboundRoot), _originMainnetAMB);
    vm.prank(_originMainnetAMB);
    MockConnector(_originConnectorL1).processMessage(address(this), abi.encode(outboundRoot));
    assertEq(RootManager(_rootManager).outboundRoots(_originDomain), outboundRoot);
    assertEq(
      MockConnector(_originConnectorL1).lastReceived(),
      keccak256(abi.encode(address(this), abi.encode(outboundRoot)))
    );

    // 4. Propagate roots to both connectors
    bytes memory expectedAggregate = abi.encodePacked(outboundRoot);
    RootManager(_rootManager).propagate();
    assertEq(MockConnector(_originConnectorL1).lastOutbound(), keccak256(expectedAggregate));
    assertEq(MockConnector(_destinationConnectorL1).lastOutbound(), keccak256(expectedAggregate));

    // 5. Process aggregateRoot on destination
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(address(this), expectedAggregate, _destinationAMB);
    vm.prank(_destinationAMB);
    MockConnector(_destinationConnectorL2).processMessage(address(this), expectedAggregate);
    assertEq(Messaging(_destinationConnectorL2).aggregateRoot(), outboundRoot);

    // 6. Process original message
    bytes memory message = Message.formatMessage(
      _originDomain,
      bytes32(uint256(uint160(address(this)))), // TODO necessary?
      0,
      _destinationDomain,
      _destinationRouter,
      body
    );
    // TODO: fix proof
    bytes32[32] memory proof;
    // TODO: fix index
    Messaging(_destinationConnectorL2).proveAndProcess(message, proof, 0);
    assertEq(uint256(Messaging(_destinationConnectorL2).messages(keccak256(message))), 2);
    assertEq(MockRelayerFeeRouter(TypeCasts.bytes32ToAddress(_destinationRouter)).handledOrigin(), _originDomain);
    assertEq(MockRelayerFeeRouter(TypeCasts.bytes32ToAddress(_destinationRouter)).handledNonce(), 0);
    assertEq(
      MockRelayerFeeRouter(TypeCasts.bytes32ToAddress(_destinationRouter)).handledSender(),
      TypeCasts.addressToBytes32(address(this))
    );
    assertEq(MockRelayerFeeRouter(TypeCasts.bytes32ToAddress(_destinationRouter)).handledBody(), body);
  }
}
