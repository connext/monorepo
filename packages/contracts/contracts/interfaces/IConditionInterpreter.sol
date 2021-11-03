// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "./ITransactionManager.sol";

interface IConditionInterpreter {
  function shouldFulfill(
    TransactionData calldata txData,
    bytes calldata unlockData,
    uint256 relayerFee,
    uint256 transactionManagerChainId
  ) external returns (bool);

  function shouldCancel(
    TransactionData calldata txData,
    bytes calldata unlockData,
    uint256 transactionManagerChainId
  ) external returns (bool);
}