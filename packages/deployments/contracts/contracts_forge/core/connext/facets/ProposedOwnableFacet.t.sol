// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {ProposedOwnableFacet} from "../../../../contracts/core/connext/facets/ProposedOwnableFacet.sol";
import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {Role} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";

import "../../../utils/Mock.sol";
import "../../../utils/FacetHelper.sol";

contract ProposedOwnableFacetTest is ProposedOwnableFacet, FacetHelper {
  // ============ Storage ============
  address _owner = address(123123);
  uint256 DELAY = 6 days;

  address _routerAgent1 = address(222001111);
  address _routerAgent2 = address(222002111);

  address _adminAgent1 = address(222001222);
  address _adminAgent2 = address(222002222);

  address _watcherAgent1 = address(222001333);

  // ============ Test set up ============
  function setUp() public {
    LibDiamond.setContractOwner(_owner);
    assertEq(this.owner(), _owner);
    vm.mockCall(address(this), abi.encodeWithSelector(this.delay.selector), abi.encode(DELAY));
  }

  // ============ Utils ============
  function utils_proposeRenounceRouterAndAssert() public {
    assertEq(this.routerAllowlistTimestamp(), 0);

    vm.expectEmit(true, true, true, true);
    emit RouterAllowlistRemovalProposed(block.timestamp);

    vm.prank(this.owner());
    this.proposeRouterAllowlistRemoval();

    assertEq(this.routerAllowlistTimestamp(), block.timestamp);
    assertTrue(!this.routerAllowlistRemoved());
  }

  function utils_renounceRouterAndAssert() public {
    assertTrue(this.routerAllowlistTimestamp() != 0);

    vm.expectEmit(true, true, true, true);
    emit RouterAllowlistRemoved(true);

    vm.prank(this.owner());
    this.removeRouterAllowlist();

    assertEq(this.routerAllowlistTimestamp(), 0);
    assertTrue(this.routerAllowlistRemoved());
  }

  function utils_proposeNewOwnerAndAssert(address _proposed) public {
    // Assert change
    address current = this.owner();
    assertTrue(_proposed != current);

    // Assert event
    vm.expectEmit(true, true, true, true);
    emit OwnershipProposed(_proposed);

    // Call
    vm.prank(current);
    this.proposeNewOwner(_proposed);

    // Assert changes
    assertEq(this.owner(), current);
    assertEq(this.proposed(), _proposed);
    assertEq(this.proposedTimestamp(), block.timestamp);
  }

  function utils_acceptNewOwnerAndAssert(address _proposed) public {
    // Assert change
    address current = this.owner();
    assertTrue(_proposed != current);

    // Assert event
    vm.expectEmit(true, true, true, true);
    emit OwnershipTransferred(current, _proposed);

    // Call
    vm.prank(_proposed);
    this.acceptProposedOwner();

    // Assert changes
    assertEq(this.owner(), _proposed);
    assertEq(this.proposed(), address(0));
    assertEq(this.proposedTimestamp(), 0);
  }

  function utils_transferOwnership(address _proposed) public {
    // Propose new owner
    utils_proposeNewOwnerAndAssert(_proposed);

    // Fast-forward from delay
    vm.warp(block.timestamp + 7 days + 1);

    // Accept new owner
    utils_acceptNewOwnerAndAssert(_proposed);
  }

  function utils_revokeRole(address agent, address caller) public {
    Role revokedRole = this.queryRole(agent);

    vm.expectEmit(true, true, true, true);
    emit RevokeRole(agent, revokedRole);
    vm.prank(caller);
    this.revokeRole(agent);

    if (this.queryRole(agent) == Role.None) {
      assertTrue(true);
    } else {
      assertTrue(false);
    }
  }

  function utils_assignRoleRouter(address routerAgent, address caller) public {
    vm.expectEmit(true, true, true, true);
    emit AssignRoleRouter(routerAgent);
    vm.prank(caller);
    this.assignRoleRouterAdmin(routerAgent);

    if (this.queryRole(routerAgent) == Role.RouterAdmin) {
      assertTrue(true);
    } else {
      assertTrue(false);
    }
  }

  function utils_assignRoleWatcher(address watcherAgent, address caller) public {
    vm.expectEmit(true, true, true, true);
    emit AssignRoleWatcher(watcherAgent);
    vm.prank(caller);
    this.assignRoleWatcher(watcherAgent);

    if (this.queryRole(watcherAgent) == Role.Watcher) {
      assertTrue(true);
    } else {
      assertTrue(false);
    }
  }

  function utils_assignRoleAdmin(address adminAgent, address caller) public {
    vm.expectEmit(true, true, true, true);
    emit AssignRoleAdmin(adminAgent);
    vm.prank(caller);
    this.assignRoleAdmin(adminAgent);

    if (this.queryRole(adminAgent) == Role.Admin) {
      assertTrue(true);
    } else {
      assertTrue(false);
    }
  }

  // ============ owner ============
  // tested in assertion functions

  // ============ routerAllowlistRemoved ============
  // tested in assertion functions

  // ============ proposed ============
  // tested in assertion functions

  // ============ proposedTimestamp ============
  // tested in assertion functions

  // ============ routerAllowlistTimestamp ============
  // tested in assertion functions

  // ============ queryRole ============
  // tested in assertion functions

  // ============ delay ============
  function test_ProposedOwnableFacet__delay_works() public {
    assertEq(this.delay(), DELAY);
  }

  // ============ proposeRouterAllowlistRemoval ============
  function test_ProposedOwnableFacet__proposeRouterAllowlistRemoval_failsIfNotOwnerOrAdmin() public {
    vm.expectRevert(BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);
    this.proposeRouterAllowlistRemoval();
  }

  function test_ProposedOwnableFacet__proposeRouterAllowlistRemoval_failsIfAlreadyRenounced() public {
    utils_proposeRenounceRouterAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);
    utils_renounceRouterAndAssert();

    vm.expectRevert(ProposedOwnableFacet__proposeRouterAllowlistRemoval_noOwnershipChange.selector);
    vm.prank(_owner);
    this.proposeRouterAllowlistRemoval();
  }

  function test_ProposedOwnableFacet__proposeRouterAllowlistRemoval_worksIfOwner() public {
    utils_proposeRenounceRouterAndAssert();
  }

  function test_ProposedOwnableFacet__proposeRouterAllowlistRemoval_worksIfAdmin() public {
    vm.prank(_owner);
    this.assignRoleAdmin(_adminAgent1);

    vm.prank(_adminAgent1);
    this.proposeRouterAllowlistRemoval();
  }

  // ============ removeRouterAllowlist ============
  function test_ProposedOwnableFacet__removeRouterAllowlist_failsIfNotOwnerOrAdmin() public {
    utils_proposeRenounceRouterAndAssert();
    vm.expectRevert(BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);
    this.removeRouterAllowlist();
  }

  function test_ProposedOwnableFacet__removeRouterAllowlist_failsIfAlreadyRenounced() public {
    utils_proposeRenounceRouterAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);
    utils_renounceRouterAndAssert();

    vm.prank(this.owner());
    vm.expectRevert(ProposedOwnableFacet__removeRouterAllowlist_noOwnershipChange.selector);
    this.removeRouterAllowlist();
  }

  function test_ProposedOwnableFacet__removeRouterAllowlist_failsIfNotProposed() public {
    vm.prank(this.owner());
    vm.expectRevert(ProposedOwnableFacet__removeRouterAllowlist_noProposal.selector);
    this.removeRouterAllowlist();
  }

  function test_ProposedOwnableFacet__removeRouterAllowlist_failsIfDelayNotElapsed() public {
    utils_proposeRenounceRouterAndAssert();
    vm.prank(this.owner());
    vm.expectRevert(ProposedOwnableFacet__delayElapsed_delayNotElapsed.selector);
    this.removeRouterAllowlist();
  }

  function test_ProposedOwnableFacet__removeRouterAllowlist_worksIfOwner() public {
    utils_proposeRenounceRouterAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);
    utils_renounceRouterAndAssert();
  }

  function test_ProposedOwnableFacet__removeRouterAllowlist_worksIfAdmin() public {
    utils_proposeRenounceRouterAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);

    vm.prank(_owner);
    this.assignRoleAdmin(_adminAgent1);

    vm.prank(_adminAgent1);
    this.removeRouterAllowlist();
  }

  // ============ proposeNewOwner ============
  function test_ProposedOwnableFacet__proposeNewOwner_failsIfNotOwner() public {
    vm.expectRevert(BaseConnextFacet__onlyOwner_notOwner.selector);
    this.proposeNewOwner(address(12));
  }

  function test_ProposedOwnableFacet__proposeNewOwner_failsIfNoChange() public {
    utils_proposeNewOwnerAndAssert(address(12));

    vm.expectRevert(ProposedOwnableFacet__proposeNewOwner_invalidProposal.selector);
    vm.prank(_owner);
    this.proposeNewOwner(address(12));
  }

  function test_ProposedOwnableFacet__proposeNewOwner_failsIfEmptyOwner() public {
    vm.expectRevert(ProposedOwnableFacet__proposeNewOwner_invalidProposal.selector);
    vm.prank(_owner);
    this.proposeNewOwner(address(0));
  }

  function test_ProposedOwnableFacet__proposeNewOwner_failsIfProposingOwner() public {
    vm.expectRevert(ProposedOwnableFacet__proposeNewOwner_noOwnershipChange.selector);
    vm.prank(_owner);
    this.proposeNewOwner(_owner);
  }

  function test_ProposedOwnableFacet__proposeNewOwner_works() public {
    utils_proposeNewOwnerAndAssert(address(12));
  }

  // ============ acceptProposedOwner ============
  function test_ProposedOwnableFacet__acceptProposedOwner_failsIfNotProposed() public {
    address proposed = address(12);
    utils_proposeNewOwnerAndAssert(proposed);

    vm.expectRevert(BaseConnextFacet__onlyProposed_notProposedOwner.selector);
    this.acceptProposedOwner();
  }

  function test_ProposedOwnableFacet__acceptProposedOwner_failsIfProposedIsOwner() public {
    address proposed = address(12);
    utils_proposeNewOwnerAndAssert(proposed);

    LibDiamond.setContractOwner(proposed);
    // Fast-forward from delay
    vm.warp(block.timestamp + 7 days + 1);

    vm.prank(proposed);
    vm.expectRevert(ProposedOwnableFacet__acceptProposedOwner_noOwnershipChange.selector);
    this.acceptProposedOwner();
  }

  function test_ProposedOwnableFacet__acceptProposedOwner_failsIfDelayNotElapsed() public {
    address proposed = address(12);
    utils_proposeNewOwnerAndAssert(proposed);

    vm.prank(proposed);
    vm.expectRevert(ProposedOwnableFacet__delayElapsed_delayNotElapsed.selector);
    this.acceptProposedOwner();
  }

  function test_ProposedOwnableFacet__acceptProposedOwner_works() public {
    utils_transferOwnership(address(12));
  }

  // ============ revokeRole ============
  function test_ProposedOwnableFacet__revokeRole_failsIfNotOwnerOrAdmin() public {
    vm.prank(_routerAgent2);
    vm.expectRevert(BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);
    this.revokeRole(_routerAgent1);
  }

  function test_ProposedOwnableFacet__revokeRole_failsIfAlreadyRevoked() public {
    utils_assignRoleRouter(_routerAgent1, _owner);
    utils_revokeRole(_routerAgent1, _owner);

    vm.prank(_owner);
    vm.expectRevert(ProposedOwnableFacet__revokeRole_invalidInput.selector);
    this.revokeRole(_routerAgent1);
  }

  function test_ProposedOwnableFacet__revokeRole_failsIfInputAddressZero() public {
    vm.prank(_owner);
    vm.expectRevert(ProposedOwnableFacet__revokeRole_invalidInput.selector);
    this.revokeRole(address(0));
  }

  function test_ProposedOwnableFacet__revokeRole_worksIfCallerIsOwner() public {
    utils_assignRoleRouter(_routerAgent1, _owner);
    utils_revokeRole(_routerAgent1, _owner);
  }

  function test_ProposedOwnableFacet__revokeRole_worksIfCallerIsAdmin() public {
    utils_assignRoleRouter(_routerAgent1, _owner);
    utils_assignRoleAdmin(_adminAgent1, _owner);

    utils_revokeRole(_routerAgent1, _adminAgent1);
  }

  // ============ assignRoleRouterAdmin ============
  function test_ProposedOwnableFacet__assignRoleRouter_failsIfNotOwnerOrAdmin() public {
    vm.prank(_routerAgent2);
    vm.expectRevert(BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);
    this.assignRoleRouterAdmin(_routerAgent1);
  }

  function test_ProposedOwnableFacet__assignRoleRouter_failsIfAlreadyAdded() public {
    utils_assignRoleRouter(_routerAgent1, _owner);

    vm.prank(_owner);
    vm.expectRevert(ProposedOwnableFacet__assignRoleRouter_invalidInput.selector);
    this.assignRoleRouterAdmin(_routerAgent1);
  }

  function test_ProposedOwnableFacet__assignRoleRouter_failsIfInputAddressZero() public {
    vm.prank(_owner);
    vm.expectRevert(ProposedOwnableFacet__assignRoleRouter_invalidInput.selector);
    this.assignRoleRouterAdmin(address(0));
  }

  function test_ProposedOwnableFacet__assignRoleRouter_worksIfCallerIsOwner() public {
    utils_assignRoleRouter(_routerAgent1, _owner);
  }

  function test_ProposedOwnableFacet__assignRoleRouter_worksIfCallerIsAdmin() public {
    utils_assignRoleAdmin(_adminAgent1, _owner);

    utils_assignRoleRouter(_routerAgent2, _adminAgent1);
  }

  // ============ assignRoleWatcher ============
  function test_ProposedOwnableFacet__assignRoleWatcher_failsIfNotOwnerOrAdmin() public {
    vm.prank(_watcherAgent1);
    vm.expectRevert(BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);
    this.assignRoleWatcher(_watcherAgent1);
  }

  function test_ProposedOwnableFacet__assignRoleWatcher_failsIfAlreadyAdded() public {
    utils_assignRoleWatcher(_watcherAgent1, _owner);

    vm.prank(_owner);
    vm.expectRevert(ProposedOwnableFacet__assignRoleWatcher_invalidInput.selector);
    this.assignRoleWatcher(_watcherAgent1);
  }

  function test_ProposedOwnableFacet__assignRoleWatcher_failsIfInputAddressZero() public {
    utils_assignRoleWatcher(_watcherAgent1, _owner);

    vm.prank(_owner);
    vm.expectRevert(ProposedOwnableFacet__assignRoleWatcher_invalidInput.selector);
    this.assignRoleWatcher(address(0));
  }

  function test_ProposedOwnableFacet__assignRoleWatcher_worksIfCallerIsOwner() public {
    utils_assignRoleWatcher(_watcherAgent1, _owner);
  }

  function test_ProposedOwnableFacet__assignRoleWatcher_worksIfCallerIsAdmin() public {
    utils_assignRoleAdmin(_adminAgent1, _owner);

    utils_assignRoleWatcher(_watcherAgent1, _adminAgent1);
  }

  // ============ assignRoleAdmin ============
  function test_ProposedOwnableFacet__assignRoleAdmin_failsIfNotOwnerOrAdmin() public {
    vm.prank(_adminAgent1);
    vm.expectRevert(BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);
    this.assignRoleAdmin(_adminAgent1);
  }

  function test_ProposedOwnableFacet__assignRoleAdmin_failsIfAlreadyAdded() public {
    utils_assignRoleAdmin(_adminAgent1, _owner);

    vm.prank(_owner);
    vm.expectRevert(ProposedOwnableFacet__assignRoleAdmin_invalidInput.selector);
    this.assignRoleAdmin(_adminAgent1);
  }

  function test_ProposedOwnableFacet__assignRoleAdmin_failsIfInputAddressZero() public {
    utils_assignRoleAdmin(_adminAgent1, _owner);

    vm.prank(_owner);
    vm.expectRevert(ProposedOwnableFacet__assignRoleAdmin_invalidInput.selector);
    this.assignRoleAdmin(address(0));
  }

  function test_ProposedOwnableFacet__assignRoleAdmin_worksIfCallerIsOwner() public {
    utils_assignRoleAdmin(_adminAgent1, _owner);
  }

  function test_ProposedOwnableFacet__assignRoleAdmin_worksIfCallerIsAdmin() public {
    utils_assignRoleAdmin(_adminAgent1, _owner);

    utils_assignRoleAdmin(_adminAgent2, _adminAgent1);
  }

  // ============ pause ============
  function test_ProposedOwnableFacet__pause_works() public {
    assertTrue(!s._paused);
    vm.prank(_owner);

    vm.expectEmit(true, true, true, true);
    emit Paused();

    this.pause();

    assertTrue(s._paused);
  }

  // ============ unpause ============
  function test_ProposedOwnableFacet__unpause_works() public {
    vm.prank(_owner);
    this.pause();

    assertTrue(s._paused);
    vm.prank(_owner);

    vm.expectEmit(true, true, true, true);
    emit Unpaused();

    this.unpause();

    assertTrue(!s._paused);
  }
}
