// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IFuelMessagePortal {
  /// @notice Structure for proving an element in a merkle tree
  struct MerkleProof {
    uint256 key;
    bytes32[] proof;
  }

  /// @notice Structure containing all message details
  struct Message {
    bytes32 sender;
    bytes32 recipient;
    bytes32 nonce;
    uint64 amount;
    bytes data;
  }

  /// @title Fuel Chain Block Header
  /// @dev The Fuel chain block header structure
  struct FuelBlockHeader {
    ///////////////
    // Consensus //
    ///////////////
    // Merkle root of all previous consensus header hashes (not including this block)
    bytes32 prevRoot;
    // Height of this block
    uint32 height;
    // Time this block was created, in TAI64 format
    uint64 timestamp;
    /////////////////
    // Application //
    /////////////////
    //Height of the data availability layer up to which (inclusive) input messages are processed
    uint64 daHeight;
    // Number of transactions in this block
    uint64 txCount;
    // Number of output messages in this block
    uint64 outputMessagesCount;
    // Merkle root of transactions in this block
    bytes32 txRoot;
    // Merkle root of output messages in this block
    bytes32 outputMessagesRoot;
  }

  /// @title Lightweight Fuel Chain Block Header
  /// @dev The Fuel chain block header structure with just a hash of the application header
  struct FuelBlockHeaderLite {
    // Merkle root of all previous consensus header hashes (not including this block)
    bytes32 prevRoot;
    // Height of this block
    uint32 height;
    // Time this block was created, in TAI64 format
    uint64 timestamp;
    // Hash of serialized application header for this block
    bytes32 applicationHash;
  }

  function messageSender() external view returns (bytes32);

  function sendMessage(bytes32 recipient, bytes calldata data) external payable;

  /// @notice Relays a message published on Fuel from a given block
  /// @param message The message to relay
  /// @param rootBlockHeader The root block for proving chain history
  /// @param blockHeader The block containing the message
  /// @param blockInHistoryProof Proof that the message block exists in the history of the root block
  /// @param messageInBlockProof Proof that message exists in block
  /// @dev Made payable to reduce gas costs
  function relayMessage(
    Message calldata message,
    FuelBlockHeaderLite calldata rootBlockHeader,
    FuelBlockHeader calldata blockHeader,
    MerkleProof calldata blockInHistoryProof,
    MerkleProof calldata messageInBlockProof
  ) external payable;
}
