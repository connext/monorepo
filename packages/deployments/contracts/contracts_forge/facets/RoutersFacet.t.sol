// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {LibDiamond} from "../../contracts/libraries/LibDiamond.sol";
import {IStableSwap} from "../../contracts/interfaces/IStableSwap.sol";
import {ITokenRegistry} from "../../contracts/nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import {IWrapped} from "../../contracts/interfaces/IWrapped.sol";
import {ConnextMessage} from "../../contracts/libraries/ConnextMessage.sol";
import {RoutersFacet} from "../../contracts/facets/RoutersFacet.sol";
import {TestERC20} from "../../contracts/test/TestERC20.sol";

import {MockWrapper, MockTokenRegistry} from "../Mock.sol";

// import "../../lib/forge-std/src/console.sol";
import "./FacetHelper.sol";

contract RoutersFacetTest is RoutersFacet, FacetHelper {
  // ============ storage ============
  // owner
  address _owner = address(12345);

  // sample data
  uint32 _domain = 1000;

  address _local = address(7);
  bytes32 _localTokenId = bytes32(abi.encodePacked(_local));

  address _canonical = address(5);
  bytes32 _canonicalTokenId = bytes32(abi.encodePacked(_canonical));

  address _routerAgent0 = address(222000111); // 0x000000000000000000000000000000000d3b73ef
  address _routerRecipient0 = address(222000222); // 0x000000000000000000000000000000000d3b745e
  address _routerOwner0 = address(222000333); // 0x000000000000000000000000000000000d3b74cd

  address _asset0 = address(333000111);
  address _asset1 = address(333001111);

  // ============ Test set up ============
  function setUp() public {
    setOwner(_owner);
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
    s.LIQUIDITY_FEE_NUMERATOR = 54321;
    assertEq(this.LIQUIDITY_FEE_NUMERATOR(), 54321);
  }

  function test_RoutersFacet__LIQUIDITY_FEE_NUMERATOR_notFound() public {
    assertEq(this.LIQUIDITY_FEE_NUMERATOR(), 0);
  }

  function test_RoutersFacet__LIQUIDITY_FEE_DENOMINATOR_success() public {
    s.LIQUIDITY_FEE_DENOMINATOR = 12345;
    assertEq(this.LIQUIDITY_FEE_DENOMINATOR(), 12345);
  }

  function test_RoutersFacet__LIQUIDITY_FEE_DENOMINATOR_notFound() public {
    assertEq(this.LIQUIDITY_FEE_DENOMINATOR(), 0);
  }

  function test_RoutersFacet__getRouterApproval_success() public {
    s.routerPermissionInfo.approvedRouters[_routerAgent0] = true;
    assertEq(this.getRouterApproval(_routerAgent0), true);
  }

  function test_RoutersFacet__getRouterApproval_notFound() public {
    assertEq(this.getRouterApproval(_routerAgent0), false);
  }

  function test_RoutersFacet__getRouterRecipient_success() public {
    s.routerPermissionInfo.routerRecipients[_routerAgent0] = _routerRecipient0;
    assertEq(this.getRouterRecipient(_routerAgent0), _routerRecipient0);
  }

  function test_RoutersFacet__getRouterRecipient_notFound() public {
    assertEq(this.getRouterRecipient(_routerAgent0), address(0));
  }

  function test_RoutersFacet__getRouterOwner_success() public {
    s.routerPermissionInfo.routerOwners[_routerAgent0] = _routerOwner0;
    assertEq(this.getRouterOwner(_routerAgent0), _routerOwner0);
  }

  function test_RoutersFacet__getRouterOwner_notFound() public {
    assertEq(s.routerPermissionInfo.routerOwners[_routerAgent0], address(0));
    // NOTE: If router owner was not set, this method should return the router address itself.
    address routerOwner = this.getRouterOwner(_routerAgent0);
    assertEq(routerOwner, _routerAgent0);
  }

  function test_RoutersFacet__getProposedRouterOwner_success() public {
    s.routerPermissionInfo.proposedRouterOwners[_routerAgent0] = _routerOwner0;
    assertEq(this.getProposedRouterOwner(_routerAgent0), _routerOwner0);
  }

  function test_RoutersFacet__getProposedRouterOwner_notFound() public {
    assertEq(this.getProposedRouterOwner(_routerAgent0), address(0));
  }

  function test_RoutersFacet__getProposedRouterOwnerTimestamp() public {
    s.routerPermissionInfo.proposedRouterTimestamp[_routerAgent0] = 12345;
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

  function test_RoutersFacet__setupRouter_success() public {
    assertEq(s.routerPermissionInfo.approvedRouters[_routerAgent0], false);

    vm.expectEmit(true, true, false, true);
    emit RouterAdded(_routerAgent0, _owner);

    vm.expectEmit(true, true, false, true);
    emit RouterOwnerAccepted(_routerAgent0, address(0), _routerOwner0);

    vm.expectEmit(true, true, false, true);
    emit RouterRecipientSet(_routerAgent0, address(0), _routerRecipient0);

    vm.prank(_owner);
    this.setupRouter(_routerAgent0, _routerOwner0, _routerRecipient0);

    assertEq(s.routerPermissionInfo.approvedRouters[_routerAgent0], true);
    assertEq(s.routerPermissionInfo.routerOwners[_routerAgent0], _routerOwner0);
    assertEq(s.routerPermissionInfo.routerRecipients[_routerAgent0], _routerRecipient0);
  }

  // function test_RoutersFacet__setupRouter_failsIfRouterAddressIsZero
  // function test_RoutersFacet__setupRouter_failsIfRouterAlreadyApproved
  // function test_RoutersFacet__setupRouter_shouldAccept0Owner
  // function test_RoutersFacet__setupRouter_shouldAccept0Recipient
  // function test_RoutersFacet__setupRouter

  // function test_RoutersFacet__removeRouter
  // function test_RoutersFacet__setMaxRoutersPerTransfer
  // function test_RoutersFacet__setLiquidityFeeNumerator

  // ============ Public methods ==============

  // function test_RoutersFacet__setRouterRecipient
  // function test_RoutersFacet__proposeRouterOwner
  // function test_RoutersFacet__acceptProposedRouterOwner
  // function test_RoutersFacet__addRouterLiquidityFor
  // function test_RoutersFacet__addRouterLiquidity
  // function test_RoutersFacet__removeRouterLiquidity

  // ============ Internal functions ============

  // function test_RoutersFacet___addLiquidityForRouter
}
