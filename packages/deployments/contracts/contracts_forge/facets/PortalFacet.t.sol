// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {Deployer} from "../utils/Deployer.sol";
import {IConnextHandler} from "../../contracts/interfaces/IConnextHandler.sol";
import {IStableSwap} from "../../contracts/interfaces/IStableSwap.sol";

import {BaseConnextFacet} from "../../contracts/facets/BaseConnextFacet.sol";
import {LibDiamond} from "../../contracts/libraries/LibDiamond.sol";
import {ConnextMessage} from "../../contracts/libraries/ConnextMessage.sol";
import {PortalFacet} from "../../contracts/facets/PortalFacet.sol";
import {IDiamondCut} from "../../contracts/interfaces/IDiamondCut.sol";
import {TestAavePool} from "../../contracts/test/TestAavePool.sol";
import {TestERC20} from "../../contracts/test/TestERC20.sol";
import {IAavePool} from "../../contracts/interfaces/IAavePool.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "../ForgeHelper.sol";
import "../Mock.sol";
import "./FacetHelper.sol";

contract PortalFacetTest is PortalFacet, FacetHelper {
  // ============ Storage ============
  uint32 domain = _originDomain;
  address bridgeRouter = address(1);
  address wrapper = address(3);
  address relayerFeeRouter = address(4);
  address xAppConnectionManager = address(5);
  address router = address(1111);
  address aavePool;

  // ============ Test set up ============

  function setUp() public {
    setDefaults();

    // we are on the origin domain where local == canonical
    setAssetContext(domain, true);

    // set the owner to this contract
    LibDiamond.setContractOwner(address(this));

    // setup aave pool
    aavePool = address(new MockPool());
  }

  // ============ setAavePool ============

  // should work
  function test_PortalFacet__setAavePool_works() public {
    assertEq(this.aavePool(), address(0));

    this.setAavePool(aavePool);

    assertEq(this.aavePool(), aavePool);
  }

  // should fail if not owner
  function test_PortalFacet__setAavePool_failsIfNotOwner() public {
    vm.prank(address(10));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));
    this.setAavePool(aavePool);
  }

  // ============ setAavePortalFee ============

  // should work
  function test_PortalFacet__setAavePortalFee_works() public {
    uint256 fee = 125;
    assertEq(this.aavePortalFee(), _portalFeeNumerator);

    this.setAavePortalFee(fee);

    assertEq(this.aavePortalFee(), fee);
  }

  // should fail if not owner
  function test_PortalFacet__setAavePortalFee_failsIfNotOwner() public {
    uint256 fee = 5;

    vm.prank(address(10));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));

    this.setAavePortalFee(fee);
  }

  // fail if the fee is invalid (greater than denominator)
  function test_PortalFacet__setAavePortalFee_failsIfInvalidFee() public {
    uint256 fee = _liquidityFeeDenominator + 1;

    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__setAavePortalFee_invalidFee.selector));
    this.setAavePortalFee(fee);
  }

  // ============ repayAavePortal ============

  // should work when local asset is the adopted asset
  function test_PortalFacet__repayAavePortal_works() public {
    // set approval context
    s.routerPermissionInfo.approvedForPortalRouters[router] = true;

    // set liquidity
    uint256 init = 10 ether;
    s.routerBalances[router][_local] = init;
    assertTrue(IERC20(_local).balanceOf(address(this)) > init);

    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;

    // set pool
    s.aavePool = aavePool;

    // set mock for backing
    vm.mockCall(s.aavePool, abi.encodeWithSelector(IAavePool.backUnbacked.selector), abi.encode(true));

    // make call
    vm.expectCall(_local, abi.encodeWithSelector(IERC20.approve.selector, aavePool, backing + fee));
    vm.expectCall(aavePool, abi.encodeWithSelector(IAavePool.backUnbacked.selector, _local, backing, fee));
    vm.expectEmit(true, true, true, true);
    emit AavePortalRouterRepayment(router, _local, backing, fee);
    vm.prank(router);
    this.repayAavePortal(_local, backing, fee);

    // assert balance decrement
    assertEq(s.routerBalances[router][_local], init - backing - fee);
  }

  // should work when the local asset is not the adopted asset

  // fails if the router is not approved
  function test_PortalFacet__repayAavePortal_failsIfNotApprovedForPortals() public {
    // set approval context
    s.routerPermissionInfo.approvedForPortalRouters[router] = false;

    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;

    // coming from router
    vm.prank(router);
    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__repayAavePortal_notApprovedForPortals.selector));
    this.repayAavePortal(_local, backing, fee);
  }

  // fails if not enough balance
  function test_PortalFacet__repayAavePortal_failsIfInsufficientAmount() public {
    // set approval context
    s.routerPermissionInfo.approvedForPortalRouters[router] = true;

    // set liquidity
    assertEq(s.routerBalances[router][_local], 0);

    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;

    // call coming from router
    vm.prank(router);
    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__repayAavePortal_insufficientFunds.selector));
    this.repayAavePortal(_local, backing, fee);
  }
}
