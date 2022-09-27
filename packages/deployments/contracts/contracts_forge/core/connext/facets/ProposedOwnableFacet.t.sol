// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

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
    assertEq(this.routerWhitelistTimestamp(), 0);

    vm.expectEmit(true, true, true, true);
    emit RouterWhitelistRemovalProposed(block.timestamp);

    vm.prank(this.owner());
    this.proposeRouterWhitelistRemoval();

    assertEq(this.routerWhitelistTimestamp(), block.timestamp);
    assertTrue(!this.routerWhitelistRemoved());
    assertTrue(!this.renounced());
  }

  function utils_renounceRouterAndAssert() public {
    assertTrue(this.routerWhitelistTimestamp() != 0);

    vm.expectEmit(true, true, true, true);
    emit RouterWhitelistRemoved(true);

    vm.prank(this.owner());
    this.removeRouterWhitelist();

    assertEq(this.routerWhitelistTimestamp(), 0);
    assertTrue(this.routerWhitelistRemoved());
    assertTrue(!this.renounced());
  }

  function utils_proposeRenounceAssetAndAssert() public {
    assertEq(this.assetWhitelistTimestamp(), 0);

    vm.expectEmit(true, true, true, true);
    emit AssetWhitelistRemovalProposed(block.timestamp);

    vm.prank(this.owner());
    this.proposeAssetWhitelistRemoval();

    assertEq(this.assetWhitelistTimestamp(), block.timestamp);
    assertTrue(!this.assetWhitelistRemoved());
    assertTrue(!this.renounced());
  }

  function utils_renounceAssetAndAssert() public {
    assertTrue(this.assetWhitelistTimestamp() != 0);

    vm.expectEmit(true, true, true, true);
    emit AssetWhitelistRemoved(true);

    vm.prank(this.owner());
    this.removeAssetWhitelist();

    assertEq(this.assetWhitelistTimestamp(), 0);
    assertTrue(this.assetWhitelistRemoved());
    assertTrue(!this.renounced());
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
    bool isRenounce = _proposed == address(0);
    if (isRenounce) {
      vm.prank(current);
      this.renounceOwnership();
    } else {
      vm.prank(_proposed);
      this.acceptProposedOwner();
    }

    // Assert changes
    assertEq(this.owner(), _proposed);
    assertEq(this.proposed(), address(0));
    assertEq(this.proposedTimestamp(), 0);
    assertEq(this.renounced(), isRenounce);
  }

  function utils_transferOwnership(address _proposed) public {
    // Propose new owner
    utils_proposeNewOwnerAndAssert(_proposed);

    // Fast-forward from delay
    vm.warp(block.timestamp + 7 days + 1);

    // Accept new owner
    utils_acceptNewOwnerAndAssert(_proposed);
  }

  function utils_assignRoleRouter(address routerAgent, address caller) public {
    vm.expectEmit(true, true, true, true);
    emit AssignRoleRouter(routerAgent);
    vm.prank(caller);
    this.assignRoleRouter(routerAgent);

    if (this.queryRole(routerAgent) == Role.Router) {
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

  // ============ routerWhitelistRemoved ============
  // tested in assertion functions

  // ============ assetWhitelistRemoved ============
  // tested in assertion functions

  // ============ proposed ============
  // tested in assertion functions

  // ============ proposedTimestamp ============
  // tested in assertion functions

  // ============ routerWhitelistTimestamp ============
  // tested in assertion functions

  // ============ assetWhitelistTimestamp ============
  // tested in assertion functions

  // ============ queryRole ============
  // tested in assertion functions

  // ============ delay ============
  function test_ProposedOwnableFacet__delay_works() public {
    assertEq(this.delay(), DELAY);
  }

  // ============ proposeRouterWhitelistRemoval ============
  function test_ProposedOwnableFacet__proposeRouterWhitelistRemoval_failsIfNotOwnerOrAdmin() public {
    vm.expectRevert(BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);
    this.proposeRouterWhitelistRemoval();
  }

  function test_ProposedOwnableFacet__proposeRouterWhitelistRemoval_failsIfAlreadyRenounced() public {
    utils_proposeRenounceRouterAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);
    utils_renounceRouterAndAssert();

    vm.expectRevert(ProposedOwnableFacet__proposeRouterWhitelistRemoval_noOwnershipChange.selector);
    vm.prank(_owner);
    this.proposeRouterWhitelistRemoval();
  }

  function test_ProposedOwnableFacet__proposeRouterWhitelistRemoval_worksIfOwner() public {
    utils_proposeRenounceRouterAndAssert();
  }

  function test_ProposedOwnableFacet__proposeRouterWhitelistRemoval_worksIfAdmin() public {
    vm.prank(_owner);
    this.assignRoleAdmin(_adminAgent1);

    vm.prank(_adminAgent1);
    this.proposeRouterWhitelistRemoval();
  }

  // ============ removeRouterWhitelist ============
  function test_ProposedOwnableFacet__removeRouterWhitelist_failsIfNotOwnerOrAdmin() public {
    utils_proposeRenounceRouterAndAssert();
    vm.expectRevert(BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);
    this.removeRouterWhitelist();
  }

  function test_ProposedOwnableFacet__removeRouterWhitelist_failsIfAlreadyRenounced() public {
    utils_proposeRenounceRouterAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);
    utils_renounceRouterAndAssert();

    vm.prank(this.owner());
    vm.expectRevert(ProposedOwnableFacet__removeRouterWhitelist_noOwnershipChange.selector);
    this.removeRouterWhitelist();
  }

  function test_ProposedOwnableFacet__removeRouterWhitelist_failsIfNotProposed() public {
    vm.prank(this.owner());
    vm.expectRevert(ProposedOwnableFacet__removeRouterWhitelist_noProposal.selector);
    this.removeRouterWhitelist();
  }

  function test_ProposedOwnableFacet__removeRouterWhitelist_failsIfDelayNotElapsed() public {
    utils_proposeRenounceRouterAndAssert();
    vm.prank(this.owner());
    vm.expectRevert(ProposedOwnableFacet__removeRouterWhitelist_delayNotElapsed.selector);
    this.removeRouterWhitelist();
  }

  function test_ProposedOwnableFacet__removeRouterWhitelist_worksIfOwner() public {
    utils_proposeRenounceRouterAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);
    utils_renounceRouterAndAssert();
  }

  function test_ProposedOwnableFacet__removeRouterWhitelist_worksIfAdmin() public {
    utils_proposeRenounceRouterAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);

    vm.prank(_owner);
    this.assignRoleAdmin(_adminAgent1);

    vm.prank(_adminAgent1);
    this.removeRouterWhitelist();
  }

  // ============ proposeAssetWhitelistRemoval ============
  function test_ProposedOwnableFacet__proposeAssetWhitelistRemoval_failsIfNotOwnerOrAdmin() public {
    vm.prank(_adminAgent2);
    vm.expectRevert(BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);
    this.proposeAssetWhitelistRemoval();
  }

  function test_ProposedOwnableFacet__proposeAssetWhitelistRemoval_failsIfAlreadyRenounced() public {
    utils_proposeRenounceAssetAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);
    utils_renounceAssetAndAssert();

    vm.expectRevert(ProposedOwnableFacet__proposeAssetWhitelistRemoval_noOwnershipChange.selector);
    vm.prank(_owner);
    this.proposeAssetWhitelistRemoval();
  }

  function test_ProposedOwnableFacet__proposeAssetWhitelistRemoval_worksIfOwner() public {
    utils_proposeRenounceAssetAndAssert();
  }

  function test_ProposedOwnableFacet__proposeAssetWhitelistRemoval_worksIfAdmin() public {
    vm.prank(_owner);
    this.assignRoleAdmin(_adminAgent1);

    vm.prank(_adminAgent1);
    this.proposeAssetWhitelistRemoval();
  }

  // ============ removeAssetWhitelist ============
  function test_ProposedOwnableFacet__removeAssetWhitelist_failsIfNotOwnerOrAdmin() public {
    utils_proposeRenounceAssetAndAssert();
    vm.expectRevert(BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);
    this.removeAssetWhitelist();
  }

  function test_ProposedOwnableFacet__removeAssetWhitelist_failsIfAlreadyRenounced() public {
    utils_proposeRenounceAssetAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);
    utils_renounceAssetAndAssert();

    vm.prank(this.owner());
    vm.expectRevert(ProposedOwnableFacet__removeAssetWhitelist_noOwnershipChange.selector);
    this.removeAssetWhitelist();
  }

  function test_ProposedOwnableFacet__removeAssetWhitelist_failsIfNotProposed() public {
    vm.prank(this.owner());
    vm.expectRevert(ProposedOwnableFacet__removeAssetWhitelist_noProposal.selector);
    this.removeAssetWhitelist();
  }

  function test_ProposedOwnableFacet__removeAssetWhitelist_failsIfDelayNotElapsed() public {
    utils_proposeRenounceAssetAndAssert();
    vm.prank(this.owner());
    vm.expectRevert(ProposedOwnableFacet__removeAssetWhitelist_delayNotElapsed.selector);
    this.removeAssetWhitelist();
  }

  function test_ProposedOwnableFacet__removeAssetWhitelist_worksIfOwner() public {
    utils_proposeRenounceAssetAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);
    utils_renounceAssetAndAssert();
  }

  function test_ProposedOwnableFacet__removeAssetWhitelist_worksIfAdmin() public {
    utils_proposeRenounceAssetAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);

    vm.prank(_owner);
    this.assignRoleAdmin(_adminAgent1);

    vm.prank(_adminAgent1);
    this.removeAssetWhitelist();
  }

  // ============ renounced ============
  // tested in assertions

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

  function test_ProposedOwnableFacet__proposeNewOwner_failsIfProposingOwner() public {
    vm.expectRevert(ProposedOwnableFacet__proposeNewOwner_noOwnershipChange.selector);
    vm.prank(_owner);
    this.proposeNewOwner(_owner);
  }

  function test_ProposedOwnableFacet__proposeNewOwner_works() public {
    utils_proposeNewOwnerAndAssert(address(12));
  }

  // ============ renounceOwnership ============
  function test_ProposedOwnableFacet__renounceOwnership_failsIfNotOwner() public {
    utils_proposeNewOwnerAndAssert(address(0));

    vm.expectRevert(BaseConnextFacet__onlyOwner_notOwner.selector);
    this.renounceOwnership();
  }

  function test_ProposedOwnableFacet__renounceOwnership_failsIfNoProposal() public {
    vm.expectRevert(ProposedOwnableFacet__renounceOwnership_noProposal.selector);
    vm.prank(_owner);
    this.renounceOwnership();
  }

  function test_ProposedOwnableFacet__renounceOwnership_failsIfDelayNotElapsed() public {
    utils_proposeNewOwnerAndAssert(address(1));

    vm.prank(_owner);
    vm.expectRevert(ProposedOwnableFacet__renounceOwnership_delayNotElapsed.selector);
    this.renounceOwnership();
  }

  function test_ProposedOwnableFacet__renounceOwnership_failsIfProposedNonNull() public {
    utils_proposeNewOwnerAndAssert(address(1));
    vm.warp(block.timestamp + this.delay() + 1);

    vm.prank(_owner);
    vm.expectRevert(ProposedOwnableFacet__renounceOwnership_invalidProposal.selector);
    this.renounceOwnership();
  }

  function test_ProposedOwnableFacet__renounceOwnership_works() public {
    assertTrue(!this.renounced());

    utils_transferOwnership(address(0));
    assertTrue(this.renounced());
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

    vm.prank(proposed);
    vm.expectRevert(ProposedOwnableFacet__acceptProposedOwner_noOwnershipChange.selector);
    this.acceptProposedOwner();
  }

  function test_ProposedOwnableFacet__acceptProposedOwner_failsIfDelayNotElapsed() public {
    address proposed = address(12);
    utils_proposeNewOwnerAndAssert(proposed);

    vm.prank(proposed);
    vm.expectRevert(ProposedOwnableFacet__acceptProposedOwner_delayNotElapsed.selector);
    this.acceptProposedOwner();
  }

  function test_ProposedOwnableFacet__acceptProposedOwner_works() public {
    utils_transferOwnership(address(12));
  }

  // ============ assignRoleRouter ============
  function test_ProposedOwnableFacet__assignRoleRouter_failsIfNotOwnerOrAdmin() public {
    vm.prank(_routerAgent2);
    vm.expectRevert(BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);
    this.assignRoleRouter(_routerAgent1);
  }

  function test_ProposedOwnableFacet__assignRoleRouter_failsIfAlreadyAdded() public {
    utils_assignRoleRouter(_routerAgent1, _owner);

    vm.prank(_owner);
    vm.expectRevert(ProposedOwnableFacet__assignRoleRouter_invalidInput.selector);
    this.assignRoleRouter(_routerAgent1);
  }

  function test_ProposedOwnableFacet__assignRoleRouter_failsIfInputAddressZero() public {
    vm.prank(_owner);
    vm.expectRevert(ProposedOwnableFacet__assignRoleRouter_invalidInput.selector);
    this.assignRoleRouter(address(0));
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
