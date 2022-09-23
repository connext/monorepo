// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {TypeCasts} from "../../contracts/shared/libraries/TypeCasts.sol";
import {Message} from "../../contracts/messaging/libraries/Message.sol";

import {RootManager} from "../../contracts/messaging/RootManager.sol";
import {MerkleTreeManager} from "../../contracts/messaging/Merkle.sol";
import {MerkleLib} from "../../contracts/messaging/libraries/Merkle.sol";
import {Connector} from "../../contracts/messaging/connectors/Connector.sol";
import {SpokeConnector} from "../../contracts/messaging/connectors/SpokeConnector.sol";
import {ISpokeConnector} from "../../contracts/messaging/interfaces/ISpokeConnector.sol";

import "../utils/ConnectorHelper.sol";
import "../utils/Mock.sol";

import "forge-std/console.sol";

/**
 * @notice This contract is designed to test the full messaging flow using
 * mocked mainnet and l2 connectors
 */
contract PingPong is ConnectorHelper {
  // ============ Storage ============

  // ============ constants
  bytes32 constant EMPTY_ROOT = bytes32(0x27ae5ba08d7291c96c8cbddcc148bf48a6d68c7974b94356f53754ef6171d757);

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

  MerkleTreeManager referenceSpokeTree;
  MerkleTreeManager referenceAggregateTree;

  // ============ connectors
  struct ConnectorPair {
    address spoke;
    address hub;
  }

  ConnectorPair _originConnectors;
  ConnectorPair _destinationConnectors;

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
    _rootManager = address(new RootManager(address(0)));
    // Mock sourceconnector on l2
    _originConnectors.spoke = address(
      new MockConnector(
        _originDomain, // uint32 _domain,
        _mainnetDomain, // uint32 _mirrorDomain
        _originAMB, // address _amb,
        _rootManager, // address _rootManager,
        address(0), // address merkle root manager
        address(0), // address _mirrorConnector
        PROCESS_GAS, // uint256 _mirrorGas
        PROCESS_GAS, // uint256 _processGas,
        RESERVE_GAS // uint256 _reserveGas
      )
    );
    MockConnector(_originConnectors.spoke).setUpdatesAggregate(true);
    // Mock sourceconnector on l1
    _originConnectors.hub = address(
      new MockConnector(
        _mainnetDomain, // uint32 _domain,
        _originDomain, // uint32 _mirrorDomain,
        _originMainnetAMB, // address _amb,
        _rootManager, // address _rootManager,
        address(0), // address merkle root manager
        _originConnectors.spoke, // address _mirrorConnector,
        PROCESS_GAS, // uint256 _mirrorGas
        PROCESS_GAS, // uint256 _processGas,
        RESERVE_GAS // uint256 _reserveGas
      )
    );
    // Mock dest connector on l2
    _destinationConnectors.spoke = address(
      new MockConnector(
        _destinationDomain, // uint32 _domain,
        _mainnetDomain, // uint32 _mirrorDomain,
        _destinationAMB, // address _amb,
        _rootManager, // address _rootManager,
        address(0), // address merkle root manager
        address(0), // address _mirrorConnector,
        PROCESS_GAS, // uint256 _mirrorGas
        PROCESS_GAS, // uint256 _processGas,
        RESERVE_GAS // uint256 _reserveGas
      )
    );
    MockConnector(_destinationConnectors.spoke).setUpdatesAggregate(true);
    // Mock dest connector on l1
    _destinationConnectors.hub = address(
      new MockConnector(
        _mainnetDomain, // uint32 _domain,
        _destinationDomain, // uint32 _mirrorDomain,
        _destinationMainnetAMB, // address _amb,
        _rootManager, // address _rootManager,
        address(0), // address merkle root manager
        _destinationConnectors.spoke, // address _mirrorConnector,
        PROCESS_GAS, // uint256 _mirrorGas
        PROCESS_GAS, // uint256 _processGas,
        RESERVE_GAS // uint256 _reserveGas
      )
    );
    _destinationRouter = TypeCasts.addressToBytes32(address(new MockRelayerFeeRouter()));
  }

  function utils_configureContracts() public {
    // enroll this as approved sender for messaging
    SpokeConnector(_originConnectors.spoke).addSender(address(this));
    SpokeConnector(_originConnectors.spoke).setMirrorConnector(_originConnectors.hub);
    SpokeConnector(_destinationConnectors.spoke).setMirrorConnector(_destinationConnectors.hub);
    // check setup
    assertEq(SpokeConnector(_destinationConnectors.spoke).mirrorConnector(), _destinationConnectors.hub);
    assertEq(SpokeConnector(_originConnectors.spoke).mirrorConnector(), _originConnectors.hub);
    assertEq(SpokeConnector(_destinationConnectors.hub).mirrorConnector(), _destinationConnectors.spoke);
    assertEq(SpokeConnector(_originConnectors.hub).mirrorConnector(), _originConnectors.spoke);

    MockConnector(_destinationConnectors.spoke).setUpdatesAggregate(true);

    // configure root manager with connectors
    RootManager(_rootManager).addConnector(_originDomain, _originConnectors.hub);
    RootManager(_rootManager).addConnector(_destinationDomain, _destinationConnectors.hub);
    // check setup
    assertEq(RootManager(_rootManager).connectors(_originDomain), _originConnectors.hub);
    assertEq(RootManager(_rootManager).connectors(_destinationDomain), _destinationConnectors.hub);
    assertEq(RootManager(_rootManager).domains(0), _originDomain);
    assertEq(RootManager(_rootManager).domains(1), _destinationDomain);
  }

  // Create merkle tree managers we'll use for managing reference trees to ensure correct behavior below.
  function utils_createReferenceTrees() public {
    referenceSpokeTree = new MerkleTreeManager();
    referenceAggregateTree = new MerkleTreeManager();
  }

  // Helper to `dispatch` a message on origin, update the reference tree, and ensure behavior was correct.
  function utils_dispatchAndAssert(bytes memory body) public returns (bytes memory message, bytes32 messageHash) {
    // Format the expected message and get the hash (leaf).
    message = Message.formatMessage(
      _originDomain,
      bytes32(uint256(uint160(address(this)))), // TODO necessary?
      0,
      _destinationDomain,
      _destinationRouter,
      body
    );
    messageHash = keccak256(message);

    // Sanity: reference trees init'd.
    require(address(referenceSpokeTree) != address(0), "Reference trees were not initialized!");

    // Insert the node into the reference tree and get the expected new root.
    (bytes32 expectedRoot, uint256 expectedCount) = referenceSpokeTree.insert(messageHash);
    // Get initial count.
    uint256 initialCount = SpokeConnector(_originConnectors.spoke).MERKLE().count();
    vm.expectEmit(true, true, true, true);
    emit Dispatch(messageHash, initialCount, expectedRoot, message);

    // Call `dispatch`: will add the message hash to the current tree.
    SpokeConnector(_originConnectors.spoke).dispatch(_destinationDomain, _destinationRouter, body);

    assertEq(SpokeConnector(_originConnectors.spoke).outboundRoot(), expectedRoot);
    // Assert index increased by 1.
    uint256 updatedCount = SpokeConnector(_originConnectors.spoke).MERKLE().count();
    assertEq(updatedCount, expectedCount);
    assertEq(updatedCount, initialCount + 1);
  }

  // Send outbound root from origin.
  function utils_sendOutboundRootAndAssert() public returns (bytes32 outboundRoot) {
    outboundRoot = SpokeConnector(_originConnectors.spoke).outboundRoot();

    // Expect event emitted.
    vm.expectEmit(true, true, true, true);
    emit MessageSent(abi.encode(outboundRoot), address(this));

    SpokeConnector(_originConnectors.spoke).send();

    // Make sure correct root was sent.
    assertEq(MockConnector(_originConnectors.spoke).lastOutbound(), keccak256(abi.encode(outboundRoot)));
  }

  // Aggregate an inbound root on the hub.
  function utils_aggregateAndAssert(bytes32 inboundRoot) public {
    // Expect MessageProcessed event emitted.
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(abi.encode(inboundRoot), _originMainnetAMB);

    uint256 initialAggregateCount = RootManager(_rootManager).MERKLE().count();

    // The AMB would normally deliver to the HubConnector the inboundRoot.
    vm.prank(_originMainnetAMB);
    Connector(_originConnectors.hub).processMessage(abi.encode(inboundRoot));

    // Make sure inboundRoot was received.
    assertEq(MockConnector(_originConnectors.hub).lastReceived(), keccak256(abi.encode(inboundRoot)));

    // Aggregate this inboundRoot into the reference tree.
    (bytes32 expectedAggregateRoot, uint256 expectedAggregateCount) = referenceAggregateTree.insert(inboundRoot);
    assertEq(RootManager(_rootManager).MERKLE().root(), expectedAggregateRoot);
    // Assert index increased by 1.
    uint256 updatedAggregateCount = RootManager(_rootManager).MERKLE().count();
    assertEq(updatedAggregateCount, expectedAggregateCount);
    assertEq(updatedAggregateCount, initialAggregateCount + 1);
  }

  // Propagate aggregateRoot on all connectors.
  function utils_propagateAndAssert() public returns (bytes32 aggregateRoot) {
    aggregateRoot = RootManager(_rootManager).MERKLE().root();

    // Propagate the aggregate root.
    RootManager(_rootManager).propagate();

    // Assert that the aggregate root was sent on all connectors.
    assertEq(MockConnector(_originConnectors.hub).lastOutbound(), keccak256(abi.encode(aggregateRoot)));
    assertEq(MockConnector(_destinationConnectors.hub).lastOutbound(), keccak256(abi.encode(aggregateRoot)));
  }

  // Process a given aggregateRoot on a given spoke.
  function utils_processAggregateRootAndAssert(
    address connector,
    address amb,
    bytes32 aggregateRoot
  ) public {
    // Expect MessageProcessed on the target spoke.
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(abi.encode(aggregateRoot), amb);

    vm.prank(amb);
    Connector(connector).processMessage(abi.encode(aggregateRoot));

    // Make sure aggregateRoot was received.
    assertEq(MockConnector(connector).lastReceived(), keccak256(abi.encode(aggregateRoot)));

    // Aggregate root should be updated.
    assertEq(SpokeConnector(connector).aggregateRoot(), aggregateRoot);
  }

  // Get the proof/path for a given message in the reference spoke tree.
  function utils_getProofForMessage(bytes memory message) public returns (bytes32[32] memory) {}

  // ============ Testing scenarios ============

  function test_messageFlowsWork() public {
    utils_createReferenceTrees();

    // Ensure the current roots reflects the default root of an empty tree.
    assertEq(SpokeConnector(_originConnectors.spoke).outboundRoot(), EMPTY_ROOT); // Origin SpokeConnector tree.
    assertEq(RootManager(_rootManager).MERKLE().root(), EMPTY_ROOT); // Aggregate tree.

    /// 1. Send message through Messaging contract.
    // Generate a message body.
    bytes memory body = abi.encode(_destinationDomain * _originDomain);

    // Dispatch.
    (bytes memory message, bytes32 messageHash) = utils_dispatchAndAssert(body);

    // 2. Send outboundRoot through Connector to hub.
    bytes32 outboundRoot = utils_sendOutboundRootAndAssert();

    // 3. Aggregate inbound root on the hub.
    utils_aggregateAndAssert(outboundRoot);

    // 4. Propagate roots to both connectors.
    bytes32 aggregateRoot = utils_propagateAndAssert();

    // 5. Process aggregateRoot on destination spoke, as well as origin spoke (should be broadcasted to both).
    utils_processAggregateRootAndAssert(_destinationConnectors.spoke, _destinationAMB, aggregateRoot);
    utils_processAggregateRootAndAssert(_originConnectors.spoke, _originAMB, aggregateRoot);

    // 6. Process original message.
    // bytes32[32] memory branch = referenceAggregateTree.branch();

    // console.log("Need a proof for leaf:");
    // console.logBytes32(outboundRoot);
    // console.log("At index:");
    // console.log(referenceAggregateTree.count());
    // console.log("In tree:");
    // for (uint256 i; i < branch.length; i++) {
    //   console.logBytes32(branch[i]);
    // }

    // console.logBytes32(messageHash);
    // console.logBytes32(outboundRoot);
    // console.logBytes32(aggregateRoot);

    // If the root == target leaf (i.e. the leaf is in the first index), then the proof == zeroHashes.
    bytes32[32] memory messageProof = MerkleLib.zeroHashes();
    bytes32[32] memory aggregateProof = MerkleLib.zeroHashes();

    ISpokeConnector.Proof[] memory proofs = new ISpokeConnector.Proof[](1);
    proofs[0] = ISpokeConnector.Proof(message, messageProof, 0);
    SpokeConnector(_destinationConnectors.spoke).proveAndProcess(proofs, aggregateProof, 0);

    // assertEq(uint256(SpokeConnector(_destinationConnectors.spoke).messages(keccak256(message))), 2);
    // assertEq(MockRelayerFeeRouter(TypeCasts.bytes32ToAddress(_destinationRouter)).handledOrigin(), _originDomain);
    // assertEq(MockRelayerFeeRouter(TypeCasts.bytes32ToAddress(_destinationRouter)).handledNonce(), 0);
    // assertEq(
    //   MockRelayerFeeRouter(TypeCasts.bytes32ToAddress(_destinationRouter)).handledSender(),
    //   TypeCasts.addressToBytes32(address(this))
    // );
    // assertEq(MockRelayerFeeRouter(TypeCasts.bytes32ToAddress(_destinationRouter)).handledBody(), body);
  }
}
