// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

// ============ Internal Imports ============
import {QueueLib} from "../libs/Queue.sol";
// ============ External Imports ============
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @title QueueManager
 * @author Illusory Systems Inc.
 * @notice Contains a queue instance and
 * exposes view functions for the queue.
 **/
contract QueueManager is Initializable {
  // ============ Libraries ============

  using QueueLib for QueueLib.Queue;
  QueueLib.Queue internal queue;

  // ============ Upgrade Gap ============

  // gap for upgrade safety
  uint256[49] private __GAP;

  // ============ Initializer ============

  function __QueueManager_initialize() internal initializer {
    queue.initialize();
  }

  // ============ Public Functions ============

  /**
   * @notice Returns number of elements in queue
   */
  function queueLength() external view returns (uint256) {
    return queue.length();
  }

  /**
   * @notice Returns TRUE iff `_item` is in the queue
   */
  function queueContains(bytes32 _item) external view returns (bool) {
    return queue.contains(_item);
  }

  /**
   * @notice Returns last item enqueued to the queue
   */
  function queueEnd() external view returns (bytes32) {
    return queue.lastItem();
  }
}
