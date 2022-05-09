// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {Modifiers} from "../utils/Modifiers.sol";
import {RouterPermissionsManagerInfo} from "../libraries/LibConnextStorage.sol";

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
contract RouterPermissionsFacet is Modifiers {
  // ============ Properties ============

  uint256 private constant _delay = 7 days;

  // ========== Custom Errors ===========
  error RouterPermissionsFacet__acceptProposedRouterOwner_notElapsed();
  error RouterPermissionsFacet__setRouterRecipient_notNewRecipient();
  error RouterPermissionsFacet__onlyRouterOwner_notRouterOwner();
  error RouterPermissionsFacet__onlyProposedRouterOwner_notRouterOwner();
  error RouterPermissionsFacet__onlyProposedRouterOwner_notProposedRouterOwner();
  error RouterPermissionsFacet__removeRouter_routerEmpty();
  error RouterPermissionsFacet__removeRouter_notAdded();
  error RouterPermissionsFacet__setupRouter_routerEmpty();
  error RouterPermissionsFacet__setupRouter_amountIsZero();
  error RouterPermissionsFacet__proposeRouterOwner_notNewOwner();
  error RouterPermissionsFacet__proposeRouterOwner_badRouter();

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

  // ============ Modifiers ============

  /**
   * @notice Asserts caller is the router owner (if set) or the router itself
   */
  modifier onlyRouterOwner(address _router) {
    address owner = s.routerInfo.routerOwners[_router];
    if (!((owner == address(0) && msg.sender == _router) || owner == msg.sender))
      revert RouterPermissionsManagerFacet__onlyRouterOwner_notRouterOwner();
    _;
  }

  /**
   * @notice Asserts caller is the proposed router. If proposed router is address(0), then asserts
   * the owner is calling the function (if set), or the router itself is calling the function
   */
  modifier onlyProposedRouterOwner(address _router) {
    address proposed = s.routerInfo.proposedRouterOwners[_router];
    if (proposed == address(0)) {
      address owner = s.routerInfo.routerOwners[_router];
      if (!((owner == address(0) && msg.sender == _router) || owner == msg.sender))
        revert RouterPermissionsManagerFacet__onlyProposedRouterOwner_notRouterOwner();
    } else {
      if (msg.sender != proposed)
        revert RouterPermissionsManagerFacet__onlyProposedRouterOwner_notProposedRouterOwner();
    }
    _;
  }

  // ============ Public methods ==============

  /**
   * @notice Returns the approved router for the given router address
   * @param _router The relevant router address
   */
  function getRouterApproval(address _router) public view returns (bool) {
    return s.routerPermissionInfo.approvedRouters[_router];
  }

  /**
   * @notice Returns the recipient for the specified router
   * @dev The recipient (if set) receives all funds when router liquidity is removed
   * @param _router The relevant router address
   */
  function getRouterRecipient(address _router) public view returns (address) {
    return s.routerPermissionInfo.routerRecipients[_router];
  }

  /**
   * @notice Returns the router owner if it is set, or the router itself if not
   * @dev Uses logic function here to handle the case where router owner is not set.
   * Other getters within this interface use explicitly the stored value
   * @param _router The relevant router address
   */
  function getRouterOwner(address _router) public view returns (address) {
    address _owner = s.routerPermissionInfo.routerOwners[_router];
    return _owner == address(0) ? _router : _owner;
  }

  /**
   * @notice Returns the currently proposed router owner
   * @dev All routers must wait for the delay timeout before accepting a new owner
   * @param _router The relevant router address
   */
  function getProposedRouterOwner(address _router) public view returns (address) {
    return s.routerPermissionInfo.proposedRouterOwners[_router];
  }

  /**
   * @notice Returns the currently proposed router owner timestamp
   * @dev All routers must wait for the delay timeout before accepting a new owner
   * @param _router The relevant router address
   */
  function getProposedRouterOwnerTimestamp(address _router) public view returns (uint256) {
    return s.routerPermissionInfo.proposedRouterTimestamp[_router];
  }

  /**
   * @notice Sets the designated recipient for a router
   * @dev Router should only be able to set this once otherwise if router key compromised,
   * no problem is solved since attacker could just update recipient
   * @param router Router address to set recipient
   * @param recipient Recipient Address to set to router
   */
  function setRouterRecipient(address router, address recipient) external onlyRouterOwner(router) {
    // Check recipient is changing
    address _prevRecipient = s.routerPermissionInfo.routerRecipients[router];
    if (_prevRecipient == recipient) revert RouterPermissionsFacet__setRouterRecipient_notNewRecipient();

    // Set new recipient
    s.routerPermissionInfo.routerRecipients[router] = recipient;

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
    if (getRouterOwner(router) == proposed) revert RouterPermissionsFacet__proposeRouterOwner_notNewOwner();

    // Check that proposed is different than current proposed
    address _currentProposed = s.routerPermissionInfo.proposedRouterOwners[router];
    if (_currentProposed == proposed) revert RouterPermissionsFacet__proposeRouterOwner_badRouter();

    // Set proposed owner + timestamp
    s.routerPermissionInfo.proposedRouterOwners[router] = proposed;
    s.routerPermissionInfo.proposedRouterTimestamp[router] = block.timestamp;

    // Emit event
    emit RouterOwnerProposed(router, _currentProposed, proposed);
  }

  /**
   * @notice New router owner must accept role, or previous if proposed is 0x0
   * @param router Router address to set recipient
   */
  function acceptProposedRouterOwner(address router) external onlyProposedRouterOwner(router) {
    address owner = getRouterOwner(router);

    // Check timestamp has passed
    if (block.timestamp - s.routerPermissionInfo.proposedRouterTimestamp[router] <= _delay)
      revert RouterPermissionsFacet__acceptProposedRouterOwner_notElapsed();

    // Get current owner + proposed
    address _proposed = s.routerPermissionInfo.proposedRouterOwners[router];

    // Update the current owner
    s.routerPermissionInfo.routerOwners[router] = _proposed;

    // Reset proposal + timestamp
    if (_proposed != address(0)) {
      // delete proposedRouterOwners[router];
      s.routerPermissionInfo.proposedRouterOwners[router] = address(0);
    }
    s.routerPermissionInfo.proposedRouterTimestamp[router] = 0;

    // Emit event
    emit RouterOwnerAccepted(router, owner, _proposed);
  }

  // ============ Private methods =============

  /**
   * @notice Used to set router initial properties
   * @param router Router address to setup
   * @param owner Initial Owner of router
   * @param recipient Initial Recipient of router
   */
  function setupRouter(
    address router,
    address owner,
    address recipient
  ) external onlyOwner {
    // Sanity check: not empty
    if (router == address(0)) revert RouterPermissionsFacet__setupRouter_routerEmpty();

    // Sanity check: needs approval
    if (s.routerPermissionInfo.approvedRouters[router]) revert RouterPermissionsFacet__setupRouter_amountIsZero();

    // Approve router
    s.routerPermissionInfo.approvedRouters[router] = true;

    // Emit event
    emit RouterAdded(router, msg.sender);

    // Update routerOwner (zero address possible)
    if (owner != address(0)) {
      s.routerPermissionInfo.routerOwners[router] = owner;
      emit RouterOwnerAccepted(router, address(0), owner);
    }

    // Update router recipient
    if (recipient != address(0)) {
      s.routerPermissionInfo.routerRecipients[router] = recipient;
      emit RouterRecipientSet(router, address(0), recipient);
    }
  }

  /**
   * @notice Used to remove routers that can transact crosschain
   * @param router Router address to remove
   */
  function removeRouter(address router) external onlyOwner {
    // Sanity check: not empty
    if (router == address(0)) revert RouterPermissionsFacet__removeRouter_routerEmpty();

    // Sanity check: needs removal
    if (!s.routerPermissionInfo.approvedRouters[router]) revert RouterPermissionsFacet__removeRouter_notAdded();

    // Update mapping
    s.routerPermissionInfo.approvedRouters[router] = false;

    // Emit event
    emit RouterRemoved(router, msg.sender);

    // Remove router owner
    address _owner = s.routerPermissionInfo.routerOwners[router];
    if (_owner != address(0)) {
      emit RouterOwnerAccepted(router, _owner, address(0));
      // delete routerOwners[router];
      s.routerPermissionInfo.routerOwners[router] = address(0);
    }

    // Remove router recipient
    address _recipient = s.routerPermissionInfo.routerRecipients[router];
    if (_recipient != address(0)) {
      emit RouterRecipientSet(router, _recipient, address(0));
      // delete routerRecipients[router];
      s.routerPermissionInfo.routerRecipients[router] = address(0);
    }
  }
}
