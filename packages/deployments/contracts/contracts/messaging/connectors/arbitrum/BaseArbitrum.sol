// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

abstract contract BaseArbitrum {
  /**
   * @notice Aliased address of mirror connector
   */
  address public immutable aliasedSender;

  /**
   * @notice Errors if the msg.sender is not the aliased sender
   */
  modifier onlyAliased() {
    require(msg.sender == aliasedSender, "!aliasedSender");
    _;
  }

  // ============ Constructor ============
  constructor(address _mirrorConnector) {
    // https://developer.arbitrum.io/arbos/l1-to-l2-messaging#address-aliasing
    aliasedSender = _mirrorConnector + 0x1111000000000000000000000000000000001111;
  }
}
