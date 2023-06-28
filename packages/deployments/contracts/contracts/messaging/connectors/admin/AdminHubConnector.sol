// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {HubConnector} from "../HubConnector.sol";
import {ProposedOwnable} from "../../../shared/ProposedOwnable.sol";

/**
 * @title AdminHubConnector
 * @author Connext
 * @notice This contract is a hub connector that allows the owner to create roots which will be added to the RootManager's merkle trees.
 * This is meant to be deployed only as an emergency measure where an AMB is no longer operational and a root needs to be sent in order to
 * allow users to withdraw funds. This contract should be deployed with the same domain as the AMB it is replacing.
 */
contract AdminHubConnector is ProposedOwnable, HubConnector {
  // ============ Constructor ============
  // some params are unused so they will not be specified
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _rootManager
  ) ProposedOwnable() HubConnector(_domain, _mirrorDomain, address(0), _rootManager, address(0)) {
    _setOwner(msg.sender);
  }

  // ============ Admin fns ============
  /**
   * Owner only function that allows merkle roots to be added to the RootManager's merkle tree.
   * @param _data The data to be added to the merkle tree
   */
  function addSpokeRootToAggregate(bytes32 _data) external onlyOwner {
    // Sanity check: ensure the _data is nonzero
    require(_data != bytes32(0), "empty");

    // Aggregate on the root manager
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, _data);

    // Emit event
    emit MessageProcessed(abi.encode(_data), msg.sender);
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
