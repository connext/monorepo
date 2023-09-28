// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {MockSpokeConnector} from "../../utils/Mock.sol";
import {SpokeConnector} from "../../../contracts/messaging/connectors/SpokeConnector.sol";
import {WatcherManager} from "../../../contracts/messaging/WatcherManager.sol";
import {MerkleTreeManager} from "../../../contracts/messaging/MerkleTreeManager.sol";
import {Message} from "../../../contracts/messaging/libraries/Message.sol";
import {RateLimited} from "../../../contracts/messaging/libraries/RateLimited.sol";
import {TypeCasts} from "../../../contracts/shared/libraries/TypeCasts.sol";
import {MerkleLib} from "../../../contracts/messaging/libraries/MerkleLib.sol";
import {SnapshotId} from "../../../contracts/messaging/libraries/SnapshotId.sol";

import "../../utils/ForgeHelper.sol";

contract Base is ForgeHelper {
  event MessageSent(bytes data, bytes encodedData, address caller);

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
  WatcherManager _watcherManager;
  MerkleTreeManager _merkle;

  uint256 PROCESS_GAS = 850_000;
  uint256 RESERVE_GAS = 15_000;
  uint256 SNAPSHOT_DURATION = 30 minutes;

  // ============ Setup ============
  function setUp() public virtual {
    utils_deployAndSetup();
  }

  // ============ utils ============
  function utils_deployAndSetup() public {
    vm.startPrank(owner);

    _watcherManager = new WatcherManager();
    _merkle = new MerkleTreeManager();

    spokeConnector = new MockSpokeConnector(
      _originDomain, // uint32 _domain,
      _mainnetDomain, // uint32 _mirrorDomain
      _originAMB, // address _amb,
      _rootManager, // address _rootManager,
      address(_merkle), // address _merkle
      address(0), // address _mirrorConnector
      PROCESS_GAS, // uint256 _processGas,
      RESERVE_GAS, // uint256 _reserveGas
      0, // uint256 _delayBlocks
      address(_watcherManager)
    );
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

contract SpokeConnector_GetLastCompletedSnapshotId is Base {
  function test_getLastCompletedSnapshotIdExternal(uint128 _snapshotId) public {
    vm.assume(_snapshotId > 0);

    vm.warp(SNAPSHOT_DURATION * _snapshotId);
    assertEq(spokeConnector.getLastCompletedSnapshotId(), _snapshotId);
  }
}

contract SpokeConnector_GetSnapshotDuration is Base {
  function test_getSnapshotDuration() public {
    assertEq(SnapshotId.SNAPSHOT_DURATION, spokeConnector.getSnapshotDuration());
  }
}
