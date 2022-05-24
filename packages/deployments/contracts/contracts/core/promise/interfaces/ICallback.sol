// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

interface ICallback {
  function callback(
    bytes32 transferId,
    bool success,
    bytes memory data
  ) external;
}
