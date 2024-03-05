// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

// modified from: https://github.com/ethereum-optimism/optimism/blob/fcfcf6e7e69801e63904ec53815db01a8d45dcac/packages/contracts/contracts/libraries/codec/Lib_OVMCodec.sol#L34-L40
struct ChainBatchHeader {
  uint256 batchIndex;
  bytes32 batchRoot;
  uint256 batchSize;
  uint256 prevTotalElements;
  bytes extraData;
}

// modified from: https://github.com/ethereum-optimism/optimism/blob/fcfcf6e7e69801e63904ec53815db01a8d45dcac/packages/contracts/contracts/libraries/codec/Lib_OVMCodec.sol#L42-L45
struct ChainInclusionProof {
  uint256 index;
  bytes32[] siblings;
}

// modified from: https://github.com/ethereum-optimism/optimism/blob/fcfcf6e7e69801e63904ec53815db01a8d45dcac/packages/contracts/contracts/L1/messaging/IL1CrossDomainMessenger.sol#L18-L24
struct L2MessageInclusionProof {
  bytes32 stateRoot;
  ChainBatchHeader stateRootBatchHeader;
  ChainInclusionProof stateRootProof;
  bytes stateTrieWitness;
  bytes storageTrieWitness;
}

/**
 * @title IStateCommitmentChain
 *
 * @dev modified from: https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/rollup/IStateCommitmentChain.sol
 */
interface IStateCommitmentChain {
  /**********
   * Events *
   **********/

  event StateBatchAppended(
    uint256 indexed _batchIndex,
    bytes32 _batchRoot,
    uint256 _batchSize,
    uint256 _prevTotalElements,
    bytes _extraData
  );

  event StateBatchDeleted(uint256 indexed _batchIndex, bytes32 _batchRoot);

  /********************
   * Public Functions *
   ********************/

  /**
   * Retrieves the total number of elements submitted.
   * @return _totalElements Total submitted elements.
   */
  function getTotalElements() external view returns (uint256 _totalElements);

  /**
   * Retrieves the total number of batches submitted.
   * @return _totalBatches Total submitted batches.
   */
  function getTotalBatches() external view returns (uint256 _totalBatches);

  /**
   * Retrieves the timestamp of the last batch submitted by the sequencer.
   * @return _lastSequencerTimestamp Last sequencer batch timestamp.
   */
  function getLastSequencerTimestamp() external view returns (uint256 _lastSequencerTimestamp);

  /**
   * Appends a batch of state roots to the chain.
   * @param _batch Batch of state roots.
   * @param _shouldStartAtElement Index of the element at which this batch should start.
   */
  function appendStateBatch(bytes32[] calldata _batch, uint256 _shouldStartAtElement) external;

  /**
   * Deletes all state roots after (and including) a given batch.
   * @param _batchHeader Header of the batch to start deleting from.
   */
  function deleteStateBatch(ChainBatchHeader memory _batchHeader) external;

  /**
   * Verifies a batch inclusion proof.
   * @param _element Hash of the element to verify a proof for.
   * @param _batchHeader Header of the batch in which the element was included.
   * @param _proof Merkle inclusion proof for the element.
   */
  function verifyStateCommitment(
    bytes32 _element,
    ChainBatchHeader memory _batchHeader,
    ChainInclusionProof memory _proof
  ) external view returns (bool _verified);

  /**
   * Checks whether a given batch is still inside its fraud proof window.
   * @param _batchHeader Header of the batch to check.
   * @return _inside Whether or not the batch is inside the fraud proof window.
   */
  function insideFraudProofWindow(ChainBatchHeader memory _batchHeader) external view returns (bool _inside);
}
