// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

import {ProposedOwnable} from "../shared/ProposedOwnable.sol";
import {WatcherManager} from "./WatcherManager.sol";

/**
 * @notice This contract abstracts the functionality of the watcher manager.
 * Contracts can inherit this contract to be able to use the watcher manager's shared watcher set.
 */

contract WatcherClient is ProposedOwnable, Pausable {
  // ============ Events ============
  /**
   * @notice Emitted when the manager address changes
   * @param watcherManager The updated manager
   */
  event WatcherManagerChanged(address watcherManager);

  // ============ Properties ============
  /**
   * @notice The `WatcherManager` contract governs the watcher allowlist.
   * @dev Multiple clients can share a watcher set using the same manager
   */
  WatcherManager public watcherManager;

  // ============ Constructor ============
  constructor(address _watcherManager) ProposedOwnable() {
    watcherManager = WatcherManager(_watcherManager);
  }

  // ============ Modifiers ============
  /**
   * @notice Enforces the sender is the watcher
   */
  modifier onlyWatcher() {
    require(watcherManager.isWatcher(msg.sender), "!watcher");
    _;
  }

  // ============ Admin fns ============
  /**
   * @notice Owner can enroll a watcher (abilities are defined by inheriting contracts)
   */
  function setWatcherManager(address _watcherManager) external onlyOwner {
    require(_watcherManager != address(watcherManager), "already watcher manager");
    watcherManager = WatcherManager(_watcherManager);
    emit WatcherManagerChanged(_watcherManager);
  }

  /**
   * @notice Owner can unpause contracts if fraud is detected by watchers
   */
  function unpause() external onlyOwner whenPaused {
    _unpause();
  }

  /**
   * @notice Remove ability to renounce ownership
   * @dev Renounce ownership should be impossible as long as only the owner
   * is able to unpause the contracts. You can still propose `address(0)`,
   * but it will never be accepted.
   */
  function renounceOwnership() public virtual override onlyOwner {}

  // ============ Watcher fns ============

  /**
   * @notice Watchers can pause contracts if fraud is detected
   */
  function pause() external onlyWatcher whenNotPaused {
    _pause();
  }
}
