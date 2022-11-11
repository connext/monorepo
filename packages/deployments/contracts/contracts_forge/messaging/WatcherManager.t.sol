// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "../utils/ForgeHelper.sol";
import "../../contracts/messaging/WatcherManager.sol";
import {ProposedOwnable} from "../../contracts/shared/ProposedOwnable.sol";

contract WatcherManagerTest is ForgeHelper {
  // ============ Storage ============
  WatcherManager watcherManager;
  address owner = address(1);

  // ============ Setup ============
  function setUp() public {
    utils_deployAndSetup();
  }

  // ============ utils ============
  function utils_deployAndSetup() public {
    vm.prank(owner);
    watcherManager = new WatcherManager();
  }

  function test_WatcherManager__addWatcher_failsIfNotOwner(address caller) public {
    if (caller == owner) {
      // fuzz test, return if owner
      return;
    }

    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    vm.prank(caller);
    watcherManager.addWatcher(caller);
  }

  function test_WatcherManager__addWatcher_failsIfAlreadyAdded(address watcher) public {
    vm.prank(owner);
    watcherManager.addWatcher(watcher);

    vm.expectRevert(bytes("already watcher"));
    vm.prank(owner);
    watcherManager.addWatcher(watcher);
  }

  function test_WatcherManager__addWatcher_works(address watcher) public {
    vm.prank(owner);
    watcherManager.addWatcher(watcher);
    assertTrue(watcherManager.isWatcher(watcher));
  }

  function test_WatcherManager__removeWatcher_failsIfNotOwner(address caller) public {
    if (caller == owner) {
      // fuzz test, return if owner
      return;
    }

    vm.prank(owner);
    watcherManager.addWatcher(address(1));

    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    vm.prank(caller);
    watcherManager.removeWatcher(address(1));
  }

  function test_WatcherManager__removeWatcher_failsIfNotAdded(address watcher) public {
    vm.expectRevert(bytes("!exist"));
    vm.prank(owner);
    watcherManager.removeWatcher(watcher);
  }

  function test_WatcherManager__removeWatcher_works(address watcher) public {
    vm.prank(owner);
    watcherManager.addWatcher(watcher);
    assertTrue(watcherManager.isWatcher(watcher));

    vm.prank(owner);
    watcherManager.removeWatcher(watcher);
    assertFalse(watcherManager.isWatcher(watcher));
  }
}
