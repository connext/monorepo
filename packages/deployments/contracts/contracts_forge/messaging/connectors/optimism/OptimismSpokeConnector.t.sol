// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import "@openzeppelin/contracts/crosschain/errors.sol";
import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";

import {OptimismSpokeConnector} from "../../../../contracts/messaging/connectors/optimism/OptimismSpokeConnector.sol";
import {OptimismAmb} from "../../../../contracts/messaging/interfaces/ambs/optimism/OptimismAmb.sol";
import {MerkleTreeManager} from "../../../../contracts/messaging/MerkleTreeManager.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract OptimismSpokeConnectorTest is ConnectorHelper {
  // ============ Events ============
  event DefaultGasPriceUpdated(uint256 previous, uint256 current);

  // ============ Storage ============

  // ============ Test set up ============
  function setUp() public {
    _l1Connector = payable(address(123321123));

    _merkle = address(new MerkleTreeManager());

    SpokeConnector.ConstructorParams memory _baseParams = SpokeConnector.ConstructorParams({
      domain: _l2Domain,
      mirrorDomain: _l1Domain,
      amb: _amb,
      rootManager: _rootManager,
      mirrorConnector: _l1Connector,
      processGas: _processGas,
      reserveGas: _reserveGas,
      delayBlocks: 0,
      merkle: _merkle,
      watcherManager: address(0),
      minDisputeBlocks: _minDisputeBlocks,
      disputeBlocks: _disputeBlocks
    });

    // deploy
    _l2Connector = payable(address(new OptimismSpokeConnector(_baseParams, _gasCap)));
  }

  // ============ Utils ============
  function utils_setSpokeConnectorVerifyMocks(address _sender) public {
    // call to l2 bridge to get address
    vm.mockCall(_amb, abi.encodeWithSelector(OptimismAmb.xDomainMessageSender.selector), abi.encode(_sender));
  }

  // ============ OptimismSpokeConnector.verifySender ============
  function test_OptimismSpokeConnector__verifySender_shouldWorkIfSenderExpected() public {
    address expected = address(234);
    utils_setSpokeConnectorVerifyMocks(expected);

    vm.prank(_amb);
    assertTrue(OptimismSpokeConnector(_l2Connector).verifySender(expected));
  }

  function test_OptimismSpokeConnector__verifySender_shouldWorkIfSenderNotExpected() public {
    address expected = address(234);
    address notExpected = address(123);
    utils_setSpokeConnectorVerifyMocks(notExpected);

    vm.prank(_amb);
    assertEq(OptimismSpokeConnector(_l2Connector).verifySender(expected), false);
  }

  function test_OptimismSpokeConnector__verifySender_shouldFailIfCallerNotAmb() public {
    address expected = address(234);

    vm.expectRevert(bytes("!bridge"));
    assertEq(OptimismSpokeConnector(_l2Connector).verifySender(expected), false);
  }

  // ============ OptimismSpokeConnector.sendMessage ============
  function test_OptimismSpokeConnector__sendMessage_works() public {
    bytes32 outboundRoot = OptimismSpokeConnector(_l2Connector).outboundRoot();
    bytes memory _data = abi.encode(outboundRoot);

    vm.mockCall(_amb, abi.encodeWithSelector(OptimismAmb.sendMessage.selector), abi.encode());

    // encoded data
    bytes memory _encodedData = abi.encode(_gasCap);

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _encodedData, _rootManager);

    vm.expectCall(_amb, abi.encodeWithSelector(OptimismAmb.sendMessage.selector, _l1Connector, _data, _gasCap));

    vm.prank(_rootManager);
    OptimismSpokeConnector(_l2Connector).send(_encodedData);
  }

  // ============ OptimismSpokeConnector.processMessage ============
  function test_OptimismSpokeConnector__processMessage_works() public {
    utils_setSpokeConnectorVerifyMocks(_l1Connector);

    bytes memory _data = abi.encode(bytes32("test"));

    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_data, _amb);

    vm.prank(_amb);
    OptimismSpokeConnector(_l2Connector).processMessage(_data);

    // Check: root is marked as pending
    assertEq(OptimismSpokeConnector(_l2Connector).pendingAggregateRoots(bytes32(_data)), block.number);
  }

  function test_OptimismSpokeConnector__processMessage_failsIfNotMirrorConnector() public {
    utils_setSpokeConnectorVerifyMocks(address(123));

    bytes memory _data = abi.encode(bytes32("test"));

    vm.expectRevert(bytes("!mirrorConnector"));

    vm.prank(_amb);
    OptimismSpokeConnector(_l2Connector).processMessage(_data);
  }

  function test_OptimismSpokeConnector__processMessage_failsIfNot32Bytes() public {
    utils_setSpokeConnectorVerifyMocks(_l1Connector);

    bytes memory _data = abi.encode(bytes32("test"), 123123123);

    vm.expectRevert(bytes("!length"));

    vm.prank(_amb);
    OptimismSpokeConnector(_l2Connector).processMessage(_data);
  }

  // ============ Fuzz Tests ============
  function test_OptimismSpokeConnector__processMessage_works_fuzz(bytes32 data) public {
    if (data == bytes32("")) return;
    utils_setSpokeConnectorVerifyMocks(_l1Connector);

    bytes memory _data = abi.encode(data);

    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_data, _amb);

    vm.prank(_amb);
    OptimismSpokeConnector(_l2Connector).processMessage(_data);

    // Check: root is marked as pending
    assertEq(OptimismSpokeConnector(_l2Connector).pendingAggregateRoots(bytes32(_data)), block.number);
  }
}
