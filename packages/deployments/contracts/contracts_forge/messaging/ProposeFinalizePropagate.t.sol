// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {QueueLib} from "../../contracts/messaging/libraries/Queue.sol";
import {SnapshotId} from "../../contracts/messaging/libraries/SnapshotId.sol";
import {ProposedOwnable} from "../../contracts/shared/ProposedOwnable.sol";
import {RootManager} from "../../contracts/messaging/RootManager.sol";
import {ProposedOwnable} from "../../contracts/shared/ProposedOwnable.sol";
import {DomainIndexer} from "../../contracts/messaging/libraries/DomainIndexer.sol";
import {IHubConnector} from "../../contracts/messaging/interfaces/IHubConnector.sol";
import {MerkleTreeManager} from "../../contracts/messaging/MerkleTreeManager.sol";
import {WatcherManager} from "../../contracts/messaging/WatcherManager.sol";

import "../utils/ConnectorHelper.sol";

contract ProposeFinalizePropagate is ForgeHelper {
  RootManager rootManager;
  MerkleTreeManager merkle;
  uint256 snapshotId;
  bytes32 aggregateRoot;
  bytes32[] snapshotsRoots;

  // Set values
  address[] connectors = [address(1000), address(1001), address(1002)];
  uint32[] domains = [1000, 1001, 1002];
  uint256[] fees = [0, 0, 0];
  bytes[] encodedData = [bytes(""), bytes(""), bytes("")];
  uint256 delayBlocks = 40;
  uint256 minDisputeBlocks = 125;
  uint256 disputeBlocks = 150;

  // Addresses
  address owner = makeAddr("owner");
  address watcherManager = makeAddr("watcherManager");
  address watcher = makeAddr("watcher");
  address proposer = makeAddr("proposer");

  function setUp() public virtual {
    vm.startPrank(owner);
    merkle = new MerkleTreeManager();
    merkle.initialize(address(rootManager));

    rootManager = new RootManager(delayBlocks, address(merkle), watcherManager, minDisputeBlocks, disputeBlocks);
    merkle.setArborist(address(rootManager));

    rootManager.addConnector(domains[0], connectors[0]);
    rootManager.addConnector(domains[1], connectors[1]);
    rootManager.addConnector(domains[2], connectors[2]);

    rootManager.addProposer(proposer);
    vm.stopPrank();

    snapshotsRoots.push(bytes32(abi.encode(1)));
    snapshotsRoots.push(bytes32(abi.encode(2)));
    snapshotsRoots.push(bytes32(abi.encode(3)));

    snapshotId = SnapshotId.getLastCompletedSnapshotId();
    aggregateRoot = bytes32(abi.encode(5));
  }

  function test_RootManager__QueuedSwitchAndPropagate() external {
    // Start in slowMode
    vm.mockCall(
      watcherManager,
      abi.encodeWithSelector(WatcherManager(watcherManager).isWatcher.selector),
      abi.encode(true)
    );
    vm.prank(watcher);
    rootManager.activateSlowMode();

    // Checks that we are in slow mode
    isSlow();

    // Aggregate elements to the queue
    vm.prank(connectors[0]);
    rootManager.aggregate(domains[0], bytes32("test0"));
    vm.prank(connectors[1]);
    rootManager.aggregate(domains[1], bytes32("test1"));

    // Count has to be 2
    assertEq(rootManager.getPendingInboundRootsCount(), 2);

    // Switch again to optimistic mode
    vm.prank(owner);
    rootManager.activateOptimisticMode();

    // Warp time
    vm.warp(block.timestamp + 2 hours);

    // Checks
    isOptimistic();

    // Again slow mode
    vm.prank(watcher);
    rootManager.activateSlowMode();

    // Checks that we are in slow mode
    isSlow();

    // Count has to be 0
    assertEq(rootManager.getPendingInboundRootsCount(), 0);

    // Aggregate again elements to the queue
    vm.prank(connectors[0]);
    rootManager.aggregate(domains[0], bytes32("test0"));
    vm.prank(connectors[1]);
    rootManager.aggregate(domains[1], bytes32("test1"));
    vm.prank(connectors[2]);
    rootManager.aggregate(domains[2], bytes32("test2"));

    // Count has to be 3
    assertEq(rootManager.getPendingInboundRootsCount(), 3);

    // Fast forward delayBlocks number of blocks so all of the inbound roots are considered verified.
    vm.roll(block.number + rootManager.delayBlocks());

    // Mock all the sends
    for (uint256 _i; _i < connectors.length; ++_i) {
      vm.mockCall(connectors[_i], abi.encodeWithSelector(IHubConnector.sendMessage.selector), abi.encode());
      vm.expectCall(connectors[_i], abi.encodeWithSelector(IHubConnector.sendMessage.selector));
    }

    // Propagate
    rootManager.propagate(connectors, fees, encodedData);

    // Count has to be 0
    assertEq(rootManager.getPendingInboundRootsCount(), 0);
  }

  function test_RootManager__QueuedDequeueQueuedSwitch() external {
    vm.mockCall(
      watcherManager,
      abi.encodeWithSelector(WatcherManager(watcherManager).isWatcher.selector),
      abi.encode(true)
    );
    vm.prank(watcher);
    // Set in slowMode
    rootManager.activateSlowMode();

    // Checks that we are in slow mode
    isSlow();

    // Aggregate elements to the queue
    vm.prank(connectors[0]);
    rootManager.aggregate(domains[0], bytes32("test0"));
    vm.prank(connectors[1]);
    rootManager.aggregate(domains[1], bytes32("test1"));

    // Count has to be 2
    assertEq(rootManager.getPendingInboundRootsCount(), 2);

    // Fast forward delayBlocks number of blocks so all of the inbound roots are considered verified.
    vm.roll(block.number + rootManager.delayBlocks());

    // Dequeue pending inbounds roots
    (bytes32 _aggregateRootBefore, uint256 _countBefore) = rootManager.dequeue();

    // Switch again to optimistic mode
    vm.prank(owner);
    rootManager.activateOptimisticMode();

    // Checks
    isOptimistic();

    // Again slow mode
    vm.prank(watcher);
    rootManager.activateSlowMode();

    // Checks that we are in slow mode
    isSlow();

    // Count has to be 0
    assertEq(rootManager.getPendingInboundRootsCount(), 0);

    // Aggregate again elements to the queue
    vm.prank(connectors[0]);
    rootManager.aggregate(domains[0], bytes32("test0"));
    vm.prank(connectors[1]);
    rootManager.aggregate(domains[1], bytes32("test1"));
    vm.prank(connectors[2]);
    rootManager.aggregate(domains[2], bytes32("test2"));

    // Fast forward delayBlocks number of blocks so all of the inbound roots are considered verified.
    vm.roll(block.number + rootManager.delayBlocks());

    // Dequeue pending inbounds roots
    (bytes32 _aggregateRootAfter, uint256 _countAfter) = rootManager.dequeue();
    (bytes32 _realAggregateRoot, ) = rootManager.MERKLE().rootAndCount();

    // Is not eq to before but its the good one
    assertNotEq(_aggregateRootAfter, _aggregateRootBefore);
    assertEq(_aggregateRootAfter, _realAggregateRoot);

    // Mock all the sends
    for (uint256 _i; _i < connectors.length; ++_i) {
      vm.mockCall(connectors[_i], abi.encodeWithSelector(IHubConnector.sendMessage.selector), abi.encode());
      vm.expectCall(connectors[_i], abi.encodeWithSelector(IHubConnector.sendMessage.selector));
    }

    // Propagate
    rootManager.propagate(connectors, fees, encodedData);

    // Pending count has to be 0
    assertEq(rootManager.getPendingInboundRootsCount(), 0);

    // Count has to be 5
    assertEq(rootManager.MERKLE().count(), _countAfter);
  }

  function test_RootManager__QueuedSwitchDequeue() external {
    // Start in slowMode
    vm.mockCall(
      watcherManager,
      abi.encodeWithSelector(WatcherManager(watcherManager).isWatcher.selector),
      abi.encode(true)
    );
    vm.prank(watcher);
    rootManager.activateSlowMode();

    // Checks that we are in slow mode
    isSlow();

    // Aggregate elements to the queue
    vm.prank(connectors[0]);
    rootManager.aggregate(domains[0], bytes32("test0"));
    vm.prank(connectors[1]);
    rootManager.aggregate(domains[1], bytes32("test1"));

    // Count has to be 2
    assertEq(rootManager.getPendingInboundRootsCount(), 2);

    // Fast forward delayBlocks number of blocks so all of the inbound roots are considered verified.
    vm.roll(block.number + rootManager.delayBlocks());

    // Switch again to optimistic mode
    vm.prank(owner);
    rootManager.activateOptimisticMode();

    // Checks
    isOptimistic();

    // Again slow mode
    vm.prank(watcher);
    rootManager.activateSlowMode();

    // Checks that we are in slow mode
    isSlow();

    // Dequeue pending inbounds roots
    (bytes32 _realAggregateRoot, ) = rootManager.MERKLE().rootAndCount();
    (bytes32 _aggregateRootAfter, uint256 _countAfter) = rootManager.dequeue();

    // As not new roots merkleRoot and dequeue aggregate root should be the same
    assertEq(_aggregateRootAfter, _realAggregateRoot);
  }

  // Helper function to check if mode is slow
  function isSlow() internal {
    assertEq(rootManager.optimisticMode(), false);
  }

  // Helper function to check if mode is optimistic
  function isOptimistic() internal {
    assertEq(rootManager.optimisticMode(), true);
  }

  // Helper function to proposeAggregateRoot
  function proposeAggregateRoot() internal {
    rootManager.proposeAggregateRoot(snapshotId, aggregateRoot, snapshotsRoots, domains);
  }
}
