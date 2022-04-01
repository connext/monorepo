// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @notice
 * This contract is designed to manage router access, meaning it maintains the
 * router recipients, owners, and the router whitelist itself. It does *not* manage router balances
 * as asset management is out of scope of this contract.
 *
 * As a router, there are three important permissions:
 * `router` - this is the address that will sign bids sent to the sequencer
 * `routerRecipient` - this is the address that receives funds when liquidity is withdrawn
 * `routerOwner` - this is the address permitted to update recipients and propose new owners
 *
 * In cases where the owner is not set, the caller should be the `router` itself. In cases where the
 * `routerRecipient` is not set, the funds can be removed to anywhere.
 *
 * When setting a new `routerOwner`, the current owner (or router) must create a proposal, which
 * can be accepted by the proposed owner after the delay period. If the proposed owner is the empty
 * address, then it must be accepted by the current owner.
 */
abstract contract RouterPermissionsManager is Initializable {
  // ========== Custom Errors ===========

  error RouterPermissionsManager__onlyRouterOwner_notRouterOwner();
  error RouterPermissionsManager__onlyProposedRouterOwner_notRouterOwner();
  error RouterPermissionsManager__onlyProposedRouterOwner_notProposedRouterOwner();
  error RouterPermissionsManager__setRouterRecipient_notNewRecipient();
  error RouterPermissionsManager__proposeRouterOwner_notNewOwner();
  error RouterPermissionsManager__proposeRouterOwner_badRouter();
  error RouterPermissionsManager__acceptProposedRouterOwner_notElapsed();
  error RouterPermissionsManager__setupRouter_routerEmpty();
  error RouterPermissionsManager__setupRouter_amountIsZero();
  error RouterPermissionsManager__removeRouter_routerEmpty();
  error RouterPermissionsManager__removeRouter_notAdded();

  // ============ Events =============

  /**
   * @notice Emitted when a new router is added
   * @param router - The address of the added router
   * @param caller - The account that called the function
   */
  event RouterAdded(address indexed router, address caller);

  /**
   * @notice Emitted when an existing router is removed
   * @param router - The address of the removed router
   * @param caller - The account that called the function
   */
  event RouterRemoved(address indexed router, address caller);

  /**
   * @notice Emitted when the recipient of router is updated
   * @param router - The address of the added router
   * @param prevRecipient  - The address of the previous recipient of the router
   * @param newRecipient  - The address of the new recipient of the router
   */
  event RouterRecipientSet(address indexed router, address indexed prevRecipient, address indexed newRecipient);

  /**
   * @notice Emitted when the owner of router is proposed
   * @param router - The address of the added router
   * @param prevProposed  - The address of the previous proposed
   * @param newProposed  - The address of the new proposed
   */
  event RouterOwnerProposed(address indexed router, address indexed prevProposed, address indexed newProposed);

  /**
   * @notice Emitted when the owner of router is accepted
   * @param router - The address of the added router
   * @param prevOwner  - The address of the previous owner of the router
   * @param newOwner  - The address of the new owner of the router
   */
  event RouterOwnerAccepted(address indexed router, address indexed prevOwner, address indexed newOwner);

  // ============ Private storage =============

  uint256 private _delay;

  // ============ Public Storage =============

  /**
   * @notice Mapping of whitelisted router addresses.
   */
  mapping(address => bool) public approvedRouters;

  /**
   * @notice Mapping of router withdraw receipient addresses.
   * @dev If set, all liquidity is withdrawn only to this address. Must be set by routerOwner
   * (if configured) or the router itself
   */
  mapping(address => address) public routerRecipients;

  /**
   * @notice Mapping of router owners
   * @dev If set, can update the routerRecipient
   */
  mapping(address => address) public routerOwners;

  /**
   * @notice Mapping of proposed router owners
   * @dev Must wait timeout to set the
   */
  mapping(address => address) public proposedRouterOwners;

  /**
   * @notice Mapping of proposed router owners timestamps
   * @dev When accepting a proposed owner, must wait for delay to elapse
   */
  mapping(address => uint256) public proposedRouterTimestamp;

  // ============ Modifiers =============

  /**
   * @notice Asserts caller is the router owner (if set) or the router itself
   */
  modifier onlyRouterOwner(address router) {
    address _owner = routerOwners[router];
    if (!((_owner == address(0) && msg.sender == router) || _owner == msg.sender)) revert RouterPermissionsManager__onlyRouterOwner_notRouterOwner();
    _;
  }

  /**
   * @notice Asserts caller is the proposed router. If proposed router is address(0), then asserts
   * the owner is calling the function (if set), or the router itself is calling the function
   */
  modifier onlyProposedRouterOwner(address router) {
    address _owner = routerOwners[router];
    address _proposed = proposedRouterOwners[router];
    if (_proposed == address(0)) {
      if (!((_owner == address(0) && msg.sender == router) || _owner == msg.sender)) revert RouterPermissionsManager__onlyProposedRouterOwner_notRouterOwner();
    } else {
      if (msg.sender != _proposed) revert RouterPermissionsManager__onlyProposedRouterOwner_notProposedRouterOwner();
    }
    _;
  }

  // ============ Initialize =============

  /**
   * @dev Initializes the contract setting the deployer as the initial
   */
  function __RouterPermissionsManager_init() internal onlyInitializing {
    __RouterPermissionsManager_init_unchained();
  }

  function __RouterPermissionsManager_init_unchained() internal onlyInitializing {
    _delay = 7 days;
  }

  // ============ Public methods =============

  /**
   * @notice Sets the designated recipient for a router
   * @dev Router should only be able to set this once otherwise if router key compromised,
   * no problem is solved since attacker could just update recipient
   * @param router Router address to set recipient
   * @param recipient Recipient Address to set to router
   */
  function setRouterRecipient(address router, address recipient) external onlyRouterOwner(router) {
    // Check recipient is changing
    address _prevRecipient = routerRecipients[router];
    if (_prevRecipient == recipient) revert RouterPermissionsManager__setRouterRecipient_notNewRecipient();

    // Set new recipient
    routerRecipients[router] = recipient;

    // Emit event
    emit RouterRecipientSet(router, _prevRecipient, recipient);
  }

  /**
   * @notice Current owner or router may propose a new router owner
   * @param router Router address to set recipient
   * @param proposed Proposed owner Address to set to router
   */
  function proposeRouterOwner(address router, address proposed) external onlyRouterOwner(router) {
    // Check that proposed is different than current owner
    address _currentOwner = _getRouterOwner(router);
    if (_currentOwner == proposed) revert RouterPermissionsManager__proposeRouterOwner_notNewOwner();

    // Check that proposed is different than current proposed
    address _currentProposed = proposedRouterOwners[router];
    if (_currentProposed == proposed) revert RouterPermissionsManager__proposeRouterOwner_badRouter();

    // Set proposed owner + timestamp
    proposedRouterOwners[router] = proposed;
    proposedRouterTimestamp[router] = block.timestamp;

    // Emit event
    emit RouterOwnerProposed(router, _currentProposed, proposed);
  }

  /**
   * @notice New router owner must accept role, or previous if proposed is 0x0
   * @param router Router address to set recipient
   */
  function acceptProposedRouterOwner(address router) external onlyProposedRouterOwner(router) {
    // Check timestamp has passed
    if (block.timestamp - proposedRouterTimestamp[router] <= _delay) revert RouterPermissionsManager__acceptProposedRouterOwner_notElapsed();

    // Get current owner + proposed
    address _owner = _getRouterOwner(router);
    address _proposed = proposedRouterOwners[router];

    // Update the current owner
    routerOwners[router] = _proposed;

    // Reset proposal + timestamp
    if (_proposed != address(0)) {
      delete proposedRouterOwners[router];
    }
    proposedRouterTimestamp[router] = 0;

    // Emit event
    emit RouterOwnerAccepted(router, _owner, _proposed);
  }

  // ============ Private methods =============

  /**
   * @notice Used to set router initial properties
   * @param router Router address to setup
   * @param owner Initial Owner of router
   * @param recipient Initial Recipient of router
   */
  function _setupRouter(
    address router,
    address owner,
    address recipient
  ) internal {
    // Sanity check: not empty
    if (router == address(0)) revert RouterPermissionsManager__setupRouter_routerEmpty();

    // Sanity check: needs approval
    if (approvedRouters[router]) revert RouterPermissionsManager__setupRouter_amountIsZero();

    // Approve router
    approvedRouters[router] = true;

    // Emit event
    emit RouterAdded(router, msg.sender);

    // Update routerOwner (zero address possible)
    if (owner != address(0)) {
      routerOwners[router] = owner;
      emit RouterOwnerAccepted(router, address(0), owner);
    }

    // Update router recipient
    if (recipient != address(0)) {
      routerRecipients[router] = recipient;
      emit RouterRecipientSet(router, address(0), recipient);
    }
  }

  /**
   * @notice Used to remove routers that can transact crosschain
   * @param router Router address to remove
   */
  function _removeRouter(address router) internal {
    // Sanity check: not empty
    if (router == address(0)) revert RouterPermissionsManager__removeRouter_routerEmpty();

    // Sanity check: needs removal
    if (!approvedRouters[router]) revert RouterPermissionsManager__removeRouter_notAdded();

    // Update mapping
    approvedRouters[router] = false;

    // Emit event
    emit RouterRemoved(router, msg.sender);

    // Remove router owner
    address _owner = routerOwners[router];
    if (_owner != address(0)) {
      emit RouterOwnerAccepted(router, _owner, address(0));
      delete routerOwners[router];
    }

    // Remove router recipient
    address _recipient = routerRecipients[router];
    if (_recipient != address(0)) {
      emit RouterRecipientSet(router, _recipient, address(0));
      delete routerRecipients[router];
    }
  }

  /**
   * @notice Returns the router owner if it is set, or the router itself if not
   */
  function _getRouterOwner(address router) internal returns (address) {
    address _owner = routerOwners[router];
    return _owner == address(0) ? router : _owner;
  }
}
