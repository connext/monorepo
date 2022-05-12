// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./ForgeHelper.sol";

import {Deployer} from "./utils/Deployer.sol";
import {IConnextFacets} from "./utils/IConnextFacets.sol";

import {BaseConnextFacet} from "../contracts/diamond/facets/BaseConnextFacet.sol";
import {PortalFacet} from "../contracts/diamond/facets/PortalFacet.sol";
import {BridgeFacet} from "../contracts/diamond/facets/BridgeFacet.sol";
import {TestSetterFacet, getTestSetterFacetCut} from "./utils/TestSetterFacet.sol";
import {IDiamondCut} from "../contracts/diamond/interfaces/IDiamondCut.sol";
import {TestAavePool} from "../contracts/test/TestAavePool.sol";
import {TestERC20} from "../contracts/test/TestERC20.sol";
import {IAavePool} from "../contracts/interfaces/IAavePool.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IWrapped} from "../contracts/interfaces/IWrapped.sol";
import {IExecutor} from "../contracts/interfaces/IExecutor.sol";
import {ITokenRegistry} from "../contracts/nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import {XAppConnectionManager} from "../contracts/nomad-core/contracts/XAppConnectionManager.sol";
import {CallParams, ExecuteArgs} from "../contracts/diamond/libraries/LibConnextStorage.sol";
import {ConnextMessage} from "../contracts/diamond/libraries/ConnextMessage.sol";

contract BridgeFacetTest is ForgeHelper, Deployer {
  event AavePortalMintUnbacked(bytes32 indexed transferId, address indexed router, address asset, uint256 amount);
  event AavePortalRouterRepayment(address indexed router, address asset, uint256 amount, uint256 fee);
  event AavePortalRepayment(bytes32 indexed transferId, address asset, uint256 amount, uint256 fee);
  event AavePortalRepaymentDebt(bytes32 indexed transferId, address asset, uint256 amount, uint256 fee);

  // ============ Storage ============
  ITokenRegistry tokenRegistry = ITokenRegistry(address(1));
  IWrapped wrapper = IWrapped(address(2));
  IExecutor executor = IExecutor(address(3));
  address relayerFeeRouter = address(4);
  address xAppConnectionManager = address(5);
  address user = address(6);
  address local = address(7);

  address router = vm.addr(1);
  bytes32 remoteRouter = bytes32(uint256(uint160(address(this))));

  TestERC20 adopted;
  TestAavePool aavePool;

  uint32 originDomain = 1;
  uint32 destinationDomain = 2;

  TestSetterFacet testSetterFacet;
  IConnextFacets connext;

  // ============ Test set up ============

  function setUp() public {
    deployConnext(originDomain, xAppConnectionManager, address(tokenRegistry), address(wrapper), relayerFeeRouter);
    adopted = new TestERC20();
    aavePool = new TestAavePool();

    // TestSetterFacetCut
    testSetterFacet = new TestSetterFacet();
    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](1);
    facetCuts[0] = getTestSetterFacetCut(address(testSetterFacet));
    IDiamondCut(address(connextDiamondProxy)).diamondCut(facetCuts, address(0), "");

    connext = IConnextFacets(address(connextDiamondProxy));

    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getTokenId.selector),
      abi.encode(originDomain, bytes32(uint256(uint160(address(adopted)))))
    );
    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector),
      abi.encode(address(adopted))
    );
    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.isLocalOrigin.selector),
      abi.encode(bool(true))
    );

    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.ensureLocalToken.selector),
      abi.encode(address(adopted))
    );
    vm.mockCall(
      address(xAppConnectionManager),
      abi.encodeWithSelector(XAppConnectionManager.isReplica.selector),
      abi.encode(bool(true))
    );

    TestSetterFacet(address(connextDiamondProxy)).setTestApproveRouterForPortal(router, true);
    TestSetterFacet(address(connextDiamondProxy)).setTestCanonicalToAdopted(
      bytes32(uint256(uint160(address(adopted)))),
      address(adopted)
    );

    connext.setAavePool(address(aavePool));
    connext.proposeRouterOwnershipRenunciation();
    vm.warp(block.timestamp + 8 days);
    connext.renounceRouterOwnership();
    connext.setAavePortalFee(5);
    connext.addRelayer(address(this));
    connext.enrollRemoteRouter(originDomain, remoteRouter);

    adopted.mint(address(connext), 100 ether);
  }

  // ============ Utils ============

  function buildExecuteArgs(uint256 amount, uint256 nonce) public returns (ExecuteArgs memory, bytes32) {
    CallParams memory callParams = CallParams(user, bytes(""), originDomain, destinationDomain);

    bytes32 transferId = keccak256(
      abi.encode(nonce, callParams, user, bytes32(uint256(uint160(address(adopted)))), originDomain, amount)
    );

    address[] memory routers = new address[](1);
    routers[0] = router;

    bytes[] memory routerSignatures = new bytes[](1);
    routerSignatures[0] = buildRouterSignature(transferId, routers.length);

    return (ExecuteArgs(callParams, address(adopted), routers, routerSignatures, amount, nonce, user), transferId);
  }

  function buildRouterSignature(bytes32 transferId, uint256 pathLen) public returns (bytes memory) {
    bytes32 hash = keccak256(abi.encode(transferId, pathLen));
    bytes32 finalHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    (uint8 v, bytes32 r, bytes32 s) = vm.sign(1, finalHash);
    return abi.encodePacked(r, s, v);
  }

  function buildMessage(
    address to,
    address asset,
    bytes32 transferId,
    uint256 amount
  ) private returns (bytes memory) {
    bytes32 detailsHash = keccak256("test");

    bytes29 action = ConnextMessage.formatTransfer(bytes32(uint256(uint160(to))), amount, detailsHash, transferId);
    bytes29 tokenId = ConnextMessage.formatTokenId(originDomain, bytes32(uint256(uint160(address(adopted)))));

    return ConnextMessage.formatMessage(tokenId, action);
  }

  // ============ Execute with Aave Portals ============

  function test_BridgeFacet__execute_worksWithAave() public {
    uint256 amount = 1 ether;
    (ExecuteArgs memory args, bytes32 transferId) = buildExecuteArgs(amount, 0);

    uint256 userAmount = (amount * 9995) / 10000;

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.mintUnbacked.selector, address(adopted), userAmount, address(connext), 0)
    );

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.withdraw.selector, address(adopted), userAmount, address(connext))
    );

    vm.expectEmit(true, true, true, true);
    emit AavePortalMintUnbacked(transferId, router, address(adopted), userAmount);

    connext.execute(args);

    assertEq(connext.getAavePortalsTransfers(transferId), userAmount);
  }

  function testFail_BridgeFacet__execute_failsIfNoLiquidityAndAaveNotEnabled() public {
    uint256 amount = 1 ether;
    connext.setAavePool(address(0));
    (ExecuteArgs memory args, bytes32 transferId) = buildExecuteArgs(amount, 0);

    connext.execute(args);
  }

  function test_BridgeFacet__execute_failsIfRouterNotApprovedForPortal() public {
    uint256 amount = 1 ether;
    TestSetterFacet(address(connextDiamondProxy)).setTestApproveRouterForPortal(router, false);

    (ExecuteArgs memory args, bytes32 transferId) = buildExecuteArgs(amount, 0);

    vm.expectRevert(abi.encodeWithSelector(BridgeFacet.BridgeFacet__execute_notApprovedForPortals.selector));

    connext.execute(args);
  }

  // ============ Handle with Aave Portals ============

  function test_BridgeFacet__handle_worksWithPortals() public {
    uint256 feeNum = 5;
    uint256 feeDenom = 10000;
    uint256 amount = 1 ether;
    uint256 fee = (amount * feeNum) / feeDenom;
    bytes32 transferId = keccak256("testTransferId");
    bytes memory message = buildMessage(address(10), address(adopted), transferId, amount + fee);

    address[] memory routers = new address[](1);
    routers[0] = router;

    TestSetterFacet(address(connextDiamondProxy)).setTestAavePortalsTransfers(transferId, amount);
    TestSetterFacet(address(connextDiamondProxy)).setTestRoutedTransfers(transferId, routers);

    uint256 previousRouterBalance = connext.routerBalances(router, address(adopted));

    vm.expectCall(address(adopted), abi.encodeWithSelector(IERC20.approve.selector, address(aavePool), amount + fee));

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.backUnbacked.selector, address(adopted), amount, fee)
    );

    vm.expectEmit(true, true, true, true);
    emit AavePortalRepayment(transferId, address(adopted), amount, fee);

    connext.handle(originDomain, 0, remoteRouter, message);

    assertEq(connext.routerBalances(router, address(adopted)), previousRouterBalance);
  }

  function test_BridgeFacet__handle_creditToRouterIfNotPortalTransfer() public {
    uint256 feeNum = 5;
    uint256 feeDenom = 10000;
    uint256 amount = 1 ether;
    bytes32 transferId = keccak256("testTransferId");
    bytes memory message = buildMessage(address(10), address(adopted), transferId, amount);

    address[] memory routers = new address[](1);
    routers[0] = router;

    TestSetterFacet(address(connextDiamondProxy)).setTestAavePortalsTransfers(transferId, 0);
    TestSetterFacet(address(connextDiamondProxy)).setTestRoutedTransfers(transferId, routers);

    uint256 previousRouterBalance = connext.routerBalances(router, address(adopted));

    connext.handle(originDomain, 0, remoteRouter, message);

    assertEq(connext.routerBalances(router, address(adopted)), previousRouterBalance + amount);
  }

  function test_BridgeFacet__handle_creditToRouterLeftoversFromPortalRepayment() public {
    uint256 feeNum = 5;
    uint256 feeDenom = 10000;
    uint256 amount = 1 ether;
    uint256 leftovers = 0.5 ether;
    uint256 fee = (amount * feeNum) / feeDenom;
    bytes32 transferId = keccak256("testTransferId");
    bytes memory message = buildMessage(address(10), address(adopted), transferId, amount + fee + leftovers);

    address[] memory routers = new address[](1);
    routers[0] = router;

    TestSetterFacet(address(connextDiamondProxy)).setTestAavePortalsTransfers(transferId, amount);
    TestSetterFacet(address(connextDiamondProxy)).setTestRoutedTransfers(transferId, routers);

    uint256 previousRouterBalance = connext.routerBalances(router, address(adopted));

    vm.expectCall(address(adopted), abi.encodeWithSelector(IERC20.approve.selector, address(aavePool), amount + fee));

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.backUnbacked.selector, address(adopted), amount, fee)
    );

    vm.expectEmit(true, true, true, true);
    emit AavePortalRepayment(transferId, address(adopted), amount, fee);

    connext.handle(originDomain, 0, remoteRouter, message);

    assertEq(connext.routerBalances(router, address(adopted)), previousRouterBalance + leftovers);
  }

  function test_BridgeFacet__handle_emitDebtEventIfPortalPartiallyRepaid() public {
    uint256 feeNum = 5;
    uint256 feeDenom = 10000;
    uint256 amount = 1 ether;
    uint256 feeNotPaid = ((amount * 2) * feeNum) / feeDenom;
    bytes32 transferId = keccak256("testTransferId");
    bytes memory message = buildMessage(address(10), address(adopted), transferId, amount);

    address[] memory routers = new address[](1);
    routers[0] = router;

    TestSetterFacet(address(connextDiamondProxy)).setTestAavePortalsTransfers(transferId, amount * 2);
    TestSetterFacet(address(connextDiamondProxy)).setTestRoutedTransfers(transferId, routers);

    uint256 previousRouterBalance = connext.routerBalances(router, address(adopted));

    vm.expectCall(address(adopted), abi.encodeWithSelector(IERC20.approve.selector, address(aavePool), amount));

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.backUnbacked.selector, address(adopted), amount, 0)
    );

    vm.expectEmit(true, true, true, true);
    emit AavePortalRepaymentDebt(transferId, address(adopted), amount, feeNotPaid);

    vm.expectEmit(true, true, true, true);
    emit AavePortalRepayment(transferId, address(adopted), amount, 0);

    connext.handle(originDomain, 0, remoteRouter, message);

    assertEq(connext.routerBalances(router, address(adopted)), previousRouterBalance);
  }

  function test_BridgeFacet__handle_emitDebtEventIfPortalFeeNotRepaid() public {
    uint256 feeNum = 5;
    uint256 feeDenom = 10000;
    uint256 amount = 1 ether;
    uint256 feeNotPaid = (amount * feeNum) / feeDenom;
    bytes32 transferId = keccak256("testTransferId");
    bytes memory message = buildMessage(address(10), address(adopted), transferId, amount);

    address[] memory routers = new address[](1);
    routers[0] = router;

    TestSetterFacet(address(connextDiamondProxy)).setTestAavePortalsTransfers(transferId, amount);
    TestSetterFacet(address(connextDiamondProxy)).setTestRoutedTransfers(transferId, routers);

    uint256 previousRouterBalance = connext.routerBalances(router, address(adopted));

    vm.expectCall(address(adopted), abi.encodeWithSelector(IERC20.approve.selector, address(aavePool), amount));

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.backUnbacked.selector, address(adopted), amount, 0)
    );

    vm.expectEmit(true, true, true, true);
    emit AavePortalRepaymentDebt(transferId, address(adopted), 0, feeNotPaid);

    vm.expectEmit(true, true, true, true);
    emit AavePortalRepayment(transferId, address(adopted), amount, 0);

    connext.handle(originDomain, 0, remoteRouter, message);

    assertEq(connext.routerBalances(router, address(adopted)), previousRouterBalance);
  }

  function test_BridgeFacet__handle_notRevertIfPortalRepayFails() public {
    uint256 feeNum = 5;
    uint256 feeDenom = 10000;
    uint256 amount = 1 ether;
    uint256 fee = (amount * feeNum) / feeDenom;
    bytes32 transferId = keccak256("testTransferId");
    bytes memory message = buildMessage(address(10), address(adopted), transferId, amount + fee);

    address[] memory routers = new address[](1);
    routers[0] = router;

    TestSetterFacet(address(connextDiamondProxy)).setTestAavePortalsTransfers(transferId, amount);
    TestSetterFacet(address(connextDiamondProxy)).setTestRoutedTransfers(transferId, routers);

    // mock repay to fail
    aavePool.setRevertCall(true);

    uint256 previousRouterBalance = connext.routerBalances(router, address(adopted));

    vm.expectCall(address(adopted), abi.encodeWithSelector(IERC20.approve.selector, address(aavePool), amount + fee));

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.backUnbacked.selector, address(adopted), amount, fee)
    );

    vm.expectEmit(true, true, true, true);
    emit AavePortalRepaymentDebt(transferId, address(adopted), amount, fee);

    connext.handle(originDomain, 0, remoteRouter, message);

    // Amount should be credited to the router so it can later repay the debt
    assertEq(connext.routerBalances(router, address(adopted)), previousRouterBalance + amount + fee);
  }
}
