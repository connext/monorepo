// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {Home} from "../../nomad-core/contracts/Home.sol";

import {LibConnextStorage} from "../libraries/LibConnextStorage.sol";

abstract contract Modifiers {
    // ========== Custom Errors ===========

  error Modifiers__onlyRemoteRouter_notRemoteRouter();
  error Modifiers__onlyReplica_notReplica();
  error Modifiers__onlyOwner_notOwner();
  error Modifiers__onlyProposed_notProposedOwner();

  // ============ Modifiers ============

  /**
   * @notice Only accept messages from a remote Router contract
   * @param _origin The domain the message is coming from
   * @param _router The address the message is coming from
   */
  modifier onlyRemoteRouter(uint32 _origin, bytes32 _router) {
    if(!_isRemoteRouter(_origin, _router)) revert Modifiers__onlyRemoteRouter_notRemoteRouter();
    _;
  }

  /**
   * @notice Only accept messages from an Nomad Replica contract
   */
  modifier onlyReplica() {
    if(!_isReplica(msg.sender)) revert Modifiers__onlyReplica_notReplica();
    _;
  }

  /**
   * @notice Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    LibConnextStorage.Storage storage ds = LibConnextStorage.connextStorage();
    if (ds._owner != msg.sender) revert Modifiers__onlyOwner_notOwner();
    _;
  }

  /**
   * @notice Throws if called by any account other than the proposed owner.
   */
  modifier onlyProposed() {
    LibConnextStorage.Storage storage ds = LibConnextStorage.connextStorage();
    if (ds._proposed != msg.sender) revert Modifiers__onlyProposed_notProposedOwner();
    _;
  }

  // ============ Public functions ============

  /**
   * @notice Indicates if the ownership of the router whitelist has
   * been renounced
   */
  function isRouterOwnershipRenounced() public view returns (bool) {
    LibConnextStorage.Storage storage ds = LibConnextStorage.connextStorage();
    return ds._owner == address(0) || ds._routerOwnershipRenounced;
  }

  // ============ Internal functions ============
  /**
   * @notice Return true if the given domain / router is the address of a remote xApp Router
   * @param _domain The domain of the potential remote xApp Router
   * @param _router The address of the potential remote xApp Router
   */
  function _isRemoteRouter(uint32 _domain, bytes32 _router) internal view returns (bool) {
    LibConnextStorage.Storage storage ds = LibConnextStorage.connextStorage();
    return ds.remotes[_domain] == _router;
  }

  /**
   * @notice Assert that the given domain has a xApp Router registered and return its address
   * @param _domain The domain of the chain for which to get the xApp Router
   * @return _remote The address of the remote xApp Router on _domain
   */
  function _mustHaveRemote(uint32 _domain) internal view returns (bytes32 _remote) {
    LibConnextStorage.Storage storage ds = LibConnextStorage.connextStorage();
    _remote = ds.remotes[_domain];
    require(_remote != bytes32(0), "!remote");
  }

  /**
   * @notice Get the local Home contract from the xAppConnectionManager
   * @return The local Home contract
   */
  function _home() internal view returns (Home) {
    LibConnextStorage.Storage storage ds = LibConnextStorage.connextStorage();
    return ds.xAppConnectionManager.home();
  }

  /**
   * @notice Determine whether _potentialReplcia is an enrolled Replica from the xAppConnectionManager
   * @return True if _potentialReplica is an enrolled Replica
   */
  function _isReplica(address _potentialReplica) internal view returns (bool) {
    LibConnextStorage.Storage storage ds = LibConnextStorage.connextStorage();
    return ds.xAppConnectionManager.isReplica(_potentialReplica);
  }

  /**
   * @notice Get the local domain from the xAppConnectionManager
   * @return The local domain
   */
  function _localDomain() internal view virtual returns (uint32) {
    LibConnextStorage.Storage storage ds = LibConnextStorage.connextStorage();
    return ds.xAppConnectionManager.localDomain();
  }
}
