// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

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
  function onlyRouterOwner(address _router, address _owner) external {
    if (!((_owner == address(0) && msg.sender == _router) || _owner == msg.sender))
      revert RouterPermissionsManagerLogic__onlyRouterOwner_notRouterOwner();
  }

  /**
   * @notice Asserts caller is the proposed router. If proposed router is address(0), then asserts
   * the owner is calling the function (if set), or the router itself is calling the function
   */
  function onlyProposedRouterOwner(
    address _router,
    address _owner,
    address _proposed
  ) external {
    if (_proposed == address(0)) {
      if (!((_owner == address(0) && msg.sender == _router) || _owner == msg.sender))
        revert RouterPermissionsManagerLogic__onlyProposedRouterOwner_notRouterOwner();
    } else {
      if (msg.sender != _proposed) revert RouterPermissionsManagerLogic__onlyProposedRouterOwner_notProposedRouterOwner();
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
    mapping(address => address) storage routerRecipients
  ) external {
    // Check recipient is changing
    address _prevRecipient = routerRecipients[router];
    if (_prevRecipient == recipient) revert RouterPermissionsManagerLogic__setRouterRecipient_notNewRecipient();

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
  function proposeRouterOwner(
    address router,
    address proposed,
    address _currentOwner,
    mapping(address => address) storage proposedRouterOwners,
    mapping(address => uint256) storage proposedRouterTimestamp
  ) external {
    // Check that proposed is different than current owner
    if (_currentOwner == proposed) revert RouterPermissionsManagerLogic__proposeRouterOwner_notNewOwner();

    // Check that proposed is different than current proposed
    address _currentProposed = proposedRouterOwners[router];
    if (_currentProposed == proposed) revert RouterPermissionsManagerLogic__proposeRouterOwner_badRouter();

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
  function acceptProposedRouterOwner(
    address router,
    address _owner,
    uint256 _delay,
    mapping(address => address) storage routerOwners,
    mapping(address => address) storage proposedRouterOwners,
    mapping(address => uint256) storage proposedRouterTimestamp
  ) external {
    // Check timestamp has passed
    if (block.timestamp - proposedRouterTimestamp[router] <= _delay)
      revert RouterPermissionsManagerLogic__acceptProposedRouterOwner_notElapsed();

    // Get current owner + proposed
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
    mapping(address => bool) storage approvedRouters,
    mapping(address => address) storage routerOwners,
    mapping(address => address) storage routerRecipients
  ) internal {
    // Sanity check: not empty
    if (router == address(0)) revert RouterPermissionsManagerLogic__setupRouter_routerEmpty();

    // Sanity check: needs approval
    if (approvedRouters[router]) revert RouterPermissionsManagerLogic__setupRouter_amountIsZero();

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
  function removeRouter(
    address router,
    mapping(address => bool) storage approvedRouters,
    mapping(address => address) storage routerOwners,
    mapping(address => address) storage routerRecipients
  ) external {
    // Sanity check: not empty
    if (router == address(0)) revert RouterPermissionsManagerLogic__removeRouter_routerEmpty();

    // Sanity check: needs removal
    if (!approvedRouters[router]) revert RouterPermissionsManagerLogic__removeRouter_notAdded();

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
  function getRouterOwner(address router, mapping(address => address) storage _routerOwners)
    external
    returns (address)
  {
    address _owner = _routerOwners[router];
    return _owner == address(0) ? router : _owner;
  }
}
