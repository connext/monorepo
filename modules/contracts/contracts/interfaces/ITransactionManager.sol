// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

interface ITransactionManager {
  // Structs
  struct TransactionData {
    address user;
    address router;
    uint256 amount;
    address sendingAssetId;
    address receivingAssetId;
    uint24 sendingChainId;
    uint24 receivingChainId;
    address callTo;
    bytes callData;
    // TODO: consider using global nonce instead of transactionId
    bytes32 transactionId;
    uint256 expiry;
  }

  struct SignableTransactionData {
    address user;
    address router;
    address sendingAssetId;
    address receivingAssetId;
    uint24 sendingChainId;
    uint24 receivingChainId;
    address callTo;
    bytes callData;
    // TODO: consider using global nonce instead of transactionId
    bytes32 transactionId;
  }

  // Liquidity events
  event LiquidityAdded(
    address router,
    address assetId,
    uint256 amount
  );

  event LiquidityRemoved(
    address router,
    address assetId,
    uint256 amount,
    address recipient
  );

  // Transaction events
  // TODO: structure
  event TransactionPrepared(
    TransactionData txData,
    address caller
  );

  event TransactionFulfilled(
    TransactionData txData,
    bytes signature,
    address caller
  );

  event TransactionCancelled(
    TransactionData txData,
    address caller
  );

  // Router only methods
  function addLiquidity(uint256 amount, address assetId) external payable;

  function removeLiquidity(uint256 amount, address assetId, address payable recipient) external;

  // Transaction methods
  function prepare(TransactionData calldata txData) external payable returns (bytes32);

  function fulfill(TransactionData calldata txData, bytes calldata signature) external;

  function cancel(TransactionData calldata txData) external;
}