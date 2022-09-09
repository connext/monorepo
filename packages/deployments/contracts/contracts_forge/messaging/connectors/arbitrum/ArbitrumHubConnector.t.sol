// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IOutbox as ArbitrumL1_Outbox} from "@openzeppelin/contracts/vendor/arbitrum/IOutbox.sol";
import {IBridge as ArbitrumL1_Bridge} from "@openzeppelin/contracts/vendor/arbitrum/IBridge.sol";
import {IArbSys as ArbitrumL2_Bridge} from "@openzeppelin/contracts/vendor/arbitrum/IArbSys.sol";
import "@openzeppelin/contracts/crosschain/errors.sol";

import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";

import {ArbitrumHubConnector} from "../../../../contracts/messaging/connectors/arbitrum/ArbitrumHubConnector.sol";

import {ArbitrumL1Amb} from "../../../../contracts/messaging/interfaces/ambs/ArbitrumL1Amb.sol";
import {ArbitrumL2Amb} from "../../../../contracts/messaging/interfaces/ambs/ArbitrumL2Amb.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract ArbitrumHubConnectorTest is ConnectorHelper {
  // ============ Events ============
  event DefaultGasPriceUpdated(uint256 previous, uint256 current);

  // ============ Storage ============
  uint256 _defaultGasPrice = 10 gwei;

  function setUp() public {
    _l2Connector = address(3432123);
    // deploy
    _l1Connector = address(
      new ArbitrumHubConnector(_l1Domain, _l2Domain, _amb, _rootManager, _l2Connector, _mirrorGas, _defaultGasPrice)
    );
  }

  // ============ Utils ============
  function utils_setHubConnectorVerifyMocks(address _sender) public {
    // setup mocks
    address outbox = address(654321);
    // 1. call to amb on active outbox
    vm.mockCall(_amb, abi.encodeWithSelector(ArbitrumL1_Bridge.activeOutbox.selector), abi.encode(outbox));

    // 2. call to outbox to get sender
    vm.mockCall(outbox, abi.encodeWithSelector(ArbitrumL1_Outbox.l2ToL1Sender.selector), abi.encode(_sender));
  }

  function utils_setHubConnectorProcessMocks(address _sender) public {
    utils_setHubConnectorVerifyMocks(_sender);
    // 3. call to root manager
    vm.mockCall(_rootManager, abi.encodeWithSelector(IRootManager.setOutboundRoot.selector), abi.encode(true));
  }

  // ============ ArbitrumHubConnector.setDefaultGasPrice ============
  function test_ArbitrumHubConnector__setDefaultGasPrice_shouldWork() public {
    uint256 updated = 100 wei;
    vm.expectEmit(true, true, true, true);
    emit DefaultGasPriceUpdated(_defaultGasPrice, updated);

    vm.prank(ArbitrumHubConnector(_l1Connector).owner());
    ArbitrumHubConnector(_l1Connector).setDefaultGasPrice(updated);
    assertEq(ArbitrumHubConnector(_l1Connector).defaultGasPrice(), updated);
  }

  // ============ ArbitrumHubConnector.verifySender ============
  function test_ArbitrumHubConnector__verifySender_shouldWorkIfTrue() public {
    address expected = address(234);
    utils_setHubConnectorVerifyMocks(expected);

    vm.prank(_amb);
    assertTrue(ArbitrumHubConnector(_l1Connector).verifySender(expected));
  }

  function test_ArbitrumHubConnector__verifySender_shouldWorkIfFalse() public {
    address expected = address(234);
    utils_setHubConnectorVerifyMocks(address(122));

    vm.prank(_amb);
    assertEq(ArbitrumHubConnector(_l1Connector).verifySender(expected), false);
  }

  function test_ArbitrumHubConnector__verifySender_shouldFailIfCallerNotAmb() public {
    address expected = address(234);
    utils_setHubConnectorVerifyMocks(expected);

    vm.expectRevert(NotCrossChainCall.selector);
    assertEq(ArbitrumHubConnector(_l1Connector).verifySender(expected), false);
  }

  // ============ ArbitrumHubConnector.sendMessage ============
  function test_ArbitrumHubConnector__sendMessage_works() public {
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

  // ============ ArbitrumHubConnector.processMessage ============
  function test_ArbitrumHubConnector__processMessage_works() public {
    utils_setHubConnectorProcessMocks(_l2Connector);

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

  function test_ArbitrumHubConnector__processMessage_failsIfNotSentByBridge() public {
    utils_setHubConnectorProcessMocks(_l2Connector);

    // call does not originate from amb
    vm.expectRevert(bytes("!AMB"));
    // make call
    ArbitrumHubConnector(_l1Connector).processMessage(abi.encode(bytes32("test")));
  }

  function test_ArbitrumHubConnector__processMessage_failsIfNotMirrorConnector() public {
    // setup mocks
    utils_setHubConnectorProcessMocks(address(654321));

    // should revert because not bridge
    vm.expectRevert(bytes("!mirrorConnector"));
    // call comes from amb
    vm.prank(_amb);
    // make call
    ArbitrumHubConnector(_l1Connector).processMessage(abi.encode(bytes32("test")));
  }

  function test_ArbitrumHubConnector__processMessage_failsIfNot32Bytes() public {
    utils_setHubConnectorProcessMocks(_l2Connector);

    // get outbound data
    bytes memory _data = abi.encode(bytes32("test"), 123123123);

    // should revert because not bridge
    vm.expectRevert(bytes("!length"));
    // call comes from amb
    vm.prank(_amb);
    // make call
    ArbitrumHubConnector(_l1Connector).processMessage(_data);
  }
}
