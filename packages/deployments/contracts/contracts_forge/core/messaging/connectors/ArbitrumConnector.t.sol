// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IOutbox as ArbitrumL1_Outbox} from "@openzeppelin/contracts/vendor/arbitrum/IOutbox.sol";
import {IBridge as ArbitrumL1_Bridge} from "@openzeppelin/contracts/vendor/arbitrum/IBridge.sol";
import {IArbSys as ArbitrumL2_Bridge} from "@openzeppelin/contracts/vendor/arbitrum/IArbSys.sol";

import "@openzeppelin/contracts/crosschain/errors.sol";

import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";

import {Connector} from "../../../../contracts/messaging/connectors/Connector.sol";
import {ArbitrumHubConnector} from "../../../../contracts/messaging/connectors/arbitrum/ArbitrumHubConnector.sol";
import {ArbitrumSpokeConnector} from "../../../../contracts/messaging/connectors/arbitrum/ArbitrumSpokeConnector.sol";
import {ArbitrumL1Amb} from "../../../../contracts/messaging/interfaces/ambs/ArbitrumL1Amb.sol";
import {ArbitrumL2Amb} from "../../../../contracts/messaging/interfaces/ambs/ArbitrumL2Amb.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

import "forge-std/console.sol";

contract ArbitrumConnectorTest is ConnectorHelper {
  // ============ Events ============
  event DefaultGasPriceUpdated(uint256 previous, uint256 current);

  // ============ Storage ============
  uint256 _defaultGasPrice = 10 gwei;

  // ============ Test set up ============
  function setUp() public {
    // deploy
    _l1Connector = address(
      new ArbitrumHubConnector(_l1Domain, _l2Domain, _amb, _rootManager, address(0), _mirrorGas, _defaultGasPrice)
    );

    _l2Connector = address(
      new ArbitrumSpokeConnector(
        _l2Domain,
        _l1Domain,
        _amb,
        _rootManager,
        _l1Connector,
        _mirrorGas,
        _processGas,
        _reserveGas
      )
    );

    // set mirror connector on l1
    ArbitrumHubConnector(_l1Connector).setMirrorConnector(_l2Connector);
  }

  // ============ Utils ============
  function utils_setL1ConnectorVerifyMocks(address _sender) public {
    // setup mocks
    address outbox = address(654321);
    // 1. call to amb on active outbox
    vm.mockCall(_amb, abi.encodeWithSelector(ArbitrumL1_Bridge.activeOutbox.selector), abi.encode(outbox));

    // 2. call to outbox to get sender
    vm.mockCall(outbox, abi.encodeWithSelector(ArbitrumL1_Outbox.l2ToL1Sender.selector), abi.encode(_sender));
  }

  function utils_setL2ConnectorVerifyMocks(address _sender, bool _isCrosschain) public {
    // setup mocks
    // 1. call to ensure it was a crosschain tx
    vm.mockCall(
      _amb,
      abi.encodeWithSelector(ArbitrumL2_Bridge.wasMyCallersAddressAliased.selector),
      abi.encode(_isCrosschain)
    );

    // 2. call to l2 bridge to get address
    vm.mockCall(
      _amb,
      abi.encodeWithSelector(ArbitrumL2_Bridge.myCallersAddressWithoutAliasing.selector),
      abi.encode(_sender)
    );
  }

  function utils_setL1ConnectorProcessMocks(address _sender) public {
    utils_setL1ConnectorVerifyMocks(_sender);
    // 3. call to root manager
    vm.mockCall(_rootManager, abi.encodeWithSelector(IRootManager.setOutboundRoot.selector), abi.encode(true));
  }

  // ============ ArbitrumHubConnector.setDefaultGasPrice ============
  function test_ArbitrumL1Connector__setDefaultGasPrice_shouldWork() public {
    uint256 updated = 100 wei;
    vm.expectEmit(true, true, true, true);
    emit DefaultGasPriceUpdated(_defaultGasPrice, updated);

    vm.prank(ArbitrumHubConnector(_l1Connector).owner());
    ArbitrumHubConnector(_l1Connector).setDefaultGasPrice(updated);
    assertEq(ArbitrumHubConnector(_l1Connector).defaultGasPrice(), updated);
  }

  // ============ ArbitrumHubConnector.verifySender ============
  function test_ArbitrumL1Connector__verifySender_shouldWorkIfTrue() public {
    address expected = address(234);
    utils_setL1ConnectorVerifyMocks(expected);

    vm.prank(_amb);
    assertTrue(ArbitrumHubConnector(_l1Connector).verifySender(expected));
  }

  function test_ArbitrumL1Connector__verifySender_shouldWorkIfFalse() public {
    address expected = address(234);
    utils_setL1ConnectorVerifyMocks(address(122));

    vm.prank(_amb);
    assertEq(ArbitrumHubConnector(_l1Connector).verifySender(expected), false);
  }

  function test_ArbitrumL1Connector__verifySender_shouldFailIfCallerNotAmb() public {
    address expected = address(234);
    utils_setL1ConnectorVerifyMocks(expected);

    vm.expectRevert(NotCrossChainCall.selector);
    assertEq(ArbitrumHubConnector(_l1Connector).verifySender(expected), false);
  }

  // ============ ArbitrumSpokeConnector.verifySender ============
  function test_ArbitrumL2Connector__verifySender_shouldWorkIfTrue() public {
    address expected = address(234);
    utils_setL2ConnectorVerifyMocks(expected, true);

    assertTrue(ArbitrumSpokeConnector(_l2Connector).verifySender(expected));
  }

  function test_ArbitrumL2Connector__verifySender_shouldWorkIfFalse() public {
    address expected = address(234);
    utils_setL2ConnectorVerifyMocks(address(122), true);

    assertEq(ArbitrumSpokeConnector(_l2Connector).verifySender(expected), false);
  }

  function test_ArbitrumL2Connector__verifySender_shouldFailIfCallerNotAmb() public {
    address expected = address(234);
    utils_setL2ConnectorVerifyMocks(expected, false);

    vm.expectRevert(NotCrossChainCall.selector);
    assertEq(ArbitrumSpokeConnector(_l2Connector).verifySender(expected), false);
  }

  // ============ ArbitrumHubConnector.sendMessage ============
  function test_ArbitrumL1Connector__sendMessage_works() public {
    // setup mock
    vm.mockCall(_amb, abi.encodeWithSelector(ArbitrumL1Amb.sendContractTransaction.selector), abi.encode(123));

    // data
    bytes memory _data = abi.encode(123123123);

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _rootManager);

    // should call send contract transaction
    vm.expectCall(
      _amb,
      abi.encodeWithSelector(
        ArbitrumL1Amb.sendContractTransaction.selector,
        _mirrorGas,
        _defaultGasPrice,
        _l2Connector,
        0,
        _data
      )
    );

    vm.prank(_rootManager);
    ArbitrumHubConnector(_l1Connector).sendMessage(_data);
  }

  // ============ ArbitrumSpokeConnector.sendMessage ============
  function test_ArbitrumL2Connector__sendMessage_works() public {
    // setup mock
    vm.mockCall(_amb, abi.encodeWithSelector(ArbitrumL2Amb.sendTxToL1.selector), abi.encode(123));

    // data
    bytes memory _data = abi.encode(123123123);

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _rootManager);

    // should call send contract transaction
    vm.expectCall(_amb, abi.encodeWithSelector(ArbitrumL2Amb.sendTxToL1.selector, _l1Connector, _data));

    vm.prank(_rootManager);
    ArbitrumSpokeConnector(_l2Connector).sendMessage(_data);
  }

  // ============ ArbitrumHubConnector.processMessage ============
  function test_ArbitrumL1Connector__processMessage_works() public {
    utils_setL1ConnectorProcessMocks(_l2Connector);

    // get outbound data
    bytes memory _data = abi.encode(bytes32("test"));

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_data, _amb);

    // should call root manager
    vm.expectCall(
      _rootManager,
      abi.encodeWithSelector(IRootManager.setOutboundRoot.selector, _l2Domain, bytes32(_data))
    );

    // call comes from amb
    vm.prank(_amb);
    // make call
    ArbitrumHubConnector(_l1Connector).processMessage(_data);
  }

  function test_ArbitrumL1Connector__processMessage_failsIfNotSentByBridge() public {
    utils_setL1ConnectorProcessMocks(_l2Connector);

    // call does not originate from amb
    vm.expectRevert(bytes("!AMB"));
    // make call
    ArbitrumHubConnector(_l1Connector).processMessage(abi.encode(bytes32("test")));
  }

  function test_ArbitrumL1Connector__processMessage_failsIfNotMirrorConnector() public {
    // setup mocks
    utils_setL1ConnectorProcessMocks(address(654321));

    // should revert because not bridge
    vm.expectRevert(bytes("!mirrorConnector"));
    // call comes from amb
    vm.prank(_amb);
    // make call
    ArbitrumHubConnector(_l1Connector).processMessage(abi.encode(bytes32("test")));
  }

  function test_ArbitrumL1Connector__processMessage_failsIfNot32Bytes() public {
    utils_setL1ConnectorProcessMocks(_l2Connector);

    // get outbound data
    bytes memory _data = abi.encode(bytes32("test"), 123123123);

    // should revert because not bridge
    vm.expectRevert(bytes("!length"));
    // call comes from amb
    vm.prank(_amb);
    // make call
    ArbitrumHubConnector(_l1Connector).processMessage(_data);
  }

  // ============ ArbitrumSpokeConnector.processMessage ============
  function test_ArbitrumL2Connector__processMessage_works() public {
    utils_setL2ConnectorVerifyMocks(_l1Connector, true);

    // get outbound data
    bytes memory _data = abi.encode(bytes32("test"));

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_data, _amb);

    // make call
    vm.prank(_amb);
    ArbitrumSpokeConnector(_l2Connector).processMessage(_data);

    // assert update
    assertEq(bytes32(_data), ArbitrumSpokeConnector(_l2Connector).aggregateRoot());
  }

  function test_ArbitrumL2Connector__processMessage_failsIfNotCrosschain() public {
    utils_setL2ConnectorVerifyMocks(_l1Connector, false);

    // call does not originate from amb
    vm.expectRevert(bytes("!AMB"));
    // make call
    ArbitrumSpokeConnector(_l2Connector).processMessage(abi.encode(bytes32("test")));
  }

  function test_ArbitrumL2Connectoclearr__processMessage_failsIfNotMirrorConnector() public {
    // setup mocks
    utils_setL2ConnectorVerifyMocks(address(654321), true);

    // should revert because not bridge
    vm.expectRevert(bytes("!mirrorConnector"));
    // make call
    vm.prank(_amb);
    ArbitrumSpokeConnector(_l2Connector).processMessage(abi.encode(bytes32("test")));
  }

  function test_ArbitrumL2Connector__processMessage_failsIfNot32Bytes() public {
    utils_setL2ConnectorVerifyMocks(_l1Connector, true);

    // get outbound data
    bytes memory _data = abi.encode(bytes32("test"), 123123123);

    // should revert because not bridge
    vm.expectRevert(bytes("!length"));

    // make call
    vm.prank(_amb);
    ArbitrumSpokeConnector(_l2Connector).processMessage(_data);
  }
}
