// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {OptimismAmb} from "../../interfaces/ambs/OptimismAmb.sol";

abstract contract BaseOptimism {
  // ============ Constructor ============
  constructor() {}

  // ============ Override Fns ============
  function _verifySender(address _amb, address _expected) internal view returns (bool) {
    require(msg.sender == _amb, "!bridge");
    return OptimismAmb(_amb).xDomainMessageSender() == _expected;
  }
}
