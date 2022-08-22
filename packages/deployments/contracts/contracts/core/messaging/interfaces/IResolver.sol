// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IResolver {
  function checker() external view returns (bool canExec, bytes memory execPayload);
}
