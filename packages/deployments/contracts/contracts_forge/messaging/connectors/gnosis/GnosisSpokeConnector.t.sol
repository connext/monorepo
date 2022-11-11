// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {GnosisSpokeConnector} from "../../../../contracts/messaging/connectors/gnosis/GnosisSpokeConnector.sol";
import {GnosisAmb} from "../../../../contracts/messaging/interfaces/ambs/GnosisAmb.sol";
import {MerkleTreeManager} from "../../../../contracts/messaging/MerkleTreeManager.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract GnosisSpokeConnectorTest is ConnectorHelper {
  function setUp() public {
    // Allow future contract mock
    vm.etch(_amb, new bytes(0x42));

    _merkle = address(new MerkleTreeManager());

    _l1Connector = address(123123);
    _l2Connector = address(
      new GnosisSpokeConnector(
        _l2Domain,
        _l1Domain,
        _amb,
        _rootManager,
        _l1Connector,
        _mirrorGas,
        _processGas,
        _reserveGas,
        0, // uint256 _delayBlocks
        _merkle,
        address(1) // watcher manager
      )
    );
  }

  // ============ Utils ============
  function utils_setSpokeConnectorVerifyMocks(address _sender) public {
    // 1. call to amb on message sender
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.messageSender.selector), abi.encode(_sender));
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
  function test_GnosisSpokeConnector__sendMessage_shouldWork() public {
    // setup mock
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.requireToPassMessage.selector), abi.encode(123));

    // data
    bytes memory _data = abi.encode(GnosisSpokeConnector(_l2Connector).outboundRoot());

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _rootManager);

    // should call the requireToPassMessage function of GnosisAMB
    vm.expectCall(
      _amb,
      abi.encodeWithSelector(
        GnosisAmb.requireToPassMessage.selector,
        _l1Connector,
        abi.encodeWithSelector(Connector.processMessage.selector, _data),
        _mirrorGas
      )
    );

    vm.prank(_rootManager);
    GnosisSpokeConnector(_l2Connector).send();
  }

  // ============ GnosisSpokeConnector._processMessage ============
  function test_GnosisSpokeConnector__processMessage_shouldUpdateAggregateRoot() public {
    utils_setSpokeConnectorVerifyMocks(_l1Connector);

    // data
    bytes memory _data = abi.encodePacked(bytes32(bytes("test")));

    uint256 chainId = 1337;
    vm.chainId(chainId);
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.destinationChainId.selector), abi.encode(chainId));

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

    uint256 chainId = 1337;
    vm.chainId(chainId);
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.destinationChainId.selector), abi.encode(chainId));

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

    uint256 chainId = 1337;
    vm.chainId(chainId);
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.destinationChainId.selector), abi.encode(chainId));

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

    uint256 chainId = 1337;
    vm.chainId(1338);
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.destinationChainId.selector), abi.encode(chainId));

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.prank(_amb);
    vm.expectRevert(abi.encodePacked("!destinationChain"));
    GnosisSpokeConnector(_l2Connector).processMessage(_dataCorrectSize);
  }
}
