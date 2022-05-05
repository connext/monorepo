// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../ForgeHelper.sol";
import "../../contracts/lib/Connext/ConnextLogic.sol";
import "../../contracts/interfaces/IConnextHandler.sol";

import {TestERC20} from "../../contracts/test/TestERC20.sol";
import {TestAavePool} from "../../contracts/test/TestAavePool.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ConnextLogicTest is ForgeHelper {
  event AavePortalMintUnbacked(bytes32 indexed transferId, address indexed router, address asset, uint256 amount);
  event AavePortalRouterRepayment(address indexed router, address asset, uint256 amount, uint256 fee);
  event AavePortalRepayment(bytes32 indexed transferId, address asset, uint256 amount, uint256 fee);
  event AavePortalRepaymentDebt(bytes32 indexed transferId, address asset, uint256 amount, uint256 fee);

  mapping(bytes32 => address[]) internal _routedTransfers;
  mapping(bytes32 => bool) internal _reconciledTransfers;
  mapping(address => mapping(address => uint256)) internal _routerBalances;
  mapping(bytes32 => IStableSwap) internal _adoptedToLocalPools;
  mapping(bytes32 => address) internal _canonicalToAdopted;
  RouterPermissionsManagerInfo internal _routerInfo;
  mapping(bytes32 => address) internal _transferRelayer;
  mapping(bytes32 => uint256) internal _aavePortalsTransfers;

  ITokenRegistry tokenRegistry = ITokenRegistry(address(1));
  IWrapped wrapper = IWrapped(address(2));
  IExecutor executor = IExecutor(address(3));
  TestAavePool aavePool;
  address user = address(5);
  address local = address(6);
  address router = vm.addr(1);

  uint32 originDomain = 1;
  uint32 destinationDomain = 2;
  TestERC20 adopted;

  function setUp() public {
    adopted = new TestERC20();
    aavePool = new TestAavePool();

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

    _routerInfo.approvedForPortalRouters[router] = true;
    _canonicalToAdopted[bytes32(uint256(uint160(address(adopted))))] = address(adopted);
  }

  // ============ Utils ============

  function buildExecuteArgs(
    uint256 amount,
    uint256 nonce,
    bool enableAave
  ) public returns (ConnextLogic.ExecuteLibArgs memory, bytes32) {
    IConnextHandler.CallParams memory callParams = IConnextHandler.CallParams(
      user,
      bytes(""),
      originDomain,
      destinationDomain
    );

    bytes32 transferId = keccak256(
      abi.encode(nonce, callParams, user, bytes32(uint256(uint160(address(adopted)))), originDomain, amount)
    );

    address[] memory routers = new address[](1);
    routers[0] = router;

    bytes[] memory routerSignatures = new bytes[](1);
    routerSignatures[0] = buildRouterSignature(transferId, routers.length);

    return (
      ConnextLogic.ExecuteLibArgs(
        IConnextHandler.ExecuteArgs(callParams, address(adopted), routers, routerSignatures, amount, nonce, user),
        true,
        5,
        tokenRegistry,
        wrapper,
        executor,
        9995,
        10000,
        enableAave ? address(aavePool) : address(0)
      ),
      transferId
    );
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

  function test_ConnextLogic__execute_worksWithAave() public {
    uint256 amount = 1 ether;
    (ConnextLogic.ExecuteLibArgs memory args, bytes32 transferId) = buildExecuteArgs(amount, 0, true);

    uint256 userAmount = (amount * 9995) / 10000;

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.mintUnbacked.selector, address(adopted), userAmount, address(this), 0)
    );

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.withdraw.selector, address(adopted), userAmount, address(this))
    );

    vm.expectEmit(true, true, true, true);
    emit AavePortalMintUnbacked(transferId, router, address(adopted), userAmount);

    ConnextLogic.execute(
      args,
      _routedTransfers,
      _reconciledTransfers,
      _routerBalances,
      _adoptedToLocalPools,
      _canonicalToAdopted,
      _routerInfo,
      _transferRelayer,
      _aavePortalsTransfers
    );

    assertEq(_aavePortalsTransfers[transferId], userAmount);
  }

  function testFail_ConnextLogic__execute_failsIfNoLiquidityAndAaveNotEnabled() public {
    uint256 amount = 1 ether;
    (ConnextLogic.ExecuteLibArgs memory args, bytes32 transferId) = buildExecuteArgs(amount, 0, false);

    ConnextLogic.execute(
      args,
      _routedTransfers,
      _reconciledTransfers,
      _routerBalances,
      _adoptedToLocalPools,
      _canonicalToAdopted,
      _routerInfo,
      _transferRelayer,
      _aavePortalsTransfers
    );
  }

  function test_ConnextLogic__execute_failsIfRouterNotApprovedForPortal() public {
    uint256 amount = 1 ether;
    _routerInfo.approvedForPortalRouters[router] = false;

    (ConnextLogic.ExecuteLibArgs memory args, bytes32 transferId) = buildExecuteArgs(amount, 0, true);

    vm.expectRevert(abi.encodeWithSelector(ConnextLogic.ConnextLogic__execute_notApprovedForPortals.selector));

    ConnextLogic.execute(
      args,
      _routedTransfers,
      _reconciledTransfers,
      _routerBalances,
      _adoptedToLocalPools,
      _canonicalToAdopted,
      _routerInfo,
      _transferRelayer,
      _aavePortalsTransfers
    );
  }

  // ============ repayAavePortal ============

  function test_ConnextLogic__repayAavePortal_works() public {
    uint256 initialBalance = 100 ether;
    _routerInfo.approvedForPortalRouters[msg.sender] = true;
    _routerBalances[msg.sender][address(adopted)] = initialBalance;

    uint256 amount = 1 ether;
    uint256 fee = 0.1 ether;

    vm.expectCall(address(adopted), abi.encodeWithSelector(IERC20.approve.selector, address(aavePool), amount + fee));

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.backUnbacked.selector, address(adopted), amount, fee)
    );

    vm.expectEmit(true, true, true, true);
    emit AavePortalRouterRepayment(msg.sender, address(adopted), amount, fee);

    ConnextLogic.repayAavePortal(
      address(adopted),
      amount,
      fee,
      address(aavePool),
      _routerBalances,
      _routerInfo.approvedForPortalRouters
    );

    assertEq(_routerBalances[msg.sender][address(adopted)], initialBalance - amount - fee);
  }

  function test_ConnextLogic__repayAavePortal_failsIfNotApprovedForPortals() public {
    vm.expectRevert(abi.encodeWithSelector(ConnextLogic.ConnextLogic__repayAavePortal_notApprovedForPortals.selector));

    ConnextLogic.repayAavePortal(
      address(1),
      10,
      1,
      address(aavePool),
      _routerBalances,
      _routerInfo.approvedForPortalRouters
    );
  }

  function test_ConnextLogic__repayAavePortal_failsIfInsufficientAmount() public {
    _routerInfo.approvedForPortalRouters[msg.sender] = true;
    vm.expectRevert(abi.encodeWithSelector(ConnextLogic.ConnextLogic__repayAavePortal_insufficientFunds.selector));

    ConnextLogic.repayAavePortal(
      address(1),
      10,
      1,
      address(aavePool),
      _routerBalances,
      _routerInfo.approvedForPortalRouters
    );
  }

  // ============ Reconcile with Aave Portals ============

  function test_ConnextLogic__reconcile_worksWithPortals() public {
    uint256 feeNum = 5;
    uint256 feeDenom = 10000;
    uint256 amount = 1 ether;
    uint256 fee = (amount * feeNum) / feeDenom;
    bytes32 transferId = keccak256("testTransferId");
    bytes memory message = buildMessage(address(10), address(adopted), transferId, amount + fee);

    address[] memory routers = new address[](1);
    routers[0] = router;

    _aavePortalsTransfers[transferId] = amount;
    _routedTransfers[transferId] = routers;

    uint256 previousRouterBalance = _routerBalances[router][address(adopted)];

    vm.expectCall(address(adopted), abi.encodeWithSelector(IERC20.approve.selector, address(aavePool), amount + fee));

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.backUnbacked.selector, address(adopted), amount, fee)
    );

    vm.expectEmit(true, true, true, true);
    emit AavePortalRepayment(transferId, address(adopted), amount, fee);

    ConnextLogic.reconcile(
      ConnextLogic.ReconcileArgs(originDomain, message, tokenRegistry, address(aavePool), feeNum, feeDenom),
      _reconciledTransfers,
      _routedTransfers,
      _routerBalances,
      _aavePortalsTransfers,
      _adoptedToLocalPools,
      _canonicalToAdopted
    );

    assertEq(_routerBalances[router][address(adopted)], previousRouterBalance);
  }

  function test_ConnextLogic__reconcile_creditToRouterIfNotPortalTransfer() public {
    uint256 feeNum = 5;
    uint256 feeDenom = 10000;
    uint256 amount = 1 ether;
    bytes32 transferId = keccak256("testTransferId");
    bytes memory message = buildMessage(address(10), address(adopted), transferId, amount);

    address[] memory routers = new address[](1);
    routers[0] = router;

    _aavePortalsTransfers[transferId] = 0;
    _routedTransfers[transferId] = routers;

    uint256 previousRouterBalance = _routerBalances[router][address(adopted)];

    ConnextLogic.reconcile(
      ConnextLogic.ReconcileArgs(originDomain, message, tokenRegistry, address(aavePool), feeNum, feeDenom),
      _reconciledTransfers,
      _routedTransfers,
      _routerBalances,
      _aavePortalsTransfers,
      _adoptedToLocalPools,
      _canonicalToAdopted
    );

    assertEq(_routerBalances[router][address(adopted)], previousRouterBalance + amount);
  }

  function test_ConnextLogic__reconcile_creditToRouterLeftoversFromPortalRepayment() public {
    uint256 feeNum = 5;
    uint256 feeDenom = 10000;
    uint256 amount = 1 ether;
    uint256 leftovers = 0.5 ether;
    uint256 fee = (amount * feeNum) / feeDenom;
    bytes32 transferId = keccak256("testTransferId");
    bytes memory message = buildMessage(address(10), address(adopted), transferId, amount + fee + leftovers);

    address[] memory routers = new address[](1);
    routers[0] = router;

    _aavePortalsTransfers[transferId] = amount;
    _routedTransfers[transferId] = routers;

    uint256 previousRouterBalance = _routerBalances[router][address(adopted)];

    vm.expectCall(address(adopted), abi.encodeWithSelector(IERC20.approve.selector, address(aavePool), amount + fee));

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.backUnbacked.selector, address(adopted), amount, fee)
    );

    vm.expectEmit(true, true, true, true);
    emit AavePortalRepayment(transferId, address(adopted), amount, fee);

    ConnextLogic.reconcile(
      ConnextLogic.ReconcileArgs(originDomain, message, tokenRegistry, address(aavePool), feeNum, feeDenom),
      _reconciledTransfers,
      _routedTransfers,
      _routerBalances,
      _aavePortalsTransfers,
      _adoptedToLocalPools,
      _canonicalToAdopted
    );

    assertEq(_routerBalances[router][address(adopted)], previousRouterBalance + leftovers);
  }

  function test_ConnextLogic__reconcile_emitDebtEventIfPortalPartiallyRepaid() public {
    uint256 feeNum = 5;
    uint256 feeDenom = 10000;
    uint256 amount = 1 ether;
    uint256 feeNotPaid = ((amount * 2) * feeNum) / feeDenom;
    bytes32 transferId = keccak256("testTransferId");
    bytes memory message = buildMessage(address(10), address(adopted), transferId, amount);

    address[] memory routers = new address[](1);
    routers[0] = router;

    _aavePortalsTransfers[transferId] = amount * 2;
    _routedTransfers[transferId] = routers;

    uint256 previousRouterBalance = _routerBalances[router][address(adopted)];

    vm.expectCall(address(adopted), abi.encodeWithSelector(IERC20.approve.selector, address(aavePool), amount));

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.backUnbacked.selector, address(adopted), amount, 0)
    );

    vm.expectEmit(true, true, true, true);
    emit AavePortalRepaymentDebt(transferId, address(adopted), amount, feeNotPaid);

    vm.expectEmit(true, true, true, true);
    emit AavePortalRepayment(transferId, address(adopted), amount, 0);

    ConnextLogic.reconcile(
      ConnextLogic.ReconcileArgs(originDomain, message, tokenRegistry, address(aavePool), feeNum, feeDenom),
      _reconciledTransfers,
      _routedTransfers,
      _routerBalances,
      _aavePortalsTransfers,
      _adoptedToLocalPools,
      _canonicalToAdopted
    );

    assertEq(_routerBalances[router][address(adopted)], previousRouterBalance);
  }

  function test_ConnextLogic__reconcile_emitDebtEventIfPortalFeeNotRepaid() public {
    uint256 feeNum = 5;
    uint256 feeDenom = 10000;
    uint256 amount = 1 ether;
    uint256 feeNotPaid = (amount * feeNum) / feeDenom;
    bytes32 transferId = keccak256("testTransferId");
    bytes memory message = buildMessage(address(10), address(adopted), transferId, amount);

    address[] memory routers = new address[](1);
    routers[0] = router;

    _aavePortalsTransfers[transferId] = amount;
    _routedTransfers[transferId] = routers;

    uint256 previousRouterBalance = _routerBalances[router][address(adopted)];

    vm.expectCall(address(adopted), abi.encodeWithSelector(IERC20.approve.selector, address(aavePool), amount));

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.backUnbacked.selector, address(adopted), amount, 0)
    );

    vm.expectEmit(true, true, true, true);
    emit AavePortalRepaymentDebt(transferId, address(adopted), 0, feeNotPaid);

    vm.expectEmit(true, true, true, true);
    emit AavePortalRepayment(transferId, address(adopted), amount, 0);

    ConnextLogic.reconcile(
      ConnextLogic.ReconcileArgs(originDomain, message, tokenRegistry, address(aavePool), feeNum, feeDenom),
      _reconciledTransfers,
      _routedTransfers,
      _routerBalances,
      _aavePortalsTransfers,
      _adoptedToLocalPools,
      _canonicalToAdopted
    );

    assertEq(_routerBalances[router][address(adopted)], previousRouterBalance);
  }

  function test_ConnextLogic__reconcile_notRevertIfPortalRepayFails() public {
    uint256 feeNum = 5;
    uint256 feeDenom = 10000;
    uint256 amount = 1 ether;
    uint256 fee = (amount * feeNum) / feeDenom;
    bytes32 transferId = keccak256("testTransferId");
    bytes memory message = buildMessage(address(10), address(adopted), transferId, amount + fee);

    address[] memory routers = new address[](1);
    routers[0] = router;

    _aavePortalsTransfers[transferId] = amount;
    _routedTransfers[transferId] = routers;

    // mock repay to fail
    aavePool.setRevertCall(true);

    uint256 previousRouterBalance = _routerBalances[router][address(adopted)];

    vm.expectCall(address(adopted), abi.encodeWithSelector(IERC20.approve.selector, address(aavePool), amount + fee));

    vm.expectCall(
      address(aavePool),
      abi.encodeWithSelector(IAavePool.backUnbacked.selector, address(adopted), amount, fee)
    );

    vm.expectEmit(true, true, true, true);
    emit AavePortalRepaymentDebt(transferId, address(adopted), amount, fee);

    ConnextLogic.reconcile(
      ConnextLogic.ReconcileArgs(originDomain, message, tokenRegistry, address(aavePool), feeNum, feeDenom),
      _reconciledTransfers,
      _routedTransfers,
      _routerBalances,
      _aavePortalsTransfers,
      _adoptedToLocalPools,
      _canonicalToAdopted
    );

    // Amount should be credited to the router so it can later repay the debt
    assertEq(_routerBalances[router][address(adopted)], previousRouterBalance + amount + fee);
  }
}
