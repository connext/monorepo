// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

interface IResolver {
  function checker() external view returns (bool canExec, bytes memory execPayload);
}
