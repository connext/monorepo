// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {ProposedOwnableFacet} from "../../../../contracts/core/connext/facets/ProposedOwnableFacet.sol";
import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";

import "../../../utils/Mock.sol";
import "../../../utils/FacetHelper.sol";

contract ProposedOwnableFacetTest is ProposedOwnableFacet, FacetHelper {
  // ============ Storage ============
  address _owner = address(123123);

  // ============ Test set up ============
  function setUp() public {
    LibDiamond.setContractOwner(_owner);
    assertEq(this.owner(), _owner);
  }

  // ============ Utils ============
  function utils_proposeRenounceRouterAndAssert() public {
    assertEq(this.routerOwnershipTimestamp(), 0);

    vm.expectEmit(true, true, true, true);
    emit RouterOwnershipRenunciationProposed(block.timestamp);

    vm.prank(this.owner());
    this.proposeRouterOwnershipRenunciation();

    assertEq(this.routerOwnershipTimestamp(), block.timestamp);
    assertTrue(!this.routerOwnershipRenounced());
    assertTrue(!this.renounced());
  }

  function utils_renounceRouterAndAssert() public {
    assertTrue(this.routerOwnershipTimestamp() != 0);

    vm.expectEmit(true, true, true, true);
    emit RouterOwnershipRenounced(true);

    vm.prank(this.owner());
    this.renounceRouterOwnership();

    assertEq(this.routerOwnershipTimestamp(), 0);
    assertTrue(this.routerOwnershipRenounced());
    assertTrue(!this.renounced());
  }

  function utils_proposeRenounceAssetAndAssert() public {
    assertEq(this.assetOwnershipTimestamp(), 0);

    vm.expectEmit(true, true, true, true);
    emit AssetOwnershipRenunciationProposed(block.timestamp);

    vm.prank(this.owner());
    this.proposeAssetOwnershipRenunciation();

    assertEq(this.assetOwnershipTimestamp(), block.timestamp);
    assertTrue(!this.assetOwnershipRenounced());
    assertTrue(!this.renounced());
  }

  function utils_renounceAssetAndAssert() public {
    assertTrue(this.assetOwnershipTimestamp() != 0);

    vm.expectEmit(true, true, true, true);
    emit AssetOwnershipRenounced(true);

    vm.prank(this.owner());
    this.renounceAssetOwnership();

    assertEq(this.assetOwnershipTimestamp(), 0);
    assertTrue(this.assetOwnershipRenounced());
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

  // ============ owner ============
  // tested in assertion functions

  // ============ routerOwnershipRenounced ============
  // tested in assertion functions

  // ============ assetOwnershipRenounced ============
  // tested in assertion functions

  // ============ proposed ============
  // tested in assertion functions

  // ============ proposedTimestamp ============
  // tested in assertion functions

  // ============ routerOwnershipTimestamp ============
  // tested in assertion functions

  // ============ assetOwnershipTimestamp ============
  // tested in assertion functions

  // ============ delay ============
  function test_ProposedOwnableFacet__delay_works() public {
    assertEq(this.delay(), 7 days);
  }

  // ============ proposeRouterOwnershipRenunciation ============
  function test_ProposedOwnableFacet__proposeRouterOwnershipRenunciation_failsIfNotOwner() public {
    vm.expectRevert(BaseConnextFacet__onlyOwner_notOwner.selector);
    this.proposeRouterOwnershipRenunciation();
  }

  function test_ProposedOwnableFacet__proposeRouterOwnershipRenunciation_failsIfAlreadyRenounced() public {
    utils_proposeRenounceRouterAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);
    utils_renounceRouterAndAssert();

    vm.expectRevert(ProposedOwnableFacet__proposeRouterOwnershipRenunciation_noOwnershipChange.selector);
    vm.prank(_owner);
    this.proposeRouterOwnershipRenunciation();
  }

  function test_ProposedOwnableFacet__proposeRouterOwnershipRenunciation_works() public {
    utils_proposeRenounceRouterAndAssert();
  }

  // ============ renounceRouterOwnership ============
  function test_ProposedOwnableFacet__renounceRouterOwnership_failsIfNotOwner() public {
    utils_proposeRenounceRouterAndAssert();
    vm.expectRevert(BaseConnextFacet__onlyOwner_notOwner.selector);
    this.renounceRouterOwnership();
  }

  function test_ProposedOwnableFacet__renounceRouterOwnership_failsIfAlreadyRenounced() public {
    utils_proposeRenounceRouterAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);
    utils_renounceRouterAndAssert();

    vm.prank(this.owner());
    vm.expectRevert(ProposedOwnableFacet__renounceRouterOwnership_noOwnershipChange.selector);
    this.renounceRouterOwnership();
  }

  function test_ProposedOwnableFacet__renounceRouterOwnership_failsIfNotProposed() public {
    vm.prank(this.owner());
    vm.expectRevert(ProposedOwnableFacet__renounceRouterOwnership_noProposal.selector);
    this.renounceRouterOwnership();
  }

  function test_ProposedOwnableFacet__renounceRouterOwnership_failsIfDelayNotElapsed() public {
    utils_proposeRenounceRouterAndAssert();
    vm.prank(this.owner());
    vm.expectRevert(ProposedOwnableFacet__renounceRouterOwnership_delayNotElapsed.selector);
    this.renounceRouterOwnership();
  }

  function test_ProposedOwnableFacet__renounceRouterOwnership_works() public {
    utils_proposeRenounceRouterAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);
    utils_renounceRouterAndAssert();
  }

  // ============ proposeAssetOwnershipRenunciation ============
  function test_ProposedOwnableFacet__proposeAssetOwnershipRenunciation_failsIfNotOwner() public {
    vm.expectRevert(BaseConnextFacet__onlyOwner_notOwner.selector);
    this.proposeAssetOwnershipRenunciation();
  }

  function test_ProposedOwnableFacet__proposeAssetOwnershipRenunciation_failsIfAlreadyRenounced() public {
    utils_proposeRenounceAssetAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);
    utils_renounceAssetAndAssert();

    vm.expectRevert(ProposedOwnableFacet__proposeAssetOwnershipRenunciation_noOwnershipChange.selector);
    vm.prank(_owner);
    this.proposeAssetOwnershipRenunciation();
  }

  function test_ProposedOwnableFacet__proposeAssetOwnershipRenunciation_works() public {
    utils_proposeRenounceAssetAndAssert();
  }

  // ============ renounceAssetOwnership ============
  function test_ProposedOwnableFacet__renounceAssetOwnership_failsIfNotOwner() public {
    utils_proposeRenounceAssetAndAssert();
    vm.expectRevert(BaseConnextFacet__onlyOwner_notOwner.selector);
    this.renounceAssetOwnership();
  }

  function test_ProposedOwnableFacet__renounceAssetOwnership_failsIfAlreadyRenounced() public {
    utils_proposeRenounceAssetAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);
    utils_renounceAssetAndAssert();

    vm.prank(this.owner());
    vm.expectRevert(ProposedOwnableFacet__renounceAssetOwnership_noOwnershipChange.selector);
    this.renounceAssetOwnership();
  }

  function test_ProposedOwnableFacet__renounceAssetOwnership_failsIfNotProposed() public {
    vm.prank(this.owner());
    vm.expectRevert(ProposedOwnableFacet__renounceAssetOwnership_noProposal.selector);
    this.renounceAssetOwnership();
  }

  function test_ProposedOwnableFacet__renounceAssetOwnership_failsIfDelayNotElapsed() public {
    utils_proposeRenounceAssetAndAssert();
    vm.prank(this.owner());
    vm.expectRevert(ProposedOwnableFacet__renounceAssetOwnership_delayNotElapsed.selector);
    this.renounceAssetOwnership();
  }

  function test_ProposedOwnableFacet__renounceAssetOwnership_works() public {
    utils_proposeRenounceAssetAndAssert();
    vm.warp(block.timestamp + this.delay() + 1);
    utils_renounceAssetAndAssert();
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
