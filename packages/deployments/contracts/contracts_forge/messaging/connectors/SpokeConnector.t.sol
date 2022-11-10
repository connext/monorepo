// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {MockSpokeConnector} from "../../utils/Mock.sol";
import {SpokeConnector} from "../../../contracts/messaging/connectors/SpokeConnector.sol";
import {WatcherManager} from "../../../contracts/messaging/WatcherManager.sol";
import {MerkleTreeManager} from "../../../contracts/messaging/Merkle.sol";
import {Message} from "../../../contracts/messaging/libraries/Message.sol";
import {RateLimited} from "../../../contracts/messaging/libraries/RateLimited.sol";

import "../../utils/ForgeHelper.sol";

contract SpokeConnectorTest is ForgeHelper {
  event MessageSent(bytes data, address caller);

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
  address _watcherManager = address(new WatcherManager());
  address _merkle = address(new MerkleTreeManager());

  uint256 PROCESS_GAS = 850_000;
  uint256 RESERVE_GAS = 15_000;

  // ============ Setup ============
  function setUp() public {
    utils_deployAndSetup();
  }

  // ============ utils ============
  function utils_deployAndSetup() public {
    vm.prank(owner);
    spokeConnector = new MockSpokeConnector(
      _originDomain, // uint32 _domain,
      _mainnetDomain, // uint32 _mirrorDomain
      _originAMB, // address _amb,
      _rootManager, // address _rootManager,
      _merkle, // address _merkle
      address(0), // address _mirrorConnector
      PROCESS_GAS, // uint256 _mirrorGas
      PROCESS_GAS, // uint256 _processGas,
      RESERVE_GAS, // uint256 _reserveGas
      0, // uint256 _delayBlocks
      _watcherManager
    );
  }

  // mock call to get watcher so all addresses are watchers
  function utils_mockIsWatcher_true() public {
    vm.mockCall(address(_watcherManager), abi.encodeWithSelector(WatcherManager.isWatcher.selector), abi.encode(true));
  }

  function test_SpokeConnector__setRateLimitBlocks_works() public {
    // Is 0 (disabled) by default.
    assertEq(spokeConnector.rateLimitBlocks(), 0);

    vm.prank(owner);
    spokeConnector.setRateLimitBlocks(123);

    assertEq(spokeConnector.rateLimitBlocks(), 123);
  }

  function test_SpokeConnector__setWatcherPaused_failsIfNotWatcher(address caller) public {
    // vm.mockCall(address(_watcherManager), abi.encodeWithSelector(WatcherManager.isWatcher.selector), abi.encode(false));
    vm.expectRevert("!watcher");
    // no watchers so every address should fail
    vm.prank(caller);
    spokeConnector.pause();
  }

  function test_SpokeConnector__setWatcherPaused_worksIfWatcher(address watcher) public {
    utils_mockIsWatcher_true();
    vm.prank(watcher);
    spokeConnector.pause();
    assertTrue(spokeConnector.paused());
  }

  function test_SpokeConnector__send_works() public {
    bytes32 root = bytes32(bytes("test123"));
    vm.mockCall(address(_merkle), abi.encodeWithSelector(MerkleTreeManager.root.selector), abi.encode(root));
    bytes memory data = abi.encodePacked(root);

    vm.expectEmit(true, true, true, true);
    emit MessageSent(data, address(this));

    spokeConnector.send();

    assertEq(MockSpokeConnector(address(spokeConnector)).lastOutbound(), keccak256(data));
  }

  function test_SpokeConnector__send_failsIfPaused() public {
    utils_mockIsWatcher_true();
    spokeConnector.pause();
    assertTrue(spokeConnector.paused());

    vm.expectRevert("Pausable: paused");
    spokeConnector.send();
  }

  function test_SpokeConnector__send_failsIfRateLimitExceeded() public {
    vm.prank(owner);
    spokeConnector.setRateLimitBlocks(10);

    vm.expectRevert(RateLimited.RateLimited__rateLimited_messageSendRateExceeded.selector);
    spokeConnector.send();
  }

  function test_SpokeConnector__send_failsIfRootAlreadySent() public {
    bytes32 root = bytes32(bytes("test123"));
    vm.mockCall(address(_merkle), abi.encodeWithSelector(MerkleTreeManager.root.selector), abi.encode(root));
    bytes memory data = abi.encodePacked(root);

    spokeConnector.send();
    assertEq(MockSpokeConnector(address(spokeConnector)).lastOutbound(), keccak256(data));

    vm.expectRevert("root already sent");
    spokeConnector.send();
    assertEq(MockSpokeConnector(address(spokeConnector)).lastOutbound(), keccak256(data));
  }

  function test_SpokeConnector__proveAndProcess_failsIfPaused() public {
    utils_mockIsWatcher_true();
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
