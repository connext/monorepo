// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import "@openzeppelin/contracts/crosschain/errors.sol";

import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";
import {MerkleTreeManager} from "../../../../contracts/messaging/MerkleTreeManager.sol";

import {PolygonSpokeConnector} from "../../../../contracts/messaging/connectors/polygon/PolygonSpokeConnector.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract PolygonSpokeConnectorTest is ConnectorHelper {
  // MessageTunnel on L1 will get data from this event
  event MessageSent(bytes message);

  // ============ Test set up ============
  function setUp() public {
    // deploy
    _l1Connector = payable(address(123));

    _merkle = address(new MerkleTreeManager());

    SpokeConnector.ConstructorParams memory _baseParams = SpokeConnector.ConstructorParams({
      domain: _l2Domain,
      mirrorDomain: _l1Domain,
      amb: _amb,
      rootManager: _rootManager,
      mirrorConnector: address(0),
      processGas: _processGas,
      reserveGas: _reserveGas,
      delayBlocks: 0,
      merkle: _merkle,
      watcherManager: address(1),
      minDisputeBlocks: _minDisputeBlocks,
      disputeBlocks: _disputeBlocks
    });

    _l2Connector = payable(address(new PolygonSpokeConnector(_baseParams)));
  }

  // ============ Utils ============

  // ============ PolygonSpokeConnector.verifySender ============
  function test_PolygonSpokeConnector__verifySender_shouldReturnFalse() public {
    address expected = address(1);

    vm.prank(_amb);
    assertTrue(!PolygonSpokeConnector(_l2Connector).verifySender(expected));
  }

  // ============ PolygonSpokeConnector.setMirrorConnector ============
  function test_PolygonSpokeConnector__setMirrorConnector_shouldWork() public {
    PolygonSpokeConnector(_l2Connector).setMirrorConnector(_l1Connector);
    assertEq(PolygonSpokeConnector(_l2Connector).mirrorConnector(), _l1Connector);
    assertEq(PolygonSpokeConnector(_l2Connector).fxRootTunnel(), _l1Connector);
  }

  function test_PolygonSpokeConnector__setMirrorConnector_failedIfAlreadySet() public {
    PolygonSpokeConnector(_l2Connector).setMirrorConnector(_l1Connector);
    assertEq(PolygonSpokeConnector(_l2Connector).fxRootTunnel(), _l1Connector);

    vm.expectRevert(bytes("FxBaseChildTunnel: ROOT_TUNNEL_ALREADY_SET"));

    PolygonSpokeConnector(_l2Connector).setMirrorConnector(_l1Connector);
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
    emit MessageSent(_data, bytes(""), _rootManager);

    vm.prank(_rootManager);
    PolygonSpokeConnector(_l2Connector).send(bytes(""));
  }

  // ============ PolygonSpokeConnector.processMessage ============
  function test_PolygonSpokeConnector__processMessage_works() public {
    PolygonSpokeConnector(_l2Connector).setMirrorConnector(_l1Connector);

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

    // Check: root is marked as pending
    assertEq(PolygonSpokeConnector(_l2Connector).pendingAggregateRoots(bytes32(_data)), block.number);
  }

  function test_PolygonSpokeConnector__processMessage_works_fuzz(bytes32 data) public {
    // data with bytes32 0 is not allowed by SpokeConnector.receiveAggregateRoot
    if (data == bytes32("")) return;
    PolygonSpokeConnector(_l2Connector).setMirrorConnector(_l1Connector);

    // get outbound data
    bytes memory _data = abi.encode(data);
    uint256 stateId = 1;
    address rootSender = _l1Connector;

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_data, _amb);

    // make call
    vm.prank(_amb);
    PolygonSpokeConnector(_l2Connector).processMessageFromRoot(stateId, rootSender, _data);

    // Check: root is marked as pending
    assertEq(PolygonSpokeConnector(_l2Connector).pendingAggregateRoots(bytes32(_data)), block.number);
  }

  function test_PolygonSpokeConnector__processMessage_failsIfNotAmb() public {
    PolygonSpokeConnector(_l2Connector).setMirrorConnector(_l1Connector);

    bytes memory _data = abi.encode(bytes32("test"));
    uint256 stateId = 1;
    address rootSender = _l1Connector;

    // call does not originate from amb
    vm.expectRevert(bytes("FxBaseChildTunnel: INVALID_SENDER"));
    // make call
    PolygonSpokeConnector(_l2Connector).processMessageFromRoot(stateId, rootSender, _data);
  }

  function test_PolygonSpokeConnector__processMessage_failsIfNotMirrorConnector() public {
    PolygonSpokeConnector(_l2Connector).setMirrorConnector(_l1Connector);

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
    PolygonSpokeConnector(_l2Connector).setMirrorConnector(_l1Connector);

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
