// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {SpokeConnector} from "../HubConnector.sol";
import {ProposedOwnable} from "../../../shared/ProposedOwnable.sol";

/**
 * @title AdminSpokeConnector
 * @author Connext
 * @notice This contract is a spoke connector that allows the owner to create roots which will be added to the RootManager's merkle trees.
 * This is meant to be deployed only as an emergency measure where an AMB is no longer operational and a root needs to be sent in order to
 * allow users to withdraw funds. This contract should be deployed with the same domain as the AMB it is replacing.
 */
contract AdminSpokeConnector is ProposedOwnable, SpokeConnector {
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
    ProposedOwnable()
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
  {
    _setOwner(msg.sender);
  }

  // ============ Admin fns ============
  /**
   * Owner only function that allows to receive aggregateRoot from hub
   * @param _data The data to receive aggregate root
   */
  function receiveHubAggregateRoot(bytes32 _data) external onlyOwner {
    require(_data.length == 32, "!length");

    receiveAggregateRoot(bytes32(_data));

    emit MessageProcessed(_data, msg.sender);
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
   * @notice This function is a no-op as this connector does NOT send messages across
   * chains.
   * @dev Is a no-op over a revert so `RootManager.sendMessage` does not revert.
   */
  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {}
}
