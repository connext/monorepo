// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

/**
 * @title OwnerPausable
 * @notice An ownable contract allows the owner to pause and unpause the
 * contract without a delay.
 * @dev Only methods using the provided modifiers will be paused.
 */
abstract contract OwnerPausableUpgradeable is OwnableUpgradeable, PausableUpgradeable {
  // ============ Initializer ============

  function __OwnerPausable_init() internal onlyInitializing {
    __Context_init_unchained();
    __Ownable_init_unchained();
    __Pausable_init_unchained();
  }

  // ============ External functions ============

  /**
   * @notice Pause the contract. Revert if already paused.
   */
  function pause() external onlyOwner {
    PausableUpgradeable._pause();
  }

  /**
   * @notice Unpause the contract. Revert if already unpaused.
   */
  function unpause() external onlyOwner {
    PausableUpgradeable._unpause();
  }

  // ============ Upgrade Gap ============
  uint256[50] private __GAP; // gap for upgrade safety
}
