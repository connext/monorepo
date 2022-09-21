// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IConnector} from "./IConnector.sol";

interface ISpokeConnector is IConnector {
  // ============ Events ============
  event SenderAdded(address sender);

  event SenderRemoved(address sender);

  event AggregateRootUpdated(bytes32 current, bytes32 previous);

  event Dispatch(bytes32 leaf, uint256 index, bytes32 root, bytes message);

  event Process(bytes32 leaf, bool success, bytes returnData);

  // ============ Public fns ============
  function send() external;

  function dispatch(
    uint32 _destinationDomain,
    bytes32 _recipientAddress,
    bytes memory _messageBody
  ) external returns (bytes32);

  function proveAndProcess(
    Proof[] calldata _proofs,
    bytes32[32] calldata _aggregatorPath,
    uint256 _aggregatorIndex
  ) external;

  function outboundRoot() external view returns (bytes32);

  // ============ Structs ============
  /**
   * Struct for submitting a proof for a given message.
   * @param message Bytes of message to be processed. The hash of this message is considered the leaf.
   * @param proof Merkle proof of inclusion for given leaf.
   * @param index Index of leaf in home's merkle tree.
   */
  struct Proof {
    bytes message;
    bytes32[32] path;
    uint256 index;
  }
}
