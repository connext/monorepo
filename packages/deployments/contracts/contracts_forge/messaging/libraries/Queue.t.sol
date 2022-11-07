// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {QueueLib} from "../../../contracts/messaging/libraries/Queue.sol";

import "../../utils/ForgeHelper.sol";

contract QueueLibTest is ForgeHelper {
  // ============ Libraries ============

  using QueueLib for QueueLib.Queue;

  /**
   * @notice Queue used for management of verification for inbound roots from spoke chains. Once
   * the verification period elapses, the inbound messages can be aggregated into the merkle tree
   * for propagation to spoke chains.
   * @dev Watchers should be able to watch this queue for fraudulent messages and pause this contract
   * if fraud is detected.
   */
  QueueLib.Queue public queue;

  struct Entry {
    bytes32 message;
    uint256 commitBlock;
  }

  function setUp() public {
    queue.initialize();
    // Env: roll ahead to an arbitrary block so we don't start at block zero.
    // For dequeue, this will make the delay number we pass in acceptable.
    vm.roll(123456789);
  }

  // ============ Utils ============
  // Move to the target block that we'd like to enqueue an entry and do so.
  function utils_enqueueEntry(Entry memory entry) public {
    require(entry.commitBlock >= block.number, "commit block should never decrease");

    // Fast forward as needed.
    uint256 blockDelta = entry.commitBlock - block.number;
    if (blockDelta > 0) {
      vm.roll(block.number + blockDelta);
    }

    queue.enqueue(entry.message);
  }

  function utils_generateEntries(uint256 count, uint256 blockDelta) public returns (Entry[] memory) {
    Entry[] memory entries = new Entry[](count);
    for (uint256 i; i < count; i++) {
      bytes32 message = keccak256(abi.encode(bytes("test"), i));
      uint256 delta = i * blockDelta;
      entries[i] = Entry({message: message, commitBlock: block.number + delta});
    }
    return entries;
  }

  // ============ QueueLib.enqueue ============
  function test_enqueueWorks() public {
    // 20 entries spaced 7 blocks apart.
    uint256 testEntryCount = 20;
    Entry[] memory entries = utils_generateEntries(testEntryCount, 7);

    for (uint256 i; i < testEntryCount; i++) {
      Entry memory entry = entries[i];
      utils_enqueueEntry(entry);
      uint256 expectedLast = i + 1; // Should be the insertion index.
      // Check to make sure enqueue happened correctly.
      assertEq(queue.data[expectedLast], entry.message);
      assertEq(queue.commitBlock[expectedLast], block.number);
      assertEq(queue.length(), expectedLast);
      assertEq(queue.last, expectedLast);
      // First position should not change.
      assertEq(queue.first, 1);

      // Nested loop: check to make sure previous entries are untouched.
      for (uint256 j; j < i; j++) {
        assertEq(queue.data[j + 1], entries[j].message);
        assertEq(queue.commitBlock[j + 1], entries[j].commitBlock);
      }
    }
  }

  // ============ QueueLib.dequeueVerified ============
  function test_dequeueVerifiedWorks() public {
    // 10 entries spaced 5 blocks apart.
    uint256 testEntryCount = 10;
    Entry[] memory entries = utils_generateEntries(10, 5);
    for (uint256 i; i < testEntryCount; i++) {
      Entry memory entry = entries[i];
      utils_enqueueEntry(entry);
    }

    // If the delayBlocks is 25, we should get half of the entries back as
    // having been verified.
    bytes32[] memory verified = queue.dequeueVerified(25);
    assertEq(verified.length, 5);

    for (uint256 i; i < verified.length; i++) {
      assertEq(verified[i], entries[i].message);
    }
  }

  function test_dequeueVerifiedReturnsEmptyArrayIfNoneVerified() public {
    // 10 entries spaced 5 blocks apart.
    uint256 testEntryCount = 10;
    Entry[] memory entries = utils_generateEntries(10, 5);
    for (uint256 i; i < testEntryCount; i++) {
      Entry memory entry = entries[i];
      utils_enqueueEntry(entry);
    }
    bytes32[] memory verified = queue.dequeueVerified(1234567);
    assertEq(verified.length, 0);
  }

  function test_dequeueVerifiedFailsIfQueueIsEmpty() public {
    vm.expectRevert("queue empty");
    queue.dequeueVerified(123);
  }
}
