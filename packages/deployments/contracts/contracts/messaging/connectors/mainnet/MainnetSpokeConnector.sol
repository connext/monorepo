// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {IHubConnector} from "../../interfaces/IHubConnector.sol";
import {IHubSpokeConnector} from "../../interfaces/IHubSpokeConnector.sol";

import {SpokeConnector} from "../SpokeConnector.sol";

contract MainnetSpokeConnector is SpokeConnector, IHubConnector, IHubSpokeConnector {
  // ============ Errors ============
  error MainnetSpokeConnector_proposeAggregateRoot__DeprecatedInHubDomain();
  error MainnetSpokeConnector_finalize__DeprecatedInHubDomain();
  error MainnetSpokeConnector_saveAggregateRoot__OnlyOptimisticMode();
  error MainnetSpokeConnector_saveAggregateRoot__CallerIsNotRootManager();
  error MainnetSpokeConnector_saveAggregateRoot__RootAlreadyProven();
  error MainnetSpokeConnector_saveAggregateRoot__EmptyRoot();

  // ============ Constructor ============
  constructor(ConstructorParams memory _baseSpokeParams) SpokeConnector(_baseSpokeParams) {}

  // ============ Public fns ============
  /**
   * @notice Sends a message over the amb
   * @dev This is called by the root manager *only* on mainnet to propagate the aggregate root
   * @dev Get 'Base constructor arguments given twice' when trying to inherit
   */
  function sendMessage(bytes memory _data, bytes memory _encodedData) external payable onlyRootManager {
    // Should not include specialized calldata
    require(_encodedData.length == 0, "!data length");
    _sendMessage(_data, _encodedData);
    emit MessageSent(_data, _encodedData, msg.sender);
  }

  // ============ Private fns ============
  /**
   * @dev Asserts the sender of a cross domain message. On mainnet all senders should be this
   */
  function _verifySender(address _expected) internal view override returns (bool) {
    return msg.sender == _expected;
  }

  /**
   * @dev There are two times messages get "sent" from this connector:
   * 1. `RootManager` calls `sendMessage` during `propagate`
   * 2. Relayers call `send`, which calls `_sendMessage` to set the outbound root
   */
  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    // Should not include specialized calldata
    require(_encodedData.length == 0, "!data length");
    // get the data (should be either the outbound or aggregate root, depending on sender)
    require(_data.length == 32, "!length");
    if (msg.sender == ROOT_MANAGER) {
      // update the aggregate root
      receiveAggregateRoot(bytes32(_data));
      return;
    }
    // otherwise is relayer, update the outbound root on the root manager
    IRootManager(ROOT_MANAGER).aggregate(DOMAIN, bytes32(_data));
  }

  /**
   * @notice Saves a aggregateRoot after it has been deemed valid by the RootManager.
   * @param _aggregateRoot The aggregateRoot to store as proven.
   */
  function saveAggregateRoot(bytes32 _aggregateRoot) external {
    if (_aggregateRoot == 0) revert MainnetSpokeConnector_saveAggregateRoot__EmptyRoot();
    if (!optimisticMode) revert MainnetSpokeConnector_saveAggregateRoot__OnlyOptimisticMode();
    if (msg.sender != ROOT_MANAGER) revert MainnetSpokeConnector_saveAggregateRoot__CallerIsNotRootManager();
    if (provenAggregateRoots[_aggregateRoot]) revert MainnetSpokeConnector_saveAggregateRoot__RootAlreadyProven();
    provenAggregateRoots[_aggregateRoot] = true;
    emit ProposedRootFinalized(_aggregateRoot);
  }

  /**
   * @notice Propose a new aggregate root.
   * @dev Reverts in the hub domain as there's no need to propose nor finalize.
   * @param _aggregateRoot The aggregate root to propose.
   * @param _rootTimestamp Block.timestamp at which the root was finalized in the root manager contract.
   */
  function proposeAggregateRoot(bytes32 _aggregateRoot, uint256 _rootTimestamp) external override {
    revert MainnetSpokeConnector_proposeAggregateRoot__DeprecatedInHubDomain();
  }

  /**
   * @notice Finalizes the proposed aggregate root. This confirms the root validity. Therefore, it can be proved and processed.
   * @dev Reverts in the hub domain as there's no need to propose nor finalize.
   *
   * @param _proposedAggregateRoot The aggregate root currently proposed
   * @param _endOfDispute          The block in which the dispute period for proposedAggregateRootHash concludes
   */
  function finalize(bytes32 _proposedAggregateRoot, uint256 _rootTimestamp, uint256 _endOfDispute) external override {
    revert MainnetSpokeConnector_finalize__DeprecatedInHubDomain();
  }
}
