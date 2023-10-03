// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {IHubConnector} from "../../interfaces/IHubConnector.sol";

import {SpokeConnector} from "../SpokeConnector.sol";

contract MainnetSpokeConnector is SpokeConnector, IHubConnector {
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
}
