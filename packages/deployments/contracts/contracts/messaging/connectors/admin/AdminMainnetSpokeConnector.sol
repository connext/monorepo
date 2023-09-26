// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {IHubConnector} from "../../interfaces/IHubConnector.sol";

import {SpokeConnector} from "../SpokeConnector.sol";

/**
 * @title AdminSpokeConnector
 * @author Connext
 * @notice This contract is a spoke connector that allows the owner to create roots which will be added to the RootManager's merkle trees.
 * This is meant to be deployed only as an emergency measure where an AMB is no longer operational and a root needs to be sent in order to
 * allow users to withdraw funds. This contract should be deployed with the same domain as the AMB it is replacing.
 */
contract AdminMainnetSpokeConnector is SpokeConnector, IHubConnector {
  // ============ Constructor ============
  // some params are unused so they will not be specified
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _processGas,
    uint256 _reserveGas,
    uint256 _delayBlocks,
    address _merkle,
    address _watcherManager
  )
    SpokeConnector(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager
    )
  {}

  // ============ Admin fns ============

  /**
   * @notice Sends a message over the amb
   * @dev This is called by the root manager *only* on mainnet to propagate the aggregate root
   * @dev Get 'Base constructor arguments given twice' when trying to inherit
   */
  function sendMessage(bytes memory _data, bytes memory _encodedData) external payable onlyRootManager {
    // Should not include specialized calldata
    require(_encodedData.length == 0, "!data length");
    _sendMessage(_data, bytes(""));
    emit MessageSent(_data, bytes(""), msg.sender);
  }

  // ============ Private fns ============

  /**
   * @notice Should not be used as this contract has no crosschain counterpart.
   * @dev Reverts if `Connector.verifySender` is called
   */
  function _verifySender(address) internal pure override returns (bool) {
    require(false, "!supported");
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
   * @dev The `RootManager` calls `.sendMessage` on all connectors, there is nothing on mainnet
   * that would be processing "inbound messages", so do nothing in this function
   */
  function _processMessage(bytes memory _data) internal override {}
}
