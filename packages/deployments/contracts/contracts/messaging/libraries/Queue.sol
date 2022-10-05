// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

/**
 * @title QueueLib
 * @notice Library containing queue struct and operations for queue used by RootManager and SpokeConnector
 * for handling the verification period. Tracks both message data itself and the block that the message was
 * committed to the queue.
 **/
library QueueLib {
  /**
   * @notice Queue struct
   * @dev Internally keeps track of the `first` and `last` elements through
   * indices and a mapping of indices to enqueued elements.
   **/
  struct Queue {
    uint128 first;
    uint128 last;
    // Message data (roots) that have been received.
    mapping(uint256 => bytes32) data;
    // The block that the message data was committed.
    mapping(uint256 => uint256) commitBlock;
  }

  /**
   * @notice Initializes the queue
   * @dev Empty state denoted by queue.first > queue.last. Queue initialized with
   * queue.first = 1 and queue.last = 0.
   **/
  function initialize(Queue storage queue) internal {
    queue.first = 1;
    queue.last = 0;
  }

  /**
   * @notice Enqueues a single new element and records block number that the item was enqueued
   * (i.e. current block).
   * @param item New element to be enqueued.
   * @return last Index of newly enqueued element.
   **/
  function enqueue(Queue storage queue, bytes32 item) internal returns (uint128 last) {
    // Commit block is the block we are committing this item to the queue.
    uint256 commitBlock = block.number;
    // Increment `last` position.
    last = ++queue.last;
    // Add the item and record block number.
    queue.data[last] = item;
    queue.commitBlock[last] = commitBlock;
  }

  /**
   * @notice Dequeues element at front of queue if it exists AND it's surpassed the given
   * verification period (i.e. has been sitting in the queue for enough blocks).
   * @param queue QueueStorage struct from contract.
   * @param delay The required delay that must have been surpassed in order to merit dequeuing
   * the element.
   * @return item Dequeued element IFF delay period has been surpassed; otherwise, empty bytes32.
   **/
  function dequeueVerified(Queue storage queue, uint256 delay) internal returns (bytes32[] memory) {
    uint128 first = queue.first;
    uint128 last = queue.last;
    require(last >= first, "queue empty");

    // To determine the last item index in the queue we want to return, iterate backwards until we
    // find a `commitBlock` that has surpassed the delay period.
    // NOTE: We iterate backwards as an optimization; as soon as we find an item whose verified,
    // we know that all items before it in the queue are already verified.
    // TODO: The most efficient way to determine the split index here should be using a binary search!
    bool containsVerified;
    for (last; last >= first; ) {
      uint256 commitBlock = queue.commitBlock[last];
      if (block.number - commitBlock >= delay) {
        containsVerified = true;
        break;
      }
      unchecked {
        --last;
      }
    }
    // IFF no verified items were found (i.e. first == last and first item is NOT yet verified), then
    // we can return an empty array.
    if (!containsVerified) {
      return new bytes32[](0);
    }

    bytes32[] memory items = new bytes32[](last + 1 - first);
    uint256 index; // Cursor for index in the batch of `items`.
    for (first; first <= last; ) {
      items[index] = queue.data[first];
      // Delete the item and the commitBlock.
      delete queue.data[first];
      delete queue.commitBlock[first];

      unchecked {
        ++index;
        ++first;
      }
    }
    // Update the value for `first` in our queue object since we've dequeued a number of elements.
    queue.first = first;
    return items;
  }

  /**
   * @notice Check whether the queue is empty.
   * @param queue QueueStorage struct from contract.
   * @return bool True if queue is empty and false if otherwise.
   */
  function isEmpty(Queue storage queue) internal view returns (bool) {
    return queue.last < queue.first;
  }

  /**
   * @notice Returns number of elements in queue.
   * @param queue QueueStorage struct from contract.
   */
  function length(Queue storage queue) internal view returns (uint256) {
    uint128 last = queue.last;
    uint128 first = queue.first;
    // Cannot underflow unless state is corrupted.
    return _length(last, first);
  }

  /**
   * @notice Returns number of elements between `last` and `first` (used internally).
   * @param last The last element index.
   * @param first The first element index.
   */
  function _length(uint128 last, uint128 first) internal pure returns (uint256) {
    return uint256(last + 1 - first);
  }
}
