// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {QueueLib} from "./Queue.sol";

/**
 * @notice An abstract contract inherited by contracts that require optimistic verification for incoming roots.
 */
abstract contract OptimisticallyVerified {
  // ============ Libraries ============

  using QueueLib for QueueLib.Queue;

  // ============ Properties ============

  /**
   * @notice The delay for the validation period for incoming messages in blocks.
   */
  uint256 public validationDelay;

  /**
   * @notice Queue used for management of verification for inbound roots from spoke chains. Once
   * verification period elapses, the inbound root can be aggregated into the merkle tree for
   * propagation to spoke chains.
   */
  QueueLib.Queue public queue;

  // ============ Constructor ============

  constructor(uint256 _validationDelay) {
    validationDelay = _validationDelay;
  }

  // TODO: Public fns for dispute logic?

  // ============ Helper Functions ============

  function dequeueVerified() internal returns (bytes32[] memory) {
    return queue.dequeueVerified(validationDelay);
  }

  function enqueueRoot(bytes32 root) internal returns (uint128) {
    return queue.enqueue(root);
  }
}
