// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

// ============ External Imports ============
import {IOutbox} from "../messaging/interfaces/IOutbox.sol";
import {IConnectorManager} from "../messaging/interfaces/IConnectorManager.sol";

import {ProposedOwnableUpgradeable} from "../shared/ProposedOwnable.sol";

abstract contract XAppConnectionClient is ProposedOwnableUpgradeable {
  // ============ Mutable Storage ============

  IConnectorManager public xAppConnectionManager;

  // ============ Upgrade Gap ============

  uint256[49] private __GAP; // gap for upgrade safety

  // ============ Modifiers ============

  /**
   * @notice Only accept messages from an Nomad Replica contract
   */
  modifier onlyReplica() {
    require(_isReplica(msg.sender), "!replica");
    _;
  }

  // ======== Initializer =========

  function __XAppConnectionClient_initialize(address _xAppConnectionManager) internal initializer {
    xAppConnectionManager = IConnectorManager(_xAppConnectionManager);
    __ProposedOwnable_init();
  }

  // ============ External functions ============

  /**
   * @notice Modify the contract the xApp uses to validate Replica contracts
   * @param _xAppConnectionManager The address of the xAppConnectionManager contract
   */
  function setXAppConnectionManager(address _xAppConnectionManager) external onlyOwner {
    xAppConnectionManager = IConnectorManager(_xAppConnectionManager);
  }

  // ============ Internal functions ============

  /**
   * @notice Get the local Home contract from the xAppConnectionManager
   * @return The local Home contract
   */
  function _home() internal view returns (IOutbox) {
    return xAppConnectionManager.home();
  }

  /**
   * @notice Determine whether _potentialReplica is an enrolled Replica from the xAppConnectionManager
   * @return True if _potentialReplica is an enrolled Replica
   */
  function _isReplica(address _potentialReplica) internal view returns (bool) {
    return xAppConnectionManager.isReplica(_potentialReplica);
  }

  /**
   * @notice Get the local domain from the xAppConnectionManager
   * @return The local domain
   */
  function _localDomain() internal view virtual returns (uint32) {
    return xAppConnectionManager.localDomain();
  }
}
