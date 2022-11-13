// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {MockSpokeConnector} from "../../utils/Mock.sol";
import {SpokeConnector} from "../../../contracts/messaging/connectors/SpokeConnector.sol";
import {WatcherManager} from "../../../contracts/messaging/WatcherManager.sol";
import {MerkleTreeManager} from "../../../contracts/messaging/MerkleTreeManager.sol";
import {Message} from "../../../contracts/messaging/libraries/Message.sol";
import {RateLimited} from "../../../contracts/messaging/libraries/RateLimited.sol";

import "../../utils/ForgeHelper.sol";

contract SpokeConnectorTest is ForgeHelper {
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

  uint32 _mainnetDomain = uint32(345);
  address _destinationMainnetAMB = address(456456);
  address _originMainnetAMB = address(123123);
  address _rootManager = address(121212);
  WatcherManager _watcherManager;
  MerkleTreeManager _merkle;

  uint256 PROCESS_GAS = 850_000;
  uint256 RESERVE_GAS = 15_000;

  // ============ Setup ============
  function setUp() public {
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
