// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {LineaAmb} from "../../interfaces/ambs/LineaAmb.sol";

abstract contract LineaBase {
  // ============ Private fns ============

  /**
   * @dev Asserts the sender of a cross domain message
   */
  function _verifySender(address _amb, address _expected) internal view returns (bool) {
    require(msg.sender == _amb, "!bridge");
    return LineaAmb(_amb).sender() == _expected;
  }
}
