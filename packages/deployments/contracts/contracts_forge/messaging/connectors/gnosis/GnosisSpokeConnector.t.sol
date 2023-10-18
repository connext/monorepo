// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {GnosisSpokeConnector} from "../../../../contracts/messaging/connectors/gnosis/GnosisSpokeConnector.sol";
import {GnosisAmb} from "../../../../contracts/messaging/interfaces/ambs/GnosisAmb.sol";
import {MerkleTreeManager} from "../../../../contracts/messaging/MerkleTreeManager.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract GnosisSpokeConnectorTest is ConnectorHelper {
  // ============ Events ============
  event GasFloorUpdated(uint256 previous, uint256 updated);
  // setup chain ids
  uint256 _mirrorChainId = 1238786754;
  uint256 _chainId = 123213;

  // ============ Storage ============

  function setUp() public {
    // Allow future contract mock
    vm.etch(_amb, new bytes(0x42));
    // Set chain id
    vm.chainId(_chainId);

    _merkle = address(new MerkleTreeManager());

    _l1Connector = payable(address(123123));

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
      watcherManager: address(1),
      minDisputeBlocks: _minDisputeBlocks,
      disputeBlocks: _disputeBlocks
    });

    _l2Connector = payable(address(new GnosisSpokeConnector(_baseParams, _gasCap, _mirrorChainId)));
  }

  // ============ Utils ============
  function utils_setSpokeConnectorVerifyMocks(address _sender) public {
    // 1. call to amb for source
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.destinationChainId.selector), abi.encode(_mirrorChainId));
    // 2. call to amb on message sender
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.messageSender.selector), abi.encode(_sender));
  }

  // ============ GnosisSpokeConnector.setGasFloor ============
  function test_GnosisSpokeConnector__setGasFloor_failsIfLt100() public {
    vm.expectRevert(bytes("<100"));
    vm.prank(address(this));
    GnosisSpokeConnector(_l2Connector).setGasFloor(20);
  }

  function test_GnosisSpokeConnector__setGasFloor_failsIfNoChange() public {
    vm.expectRevert(bytes("<100"));
    vm.prank(address(this));
    GnosisSpokeConnector(_l2Connector).setGasFloor(20);
  }

  function test_GnosisSpokeConnector__setGasFloor_shouldWork() public {
    vm.expectEmit(true, true, true, true);
    emit GasFloorUpdated(100, 200);

    vm.prank(address(this));
    GnosisSpokeConnector(_l2Connector).setGasFloor(200);
    assertEq(GnosisSpokeConnector(_l2Connector).floor(), 200);
  }

  // ============ GnosisSpokeConnector.verifySender ============
  function test_GnosisSpokeConnector__verifySender_shouldWorkIfTrue() public {
    address expected = address(111);
    utils_setSpokeConnectorVerifyMocks(expected);

    vm.prank(_amb);
    assertTrue(GnosisSpokeConnector(_l2Connector).verifySender(expected));
  }

  function test_GnosisSpokeConnector__verifySender_shouldWorkIfFalse() public {
    address expected = address(111);
    utils_setSpokeConnectorVerifyMocks(address(112));

    vm.prank(_amb);
    assertFalse(GnosisSpokeConnector(_l2Connector).verifySender(expected));
  }

  function test_GnosisSpokeConnector__verifySender_shouldFailIfCallerNotAmb() public {
    address expected = address(111);
    utils_setSpokeConnectorVerifyMocks(expected);

    vm.expectRevert(abi.encodePacked("!bridge"));
    vm.prank(address(0x123));
    GnosisSpokeConnector(_l2Connector).verifySender(expected);
  }

  // ============ GnosisSpokeConnector._sendMessage ============
  function test_GnosisSpokeConnector__sendMessage_failsIfGasBelowFloor() public {
    // setup mock
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.requireToPassMessage.selector), abi.encode(123));

    // encoded data
    bytes memory _encodedData = abi.encode(50);

    // should revert getting gas cap
    vm.expectRevert("<floor");

    vm.prank(_rootManager);
    GnosisSpokeConnector(_l2Connector).send(_encodedData);
  }

  function test_GnosisSpokeConnector__sendMessage_shouldWork() public {
    // setup mock
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.requireToPassMessage.selector), abi.encode(123));

    // data
    bytes memory _data = abi.encode(GnosisSpokeConnector(_l2Connector).outboundRoot());

    // encoded data
    bytes memory _encodedData = abi.encode(_gasCap);

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _encodedData, _rootManager);

    // should call the requireToPassMessage function of GnosisAMB
    vm.expectCall(
      _amb,
      abi.encodeWithSelector(
        GnosisAmb.requireToPassMessage.selector,
        _l1Connector,
        abi.encodeWithSelector(Connector.processMessage.selector, _data),
        _gasCap
      )
    );

    vm.prank(_rootManager);
    GnosisSpokeConnector(_l2Connector).send(_encodedData);
  }

  // ============ GnosisSpokeConnector._processMessage ============
  function test_GnosisSpokeConnector__processMessage_shouldUpdateAggregateRoot() public {
    utils_setSpokeConnectorVerifyMocks(_l1Connector);

    // data
    bytes memory _data = abi.encodePacked(bytes32(bytes("test")));

    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.sourceChainId.selector), abi.encode(_chainId));

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_dataCorrectSize, _amb);

    vm.prank(_amb);
    GnosisSpokeConnector(_l2Connector).processMessage(_dataCorrectSize);

    // Check: root is marked as pending
    assertEq(GnosisSpokeConnector(_l2Connector).pendingAggregateRoots(bytes32(_data)), block.number);
  }

  function test_GnosisSpokeConnector__processMessage_shouldUpdateAggregateRoot_fuzz(bytes32 data) public {
    if (data == bytes32("")) return;
    utils_setSpokeConnectorVerifyMocks(_l1Connector);

    // data
    bytes memory _data = abi.encodePacked(data);

    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.sourceChainId.selector), abi.encode(_chainId));

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_dataCorrectSize, _amb);

    vm.prank(_amb);
    GnosisSpokeConnector(_l2Connector).processMessage(_dataCorrectSize);

    // Check: root is marked as pending
    assertEq(GnosisSpokeConnector(_l2Connector).pendingAggregateRoots(bytes32(_data)), block.number);
  }

  function test_GnosisSpokeConnector__processMessage_shouldFailIfSenderNotVerified() public {
    utils_setSpokeConnectorVerifyMocks(address(0x123));

    // data
    bytes memory _data = abi.encodePacked(bytes32(bytes("test")));

    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.sourceChainId.selector), abi.encode(_chainId));

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.prank(_amb);
    vm.expectRevert(abi.encodePacked("!mirrorConnector"));
    GnosisSpokeConnector(_l2Connector).processMessage(_dataCorrectSize);
  }

  function test_GnosisSpokeConnector__processMessage_shouldFailIfSourceChainIdMismatch() public {
    utils_setSpokeConnectorVerifyMocks(_l1Connector);

    // data
    bytes memory _data = abi.encodePacked(bytes32(bytes("test")));

    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.sourceChainId.selector), abi.encode(12365677777));

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.prank(_amb);
    vm.expectRevert(abi.encodePacked("!sourceChain"));
    GnosisSpokeConnector(_l2Connector).processMessage(_dataCorrectSize);
  }
}
