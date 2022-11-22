// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {Deployer} from "../../../utils/Deployer.sol";
import {IConnext} from "../../../../contracts/core/connext/interfaces/IConnext.sol";
import {IStableSwap} from "../../../../contracts/core/connext/interfaces/IStableSwap.sol";
import {IAavePool} from "../../../../contracts/core/connext/interfaces/IAavePool.sol";
import {IDiamondCut} from "../../../../contracts/core/connext/interfaces/IDiamondCut.sol";

import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {TransferInfo} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";
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
  address relayerFeeVault = address(4);
  address xAppConnectionManager = address(5);
  address router = address(1111);
  address aavePool;

  TransferInfo defaultParams;
  address originSender = address(1232123);
  uint256 bridgedAmt = 1 ether;
  uint256 nonce = 89;

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

    defaultParams = TransferInfo({
      originDomain: _originDomain,
      destinationDomain: _destinationDomain,
      canonicalDomain: _canonicalDomain,
      to: address(1111),
      delegate: address(2222),
      receiveLocal: false,
      callData: bytes(""),
      slippage: 1000,
      originSender: msg.sender,
      bridgedAmt: bridgedAmt,
      normalizedIn: bridgedAmt,
      nonce: nonce,
      canonicalId: _canonicalId
    });
  }

  // ============ Test utils ============

  // helper for getting updated params and transfer ID, should be called after setting up asset
  function utils_getParams() public returns (TransferInfo memory, bytes32) {
    // Update canonical ID info.
    defaultParams.canonicalId = _canonicalId;
    defaultParams.canonicalDomain = _canonicalDomain;
    return (defaultParams, keccak256(abi.encode(defaultParams)));
  }

  function utils_repayPortal(
    TransferInfo memory params,
    uint256 backingAmount,
    uint256 feeAmount,
    uint256 maxIn
  ) public {
    this.repayAavePortal(params, backingAmount, feeAmount, maxIn);
  }

  function utils_repayPortalFor(
    TransferInfo memory params,
    address borrowedAsset,
    uint256 backingAmount,
    uint256 feeAmount
  ) public {
    this.repayAavePortalFor(params, borrowedAsset, backingAmount, feeAmount);
  }

  function utils_repayPortalFor(
    TransferInfo memory params,
    uint256 backingAmount,
    uint256 feeAmount
  ) public {
    this.repayAavePortalFor(params, _adopted, backingAmount, feeAmount);
  }

  // ============ setAavePool ============

  // should work
  function test_PortalFacet__setAavePool_works() public {
    s.aavePool = address(0);
    assertEq(this.aavePool(), address(0));

    vm.expectEmit(true, true, true, true);
    emit AavePoolUpdated(aavePool, address(this));

    this.setAavePool(aavePool);

    assertEq(this.aavePool(), aavePool);
  }

  // should fail if not owner
  function test_PortalFacet__setAavePool_failsIfNotOwner() public {
    vm.prank(address(10));
    vm.expectRevert(
      abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector)
    );
    this.setAavePool(aavePool);
  }

  // ============ setAavePortalFee ============

  // should work
  function test_PortalFacet__setAavePortalFee_works() public {
    uint256 fee = 125;
    assertEq(this.aavePortalFee(), _portalFeeNumerator);

    vm.expectEmit(true, true, true, true);
    emit AavePortalFeeUpdated(fee, address(this));
    this.setAavePortalFee(fee);

    assertEq(this.aavePortalFee(), fee);
  }

  // should fail if not owner
  function test_PortalFacet__setAavePortalFee_failsIfNotOwner() public {
    uint256 fee = 5;

    vm.prank(address(10));
    vm.expectRevert(
      abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector)
    );
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
    s.routerConfigs[router].portalApproved = true;

    (TransferInfo memory params, bytes32 transferId) = utils_getParams();

    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;

    // set liquidity
    uint256 init = 10 ether;
    s.routerBalances[router][_local] = init;
    s.portalDebt[transferId] = backing;
    s.portalFeeDebt[transferId] = fee;
    assertTrue(IERC20(_local).balanceOf(address(this)) > init);

    // set mock for backing
    vm.mockCall(s.aavePool, abi.encodeWithSelector(IAavePool.backUnbacked.selector), abi.encode(true));

    // make call
    vm.expectCall(_local, abi.encodeWithSelector(IERC20.approve.selector, aavePool, backing + fee));
    vm.expectCall(aavePool, abi.encodeWithSelector(IAavePool.backUnbacked.selector, _local, backing, fee));
    vm.expectEmit(true, true, true, true);
    emit AavePortalRepayment(transferId, _local, backing, fee, router);
    vm.prank(router);
    utils_repayPortal(params, backing, fee, backing);

    // assert balance decrement
    assertEq(s.routerBalances[router][_local], init - backing - fee);
  }

  // fails if asset removed
  function test_PortalFacet__repayAavePortal_failsIfRemoved() public {
    // set approval context
    s.routerConfigs[router].portalApproved = true;

    (TransferInfo memory params, ) = utils_getParams();
    s.tokenConfigs[utils_calculateCanonicalHash()].approval = false;

    // set liquidity
    assertEq(s.routerBalances[router][_local], 0);

    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;

    // call coming from router
    vm.prank(router);
    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__repayAavePortal_assetNotApproved.selector));
    utils_repayPortal(params, backing, fee, backing);
  }

  // fails if not enough balance
  function test_PortalFacet__repayAavePortal_failsIfInsufficientAmount() public {
    // set approval context
    s.routerConfigs[router].portalApproved = true;

    (TransferInfo memory params, ) = utils_getParams();

    // set liquidity
    assertEq(s.routerBalances[router][_local], 0);

    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;

    // call coming from router
    vm.prank(router);
    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__repayAavePortal_insufficientFunds.selector));
    utils_repayPortal(params, backing, fee, backing);
  }

  // fails if swap failed
  function test_PortalFacet__repayAavePortal_failsIfSwapFailed() public {
    // we are on the destination domain where local != canonical
    utils_setupAsset(false, false);
    (TransferInfo memory params, ) = utils_getParams();

    // set approval context
    s.routerConfigs[router].portalApproved = true;

    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;
    uint256 maxIn = 1200;

    // set liquidity
    s.routerBalances[router][_local] = maxIn + 1;

    // Reverts if no mock set with EvmError: revert

    // call coming from router
    vm.prank(router);
    vm.expectRevert();
    utils_repayPortal(params, backing, fee, maxIn);
  }

  function test_PortalFacet__repayAavePortal_failsIfRepayTooMuch() public {
    // we are on the destination domain where local != canonical
    utils_setupAsset(false, false);
    (TransferInfo memory params, bytes32 transferId) = utils_getParams();

    // set approval context
    s.routerConfigs[router].portalApproved = true;

    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;
    uint256 maxIn = 1200;
    uint256 totalAmount = backing + fee;
    uint256 amountIn = maxIn - 1;
    uint256 init = maxIn + 1;

    s.routerBalances[router][_local] = init;
    s.portalDebt[transferId] = backing - 1;
    s.portalFeeDebt[transferId] = fee - 1;

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
    utils_repayPortal(params, backing, fee, maxIn);

    // assert balance decrement
    assertEq(s.routerBalances[router][_local], init);
  }

  function test_PortalFacet__repayAavePortal_shouldWorkUsingSwap() public {
    // we are on the destination domain where local != canonical
    utils_setupAsset(false, false);
    (TransferInfo memory params, bytes32 transferId) = utils_getParams();

    // set approval context
    s.routerConfigs[router].portalApproved = true;

    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;
    uint256 maxIn = 1200;
    uint256 totalAmount = backing + fee;
    uint256 amountIn = maxIn - 1;
    uint256 init = maxIn + 1;

    s.routerBalances[router][_local] = init;
    s.portalDebt[transferId] = backing;
    s.portalFeeDebt[transferId] = fee;

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
    emit AavePortalRepayment(transferId, _adopted, backing, fee, router);
    vm.prank(router);
    utils_repayPortal(params, backing, fee, maxIn);

    // assert balance decrement
    assertEq(s.routerBalances[router][_local], init - amountIn);
  }

  // ============ repayAavePortalFor ============

  // fails if not supported asset
  // function test_PortalFacet__repayAavePortalFor_failsIfNotSupportedAsset() public {
  //   // set debt amount
  //   uint256 backing = 1111;
  //   uint256 fee = 111;

  //   // we are on the destination domain where local != canonical
  //   utils_setupAsset(false, false);

  //   // address adopted = address(1);
  //   // assertTrue(adopted != _adopted);
  //   params.canonicalId = bytes32("bad");
  //   params.canonicalDomain = 13;

  //   vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__repayAavePortalFor_notSupportedAsset.selector));
  //   utils_repayPortalFor(params, backing, fee);
  // }

  // fails if zero amount
  function test_PortalFacet__repayAavePortalFor_failsIfWhitelistedAndBadParams() public {
    // set debt amount
    uint256 backing = 0;
    uint256 fee = 0;

    // we are on the destination domain where local != canonical
    utils_setupAsset(false, false);
    (TransferInfo memory params, ) = utils_getParams();

    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__repayAavePortalFor_invalidAsset.selector));
    utils_repayPortalFor(params, address(1231236546545), backing, fee);
  }

  // fails if zero amount
  function test_PortalFacet__repayAavePortalFor_failsIfZeroTotalAmount() public {
    // set debt amount
    uint256 backing = 0;
    uint256 fee = 0;

    // we are on the destination domain where local != canonical
    utils_setupAsset(false, false);
    (TransferInfo memory params, ) = utils_getParams();

    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__repayAavePortalFor_zeroAmount.selector));
    utils_repayPortalFor(params, backing, fee);
  }

  // should work
  function test_PortalFacet__repayAavePortalFor_shouldWork() public {
    // we are on the destination domain where local != canonical
    utils_setupAsset(false, false);
    (TransferInfo memory params, bytes32 transferId) = utils_getParams();

    // set debt amount
    uint256 backing = 1111;
    uint256 fee = 111;
    uint256 total = backing + fee;

    s.portalDebt[transferId] = backing;
    s.portalFeeDebt[transferId] = fee;

    // mint initial balance to sender and approve
    address sender = address(111);
    TestERC20(_adopted).mint(sender, total);
    vm.prank(sender);
    TestERC20(_adopted).approve(address(this), total);

    // make call
    vm.expectCall(_adopted, abi.encodeWithSelector(IERC20.approve.selector, aavePool, total));
    vm.expectCall(aavePool, abi.encodeWithSelector(IAavePool.backUnbacked.selector, _adopted, backing, fee));
    vm.expectEmit(true, true, true, true);
    emit AavePortalRepayment(transferId, _adopted, backing, fee, sender);
    vm.prank(sender);
    utils_repayPortalFor(params, backing, fee);

    // assert balance decrement
    assertEq(IERC20(_adopted).balanceOf(sender), 0);
    assertEq(s.portalDebt[transferId], 0);
    assertEq(s.portalFeeDebt[transferId], 0);
  }
}
