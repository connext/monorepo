// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {QueueLib} from "../../contracts/messaging/libraries/Queue.sol";
import {ProposedOwnable} from "../../contracts/shared/ProposedOwnable.sol";
import {RootManager} from "../../contracts/messaging/RootManager.sol";
import {ProposedOwnable} from "../../contracts/shared/ProposedOwnable.sol";
import {DomainIndexer} from "../../contracts/messaging/libraries/DomainIndexer.sol";
import {IHubConnector} from "../../contracts/messaging/interfaces/IHubConnector.sol";
import {MerkleTreeManager} from "../../contracts/messaging/MerkleTreeManager.sol";
import {WatcherManager} from "../../contracts/messaging/WatcherManager.sol";
import {SnapshotId} from "../../contracts/messaging/libraries/SnapshotId.sol";
import {IHubSpokeConnector} from "../../contracts/messaging/interfaces/IHubSpokeConnector.sol";

import "../utils/ConnectorHelper.sol";

contract ReverterConnector {
  function sendMessage(bytes memory _data) external {
    revert("revert");
  }
}

contract ReentrantConnector {
  address[] public connectors;

  uint256 public count;

  function addConnector(address _connector) external payable {
    connectors.push(_connector);
  }

  function sendMessage(bytes memory, bytes memory) external payable {
    count++;
    uint256[] memory _fees = new uint256[](1);
    _fees[0] = 0;
    bytes[] memory _extra = new bytes[](1);
    _extra[0] = bytes("");
    RootManager(msg.sender).propagate(connectors, _fees, _extra);
  }
}

contract RootManagerForTest is DomainIndexer, RootManager {
  using QueueLib for QueueLib.Queue;

  constructor(
    uint256 _delayBlocks,
    address _merkle,
    address _watcherManager,
    uint256 _minDisputeBlocks,
    uint256 _disputeBlocks
  ) RootManager(_delayBlocks, _merkle, _watcherManager, _minDisputeBlocks, _disputeBlocks) {}

  function forTest_setProposer(address _proposer, bool _isProposer) public {
    allowlistedProposers[_proposer] = _isProposer;
  }

  function forTest_setOptimisticMode(bool _mode) public {
    optimisticMode = _mode;
  }

  function forTest_addInboundRootToQueue(bytes32 _inbound) public {
    pendingInboundRoots.enqueue(_inbound);
  }

  function forTest_generateAndAddDomains(uint32[] memory _domains, address[] memory _connectors) public {
    for (uint256 i; i < _domains.length; i++) {
      addDomain(_domains[i], _connectors[i]);
    }
  }

  function forTest_setProposeHash(bytes32 _aggregateRoot, uint256 _endOfDispute) public {
    proposedAggregateRootHash = keccak256(abi.encode(_aggregateRoot, _endOfDispute));
  }

  function forTest_setProposedHashToFinalizedHash() public {
    proposedAggregateRootHash = FINALIZED_HASH;
  }

  function forTest_setValidAggregateRoot(bytes32 _aggregateRoot, uint256 _timestamp) public {
    validAggregateRoots[_timestamp] = _aggregateRoot;
  }

  function forTest_setLastSavedAggregateRootTimestamp(uint256 _timestamp) public {
    lastSavedAggregateRootTimestamp = _timestamp;
  }

  function forTest_sendRootToHubs(
    bytes32 _aggregateRoot,
    address[] calldata _connectors,
    uint256[] calldata _fees,
    bytes[] memory _encodedData
  ) public payable {
    _sendRootToHubs(_aggregateRoot, _connectors, _fees, _encodedData);
  }

  function forTest_setDomains(uint32[] memory _domains) public {
    domains = _domains;
  }

  function forTest_setLastPropagatedRoot(uint32 _domain, bytes32 _root) public {
    lastPropagatedRoot[_domain] = _root;
  }

  function forTest_pause() public {
    _pause();
  }

  function forTest_setHubDomain(uint32 _domain) public {
    hubDomain = _domain;
  }
}

contract Base is ForgeHelper {
  // ============ Errors ============
  error ProposedOwnable__onlyOwner_notOwner();

  // ============ Events ============
  event RootReceived(uint32 domain, bytes32 receivedRoot, uint256 queueIndex);

  event RootsAggregated(bytes32 aggregateRoot, uint256 count, bytes32[] aggregatedMessageRoots);

  event RootPropagated(bytes32 aggregate, uint32[] domains, uint256 count);

  event ConnectorAdded(uint32 domain, address connector, uint32[] domains, address[] connectors);

  event ConnectorRemoved(uint32 domain, address connector, uint32[] domains, address[] connectors, address caller);

  event PropagateFailed(uint32 domain, address connector);

  event AggregateRootSaved(bytes32 aggregateRoot, uint256 rootTimestamp);

  event ProposedRootFinalized(bytes32 aggregateRoot);

  event AggregateRootPropagated(bytes32 indexed aggregateRoot, bytes32 domainsHash);

  event HubDomainSet(uint32 _domain);

  event HubDomainCleared();

  // ============ Storage ============
  RootManagerForTest _rootManager;
  uint256 _delayBlocks = 40;
  bool _optimisticMode = true;
  uint256 _minDisputeBlocks = 120;
  uint256 _disputeBlocks = 150;
  bytes32 _finalizedHash = 0x0000000000000000000000000000000000000000000000000000000000000001;
  address _merkle;
  uint32[] _domains;
  address[] _connectors;
  uint256[] _fees;
  bytes[] _encodedData;
  bytes32 _randomRoot = bytes32("random");

  address owner = makeAddr("owner");
  address watcherManager = makeAddr("watcherManager");
  address watcher = makeAddr("watcher");
  address proposer = makeAddr("proposer");
  address stranger = makeAddr("stranger");

  function setUp() public virtual {
    _domains.push(1000);
    _connectors.push(address(1000));
    _fees.push(0);
    _encodedData.push(bytes(""));

    _domains.push(1001);
    _connectors.push(address(1001));
    _fees.push(0);
    _encodedData.push(bytes(""));

    _merkle = address(new MerkleTreeManager());
    MerkleTreeManager(_merkle).initialize(address(_rootManager));

    vm.prank(owner);
    _rootManager = new RootManagerForTest(_delayBlocks, _merkle, watcherManager, _minDisputeBlocks, _disputeBlocks);
    MerkleTreeManager(_merkle).setArborist(address(_rootManager));

    // Env: roll ahead to an arbitrary block so we don't start at block zero.
    // For dequeuing roots in `propagate`, this will make the delay number we pass in acceptable.
    vm.roll(123456789);
  }

  // ============ Utils ============
  /**
   * @notice Utility to handle generating and adding connector/domain pairs as needed.
   * @param count Num spoke domains TOTAL.
   * @param shouldAggregate Whether to aggregate generated inboundRoots from each domain in this fn.
   * @param willPropagate Whether we should expect propagation to ACTUALLY occur.
   */
  function utils_generateAndAddConnectors(uint256 count, bool shouldAggregate, bool willPropagate) public {
    // Start loop at current domains length so we can skip any already existing.
    for (uint256 i = _domains.length; i < count; i++) {
      // Add another domain/connector pair.
      uint32 domain = uint32(1000 + i);
      _domains.push(domain);
      _connectors.push(address(bytes20(uint160(domain))));
      _fees.push(0);
      _encodedData.push(bytes(""));
    }

    for (uint256 i; i < _domains.length; i++) {
      vm.prank(owner);
      _rootManager.addConnector(_domains[i], _connectors[i]);

      if (shouldAggregate) {
        bytes32 inboundRoot = keccak256(abi.encode(bytes("test"), i));
        vm.prank(_connectors[i]);
        _rootManager.aggregate(_domains[i], inboundRoot);
        console.log("aggregated!", i);
        console.logBytes32(inboundRoot);
      }

      if (willPropagate) {
        // Expect a call to every hub connector!
        vm.mockCall(_connectors[i], abi.encodeWithSelector(IHubConnector.sendMessage.selector), abi.encode());
        vm.expectCall(_connectors[i], abi.encodeWithSelector(IHubConnector.sendMessage.selector));
      }
    }
  }
}

contract RootManager_General is Base {
  // ============ RootManager.addConnector ============
  function test_RootManager__addConnector_shouldWork() public {
    uint32[] memory domains = new uint32[](1);
    address[] memory connectors = new address[](1);
    domains[0] = _domains[0];
    connectors[0] = _connectors[0];
    vm.expectEmit(true, true, true, true);
    emit ConnectorAdded(_domains[0], _connectors[0], domains, connectors);

    vm.prank(owner);
    _rootManager.addConnector(_domains[0], _connectors[0]);

    assertEq(_rootManager.connectors(0), _connectors[0]);
    assertEq(_rootManager.domains(0), _domains[0]);
  }

  function test_RootManager__addConnector_shouldFailIfCallerNotOwner(address caller) public {
    if (caller == owner) {
      // fuzz test, return if owner
      return;
    }

    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);

    vm.prank(caller);
    _rootManager.addConnector(_domains[0], _connectors[0]);
  }

  function test_RootManager__addConnector_shouldFailIfAlreadyAdded() public {
    vm.prank(owner);
    _rootManager.addConnector(_domains[0], _connectors[0]);

    vm.expectRevert(bytes("domain exists"));

    vm.prank(owner);
    _rootManager.addConnector(_domains[0], _connectors[0]);
  }

  function test_RootManager__addConnector_shouldFailIfDomainAlreadyAdded() public {
    vm.prank(owner);
    _rootManager.addConnector(_domains[0], _connectors[0]);

    vm.expectRevert(bytes("domain exists"));

    vm.prank(owner);
    _rootManager.addConnector(_domains[0], _connectors[1]);
  }

  function test_RootManager__addConnector_shouldFailIfAddressZero() public {
    vm.expectRevert(bytes("!connector"));

    vm.prank(owner);
    _rootManager.addConnector(_domains[0], address(0));
  }

  // ============ RootManager.removeConnector ============
  function test_RootManager__removeConnector_shouldWork() public {
    for (uint256 i; i < 100; i++) {
      vm.startPrank(owner);
      _rootManager.addConnector(_domains[0], _connectors[0]);
      _rootManager.addConnector(_domains[1], _connectors[1]);
      vm.stopPrank();

      uint32[] memory emitted = new uint32[](1);
      address[] memory emittedConnectors = new address[](1);

      emitted[0] = _domains[1];
      emittedConnectors[0] = _connectors[1];
      vm.expectEmit(true, true, true, true);
      emit ConnectorRemoved(_domains[0], _connectors[0], emitted, emittedConnectors, address(this));

      vm.mockCall(
        watcherManager,
        abi.encodeWithSelector(WatcherManager(watcherManager).isWatcher.selector),
        abi.encode(true)
      );

      _rootManager.removeConnector(_domains[0]);

      assertEq(_rootManager.isDomainSupported(_domains[0]), false);

      vm.expectRevert(bytes("!supported"));
      _rootManager.getDomainIndex(_domains[0]);

      vm.expectRevert(bytes("!supported"));
      _rootManager.getConnectorForDomain(_domains[0]);

      // ensure the mappings were properly updated
      assertEq(_rootManager.getDomainIndex(_domains[1]), 0);
      assertEq(_rootManager.getConnectorForDomain(_domains[1]), _connectors[1]);

      _rootManager.removeConnector(_domains[1]);
    }
  }

  function test_RootManager__removeConnector_shouldFailIfCallerNotWatcher() public {
    vm.mockCall(
      watcherManager,
      abi.encodeWithSelector(WatcherManager(watcherManager).isWatcher.selector),
      abi.encode(false)
    );

    vm.expectRevert(bytes("!watcher"));

    _rootManager.removeConnector(_domains[0]);
  }

  function test_RootManager__removeConnector_shouldFailIfNotAdded() public {
    vm.expectRevert(bytes("!supported"));

    vm.mockCall(
      watcherManager,
      abi.encodeWithSelector(WatcherManager(watcherManager).isWatcher.selector),
      abi.encode(true)
    );

    _rootManager.removeConnector(_domains[0]);
  }

  // ============ RootManager.aggregate ============
  function test_RootManager__aggregate_shouldWork(bytes32 inbound) public {
    _rootManager.forTest_setOptimisticMode(false);
    utils_generateAndAddConnectors(1, false, false);

    vm.expectEmit(true, true, true, true);
    emit RootReceived(_domains[0], inbound, 1);

    vm.prank(_connectors[0]);
    _rootManager.aggregate(_domains[0], inbound);
  }

  function test_RootManager__aggregate_shouldFailIfCallerNotConnector(bytes32 inbound) public {
    utils_generateAndAddConnectors(1, false, false);

    vm.expectRevert(bytes("!connector"));

    vm.prank(address(123));
    _rootManager.aggregate(_domains[0], inbound);
  }

  // ============ RootManager.propagate ============
  function test_RootManager__propagate_shouldSendToSpoke(bytes32 inbound) public {
    _rootManager.forTest_setOptimisticMode(false);
    utils_generateAndAddConnectors(1, true, true);

    // Fast forward delayBlocks number of blocks so all of the inbound roots are considered verified.
    vm.roll(block.number + _rootManager.delayBlocks());

    _rootManager.propagate(_connectors, _fees, _encodedData);
  }

  function test_RootManager__propagate_shouldSendToAllSpokes(bytes32 inbound) public {
    _rootManager.forTest_setOptimisticMode(false);
    uint256 numSpokes = 20;
    utils_generateAndAddConnectors(numSpokes, true, true);
    assertEq(_rootManager.getPendingInboundRootsCount(), numSpokes);

    // Fast forward delayBlocks number of blocks so all of the inbound roots are considered verified.
    vm.roll(block.number + _rootManager.delayBlocks());

    _rootManager.propagate(_connectors, _fees, _encodedData);
    assertEq(_rootManager.getPendingInboundRootsCount(), 0);
  }

  function test_RootManager__propagate_shouldRefundExcessFees() public {
    _rootManager.forTest_setOptimisticMode(false);
    uint256 numSpokes = 20;
    utils_generateAndAddConnectors(numSpokes, true, true);
    assertEq(_rootManager.getPendingInboundRootsCount(), numSpokes);

    // Get the original balance of caller
    address caller = address(12312323);
    uint256 excess = 10 ether;
    vm.deal(caller, excess);
    uint256 start = caller.balance;

    // Fast forward delayBlocks number of blocks so all of the inbound roots are considered verified.
    vm.roll(block.number + _rootManager.delayBlocks());

    vm.prank(caller);
    _rootManager.propagate{value: excess}(_connectors, _fees, _encodedData);
    assertEq(_rootManager.getPendingInboundRootsCount(), 0);
    // total fees == 0, so balance sent to propagate should not be deducted
    assertEq(caller.balance, start);
  }

  function test_RootManager__propagate_shouldRevertIfRedundantRoot(bytes32 inbound) public {
    _rootManager.forTest_setOptimisticMode(false);
    uint256 numSpokes = 20;
    utils_generateAndAddConnectors(numSpokes, true, true);
    assertEq(_rootManager.getPendingInboundRootsCount(), numSpokes);

    // Fast forward delayBlocks number of blocks so all of the inbound roots are considered verified.
    vm.roll(block.number + _rootManager.delayBlocks());

    // Dequeue separately so we can get an updated root.
    _rootManager.dequeue();
    bytes32 currentRoot = MerkleTreeManager(_merkle).root();

    _rootManager.propagate(_connectors, _fees, _encodedData);
    for (uint256 i; i < numSpokes; i++) {
      // Expect a call to every hub connector!
      assertEq(_rootManager.lastPropagatedRoot(_rootManager.domains(i)), currentRoot);
    }

    // The current root has already been sent, the following call should revert since sending
    // again would be redundant.
    vm.expectRevert(RootManager.RootManager_sendRootToHub__NoMessageSent.selector);
    _rootManager.propagate(_connectors, _fees, _encodedData);
  }

  function test_RootManager__propagate_shouldNotRevertIfAmbMessageReverts() public {
    _rootManager.forTest_setOptimisticMode(false);
    uint256 numSpokes = 20;
    utils_generateAndAddConnectors(numSpokes, true, true);
    assertEq(_rootManager.getPendingInboundRootsCount(), numSpokes);

    // special case to add reverting connector
    ReverterConnector revertConnector = new ReverterConnector();
    uint32 domain = uint32(1020);
    _domains.push(domain);
    _connectors.push(address(revertConnector));
    _fees.push(0);
    _encodedData.push(bytes(""));

    vm.prank(owner);
    _rootManager.addConnector(_domains[20], address(revertConnector));

    bytes32 inboundRoot = keccak256(abi.encode(bytes("test"), 20));
    vm.prank(address(revertConnector));
    _rootManager.aggregate(_domains[20], inboundRoot);

    vm.expectCall(_connectors[20], abi.encodeWithSelector(IHubConnector.sendMessage.selector));

    assertEq(_rootManager.getPendingInboundRootsCount(), numSpokes + 1);

    // Fast forward delayBlocks number of blocks so all of the inbound roots are considered verified.
    vm.roll(block.number + _rootManager.delayBlocks());

    vm.expectEmit(true, true, true, true);
    emit PropagateFailed(_domains[20], address(revertConnector));

    _rootManager.propagate(_connectors, _fees, _encodedData);
    assertEq(_rootManager.getPendingInboundRootsCount(), 0);
  }
}

contract RootManager_Constructor is Base {
  function test_checkConstructorArguments() public {
    assertEq(_rootManager.disputeBlocks(), _disputeBlocks);
    assertEq(_rootManager.minDisputeBlocks(), _minDisputeBlocks);
    assertEq(_rootManager.optimisticMode(), _optimisticMode);
  }

  function test_zeroMerkleDeployment() public {
    address zeroMerkle = address(0);
    vm.expectRevert("!zero merkle");
    RootManagerForTest _testRootManager = new RootManagerForTest(
      _delayBlocks,
      zeroMerkle,
      watcherManager,
      _minDisputeBlocks,
      _disputeBlocks
    );
  }

  function test_wrongDisputeBlocksDeployment() public {
    uint256 wrongDisputeBlocks = _minDisputeBlocks - 1;
    vm.expectRevert(RootManager.RootManager_constructor__DisputeBlocksLowerThanMin.selector);
    RootManagerForTest _testRootManager = new RootManagerForTest(
      _delayBlocks,
      _merkle,
      watcherManager,
      _minDisputeBlocks,
      wrongDisputeBlocks
    );
  }
}

contract RootManager_ProposeAggregateRoot is Base {
  event AggregateRootProposed(
    uint256 indexed snapshotId,
    uint256 endOfDispute,
    bytes32 indexed aggregateRoot,
    bytes32 indexed baseRoot,
    bytes32[] snapshotsRoots,
    uint32[] domains
  );

  function setUp() public virtual override {
    super.setUp();
    _rootManager.forTest_setProposer(proposer, true);
  }

  function test_revertIfCallerIsNotProposer(
    address caller,
    bytes32 aggregateRoot,
    bytes32[] memory snapshotsRoots,
    uint256 snapshotId
  ) public {
    vm.assume(caller != proposer);

    vm.expectRevert(
      abi.encodeWithSelector(RootManager.RootManager_onlyProposer__NotWhitelistedProposer.selector, caller)
    );
    vm.prank(caller);
    _rootManager.proposeAggregateRoot(snapshotId, aggregateRoot, snapshotsRoots, _domains);
  }

  function test_revertIfDomainsAreNotValid(
    uint256 snapshotId,
    bytes32 aggregateRoot,
    bytes32[] memory snapshotsRoots,
    uint32[] memory domains
  ) public {
    vm.expectRevert(abi.encodeWithSelector(RootManager.RootManager_checkDomains__InvalidDomains.selector));
    vm.prank(proposer);
    _rootManager.proposeAggregateRoot(snapshotId, aggregateRoot, snapshotsRoots, domains);
  }

  function test_revertIfSlowModeOn(uint256 snapshotId, bytes32 aggregateRoot, bytes32[] memory snapshotsRoots) public {
    _rootManager.forTest_generateAndAddDomains(_domains, _connectors);
    _rootManager.forTest_setOptimisticMode(false);

    vm.expectRevert(abi.encodeWithSelector(RootManager.RootManager_onlyOptimisticMode__SlowModeOn.selector));
    vm.prank(proposer);
    _rootManager.proposeAggregateRoot(snapshotId, aggregateRoot, snapshotsRoots, _domains);
  }

  function test_revertIfSnapshotIdIsNotValid(
    uint256 snapshotId,
    bytes32 aggregateRoot,
    bytes32[] memory snapshotsRoots
  ) public {
    vm.assume(snapshotId != SnapshotId.getLastCompletedSnapshotId());

    _rootManager.forTest_generateAndAddDomains(_domains, _connectors);

    vm.expectRevert(
      abi.encodeWithSelector(RootManager.RootManager_proposeAggregateRoot__InvalidSnapshotId.selector, snapshotId)
    );
    vm.prank(proposer);
    _rootManager.proposeAggregateRoot(snapshotId, aggregateRoot, snapshotsRoots, _domains);
  }

  function test_revertIfProposeInProgress(bytes32 aggregateRoot, bytes32[] memory snapshotsRoots) public {
    vm.assume(aggregateRoot != _finalizedHash);
    uint256 snapshotId = SnapshotId.getLastCompletedSnapshotId();
    _rootManager.forTest_generateAndAddDomains(_domains, _connectors);
    _rootManager.forTest_setProposeHash(aggregateRoot, block.number + _disputeBlocks);

    vm.expectRevert(abi.encodeWithSelector(RootManager.RootManager_proposeAggregateRoot__ProposeInProgress.selector));
    vm.prank(proposer);
    _rootManager.proposeAggregateRoot(snapshotId, aggregateRoot, snapshotsRoots, _domains);
  }

  function test_revertIfPaused(bytes32 aggregateRoot, bytes32[] memory snapshotsRoots) public {
    uint256 snapshotId = SnapshotId.getLastCompletedSnapshotId();
    _rootManager.forTest_generateAndAddDomains(_domains, _connectors);
    _rootManager.forTest_pause();

    vm.expectRevert(bytes("Pausable: paused"));
    vm.prank(proposer);
    _rootManager.proposeAggregateRoot(snapshotId, aggregateRoot, snapshotsRoots, _domains);
  }

  function test_emitProposeAggregateRoot(
    bytes32 aggregateRoot,
    bytes32 baseRoot,
    bytes32[] memory snapshotsRoots
  ) public {
    _rootManager.forTest_generateAndAddDomains(_domains, _connectors);
    uint256 snapshotId = SnapshotId.getLastCompletedSnapshotId();

    vm.mockCall(_merkle, abi.encodeWithSelector(MerkleTreeManager.root.selector), abi.encode(baseRoot));

    vm.expectEmit(true, true, true, true);
    emit AggregateRootProposed(
      snapshotId,
      block.number + _disputeBlocks,
      aggregateRoot,
      baseRoot,
      snapshotsRoots,
      _domains
    );

    vm.prank(proposer);
    _rootManager.proposeAggregateRoot(snapshotId, aggregateRoot, snapshotsRoots, _domains);
  }
}

contract RootManager_Finalize is Base {
  function test_revertIfSlowModeOn() public {
    _rootManager.forTest_setOptimisticMode(false);

    vm.expectRevert(abi.encodeWithSelector(RootManager.RootManager_onlyOptimisticMode__SlowModeOn.selector));
    _rootManager.finalize(_randomRoot, block.number + _disputeBlocks);
  }

  function test_revertIfProposeInProgress(bytes32 aggregateRoot) public {
    vm.assume(aggregateRoot != _finalizedHash);
    _rootManager.forTest_setProposeHash(aggregateRoot, block.number + _disputeBlocks);

    vm.expectRevert(abi.encodeWithSelector(RootManager.RootManager_finalize__ProposeInProgress.selector));
    _rootManager.finalize(aggregateRoot, block.number + _disputeBlocks);
  }

  function test_revertIfAggregateRootDataIsInvalidNoPropose(bytes32 aggregateRoot) public {
    vm.assume(aggregateRoot != _finalizedHash);

    vm.expectRevert(abi.encodeWithSelector(RootManager.RootManager_finalize__InvalidAggregateRoot.selector));
    _rootManager.finalize(aggregateRoot, block.number);
  }

  function test_revertIfAggregateRootDataIsInvalid() public {
    _rootManager.forTest_setProposedHashToFinalizedHash();

    vm.expectRevert(abi.encodeWithSelector(RootManager.RootManager_finalize__InvalidAggregateRoot.selector));

    _rootManager.finalize(_randomRoot, block.number + _disputeBlocks);
  }

  function test_revertIfAggregateRootHashIsInvalid(bytes32 aggregateRoot) public {
    bytes32 _differentRoot = _randomRoot;
    vm.assume(aggregateRoot != _differentRoot);
    vm.assume(aggregateRoot != _finalizedHash);

    _rootManager.forTest_setProposeHash(aggregateRoot, block.number + _disputeBlocks);

    vm.expectRevert(abi.encodeWithSelector(RootManager.RootManager_finalize__InvalidInputHash.selector));
    _rootManager.finalize(_differentRoot, block.number + _disputeBlocks);
  }

  function test_revertIfPaused(bytes32 aggregateRoot) public {
    _rootManager.forTest_pause();

    vm.expectRevert(bytes("Pausable: paused"));
    _rootManager.finalize(aggregateRoot, block.number + _disputeBlocks);
  }

  function test_saveAggregateRoot(bytes32 aggregateRoot) public {
    vm.assume(aggregateRoot != _finalizedHash);
    _rootManager.forTest_setProposeHash(aggregateRoot, block.number + _disputeBlocks);
    vm.roll(block.number + _disputeBlocks);

    bytes32 _previousAggregateRoot = aggregateRoot;

    _rootManager.finalize(aggregateRoot, block.number);
    bytes32 afterAggregateRootHash = _rootManager.proposedAggregateRootHash();

    uint256 _lastSavedRootTimestamp = _rootManager.lastSavedAggregateRootTimestamp();

    bytes32 finalizedAggregateRoot = _rootManager.validAggregateRoots(_lastSavedRootTimestamp);

    assertEq(_previousAggregateRoot, finalizedAggregateRoot);
    assertEq(afterAggregateRootHash, _finalizedHash);
  }

  function test_setLastSavedAggregateRootTimestamp(bytes32 aggregateRoot) public {
    vm.assume(aggregateRoot != _finalizedHash);
    _rootManager.forTest_setProposeHash(aggregateRoot, block.number + _disputeBlocks);
    vm.roll(block.number + _disputeBlocks);

    uint256 _expectedRootTimestamp = block.timestamp;

    _rootManager.finalize(aggregateRoot, block.number);

    uint256 _lastSavedRootTimestamp = _rootManager.lastSavedAggregateRootTimestamp();

    assertEq(_lastSavedRootTimestamp, _expectedRootTimestamp);
  }

  function test_clearProposeHash(bytes32 aggregateRoot) public {
    vm.assume(aggregateRoot != _finalizedHash);
    _rootManager.forTest_setProposeHash(aggregateRoot, block.number + _disputeBlocks);
    vm.roll(block.number + _disputeBlocks);

    _rootManager.finalize(aggregateRoot, block.number);

    bytes32 _currentProposeHash = _rootManager.proposedAggregateRootHash();

    assertEq(_currentProposeHash, _rootManager.FINALIZED_HASH());
  }

  function test_emitIfAggregateRootSaved(bytes32 aggregateRoot) public {
    vm.assume(aggregateRoot != _finalizedHash);
    _rootManager.forTest_setProposeHash(aggregateRoot, block.number + _disputeBlocks);
    vm.roll(block.number + _disputeBlocks);

    vm.expectEmit(true, true, true, true);
    emit AggregateRootSaved(aggregateRoot, block.timestamp);

    _rootManager.finalize(aggregateRoot, block.number);
  }

  function test_emitIfProposedRootHasFinalized(bytes32 aggregateRoot) public {
    vm.assume(aggregateRoot != _finalizedHash);
    _rootManager.forTest_setProposeHash(aggregateRoot, block.number + _disputeBlocks);
    vm.roll(block.number + _disputeBlocks);

    vm.expectEmit(true, true, true, true);
    emit ProposedRootFinalized(aggregateRoot);

    _rootManager.finalize(aggregateRoot, block.number);
  }
}

contract RootManager_SetDelayBlocks is Base {
  event DelayBlocksUpdated(uint256 _newBlocks, uint256 _prevBlocks);

  function test_revertIfCallerIsNotOwner() public {
    uint256 _newDelayBlocks = _rootManager.disputeBlocks() + 10;
    vm.prank(stranger);
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    _rootManager.setDelayBlocks(_newDelayBlocks);
  }

  function test_revertIfDelayBlocksEqPrevDelayBlocks() public {
    uint256 _currentDelayBlocks = _rootManager.delayBlocks();
    vm.prank(owner);
    vm.expectRevert("!delayBlocks");
    _rootManager.setDelayBlocks(_currentDelayBlocks);
  }

  function test_changeDelayBlocks(uint256 newDelayBlocks) public {
    uint256 _prevDelayBlocks = _rootManager.delayBlocks();
    vm.assume(newDelayBlocks != _prevDelayBlocks);
    vm.prank(owner);
    _rootManager.setDelayBlocks(newDelayBlocks);
    uint256 _currentDelayBlocks = _rootManager.delayBlocks();
    assertEq(_currentDelayBlocks, newDelayBlocks);
  }

  function test_emitIfDelayBlocksChanged(uint256 newDelayBlocks) public {
    uint256 _prevDelayBlocks = _rootManager.delayBlocks();
    vm.assume(newDelayBlocks != _prevDelayBlocks);
    vm.prank(owner);

    vm.expectEmit(true, true, true, true);
    emit DelayBlocksUpdated(_prevDelayBlocks, newDelayBlocks);

    _rootManager.setDelayBlocks(newDelayBlocks);
  }
}

contract RootManager_SetMinDisputeBlocks is Base {
  event MinDisputeBlocksUpdated(uint256 _newBlocks, uint256 _prevBlocks);

  function test_revertIfCallerIsNotOwner() public {
    uint256 _newMinDisputeBlocks = _rootManager.minDisputeBlocks() + 10;
    vm.prank(stranger);
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    _rootManager.setMinDisputeBlocks(_newMinDisputeBlocks);
  }

  function test_revertIfMinDisputeBlocksEqPrevMinDisputeBlocks() public {
    uint256 _currentMinDisputeBlocks = _rootManager.minDisputeBlocks();
    vm.prank(owner);
    vm.expectRevert(RootManager.RootManager_setMinDisputeBlocks__SameMinDisputeBlocksAsBefore.selector);
    _rootManager.setMinDisputeBlocks(_currentMinDisputeBlocks);
  }

  function test_changeMinDisputeBlocks(uint256 newMinDisputeBlocks) public {
    uint256 _prevMinDisputeBlocks = _rootManager.minDisputeBlocks();
    vm.assume(newMinDisputeBlocks != _prevMinDisputeBlocks);
    vm.prank(owner);
    _rootManager.setMinDisputeBlocks(newMinDisputeBlocks);
    uint256 _currentMinDisputeBlocks = _rootManager.minDisputeBlocks();
    assertEq(_currentMinDisputeBlocks, newMinDisputeBlocks);
  }

  function test_emitIfMinDisputeBlocksChanged(uint256 newMinDisputeBlocks) public {
    uint256 _prevMinDisputeBlocks = _rootManager.minDisputeBlocks();
    vm.assume(newMinDisputeBlocks != _prevMinDisputeBlocks);
    vm.prank(owner);

    vm.expectEmit(true, true, true, true);
    emit MinDisputeBlocksUpdated(_prevMinDisputeBlocks, newMinDisputeBlocks);

    _rootManager.setMinDisputeBlocks(newMinDisputeBlocks);
  }
}

contract RootManager_SetDisputeBlocks is Base {
  event DisputeBlocksUpdated(uint256 _newBlocks, uint256 _prevBlocks);

  function test_revertIfCallerIsNotOwner() public {
    uint256 _newDisputeBlocks = _rootManager.disputeBlocks() + 10;
    vm.prank(stranger);
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    _rootManager.setDisputeBlocks(_newDisputeBlocks);
  }

  function test_revertIfDisputeBlocksAreLessThanMinAllowed(uint256 _smallDisputeBlocks) public {
    uint256 _allowedMinDisputeBlocks = _rootManager.minDisputeBlocks();
    vm.assume(_smallDisputeBlocks < _allowedMinDisputeBlocks);
    vm.prank(owner);
    vm.expectRevert(RootManager.RootManager_setDisputeBlocks__DisputeBlocksLowerThanMin.selector);
    _rootManager.setDisputeBlocks(_smallDisputeBlocks);
  }

  function test_revertIfDisputeBlocksEqPrevDisputeBlocks() public {
    uint256 _currentDisputeBlocks = _rootManager.disputeBlocks();
    vm.prank(owner);
    vm.expectRevert(RootManager.RootManager_setDisputeBlocks__SameDisputeBlocksAsBefore.selector);
    _rootManager.setDisputeBlocks(_currentDisputeBlocks);
  }

  function test_changeDisputeBlocks(uint256 newDisputeBlocks) public {
    uint256 _prevDisputeBlocks = _rootManager.disputeBlocks();
    vm.assume(newDisputeBlocks > _prevDisputeBlocks);
    vm.prank(owner);
    _rootManager.setDisputeBlocks(newDisputeBlocks);
    uint256 _currentDisputeBlocks = _rootManager.disputeBlocks();
    assertEq(_currentDisputeBlocks, newDisputeBlocks);
  }

  function test_emitIfDisputeBlocksChanged(uint256 newDisputeBlocks) public {
    uint256 _prevDisputeBlocks = _rootManager.disputeBlocks();
    vm.assume(newDisputeBlocks > _prevDisputeBlocks);
    vm.prank(owner);

    vm.expectEmit(true, true, true, true);
    emit DisputeBlocksUpdated(_prevDisputeBlocks, newDisputeBlocks);

    _rootManager.setDisputeBlocks(newDisputeBlocks);
  }
}

contract RootManager_ActivateSlowMode is Base {
  event SlowModeActivated(address indexed watcher);

  function setUp() public virtual override {
    super.setUp();
    _rootManager.forTest_setOptimisticMode(true);

    vm.mockCall(
      watcherManager,
      abi.encodeWithSelector(WatcherManager(watcherManager).isWatcher.selector),
      abi.encode(true)
    );
  }

  function test_revertIfCallerIsNotWatcher(address caller) public {
    vm.mockCall(
      watcherManager,
      abi.encodeWithSelector(WatcherManager(watcherManager).isWatcher.selector),
      abi.encode(false)
    );
    vm.expectRevert(bytes("!watcher"));
    vm.prank(caller);
    _rootManager.activateSlowMode();
  }

  function test_revertIfSlowModeOn() public {
    _rootManager.forTest_setOptimisticMode(false);

    vm.expectRevert(abi.encodeWithSelector(RootManager.RootManager_onlyOptimisticMode__SlowModeOn.selector));
    vm.prank(owner);
    _rootManager.activateSlowMode();
  }

  function test_cleanProposedAggregateRoot(bytes32 aggregateRoot) public {
    vm.assume(aggregateRoot != _finalizedHash);
    uint256 endOfDispute = block.number + _disputeBlocks;
    _rootManager.forTest_setProposeHash(aggregateRoot, endOfDispute);
    bytes32 aggregateRootHash = keccak256(abi.encode(aggregateRoot, endOfDispute));

    bytes32 beforeAggregateRootHash = _rootManager.proposedAggregateRootHash();
    assertEq(beforeAggregateRootHash, aggregateRootHash);

    vm.prank(owner);
    _rootManager.activateSlowMode();

    bytes32 afterAggregateRoot = _rootManager.proposedAggregateRootHash();
    assertEq(afterAggregateRoot, _finalizedHash);
  }

  function test_emitSlowModeActivated() public {
    vm.expectEmit(true, true, true, true);
    emit SlowModeActivated(owner);

    vm.prank(owner);
    _rootManager.activateSlowMode();
  }
}

contract RootManager_ActivateOptimisticMode is Base {
  event OptimisticModeActivated();
  using QueueLib for QueueLib.Queue;

  function test_revertIfCallerIsNotOwner() public {
    vm.prank(stranger);
    vm.expectRevert(abi.encodeWithSelector(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector));
    _rootManager.activateOptimisticMode();
  }

  function test_revertIfOptimisticModeOn() public {
    _rootManager.forTest_setOptimisticMode(true);
    vm.expectRevert(abi.encodeWithSelector(RootManager.RootManager_activateOptimisticMode__OptimisticModeOn.selector));

    vm.prank(owner);
    _rootManager.activateOptimisticMode();
  }

  function test_optimisticModeIsTrue() public {
    _rootManager.forTest_setOptimisticMode(false);
    bool beforeMode = _rootManager.optimisticMode();

    vm.prank(owner);
    _rootManager.activateOptimisticMode();
    bool afterMode = _rootManager.optimisticMode();

    assertEq(beforeMode, false);
    assertEq(afterMode, true);
  }

  function test_cleanPendingInboundRoots(bytes32 inbound) public {
    vm.assume(inbound > 0);
    _rootManager.forTest_setOptimisticMode(false);
    _rootManager.forTest_addInboundRootToQueue(inbound);
    uint256 pendingInboundsRoots = _rootManager.getPendingInboundRootsCount();
    assertGt(pendingInboundsRoots, 0);

    vm.prank(owner);
    _rootManager.activateOptimisticMode();
    pendingInboundsRoots = _rootManager.getPendingInboundRootsCount();

    assertEq(pendingInboundsRoots, 0);
  }

  function test_emitIfOptimisticModeIsActivated() public {
    _rootManager.forTest_setOptimisticMode(false);

    vm.expectEmit(true, true, true, true);
    emit OptimisticModeActivated();

    vm.prank(owner);
    _rootManager.activateOptimisticMode();
  }
}

contract RootManager_RemoveConnector is Base {
  function test_deleteProposedAggregateRoot(bytes32 aggregateRoot) public {
    _rootManager.forTest_generateAndAddDomains(_domains, _connectors);
    uint256 endOfDispute = block.number + _disputeBlocks;
    _rootManager.forTest_setProposeHash(aggregateRoot, endOfDispute);

    bytes32 beforeAggregateRootHash = _rootManager.proposedAggregateRootHash();
    bytes32 hashForComparison = keccak256(abi.encode(aggregateRoot, endOfDispute));

    assertEq(beforeAggregateRootHash, hashForComparison);

    vm.mockCall(
      watcherManager,
      abi.encodeWithSelector(WatcherManager(watcherManager).isWatcher.selector),
      abi.encode(true)
    );

    _rootManager.removeConnector(_domains[0]);

    bytes32 afterAggregateRootHash = _rootManager.proposedAggregateRootHash();
    assertEq(afterAggregateRootHash, _finalizedHash);
  }
}

contract RootManager_Aggregate is Base {
  using QueueLib for QueueLib.Queue;

  function test_revertIfNotValidConnector(uint8 index, address invalidConnector, bytes32 inbound) public {
    vm.assume(index < _domains.length);
    vm.assume(invalidConnector != _connectors[index]);

    _rootManager.forTest_generateAndAddDomains(_domains, _connectors);
    vm.expectRevert(bytes("!connector"));

    vm.prank(invalidConnector);
    _rootManager.aggregate(_domains[index], inbound);
  }

  function test_revertIfOptimisticModeOn(uint8 index, bytes32 inbound) public {
    vm.assume(index < _domains.length);
    _rootManager.forTest_setOptimisticMode(true);
    _rootManager.forTest_generateAndAddDomains(_domains, _connectors);

    vm.expectRevert(abi.encodeWithSelector(RootManager.RootManager_aggregate__OptimisticModeOn.selector));

    vm.prank(_connectors[index]);
    _rootManager.aggregate(_domains[index], inbound);
  }

  function test_emitIfRootIsReceived(uint8 index, bytes32 inbound) public {
    vm.assume(index < _domains.length);
    _rootManager.forTest_setOptimisticMode(false);
    _rootManager.forTest_generateAndAddDomains(_domains, _connectors);

    uint128 lastTreeIndex = uint128(_rootManager.getPendingInboundRootsCount()) + 1;

    vm.expectEmit(true, true, true, true);
    emit RootReceived(_domains[index], inbound, lastTreeIndex);

    vm.prank(_connectors[index]);
    _rootManager.aggregate(_domains[index], inbound);
  }
}

contract RootManager_AddProposer is Base {
  event ProposerAdded(address indexed proposer);

  function test_revertIfCallerIsNotOwner() public {
    vm.prank(stranger);
    vm.expectRevert(abi.encodeWithSelector(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector));
    _rootManager.addProposer(owner);
  }

  function test_addProposer(address proposerToAdd) public {
    vm.prank(owner);
    _rootManager.addProposer(proposerToAdd);
    assertTrue(_rootManager.allowlistedProposers(proposerToAdd));
  }

  function test_emitIfProposerIsAdded(address proposerToAdd) public {
    vm.expectEmit(true, true, true, true);
    emit ProposerAdded(proposerToAdd);

    vm.prank(owner);
    _rootManager.addProposer(proposerToAdd);
  }
}

contract RootManager_RemoveProposer is Base {
  event ProposerRemoved(address indexed proposer);

  function test_revertIfCallerIsNotOwner() public {
    vm.prank(stranger);
    vm.expectRevert(abi.encodeWithSelector(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector));
    _rootManager.removeProposer(owner);
  }

  function test_removeProposer(address proposerToRemove) public {
    _rootManager.forTest_setProposer(proposerToRemove, true);

    vm.prank(owner);
    _rootManager.removeProposer(proposerToRemove);
    assertFalse(_rootManager.allowlistedProposers(proposerToRemove));
  }

  function test_emitIfProposerIsRemoved(address proposerToRemove) public {
    vm.expectEmit(true, true, true, true);
    emit ProposerRemoved(proposerToRemove);

    vm.prank(owner);
    _rootManager.removeProposer(proposerToRemove);
  }
}

contract RootManager_Propagate is Base {
  function test_revertIfContractPaused() public {
    _rootManager.forTest_pause();
    vm.expectRevert(bytes("Pausable: paused"));
    _rootManager.propagate(_connectors, _fees, _encodedData);
  }

  function test_revertIfInvalidLengthsIfDifferentFeesAmounts(uint256[] calldata randomFees) public {
    vm.assume(randomFees.length != _connectors.length);
    _rootManager.forTest_generateAndAddDomains(_domains, _connectors);

    vm.expectRevert(bytes("invalid lengths"));
    _rootManager.propagate(_connectors, randomFees, _encodedData);
  }

  function test_revertIfInvalidLengthsIfDifferentDatasAmounts(bytes[] calldata randomEncodedData) public {
    vm.assume(randomEncodedData.length != _connectors.length);
    _rootManager.forTest_generateAndAddDomains(_domains, _connectors);

    vm.expectRevert(bytes("invalid lengths"));
    _rootManager.propagate(_connectors, _fees, randomEncodedData);
  }

  function test_revertIfAggregateRootIsZero() public {
    _rootManager.forTest_setOptimisticMode(true);
    _rootManager.forTest_generateAndAddDomains(_domains, _connectors);

    // set to zero to guaranty that is an invalid timestamp that will return a zero root.
    _rootManager.forTest_setLastSavedAggregateRootTimestamp(0);

    vm.expectRevert(abi.encodeWithSelector(RootManager.RootManager_propagate__AggregateRootIsZero.selector));
    _rootManager.propagate(_connectors, _fees, _encodedData);
  }

  function test_emitIfAggregateRootPropagated(bytes32 aggregateRoot) public {
    vm.assume(aggregateRoot > _finalizedHash);
    _rootManager.forTest_setOptimisticMode(true);

    uint256 _rootTimestamp = block.timestamp;
    _rootManager.forTest_setLastSavedAggregateRootTimestamp(_rootTimestamp);
    _rootManager.forTest_setValidAggregateRoot(aggregateRoot, _rootTimestamp);

    utils_generateAndAddConnectors(_connectors.length, false, true);

    bytes32 _domainsHash = _rootManager.domainsHash();

    vm.expectEmit(true, true, true, true);
    emit AggregateRootPropagated(aggregateRoot, _domainsHash);

    _rootManager.propagate(_connectors, _fees, _encodedData);
  }
}

contract RootManager_SendRootToHubs is Base {
  function test_revertIfRedundantRoot(bytes32 aggregateRoot) public {
    _rootManager.forTest_setDomains(_domains);
    for (uint256 i = 0; i < _connectors.length; i++) {
      _rootManager.forTest_setLastPropagatedRoot(_domains[i], aggregateRoot);
    }

    vm.expectRevert(RootManager.RootManager_sendRootToHub__NoMessageSent.selector);
    _rootManager.forTest_sendRootToHubs(aggregateRoot, _connectors, _fees, _encodedData);
  }

  function test_sendRootToSpokes(bytes32 aggregateRoot) public {
    vm.assume(aggregateRoot > _finalizedHash);
    utils_generateAndAddConnectors(_connectors.length, false, true);
    _rootManager.forTest_sendRootToHubs(aggregateRoot, _connectors, _fees, _encodedData);
  }

  function test_shouldNotRevertIfAmbMessageReverts(bytes32 aggregateRoot, uint32 reverterDomain) public {
    vm.assume(aggregateRoot > _finalizedHash);

    // Ensure that the fuzzed revertereDomain is never equal to one of the valid domains.
    for (uint256 i = 0; i < _domains.length; i++) {
      vm.assume(_domains[i] != reverterDomain);
    }

    // Mock calls for the valid connectors
    for (uint256 i = 0; i < _connectors.length; i++) {
      vm.mockCall(_connectors[i], abi.encodeWithSelector(IHubConnector.sendMessage.selector), abi.encode());
    }

    // create reverter connector
    ReverterConnector reverterConnector = new ReverterConnector();

    // add the reverter domain + connector to arrays
    _domains.push(reverterDomain);
    _connectors.push(address(reverterConnector));
    _fees.push(0);
    _encodedData.push(bytes(""));

    // set domains with reverter domain included
    _rootManager.forTest_setDomains(_domains);

    vm.expectEmit(true, true, true, true);
    emit PropagateFailed(reverterDomain, address(reverterConnector));

    _rootManager.forTest_sendRootToHubs(aggregateRoot, _connectors, _fees, _encodedData);
  }

  function test_revertIfSendingIncorrectAmounOfEth(bytes32 aggregateRoot) public {
    vm.assume(aggregateRoot > _finalizedHash);

    uint32 newDomain = uint32(1002);
    address newConnector = address(1002);

    // Ensure that the fuzzed reverterDomain is never equal to one of the valid domains.
    for (uint256 i = 0; i < _domains.length; i++) {
      vm.assume(_domains[i] != newDomain);
    }

    _domains.push(newDomain);
    _connectors.push(newConnector);
    _fees.push(10);
    _encodedData.push(bytes(""));

    utils_generateAndAddConnectors(_connectors.length, false, true);

    vm.expectRevert(stdError.arithmeticError);
    // sends 0 eth
    _rootManager.forTest_sendRootToHubs(aggregateRoot, _connectors, _fees, _encodedData);
  }

  function test_revertIfNoneRootsWereSendBecauseOfRevert(bytes32 aggregateRoot, uint32 reverterDomain) public {
    vm.assume(aggregateRoot > _finalizedHash && reverterDomain > 0);

    // Create reverter connector
    ReverterConnector reverterConnector = new ReverterConnector();

    // Create _sendRootToHubs args
    uint32[] memory domains = new uint32[](1);
    domains[0] = reverterDomain;

    address[] memory connectors = new address[](1);
    connectors[0] = address(reverterConnector);

    uint256[] memory fees = new uint256[](1);
    fees[0] = 0;

    bytes[] memory encodedData = new bytes[](1);
    encodedData[0] = bytes("");

    // Set domains with reverter domain only
    _rootManager.forTest_setDomains(domains);

    vm.expectRevert(RootManager.RootManager_sendRootToHub__NoMessageSent.selector);

    _rootManager.forTest_sendRootToHubs(aggregateRoot, connectors, fees, encodedData);
  }

  function test_revertIfRootAlreadySentToEveryHub(bytes32 aggregateRoot) public {
    vm.assume(aggregateRoot > _finalizedHash);

    // Set every lastPropagatedRoot as the aggregateRoot that needs to be sent.
    for (uint256 i = 0; i < _domains.length; i++) {
      _rootManager.forTest_setLastPropagatedRoot(_domains[i], aggregateRoot);
    }

    // Set domains
    _rootManager.forTest_setDomains(_domains);

    vm.expectRevert(RootManager.RootManager_sendRootToHub__NoMessageSent.selector);

    _rootManager.forTest_sendRootToHubs(aggregateRoot, _connectors, _fees, _encodedData);
  }

  function test_refundUser(bytes32 aggregateRoot, uint32 reverterDomain) public {
    vm.assume(aggregateRoot > _finalizedHash);

    // Ensure that the fuzzed revertereDomain is never equal to one of the valid domains.
    for (uint256 i = 0; i < _domains.length; i++) {
      vm.assume(_domains[i] != reverterDomain);
    }

    // Mock calls for the valid connectors
    for (uint256 i = 0; i < _connectors.length; i++) {
      vm.mockCall(_connectors[i], abi.encodeWithSelector(IHubConnector.sendMessage.selector), abi.encode());
    }

    // Create reverter connector
    ReverterConnector reverterConnector = new ReverterConnector();

    // Add the reverter domain + connector to arrays
    _domains.push(reverterDomain);
    _connectors.push(address(reverterConnector));
    _encodedData.push(bytes(""));

    uint256[] memory fees = new uint256[](3);
    fees[0] = 1 ether;
    fees[1] = 1 ether;
    fees[2] = 1 ether;

    // Set domains with reverter domain included
    _rootManager.forTest_setDomains(_domains);

    // Set stranger balance to 3 eth.
    vm.deal(stranger, 3 ether);

    vm.prank(stranger);
    _rootManager.forTest_sendRootToHubs{value: 3 ether}(aggregateRoot, _connectors, fees, _encodedData);

    // Since 1 of 3 sendMessage calls to the hub will fail, user should be refunded by the cost of one sendMessage (1 eth)
    assertEq(stranger.balance, 1 ether);
  }

  function test_shouldSendMissingRoot(bytes32 aggregateRoot) public {
    vm.assume(aggregateRoot > _finalizedHash);

    uint32 alreadySentDomain = _domains[0];
    address missingSentConnector = _connectors[1]; // domain[1]

    // Set lastPropagatedRoot of alreadySentDomain as it was already propagated.
    _rootManager.forTest_setLastPropagatedRoot(alreadySentDomain, aggregateRoot);

    // set domains
    _rootManager.forTest_setDomains(_domains);

    // Mock *a* call for the missingSentDomain
    vm.mockCall(missingSentConnector, abi.encodeWithSelector(IHubConnector.sendMessage.selector), abi.encode());

    // first domain of domains should already be set as propagated but the second domain should not to ensure that
    // only the missing domain gets called.
    _rootManager.forTest_sendRootToHubs(aggregateRoot, _connectors, _fees, _encodedData);
  }
}

contract RootManager_FinalizeAndPropagate is Base {
  function test_finalizeAndPropagate(bytes32 aggregateRoot) public {
    vm.assume(aggregateRoot > _finalizedHash);
    uint256 _endOfDispute = block.number - 1;

    _rootManager.forTest_setOptimisticMode(true);
    utils_generateAndAddConnectors(_connectors.length, false, true);
    _rootManager.forTest_setProposeHash(aggregateRoot, _endOfDispute);

    _rootManager.finalizeAndPropagate(_connectors, _fees, _encodedData, aggregateRoot, _endOfDispute);
  }
}

contract RootManager_GetSnapshotDuration is Base {
  function test_getSnapshotDuration() public {
    assertEq(SnapshotId.SNAPSHOT_DURATION, _rootManager.getSnapshotDuration());
  }
}

contract RootManager_Dequeue is Base {
  bytes32 RANDOM_INBOUND_ROOT = bytes32("random inbound root");

  bytes4 insertSelector = bytes4(keccak256("insert(bytes32[])"));

  uint256 mockedCount = 1;

  function test_nothingToDequeueReturnsSameRoot() public {
    bytes32 _beforeRoot = MerkleTreeManager(_merkle).root();

    (bytes32 _afterRoot, ) = _rootManager.dequeue();

    assertEq(_beforeRoot, _afterRoot);
  }

  function test_callMerkleManagerInsert() public {
    _rootManager.forTest_addInboundRootToQueue(RANDOM_INBOUND_ROOT);

    // fastforward blocks to make the element in the queue ready.
    vm.roll(block.number + _rootManager.delayBlocks());

    bytes32[] memory _verifiedInboundRoots = new bytes32[](1);
    _verifiedInboundRoots[0] = RANDOM_INBOUND_ROOT;

    vm.expectCall(_merkle, abi.encodeWithSelector(insertSelector, _verifiedInboundRoots));

    uint256 _expectedRootTimestamp = block.timestamp;
    bytes32 _beforeRoot = _rootManager.validAggregateRoots(_expectedRootTimestamp);

    _rootManager.dequeue();

    bytes32 _afterRoot = _rootManager.validAggregateRoots(_expectedRootTimestamp);

    assertNotEq(_beforeRoot, _afterRoot);
  }

  function test_saveNewAggregateRoot(bytes32 aggregateRoot) public {
    _rootManager.forTest_addInboundRootToQueue(RANDOM_INBOUND_ROOT);

    // fastforward blocks to make the element in the queue ready.
    vm.roll(block.number + _rootManager.delayBlocks());

    // Mock the call over `insert`
    vm.mockCall(_merkle, abi.encodeWithSelector(insertSelector), abi.encode(aggregateRoot, mockedCount));

    uint256 _lastSavedRootTimestamp = block.timestamp;

    _rootManager.dequeue();

    bytes32 _root = _rootManager.validAggregateRoots(_lastSavedRootTimestamp);

    assertEq(_root, aggregateRoot);
  }

  function test_updateLastSavedRootTimestamp(bytes32 aggregateRoot) public {
    _rootManager.forTest_addInboundRootToQueue(RANDOM_INBOUND_ROOT);

    // fastforward blocks to make the element in the queue ready.
    vm.roll(block.number + _rootManager.delayBlocks());

    // Mock the call over `insert`
    vm.mockCall(_merkle, abi.encodeWithSelector(insertSelector), abi.encode(aggregateRoot, mockedCount));

    uint256 _expectedRootTimestamp = block.timestamp;

    _rootManager.dequeue();

    uint256 _lastSavedRootTimestamp = _rootManager.lastSavedAggregateRootTimestamp();

    assertEq(_lastSavedRootTimestamp, _expectedRootTimestamp);
  }

  function test_emitIfAggregateRootSaved(bytes32 aggregateRoot) public {
    _rootManager.forTest_addInboundRootToQueue(RANDOM_INBOUND_ROOT);

    // fastforward blocks to make the element in the queue ready.
    vm.roll(block.number + _rootManager.delayBlocks());

    // Mock the call over `insert`
    vm.mockCall(_merkle, abi.encodeWithSelector(insertSelector), abi.encode(aggregateRoot, mockedCount));

    uint256 _expectedSavedTimestamp = block.timestamp;

    vm.expectEmit(true, true, true, true);
    emit AggregateRootSaved(aggregateRoot, _expectedSavedTimestamp);

    _rootManager.dequeue();
  }

  function test_emitIfRootsAggregated(bytes32 aggregateRoot) public {
    _rootManager.forTest_addInboundRootToQueue(RANDOM_INBOUND_ROOT);

    // fastforward blocks to make the element in the queue ready.
    vm.roll(block.number + _rootManager.delayBlocks());

    bytes32[] memory _verifiedInboundRoots = new bytes32[](1);
    _verifiedInboundRoots[0] = RANDOM_INBOUND_ROOT;

    // Mock the call over `insert`
    vm.mockCall(_merkle, abi.encodeWithSelector(insertSelector), abi.encode(aggregateRoot, mockedCount));

    vm.expectEmit(true, true, true, true);
    emit RootsAggregated(aggregateRoot, mockedCount, _verifiedInboundRoots);

    _rootManager.dequeue();
  }
}

contract RootManager_setHubDomain is Base {
  function test_revertIfNotOwner(address stranger, uint32 hubDomain) public {
    vm.assume(stranger != owner);

    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    vm.prank(stranger);
    _rootManager.setHubDomain(hubDomain);
  }

  function test_revertIfDomainIsNotSupported(uint32 hubDomain) public {
    vm.expectRevert(RootManager.RootManager_setHubDomain__InvalidDomain.selector);
    vm.prank(owner);
    _rootManager.setHubDomain(hubDomain);
  }

  function test_setHubDomainCorrectly(uint32 hubDomain) public {
    vm.assume(hubDomain != 0);

    uint32[] memory domains = new uint32[](1);
    domains[0] = hubDomain;

    uint32 _beforeHubDomain = _rootManager.hubDomain();

    address[] memory connectors = new address[](1);
    connectors[0] = makeAddr("connector 1");

    _rootManager.forTest_generateAndAddDomains(domains, connectors);
    vm.prank(owner);
    _rootManager.setHubDomain(hubDomain);

    uint32 _afterHubDomain = _rootManager.hubDomain();

    assertEq(_beforeHubDomain != hubDomain, true);
    assertEq(hubDomain, _afterHubDomain);
  }

  function test_emitIfHubDomainSet(uint32 hubDomain) public {
    vm.assume(hubDomain != 0);

    uint32[] memory domains = new uint32[](1);
    domains[0] = hubDomain;

    address[] memory connectors = new address[](1);
    connectors[0] = makeAddr("connector 1");

    _rootManager.forTest_generateAndAddDomains(domains, connectors);

    vm.expectEmit(true, true, true, true);
    emit HubDomainSet(hubDomain);

    vm.prank(owner);
    _rootManager.setHubDomain(hubDomain);
  }
}

contract RootManager_clearHubDomain is Base {
  function test_revertIfNotOwner(address stranger) public {
    vm.assume(stranger != owner);

    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    vm.prank(stranger);
    _rootManager.clearHubDomain();
  }

  function test_clearHubDomain(uint32 hubDomain) public {
    vm.assume(hubDomain != 0);
    _rootManager.forTest_setHubDomain(hubDomain);

    vm.prank(owner);
    _rootManager.clearHubDomain();

    assertEq(_rootManager.hubDomain(), 0);
  }

  function test_emitIfHubDomainCleared(uint32 hubDomain) public {
    vm.assume(hubDomain != 0);
    _rootManager.forTest_setHubDomain(hubDomain);

    vm.expectEmit(true, true, true, true);
    emit HubDomainCleared();

    vm.prank(owner);
    _rootManager.clearHubDomain();
  }
}

contract RootManager_sendRootToHubSpoke is Base {
  function test_revertWhenPaused() public {
    _rootManager.forTest_pause();

    vm.expectRevert(bytes("Pausable: paused"));
    _rootManager.sendRootToHubSpoke();
  }

  function test_sendRoot(bytes32 aggregateRoot, uint256 timestamp, uint32 hubDomain) public {
    vm.assume(aggregateRoot != 0);
    vm.assume(timestamp != 0);
    vm.assume(hubDomain != 0);

    _rootManager.forTest_setLastSavedAggregateRootTimestamp(timestamp);
    _rootManager.forTest_setValidAggregateRoot(aggregateRoot, timestamp);

    // set the fuzzed domain as the hub domain
    _rootManager.forTest_setHubDomain(hubDomain);

    // create and populate the domains and connectors arrays
    uint32[] memory domains = new uint32[](1);
    domains[0] = hubDomain;
    address[] memory connectors = new address[](1);
    connectors[0] = makeAddr("connector 1");

    // set the first and only connector as the hub spoke connector
    address hubSpokeConnector = connectors[0];

    // add the fuzzed domain and the connector to the DomainIndexer
    _rootManager.forTest_generateAndAddDomains(domains, connectors);

    // mock call to the hub spoke connector
    vm.mockCall(
      hubSpokeConnector,
      abi.encodeWithSelector(IHubSpokeConnector.saveAggregateRoot.selector, aggregateRoot),
      abi.encode()
    );

    // expect the call to the hub spoke connector with the correct aggregate root
    vm.expectCall(
      hubSpokeConnector,
      abi.encodeWithSelector(IHubSpokeConnector.saveAggregateRoot.selector, aggregateRoot)
    );

    _rootManager.sendRootToHubSpoke();
  }
}
