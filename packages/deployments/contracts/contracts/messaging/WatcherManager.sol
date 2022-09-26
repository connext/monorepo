// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {ProposedOwnable} from "../shared/ProposedOwnable.sol";

/**
 * @notice This contract manages a set of watchers. This is meant to be used as a shared resource that contracts can
 * inherit to make use of the same watcher set.
 */

contract WatcherManager is ProposedOwnable {
  // ============ Events ============
  event WatcherAdded(address watcher);

  event WatcherRemoved(address watcher);

  // ============ Properties ============
  mapping(address => bool) private watchers;

  // ============ Constructor ============
  constructor() ProposedOwnable() {
    _setOwner(msg.sender);
  }

  // ============ Modifiers ============

  // ============ Admin fns ============
  /**
   * @dev Owner can enroll a watcher (abilities are defined by inheriting contracts)
   */
  function addWatcher(address _watcher) external onlyOwner {
    require(!watchers[_watcher], "already watcher");
    watchers[_watcher] = true;
    emit WatcherAdded(_watcher);
  }

  /**
   * @dev Owner can unenroll a watcher (abilities are defined by inheriting contracts)
   */
  function removeWatcher(address _watcher) external onlyOwner {
    require(watchers[_watcher], "!exist");
    watchers[_watcher] = false;
    emit WatcherRemoved(_watcher);
  }

  // ============ Getters ============
  function isWatcher(address _watcher) external view returns (bool) {
    return watchers[_watcher];
  }
}
