// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {IHubConnector} from "../../interfaces/IHubConnector.sol";

import {SpokeConnector} from "../SpokeConnector.sol";

contract MainnetSpokeConnector is SpokeConnector, IHubConnector {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorGas,
    uint256 _processGas,
    uint256 _reserveGas
  )
    SpokeConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorGas, _processGas, _reserveGas)
  {}

  // ============ Public fns ============
  /**
   * @notice Sends a message over the amb
   * @dev This is called by the root manager *only* on mainnet to propagate the aggregate root
   * @dev Get 'Base constructor arguments given twice' when trying to inherit
   */
  // TODO: make more opinionated (i.e. sendAggregateRoot)
  function sendMessage(bytes memory _data) external onlyRootManager {
    _sendMessage(_data);
    emit MessageSent(_data, msg.sender);
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
  function _sendMessage(bytes memory _data) internal override {
    // get the data (should be either the outbound or aggregate root, depending on sender)
    require(_data.length == 32, "!length");
    if (msg.sender == ROOT_MANAGER) {
      // update the aggregate root
      updateAggregateRoot(bytes32(_data));
      return;
    }
    // otherwise is relayer, update the outbound root on the root manager
    IRootManager(ROOT_MANAGER).setOutboundRoot(DOMAIN, bytes32(_data));
  }

  /**
   * @dev The `RootManager` calls `.sendMessage` on all connectors, there is nothing on mainnet
   * that would be processing "inbound messages", so do nothing in this function
   */
  function _processMessage(bytes memory _data) internal override {}
}
