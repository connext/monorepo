// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "../utils/ForgeHelper.sol";
import "../../contracts/messaging/WatcherClient.sol";
import "../../contracts/messaging/WatcherManager.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

contract WatcherClientTest is ForgeHelper {
  // ============ Storage ============
  WatcherClient watcherClient;
  address owner = address(1);
  address watcherManager = address(2);
  address watcher = address(42);

  // ============ Setup ============
  function setUp() public {
    vm.prank(owner);
    watcherClient = new WatcherClient(watcherManager);
    vm.mockCall(address(0), abi.encodeWithSelector(WatcherManager.isWatcher.selector, watcher), abi.encode(true));
  }

  function test_WatcherClient__setWatcherManager_failsIfNotOwner(address caller) public {
    if (caller == owner) {
      // fuzz test, return if owner
      return;
    }

    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    vm.prank(caller);
    watcherClient.setWatcherManager(address(3));
  }

  function test_WatcherClient__setWatcherManager_works() public {
    assertEq(address(watcherClient.watcherManager()), watcherManager);
    vm.prank(owner);
    watcherClient.setWatcherManager(address(3));
    assertEq(address(watcherClient.watcherManager()), address(3));
  }
}
