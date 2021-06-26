// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

struct VariableTransactionData {
  address user;
  uint256 amount;
  uint256 expiry;
  uint256 blockNumber;
  bytes32 digest;
}

interface ITransactionManager {
  // Structs
  // TODO: Add bid data if needed?
  // TODO: make this structure invariant *only* (consolidate with below)
  // Then, we can pass in amount/expiry explicitly and use only the record values
  // which will reduce duplication/confusion
  struct InvariantTransactionData {
    address user;
    address router;
    address sendingAssetId;
    address receivingAssetId;
    address receivingAddress;
    uint24 sendingChainId;
    uint24 receivingChainId;
    bytes callData;
    bytes32 transactionId;
  }

  struct SignedCancelData {
    bytes32 txDigest;
    string cancel;
  }

  struct SignedFulfillData {
    bytes32 txDigest;
    uint256 relayerFee;
  }

  // Liquidity events
  event LiquidityAdded(address router, address assetId, uint256 amount);

  event LiquidityRemoved(address router, address assetId, uint256 amount, address recipient);

  // Transaction events
  // TODO: structure
  event TransactionPrepared(
    InvariantTransactionData txData,
    uint256 amount,
    uint256 expiry,
    uint256 blockNumber,
    address caller
  );

  event TransactionFulfilled(
    InvariantTransactionData txData,
    uint256 amount,
    uint256 expiry,
    uint256 blockNumber,
    uint256 relayerFee,
    bytes signature,
    address caller
  );

  event TransactionCancelled(
    InvariantTransactionData txData,
    uint256 amount,
    uint256 expiry,
    uint256 blockNumber,
    address caller
  );

  // Getters
  function getActiveTransactionsByUser(address user) external view returns (VariableTransactionData[] memory);

  // Router only methods
  function addLiquidity(uint256 amount, address assetId) external payable;

  function removeLiquidity(
    uint256 amount,
    address assetId,
    address payable recipient
  ) external;

  // Transaction methods
  function prepare(
    InvariantTransactionData calldata txData,
    uint256 amount,
    uint256 expiry
  ) external payable returns (InvariantTransactionData memory);

  function fulfill(
    InvariantTransactionData calldata txData,
    uint256 relayerFee,
    bytes calldata signature
  ) external returns (InvariantTransactionData memory);

  function cancel(InvariantTransactionData calldata txData, bytes calldata signature)
    external
    returns (InvariantTransactionData memory);
}
