// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {MockSpokeConnector} from "../../utils/Mock.sol";
import {SpokeConnector} from "../../../contracts/messaging/connectors/SpokeConnector.sol";
import {WatcherManager} from "../../../contracts/messaging/WatcherManager.sol";
import {RootManager} from "../../../contracts/messaging/RootManager.sol";
import {MerkleTreeManager} from "../../../contracts/messaging/MerkleTreeManager.sol";
import {Message} from "../../../contracts/messaging/libraries/Message.sol";
import {RateLimited} from "../../../contracts/messaging/libraries/RateLimited.sol";
import {TypeCasts} from "../../../contracts/shared/libraries/TypeCasts.sol";
import {MerkleLib} from "../../../contracts/messaging/libraries/MerkleLib.sol";
import {SnapshotId} from "../../../contracts/messaging/libraries/SnapshotId.sol";
import {ProposedOwnable} from "../../../contracts/shared/ProposedOwnable.sol";

import "../../utils/ForgeHelper.sol";

contract Base is ForgeHelper {
  event MessageSent(bytes data, bytes encodedData, address caller);
  event ProposerAdded(address indexed _proposer);
  event ProposerRemoved(address indexed _proposer);

  using stdStorage for StdStorage;

  // ============ Storage ============
  SpokeConnector spokeConnector;
  address owner = address(1);

  // ============ config
  uint32 _originDomain = uint32(123);
  address _originAMB = address(123);

  uint32 _destinationDomain = uint32(456);
  address _destinationAMB = address(456);
  address _destinationAddress = address(456);

  uint32 _mainnetDomain = uint32(345);
  address _destinationMainnetAMB = address(456456);
  address _originMainnetAMB = address(123123);
  address _rootManager = address(121212);
  address _proposer = makeAddr("proposer");

  WatcherManager _watcherManager;
  MerkleTreeManager _merkle;

  uint256 PROCESS_GAS = 850_000;
  uint256 RESERVE_GAS = 15_000;
  uint256 SNAPSHOT_DURATION = 30 minutes;
  uint256 _minDisputeBlocks = 100;
  uint256 _disputeBlocks = 120;

  // ============ Setup ============
  function setUp() public virtual {
    utils_deployAndSetup();
  }

  // ============ utils ============
  function utils_deployAndSetup() public {
    vm.startPrank(owner);

    _watcherManager = new WatcherManager();
    _merkle = new MerkleTreeManager();

    SpokeConnector.ConstructorParams memory _baseParams = SpokeConnector.ConstructorParams({
      domain: _originDomain,
      mirrorDomain: _mainnetDomain,
      amb: _originAMB,
      rootManager: _rootManager,
      mirrorConnector: address(0),
      processGas: PROCESS_GAS,
      reserveGas: RESERVE_GAS,
      delayBlocks: 0,
      merkle: address(_merkle),
      watcherManager: address(_watcherManager),
      minDisputeBlocks: _minDisputeBlocks,
      disputeBlocks: _disputeBlocks
    });

    spokeConnector = new MockSpokeConnector(_baseParams);
    vm.stopPrank();
  }

  // mock call to get watcher so all addresses are watchers
  function utils_mockIsWatcher_true(address watcher) public {
    vm.prank(owner);
    _watcherManager.addWatcher(watcher);
  }
}

contract SpokeConnector_General is Base {
  function test_SpokeConnector__snapshotPeriod() public {
    assertEq(SnapshotId.SNAPSHOT_DURATION, SNAPSHOT_DURATION);
  }

  function test_SpokeConnector__setRateLimitBlocks_works() public {
    // Is 0 (disabled) by default.
    assertEq(spokeConnector.rateLimitBlocks(), 0);

    vm.prank(owner);
    spokeConnector.setRateLimitBlocks(123);

    assertEq(spokeConnector.rateLimitBlocks(), 123);
  }

  function test_SpokeConnector__setWatcherPaused_failsIfNotWatcher(address caller) public {
    vm.expectRevert("!watcher");
    // no watchers so every address should fail
    vm.prank(caller);
    spokeConnector.pause();
  }

  function test_SpokeConnector__setWatcherPaused_worksIfWatcher(address watcher) public {
    utils_mockIsWatcher_true(watcher);
    vm.prank(watcher);
    spokeConnector.pause();
    assertTrue(spokeConnector.paused());
  }

  function test_SpokeConnector__send_works() public {
    bytes32 root = bytes32(bytes("test123"));
    vm.mockCall(address(_merkle), abi.encodeWithSelector(MerkleTreeManager.root.selector), abi.encode(root));
    bytes memory data = abi.encodePacked(root);
    bytes memory encodedData = abi.encode("");

    vm.expectEmit(true, true, true, true);
    emit MessageSent(data, encodedData, address(this));

    spokeConnector.send(encodedData);

    assertEq(MockSpokeConnector(payable(address(spokeConnector))).lastOutbound(), keccak256(data));
  }

  function test_SpokeConnector__send_failsIfPaused() public {
    address caller = address(123);

    utils_mockIsWatcher_true(caller);

    vm.prank(caller);
    spokeConnector.pause();
    assertTrue(spokeConnector.paused());

    vm.expectRevert("Pausable: paused");
    spokeConnector.send(abi.encode(""));
  }

  function test_SpokeConnector__send_failsIfRateLimitExceeded() public {
    vm.prank(owner);
    spokeConnector.setRateLimitBlocks(10);

    vm.expectRevert(RateLimited.RateLimited__rateLimited_messageSendRateExceeded.selector);
    spokeConnector.send(abi.encode(""));
  }

  function test_SpokeConnector__send_failsIfRootAlreadySent() public {
    bytes32 root = bytes32(bytes("test123"));
    vm.mockCall(address(_merkle), abi.encodeWithSelector(MerkleTreeManager.root.selector), abi.encode(root));
    bytes memory data = abi.encodePacked(root);
    bytes memory encodedData = abi.encode("");

    spokeConnector.send(encodedData);
    assertEq(MockSpokeConnector(payable(address(spokeConnector))).lastOutbound(), keccak256(data));

    vm.expectRevert("root already sent");
    spokeConnector.send(encodedData);
    assertEq(MockSpokeConnector(payable(address(spokeConnector))).lastOutbound(), keccak256(data));
  }

  function test_SpokeConnector__proveAndProcess_failsIfPaused() public {
    address caller = address(123);
    utils_mockIsWatcher_true(caller);

    vm.prank(caller);
    spokeConnector.pause();
    assertTrue(spokeConnector.paused());

    bytes32[32] memory proof;
    bytes32 _destinationRouter;
    bytes memory body = abi.encode(_destinationDomain * _originDomain);
    bytes memory message = Message.formatMessage(
      _originDomain,
      bytes32(uint256(uint160(address(this)))), // TODO necessary?
      0,
      _destinationDomain,
      _destinationRouter,
      body
    );
    vm.expectRevert("Pausable: paused");
    SpokeConnector.Proof[] memory proofs = new SpokeConnector.Proof[](1);
    proofs[0] = SpokeConnector.Proof(message, proof, 0);
    spokeConnector.proveAndProcess(proofs, bytes32(""), proof, 0);
  }
}

contract SpokeConnector_Constructor is Base {
  function test_shouldInitializeValuesCorrectly() public {
    assertEq(spokeConnector.DOMAIN(), _originDomain);
    assertEq(spokeConnector.MIRROR_DOMAIN(), _mainnetDomain);
    assertEq(spokeConnector.AMB(), _originAMB);
    assertEq(spokeConnector.ROOT_MANAGER(), _rootManager);
    assertEq(spokeConnector.mirrorConnector(), address(0));
    assertEq(spokeConnector.PROCESS_GAS(), PROCESS_GAS);
    assertEq(spokeConnector.RESERVE_GAS(), RESERVE_GAS);
    assertEq(spokeConnector.delayBlocks(), 0);
    assertEq(address(spokeConnector.MERKLE()), address(_merkle));
    assertEq(address(spokeConnector.watcherManager()), address(_watcherManager));
    assertEq(spokeConnector.minDisputeBlocks(), _minDisputeBlocks);
    assertEq(spokeConnector.disputeBlocks(), _disputeBlocks);
  }

  function test_shouldRevertIfDisputeBlocksLessThanMinDisputeBlocks() public {
    uint256 _failingDisputeBlocks = _minDisputeBlocks - 1;
    SpokeConnector.ConstructorParams memory _constructorParams = SpokeConnector.ConstructorParams({
      domain: _originDomain,
      mirrorDomain: _mainnetDomain,
      amb: _originAMB,
      rootManager: _rootManager,
      mirrorConnector: address(0),
      processGas: PROCESS_GAS,
      reserveGas: RESERVE_GAS,
      delayBlocks: 0,
      merkle: address(_merkle),
      watcherManager: address(_watcherManager),
      minDisputeBlocks: _minDisputeBlocks,
      disputeBlocks: _failingDisputeBlocks
    });

    vm.expectRevert(SpokeConnector.SpokeConnector_constructor__DisputeBlocksLowerThanMin.selector);
    new MockSpokeConnector(_constructorParams);
  }
}

contract SpokeConnector_Dispatch is Base {
  event SnapshotRootSaved(uint256 indexed snapshotId, bytes32 indexed root, uint256 indexed count);
  event Dispatch(bytes32 indexed leaf, uint256 indexed index, bytes32 indexed root, bytes message);

  address allowedCaller = makeAddr("allowedCaller");
  uint256 snapshotId = SnapshotId.getLastCompletedSnapshotId();

  function setUp() public virtual override {
    super.setUp();

    address _arborist = address(spokeConnector);

    vm.startPrank(owner);
    _merkle.initialize(_arborist);
    spokeConnector.addSender(allowedCaller);
    vm.stopPrank();
  }

  function test_shouldSetASnapshotRoot() public {
    bytes32 _expectedRoot = spokeConnector.outboundRoot();

    // set snapshot root to zero to guarantee that dispatch will save the snapshot root in storage
    MockSpokeConnector(payable(address(spokeConnector))).setSnapshotRoot(snapshotId, bytes32(0));

    vm.prank(allowedCaller);
    spokeConnector.dispatch(_destinationDomain, TypeCasts.addressToBytes32(_destinationAddress), bytes("data"));

    bytes32 _snapshotRoot = spokeConnector.snapshotRoots(snapshotId);

    assertEq(_snapshotRoot, _expectedRoot);
  }

  function test_shouldNotSaveTheSnapshotRoot(bytes32 _root) public {
    vm.assume(_root > 0);

    // set a random root to the snapshotId
    MockSpokeConnector(payable(address(spokeConnector))).setSnapshotRoot(snapshotId, _root);

    vm.prank(allowedCaller);
    // should not modify the snapshotId's root set previously
    spokeConnector.dispatch(_destinationDomain, TypeCasts.addressToBytes32(_destinationAddress), bytes("message"));

    bytes32 _snapshotRoot = spokeConnector.snapshotRoots(snapshotId);

    assertEq(_snapshotRoot, _root);
  }

  function test_emitEventIfSnapshotRootHasBeenSaved() public {
    bytes32 _expectedRoot = spokeConnector.outboundRoot();
    uint256 _count = MockSpokeConnector(payable(address(spokeConnector))).count();

    // set snapshot root to zero to guarantee that dispatch will save the snapshot root in storage
    MockSpokeConnector(payable(address(spokeConnector))).setSnapshotRoot(snapshotId, bytes32(0));

    vm.expectEmit(true, true, true, true);
    emit SnapshotRootSaved(snapshotId, _expectedRoot, _count);

    vm.prank(allowedCaller);
    spokeConnector.dispatch(_destinationDomain, TypeCasts.addressToBytes32(_destinationAddress), bytes("message"));
  }

  function test_messageHasBeenDispatchedProperly(
    uint32 destinationDomain,
    bytes32 recipientAddress,
    bytes memory messageBody,
    bytes32 root,
    uint256 count
  ) public {
    vm.assume(count > 0);
    // set snapshot root to zero to guarantee that dispatch will save the snapshot root in storage
    MockSpokeConnector(payable(address(spokeConnector))).setSnapshotRoot(snapshotId, bytes32(0));

    bytes memory expectedMessage = abi.encodePacked(
      _originDomain,
      TypeCasts.addressToBytes32(allowedCaller),
      uint32(0),
      destinationDomain,
      recipientAddress,
      messageBody
    );
    bytes32 expectedMessageHash = keccak256(expectedMessage);
    vm.mockCall(
      address(_merkle),
      abi.encodeWithSignature("insert(bytes32)", expectedMessageHash),
      abi.encode(root, count)
    );

    vm.prank(allowedCaller);
    (bytes32 messageHash, bytes memory message) = spokeConnector.dispatch(
      destinationDomain,
      recipientAddress,
      messageBody
    );

    assertEq(messageHash, expectedMessageHash);
    assertEq(message, expectedMessage);
  }

  function test_emitEventIfDispatch(
    uint32 _destinationDomain,
    bytes32 _recipientAddress,
    bytes memory _messageBody,
    bytes32 _root,
    uint256 _count
  ) public {
    vm.assume(_count > 0);
    // set snapshot root to zero to guarantee that dispatch will save the snapshot root in storage
    MockSpokeConnector(payable(address(spokeConnector))).setSnapshotRoot(snapshotId, bytes32(0));

    // get starting root + count
    bytes32 _startingRoot = MockSpokeConnector(payable(address(spokeConnector))).outboundRoot();
    uint256 _startingCount = MockSpokeConnector(payable(address(spokeConnector))).count();

    vm.expectEmit(true, true, true, true);
    emit SnapshotRootSaved(snapshotId, _startingRoot, _startingCount);

    bytes memory _message = abi.encodePacked(
      _originDomain,
      TypeCasts.addressToBytes32(allowedCaller),
      uint32(0),
      _destinationDomain,
      _recipientAddress,
      _messageBody
    );
    bytes32 _messageHash = keccak256(_message);
    vm.mockCall(address(_merkle), abi.encodeWithSignature("insert(bytes32)", _messageHash), abi.encode(_root, _count));

    vm.expectEmit(true, true, true, true);
    emit Dispatch(_messageHash, _count - 1, _root, _message);

    vm.prank(allowedCaller);
    spokeConnector.dispatch(_destinationDomain, _recipientAddress, _messageBody);
  }
}

contract SpokeConnector_AddProposer is Base {
  function test_revertIfCallerIsNotOwner(address _stranger, address _proposer) public {
    vm.assume(_proposer != address(0));
    vm.assume(_stranger != owner);

    vm.prank(_stranger);
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    spokeConnector.addProposer(_proposer);
  }

  function test_addProposer(address _proposer) public {
    vm.assume(_proposer != address(0));

    vm.expectEmit(true, true, true, true);
    emit ProposerAdded(_proposer);

    vm.prank(owner);
    spokeConnector.addProposer(_proposer);

    assertEq(spokeConnector.allowlistedProposers(_proposer), true);
  }
}

contract SpokeConnector_RemoveProposer is Base {
  function test_revertIfCallerIsNotOwner(address _stranger, address _proposer) public {
    vm.assume(_proposer != address(0));
    vm.assume(_stranger != owner);

    vm.prank(_stranger);
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    spokeConnector.removeProposer(_proposer);
  }

  function test_removeProposer(address _proposer) public {
    vm.assume(_proposer != address(0));
    vm.startPrank(owner);

    spokeConnector.addProposer(_proposer);

    vm.expectEmit(true, true, true, true);
    emit ProposerRemoved(_proposer);

    spokeConnector.removeProposer(_proposer);
    assertEq(spokeConnector.allowlistedProposers(_proposer), false);
  }
}

contract SpokeConnector_activateSlowMode is Base {
  event SlowModeActivated(address indexed watcher);

  function setUp() public virtual override {
    super.setUp();
    MockSpokeConnector(payable(address(spokeConnector))).setOptimisticMode(true);

    vm.mockCall(
      address(_watcherManager),
      abi.encodeWithSelector(WatcherManager(_watcherManager).isWatcher.selector),
      abi.encode(true)
    );
  }

  function test_revertIfCallerIsNotWatcher(address caller) public {
    vm.mockCall(
      address(_watcherManager),
      abi.encodeWithSelector(WatcherManager(_watcherManager).isWatcher.selector),
      abi.encode(false)
    );
    vm.expectRevert(bytes("!watcher"));
    vm.prank(caller);
    spokeConnector.activateSlowMode();
  }

  function test_revertIfSlowModeOn() public {
    MockSpokeConnector(payable(address(spokeConnector))).setOptimisticMode(false);

    vm.expectRevert(abi.encodeWithSelector(SpokeConnector.SpokeConnector_onlyOptimisticMode__SlowModeOn.selector));
    vm.prank(owner);
    spokeConnector.activateSlowMode();
  }

  function test_cleanProposedAggregateRoot(bytes32 _proposedAggregateRootHash) public {
    vm.assume(_proposedAggregateRootHash != spokeConnector.FINALIZED_HASH());
    MockSpokeConnector(payable(address(spokeConnector))).setProposedAggregateRootHash(_proposedAggregateRootHash);
    spokeConnector.activateSlowMode();
    assertEq(spokeConnector.proposedAggregateRootHash(), spokeConnector.FINALIZED_HASH());
  }

  function test_emitSlowModeActivated() public {
    vm.expectEmit(true, true, true, true);
    emit SlowModeActivated(owner);

    vm.prank(owner);
    spokeConnector.activateSlowMode();
  }
}

contract SpokeConnector_activateOptimisticMode is Base {
  event OptimisticModeActivated();

  function test_revertIfCallerIsNotOwner(address stranger) public {
    vm.assume(stranger != owner);
    vm.prank(stranger);
    vm.expectRevert(abi.encodeWithSelector(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector));
    spokeConnector.activateOptimisticMode();
  }

  function test_revertIfOptimisticModeOn() public {
    MockSpokeConnector(payable(address(spokeConnector))).setOptimisticMode(true);
    vm.expectRevert(
      abi.encodeWithSelector(SpokeConnector.SpokeConnector_activateOptimisticMode__OptimisticModeOn.selector)
    );

    vm.prank(owner);
    spokeConnector.activateOptimisticMode();
  }

  function test_switchToOptimisticMode() public {
    MockSpokeConnector(payable(address(spokeConnector))).setOptimisticMode(false);
    bool beforeMode = spokeConnector.optimisticMode();

    vm.prank(owner);
    spokeConnector.activateOptimisticMode();
    bool afterMode = spokeConnector.optimisticMode();

    assertEq(beforeMode, false);
    assertEq(afterMode, true);
  }

  function test_emitIfOptimisticModeIsActivated() public {
    MockSpokeConnector(payable(address(spokeConnector))).setOptimisticMode(false);

    vm.expectEmit(true, true, true, true);
    emit OptimisticModeActivated();

    vm.prank(owner);
    spokeConnector.activateOptimisticMode();
  }
}

contract SpokeConnector_ProposeAggregateRoot is Base {
  event AggregateRootProposed(
    bytes32 indexed aggregateRoot,
    uint256 indexed rootTimestamp,
    uint256 indexed endOfDispute,
    uint32 domain
  );

  function setUp() public virtual override {
    super.setUp();
    MockSpokeConnector(payable(address(spokeConnector))).setAllowlistedProposer(_proposer, true);
    MockSpokeConnector(payable(address(spokeConnector))).setOptimisticMode(true);
  }

  function test_revertIfCallerIsNotProposer(address stranger, bytes32 aggregateRoot, uint256 rootTimestamp) public {
    vm.assume(stranger != _proposer);

    vm.expectRevert(
      abi.encodeWithSelector(SpokeConnector.SpokeConnector_onlyProposer__NotAllowlistedProposer.selector)
    );
    vm.prank(stranger);
    spokeConnector.proposeAggregateRoot(aggregateRoot, rootTimestamp);
  }

  function test_revertIfSlowModeOn(bytes32 aggregateRoot, uint256 rootTimestamp) public {
    MockSpokeConnector(payable(address(spokeConnector))).setOptimisticMode(false);

    vm.expectRevert(abi.encodeWithSelector(SpokeConnector.SpokeConnector_onlyOptimisticMode__SlowModeOn.selector));
    vm.prank(_proposer);
    spokeConnector.proposeAggregateRoot(aggregateRoot, rootTimestamp);
  }

  function test_revertIfSystemIsPaused(bytes32 aggregateRoot, uint256 rootTimestamp, address watcher) public {
    utils_mockIsWatcher_true(watcher);
    vm.prank(watcher);
    spokeConnector.pause();
    vm.expectRevert("Pausable: paused");
    vm.prank(_proposer);
    spokeConnector.proposeAggregateRoot(aggregateRoot, rootTimestamp);
  }

  function test_revertIfProposeInProgress(bytes32 aggregateRoot, uint256 rootTimestamp) public {
    vm.assume(aggregateRoot != spokeConnector.FINALIZED_HASH());
    MockSpokeConnector(payable(address(spokeConnector))).setProposedAggregateRootHash(bytes32("random hash"));

    vm.expectRevert(
      abi.encodeWithSelector(SpokeConnector.SpokeConnector_proposeAggregateRoot__ProposeInProgress.selector)
    );
    vm.prank(_proposer);
    spokeConnector.proposeAggregateRoot(aggregateRoot, rootTimestamp);
  }

  function test_aggregateRootCorrectlyProposed(bytes32 aggregateRoot, uint256 rootTimestamp) public {
    vm.assume(aggregateRoot != spokeConnector.FINALIZED_HASH());
    uint256 _endOfDispute = block.number + spokeConnector.disputeBlocks();
    bytes32 _expectedAggregateRootProposedHash = keccak256(
      abi.encodePacked(aggregateRoot, rootTimestamp, _endOfDispute)
    );
    vm.prank(_proposer);
    spokeConnector.proposeAggregateRoot(aggregateRoot, rootTimestamp);
    assertEq(spokeConnector.proposedAggregateRootHash(), _expectedAggregateRootProposedHash);
  }

  function test_emitProposeAggregateRoot(bytes32 aggregateRoot, uint256 rootTimestamp) public {
    uint256 _endOfDispute = block.number + spokeConnector.disputeBlocks();

    vm.expectEmit(true, true, true, true);
    emit AggregateRootProposed(aggregateRoot, rootTimestamp, _endOfDispute, spokeConnector.DOMAIN());
    vm.prank(_proposer);
    spokeConnector.proposeAggregateRoot(aggregateRoot, rootTimestamp);
  }
}

contract SpokeConnector_Finalize is Base {
  event ProposedRootFinalized(bytes32 aggregateRoot);

  function setUp() public virtual override {
    super.setUp();
    MockSpokeConnector(payable(address(spokeConnector))).setOptimisticMode(true);
  }

  function test_revertIfSlowModeOn(bytes32 randomRoot, uint256 randomRootTimestamp, uint256 randomEndOfDispute) public {
    MockSpokeConnector(payable(address(spokeConnector))).setOptimisticMode(false);

    vm.expectRevert(abi.encodeWithSelector(SpokeConnector.SpokeConnector_onlyOptimisticMode__SlowModeOn.selector));
    spokeConnector.finalize(randomRoot, randomRootTimestamp, randomEndOfDispute);
  }

  function test_revertIfSystemIsPaused(
    bytes32 aggregateRoot,
    uint256 rootTimestamp,
    uint256 endOfDispute,
    address watcher
  ) public {
    utils_mockIsWatcher_true(watcher);
    vm.prank(watcher);
    spokeConnector.pause();
    vm.expectRevert("Pausable: paused");
    spokeConnector.finalize(aggregateRoot, rootTimestamp, endOfDispute);
  }

  function test_revertIfProposeInProgress(
    bytes32 randomProposedHash,
    uint256 randomRootTimestamp,
    uint256 randomEndOfDispute
  ) public {
    vm.assume(randomProposedHash != spokeConnector.FINALIZED_HASH());
    vm.assume(randomEndOfDispute > block.number);
    MockSpokeConnector(payable(address(spokeConnector))).setProposedAggregateRootHash(randomProposedHash);

    vm.expectRevert(abi.encodeWithSelector(SpokeConnector.SpokeConnector_finalize__ProposeInProgress.selector));
    spokeConnector.finalize(randomProposedHash, randomRootTimestamp, randomEndOfDispute);
  }

  function test_revertIfProposedHashIsFinalizedHash(
    bytes32 randomRoot,
    uint256 randomRootTimestamp,
    uint256 randomEndOfDispute
  ) public {
    vm.assume(randomRoot != spokeConnector.FINALIZED_HASH());
    vm.assume(randomEndOfDispute < block.number);
    vm.roll(block.number + spokeConnector.disputeBlocks());

    vm.expectRevert(SpokeConnector.SpokeConnector_finalize__ProposedHashIsFinalizedHash.selector);
    spokeConnector.finalize(randomRoot, randomRootTimestamp, randomEndOfDispute);
  }

  function test_revertIfAggregateRootDataIsInvalid(
    bytes32 randomRoot,
    uint256 randomRootTimestamp,
    uint256 randomEndOfDispute
  ) public {
    vm.assume(randomEndOfDispute < block.number);
    vm.roll(block.number + spokeConnector.disputeBlocks());
    MockSpokeConnector(payable(address(spokeConnector))).setProposedAggregateRootHash(spokeConnector.FINALIZED_HASH());

    vm.expectRevert(
      abi.encodeWithSelector(SpokeConnector.SpokeConnector_finalize__ProposedHashIsFinalizedHash.selector)
    );

    spokeConnector.finalize(randomRoot, randomRootTimestamp, randomEndOfDispute);
  }

  function test_revertIfAggregateRootHashIsInvalid(
    bytes32 aggregateRoot,
    uint256 validRootTimestamp,
    uint256 invalidRootTimestamp
  ) public {
    vm.assume(aggregateRoot != spokeConnector.FINALIZED_HASH());
    vm.assume(validRootTimestamp != invalidRootTimestamp);
    // setting a block.number that's higher than dispute blocks.
    vm.roll(spokeConnector.disputeBlocks() + 1);
    bytes32 _placeholderProposedRoot = bytes32("Placeholder Root");
    uint256 _placeholderEndOfDispute = block.number - spokeConnector.disputeBlocks() - 1;
    bytes32 _placeHolderProposedRootHash = keccak256(
      abi.encode(_placeholderProposedRoot, validRootTimestamp, _placeholderEndOfDispute)
    );
    MockSpokeConnector(payable(address(spokeConnector))).setProposedAggregateRootHash(_placeHolderProposedRootHash);

    vm.expectRevert(abi.encodeWithSelector(SpokeConnector.SpokeConnector_finalize__InvalidInputHash.selector));
    spokeConnector.finalize(aggregateRoot, invalidRootTimestamp, _placeholderEndOfDispute);
  }

  function test_setFinalizedAggregateRoot(bytes32 aggregateRoot, uint256 rootTimestamp, uint256 endOfDispute) public {
    vm.assume(aggregateRoot != spokeConnector.FINALIZED_HASH());
    vm.assume(endOfDispute < block.number);

    bytes32 _proposedRootHash = keccak256(abi.encode(aggregateRoot, rootTimestamp, endOfDispute));
    MockSpokeConnector(payable(address(spokeConnector))).setProposedAggregateRootHash(_proposedRootHash);

    vm.roll(block.number + spokeConnector.disputeBlocks());

    vm.expectEmit(true, true, true, true);
    emit ProposedRootFinalized(aggregateRoot);

    spokeConnector.finalize(aggregateRoot, rootTimestamp, endOfDispute);

    assertEq(spokeConnector.provenAggregateRoots(aggregateRoot), true);
    assertEq(spokeConnector.proposedAggregateRootHash(), spokeConnector.FINALIZED_HASH());
  }
}

contract SpokeConnector_SetMinDisputeBlocks is Base {
  event MinDisputeBlocksUpdated(uint256 _previous, uint256 _updated);

  function test_revertIfCallerIsNotOwner(address stranger) public {
    vm.assume(stranger != owner);
    uint256 _newMinDisputeBlocks = spokeConnector.minDisputeBlocks() + 10;
    vm.prank(stranger);
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    spokeConnector.setMinDisputeBlocks(_newMinDisputeBlocks);
  }

  function test_revertIfMinDisputeBlocksEqPrevMinDisputeBlocks() public {
    uint256 _currentMinDisputeBlocks = spokeConnector.minDisputeBlocks();
    vm.prank(owner);
    vm.expectRevert(SpokeConnector.SpokeConnector_setMinDisputeBlocks__SameMinDisputeBlocksAsBefore.selector);
    spokeConnector.setMinDisputeBlocks(_currentMinDisputeBlocks);
  }

  function test_changeMinDisputeBlocks(uint256 newMinDisputeBlocks) public {
    uint256 _prevMinDisputeBlocks = spokeConnector.minDisputeBlocks();
    vm.assume(newMinDisputeBlocks != _prevMinDisputeBlocks);
    vm.prank(owner);
    spokeConnector.setMinDisputeBlocks(newMinDisputeBlocks);
    uint256 _currentMinDisputeBlocks = spokeConnector.minDisputeBlocks();
    assertEq(_currentMinDisputeBlocks, newMinDisputeBlocks);
  }

  function test_emitIfMinDisputeBlocksChanged(uint256 newMinDisputeBlocks) public {
    uint256 _prevMinDisputeBlocks = spokeConnector.minDisputeBlocks();
    vm.assume(newMinDisputeBlocks != _prevMinDisputeBlocks);
    vm.prank(owner);

    vm.expectEmit(true, true, true, true);
    emit MinDisputeBlocksUpdated(_prevMinDisputeBlocks, newMinDisputeBlocks);

    spokeConnector.setMinDisputeBlocks(newMinDisputeBlocks);
  }
}

contract SpokeConnector_SetDisputeBlocks is Base {
  event DisputeBlocksUpdated(uint256 _previous, uint256 _updated);

  function test_revertIfCallerIsNotOwner(address stranger) public {
    vm.assume(stranger != owner);
    uint256 _newDisputeBlocks = spokeConnector.disputeBlocks() + 10;
    vm.prank(stranger);
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    spokeConnector.setDisputeBlocks(_newDisputeBlocks);
  }

  function test_revertIfDisputeBlocksAreLessThanMinAllowed(uint256 _smallDisputeBlocks) public {
    uint256 _allowedMinDisputeBlocks = spokeConnector.minDisputeBlocks();
    vm.assume(_smallDisputeBlocks < _allowedMinDisputeBlocks);
    vm.prank(owner);
    vm.expectRevert(SpokeConnector.SpokeConnector_setDisputeBlocks__DisputeBlocksLowerThanMin.selector);
    spokeConnector.setDisputeBlocks(_smallDisputeBlocks);
  }

  function test_revertIfDisputeBlocksEqPrevDisputeBlocks() public {
    uint256 _currentDisputeBlocks = spokeConnector.disputeBlocks();
    vm.prank(owner);
    vm.expectRevert(SpokeConnector.SpokeConnector_setDisputeBlocks__SameDisputeBlocksAsBefore.selector);
    spokeConnector.setDisputeBlocks(_currentDisputeBlocks);
  }

  function test_changeDisputeBlocks(uint256 newDisputeBlocks) public {
    uint256 _prevDisputeBlocks = spokeConnector.disputeBlocks();
    vm.assume(newDisputeBlocks > _prevDisputeBlocks);
    vm.prank(owner);
    spokeConnector.setDisputeBlocks(newDisputeBlocks);
    uint256 _currentDisputeBlocks = spokeConnector.disputeBlocks();
    assertEq(_currentDisputeBlocks, newDisputeBlocks);
  }

  function test_emitIfDisputeBlocksChanged(uint256 newDisputeBlocks) public {
    uint256 _prevDisputeBlocks = spokeConnector.disputeBlocks();
    vm.assume(newDisputeBlocks > _prevDisputeBlocks);
    vm.prank(owner);

    vm.expectEmit(true, true, true, true);
    emit DisputeBlocksUpdated(_prevDisputeBlocks, newDisputeBlocks);

    spokeConnector.setDisputeBlocks(newDisputeBlocks);
  }
}

contract SpokeConnector_ReceiveAggregateRoot is Base {
  event AggregateRootReceived(bytes32 indexed root);

  function setUp() public virtual override {
    super.setUp();
    MockSpokeConnector(payable(address(spokeConnector))).setOptimisticMode(false);
  }

  function test_revertIfNotInSlowMode(bytes32 newRoot) public {
    MockSpokeConnector(payable(address(spokeConnector))).setOptimisticMode(true);
    vm.expectRevert(SpokeConnector.SpokeConnector_receiveAggregateRoot__OptimisticModeOn.selector);
    MockSpokeConnector(payable(address(spokeConnector))).receiveAggregateRootForTest(newRoot);
  }

  function test_revertIfNewRootIsZero() public {
    bytes32 newRoot = bytes32("");
    vm.expectRevert("new root empty");
    MockSpokeConnector(payable(address(spokeConnector))).receiveAggregateRootForTest(newRoot);
  }

  function test_revertIfRootIsAlreadyPending(bytes32 newRoot) public {
    vm.assume(newRoot != bytes32(""));
    MockSpokeConnector(payable(address(spokeConnector))).setPendingAggregateRoot(newRoot, block.number);
    vm.expectRevert("root already pending");
    MockSpokeConnector(payable(address(spokeConnector))).receiveAggregateRootForTest(newRoot);
  }

  function test_revertIfRootIsAlreadyProven(bytes32 newRoot) public {
    vm.assume(newRoot != bytes32(""));
    MockSpokeConnector(payable(address(spokeConnector))).setProvenAggregateRoot(newRoot, true);
    vm.expectRevert("root already proven");
    MockSpokeConnector(payable(address(spokeConnector))).receiveAggregateRootForTest(newRoot);
  }

  function test_receiveAggregateRootSuccesfully(bytes32 newRoot) public {
    vm.assume(newRoot != bytes32(""));
    MockSpokeConnector(payable(address(spokeConnector))).receiveAggregateRootForTest(newRoot);
    assertEq(spokeConnector.pendingAggregateRoots(newRoot), block.number);
  }

  function test_emitIfAggregateRootIsReceived(bytes32 newRoot) public {
    vm.assume(newRoot != bytes32(""));
    vm.expectEmit(true, true, true, true);
    emit AggregateRootReceived(newRoot);

    MockSpokeConnector(payable(address(spokeConnector))).receiveAggregateRootForTest(newRoot);
  }
}

contract SpokeConnector_GetSnapshotDuration is Base {
  function test_getSnapshotDuration() public {
    assertEq(SnapshotId.SNAPSHOT_DURATION, spokeConnector.getSnapshotDuration());
  }
}
