// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

import {ProposedOwnable} from "../shared/ProposedOwnable.sol";
import {WatcherManager} from "./WatcherManager.sol";

/**
 * @notice This contract abstracts the functionality of the watcher manager.
 * Contracts can inherit this contract to be able to use the watcher manager's shared watcher set.
 */

contract WatcherClient is ProposedOwnable, Pausable {
  // ============ Events ============
  event WatcherManagerChanged(address watcherManager);

  // ============ Properties ============
  WatcherManager watcherManager;

  // ============ Constructor ============
  constructor(address _watcherManager) {
    watcherManager = WatcherManager(_watcherManager);
  }

  // ============ Modifiers ============
  modifier onlyWatcher() {
    require(watcherManager.isWatcher(msg.sender), "!watcher");
    _;
  }

  // ============ Admin fns ============
  /**
   * @dev Owner can enroll a watcher (abilities are defined by inheriting contracts)
   */
  function setWatcherManager(address _watcherManager) external onlyOwner {
    require(_watcherManager != address(watcherManager), "already watcher manager");
    emit WatcherManagerChanged(_watcherManager);
  }

  function unpause() external onlyOwner whenPaused {
    _unpause();
  }

  // ============ Watcher fns ============
  function pause() external onlyWatcher whenNotPaused {
    _pause();
  }
}
