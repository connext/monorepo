// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

interface ITransactionManager {
  // Structs
  struct InvariantTransactionData {
    address user;
    address router;
    address sendingAssetId;
    address receivingAssetId;
    address receivingAddress;
    uint256 sendingChainId;
    uint256 receivingChainId;
    bytes callData;
    bytes32 transactionId;
  }

  struct VariantTransactionData {
    uint256 amount;
    uint256 expiry;
    uint256 preparedBlockNumber;
  }

  // All Transaction data, constant and variable
  struct TransactionData {
    address user;
    address router;
    address sendingAssetId;
    address receivingAssetId;
    address receivingAddress;
    bytes callData;
    bytes32 transactionId;
    uint256 sendingChainId;
    uint256 receivingChainId;
    uint256 amount;
    uint256 expiry;
    uint256 preparedBlockNumber; // Needed for removal on fulfill/cancel
  }

  struct SignedCancelData {
    bytes32 invariantDigest;
    string cancel;
  }

  struct SignedFulfillData {
    bytes32 invariantDigest;
    uint256 relayerFee;
  }

  // Liquidity events
  event LiquidityAdded(address router, address assetId, uint256 amount);

  event LiquidityRemoved(address router, address assetId, uint256 amount, address recipient);

  // Transaction events
  // TODO: structure
  event TransactionPrepared(TransactionData txData, address caller, bytes encodedBid, bytes bidSignature);

  event TransactionFulfilled(TransactionData txData, uint256 relayerFee, bytes signature, address caller);

  event TransactionCancelled(TransactionData txData, address caller);

  // Getters

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
    uint256 expiry,
    bytes calldata encodedBid,
    bytes calldata bidSignature
  ) external payable returns (TransactionData memory);

  function fulfill(
    TransactionData calldata txData,
    uint256 relayerFee,
    bytes calldata signature
  ) external returns (TransactionData memory);

  function cancel(TransactionData calldata txData, bytes calldata signature) external returns (TransactionData memory);
}
