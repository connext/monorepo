// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

interface IConnext {
  function reconcile(
    bytes32 _batchRoot
  ) external payable;
}