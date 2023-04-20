// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {SnapshotId} from "../../../contracts/messaging/libraries/SnapshotId.sol";

import "../../utils/ForgeHelper.sol";

contract SnapshotIdLibTest is ForgeHelper {
  uint256 public constant SNAPSHOT_DURATION = 30 minutes;
}

contract SnapshotId_GetLastCompletedSnapshotId is SnapshotIdLibTest {
  function test_getLastCompletedSnapshotId() public {
    uint256 _lastCompletedSnapshotId = SnapshotId.getLastCompletedSnapshotId();
    assertEq(_lastCompletedSnapshotId, block.timestamp / SNAPSHOT_DURATION);
  }
}
