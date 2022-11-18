// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "../utils/ForgeHelper.sol";
import "../../contracts/messaging/WatcherClient.sol";
import "../../contracts/messaging/WatcherManager.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

contract Client is WatcherClient {
  constructor(address _watcherManager) WatcherClient(_watcherManager) {
    _setOwner(msg.sender);
  }
}

contract WatcherClientTest is ForgeHelper {
  // ============ Storage ============
  WatcherClient watcherClient;
  address owner = address(1);
  address watcherManager = address(2);
  address watcher = address(42);

  // ============ Setup ============
  function setUp() public {
    vm.prank(owner);
    watcherClient = new Client(watcherManager);
  }

  function test_WatcherClient__setWatcherManager_failsIfNotOwner(address caller) public {
    vm.assume(owner != caller);

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
