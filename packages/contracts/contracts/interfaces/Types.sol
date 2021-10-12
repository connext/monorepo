// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

// Holds all data that is constant between sending and
// receiving chains. The hash of this is what gets signed
// to ensure the signature can be used on both chains.
struct InvariantTransactionData {
  address receivingChainCondition;
  address sendingChainCondition;
  address receivingChainTxManagerAddress;
  address user;
  address router;
  address initiator; // msg.sender of sending side
  address sendingAssetId;
  address receivingAssetId;
  address sendingChainFallback; // funds sent here on cancel
  address receivingAddress;
  address callTo;
  uint256 sendingChainId;
  uint256 receivingChainId;
  bytes32 callDataHash; // hashed to prevent free option
  bytes32 transactionId;
}

// Holds all data that varies between sending and receiving
// chains. The hash of this is stored onchain to ensure the
// information passed in is valid.
struct VariantTransactionData {
  uint256 amount;
  uint256 expiry;
  uint256 preparedBlockNumber;
}

// All Transaction data, constant and variable
struct TransactionData {
  address receivingChainCondition;
  address sendingChainCondition;
  address receivingChainTxManagerAddress;
  address user;
  address router;
  address initiator; // msg.sender of sending side
  address sendingAssetId;
  address receivingAssetId;
  address sendingChainFallback;
  address receivingAddress;
  address callTo;
  bytes32 callDataHash;
  bytes32 transactionId;
  uint256 sendingChainId;
  uint256 receivingChainId;
  uint256 amount;
  uint256 expiry;
  uint256 preparedBlockNumber; // Needed for removal of active blocks on fulfill/cancel
}
