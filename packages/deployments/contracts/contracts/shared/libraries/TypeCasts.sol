// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {TypedMemView} from "./TypedMemView.sol";

library TypeCasts {
  using TypedMemView for bytes;
  using TypedMemView for bytes29;

  // alignment preserving cast
  function addressToBytes32(address _addr) internal pure returns (bytes32) {
    return bytes32(uint256(uint160(_addr)));
  }

  // alignment preserving cast
  function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
    return address(uint160(uint256(_buf)));
  }
}
