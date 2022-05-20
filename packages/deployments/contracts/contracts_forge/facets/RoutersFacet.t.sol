// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../utils/ForgeHelper.sol";

import {Deployer} from "../utils/Deployer.sol";
import {IConnextHandler} from "../../contracts/interfaces/IConnextHandler.sol";

import {BaseConnextFacet} from "../../contracts/facets/BaseConnextFacet.sol";
import {RoutersFacet} from "../../contracts/facets/RoutersFacet.sol";

// TODO: This is testing the logic conditions in the library and file should be
// refactored to reflect that, including:
// - Renaming test contract
// - Refactoring test logic (use storage on contract)
//
// Instead, this file should test the functions within `RouterPermissionsManager` that
// are not present in the logic lib (i.e. the getters)

contract RoutersFacetTest is ForgeHelper, Deployer {
  // ============ Libraries ============
  using stdStorage for StdStorage;

  // ============ Storage ============
  uint256 domain = 1;
  address bridgeRouter = address(1);
  address tokenRegistry = address(2);
  address wrapper = address(3);
  address relayerFeeRouter = address(4);
  address xAppConnectionManager = address(5);
  address promiseRouter = address(6);

  // ============ Test set up ============

  function setUp() public {
    deployConnext(domain, xAppConnectionManager, tokenRegistry, wrapper, relayerFeeRouter, payable(promiseRouter));
  }

  // ============ setupRouter ============

  // Fail if not called by owner
  function test_RouterPermissionsManager__setupRouter_failsIfNotOwner() public {
    vm.prank(address(0));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));
    IConnextHandler(address(connextDiamondProxy)).setupRouter(address(1), address(0), address(0));
  }

  // Fail if adding address(0) as router
  function test_RouterPermissionsManager__setupRouter_failsIfZeroAddress() public {
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__setupRouter_routerEmpty.selector));
    IConnextHandler(address(connextDiamondProxy)).setupRouter(address(0), address(0), address(0));
  }

  // Fail if adding a duplicate router
  function test_RouterPermissionsManager__setupRouter_failsIfAlreadyApproved() public {
    IConnextHandler(address(connextDiamondProxy)).setupRouter(address(1), address(0), address(0));

    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__setupRouter_alreadyAdded.selector));
    IConnextHandler(address(connextDiamondProxy)).setupRouter(address(1), address(0), address(0));
  }

  // Should work

  function test_RouterPermissionsManager__setupRouter_works() public {
    IConnextHandler(address(connextDiamondProxy)).setupRouter(address(1), address(2), address(3));
    assertTrue(IConnextHandler(address(connextDiamondProxy)).getRouterApproval(address(1)));
    assertEq(IConnextHandler(address(connextDiamondProxy)).getRouterOwner(address(1)), address(2));
    assertEq(IConnextHandler(address(connextDiamondProxy)).getRouterRecipient(address(1)), address(3));
  }

  // ============ removeRouter ============

  // Fail if not called by owner
  function test_RouterPermissionsManager__removeRouter_failsIfNotOwner() public {
    vm.prank(address(0));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));
    IConnextHandler(address(connextDiamondProxy)).removeRouter(address(1));
  }

  // Fail if removing address(0) as router
  function test_RouterPermissionsManager__removeRouter_failsIfZeroAddress() public {
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__removeRouter_routerEmpty.selector));
    IConnextHandler(address(connextDiamondProxy)).removeRouter(address(0));
  }

  // Fail if removing a non-existent router
  function test_RouterPermissionsManager__removeRouter_failsIfNotApproved() public {
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__removeRouter_notAdded.selector));
    IConnextHandler(address(connextDiamondProxy)).removeRouter(address(1));
  }

  // Should work
  function test_RouterPermissionsManager__removeRouter_works() public {
    IConnextHandler(address(connextDiamondProxy)).setupRouter(address(1), address(1), address(1));

    IConnextHandler(address(connextDiamondProxy)).removeRouter(address(1));
    assertTrue(!IConnextHandler(address(connextDiamondProxy)).getRouterApproval(address(1)));
  }

  // ============ setRouterRecipient ============

  // Fail if owner == address(0) && msg.sender != router
  function test_RouterPermissionsManager__setRouterRecipient_failsIfEmptyOwnerSenderNotRouter() public {
    address _router = address(1);

    vm.prank(address(2));
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__onlyRouterOwner_notRouterOwner.selector));
    IConnextHandler(address(connextDiamondProxy)).setRouterRecipient(_router, address(0));
  }

  // Fail if owner != address(0) && msg.sender != owner
  function test_RouterPermissionsManager__setRouterRecipient_failsIfNotOwner() public {
    address _router = address(1);
    IConnextHandler(address(connextDiamondProxy)).setupRouter(_router, address(3), address(3));

    vm.prank(address(2));
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__onlyRouterOwner_notRouterOwner.selector));
    IConnextHandler(address(connextDiamondProxy)).setRouterRecipient(_router, address(0));
  }

  // Fail if setting a duplicate recipient
  function test_RouterPermissionsManager__setRouterRecipient_failsIfRecipientSet() public {
    address _router = address(1);
    IConnextHandler(address(connextDiamondProxy)).setupRouter(_router, address(3), address(2));

    vm.prank(address(3));
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__setRouterRecipient_notNewRecipient.selector));
    IConnextHandler(address(connextDiamondProxy)).setRouterRecipient(_router, address(2));
  }

  // Should work if owner == address(0)  && msg.sender == router
  function test_RouterPermissionsManager__setRouterRecipient_worksIfOwnerEmpty() public {
    address _router = address(1);

    vm.prank(_router);
    IConnextHandler(address(connextDiamondProxy)).setRouterRecipient(_router, address(2));
    assertEq(IConnextHandler(address(connextDiamondProxy)).getRouterRecipient(_router), address(2));
  }

  // Should work if  msg.sender == owner
  function test_RouterPermissionsManager__setRouterRecipient_worksIfOwnerSet() public {
    address _router = address(1);
    IConnextHandler(address(connextDiamondProxy)).setupRouter(_router, address(3), address(3));

    vm.prank(address(3));
    IConnextHandler(address(connextDiamondProxy)).setRouterRecipient(_router, address(2));
    assertEq(IConnextHandler(address(connextDiamondProxy)).getRouterRecipient(_router), address(2));
  }

  // ============ proposeRouterOwner ============

  // Fail if propose current owner
  function test_RouterPermissionsManager__proposeRouterOwner_failsIfAlreadyOwner() public {
    address _router = address(1);
    IConnextHandler(address(connextDiamondProxy)).setupRouter(_router, address(3), address(3));

    vm.prank(address(3));
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__proposeRouterOwner_notNewOwner.selector));
    IConnextHandler(address(connextDiamondProxy)).proposeRouterOwner(_router, address(3));
  }

  // Fail if proposed owner is same as the previous proposed
  function test_RouterPermissionsManager__proposeRouterOwner_failsIfAlreadyProposed() public {
    address _router = address(1);
    IConnextHandler(address(connextDiamondProxy)).setupRouter(_router, address(3), address(3));
    vm.prank(address(3));
    IConnextHandler(address(connextDiamondProxy)).proposeRouterOwner(_router, address(2));

    vm.prank(address(3));
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__proposeRouterOwner_badRouter.selector));
    IConnextHandler(address(connextDiamondProxy)).proposeRouterOwner(_router, address(2));
  }

  // Should work
  function test_RouterPermissionsManager__proposeRouterOwner_works() public {
    address _router = address(1);
    IConnextHandler(address(connextDiamondProxy)).setupRouter(_router, address(3), address(3));

    vm.prank(address(3));
    IConnextHandler(address(connextDiamondProxy)).proposeRouterOwner(_router, address(2));
    assertEq(IConnextHandler(address(connextDiamondProxy)).getProposedRouterOwner(_router), address(2));
  }

  // ============ acceptProposedRouterOwner ============

  // Fail if proposed == address(0) && (_owner != address(0) && msg.sender != router) || _owner != msg.sender
  function test_RouterPermissionsManager__acceptProposedRouterOwner_failsIfNotOwnerWhenOwnerEmpty() public {
    address _router = address(1);

    vm.prank(address(2));
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__onlyProposedRouterOwner_notRouterOwner.selector));
    IConnextHandler(address(connextDiamondProxy)).acceptProposedRouterOwner(_router);
  }

  // Fail if proposed == address(0) && (_owner != address(0) && msg.sender != router) || _owner != msg.sender
  function test_RouterPermissionsManager__acceptProposedRouterOwner_failsIfNotOwnerWhenOwnerSet() public {
    address _router = address(1);
    IConnextHandler(address(connextDiamondProxy)).setupRouter(_router, address(3), address(3));

    vm.prank(address(2));
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__onlyProposedRouterOwner_notRouterOwner.selector));
    IConnextHandler(address(connextDiamondProxy)).acceptProposedRouterOwner(_router);
  }

  // Fail if proposed != address(0) && msg.sender != _proposed
  function test_RouterPermissionsManager__acceptProposedRouterOwner_failsIfNotProposedWhenProposedSet() public {
    address _router = address(1);
    IConnextHandler(address(connextDiamondProxy)).setupRouter(_router, address(this), address(3));
    IConnextHandler(address(connextDiamondProxy)).proposeRouterOwner(_router, address(1));

    vm.prank(address(2));
    vm.expectRevert(
      abi.encodeWithSelector(RoutersFacet.RoutersFacet__onlyProposedRouterOwner_notProposedRouterOwner.selector)
    );
    IConnextHandler(address(connextDiamondProxy)).acceptProposedRouterOwner(_router);
  }

  // Should work if proposed == address(0)  && (_owner == address(0) && msg.sender == router) || _owner != msg.sender
  function test_RouterPermissionsManager__acceptProposedRouterOwner_worksWhenProposedAndOwnerNotSet() public {
    address _router = address(1);

    vm.prank(_router);
    IConnextHandler(address(connextDiamondProxy)).acceptProposedRouterOwner(_router);
    assertEq(IConnextHandler(address(connextDiamondProxy)).getRouterOwner(_router), _router);
  }

  // Should work if proposed == address(0)  &&  msg.sender == owner
  function test_RouterPermissionsManager__acceptProposedRouterOwner_worksWhenProposedNotSet() public {
    address _router = address(1);
    IConnextHandler(address(connextDiamondProxy)).setupRouter(_router, address(3), address(3));

    vm.prank(address(3));
    IConnextHandler(address(connextDiamondProxy)).acceptProposedRouterOwner(_router);
    assertEq(IConnextHandler(address(connextDiamondProxy)).getRouterOwner(_router), _router);
  }

  // Should work if proposed != address(0)  &&  msg.sender == _proposed
  function test_RouterPermissionsManager__acceptProposedRouterOwner_worksWhenProposedIsSet() public {
    address _router = address(1);
    IConnextHandler(address(connextDiamondProxy)).setupRouter(_router, address(this), address(3));
    IConnextHandler(address(connextDiamondProxy)).proposeRouterOwner(_router, address(1));

    vm.prank(address(1));
    vm.warp(block.timestamp + 8 days);

    IConnextHandler(address(connextDiamondProxy)).acceptProposedRouterOwner(_router);
    assertEq(IConnextHandler(address(connextDiamondProxy)).getRouterOwner(_router), address(1));
  }
}
