// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {BaseConnextFacet} from "./BaseConnextFacet.sol";
import {LibDiamond} from "../libraries/LibDiamond.sol";
import {Role} from "../libraries/LibConnextStorage.sol";
import {IProposedOwnable} from "../../../shared/interfaces/IProposedOwnable.sol";

/**
 * @title ProposedOwnableFacet
 * @notice Contract module which provides a basic access control mechanism,
 * where there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed via a two step process:
 * 1. Call `proposeOwner`
 * 2. Wait out the delay period
 * 3. Call `acceptOwner`
 *
 * @dev This module is used through inheritance. It will make available the
 * modifier `onlyOwner`, which can be applied to your functions to restrict
 * their use to the owner.
 *
 * @dev The majority of this code was taken from the openzeppelin Ownable
 * contract
 *
 */
contract ProposedOwnableFacet is BaseConnextFacet, IProposedOwnable {
  // ========== Custom Errors ===========
  error ProposedOwnableFacet__proposeRouterWhitelistRemoval_noOwnershipChange();
  error ProposedOwnableFacet__removeRouterWhitelist_noOwnershipChange();
  error ProposedOwnableFacet__removeRouterWhitelist_noProposal();
  error ProposedOwnableFacet__removeRouterWhitelist_delayNotElapsed();
  error ProposedOwnableFacet__proposeAssetWhitelistRemoval_noOwnershipChange();
  error ProposedOwnableFacet__removeAssetWhitelist_noOwnershipChange();
  error ProposedOwnableFacet__removeAssetWhitelist_noProposal();
  error ProposedOwnableFacet__removeAssetWhitelist_delayNotElapsed();
  error ProposedOwnableFacet__proposeNewOwner_invalidProposal();
  error ProposedOwnableFacet__proposeNewOwner_noOwnershipChange();
  error ProposedOwnableFacet__acceptProposedOwner_noOwnershipChange();
  error ProposedOwnableFacet__acceptProposedOwner_delayNotElapsed();
  error ProposedOwnableFacet__revokeRole_invalidInput();
  error ProposedOwnableFacet__assignRoleRouter_invalidInput();
  error ProposedOwnableFacet__assignRoleWatcher_invalidInput();
  error ProposedOwnableFacet__assignRoleAdmin_invalidInput();

  // ============ Events ============

  event RouterWhitelistRemovalProposed(uint256 timestamp);

  event RouterWhitelistRemoved(bool renounced);

  event AssetWhitelistRemovalProposed(uint256 timestamp);

  event AssetWhitelistRemoved(bool renounced);

  event RevokeRole(address revokedAddress, Role revokedRole);

  event AssignRoleRouter(address router);

  event AssignRoleWatcher(address watcher);

  event AssignRoleAdmin(address admin);

  event Paused();

  event Unpaused();

  // ============ External: Getters ============

  /**
   * @notice Returns the address of the current owner.
   */
  function owner() public view returns (address) {
    return LibDiamond.contractOwner();
  }

  /**
   * @notice Returns if the router whitelist is removed.
   */
  function routerWhitelistRemoved() public view returns (bool) {
    return s._routerWhitelistRemoved;
  }

  /**
   * @notice Returns if the asset whitelist is removed.
   */
  function assetWhitelistRemoved() public view returns (bool) {
    return s._assetWhitelistRemoved;
  }

  /**
   * @notice Returns the address of the proposed owner.
   */
  function proposed() public view returns (address) {
    return s._proposed;
  }

  /**
   * @notice Returns the address of the proposed owner.
   */
  function proposedTimestamp() public view returns (uint256) {
    return s._proposedOwnershipTimestamp;
  }

  /**
   * @notice Returns the timestamp when router whitelist was last proposed to be removed
   */
  function routerWhitelistTimestamp() public view returns (uint256) {
    return s._routerWhitelistTimestamp;
  }

  /**
   * @notice Returns the timestamp when asset whitelist was last proposed to be removed
   */
  function assetWhitelistTimestamp() public view returns (uint256) {
    return s._assetWhitelistTimestamp;
  }

  /**
   * @notice Returns the delay period before a new owner can be accepted.
   */
  function delay() public view returns (uint256) {
    return LibDiamond.acceptanceDelay();
  }

  /**
   * @notice Returns the Role of the address
   * @dev returns uint value of representing enum value of Role
   * @param _role The address for which Role need to be queried
   */
  function queryRole(address _role) public view returns (Role) {
    return s.roles[_role];
  }

  // ============ External ============

  /**
   * @notice Indicates if the ownership of the router whitelist has
   * been renounced
   */
  function proposeRouterWhitelistRemoval() public onlyOwnerOrAdmin {
    // Use contract as source of truth
    // Will fail if all ownership is renounced by modifier
    if (s._routerWhitelistRemoved) revert ProposedOwnableFacet__proposeRouterWhitelistRemoval_noOwnershipChange();

    // Begin delay, emit event
    _setRouterWhitelistTimestamp();
  }

  /**
   * @notice Indicates if the ownership of the asset whitelist has
   * been renounced
   */
  function removeRouterWhitelist() public onlyOwnerOrAdmin {
    // Contract as sounce of truth
    // Will fail if all ownership is renounced by modifier
    if (s._routerWhitelistRemoved) revert ProposedOwnableFacet__removeRouterWhitelist_noOwnershipChange();

    // Ensure there has been a proposal cycle started
    if (s._routerWhitelistTimestamp == 0) revert ProposedOwnableFacet__removeRouterWhitelist_noProposal();

    // Delay has elapsed
    if ((block.timestamp - s._routerWhitelistTimestamp) <= delay())
      revert ProposedOwnableFacet__removeRouterWhitelist_delayNotElapsed();

    // Set renounced, emit event, reset timestamp to 0
    _setRouterWhitelistRemoved(true);
  }

  /**
   * @notice Indicates if the ownership of the asset whitelist has
   * been renounced
   */
  function proposeAssetWhitelistRemoval() public onlyOwnerOrAdmin {
    // Contract as source of truth
    // Will fail if all ownership is renounced by modifier
    if (s._assetWhitelistRemoved) revert ProposedOwnableFacet__proposeAssetWhitelistRemoval_noOwnershipChange();

    // Start cycle, emit event
    _setAssetWhitelistTimestamp();
  }

  /**
   * @notice Indicates if the ownership of the asset whitelist has
   * been renounced
   */
  function removeAssetWhitelist() public onlyOwnerOrAdmin {
    // Contract as source of truth
    // Will fail if all ownership is renounced by modifier
    if (s._assetWhitelistRemoved) revert ProposedOwnableFacet__removeAssetWhitelist_noOwnershipChange();

    // Ensure there has been a proposal cycle started
    if (s._assetWhitelistTimestamp == 0) revert ProposedOwnableFacet__removeAssetWhitelist_noProposal();

    // Ensure delay has elapsed
    if ((block.timestamp - s._assetWhitelistTimestamp) <= delay())
      revert ProposedOwnableFacet__removeAssetWhitelist_delayNotElapsed();

    // Set ownership, reset timestamp, emit event
    _setAssetWhitelistRemoved(true);
  }

  /**
   * @notice Sets the timestamp for an owner to be proposed, and sets the
   * newly proposed owner as step 1 in a 2-step process
   */
  function proposeNewOwner(address newlyProposed) public onlyOwner {
    // Contract as source of truth
    if (s._proposed == newlyProposed || newlyProposed == address(0))
      revert ProposedOwnableFacet__proposeNewOwner_invalidProposal();

    // Sanity check: reasonable proposal
    if (owner() == newlyProposed) revert ProposedOwnableFacet__proposeNewOwner_noOwnershipChange();

    _setProposed(newlyProposed);
  }

  /**
   * @notice Transfers ownership of the contract to a new account (`newOwner`).
   * Can only be called by the proposed owner.
   */
  function acceptProposedOwner() public onlyProposed {
    // Contract as source of truth
    if (owner() == s._proposed) revert ProposedOwnableFacet__acceptProposedOwner_noOwnershipChange();

    // NOTE: no need to check if _proposedOwnershipTimestamp > 0 because
    // the only time this would happen is if the _proposed was never
    // set (will fail from modifier) or if the owner == _proposed (checked
    // above)

    // Ensure delay has elapsed
    if ((block.timestamp - s._proposedOwnershipTimestamp) <= delay())
      revert ProposedOwnableFacet__acceptProposedOwner_delayNotElapsed();

    // Emit event, set new owner, reset timestamp
    _setOwner(s._proposed);
  }

  /**
   * @notice Use to revoke the Role of an address to None
   * Can only be called by Owner or Role.Admin
   * @dev input address will be assingned default value i.e Role.None under mapping roles
   * @param _revoke - The address to be revoked from it's Role
   */
  function revokeRole(address _revoke) public onlyOwnerOrAdmin {
    // Use contract as source of truth
    // Will fail if candidate isn't assinged any Role OR input address is addressZero
    Role revokedRole = s.roles[_revoke];
    if (revokedRole == Role.None || _revoke == address(0)) revert ProposedOwnableFacet__revokeRole_invalidInput();

    s.roles[_revoke] = Role.None;
    emit RevokeRole(_revoke, revokedRole);
  }

  /**
   * @notice Use to assign an address Router role
   * Address with Router has permission to add new router
   * Can only be called by Owner or Role.RouterAdmin
   * @dev requested address will be whitelisted as Role.RouterAdmin under mapping roles
   * @param _router - The address to be assigned as Role.RouterAdmin under roles
   */
  function assignRoleRouter(address _router) public onlyOwnerOrAdmin {
    // Use contract as source of truth
    // Will fail if candidate is already added OR input address is addressZero
    if (s.roles[_router] != Role.None || _router == address(0))
      revert ProposedOwnableFacet__assignRoleRouter_invalidInput();

    s.roles[_router] = Role.RouterAdmin;
    emit AssignRoleRouter(_router);
  }

  /**
   * @notice Use to assign an address Watcher role
   * Address with Watcher role has permission to pause
   * Can only be called by Owner or Role.Admin
   * @dev requested address will be whitelisted as Role.Watcher under mapping roles
   * @param _watcher - The address to be assigned as Role.Watcher under roles
   */
  function assignRoleWatcher(address _watcher) public onlyOwnerOrAdmin {
    // Use contract as source of truth
    // Will fail if candidate is already added OR input address is addressZero
    if (s.roles[_watcher] != Role.None || _watcher == address(0))
      revert ProposedOwnableFacet__assignRoleWatcher_invalidInput();

    s.roles[_watcher] = Role.Watcher;
    emit AssignRoleWatcher(_watcher);
  }

  /**
   * @notice Use to assign an address Admin role
   * Address with Admin role has permission to all else of Router & Watcher role
   * Can only be called by Owner or Role.Admin
   * @dev requested address will be whitelisted as Role.Admin under mapping roles
   * @param _admin - The address to beassigned as Role.Admin under roles
   */
  function assignRoleAdmin(address _admin) public onlyOwnerOrAdmin {
    // Use contract as source of truth
    // Will fail if candidate is already added OR input address is addressZero
    if (s.roles[_admin] != Role.None || _admin == address(0))
      revert ProposedOwnableFacet__assignRoleAdmin_invalidInput();

    s.roles[_admin] = Role.Admin;
    emit AssignRoleAdmin(_admin);
  }

  function pause() public onlyOwnerOrWatcher {
    s._paused = true;
    emit Paused();
  }

  function unpause() public onlyOwnerOrAdmin {
    s._paused = false;
    emit Unpaused();
  }

  ////// INTERNAL //////

  function _setRouterWhitelistTimestamp() private {
    s._routerWhitelistTimestamp = block.timestamp;
    emit RouterWhitelistRemovalProposed(block.timestamp);
  }

  function _setRouterWhitelistRemoved(bool value) private {
    s._routerWhitelistRemoved = value;
    delete s._routerWhitelistTimestamp;
    emit RouterWhitelistRemoved(value);
  }

  function _setAssetWhitelistTimestamp() private {
    s._assetWhitelistTimestamp = block.timestamp;
    emit AssetWhitelistRemovalProposed(block.timestamp);
  }

  function _setAssetWhitelistRemoved(bool value) private {
    s._assetWhitelistRemoved = value;
    delete s._assetWhitelistTimestamp;
    emit AssetWhitelistRemoved(value);
  }

  function _setOwner(address newOwner) private {
    delete s._proposedOwnershipTimestamp;
    delete s._proposed;
    LibDiamond.setContractOwner(newOwner);
  }

  function _setProposed(address newlyProposed) private {
    s._proposedOwnershipTimestamp = block.timestamp;
    s._proposed = newlyProposed;
    emit OwnershipProposed(newlyProposed);
  }
}
