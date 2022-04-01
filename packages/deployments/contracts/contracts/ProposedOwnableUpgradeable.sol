// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

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
abstract contract ProposedOwnableUpgradeable is Initializable {
  // ========== Custom Errors ===========

  error ProposedOwnableUpgradeable__onlyOwner_notOwner();
  error ProposedOwnableUpgradeable__onlyProposed_notProposedOwner();
  error ProposedOwnableUpgradeable__proposeRouterOwnershipRenunciation_noOwnershipChange();
  error ProposedOwnableUpgradeable__renounceRouterOwnership_noOwnershipChange();
  error ProposedOwnableUpgradeable__renounceRouterOwnership_noProposal();
  error ProposedOwnableUpgradeable__renounceRouterOwnership_delayNotElapsed();
  error ProposedOwnableUpgradeable__proposeAssetOwnershipRenunciation_noOwnershipChange();
  error ProposedOwnableUpgradeable__renounceAssetOwnership_noOwnershipChange();
  error ProposedOwnableUpgradeable__renounceAssetOwnership_noProposal();
  error ProposedOwnableUpgradeable__renounceAssetOwnership_delayNotElapsed();
  error ProposedOwnableUpgradeable__proposeNewOwner_invalidProposal();
  error ProposedOwnableUpgradeable__proposeNewOwner_noOwnershipChange();
  error ProposedOwnableUpgradeable__renounceOwnership_noProposal();
  error ProposedOwnableUpgradeable__renounceOwnership_delayNotElapsed();
  error ProposedOwnableUpgradeable__renounceOwnership_invalidProposal();
  error ProposedOwnableUpgradeable__acceptProposedOwner_noOwnershipChange();
  error ProposedOwnableUpgradeable__acceptProposedOwner_delayNotElapsed();

  // ============ Properties ============

  address private _owner;

  address private _proposed;
  uint256 private _proposedOwnershipTimestamp;

  bool private _routerOwnershipRenounced;
  uint256 private _routerOwnershipTimestamp;

  bool private _assetOwnershipRenounced;
  uint256 private _assetOwnershipTimestamp;

  uint256 private constant _delay = 7 days;

  event RouterOwnershipRenunciationProposed(uint256 timestamp);

  event RouterOwnershipRenounced(bool renounced);

  event AssetOwnershipRenunciationProposed(uint256 timestamp);

  event AssetOwnershipRenounced(bool renounced);

  event OwnershipProposed(address indexed proposedOwner);

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  /**
   * @dev Initializes the contract setting the deployer as the initial
   */
  function __ProposedOwnable_init() internal onlyInitializing {
    __ProposedOwnable_init_unchained();
  }

  function __ProposedOwnable_init_unchained() internal onlyInitializing {
    _setOwner(msg.sender);
  }

  /**
   * @notice Returns the address of the current owner.
   */
  function owner() public view virtual returns (address) {
    return _owner;
  }

  /**
   * @notice Returns the address of the proposed owner.
   */
  function proposed() public view virtual returns (address) {
    return _proposed;
  }

  /**
   * @notice Returns the address of the proposed owner.
   */
  function proposedTimestamp() public view virtual returns (uint256) {
    return _proposedOwnershipTimestamp;
  }

  /**
   * @notice Returns the timestamp when router ownership was last proposed to be renounced
   */
  function routerOwnershipTimestamp() public view virtual returns (uint256) {
    return _routerOwnershipTimestamp;
  }

  /**
   * @notice Returns the timestamp when asset ownership was last proposed to be renounced
   */
  function assetOwnershipTimestamp() public view virtual returns (uint256) {
    return _assetOwnershipTimestamp;
  }

  /**
   * @notice Returns the delay period before a new owner can be accepted.
   */
  function delay() public view virtual returns (uint256) {
    return _delay;
  }

  /**
   * @notice Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    if (_owner != msg.sender) revert ProposedOwnableUpgradeable__onlyOwner_notOwner();
    _;
  }

  /**
   * @notice Throws if called by any account other than the proposed owner.
   */
  modifier onlyProposed() {
    if (_proposed != msg.sender) revert ProposedOwnableUpgradeable__onlyProposed_notProposedOwner();
    _;
  }

  /**
   * @notice Indicates if the ownership of the router whitelist has
   * been renounced
   */
  function isRouterOwnershipRenounced() public view returns (bool) {
    return _owner == address(0) || _routerOwnershipRenounced;
  }

  /**
   * @notice Indicates if the ownership of the router whitelist has
   * been renounced
   */
  function proposeRouterOwnershipRenunciation() public virtual onlyOwner {
    // Use contract as source of truth
    // Will fail if all ownership is renounced by modifier
    if (_routerOwnershipRenounced)
      revert ProposedOwnableUpgradeable__proposeRouterOwnershipRenunciation_noOwnershipChange();

    // Begin delay, emit event
    _setRouterOwnershipTimestamp();
  }

  /**
   * @notice Indicates if the ownership of the asset whitelist has
   * been renounced
   */
  function renounceRouterOwnership() public virtual onlyOwner {
    // Contract as sournce of truth
    // Will fail if all ownership is renounced by modifier
    if (_routerOwnershipRenounced) revert ProposedOwnableUpgradeable__renounceRouterOwnership_noOwnershipChange();

    // Ensure there has been a proposal cycle started
    if (_routerOwnershipTimestamp == 0) revert ProposedOwnableUpgradeable__renounceRouterOwnership_noProposal();

    // Delay has elapsed
    if ((block.timestamp - _routerOwnershipTimestamp) <= _delay)
      revert ProposedOwnableUpgradeable__renounceRouterOwnership_delayNotElapsed();

    // Set renounced, emit event, reset timestamp to 0
    _setRouterOwnership(true);
  }

  /**
   * @notice Indicates if the ownership of the asset whitelist has
   * been renounced
   */
  function isAssetOwnershipRenounced() public view returns (bool) {
    return _owner == address(0) || _assetOwnershipRenounced;
  }

  /**
   * @notice Indicates if the ownership of the asset whitelist has
   * been renounced
   */
  function proposeAssetOwnershipRenunciation() public virtual onlyOwner {
    // Contract as sournce of truth
    // Will fail if all ownership is renounced by modifier
    if (_assetOwnershipRenounced)
      revert ProposedOwnableUpgradeable__proposeAssetOwnershipRenunciation_noOwnershipChange();

    // Start cycle, emit event
    _setAssetOwnershipTimestamp();
  }

  /**
   * @notice Indicates if the ownership of the asset whitelist has
   * been renounced
   */
  function renounceAssetOwnership() public virtual onlyOwner {
    // Contract as sournce of truth
    // Will fail if all ownership is renounced by modifier
    if (_assetOwnershipRenounced) revert ProposedOwnableUpgradeable__renounceAssetOwnership_noOwnershipChange();

    // Ensure there has been a proposal cycle started
    if (_assetOwnershipTimestamp == 0) revert ProposedOwnableUpgradeable__renounceAssetOwnership_noProposal();

    // Ensure delay has elapsed
    if ((block.timestamp - _assetOwnershipTimestamp) <= _delay)
      revert ProposedOwnableUpgradeable__renounceAssetOwnership_delayNotElapsed();

    // Set ownership, reset timestamp, emit event
    _setAssetOwnership(true);
  }

  /**
   * @notice Indicates if the ownership has been renounced() by
   * checking if current owner is address(0)
   */
  function renounced() public view returns (bool) {
    return _owner == address(0);
  }

  /**
   * @notice Sets the timestamp for an owner to be proposed, and sets the
   * newly proposed owner as step 1 in a 2-step process
   */
  function proposeNewOwner(address newlyProposed) public virtual onlyOwner {
    // Contract as source of truth
    if (_proposed == newlyProposed && newlyProposed != address(0))
      revert ProposedOwnableUpgradeable__proposeNewOwner_invalidProposal();

    // Sanity check: reasonable proposal
    if (_owner == newlyProposed) revert ProposedOwnableUpgradeable__proposeNewOwner_noOwnershipChange();

    _setProposed(newlyProposed);
  }

  /**
   * @notice Renounces ownership of the contract after a delay
   */
  function renounceOwnership() public virtual onlyOwner {
    // Ensure there has been a proposal cycle started
    if (_proposedOwnershipTimestamp == 0) revert ProposedOwnableUpgradeable__renounceOwnership_noProposal();

    // Ensure delay has elapsed
    if ((block.timestamp - _proposedOwnershipTimestamp) <= _delay)
      revert ProposedOwnableUpgradeable__renounceOwnership_delayNotElapsed();

    // Require proposed is set to 0
    if (_proposed != address(0)) revert ProposedOwnableUpgradeable__renounceOwnership_invalidProposal();

    // Emit event, set new owner, reset timestamp
    _setOwner(_proposed);
  }

  /**
   * @notice Transfers ownership of the contract to a new account (`newOwner`).
   * Can only be called by the current owner.
   */
  function acceptProposedOwner() public virtual onlyProposed {
    // Contract as source of truth
    if (_owner == _proposed) revert ProposedOwnableUpgradeable__acceptProposedOwner_noOwnershipChange();

    // NOTE: no need to check if _proposedOwnershipTimestamp > 0 because
    // the only time this would happen is if the _proposed was never
    // set (will fail from modifier) or if the owner == _proposed (checked
    // above)

    // Ensure delay has elapsed
    if ((block.timestamp - _proposedOwnershipTimestamp) <= _delay)
      revert ProposedOwnableUpgradeable__acceptProposedOwner_delayNotElapsed();

    // Emit event, set new owner, reset timestamp
    _setOwner(_proposed);
  }

  ////// INTERNAL //////

  function _setRouterOwnershipTimestamp() private {
    _routerOwnershipTimestamp = block.timestamp;
    emit RouterOwnershipRenunciationProposed(_routerOwnershipTimestamp);
  }

  function _setRouterOwnership(bool value) private {
    _routerOwnershipRenounced = value;
    _routerOwnershipTimestamp = 0;
    emit RouterOwnershipRenounced(value);
  }

  function _setAssetOwnershipTimestamp() private {
    _assetOwnershipTimestamp = block.timestamp;
    emit AssetOwnershipRenunciationProposed(_assetOwnershipTimestamp);
  }

  function _setAssetOwnership(bool value) private {
    _assetOwnershipRenounced = value;
    _assetOwnershipTimestamp = 0;
    emit AssetOwnershipRenounced(value);
  }

  function _setOwner(address newOwner) private {
    address oldOwner = _owner;
    _owner = newOwner;
    _proposedOwnershipTimestamp = 0;
    emit OwnershipTransferred(oldOwner, newOwner);
  }

  function _setProposed(address newlyProposed) private {
    _proposedOwnershipTimestamp = block.timestamp;
    _proposed = newlyProposed;
    emit OwnershipProposed(_proposed);
  }

  /**
   * @dev This empty reserved space is put in place to allow future versions to add new
   * variables without shifting down storage in the inheritance chain.
   * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
   */
  uint256[49] private __gap;
}
