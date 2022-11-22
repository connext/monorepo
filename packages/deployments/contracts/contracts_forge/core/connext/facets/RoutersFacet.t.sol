// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {IStableSwap} from "../../../../contracts/core/connext/interfaces/IStableSwap.sol";
import {RoutersFacet, BaseConnextFacet} from "../../../../contracts/core/connext/facets/RoutersFacet.sol";
import {TestERC20} from "../../../../contracts/test/TestERC20.sol";

import "../../../utils/FacetHelper.sol";

contract RoutersFacetTest is RoutersFacet, FacetHelper {
  // ============ storage ============
  // owner
  address _owner = address(12345);

  // sample data
  uint32 _domain = _originDomain;

  address _routerAgent0 = address(222000111); // 0x000000000000000000000000000000000d3b73ef
  address _routerRecipient0 = address(222000222); // 0x000000000000000000000000000000000d3b745e
  address _routerOwner0 = address(222000333); // 0x000000000000000000000000000000000d3b74cd

  address _routerAgent1 = address(222001111);
  address _routerRecipient1 = address(222001222);
  address _routerOwner1 = address(222001333);

  address _routerAgent2 = address(222002111);
  address _routerRecipient2 = address(222002222);
  address _routerOwner2 = address(222002333);

  address _asset0 = address(333000111);
  address _asset1 = address(333001111);

  bytes32 _key;

  // ============ Test set up ============
  function setUp() public {
    setOwner(_owner);
    utils_deployAssetContracts();
    utils_setupAsset(true, false);
    _key = keccak256(abi.encode(_canonicalId, _canonicalDomain));
  }

  // ============ Utils ==============
  // Set diamond storage owner
  function setOwner(address owner) internal {
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    ds.contractOwner = owner;
  }

  // ============ Test methods ============

  // TODO: test modifiers? onlyRouterOwner, onlyProposedRouterOwner, etc.

  // ============ Getters ==============

  function test_RoutersFacet__LIQUIDITY_FEE_NUMERATOR_success() public {
    assertEq(this.LIQUIDITY_FEE_NUMERATOR(), s.LIQUIDITY_FEE_NUMERATOR);
  }

  function test_RoutersFacet__LIQUIDITY_FEE_NUMERATOR_notFound() public {
    assertEq(this.LIQUIDITY_FEE_NUMERATOR(), 0);
  }

  function test_RoutersFacet__LIQUIDITY_FEE_DENOMINATOR_success() public {
    assertEq(this.LIQUIDITY_FEE_DENOMINATOR(), 10_000);
  }

  function test_RoutersFacet__getRouterApproval_success() public {
    s.routerConfigs[_routerAgent0].approved = true;
    assertEq(this.getRouterApproval(_routerAgent0), true);
  }

  function test_RoutersFacet__getRouterApproval_notFound() public {
    assertEq(this.getRouterApproval(_routerAgent0), false);
  }

  function test_RoutersFacet__getRouterRecipient_success() public {
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;
    assertEq(this.getRouterRecipient(_routerAgent0), _routerRecipient0);
  }

  function test_RoutersFacet__getRouterRecipient_notFound() public {
    assertEq(this.getRouterRecipient(_routerAgent0), address(0));
  }

  function test_RoutersFacet__getRouterOwner_success() public {
    s.routerConfigs[_routerAgent0].owner = _routerOwner0;
    assertEq(this.getRouterOwner(_routerAgent0), _routerOwner0);
  }

  function test_RoutersFacet__getRouterOwner_notFound() public {
    assertEq(s.routerConfigs[_routerAgent0].owner, address(0));
    assertEq(this.getRouterOwner(_routerAgent0), address(0));
  }

  function test_RoutersFacet__getProposedRouterOwner_success() public {
    s.routerConfigs[_routerAgent0].proposed = _routerOwner0;
    assertEq(this.getProposedRouterOwner(_routerAgent0), _routerOwner0);
  }

  function test_RoutersFacet__getProposedRouterOwner_notFound() public {
    assertEq(this.getProposedRouterOwner(_routerAgent0), address(0));
  }

  function test_RoutersFacet__getProposedRouterOwnerTimestamp() public {
    s.routerConfigs[_routerAgent0].proposedTimestamp = 12345;
    assertEq(this.getProposedRouterOwnerTimestamp(_routerAgent0), 12345);
  }

  function test_RoutersFacet__maxRoutersPerTransfer_success() public {
    s.maxRoutersPerTransfer = 12345;
    assertEq(this.maxRoutersPerTransfer(), 12345);
  }

  function test_RoutersFacet__maxRoutersPerTransfer_notFound() public {
    assertEq(this.maxRoutersPerTransfer(), 0);
  }

  function test_RoutersFacet__routerBalances_success() public {
    s.routerBalances[_routerAgent0][_asset0] = 12345;
    s.routerBalances[_routerAgent0][_asset1] = 5678;
    assertEq(this.routerBalances(_routerAgent0, _asset0), 12345);
    assertEq(this.routerBalances(_routerAgent0, _asset1), 5678);
  }

  function test_RoutersFacet__routerBalances_notFound() public {
    assertEq(this.routerBalances(_routerAgent0, _asset0), 0);
  }

  // ============ Admin methods ==============

  // ============ addRouter

  function test_RoutersFacet__addRouter_failsIfNotOwnerOrRouter() public {
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrRouter_notOwnerOrRouter.selector);
    vm.prank(address(123456123));
    this.approveRouter(address(0));
  }

  function test_RoutersFacet__addRouter_failsIfRouterAddressIsZero() public {
    vm.expectRevert(RoutersFacet.RoutersFacet__approveRouter_routerEmpty.selector);
    vm.prank(_owner);
    this.approveRouter(address(0));
  }

  function test_RoutersFacet__addRouter_failsIfRouterAlreadyApproved() public {
    s.routerConfigs[_routerAgent0].approved = true;
    vm.expectRevert(RoutersFacet.RoutersFacet__approveRouter_alreadyAdded.selector);
    vm.prank(_owner);
    this.approveRouter(_routerAgent0);
  }

  // addRouter -- set approval
  function test_RoutersFacet__addRouter_success() public {
    assertEq(s.routerConfigs[_routerAgent0].approved, false);

    vm.expectEmit(true, true, false, true);
    emit RouterAdded(_routerAgent0, _owner);

    vm.prank(_owner);
    this.approveRouter(_routerAgent0);

    assertEq(s.routerConfigs[_routerAgent0].approved, true);

    // Should never touch these values:
    assertEq(s.routerConfigs[_routerAgent0].owner, address(0));
    assertEq(s.routerConfigs[_routerAgent0].proposed, address(0));
    assertEq(s.routerConfigs[_routerAgent0].proposedTimestamp, 0);
    assertEq(s.routerConfigs[_routerAgent0].portalApproved, false);
    assertEq(s.routerConfigs[_routerAgent0].recipient, address(0));
  }

  // ============ initializeRouter

  function test_RoutersFacet__initializeRouter_failsIfOwnerSet() public {
    s.routerConfigs[_routerAgent0].owner = _routerOwner0;
    vm.expectRevert(RoutersFacet.RoutersFacet__initializeRouter_configNotEmpty.selector);

    vm.prank(_routerAgent0);
    this.initializeRouter(_routerOwner0, _routerRecipient0);
  }

  function test_RoutersFacet__initializeRouter_failsIfRecipientSet() public {
    s.routerConfigs[_routerAgent0].recipient = _routerOwner0;
    vm.expectRevert(RoutersFacet.RoutersFacet__initializeRouter_configNotEmpty.selector);

    vm.prank(_routerAgent0);
    this.initializeRouter(_routerOwner0, _routerRecipient0);
  }

  function test_RoutersFacet__initializeRouter_failsIfProposedSet() public {
    s.routerConfigs[_routerAgent0].proposed = _routerOwner0;
    vm.expectRevert(RoutersFacet.RoutersFacet__initializeRouter_configNotEmpty.selector);

    vm.prank(_routerAgent0);
    this.initializeRouter(_routerOwner0, _routerRecipient0);
  }

  function test_RoutersFacet__initializeRouter_failsIfProposedTimestampSet() public {
    s.routerConfigs[_routerAgent0].proposedTimestamp = 1;
    vm.expectRevert(RoutersFacet.RoutersFacet__initializeRouter_configNotEmpty.selector);

    vm.prank(_routerAgent0);
    this.initializeRouter(_routerOwner0, _routerRecipient0);
  }

  function test_RoutersFacet__initializeRouter_shouldHandleNoOwner() public {
    vm.expectEmit(true, true, true, true);
    emit RouterOwnerAccepted(_routerAgent0, address(0), _routerAgent0);

    vm.expectEmit(true, true, true, true);
    emit RouterRecipientSet(_routerAgent0, address(0), _routerRecipient0);

    vm.expectEmit(true, true, true, true);
    emit RouterInitialized(_routerAgent0);

    vm.prank(_routerAgent0);
    this.initializeRouter(address(0), _routerRecipient0);

    assertEq(s.routerConfigs[_routerAgent0].owner, _routerAgent0);
    assertEq(s.routerConfigs[_routerAgent0].recipient, _routerRecipient0);

    // no updates to these values
    assertEq(s.routerConfigs[_routerAgent0].approved, false);
    assertEq(s.routerConfigs[_routerAgent0].portalApproved, false);
    assertEq(s.routerConfigs[_routerAgent0].proposed, address(0));
    assertEq(s.routerConfigs[_routerAgent0].proposedTimestamp, 0);
  }

  function test_RoutersFacet__initializeRouter_shouldHandleNoRecipient() public {
    vm.expectEmit(true, true, true, true);
    emit RouterOwnerAccepted(_routerAgent0, address(0), _routerOwner0);

    vm.expectEmit(true, true, true, true);
    emit RouterInitialized(_routerAgent0);

    vm.prank(_routerAgent0);
    this.initializeRouter(_routerOwner0, address(0));

    assertEq(s.routerConfigs[_routerAgent0].owner, _routerOwner0);

    // no updates to these values
    assertEq(s.routerConfigs[_routerAgent0].recipient, address(0));
    assertEq(s.routerConfigs[_routerAgent0].approved, false);
    assertEq(s.routerConfigs[_routerAgent0].portalApproved, false);
    assertEq(s.routerConfigs[_routerAgent0].proposed, address(0));
    assertEq(s.routerConfigs[_routerAgent0].proposedTimestamp, 0);
  }

  // removeRouter
  function test_RoutersFacet__removeRouter_success() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.routerConfigs[_routerAgent0].owner = _routerOwner0;
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;
    // Should also remove these values, if they were previously set.
    s.routerConfigs[_routerAgent0].proposed = _routerOwner1;
    s.routerConfigs[_routerAgent0].proposedTimestamp = 12345;

    vm.expectEmit(true, true, false, true);
    emit RouterRemoved(_routerAgent0, _owner);

    vm.prank(_owner);
    this.unapproveRouter(_routerAgent0);

    assertEq(s.routerConfigs[_routerAgent0].approved, false);
    assertEq(s.routerConfigs[_routerAgent0].portalApproved, false);
    // Config untouched
    assertEq(s.routerConfigs[_routerAgent0].owner, _routerOwner0);
    assertEq(s.routerConfigs[_routerAgent0].recipient, _routerRecipient0);
    assertEq(s.routerConfigs[_routerAgent0].proposed, _routerOwner1);
    assertEq(s.routerConfigs[_routerAgent0].proposedTimestamp, 12345);
  }

  function test_RoutersFacet__removeRouter_failsIfNotOwnerOrRouter() public {
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrRouter_notOwnerOrRouter.selector);
    vm.prank(address(123456123));
    this.unapproveRouter(address(0));
  }

  function test_RoutersFacet__removeRouter_failsIfRouterAddressIsZero() public {
    vm.expectRevert(RoutersFacet.RoutersFacet__unapproveRouter_routerEmpty.selector);
    vm.prank(_owner);
    this.unapproveRouter(address(0));
  }

  function test_RoutersFacet__removeRouter_failsIfRouterNotApproved() public {
    vm.expectRevert(RoutersFacet.RoutersFacet__unapproveRouter_notAdded.selector);
    vm.prank(_owner);
    this.unapproveRouter(_routerAgent0);
  }

  // setMaxRoutersPerTransfer
  function test_RoutersFacet__setMaxRoutersPerTransfer_success() public {
    // Change from zero.
    vm.expectEmit(true, true, false, true);
    emit MaxRoutersPerTransferUpdated(123, _owner);

    s.maxRoutersPerTransfer = 0;
    vm.prank(_owner);
    this.setMaxRoutersPerTransfer(123);
    assertEq(s.maxRoutersPerTransfer, 123);

    // Increasable.
    vm.expectEmit(true, true, false, true);
    emit MaxRoutersPerTransferUpdated(9999999, _owner);

    s.maxRoutersPerTransfer = 777;
    vm.prank(_owner);
    this.setMaxRoutersPerTransfer(9999999);
    assertEq(s.maxRoutersPerTransfer, 9999999);

    // Decreasable.
    vm.expectEmit(true, true, false, true);
    emit MaxRoutersPerTransferUpdated(1, _owner);

    s.maxRoutersPerTransfer = 777;
    vm.prank(_owner);
    this.setMaxRoutersPerTransfer(1);
    assertEq(s.maxRoutersPerTransfer, 1);
  }

  function test_RoutersFacet__setMaxRoutersPerTransfer_failsIfNotOwner() public {
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);
    vm.prank(address(123456654321));
    this.setMaxRoutersPerTransfer(10);
  }

  function test_RoutersFacet__setMaxRoutersPerTransfer_failsIfZero() public {
    s.maxRoutersPerTransfer = 10;
    vm.expectRevert(RoutersFacet.RoutersFacet__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer.selector);
    vm.prank(_owner);
    this.setMaxRoutersPerTransfer(0);
    assertEq(s.maxRoutersPerTransfer, 10);
  }

  function test_RoutersFacet__setMaxRoutersPerTransfer_failsIfRedundant() public {
    s.maxRoutersPerTransfer = 10;
    vm.expectRevert(RoutersFacet.RoutersFacet__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer.selector);
    vm.prank(_owner);
    this.setMaxRoutersPerTransfer(10);

    assertEq(s.maxRoutersPerTransfer, 10);
  }

  // setLiquidityFeeNumerator
  function test_RoutersFacet__setLiquidityFeeNumerator_success() public {
    s.LIQUIDITY_FEE_NUMERATOR = 9995; // Fee is currently 5 basis points.

    vm.expectEmit(true, true, false, true);
    emit LiquidityFeeNumeratorUpdated(9970, _owner);

    vm.prank(_owner);
    this.setLiquidityFeeNumerator(9970); // Set fee to 30 basis points.
    assertEq(s.LIQUIDITY_FEE_NUMERATOR, 9970);
  }

  function test_RoutersFacet__setLiquidityFeeNumerator_failsIfNotOwner() public {
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);
    vm.prank(address(123456654321));
    this.setLiquidityFeeNumerator(9995);
  }

  function test_RoutersFacet__setLiquidityFeeNumerator_failsIfTooSmall() public {
    s.LIQUIDITY_FEE_NUMERATOR = 9995; // Fee is currently 5 basis points.

    vm.expectRevert(RoutersFacet.RoutersFacet__setLiquidityFeeNumerator_tooSmall.selector);
    vm.prank(_owner);
    // Set fee to 600 basis points, which is over the 5% limit.
    this.setLiquidityFeeNumerator(9400);
    assertEq(s.LIQUIDITY_FEE_NUMERATOR, 9995);
  }

  function test_RoutersFacet__setLiquidityFeeNumerator_failsIfTooLarge() public {
    s.LIQUIDITY_FEE_NUMERATOR = 9995; // Fee is currently 5 basis points.

    vm.expectRevert(RoutersFacet.RoutersFacet__setLiquidityFeeNumerator_tooLarge.selector);
    vm.prank(_owner);
    // Set fee to -100 basis points, literally making the routers give users free money.
    this.setLiquidityFeeNumerator(10100);
    assertEq(s.LIQUIDITY_FEE_NUMERATOR, 9995);
  }

  // approveRouterForPortal
  // fails if not approved and ownership not renounced
  function test_RoutersFacet__approveRouterForPortal_failsIfNotApproved() public {
    vm.expectRevert(RoutersFacet.RoutersFacet__approveRouterForPortal_notAdded.selector);
    vm.prank(_owner);
    this.approveRouterForPortal(_routerAgent0);
  }

  // fails if already approved for portals
  function test_RoutersFacet__approveRouterForPortal_failsIfAlreadyApproved() public {
    s._routerAllowlistRemoved = true;
    s.routerConfigs[_routerAgent0].portalApproved = true;
    vm.expectRevert(RoutersFacet.RoutersFacet__approveRouterForPortal_alreadyApproved.selector);
    vm.prank(_owner);
    this.approveRouterForPortal(_routerAgent0);
  }

  // works
  function test_RoutersFacet__approveRouterForPortal_success() public {
    s._routerAllowlistRemoved = true;
    vm.expectEmit(true, true, true, true);
    emit RouterApprovedForPortal(_routerAgent0, _owner);

    vm.prank(_owner);
    this.approveRouterForPortal(_routerAgent0);
    assertTrue(s.routerConfigs[_routerAgent0].portalApproved);
  }

  // works if router is not allowlisted, but router ownership renounced
  function test_RoutersFacet__approveRouterForPortal_successWhenAllowlistRemoved() public {
    // ensure router ownership renounced and not whitelited
    s.routerConfigs[_routerAgent0].portalApproved = false;
    s._routerAllowlistRemoved = true;

    vm.expectEmit(true, true, true, true);
    emit RouterApprovedForPortal(_routerAgent0, _owner);

    vm.prank(_owner);
    this.approveRouterForPortal(_routerAgent0);
    assertTrue(s.routerConfigs[_routerAgent0].portalApproved);
  }

  // unapproveRouterForPortal
  // fails if already unapproved for portals
  function test_RoutersFacet__unapproveRouterForPortal_failsIfNotApproved() public {
    s.routerConfigs[_routerAgent0].portalApproved = false;
    vm.expectRevert(RoutersFacet.RoutersFacet__unapproveRouterForPortal_notApproved.selector);
    vm.prank(_owner);
    this.unapproveRouterForPortal(_routerAgent0);
  }

  // works
  function test_RoutersFacet__unapproveRouterForPortal_success() public {
    s.routerConfigs[_routerAgent0].portalApproved = true;
    vm.expectEmit(true, true, true, true);
    emit RouterUnapprovedForPortal(_routerAgent0, _owner);

    vm.prank(_owner);
    this.unapproveRouterForPortal(_routerAgent0);
    assertTrue(!s.routerConfigs[_routerAgent0].portalApproved);
  }

  // ============ Public methods ==============
  // setRouterRecipient
  function test_RoutersFacet__setRouterRecipient_success() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.routerConfigs[_routerAgent0].owner = _routerOwner0;
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;

    vm.expectEmit(true, true, true, true);
    emit RouterRecipientSet(_routerAgent0, _routerRecipient0, _routerRecipient1);

    // Call must come from router owner.
    vm.prank(_routerOwner0);
    this.setRouterRecipient(_routerAgent0, _routerRecipient1);

    assertEq(s.routerConfigs[_routerAgent0].recipient, _routerRecipient1);

    // Shouldn't change any of these values:
    assertEq(s.routerConfigs[_routerAgent0].approved, true);
    assertEq(s.routerConfigs[_routerAgent0].owner, _routerOwner0);
    assertEq(s.routerConfigs[_routerAgent0].proposedTimestamp, 0);
  }

  // Should fail if owner == address(0) && msg.sender == router
  function test_RoutersFacet__setRouterRecipient_failsIfOwnerEmpty() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.routerConfigs[_routerAgent0].owner = address(0);
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;

    vm.prank(_routerAgent0);
    vm.expectRevert(RoutersFacet.RoutersFacet__onlyRouterOwner_notRouterOwner.selector);
    this.setRouterRecipient(_routerAgent0, _routerRecipient1);
  }

  // Should work if msg.sender == owner
  function test_RoutersFacet__setRouterRecipient_successIfOwnerSet() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.routerConfigs[_routerAgent0].owner = _routerOwner0;
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;

    vm.prank(_routerOwner0);
    this.setRouterRecipient(_routerAgent0, _routerRecipient1);
    assertEq(s.routerConfigs[_routerAgent0].recipient, _routerRecipient1);
  }

  // Fail if setting a duplicate recipient
  function test_RoutersFacet__setRouterRecipient_failsIfRedundantRecipient() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.routerConfigs[_routerAgent0].owner = _routerOwner0;
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;

    vm.expectRevert(RoutersFacet.RoutersFacet__setRouterRecipient_notNewRecipient.selector);
    vm.prank(_routerOwner0);
    this.setRouterRecipient(_routerAgent0, _routerRecipient0);

    assertEq(s.routerConfigs[_routerAgent0].recipient, _routerRecipient0);
  }

  // Fail if owner == address(0) && msg.sender != router
  function test_RoutersFacet__setRouterRecipient_failsIfEmptyOwnerSenderNotRouter() public {
    vm.prank(address(2));
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__onlyRouterOwner_notRouterOwner.selector));
    this.setRouterRecipient(_routerAgent0, address(0));
  }

  // Fail if owner != address(0) && msg.sender != owner
  function test_RoutersFacet__setRouterRecipient_failsIfNotOwner() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.routerConfigs[_routerAgent0].owner = _routerOwner0;
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;

    vm.prank(_routerOwner1);
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__onlyRouterOwner_notRouterOwner.selector));
    this.setRouterRecipient(_routerAgent0, address(0));
  }

  // proposeRouterOwner

  // Fails if owner != address(0), msg.sender != owner
  function test_RoutersFacet__proposeRouterOwner_failIfNotOwnerWithOwnerSet() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.routerConfigs[_routerAgent0].owner = _routerOwner0;
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;

    vm.expectRevert(RoutersFacet.RoutersFacet__onlyRouterOwner_notRouterOwner.selector);
    vm.prank(address(123456654321));
    this.proposeRouterOwner(_routerAgent0, _routerOwner1);
  }

  // Fails if owner == address(0), msg.sender != router
  function test_RoutersFacet__proposeRouterOwner_failIfNotOwnerWithoutSet() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.routerConfigs[_routerAgent0].owner = address(0);
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;

    vm.expectRevert(RoutersFacet.RoutersFacet__onlyRouterOwner_notRouterOwner.selector);
    vm.prank(address(123456654321));
    this.proposeRouterOwner(_routerAgent0, _routerOwner1);
  }

  // Fail if propose current owner
  function test_RoutersFacet__proposeRouterOwner_failsIfAlreadyOwner() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.routerConfigs[_routerAgent0].owner = _routerOwner0;
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;

    vm.prank(_routerOwner0);
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__proposeRouterOwner_notNewOwner.selector));
    this.proposeRouterOwner(_routerAgent0, _routerOwner0);
  }

  // Fail if proposed owner is same as the previous proposed
  function test_RoutersFacet__proposeRouterOwner_failsIfAlreadyProposed() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.routerConfigs[_routerAgent0].owner = _routerOwner0;
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;
    s.routerConfigs[_routerAgent0].proposed = _routerOwner1;

    vm.prank(_routerOwner0);
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__proposeRouterOwner_badRouter.selector));
    this.proposeRouterOwner(_routerAgent0, _routerOwner1);
  }

  // Should work
  function test_RoutersFacet__proposeRouterOwner_success() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.routerConfigs[_routerAgent0].owner = _routerOwner0;
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;

    vm.prank(_routerOwner0);
    this.proposeRouterOwner(_routerAgent0, _routerOwner1);
    assertEq(this.getProposedRouterOwner(_routerAgent0), _routerOwner1);
  }

  // acceptProposedRouterOwner
  // Should work if proposed == address(0)
  function test_RoutersFacet__acceptProposedRouterOwner_successWhenProposedEmpty() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.routerConfigs[_routerAgent0].owner = _routerOwner0;
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;
    s.routerConfigs[_routerAgent0].proposed = address(0);
    s.routerConfigs[_routerAgent0].proposedTimestamp = block.timestamp;

    vm.expectEmit(true, true, true, true);
    emit RouterOwnerAccepted(_routerAgent0, _routerOwner0, address(0));

    // If the proposed owner is not set and no current owner is set, the router itself must be the caller.
    vm.prank(_routerOwner0);
    vm.warp(block.timestamp + 8 days);
    this.acceptProposedRouterOwner(_routerAgent0);
    // Empty
    assertEq(s.routerConfigs[_routerAgent0].owner, address(0));
    assertEq(s.routerConfigs[_routerAgent0].proposed, address(0));
    assertEq(s.routerConfigs[_routerAgent0].proposedTimestamp, 0);
  }

  // Should work if proposed != address(0)  &&  msg.sender == _proposed
  function test_RoutersFacet__acceptProposedRouterOwner_successWhenProposedIsSet() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.routerConfigs[_routerAgent0].owner = _routerOwner0;
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;
    s.routerConfigs[_routerAgent0].proposed = _routerOwner1;
    s.routerConfigs[_routerAgent0].proposedTimestamp = block.timestamp;

    vm.prank(_routerOwner1);
    vm.warp(block.timestamp + 8 days);

    this.acceptProposedRouterOwner(_routerAgent0);
    assertEq(s.routerConfigs[_routerAgent0].owner, _routerOwner1);
    // Should have cleared the proposed owner.
    assertEq(s.routerConfigs[_routerAgent0].proposed, address(0));
    // Should have cleared the proposed owner timestamp.
    assertEq(s.routerConfigs[_routerAgent0].proposedTimestamp, 0);
  }

  // Fail if proposed == address(0) && _owner != msg.sender
  function test_RoutersFacet__acceptProposedRouterOwner_failsIfNotOwnerRenouncing() public {
    address _router = address(1);

    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__acceptProposedRouterOwner_badCaller.selector));
    vm.prank(address(2));
    vm.warp(block.timestamp + 8 days);
    this.acceptProposedRouterOwner(_router);
  }

  // Fail if proposed == address(0) && (_owner != address(0) && msg.sender != router) || _owner != msg.sender
  function test_RoutersFacet__acceptProposedRouterOwner_failsIfNotOwnerWhenOwnerSet() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.routerConfigs[_routerAgent0].owner = _routerOwner0;
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;

    vm.prank(address(2));
    vm.warp(block.timestamp + 8 days);
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__acceptProposedRouterOwner_badCaller.selector));
    this.acceptProposedRouterOwner(_routerAgent0);
  }

  // Fail if proposed != address(0) && msg.sender != _proposed
  function test_RoutersFacet__acceptProposedRouterOwner_failsIfNotProposedWhenProposedSet() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.routerConfigs[_routerAgent0].owner = _routerOwner0;
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;
    s.routerConfigs[_routerAgent0].proposed = _routerOwner1;
    s.routerConfigs[_routerAgent0].proposedTimestamp = block.timestamp;

    vm.prank(_routerOwner2);
    vm.warp(block.timestamp + 8 days);
    vm.expectRevert(abi.encodeWithSelector(RoutersFacet.RoutersFacet__acceptProposedRouterOwner_badCaller.selector));
    this.acceptProposedRouterOwner(_routerAgent0);
  }

  // addLiquidityForRouter
  function test_RoutersFacet__addLiquidityForRouter_failsIfNoRouter() public {
    uint256 amount = 10;
    vm.expectRevert(RoutersFacet.RoutersFacet__addLiquidityForRouter_routerEmpty.selector);
    this.addRouterLiquidityFor(amount, _local, address(0));
  }

  function test_RoutersFacet__addLiquidityForRouter_failsIfNoAmount() public {
    uint256 amount = 0;
    vm.expectRevert(RoutersFacet.RoutersFacet__addLiquidityForRouter_amountIsZero.selector);
    this.addRouterLiquidityFor(amount, _local, _routerAgent0);
  }

  function test_RoutersFacet__addLiquidityForRouter_failsIfRouterUnapproved() public {
    s.routerConfigs[_routerAgent0].approved = false;
    uint256 amount = 10000;
    vm.expectRevert(RoutersFacet.RoutersFacet__addLiquidityForRouter_badRouter.selector);
    this.addRouterLiquidityFor(amount, _local, _routerAgent0);
  }

  function test_RoutersFacet__addLiquidityForRouter_failsIfAssetUnapproved() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.tokenConfigs[utils_calculateCanonicalHash()].approval = false;
    uint256 amount = 10000;
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__getApprovedCanonicalId_notAllowlisted.selector);
    this.addRouterLiquidityFor(amount, _local, _routerAgent0);
  }

  function test_RoutersFacet__addLiquidityForRouter_worksForToken() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.tokenConfigs[_canonicalKey].approval = true;
    address caller = address(1233422312);
    TestERC20(_local).mint(caller, 10 ether);

    uint256 amount = 10000;

    uint256 initCaller = IERC20(_local).balanceOf(caller);
    uint256 initLiquidity = this.routerBalances(_routerAgent0, _local);

    vm.prank(caller);
    IERC20(_local).approve(address(this), amount);

    vm.expectEmit(true, true, true, true);
    emit RouterLiquidityAdded(_routerAgent0, _local, _canonicalKey, amount, caller);
    vm.prank(caller);
    this.addRouterLiquidityFor(amount, _local, _routerAgent0);

    assertEq(IERC20(_local).balanceOf(caller), initCaller - amount);
    assertEq(this.routerBalances(_routerAgent0, _local), initLiquidity + amount);
  }

  function test_RoutersFacet__addLiquidityForRouter_worksForCanonicalDomain() public {
    utils_setupAsset(true, true);
    s.routerConfigs[_routerAgent0].approved = true;
    address caller = address(1233422312);
    TestERC20(_canonical).mint(caller, 10 ether);

    uint256 amount = 10000;

    uint256 initCaller = IERC20(_canonical).balanceOf(caller);
    uint256 initLiquidity = this.routerBalances(_routerAgent0, _canonical);

    vm.prank(caller);
    IERC20(_canonical).approve(address(this), amount);

    vm.expectEmit(true, true, true, true);
    emit RouterLiquidityAdded(_routerAgent0, _canonical, _canonicalKey, amount, caller);
    vm.prank(caller);
    this.addRouterLiquidityFor(amount, _canonical, _routerAgent0);

    assertEq(IERC20(_canonical).balanceOf(caller), initCaller - amount);
    assertEq(this.routerBalances(_routerAgent0, _canonical), initLiquidity + amount);
  }

  // addLiquidity
  function test_RoutersFacet__addLiquidity_routerIsSender() public {
    s.routerConfigs[_routerAgent0].approved = true;
    s.tokenConfigs[_canonicalKey].approval = true;
    TestERC20(_local).mint(_routerAgent0, 10 ether);

    uint256 amount = 10000;

    uint256 initCaller = IERC20(_local).balanceOf(_routerAgent0);
    uint256 initLiquidity = this.routerBalances(_routerAgent0, _local);

    vm.prank(_routerAgent0);
    IERC20(_local).approve(address(this), amount);

    vm.expectEmit(true, true, true, true);
    emit RouterLiquidityAdded(_routerAgent0, address(_local), _canonicalKey, amount, _routerAgent0);
    vm.prank(_routerAgent0);
    this.addRouterLiquidity(amount, _local);

    assertEq(IERC20(_local).balanceOf(_routerAgent0), initCaller - amount);
    assertEq(this.routerBalances(_routerAgent0, _local), initLiquidity + amount);
  }

  // removeRouterLiquidityFor
  function test_RoutersFacet__removeRouterLiquidityFor_failsIfNotRouterOwner() public {
    s.routerConfigs[_routerAgent0].recipient = address(0);
    s.routerConfigs[_routerAgent0].owner = address(0);
    address to = address(0);
    uint256 amount = 100;
    vm.expectRevert(RoutersFacet.RoutersFacet__removeRouterLiquidityFor_notOwner.selector);
    vm.prank(address(123567));
    this.removeRouterLiquidityFor(TokenId(_canonicalDomain, _canonicalId), amount, payable(to), _routerAgent0);
  }

  function test_RoutersFacet__removeRouterLiquidityFor_works() public {
    s.routerConfigs[_routerAgent0].recipient = address(0);
    s.routerConfigs[_routerAgent0].owner = address(0);
    s.routerBalances[_routerAgent0][_local] = 10 ether;

    address to = address(12);
    uint256 amount = 100;

    uint256 initLiquidity = this.routerBalances(_routerAgent0, _local);
    uint256 initBalance = IERC20(_local).balanceOf(to);

    vm.expectEmit(true, true, true, true);
    emit RouterLiquidityRemoved(_routerAgent0, to, _local, _key, amount, _routerAgent0);
    vm.prank(_routerAgent0);
    this.removeRouterLiquidityFor(TokenId(_canonicalDomain, _canonicalId), amount, payable(to), _routerAgent0);

    assertEq(this.routerBalances(_routerAgent0, _local), initLiquidity - amount);
    assertEq(IERC20(_local).balanceOf(to), initBalance + amount);
  }

  // removeRouterLiquidity
  function test_RoutersFacet__removeRouterLiquidity_failsIfNoRecipient() public {
    s.routerConfigs[_routerAgent0].recipient = address(0);
    s.routerConfigs[_routerAgent0].owner = address(0);
    address to = address(0);
    uint256 amount = 100;
    vm.expectRevert(RoutersFacet.RoutersFacet__removeRouterLiquidity_recipientEmpty.selector);
    vm.prank(_routerAgent0);
    this.removeRouterLiquidity(TokenId(_canonicalDomain, _canonicalId), amount, payable(to));
  }

  function test_RoutersFacet__removeRouterLiquidity_failsIfNoAmount() public {
    s.routerConfigs[_routerAgent0].recipient = address(0);
    s.routerConfigs[_routerAgent0].owner = address(0);
    address to = address(12345);
    uint256 amount = 0;
    vm.expectRevert(RoutersFacet.RoutersFacet__removeRouterLiquidity_amountIsZero.selector);
    vm.prank(_routerAgent0);
    this.removeRouterLiquidity(TokenId(_canonicalDomain, _canonicalId), amount, payable(to));
  }

  function test_RoutersFacet__removeRouterLiquidity_failsIfNotEnoughFunds() public {
    s.routerConfigs[_routerAgent0].recipient = address(0);
    s.routerConfigs[_routerAgent0].owner = address(0);
    s.routerBalances[_routerAgent0][_local] = 0;
    address to = address(12345);
    uint256 amount = 10000;
    vm.expectRevert(RoutersFacet.RoutersFacet__removeRouterLiquidity_insufficientFunds.selector);
    vm.prank(_routerAgent0);
    this.removeRouterLiquidity(TokenId(_canonicalDomain, _canonicalId), amount, payable(to));
  }

  // removeLiquidity
  function test_RoutersFacet__removeRouterLiquidity_worksWithRecipientSet() public {
    s.routerConfigs[_routerAgent0].recipient = _routerRecipient0;
    s.routerConfigs[_routerAgent0].owner = address(0);
    s.routerBalances[_routerAgent0][_canonical] = 10 ether;
    s.domain = _canonicalDomain;
    s.representationToCanonical[_canonical] = TokenId(_canonicalDomain, _canonicalId);

    address to = address(1234);
    uint256 amount = 100;

    uint256 initLiquidity = this.routerBalances(_routerAgent0, _canonical);
    uint256 initBalance = IERC20(_canonical).balanceOf(_routerRecipient0);

    vm.expectEmit(true, true, true, true);
    emit RouterLiquidityRemoved(_routerAgent0, _routerRecipient0, _canonical, _key, amount, _routerAgent0);
    vm.prank(_routerAgent0);
    this.removeRouterLiquidity(TokenId(_canonicalDomain, _canonicalId), amount, payable(to));

    assertEq(this.routerBalances(_routerAgent0, _canonical), initLiquidity - amount);
    assertEq(IERC20(_canonical).balanceOf(_routerRecipient0), initBalance + amount);
  }

  function test_RoutersFacet__removeRouterLiquidity_worksWithToken() public {
    s.routerConfigs[_routerAgent0].recipient = address(0);
    s.routerConfigs[_routerAgent0].owner = address(0);
    s.routerBalances[_routerAgent0][_local] = 10 ether;
    s.tokenConfigs[utils_calculateCanonicalHash()].custodied = 10 ether;

    address to = address(1234);
    uint256 amount = 100;

    uint256 initLiquidity = this.routerBalances(_routerAgent0, _local);
    uint256 initBalance = IERC20(_local).balanceOf(to);

    vm.expectEmit(true, true, true, true);
    emit RouterLiquidityRemoved(_routerAgent0, to, _local, _key, amount, _routerAgent0);
    vm.prank(_routerAgent0);
    this.removeRouterLiquidity(TokenId(_canonicalDomain, _canonicalId), amount, payable(to));

    assertEq(this.routerBalances(_routerAgent0, _local), initLiquidity - amount);
    assertEq(IERC20(_local).balanceOf(to), initBalance + amount);
    assertEq(s.tokenConfigs[utils_calculateCanonicalHash()].custodied, 10 ether); // shouldnt change
  }

  function test_RoutersFacet__removeRouterLiquidity_worksOnCanonical() public {
    utils_setupAsset(true, true);
    s.routerConfigs[_routerAgent0].recipient = address(0);
    s.routerConfigs[_routerAgent0].owner = address(0);
    s.routerBalances[_routerAgent0][_local] = 10 ether;
    s.tokenConfigs[utils_calculateCanonicalHash()].custodied = 10 ether;

    address to = address(1234);
    uint256 amount = 100;

    uint256 initLiquidity = this.routerBalances(_routerAgent0, _local);
    uint256 initBalance = IERC20(_local).balanceOf(to);

    vm.expectEmit(true, true, true, true);
    emit RouterLiquidityRemoved(_routerAgent0, to, _local, _key, amount, _routerAgent0);
    vm.prank(_routerAgent0);
    this.removeRouterLiquidity(TokenId(_canonicalDomain, _canonicalId), amount, payable(to));

    assertEq(this.routerBalances(_routerAgent0, _local), initLiquidity - amount);
    assertEq(IERC20(_local).balanceOf(to), initBalance + amount);
  }
}
