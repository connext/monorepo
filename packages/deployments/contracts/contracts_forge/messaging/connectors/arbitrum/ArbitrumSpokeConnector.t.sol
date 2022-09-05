// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IOutbox as ArbitrumL1_Outbox} from "@openzeppelin/contracts/vendor/arbitrum/IOutbox.sol";
import {IBridge as ArbitrumL1_Bridge} from "@openzeppelin/contracts/vendor/arbitrum/IBridge.sol";
import {IArbSys as ArbitrumL2_Bridge} from "@openzeppelin/contracts/vendor/arbitrum/IArbSys.sol";
import "@openzeppelin/contracts/crosschain/errors.sol";

import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";

import {ArbitrumSpokeConnector} from "../../../../contracts/messaging/connectors/arbitrum/ArbitrumSpokeConnector.sol";

import {ArbitrumL1Amb} from "../../../../contracts/messaging/interfaces/ambs/ArbitrumL1Amb.sol";
import {ArbitrumL2Amb} from "../../../../contracts/messaging/interfaces/ambs/ArbitrumL2Amb.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract ArbitrumSpokeConnectorTest is ConnectorHelper {
  // ============ Events ============
  event DefaultGasPriceUpdated(uint256 previous, uint256 current);

  // ============ Storage ============
  uint256 _defaultGasPrice = 10 gwei;

  // ============ Test set up ============
  function setUp() public {
    // deploy
    _l1Connector = address(123321123);

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
  }

  // ============ Utils ============
  function utils_setSpokeConnectorVerifyMocks(address _sender, bool _isCrosschain) public {
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

  // ============ ArbitrumSpokeConnector.verifySender ============
  function test_ArbitrumSpokeConnector__verifySender_shouldWorkIfTrue() public {
    address expected = address(234);
    utils_setSpokeConnectorVerifyMocks(expected, true);

    assertTrue(ArbitrumSpokeConnector(_l2Connector).verifySender(expected));
  }

  function test_ArbitrumSpokeConnector__verifySender_shouldWorkIfFalse() public {
    address expected = address(234);
    utils_setSpokeConnectorVerifyMocks(address(122), true);

    assertEq(ArbitrumSpokeConnector(_l2Connector).verifySender(expected), false);
  }

  function test_ArbitrumSpokeConnector__verifySender_shouldFailIfCallerNotAmb() public {
    address expected = address(234);
    utils_setSpokeConnectorVerifyMocks(expected, false);

    vm.expectRevert(NotCrossChainCall.selector);
    assertEq(ArbitrumSpokeConnector(_l2Connector).verifySender(expected), false);
  }

  // ============ ArbitrumSpokeConnector.sendMessage ============
  function test_ArbitrumSpokeConnector__sendMessage_works() public {
    // setup mock
    vm.mockCall(
      _amb,
      abi.encodeWithSelector(ArbitrumL2Amb.sendTxToL1.selector),
      abi.encode(ArbitrumSpokeConnector(_l2Connector).outboundRoot())
    );

    // data
    bytes memory _data = abi.encode(ArbitrumSpokeConnector(_l2Connector).outboundRoot());

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _rootManager);

    // should call send contract transaction
    vm.expectCall(_amb, abi.encodeWithSelector(ArbitrumL2Amb.sendTxToL1.selector, _l1Connector, _data));

    vm.prank(_rootManager);
    ArbitrumSpokeConnector(_l2Connector).send();
  }

  // ============ ArbitrumSpokeConnector.processMessage ============
  function test_ArbitrumSpokeConnector__processMessage_works() public {
    utils_setSpokeConnectorVerifyMocks(_l1Connector, true);

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

  function test_ArbitrumSpokeConnector__processMessage_failsIfNotCrosschain() public {
    utils_setSpokeConnectorVerifyMocks(_l1Connector, false);

    // call does not originate from amb
    vm.expectRevert(bytes("!AMB"));
    // make call
    ArbitrumSpokeConnector(_l2Connector).processMessage(abi.encode(bytes32("test")));
  }

  function test_ArbitrumL2Connectoclearr__processMessage_failsIfNotMirrorConnector() public {
    // setup mocks
    utils_setSpokeConnectorVerifyMocks(address(654321), true);

    // should revert because not bridge
    vm.expectRevert(bytes("!mirrorConnector"));
    // make call
    vm.prank(_amb);
    ArbitrumSpokeConnector(_l2Connector).processMessage(abi.encode(bytes32("test")));
  }

  function test_ArbitrumSpokeConnector__processMessage_failsIfNot32Bytes() public {
    utils_setSpokeConnectorVerifyMocks(_l1Connector, true);

    // get outbound data
    bytes memory _data = abi.encode(bytes32("test"), 123123123);

    // should revert because not bridge
    vm.expectRevert(bytes("!length"));

    // make call
    vm.prank(_amb);
    ArbitrumSpokeConnector(_l2Connector).processMessage(_data);
  }
}
