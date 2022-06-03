// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {BaseConnextFacet} from "./BaseConnextFacet.sol";
import {LibDiamond} from "../libraries/LibDiamond.sol";
import {PausedFunctions} from "../libraries/LibConnextStorage.sol";
import {IProposedOwnable} from "../../shared/interfaces/IProposedOwnable.sol";

/**
 * @title ProposedOwnable
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
  error ProposedOwnableFacet__proposeRouterOwnershipRenunciation_noOwnershipChange();
  error ProposedOwnableFacet__renounceRouterOwnership_noOwnershipChange();
  error ProposedOwnableFacet__renounceRouterOwnership_noProposal();
  error ProposedOwnableFacet__renounceRouterOwnership_delayNotElapsed();
  error ProposedOwnableFacet__proposeAssetOwnershipRenunciation_noOwnershipChange();
  error ProposedOwnableFacet__renounceAssetOwnership_noOwnershipChange();
  error ProposedOwnableFacet__renounceAssetOwnership_noProposal();
  error ProposedOwnableFacet__renounceAssetOwnership_delayNotElapsed();
  error ProposedOwnableFacet__proposeNewOwner_invalidProposal();
  error ProposedOwnableFacet__proposeNewOwner_noOwnershipChange();
  error ProposedOwnableFacet__renounceOwnership_noProposal();
  error ProposedOwnableFacet__renounceOwnership_delayNotElapsed();
  error ProposedOwnableFacet__renounceOwnership_invalidProposal();
  error ProposedOwnableFacet__acceptProposedOwner_noOwnershipChange();
  error ProposedOwnableFacet__acceptProposedOwner_delayNotElapsed();

  // ============ Properties ============

  uint256 private constant _delay = 7 days;

  // ============ Events ============

  event RouterOwnershipRenunciationProposed(uint256 timestamp);

  event RouterOwnershipRenounced(bool renounced);

  event AssetOwnershipRenunciationProposed(uint256 timestamp);

  event AssetOwnershipRenounced(bool renounced);

  event SetPausedFunction(PausedFunctions previous, PausedFunctions current);

  // ============ External: Getters ============

  /**
   * @notice Returns the address of the current owner.
   */
  function owner() public view returns (address) {
    return LibDiamond.contractOwner();
  }

  /**
   * @notice Returns if the router ownership is renounced.
   */
  function routerOwnershipRenounced() public view returns (bool) {
    return s._routerOwnershipRenounced;
  }

  /**
   * @notice Returns if the asset ownership is renounced.
   */
  function assetOwnershipRenounced() public view returns (bool) {
    return s._assetOwnershipRenounced;
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
   * @notice Returns the timestamp when router ownership was last proposed to be renounced
   */
  function routerOwnershipTimestamp() public view returns (uint256) {
    return s._routerOwnershipTimestamp;
  }

  /**
   * @notice Returns the timestamp when asset ownership was last proposed to be renounced
   */
  function assetOwnershipTimestamp() public view returns (uint256) {
    return s._assetOwnershipTimestamp;
  }

  /**
   * @notice Returns the delay period before a new owner can be accepted.
   */
  function delay() public view returns (uint256) {
    return _delay;
  }

  // ============ External ============

  /**
   * @notice Indicates if the ownership of the router whitelist has
   * been renounced
   */
  function proposeRouterOwnershipRenunciation() public onlyOwner {
    // Use contract as source of truth
    // Will fail if all ownership is renounced by modifier
    if (s._routerOwnershipRenounced)
      revert ProposedOwnableFacet__proposeRouterOwnershipRenunciation_noOwnershipChange();

    // Begin delay, emit event
    _setRouterOwnershipTimestamp();
  }

  /**
   * @notice Indicates if the ownership of the asset whitelist has
   * been renounced
   */
  function renounceRouterOwnership() public onlyOwner {
    // Contract as sournce of truth
    // Will fail if all ownership is renounced by modifier
    if (s._routerOwnershipRenounced) revert ProposedOwnableFacet__renounceRouterOwnership_noOwnershipChange();

    // Ensure there has been a proposal cycle started
    if (s._routerOwnershipTimestamp == 0) revert ProposedOwnableFacet__renounceRouterOwnership_noProposal();

    // Delay has elapsed
    if ((block.timestamp - s._routerOwnershipTimestamp) <= _delay)
      revert ProposedOwnableFacet__renounceRouterOwnership_delayNotElapsed();

    // Set renounced, emit event, reset timestamp to 0
    _setRouterOwnership(true);
  }

  /**
   * @notice Indicates if the ownership of the asset whitelist has
   * been renounced
   */
  function proposeAssetOwnershipRenunciation() public onlyOwner {
    // Contract as sournce of truth
    // Will fail if all ownership is renounced by modifier
    if (s._assetOwnershipRenounced) revert ProposedOwnableFacet__proposeAssetOwnershipRenunciation_noOwnershipChange();

    // Start cycle, emit event
    _setAssetOwnershipTimestamp();
  }

  /**
   * @notice Indicates if the ownership of the asset whitelist has
   * been renounced
   */
  function renounceAssetOwnership() public onlyOwner {
    // Contract as sournce of truth
    // Will fail if all ownership is renounced by modifier
    if (s._assetOwnershipRenounced) revert ProposedOwnableFacet__renounceAssetOwnership_noOwnershipChange();

    // Ensure there has been a proposal cycle started
    if (s._assetOwnershipTimestamp == 0) revert ProposedOwnableFacet__renounceAssetOwnership_noProposal();

    // Ensure delay has elapsed
    if ((block.timestamp - s._assetOwnershipTimestamp) <= _delay)
      revert ProposedOwnableFacet__renounceAssetOwnership_delayNotElapsed();

    // Set ownership, reset timestamp, emit event
    _setAssetOwnership(true);
  }

  /**
   * @notice Indicates if the ownership has been renounced() by
   * checking if current owner is address(0)
   */
  function renounced() public view returns (bool) {
    return owner() == address(0);
  }

  /**
   * @notice Sets the timestamp for an owner to be proposed, and sets the
   * newly proposed owner as step 1 in a 2-step process
   */
  function proposeNewOwner(address newlyProposed) public onlyOwner {
    // Contract as source of truth
    if (s._proposed == newlyProposed && newlyProposed != address(0))
      revert ProposedOwnableFacet__proposeNewOwner_invalidProposal();

    // Sanity check: reasonable proposal
    if (owner() == newlyProposed) revert ProposedOwnableFacet__proposeNewOwner_noOwnershipChange();

    _setProposed(newlyProposed);
  }

  /**
   * @notice Renounces ownership of the contract after a delay
   */
  function renounceOwnership() public onlyOwner {
    // Ensure there has been a proposal cycle started
    if (s._proposedOwnershipTimestamp == 0) revert ProposedOwnableFacet__renounceOwnership_noProposal();

    // Ensure delay has elapsed
    if ((block.timestamp - s._proposedOwnershipTimestamp) <= _delay)
      revert ProposedOwnableFacet__renounceOwnership_delayNotElapsed();

    // Require proposed is set to 0
    if (s._proposed != address(0)) revert ProposedOwnableFacet__renounceOwnership_invalidProposal();

    // Emit event, set new owner, reset timestamp
    _setOwner(s._proposed);
  }

  /**
   * @notice Transfers ownership of the contract to a new account (`newOwner`).
   * Can only be called by the current owner.
   */
  function acceptProposedOwner() public onlyProposed {
    // Contract as source of truth
    if (owner() == s._proposed) revert ProposedOwnableFacet__acceptProposedOwner_noOwnershipChange();

    // NOTE: no need to check if _proposedOwnershipTimestamp > 0 because
    // the only time this would happen is if the _proposed was never
    // set (will fail from modifier) or if the owner == _proposed (checked
    // above)

    // Ensure delay has elapsed
    if ((block.timestamp - s._proposedOwnershipTimestamp) <= _delay)
      revert ProposedOwnableFacet__acceptProposedOwner_delayNotElapsed();

    // Emit event, set new owner, reset timestamp
    _setOwner(s._proposed);
  }

  function setPausedFunctions(PausedFunctions _paused) public onlyOwner {
    PausedFunctions old = s._paused;
    s._paused = _paused;
    emit SetPausedFunction(old, _paused);
  }

  ////// INTERNAL //////

  function _setRouterOwnershipTimestamp() private {
    s._routerOwnershipTimestamp = block.timestamp;
    emit RouterOwnershipRenunciationProposed(s._routerOwnershipTimestamp);
  }

  function _setRouterOwnership(bool value) private {
    s._routerOwnershipRenounced = value;
    s._routerOwnershipTimestamp = 0;
    emit RouterOwnershipRenounced(value);
  }

  function _setAssetOwnershipTimestamp() private {
    s._assetOwnershipTimestamp = block.timestamp;
    emit AssetOwnershipRenunciationProposed(s._assetOwnershipTimestamp);
  }

  function _setAssetOwnership(bool value) private {
    s._assetOwnershipRenounced = value;
    s._assetOwnershipTimestamp = 0;
    emit AssetOwnershipRenounced(value);
  }

  function _setOwner(address newOwner) private {
    s._proposedOwnershipTimestamp = 0;
    LibDiamond.setContractOwner(newOwner);
  }

  function _setProposed(address newlyProposed) private {
    s._proposedOwnershipTimestamp = block.timestamp;
    s._proposed = newlyProposed;
    emit OwnershipProposed(s._proposed);
  }
}
