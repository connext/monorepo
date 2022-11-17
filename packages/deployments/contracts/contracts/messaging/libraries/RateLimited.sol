// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

/**
 * @notice An abstract contract intended to manage the rate limiting aspect of spoke
 * connector messaging. Rate limiting the number of messages we can send over a span of
 * blocks is used to mitigate key DoSing vectors for transporting messages between chains.
 */
abstract contract RateLimited {
  // ========== Custom Errors ===========

  error RateLimited__rateLimited_messageSendRateExceeded();

  // ============ Events ============

  event SendRateLimitUpdated(address updater, uint256 newRateLimit);

  // ============ Public Storage ============

  /**
   * @notice The number of blocks required between message sending events.
   * @dev NOTE: This value is 0 by default, meaning that rate limiting functionality
   * will naturally be disabled by default.
   */
  uint256 public rateLimitBlocks;

  /**
   * @notice Tracks the last block that we sent a message.
   */
  uint256 public lastSentBlock;

  // ============ Modifiers ============

  /**
   * @notice Checks to see if we can send this block, given the current rate limit
   * setting and the last block we sent a message. If rate limit has been surpassed,
   * we update the `lastSentBlock` to be the current block.
   */
  modifier rateLimited() {
    // Check to make sure we have surpassed the number of rate limit blocks.
    if (lastSentBlock + rateLimitBlocks > block.number) {
      revert RateLimited__rateLimited_messageSendRateExceeded();
    }
    // Update the last block we sent a message to be the current one.
    lastSentBlock = block.number;
    _;
  }

  // ============ Admin Functions ============

  /**
   * @notice Update the current rate limit to a new value.
   */
  function _setRateLimitBlocks(uint256 _newRateLimit) internal {
    require(_newRateLimit != rateLimitBlocks, "!new rate limit");
    // NOTE: Setting the block rate limit interval to 0 will result in rate limiting
    // being disabled.
    rateLimitBlocks = _newRateLimit;
    emit SendRateLimitUpdated(msg.sender, _newRateLimit);
  }
}
