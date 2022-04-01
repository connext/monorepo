// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {RouterPermissionsManagerLogic} from "./lib/logic/RouterPermissionsManagerLogic.sol";

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
  function setRouterRecipient(address router, address recipient) external{
    RouterPermissionsManagerLogic.onlyRouterOwner(router, routerOwners[router]);

    RouterPermissionsManagerLogic.setRouterRecipient(router, recipient, routerRecipients);
  }

  /**
   * @notice Current owner or router may propose a new router owner
   * @param router Router address to set recipient
   * @param proposed Proposed owner Address to set to router
   */
  function proposeRouterOwner(address router, address proposed) external {
    RouterPermissionsManagerLogic.onlyRouterOwner(router, routerOwners[router]);

    RouterPermissionsManagerLogic.proposeRouterOwner(
      router,
      proposed,
      RouterPermissionsManagerLogic.getRouterOwner(router, routerOwners),
      proposedRouterOwners,
      proposedRouterTimestamp
    );

  }

  /**
   * @notice New router owner must accept role, or previous if proposed is 0x0
   * @param router Router address to set recipient
   */
  function acceptProposedRouterOwner(address router) external {
    RouterPermissionsManagerLogic.onlyProposedRouterOwner(router, routerOwners[router], proposedRouterOwners[router]);

    RouterPermissionsManagerLogic.acceptProposedRouterOwner(
      router,
      RouterPermissionsManagerLogic.getRouterOwner(router, routerOwners),
      _delay,
      routerOwners,
      proposedRouterOwners,
      proposedRouterTimestamp
    );
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
    RouterPermissionsManagerLogic.setupRouter(router, owner, recipient, approvedRouters, routerOwners, routerRecipients);
  }

  /**
   * @notice Used to remove routers that can transact crosschain
   * @param router Router address to remove
   */
  function _removeRouter(address router) internal {
    RouterPermissionsManagerLogic.removeRouter(router, approvedRouters, routerOwners, routerRecipients);
  }
}
