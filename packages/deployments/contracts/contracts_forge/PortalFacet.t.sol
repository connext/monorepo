// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./ForgeHelper.sol";

import {Deployer} from "./utils/Deployer.sol";
import {IConnextFacets} from "./utils/IConnextFacets.sol";

import {BaseConnextFacet} from "../contracts/diamond/facets/BaseConnextFacet.sol";
import {PortalFacet} from "../contracts/diamond/facets/PortalFacet.sol";
import {TestSetterFacet, getTestSetterFacetCut} from "./utils/TestSetterFacet.sol";
import {IDiamondCut} from "../contracts/diamond/interfaces/IDiamondCut.sol";
import {TestAavePool} from "../contracts/test/TestAavePool.sol";
import {TestERC20} from "../contracts/test/TestERC20.sol";
import {IAavePool} from "../contracts/interfaces/IAavePool.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PortalFacetTest is ForgeHelper, Deployer {
  event AavePortalRouterRepayment(address indexed router, address asset, uint256 amount, uint256 fee);

  event RouterApprovedForPortal(address router, address caller);
  event RouterDisapprovedForPortal(address router, address caller);

  // ============ Storage ============
  uint256 domain = 1;
  address bridgeRouter = address(1);
  address tokenRegistry = address(2);
  address wrapper = address(3);
  address relayerFeeRouter = address(4);
  address xAppConnectionManager = address(5);
  TestAavePool aavePool;
  TestERC20 adopted;

  TestSetterFacet testSetterFacet;
  IConnextFacets connext;

  // ============ Test set up ============

  function setUp() public {
    deployConnext(domain, xAppConnectionManager, tokenRegistry, wrapper, relayerFeeRouter);
    aavePool = new TestAavePool();
    adopted = new TestERC20();

    // TestSetterFacetCut
    testSetterFacet = new TestSetterFacet();
    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](1);
    facetCuts[0] = getTestSetterFacetCut(address(testSetterFacet));
    IDiamondCut(address(connextDiamondProxy)).diamondCut(facetCuts, address(0), "");

    connext = IConnextFacets(address(connextDiamondProxy));
  }

  // ============ setAavePool ============

  function test_PortalFacet__setAavePool_works() public {
    address aavePool = address(100);
    assertEq(connext.aavePool(), address(0));

    connext.setAavePool(aavePool);

    assertEq(connext.aavePool(), aavePool);
  }

  function test_PortalFacet__setAavePool_failsIfNotOwner() public {
    address aavePool = address(100);

    vm.prank(address(10));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));
    connext.setAavePool(aavePool);
  }

  // ============ setAavePortalFee ============

  function test_PortalFacet__setAavePortalFee_works() public {
    uint256 fee = 5;
    assertEq(connext.aavePortalFee(), 0);

    connext.setAavePortalFee(fee);

    assertEq(connext.aavePortalFee(), fee);
  }

  function test_PortalFacet__setAavePortalFee_failsIfNotOwner() public {
    uint256 fee = 5;

    vm.prank(address(10));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));

    connext.setAavePortalFee(fee);
  }

  function test_PortalFacet__setAavePortalFee_failsIfInvalidFee() public {
    uint256 fee = connext.LIQUIDITY_FEE_DENOMINATOR() + 1;

    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__setAavePortalFee_invalidFee.selector));
    connext.setAavePortalFee(fee);
  }

  // ============ approveRouterForPortal ============

  function test_PortalFacet__approveRouterForPortal_works() public {
    address _router = address(1);
    connext.setupRouter(_router, _router, _router);

    assertEq(connext.getRouterApprovalForPortal(_router), false);

    vm.expectEmit(true, true, true, true);
    emit RouterApprovedForPortal(_router, address(this));

    connext.approveRouterForPortal(_router);

    assertEq(connext.getRouterApprovalForPortal(_router), true);
  }

  function test_PortalFacet__approveRouterForPortal_failsIfNotOwner() public {
    address _router = address(1);
    connext.setupRouter(_router, _router, _router);

    vm.prank(address(1));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));
    connext.approveRouterForPortal(_router);
  }

  function test_PortalFacet__approveRouterForPortal_failsIfNotRouter() public {
    address _router = address(1);

    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__approveRouterForPortal_notRouter.selector));
    connext.approveRouterForPortal(_router);
  }

  function test_PortalFacet__approveRouterForPortal_failsIfAlreadyApproved() public {
    address _router = address(1);
    connext.setupRouter(_router, _router, _router);
    connext.approveRouterForPortal(_router);

    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__approveRouterForPortal_alreadyApproved.selector));
    connext.approveRouterForPortal(_router);
  }

  // ============ disapproveRouterForPortal ============

  function test_PortalFacet__disapproveRouterForPortal_works() public {
    address _router = address(1);
    connext.setupRouter(_router, _router, _router);
    connext.approveRouterForPortal(_router);

    assertEq(connext.getRouterApprovalForPortal(_router), true);

    vm.expectEmit(true, true, true, true);
    emit RouterDisapprovedForPortal(_router, address(this));

    connext.disapproveRouterForPortal(_router);

    assertEq(connext.getRouterApprovalForPortal(_router), false);
  }

  function test_PortalFacet__disapproveRouterForPortal_failsIfNotOwner() public {
    address _router = address(1);
    connext.setupRouter(_router, _router, _router);
    connext.approveRouterForPortal(_router);

    vm.prank(address(1));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));
    connext.disapproveRouterForPortal(_router);
  }

  function test_PortalFacet__disapproveRouterForPortal_failsIfNotApproved() public {
    address _router = address(1);

    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__disapproveRouterForPortal_notApproved.selector));
    connext.disapproveRouterForPortal(_router);
  }

  // ============ repayAavePortal ============

  function test_PortalFacet__repayAavePortal_works() public {
    uint256 initialBalance = 100 ether;
    TestSetterFacet(address(connextDiamondProxy)).setTestApproveRouterForPortal(address(this), true);
    TestSetterFacet(address(connextDiamondProxy)).setTestRouterBalance(address(this), address(adopted), initialBalance);
    connext.setAavePool(address(aavePool));

    uint256 amount = 1 ether;
    uint256 fee = 0.1 ether;

    vm.expectCall(address(adopted), abi.encodeWithSelector(IERC20.approve.selector, address(aavePool), amount + fee));

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.backUnbacked.selector, address(adopted), amount, fee)
    );

    vm.expectEmit(true, true, true, true);
    emit AavePortalRouterRepayment(address(this), address(adopted), amount, fee);

    connext.repayAavePortal(address(adopted), amount, fee);

    assertEq(connext.routerBalances(address(this), address(adopted)), initialBalance - amount - fee);
  }

  function test_PortalFacet__repayAavePortal_failsIfNotApprovedForPortals() public {
    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__repayAavePortal_notApprovedForPortals.selector));

    connext.repayAavePortal(address(1), 10, 1);
  }

  function test_PortalFacet__repayAavePortal_failsIfInsufficientAmount() public {
    TestSetterFacet(address(connextDiamondProxy)).setTestApproveRouterForPortal(address(this), true);
    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__repayAavePortal_insufficientFunds.selector));

    connext.repayAavePortal(address(1), 10, 1);
  }
}
