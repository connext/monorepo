// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {Deployer} from "../../../utils/Deployer.sol";
import {IConnextHandler} from "../../../../contracts/core/connext/interfaces/IConnextHandler.sol";
import {IStableSwap} from "../../../../contracts/core/connext/interfaces/IStableSwap.sol";
import {IAavePool} from "../../../../contracts/core/connext/interfaces/IAavePool.sol";
import {IDiamondCut} from "../../../../contracts/core/connext/interfaces/IDiamondCut.sol";

import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {ConnextMessage} from "../../../../contracts/core/connext/libraries/ConnextMessage.sol";
import {PortalFacet} from "../../../../contracts/core/connext/facets/PortalFacet.sol";
import {TestAavePool} from "../../../../contracts/test/TestAavePool.sol";
import {TestERC20} from "../../../../contracts/test/TestERC20.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "../../../utils/Mock.sol";
import "../../../utils/FacetHelper.sol";

contract PortalFacetTest is PortalFacet, FacetHelper {
  // ============ Storage ============
  uint32 domain = _originDomain;
  address bridgeRouter = address(1);
  address relayerFeeRouter = address(4);
  address xAppConnectionManager = address(5);
  address router = address(1111);
  address aavePool;

  bytes32 _id = bytes32(abi.encodePacked(address(123)));

  // ============ Test set up ============

  function setUp() public {
    utils_deployAssetContracts();
    utils_setFees();

    // we are on the origin domain where local == canonical
    utils_setupAsset(true, true);

    // set the owner to this contract
    LibDiamond.setContractOwner(address(this));

    // setup aave pool
    aavePool = address(new MockPool(false));
    // set pool
    s.aavePool = aavePool;
  }

  // ============ setAavePool ============

  // should work
  function test_PortalFacet__setAavePool_works() public {
    s.aavePool = address(0);
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

    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;

    // set liquidity
    uint256 init = 10 ether;
    s.routerBalances[router][_local] = init;
    s.portalDebt[_id] = backing;
    s.portalFeeDebt[_id] = fee;
    assertTrue(IERC20(_local).balanceOf(address(this)) > init);

    // set mock for backing
    vm.mockCall(s.aavePool, abi.encodeWithSelector(IAavePool.backUnbacked.selector), abi.encode(true));

    // make call
    vm.expectCall(_local, abi.encodeWithSelector(IERC20.approve.selector, aavePool, backing + fee));
    vm.expectCall(aavePool, abi.encodeWithSelector(IAavePool.backUnbacked.selector, _local, backing, fee));
    vm.expectEmit(true, true, true, true);
    emit AavePortalRouterRepayment(router, _local, backing, fee);
    vm.prank(router);
    this.repayAavePortal(_local, backing, fee, backing, _id);

    // assert balance decrement
    assertEq(s.routerBalances[router][_local], init - backing - fee);
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
    this.repayAavePortal(_local, backing, fee, backing, _id);
  }

  // fails if swap failed
  function test_PortalFacet__repayAavePortal_failsIfSwapFailed() public {
    // we are on the destination domain where local != canonical
    utils_setupAsset(false, false);

    // set approval context
    s.routerPermissionInfo.approvedForPortalRouters[router] = true;

    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;
    uint256 maxIn = 1200;

    // set liquidity
    s.routerBalances[router][_local] = maxIn + 1;

    // set mock + storage (using external pool)
    // calculateSwapOutFromAddress returns maxIn + 1 and it causes swap Failed!
    vm.mockCall(
      _stableSwap,
      abi.encodeWithSelector(IStableSwap.calculateSwapOutFromAddress.selector),
      abi.encode(maxIn + 1)
    );

    // call coming from router
    vm.prank(router);
    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__repayAavePortal_swapFailed.selector));
    this.repayAavePortal(_local, backing, fee, maxIn, _id);
  }

  function test_PortalFacet__repayAavePortal_failsIfRepalyTooMuch() public {
    // we are on the destination domain where local != canonical
    utils_setupAsset(false, false);

    // set approval context
    s.routerPermissionInfo.approvedForPortalRouters[router] = true;

    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;
    uint256 maxIn = 1200;
    uint256 totalAmount = backing + fee;
    uint256 amountIn = maxIn - 1;
    uint256 init = maxIn + 1;

    s.routerBalances[router][_local] = init;
    s.portalDebt[_id] = backing - 1;
    s.portalFeeDebt[_id] = fee - 1;

    // set liquidity
    s.routerBalances[router][_local] = maxIn + 1;

    // set mock + storage (using external pool)
    vm.mockCall(
      _stableSwap,
      abi.encodeWithSelector(IStableSwap.calculateSwapOutFromAddress.selector),
      abi.encode(amountIn)
    );
    vm.mockCall(_stableSwap, abi.encodeWithSelector(IStableSwap.swapExactOut.selector), abi.encode(amountIn));

    // set mock for backing
    vm.mockCall(s.aavePool, abi.encodeWithSelector(IAavePool.backUnbacked.selector), abi.encode(true));

    vm.expectRevert(stdError.arithmeticError);
    vm.prank(router);
    this.repayAavePortal(_local, backing, fee, maxIn, _id);

    // assert balance decrement
    assertEq(s.routerBalances[router][_local], init);
  }

  function test_PortalFacet__repayAavePortal_shouldWorkUsingSwap() public {
    // we are on the destination domain where local != canonical
    utils_setupAsset(false, false);

    // set approval context
    s.routerPermissionInfo.approvedForPortalRouters[router] = true;

    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;
    uint256 maxIn = 1200;
    uint256 totalAmount = backing + fee;
    uint256 amountIn = maxIn - 1;
    uint256 init = maxIn + 1;

    s.routerBalances[router][_local] = init;
    s.portalDebt[_id] = backing;
    s.portalFeeDebt[_id] = fee;

    // set liquidity
    s.routerBalances[router][_local] = maxIn + 1;

    // set mock + storage (using external pool)
    vm.mockCall(
      _stableSwap,
      abi.encodeWithSelector(IStableSwap.calculateSwapOutFromAddress.selector),
      abi.encode(amountIn)
    );
    vm.mockCall(_stableSwap, abi.encodeWithSelector(IStableSwap.swapExactOut.selector), abi.encode(amountIn));

    // set mock for backing
    vm.mockCall(s.aavePool, abi.encodeWithSelector(IAavePool.backUnbacked.selector), abi.encode(true));

    // make call
    vm.expectCall(_adopted, abi.encodeWithSelector(IERC20.approve.selector, aavePool, backing + fee));
    vm.expectCall(aavePool, abi.encodeWithSelector(IAavePool.backUnbacked.selector, _adopted, backing, fee));
    vm.expectEmit(true, true, true, true);
    emit AavePortalRouterRepayment(router, _adopted, backing, fee);
    vm.prank(router);
    this.repayAavePortal(_local, backing, fee, maxIn, _id);

    // assert balance decrement
    assertEq(s.routerBalances[router][_local], init - amountIn);
  }

  // ============ repayAavePortalFor ============

  // fails if not supported asset
  function test_PortalFacet__repayAavePortalFor_failsIfNotSupportedAsset() public {
    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;

    // we are on the destination domain where local != canonical
    utils_setupAsset(false, false);

    address adopted = address(1);
    assertTrue(adopted != _adopted);

    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__repayAavePortalFor_notSupportedAsset.selector));
    this.repayAavePortalFor(adopted, backing, fee, _id);
  }

  // fails if zero amount
  function test_PortalFacet__repayAavePortalFor_failsIfZeroTotalAmount() public {
    // set debt amount
    uint256 backing = 0;
    uint256 fee = 0;

    // we are on the destination domain where local != canonical
    utils_setupAsset(false, false);

    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__repayAavePortalFor_zeroAmount.selector));
    this.repayAavePortalFor(_adopted, backing, fee, _id);
  }

  // should work
  function test_PortalFacet__repayAavePortalFor_shouldWork() public {
    // we are on the destination domain where local != canonical
    utils_setupAsset(false, false);

    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;
    uint256 total = backing + fee;

    s.portalDebt[_id] = backing;
    s.portalFeeDebt[_id] = fee;

    // mint initial balance to sender and approve
    address sender = address(111);
    TestERC20(_adopted).mint(sender, total);
    vm.prank(sender);
    TestERC20(_adopted).approve(address(this), total);

    // make call
    vm.expectCall(_adopted, abi.encodeWithSelector(IERC20.approve.selector, aavePool, total));
    vm.expectCall(aavePool, abi.encodeWithSelector(IAavePool.backUnbacked.selector, _adopted, backing, fee));
    vm.expectEmit(true, true, true, true);
    emit AavePortalRouterRepayment(sender, _adopted, backing, fee);
    vm.prank(sender);
    this.repayAavePortalFor(_adopted, backing, fee, _id);

    // assert balance decrement
    assertEq(IERC20(_adopted).balanceOf(sender), 0);
    assertEq(s.portalDebt[_id], 0);
    assertEq(s.portalFeeDebt[_id], 0);
  }
}
