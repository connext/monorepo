// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {GnosisAmb} from "../../interfaces/ambs/GnosisAmb.sol";

import {Connector} from "../Connector.sol";

abstract contract GnosisBase {
  // ============ Constructor ============
  constructor() {}

  // ============ Private fns ============
  /**
   * @dev Asserts the sender of a cross domain message
   */
  function _verifySender(address _amb, address _expected) internal view returns (bool) {
    require(msg.sender == _amb, "!bridge");
    return GnosisAmb(_amb).messageSender() == _expected;
  }
}
