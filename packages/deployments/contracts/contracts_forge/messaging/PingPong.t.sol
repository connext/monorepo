// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import {TypeCasts} from "../../contracts/shared/libraries/TypeCasts.sol";
import {Message} from "../../contracts/messaging/libraries/Message.sol";

import {RootManager} from "../../contracts/messaging/RootManager.sol";
import {MerkleTreeManager} from "../../contracts/messaging/MerkleTreeManager.sol";
import {WatcherManager} from "../../contracts/messaging/WatcherManager.sol";
import {MerkleLib} from "../../contracts/messaging/libraries/MerkleLib.sol";
import {Connector} from "../../contracts/messaging/connectors/Connector.sol";
import {SpokeConnector} from "../../contracts/messaging/connectors/SpokeConnector.sol";

import "../utils/ConnectorHelper.sol";
import "../utils/Mock.sol";

import "forge-std/console.sol";

/**
 * @notice This contract is designed to test the full messaging flow using mocked hub and spoke connectors,
 * root manager, etc.
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

  MerkleTreeManager destinationSpokeTree;
  MerkleTreeManager originSpokeTree;
  MerkleTreeManager aggregateTree;

  uint256 _delayBlocks = 40;
  address _watcherManager;

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
    // deploy merkle
    utils_createReferenceTrees();
    // deploy watcher manager
    _watcherManager = address(new WatcherManager());
    // deploy root manager
    _rootManager = address(
      new RootManager(_delayBlocks, address(aggregateTree), _watcherManager, _minDisputeBlocks, _disputeBlocks)
    );
    aggregateTree.setArborist(_rootManager);

    SpokeConnector.ConstructorParams memory _originParams = SpokeConnector.ConstructorParams({
      domain: _originDomain,
      mirrorDomain: _mainnetDomain,
      amb: _originAMB,
      rootManager: _rootManager,
      mirrorConnector: address(0),
      processGas: PROCESS_GAS,
      reserveGas: RESERVE_GAS,
      delayBlocks: 0,
      merkle: address(originSpokeTree),
      watcherManager: address(1),
      minDisputeBlocks: _minDisputeBlocks,
      disputeBlocks: _disputeBlocks
    });

    // Mock sourceconnector on l2
    _originConnectors.spoke = address(new MockSpokeConnector(_originParams));
    originSpokeTree.setArborist(_originConnectors.spoke);
    MockSpokeConnector(payable(_originConnectors.spoke)).setUpdatesAggregate(true);

    // Mock sourceconnector on l1
    _originConnectors.hub = address(
      new MockHubConnector(
        _mainnetDomain, // uint32 _domain,
        _originDomain, // uint32 _mirrorDomain,
        _originMainnetAMB, // address _amb,
        _rootManager, // address _rootManager,
        _originConnectors.spoke // address _mirrorConnector,
      )
    );
    MockHubConnector(payable(_originConnectors.hub)).setUpdatesAggregate(true);

    SpokeConnector.ConstructorParams memory _destinationParams = SpokeConnector.ConstructorParams({
      domain: _destinationDomain,
      mirrorDomain: _mainnetDomain,
      amb: _destinationAMB,
      rootManager: _rootManager,
      mirrorConnector: address(0),
      processGas: PROCESS_GAS,
      reserveGas: RESERVE_GAS,
      delayBlocks: 0,
      merkle: address(destinationSpokeTree),
      watcherManager: address(1),
      minDisputeBlocks: _minDisputeBlocks,
      disputeBlocks: _disputeBlocks
    });

    // Mock dest connector on l2
    _destinationConnectors.spoke = address(new MockSpokeConnector(_destinationParams));
    destinationSpokeTree.setArborist(_destinationConnectors.spoke);
    MockSpokeConnector(payable(_destinationConnectors.spoke)).setUpdatesAggregate(true);

    // Mock dest connector on l1
    _destinationConnectors.hub = address(
      new MockHubConnector(
        _mainnetDomain, // uint32 _domain,
        _destinationDomain, // uint32 _mirrorDomain,
        _destinationMainnetAMB, // address _amb,
        _rootManager, // address _rootManager,
        _destinationConnectors.spoke // address _mirrorConnector,
      )
    );
    MockHubConnector(payable(_destinationConnectors.hub)).setUpdatesAggregate(true);
    _destinationRouter = TypeCasts.addressToBytes32(address(12356556423));
  }

  function utils_configureContracts() public {
    // enroll this as approved sender for messaging
    SpokeConnector(payable(_originConnectors.spoke)).addSender(address(this));
    SpokeConnector(payable(_originConnectors.spoke)).setMirrorConnector(_originConnectors.hub);
    SpokeConnector(payable(_destinationConnectors.spoke)).setMirrorConnector(_destinationConnectors.hub);
    // check setup
    assertEq(SpokeConnector(payable(_destinationConnectors.spoke)).mirrorConnector(), _destinationConnectors.hub);
    assertEq(SpokeConnector(payable(_originConnectors.spoke)).mirrorConnector(), _originConnectors.hub);
    assertEq(MockHubConnector(payable(_destinationConnectors.hub)).mirrorConnector(), _destinationConnectors.spoke);
    assertEq(MockHubConnector(payable(_originConnectors.hub)).mirrorConnector(), _originConnectors.spoke);

    MockSpokeConnector(payable(_destinationConnectors.spoke)).setUpdatesAggregate(true);

    // enroll this as approved watcher to activate slowmode
    WatcherManager(_watcherManager).addWatcher(address(this));
    // check setup
    assertTrue(WatcherManager(_watcherManager).isWatcher(address(this)));

    // configure root manager with connectors
    RootManager(_rootManager).addConnector(_originDomain, _originConnectors.hub);
    RootManager(_rootManager).addConnector(_destinationDomain, _destinationConnectors.hub);
    // set root manager to slow mode
    RootManager(_rootManager).activateSlowMode();
    // check setup
    assertFalse(RootManager(_rootManager).optimisticMode());
    assertEq(RootManager(_rootManager).connectors(0), _originConnectors.hub);
    assertEq(RootManager(_rootManager).connectors(1), _destinationConnectors.hub);
    assertEq(RootManager(_rootManager).domains(0), _originDomain);
    assertEq(RootManager(_rootManager).domains(1), _destinationDomain);
  }

  // Create merkle tree managers we'll use for managing reference trees to ensure correct behavior below.
  function utils_createReferenceTrees() public {
    // Deploy implementation
    MerkleTreeManager impl = new MerkleTreeManager();

    // Deploy reference proxies (properly sets the owner)
    ERC1967Proxy spokeProxy = new ERC1967Proxy(
      address(impl),
      abi.encodeWithSelector(MerkleTreeManager.initialize.selector, address(this))
    );
    referenceSpokeTree = MerkleTreeManager(address(spokeProxy));

    ERC1967Proxy aggregateProxy = new ERC1967Proxy(
      address(impl),
      abi.encodeWithSelector(MerkleTreeManager.initialize.selector, address(this))
    );
    referenceAggregateTree = MerkleTreeManager(address(aggregateProxy));

    // Deploy real proxies
    ERC1967Proxy destProxy = new ERC1967Proxy(
      address(impl),
      abi.encodeWithSelector(MerkleTreeManager.initialize.selector, address(this))
    );
    destinationSpokeTree = MerkleTreeManager(address(destProxy));

    ERC1967Proxy originProxy = new ERC1967Proxy(
      address(impl),
      abi.encodeWithSelector(MerkleTreeManager.initialize.selector, address(this))
    );
    originSpokeTree = MerkleTreeManager(address(originProxy));

    ERC1967Proxy rootProxy = new ERC1967Proxy(
      address(impl),
      abi.encodeWithSelector(MerkleTreeManager.initialize.selector, address(this))
    );
    aggregateTree = MerkleTreeManager(address(rootProxy));
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

    // Insert the node into the reference tree and get the expected new root.
    (bytes32 expectedRoot, uint256 expectedCount) = referenceSpokeTree.insert(messageHash);
    // Get initial count.
    uint256 initialCount = SpokeConnector(payable(_originConnectors.spoke)).MERKLE().count();

    vm.expectEmit(true, true, true, true);
    emit LeafInserted(expectedRoot, expectedCount, messageHash);

    vm.expectEmit(true, true, true, true);
    emit Dispatch(messageHash, initialCount, expectedRoot, message);

    // Call `dispatch`: will add the message hash to the current tree.
    SpokeConnector(payable(_originConnectors.spoke)).dispatch(_destinationDomain, _destinationRouter, body);

    assertEq(SpokeConnector(payable(_originConnectors.spoke)).outboundRoot(), expectedRoot);
    // Assert index increased by 1.
    uint256 updatedCount = SpokeConnector(payable(_originConnectors.spoke)).MERKLE().count();
    assertEq(updatedCount, expectedCount);
    assertEq(updatedCount, initialCount + 1);
  }

  // Send outbound root from origin.
  function utils_sendOutboundRootAndAssert() public returns (bytes32 outboundRoot) {
    outboundRoot = SpokeConnector(payable(_originConnectors.spoke)).outboundRoot();

    // Expect event emitted.
    vm.expectEmit(true, true, true, true);
    emit MessageSent(abi.encode(outboundRoot), bytes(""), address(this));

    SpokeConnector(payable(_originConnectors.spoke)).send(bytes(""));

    // Make sure correct root was sent.
    assertEq(MockSpokeConnector(payable(_originConnectors.spoke)).lastOutbound(), keccak256(abi.encode(outboundRoot)));
  }

  // Aggregate an inbound root on the hub.
  function utils_aggregateAndAssert(bytes32 inboundRoot) public {
    // Expect MessageProcessed event emitted.
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(abi.encode(inboundRoot), _originMainnetAMB);

    // The AMB would normally deliver to the HubConnector the inboundRoot.
    vm.prank(_originMainnetAMB);
    Connector(payable(_originConnectors.hub)).processMessage(abi.encode(inboundRoot));

    // Make sure inboundRoot was received.
    assertEq(MockHubConnector(payable(_originConnectors.hub)).lastReceived(), keccak256(abi.encode(inboundRoot)));
  }

  // Propagate aggregateRoot on all connectors.
  function utils_propagateAndAssert(bytes32 inboundRoot) public returns (bytes32 aggregateRoot) {
    // Aggregate this inboundRoot into the reference tree (as it should be done in `propagate`).
    bytes32[] memory inboundRoots = new bytes32[](1);
    inboundRoots[0] = inboundRoot;
    (bytes32 expectedAggregateRoot, uint256 expectedAggregateCount) = referenceAggregateTree.insert(inboundRoots);

    // Move ahead the expected number of delay blocks.
    vm.roll(block.number + RootManager(_rootManager).delayBlocks());

    // Get initial count for aggregate tree.
    uint256 initialAggregateCount = RootManager(_rootManager).MERKLE().count();

    // Format params.
    uint32[] memory domains = new uint32[](2);
    domains[0] = _originDomain;
    domains[1] = _destinationDomain;
    address[] memory connectors = new address[](2);
    connectors[0] = _originConnectors.hub;
    connectors[1] = _destinationConnectors.hub;
    uint256[] memory fees = new uint256[](2);
    fees[0] = 0;
    fees[1] = 0;
    bytes[] memory encodedData = new bytes[](2);

    // Propagate the aggregate root.
    vm.expectEmit(true, true, true, true);
    emit LeavesInserted(expectedAggregateRoot, expectedAggregateCount, inboundRoots);
    RootManager(_rootManager).propagate(connectors, fees, encodedData);

    // Assert that the current aggregate root matches expected (from reference tree).
    aggregateRoot = RootManager(_rootManager).MERKLE().root();
    assertEq(aggregateRoot, expectedAggregateRoot);

    // Assert index increased by 1.
    uint256 updatedAggregateCount = RootManager(_rootManager).MERKLE().count();
    assertEq(updatedAggregateCount, expectedAggregateCount);
    assertEq(updatedAggregateCount, initialAggregateCount + 1);

    // Assert that the aggregate root was sent on all connectors.
    assertEq(
      MockHubConnector(payable(_originConnectors.hub)).lastOutbound(),
      keccak256(abi.encode(expectedAggregateRoot))
    );
    assertEq(
      MockHubConnector(payable(_destinationConnectors.hub)).lastOutbound(),
      keccak256(abi.encode(expectedAggregateRoot))
    );
  }

  // Process a given aggregateRoot on a given spoke.
  function utils_processAggregateRootAndAssert(address connector, address amb, bytes32 aggregateRoot) public {
    // Expect MessageProcessed on the target spoke.
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(abi.encode(aggregateRoot), amb);

    vm.prank(amb);
    Connector(payable(connector)).processMessage(abi.encode(aggregateRoot));

    // Make sure aggregateRoot was received.
    assertEq(MockSpokeConnector(payable(connector)).lastReceived(), keccak256(abi.encode(aggregateRoot)));

    // `pendingAggregateRoots` should be updated.
    assertEq(SpokeConnector(payable(connector)).pendingAggregateRoots(aggregateRoot), block.number);
  }

  // Get the proof/path for a given message in the reference spoke tree.
  function utils_getProofForMessage(bytes memory message) public returns (bytes32[32] memory) {}

  // Returns array of 32 zero hashes.
  function utils_zeroHashes() internal pure returns (bytes32[32] memory _zeroes) {
    _zeroes[0] = MerkleLib.Z_0;
    _zeroes[1] = MerkleLib.Z_1;
    _zeroes[2] = MerkleLib.Z_2;
    _zeroes[3] = MerkleLib.Z_3;
    _zeroes[4] = MerkleLib.Z_4;
    _zeroes[5] = MerkleLib.Z_5;
    _zeroes[6] = MerkleLib.Z_6;
    _zeroes[7] = MerkleLib.Z_7;
    _zeroes[8] = MerkleLib.Z_8;
    _zeroes[9] = MerkleLib.Z_9;
    _zeroes[10] = MerkleLib.Z_10;
    _zeroes[11] = MerkleLib.Z_11;
    _zeroes[12] = MerkleLib.Z_12;
    _zeroes[13] = MerkleLib.Z_13;
    _zeroes[14] = MerkleLib.Z_14;
    _zeroes[15] = MerkleLib.Z_15;
    _zeroes[16] = MerkleLib.Z_16;
    _zeroes[17] = MerkleLib.Z_17;
    _zeroes[18] = MerkleLib.Z_18;
    _zeroes[19] = MerkleLib.Z_19;
    _zeroes[20] = MerkleLib.Z_20;
    _zeroes[21] = MerkleLib.Z_21;
    _zeroes[22] = MerkleLib.Z_22;
    _zeroes[23] = MerkleLib.Z_23;
    _zeroes[24] = MerkleLib.Z_24;
    _zeroes[25] = MerkleLib.Z_25;
    _zeroes[26] = MerkleLib.Z_26;
    _zeroes[27] = MerkleLib.Z_27;
    _zeroes[28] = MerkleLib.Z_28;
    _zeroes[29] = MerkleLib.Z_29;
    _zeroes[30] = MerkleLib.Z_30;
    _zeroes[31] = MerkleLib.Z_31;
  }

  // ============ Testing scenarios ============

  function test_messageFlowsWork() public {
    utils_createReferenceTrees();

    // Ensure the current roots reflects the default root of an empty tree.
    assertEq(SpokeConnector(payable(_originConnectors.spoke)).outboundRoot(), EMPTY_ROOT); // Origin SpokeConnector tree.
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
    bytes32 aggregateRoot = utils_propagateAndAssert(outboundRoot);

    // 5. Process aggregateRoot on destination spoke, as well as origin spoke (should be broadcasted to both).
    utils_processAggregateRootAndAssert(_destinationConnectors.spoke, _destinationAMB, aggregateRoot);
    utils_processAggregateRootAndAssert(_originConnectors.spoke, _originAMB, aggregateRoot);

    // Now fast forward `delayBlocks` so the aggregateRoot we just delivered to the destination spoke chain
    // will be considered verified.
    uint256 destinationDelay = MockSpokeConnector(payable(_destinationConnectors.spoke)).delayBlocks();
    vm.roll(block.number + destinationDelay);

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
    console.logBytes32(aggregateRoot);

    // If the root == target leaf (i.e. the leaf is in the first index), then the proof == zeroHashes.
    bytes32[32] memory messageProof = utils_zeroHashes();
    bytes32[32] memory aggregateProof = utils_zeroHashes();

    SpokeConnector.Proof[] memory proofs = new SpokeConnector.Proof[](1);
    proofs[0] = SpokeConnector.Proof(message, messageProof, 0);
    SpokeConnector(payable(_destinationConnectors.spoke)).proveAndProcess(proofs, aggregateRoot, aggregateProof, 0);

    // assertEq(uint256(SpokeConnector(payable(_destinationConnectors.spoke)).messages(keccak256(message))), 2);
  }
}
