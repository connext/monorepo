// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ConsensysAmb} from "../../interfaces/ambs/ConsensysAmb.sol";

abstract contract ConsensysBase {
  // ============ Private fns ============

  /**
   * @dev Asserts the sender of a cross domain message
   */
  function _verifySender(address _amb, address _expected) internal view returns (bool) {
    require(msg.sender == _amb, "!bridge");
    return ConsensysAmb(_amb).sender() == _expected;
  }
}
