// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import "@openzeppelin/contracts/crosschain/errors.sol";

import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";

import {PolygonSpokeConnector} from "../../../../contracts/messaging/connectors/polygon/PolygonSpokeConnector.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract PolygonSpokeConnectorTest is ConnectorHelper {
  // MessageTunnel on L1 will get data from this event
  event MessageSent(bytes message);

  // ============ Test set up ============
  function setUp() public {
    // deploy
    _l1Connector = address(123321123);

    _l2Connector = address(
      new PolygonSpokeConnector(
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

  // ============ PolygonSpokeConnector.verifySender ============
  function test_PolygonSpokeConnector__verifySender_shouldWorkIfTrue() public {
    address expected = address(1);

    vm.prank(_amb);
    assertTrue(PolygonSpokeConnector(_l2Connector).verifySender(expected));
  }

  function test_PolygonSpokeConnector__verifySender_shouldFailIfCallerNotAmb() public {
    address expected = address(1);

    vm.expectRevert("!bridge");
    PolygonSpokeConnector(_l2Connector).verifySender(expected);
  }

  // ============ PolygonSpokeConnector.setFxRootTunnel ============
  function test_PolygonSpokeConnector__setFxRootTunnel_shouldWork() public {
    PolygonSpokeConnector(_l2Connector).setFxRootTunnel(_l1Connector);
    assertEq(PolygonSpokeConnector(_l2Connector).fxRootTunnel(), _l1Connector);
  }

  function test_PolygonSpokeConnector__setFxRootTunnel_failedIfAlreadySet() public {
    PolygonSpokeConnector(_l2Connector).setFxRootTunnel(_l1Connector);
    assertEq(PolygonSpokeConnector(_l2Connector).fxRootTunnel(), _l1Connector);

    vm.expectRevert(bytes("FxBaseChildTunnel: ROOT_TUNNEL_ALREADY_SET"));

    PolygonSpokeConnector(_l2Connector).setFxRootTunnel(_l1Connector);
  }

  // ============ PolygonSpokeConnector.sendMessage ============
  function test_PolygonSpokeConnector__sendMessage_works() public {
    // data
    bytes memory _data = abi.encode(PolygonSpokeConnector(_l2Connector).outboundRoot());

    // should call send contract transaction
    vm.expectEmit(true, false, false, true);
    emit MessageSent(_data);

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _rootManager);

    vm.prank(_rootManager);
    PolygonSpokeConnector(_l2Connector).send();
  }

  // ============ PolygonSpokeConnector.processMessage ============
  function test_PolygonSpokeConnector__processMessage_works() public {
    PolygonSpokeConnector(_l2Connector).setFxRootTunnel(_l1Connector);

    // get outbound data
    bytes memory _data = abi.encode(bytes32("test"));
    uint256 stateId = 1;
    address rootSender = _l1Connector;

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_data, _amb);

    // make call
    vm.prank(_amb);
    PolygonSpokeConnector(_l2Connector).processMessageFromRoot(stateId, rootSender, _data);

    // assert update
    assertEq(bytes32(_data), PolygonSpokeConnector(_l2Connector).aggregateRoot());
  }

  function test_PolygonSpokeConnector__processMessage_failsIfNotAmb() public {
    PolygonSpokeConnector(_l2Connector).setFxRootTunnel(_l1Connector);

    bytes memory _data = abi.encode(bytes32("test"));
    uint256 stateId = 1;
    address rootSender = _l1Connector;

    // call does not originate from amb
    vm.expectRevert(bytes("FxBaseChildTunnel: INVALID_SENDER"));
    // make call
    PolygonSpokeConnector(_l2Connector).processMessageFromRoot(stateId, rootSender, _data);
  }

  function test_PolygonSpokeConnector__processMessage_failsIfNotMirrorConnector() public {
    PolygonSpokeConnector(_l2Connector).setFxRootTunnel(_l1Connector);

    bytes memory _data = abi.encode(bytes32("test"));
    uint256 stateId = 1;
    address rootSender = address(1);

    // should revert because not bridge
    vm.expectRevert(bytes("FxBaseChildTunnel: INVALID_SENDER_FROM_ROOT"));
    // make call
    vm.prank(_amb);
    PolygonSpokeConnector(_l2Connector).processMessageFromRoot(stateId, rootSender, _data);
  }

  function test_PolygonSpokeConnector__processMessage_failsIfNot32Bytes() public {
    PolygonSpokeConnector(_l2Connector).setFxRootTunnel(_l1Connector);

    // get outbound data
    bytes memory _data = abi.encode(bytes32("test"), 123123123);
    uint256 stateId = 1;
    address rootSender = _l1Connector;

    // should revert because not bridge
    vm.expectRevert(bytes("!length"));

    // make call
    vm.prank(_amb);
    PolygonSpokeConnector(_l2Connector).processMessageFromRoot(stateId, rootSender, _data);
  }
}
