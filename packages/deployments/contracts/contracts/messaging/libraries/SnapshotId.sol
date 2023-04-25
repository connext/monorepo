// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

/**
 * @title SnapshotId library
 * @notice A library to be used in spoke connector and root manager to calculates the current snapshot id
 */
library SnapshotId {
  /**
   * @notice Duration of the snapshot
   * @dev Off-chain agents could change the effective snapshot length by skipping snapshots. This is the
   * smallest unit of snapshot duration, not just the only option.
   */
  uint256 constant SNAPSHOT_DURATION = 30 minutes;

  /**
   * @notice This function calculates the last completed snapshot id
   * @return _lastCompletedSnapshotId The last completed snapshot id
   */
  function getLastCompletedSnapshotId() internal view returns (uint256 _lastCompletedSnapshotId) {
    unchecked {
      _lastCompletedSnapshotId = block.timestamp / SNAPSHOT_DURATION;
    }
  }
}
