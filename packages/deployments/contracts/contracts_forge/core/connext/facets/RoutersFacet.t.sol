// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./FacetHelper.sol";
import {Deployer} from "../../../utils/Deployer.sol";
import {IConnextHandler} from "../../../../contracts/core/connext/interfaces/IConnextHandler.sol";
import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {RoutersFacet} from "../../../../contracts/core/connext/facets/RoutersFacet.sol";

// TODO: This is testing the logic conditions in the library and file should be
// refactored to reflect that, including:
// - Renaming test contract
// - Refactoring test logic (use storage on contract)
//
// Instead, this file should test the functions within `RoutersFacet` that
// are not present in the logic lib (i.e. the getters)

contract RoutersFacetTest is RoutersFacet, FacetHelper {
  // ============ Storage ============
  uint32 _domain = _originDomain;

  // router owners
  uint256 _routerKey = 2;
  address _router = vm.addr(2);
  uint256 _ownerKey = 3;
  address _owner = vm.addr(3);
  address _recipient = address(123);

  // ============ Test set up ============

  function setUp() public {
    setDefaults();

    // we are on the origin domain where local == canonical
    setAssetContext(_domain, true);

    // set the owner to this contract
    LibDiamond.setContractOwner(address(this));
  }

  // ============ setupRouter ============

  // Fail if not called by owner
  function test_RoutersFacet__setupRouter_failsIfNotOwner() public {
    vm.prank(_router);
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));
    this.setupRouter(_router, _owner, _recipient);
  }

  // Fail if adding address(0) as router
  function test_RoutersFacet__setupRouter_failsIfZeroAddress() public {
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__setupRouter_routerEmpty.selector));
    this.setupRouter(address(0), _owner, _recipient);
  }

  // Fail if adding a duplicate router
  function test_RoutersFacet__setupRouter_failsIfAlreadyApproved() public {
    this.setupRouter(_router, _owner, _recipient);

    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__setupRouter_alreadyAdded.selector));
    this.setupRouter(_router, _owner, _recipient);
  }

  // Should work
  function test_RoutersFacet__setupRouter_works() public {
    vm.expectEmit(true, true, true, true);
    emit RouterAdded(_router, address(this));
    vm.expectEmit(true, true, true, true);
    emit RouterOwnerAccepted(_router, address(0), _owner);
    vm.expectEmit(true, true, true, true);
    emit RouterRecipientSet(_router, address(0), _recipient);
    this.setupRouter(_router, _owner, _recipient);
    assertTrue(this.getRouterApproval(_router));
    assertEq(this.getRouterOwner(_router), _owner);
    assertEq(this.getRouterRecipient(_router), _recipient);
  }

  // ============ removeRouter ============

  // Fail if not called by owner
  function test_RoutersFacet__removeRouter_failsIfNotOwner() public {
    vm.prank(address(0));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));
    this.removeRouter(address(1));
  }

  // Fail if removing address(0) as router
  function test_RoutersFacet__removeRouter_failsIfZeroAddress() public {
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__removeRouter_routerEmpty.selector));
    this.removeRouter(address(0));
  }

  // Fail if removing a non-existent router
  function test_RoutersFacet__removeRouter_failsIfNotApproved() public {
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__removeRouter_notAdded.selector));
    this.removeRouter(address(1));
  }

  // Should work
  function test_RoutersFacet__removeRouter_works() public {
    this.setupRouter(address(1), address(1), address(1));

    this.removeRouter(address(1));
    assertTrue(!this.getRouterApproval(address(1)));
  }

  // ============ setRouterRecipient ============

  // Fail if owner == address(0) && msg.sender != router
  function test_RoutersFacet__setRouterRecipient_failsIfEmptyOwnerSenderNotRouter() public {
    address _router = address(1);

    vm.prank(address(2));
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__onlyRouterOwner_notRouterOwner.selector));
    this.setRouterRecipient(_router, address(0));
  }

  // Fail if owner != address(0) && msg.sender != owner
  function test_RoutersFacet__setRouterRecipient_failsIfNotOwner() public {
    address _router = address(1);
    this.setupRouter(_router, address(3), address(3));

    vm.prank(address(2));
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__onlyRouterOwner_notRouterOwner.selector));
    this.setRouterRecipient(_router, address(0));
  }

  // Fail if setting a duplicate recipient
  function test_RoutersFacet__setRouterRecipient_failsIfRecipientSet() public {
    address _router = address(1);
    this.setupRouter(_router, address(3), address(2));

    vm.prank(address(3));
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__setRouterRecipient_notNewRecipient.selector));
    this.setRouterRecipient(_router, address(2));
  }

  // Should work if owner == address(0)  && msg.sender == router
  function test_RoutersFacet__setRouterRecipient_worksIfOwnerEmpty() public {
    address _router = address(1);

    vm.prank(_router);
    this.setRouterRecipient(_router, address(2));
    assertEq(this.getRouterRecipient(_router), address(2));
  }

  // Should work if  msg.sender == owner
  function test_RoutersFacet__setRouterRecipient_worksIfOwnerSet() public {
    address _router = address(1);
    this.setupRouter(_router, address(3), address(3));

    vm.prank(address(3));
    this.setRouterRecipient(_router, address(2));
    assertEq(this.getRouterRecipient(_router), address(2));
  }

  // ============ proposeRouterOwner ============

  // Fail if propose current owner
  function test_RoutersFacet__proposeRouterOwner_failsIfAlreadyOwner() public {
    address _router = address(1);
    this.setupRouter(_router, address(3), address(3));

    vm.prank(address(3));
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__proposeRouterOwner_notNewOwner.selector));
    this.proposeRouterOwner(_router, address(3));
  }

  // Fail if proposed owner is same as the previous proposed
  function test_RoutersFacet__proposeRouterOwner_failsIfAlreadyProposed() public {
    address _router = address(1);
    this.setupRouter(_router, address(3), address(3));
    vm.prank(address(3));
    this.proposeRouterOwner(_router, address(2));

    vm.prank(address(3));
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__proposeRouterOwner_badRouter.selector));
    this.proposeRouterOwner(_router, address(2));
  }

  // Should work
  function test_RoutersFacet__proposeRouterOwner_works() public {
    address _router = address(1);
    this.setupRouter(_router, address(3), address(3));

    vm.prank(address(3));
    this.proposeRouterOwner(_router, address(2));
    assertEq(this.getProposedRouterOwner(_router), address(2));
  }

  // ============ acceptProposedRouterOwner ============

  // Fail if proposed == address(0) && (_owner != address(0) && msg.sender != router) || _owner != msg.sender
  function test_RoutersFacet__acceptProposedRouterOwner_failsIfNotOwnerWhenOwnerEmpty() public {
    address _router = address(1);

    vm.prank(address(2));
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__onlyProposedRouterOwner_notRouterOwner.selector));
    this.acceptProposedRouterOwner(_router);
  }

  // Fail if proposed == address(0) && (_owner != address(0) && msg.sender != router) || _owner != msg.sender
  function test_RoutersFacet__acceptProposedRouterOwner_failsIfNotOwnerWhenOwnerSet() public {
    address _router = address(1);
    this.setupRouter(_router, address(3), address(3));

    vm.prank(address(2));
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__onlyProposedRouterOwner_notRouterOwner.selector));
    this.acceptProposedRouterOwner(_router);
  }

  // Fail if proposed != address(0) && msg.sender != _proposed
  function test_RoutersFacet__acceptProposedRouterOwner_failsIfNotProposedWhenProposedSet() public {
    address _router = address(1);
    this.setupRouter(_router, address(this), address(3));
    this.proposeRouterOwner(_router, address(1));

    vm.prank(address(2));
    vm.expectRevert(
      abi.encodeWithSelector(RoutersFacet.RoutersFacet__onlyProposedRouterOwner_notProposedRouterOwner.selector)
    );
    this.acceptProposedRouterOwner(_router);
  }

  // Should work if proposed == address(0)  && (_owner == address(0) && msg.sender == router) || _owner != msg.sender
  function test_RoutersFacet__acceptProposedRouterOwner_worksWhenProposedAndOwnerNotSet() public {
    address _router = address(1);

    vm.prank(_router);
    this.acceptProposedRouterOwner(_router);
    assertEq(this.getRouterOwner(_router), _router);
  }

  // Should work if proposed == address(0)  &&  msg.sender == owner
  function test_RoutersFacet__acceptProposedRouterOwner_worksWhenProposedNotSet() public {
    address _router = address(1);
    this.setupRouter(_router, address(3), address(3));

    vm.prank(address(3));
    this.acceptProposedRouterOwner(_router);
    assertEq(this.getRouterOwner(_router), _router);
  }

  // Should work if proposed != address(0)  &&  msg.sender == _proposed
  function test_RoutersFacet__acceptProposedRouterOwner_worksWhenProposedIsSet() public {
    address _router = address(1);
    this.setupRouter(_router, address(this), address(3));
    this.proposeRouterOwner(_router, address(1));

    vm.prank(address(1));
    vm.warp(block.timestamp + 8 days);

    this.acceptProposedRouterOwner(_router);
    assertEq(this.getRouterOwner(_router), address(1));
  }
}
