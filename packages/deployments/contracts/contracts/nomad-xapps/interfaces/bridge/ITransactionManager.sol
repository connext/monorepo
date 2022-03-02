// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

interface ITransactionManager {
  function reconcile(
    bytes32 _id,
    address _local,
    address _recipient,
    uint256 _amount,
    bytes32 _externalCallHash
  ) external payable;
}