// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../ForgeHelper.sol";

import {Deployer} from "../utils/Deployer.sol";
import {IConnextHandler} from "../../contracts/interfaces/IConnextHandler.sol";
import {IStableSwap} from "../../contracts/interfaces/IStableSwap.sol";

import {BaseConnextFacet} from "../../contracts/facets/BaseConnextFacet.sol";
import {ConnextMessage} from "../../contracts/libraries/ConnextMessage.sol";
import {PortalFacet} from "../../contracts/facets/PortalFacet.sol";
import {IDiamondCut} from "../../contracts/interfaces/IDiamondCut.sol";
import {TestAavePool} from "../../contracts/test/TestAavePool.sol";
import {TestERC20} from "../../contracts/test/TestERC20.sol";
import {IAavePool} from "../../contracts/interfaces/IAavePool.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./FacetHelper.sol";

contract PortalFacetTest is PortalFacet, FacetHelper {
  // ============ Storage ============
  uint256 domain = _originDomain;
  address bridgeRouter = address(1);
  address wrapper = address(3);
  address relayerFeeRouter = address(4);
  address xAppConnectionManager = address(5);

  // ============ Test set up ============

  function setUp() public {
    setDefaults(true);

    // setup asset context
    s.adoptedToCanonical[_adopted] = ConnextMessage.TokenId(_canonicalDomain, _canonicalTokenId);
    s.adoptedToLocalPools[_canonicalTokenId] = IStableSwap(_stableSwap);
    s.canonicalToAdopted[_canonicalTokenId] = _adopted;

    vm.mockCall(
      _tokenRegistry,
      abi.encodeWithSelector(ITokenRegistry.getTokenId.selector),
      abi.encode(_canonicalDomain, _canonicalTokenId)
    );
  }

  // ============ setAavePool ============

  function test_PortalFacet__setAavePool_works() public {
    address aavePool = address(100);
    assertEq(this.aavePool(), address(0));

    this.setAavePool(aavePool);

    assertEq(this.aavePool(), aavePool);
  }

  function test_PortalFacet__setAavePool_failsIfNotOwner() public {
    address aavePool = address(100);

    vm.prank(address(10));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));
    this.setAavePool(aavePool);
  }

  // ============ setAavePortalFee ============

  function test_PortalFacet__setAavePortalFee_works() public {
    uint256 fee = 5;
    assertEq(this.aavePortalFee(), 0);

    this.setAavePortalFee(fee);

    assertEq(this.aavePortalFee(), fee);
  }

  function test_PortalFacet__setAavePortalFee_failsIfNotOwner() public {
    uint256 fee = 5;

    vm.prank(address(10));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));

    this.setAavePortalFee(fee);
  }

  function test_PortalFacet__setAavePortalFee_failsIfInvalidFee() public {
    uint256 fee = _liquidityFeeDenominator + 1;

    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__setAavePortalFee_invalidFee.selector));
    this.setAavePortalFee(fee);
  }

  // ============ repayAavePortal ============

  function test_PortalFacet__repayAavePortal_works() public {
    // uint256 initialBalance = 100 ether;
    // TestSetterFacet(address(connextDiamondProxy)).setTestApproveRouterForPortal(address(this), true);
    // TestSetterFacet(address(connextDiamondProxy)).setTestRouterBalance(address(this), address(adopted), initialBalance);
    // this.setAavePool(address(aavePool));
    // uint256 amount = 1 ether;
    // uint256 fee = 0.1 ether;
    // vm.expectCall(address(adopted), abi.encodeWithSelector(IERC20.approve.selector, address(aavePool), amount + fee));
    // vm.expectCall(
    //   address(aavePool),
    //   abi.encodeWithSelector(IAavePool.backUnbacked.selector, address(adopted), amount, fee)
    // );
    // vm.expectEmit(true, true, true, true);
    // emit AavePortalRouterRepayment(address(this), address(adopted), amount, fee);
    // this.repayAavePortal(address(adopted), amount, fee);
    // assertEq(this.routerBalances(address(this), address(adopted)), initialBalance - amount - fee);
  }

  function test_PortalFacet__repayAavePortal_failsIfNotApprovedForPortals() public {
    vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__repayAavePortal_notApprovedForPortals.selector));

    this.repayAavePortal(address(1), 10, 1);
  }

  function test_PortalFacet__repayAavePortal_failsIfInsufficientAmount() public {
    // TestSetterFacet(address(connextDiamondProxy)).setTestApproveRouterForPortal(address(this), true);
    // vm.expectRevert(abi.encodeWithSelector(PortalFacet.PortalFacet__repayAavePortal_insufficientFunds.selector));
    // this.repayAavePortal(address(1), 10, 1);
  }
}
