// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

interface ICallback {
  function callback(
    bytes32 transferId,
    bool success,
    bytes memory data
  ) external;
}
