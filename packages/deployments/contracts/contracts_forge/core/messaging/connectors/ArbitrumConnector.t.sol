// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IOutbox as ArbitrumL1_Outbox} from "@openzeppelin/contracts/vendor/arbitrum/IOutbox.sol";
import {IBridge as ArbitrumL1_Bridge} from "@openzeppelin/contracts/vendor/arbitrum/IBridge.sol";
import "@openzeppelin/contracts/crosschain/errors.sol";

import {IRootManager} from "../../../../contracts/core/messaging/interfaces/IRootManager.sol";

import {Connector} from "../../../../contracts/core/messaging/connectors/Connector.sol";
import {ArbitrumL1Connector, ArbitrumL2Connector, ArbitrumL1AMB} from "../../../../contracts/core/messaging/connectors/ArbitrumConnector.sol";

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
      new ArbitrumL1Connector(
        _l1Domain,
        _l2Domain,
        _amb,
        _rootManager,
        address(0),
        _mirrorProcessGas,
        _processGas,
        _reserveGas,
        _defaultGasPrice
      )
    );

    _l2Connector = address(
      new ArbitrumL2Connector(
        _l2Domain,
        _l1Domain,
        _amb,
        _rootManager,
        _l1Connector,
        _mirrorProcessGas,
        _processGas,
        _reserveGas
      )
    );

    // set mirror connector on l1
    ArbitrumL1Connector(_l1Connector).setMirrorConnector(_l2Connector);
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

  function utils_setL1ConnectorProcessMocks(address _sender) public {
    utils_setL1ConnectorVerifyMocks(_sender);
    // 3. call to root manager
    vm.mockCall(_rootManager, abi.encodeWithSelector(IRootManager.setOutboundRoot.selector), abi.encode(true));
  }

  // ============ setDefaultGasPrice ============
  function test_ArbitrumL1Connector__setDefaultGasPrice_shouldWork() public {
    uint256 updated = 100 wei;
    vm.expectEmit(true, true, true, true);
    emit DefaultGasPriceUpdated(_defaultGasPrice, updated);

    vm.prank(ArbitrumL1Connector(_l1Connector).owner());
    ArbitrumL1Connector(_l1Connector).setDefaultGasPrice(updated);
    assertEq(ArbitrumL1Connector(_l1Connector).defaultGasPrice(), updated);
  }

  // ============ verifySender ============
  function test_ArbitrumL1Connector__verifySender_shouldWorkIfTrue() public {
    address expected = address(234);
    utils_setL1ConnectorVerifyMocks(expected);

    vm.prank(_amb);
    assertTrue(ArbitrumL1Connector(_l1Connector).verifySender(expected));
  }

  function test_ArbitrumL1Connector__verifySender_shouldWorkIfFalse() public {
    address expected = address(234);
    utils_setL1ConnectorVerifyMocks(address(122));

    vm.prank(_amb);
    assertEq(ArbitrumL1Connector(_l1Connector).verifySender(expected), false);
  }

  function test_ArbitrumL1Connector__verifySender_shouldFailIfCallerNotAmb() public {
    address expected = address(234);
    utils_setL1ConnectorVerifyMocks(expected);

    vm.expectRevert(NotCrossChainCall.selector);
    assertEq(ArbitrumL1Connector(_l1Connector).verifySender(expected), false);
  }

  // ============ sendMessage ============
  function test_ArbitrumL1Connector__sendMessage_works() public {
    // setup mock
    vm.mockCall(_amb, abi.encodeWithSelector(ArbitrumL1AMB.sendContractTransaction.selector), abi.encode(123));

    // data
    bytes memory _data = abi.encode(123123123);

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, address(this));

    // should call send contract transaction
    vm.expectCall(
      _amb,
      abi.encodeWithSelector(
        ArbitrumL1AMB.sendContractTransaction.selector,
        _mirrorProcessGas,
        _defaultGasPrice,
        _l2Connector,
        0,
        _data
      )
    );

    ArbitrumL1Connector(_l1Connector).sendMessage(_data);
  }

  // ============ processMessage ============
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
    ArbitrumL1Connector(_l1Connector).processMessage(_data);
  }

  function test_ArbitrumL1Connector__processMessage_failsIfNotSentByBridge() public {
    utils_setL1ConnectorProcessMocks(_l2Connector);

    // call does not originate from amb
    vm.expectRevert(NotCrossChainCall.selector);
    // make call
    ArbitrumL1Connector(_l1Connector).processMessage(abi.encode(bytes32("test")));
  }

  function test_ArbitrumL1Connector__processMessage_failsIfNotMirrorConnector() public {
    // setup mocks
    utils_setL1ConnectorProcessMocks(address(654321));

    // should revert because not bridge
    vm.expectRevert(bytes("!mirrorConnector"));
    // call comes from amb
    vm.prank(_amb);
    // make call
    ArbitrumL1Connector(_l1Connector).processMessage(abi.encode(bytes32("test")));
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
    ArbitrumL1Connector(_l1Connector).processMessage(_data);
  }
}
