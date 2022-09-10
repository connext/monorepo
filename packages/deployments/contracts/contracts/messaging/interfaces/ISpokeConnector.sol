// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IConnector} from "./IConnector.sol";

interface ISpokeConnector is IConnector {
  // ============ Events ============
  event AggregateRootUpdated(bytes32 current, bytes32 previous);

  event Dispatch(bytes32 leaf, uint256 index, bytes32 root, bytes message);

  event Process(bytes32 leaf, bool success, bytes returnData);

  function send() external;

  function dispatch(
    uint32 _destinationDomain,
    bytes32 _recipientAddress,
    bytes memory _messageBody
  ) external;

  function proveAndProcess(
    bytes memory _message,
    bytes32[32] calldata _proof,
    uint256 _index
  ) external;

  function outboundRoot() external view returns (bytes32);
}
