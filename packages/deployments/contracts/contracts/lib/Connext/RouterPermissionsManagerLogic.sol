// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

/**
 * @notice Contains RouterPermissionsManager related state
 * @param approvedRouters - Mapping of whitelisted router addresses
 * @param routerRecipients - Mapping of router withdraw recipient addresses.
 * If set, all liquidity is withdrawn only to this address. Must be set by routerOwner
 * (if configured) or the router itself
 * @param routerOwners - Mapping of router owners
 * If set, can update the routerRecipient
 * @param proposedRouterOwners - Mapping of proposed router owners
 * Must wait timeout to set the
 * @param proposedRouterTimestamp - Mapping of proposed router owners timestamps
 * When accepting a proposed owner, must wait for delay to elapse
 */
struct RouterPermissionsManagerInfo {
  mapping(address => bool) approvedRouters;
  mapping(address => address) routerRecipients;
  mapping(address => address) routerOwners;
  mapping(address => address) proposedRouterOwners;
  mapping(address => uint256) proposedRouterTimestamp;
}

library RouterPermissionsManagerLogic {
  // ========== Custom Errors ===========
  error RouterPermissionsManagerLogic__acceptProposedRouterOwner_notElapsed();
  error RouterPermissionsManagerLogic__setRouterRecipient_notNewRecipient();
  error RouterPermissionsManagerLogic__onlyRouterOwner_notRouterOwner();
  error RouterPermissionsManagerLogic__onlyProposedRouterOwner_notRouterOwner();
  error RouterPermissionsManagerLogic__onlyProposedRouterOwner_notProposedRouterOwner();
  error RouterPermissionsManagerLogic__removeRouter_routerEmpty();
  error RouterPermissionsManagerLogic__removeRouter_notAdded();
  error RouterPermissionsManagerLogic__setupRouter_routerEmpty();
  error RouterPermissionsManagerLogic__setupRouter_amountIsZero();
  error RouterPermissionsManagerLogic__proposeRouterOwner_notNewOwner();
  error RouterPermissionsManagerLogic__proposeRouterOwner_badRouter();

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

  /**
   * @notice Asserts caller is the router owner (if set) or the router itself
   */
  function _onlyRouterOwner(address _router, address _owner) internal view {
    if (!((_owner == address(0) && msg.sender == _router) || _owner == msg.sender))
      revert RouterPermissionsManagerLogic__onlyRouterOwner_notRouterOwner();
  }

  /**
   * @notice Asserts caller is the proposed router. If proposed router is address(0), then asserts
   * the owner is calling the function (if set), or the router itself is calling the function
   */
  function _onlyProposedRouterOwner(
    address _router,
    address _owner,
    address _proposed
  ) internal view {
    if (_proposed == address(0)) {
      if (!((_owner == address(0) && msg.sender == _router) || _owner == msg.sender))
        revert RouterPermissionsManagerLogic__onlyProposedRouterOwner_notRouterOwner();
    } else {
      if (msg.sender != _proposed)
        revert RouterPermissionsManagerLogic__onlyProposedRouterOwner_notProposedRouterOwner();
    }
  }

  // ============ Public methods =============

  /**
   * @notice Sets the designated recipient for a router
   * @dev Router should only be able to set this once otherwise if router key compromised,
   * no problem is solved since attacker could just update recipient
   * @param router Router address to set recipient
   * @param recipient Recipient Address to set to router
   */
  function setRouterRecipient(
    address router,
    address recipient,
    RouterPermissionsManagerInfo storage routerInfo // mapping(address => address) storage routerOwners, // mapping(address => address) storage routerRecipients
  ) external {
    _onlyRouterOwner(router, routerInfo.routerOwners[router]);

    // Check recipient is changing
    address _prevRecipient = routerInfo.routerRecipients[router];
    if (_prevRecipient == recipient) revert RouterPermissionsManagerLogic__setRouterRecipient_notNewRecipient();

    // Set new recipient
    routerInfo.routerRecipients[router] = recipient;

    // Emit event
    emit RouterRecipientSet(router, _prevRecipient, recipient);
  }

  /**
   * @notice Current owner or router may propose a new router owner
   * @param router Router address to set recipient
   * @param proposed Proposed owner Address to set to router
   */
  function proposeRouterOwner(
    address router,
    address proposed,
    RouterPermissionsManagerInfo storage routerInfo
  ) external {
    _onlyRouterOwner(router, routerInfo.routerOwners[router]);

    // Check that proposed is different than current owner
    if (_getRouterOwner(router, routerInfo.routerOwners) == proposed)
      revert RouterPermissionsManagerLogic__proposeRouterOwner_notNewOwner();

    // Check that proposed is different than current proposed
    address _currentProposed = routerInfo.proposedRouterOwners[router];
    if (_currentProposed == proposed) revert RouterPermissionsManagerLogic__proposeRouterOwner_badRouter();

    // Set proposed owner + timestamp
    routerInfo.proposedRouterOwners[router] = proposed;
    routerInfo.proposedRouterTimestamp[router] = block.timestamp;

    // Emit event
    emit RouterOwnerProposed(router, _currentProposed, proposed);
  }

  /**
   * @notice New router owner must accept role, or previous if proposed is 0x0
   * @param router Router address to set recipient
   */
  function acceptProposedRouterOwner(
    address router,
    uint256 _delay,
    RouterPermissionsManagerInfo storage routerInfo
  ) external {
    _onlyProposedRouterOwner(router, routerInfo.routerOwners[router], routerInfo.proposedRouterOwners[router]);

    address owner = _getRouterOwner(router, routerInfo.routerOwners);

    // Check timestamp has passed
    if (block.timestamp - routerInfo.proposedRouterTimestamp[router] <= _delay)
      revert RouterPermissionsManagerLogic__acceptProposedRouterOwner_notElapsed();

    // Get current owner + proposed
    address _proposed = routerInfo.proposedRouterOwners[router];

    // Update the current owner
    routerInfo.routerOwners[router] = _proposed;

    // Reset proposal + timestamp
    if (_proposed != address(0)) {
      // delete proposedRouterOwners[router];
      routerInfo.proposedRouterOwners[router] = address(0);
    }
    routerInfo.proposedRouterTimestamp[router] = 0;

    // Emit event
    emit RouterOwnerAccepted(router, owner, _proposed);
  }

  /**
   * @notice Used to set router initial properties
   * @param router Router address to setup
   * @param owner Initial Owner of router
   * @param recipient Initial Recipient of router
   */
  function setupRouter(
    address router,
    address owner,
    address recipient,
    RouterPermissionsManagerInfo storage routerInfo
  ) internal {
    // Sanity check: not empty
    if (router == address(0)) revert RouterPermissionsManagerLogic__setupRouter_routerEmpty();

    // Sanity check: needs approval
    if (routerInfo.approvedRouters[router]) revert RouterPermissionsManagerLogic__setupRouter_amountIsZero();

    // Approve router
    routerInfo.approvedRouters[router] = true;

    // Emit event
    emit RouterAdded(router, msg.sender);

    // Update routerOwner (zero address possible)
    if (owner != address(0)) {
      routerInfo.routerOwners[router] = owner;
      emit RouterOwnerAccepted(router, address(0), owner);
    }

    // Update router recipient
    if (recipient != address(0)) {
      routerInfo.routerRecipients[router] = recipient;
      emit RouterRecipientSet(router, address(0), recipient);
    }
  }

  /**
   * @notice Used to remove routers that can transact crosschain
   * @param router Router address to remove
   */
  function removeRouter(address router, RouterPermissionsManagerInfo storage routerInfo) external {
    // Sanity check: not empty
    if (router == address(0)) revert RouterPermissionsManagerLogic__removeRouter_routerEmpty();

    // Sanity check: needs removal
    if (!routerInfo.approvedRouters[router]) revert RouterPermissionsManagerLogic__removeRouter_notAdded();

    // Update mapping
    routerInfo.approvedRouters[router] = false;

    // Emit event
    emit RouterRemoved(router, msg.sender);

    // Remove router owner
    address _owner = routerInfo.routerOwners[router];
    if (_owner != address(0)) {
      emit RouterOwnerAccepted(router, _owner, address(0));
      // delete routerOwners[router];
      routerInfo.routerOwners[router] = address(0);
    }

    // Remove router recipient
    address _recipient = routerInfo.routerRecipients[router];
    if (_recipient != address(0)) {
      emit RouterRecipientSet(router, _recipient, address(0));
      // delete routerRecipients[router];
      routerInfo.routerRecipients[router] = address(0);
    }
  }

  /**
   * @notice Returns the router owner if it is set, or the router itself if not
   */
  function _getRouterOwner(address router, mapping(address => address) storage _routerOwners)
    internal
    view
    returns (address)
  {
    address _owner = _routerOwners[router];
    return _owner == address(0) ? router : _owner;
  }
}
