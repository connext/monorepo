// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {XAppConnectionManager, TypeCasts} from "../../../../contracts/nomad-core/contracts/XAppConnectionManager.sol";
import {TypedMemView} from "../../../../contracts/nomad-core/libs/TypedMemView.sol";

import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";

import {NomadFacet} from "../../../../contracts/core/connext/facets/NomadFacet.sol";
import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {CallParams, ExecuteArgs, XCallArgs} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";

import "../../../utils/Mock.sol";
import "../../../utils/FacetHelper.sol";

contract NomadFacetTest is NomadFacet, FacetHelper {
  // ============ Libs ============
  using TypedMemView for bytes29;
  using TypedMemView for bytes;

  struct PortalInfo {
    uint256 fee;
    uint256 debt;
    uint256 total;
    bool aaveReturns;
  }

  struct SwapInfo {
    uint256 input;
    uint256 output; // the equivalent amount of `out` token for given `in`
  }

  // ========== Storage ===========
  // diamond storage contract owner
  address _ds_owner = address(987654321);

  // aave pool details
  address _aavePool;

  // default origin sender
  address _originSender = address(4);

  // relayer fee
  uint256 _relayerFee = 0.1 ether;

  // default amount
  uint256 _amount = 1.1 ether;

  // default nonce on xcall
  uint256 _nonce = 1;

  // default recovery address
  address constant _recovery = address(121212);

  // default CallParams
  CallParams _params =
    CallParams(
      address(11), // to
      bytes(""), // callData
      _originDomain, // origin domain
      _destinationDomain, // destination domain
      address(112233332211), // agent
      _recovery, // recovery address
      false, // forceSlow
      false, // receiveLocal
      address(0), // callback
      0, // callbackFee
      _relayerFee, // relayer fee
      9900 // slippage tol
    );

  // ============ Test set up ============
  function setUp() public {
    // Deploy any needed contracts.
    utils_deployContracts();
    utils_deployAssetContracts();

    vm.prank(address(this));
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    ds.contractOwner = _ds_owner;
  }

  // ============ Utils ============
  // Used in set up for deploying any needed peripheral contracts.
  function utils_deployContracts() public {
    // setup aave pool
    _aavePool = address(new MockPool(false));
    s.aavePool = _aavePool;
  }

  // Meant to mimic the corresponding `_getTransferId` method in the BridgeFacet contract.
  function utils_getTransferIdFromXCallArgs(
    XCallArgs memory _args,
    address sender,
    bytes32 canonicalId,
    uint32 canonicalDomain
  ) public view returns (bytes32) {
    return keccak256(abi.encode(s.nonce, _args.params, sender, canonicalId, canonicalDomain, _args.amount));
  }

  // Makes some mock xcall arguments using params set in storage.
  function utils_makeXCallArgs() public returns (bytes32, XCallArgs memory) {
    // get args
    XCallArgs memory args = XCallArgs(
      _params,
      _adopted == address(s.wrapper) ? address(0) : _adopted, // transactingAssetId : could be adopted, local, or wrapped.
      _amount
    );
    // generate transfer id
    bytes32 transferId = utils_getTransferIdFromXCallArgs(args, _originSender, _canonicalId, _canonicalDomain);

    return (transferId, args);
  }

  function utils_makeXCallArgs(address transactingAssetId) public returns (bytes32, XCallArgs memory) {
    // get args
    XCallArgs memory args = XCallArgs(
      _params,
      transactingAssetId, // transactingAssetId : could be adopted, local, or wrapped.
      _amount
    );
    // generate transfer id
    bytes32 transferId = utils_getTransferIdFromXCallArgs(args, _originSender, _canonicalId, _canonicalDomain);

    return (transferId, args);
  }

  // Wraps reconcile in order to enable externalizing the call.
  function utils_wrappedReconcile(uint32 origin, bytes memory message) external {
    _reconcile(origin, message);
  }

  function utils_setPortals(
    bytes32 _id,
    uint256 _amount,
    uint256 _fee
  ) public returns (PortalInfo memory) {
    s.portalFeeDebt[_id] = _fee;
    s.portalDebt[_id] = _amount;
    return PortalInfo(_fee, _amount, _fee + _amount, true);
  }

  function utils_setPortals(bytes32 _id, uint256 _amount) public returns (PortalInfo memory) {
    return utils_setPortals(_id, _amount, (_amount * _portalFeeNumerator) / _liquidityFeeDenominator);
  }

  // Mimics the xcall message formatting. Reduced functionality : won't burn any tokens, for example.
  function utils_formatMessage(
    address _to,
    address _asset,
    bytes32 _transferId,
    uint256 _amount
  ) public returns (bytes memory) {
    IBridgeToken token = IBridgeToken(_asset);

    bytes32 detailsHash;
    if (s.tokenRegistry.isLocalOrigin(_asset)) {
      detailsHash = ConnextMessage.formatDetailsHash(token.name(), token.symbol(), token.decimals());
    } else {
      detailsHash = token.detailsHash();
    }

    bytes29 action = ConnextMessage.formatTransfer(TypeCasts.addressToBytes32(_to), _amount, detailsHash, _transferId);
    (uint32 canonicalDomain, bytes32 canonicalId) = s.tokenRegistry.getTokenId(_asset);
    bytes29 tokenId = ConnextMessage.formatTokenId(canonicalDomain, canonicalId);

    return ConnextMessage.formatMessage(tokenId, action);
  }

  // ============ Helpers ===============
  function helpers_setupReconcilePortalAssertions(
    bytes32 transferId,
    XCallArgs memory args,
    PortalInfo memory init,
    PortalInfo memory repayment,
    uint256 amountIn,
    uint256 amountOut
  ) public {
    if (repayment.total == 0) {
      // noting to assert
      return;
    }
    // if local != adopted, need to swap into adopted
    if (_local != _adopted) {
      // should call calculate always
      vm.expectCall(
        _stableSwap,
        abi.encodeWithSelector(IStableSwap.calculateSwapFromAddress.selector, _local, _adopted, args.amount)
      );

      // will swap and repay IFF within slippage
      if (amountIn <= args.amount) {
        // slippage ok, call approve
        vm.expectCall(_local, abi.encodeWithSelector(IERC20.approve.selector, _stableSwap, amountIn));
        // should call swap
        vm.expectCall(
          _stableSwap,
          abi.encodeWithSelector(IStableSwap.swapExactOut.selector, repayment.total, _local, _adopted, args.amount)
        );
      } // otherwise slippage is too high and it should not try to repay the rest of the loan
    }

    if (amountIn != 0) {
      // approval of pool for sum
      vm.expectCall(_adopted, abi.encodeWithSelector(IERC20.approve.selector, _aavePool, repayment.total));

      // approval of payback
      vm.expectCall(
        _aavePool,
        abi.encodeWithSelector(IAavePool.backUnbacked.selector, _adopted, repayment.debt, repayment.fee)
      );

      vm.expectEmit(true, true, true, true);
      emit AavePortalRepayment(transferId, _adopted, repayment.debt, repayment.fee);

      // check if there will be a debt event
      if (repayment.total < init.total) {
        // // FIXME: logs are the same in the corresponding event (when insufficient fees)
        // // but `expectEmit` call is not working
        // vm.expectEmit(true, false, false, true);
        // emit AavePortalRepaymentDebt(transferId, _adopted, init.debt - repayment.debt, init.fee - repayment.fee);
      }
    } else {
      // slippage maximums hit, emit full debt in event
      vm.expectEmit(true, true, true, true);
      emit AavePortalRepaymentDebt(transferId, _adopted, init.debt, init.fee);
    }
  }

  // Helper for calling `reconcile` and asserting expected behavior.
  function helpers_reconcileAndAssert(
    bytes32 transferId,
    XCallArgs memory args,
    bytes4 expectedError,
    PortalInfo memory repayment,
    SwapInfo memory swap
  ) public {
    PortalInfo memory init = PortalInfo(
      s.portalFeeDebt[transferId],
      s.portalDebt[transferId],
      s.portalDebt[transferId] + s.portalFeeDebt[transferId],
      true
    );
    bool isNative = args.transactingAssetId == address(0);
    bool shouldSucceed = keccak256(abi.encode(expectedError)) == keccak256(abi.encode(bytes4("")));

    // Derive message from xcall arguments.
    bytes memory message = utils_formatMessage(_params.to, _local, transferId, args.amount);

    uint256[] memory routerBalances = new uint256[](s.routedTransfers[transferId].length);
    for (uint256 i = 0; i < s.routedTransfers[transferId].length; i++) {
      // Warming up the slot in order to make gas estimates more accurate to appropriate conditions.
      s.routerBalances[s.routedTransfers[transferId][i]][_local] = 1 ether;
      routerBalances[i] = 1 ether;
    }

    // Get pre-reconcile balances.
    uint256 prevBalance;
    if (isNative) {
      prevBalance = payable(address(this)).balance;
    } else {
      prevBalance = IERC20(_local).balanceOf(address(this));
    }

    // Mock calls for swap if needed
    if (_local != _adopted && init.total != 0) {
      // mock calculate equivalent of bridged amount in adopted
      vm.mockCall(
        _stableSwap,
        abi.encodeWithSelector(IStableSwap.calculateSwapFromAddress.selector),
        abi.encode(swap.output)
      );
      vm.mockCall(
        _stableSwap,
        abi.encodeWithSelector(IStableSwap.calculateSwapOutFromAddress.selector),
        abi.encode(swap.input)
      );
      // mock swap
      vm.mockCall(_stableSwap, abi.encodeWithSelector(IStableSwap.swapExactOut.selector), abi.encode(swap.input));
    }

    if (!repayment.aaveReturns) {
      // Force failure on call
      _aavePool = address(new MockPool(true));
      s.aavePool = _aavePool;
    }

    if (shouldSucceed) {
      // check that the mint is called properly
      if (_local != _canonical) {
        vm.expectCall(_local, abi.encodeWithSelector(TestERC20.mint.selector, address(this), args.amount));
      }

      helpers_setupReconcilePortalAssertions(transferId, args, init, repayment, swap.input, swap.output);

      vm.expectEmit(true, true, true, true);
      emit Reconciled(transferId, _originDomain, s.routedTransfers[transferId], _local, args.amount, address(this));
    } else {
      vm.expectRevert(expectedError);
    }

    this.utils_wrappedReconcile(_originDomain, message);

    if (shouldSucceed) {
      assertEq(s.reconciledTransfers[transferId], true);
      address[] memory routers = s.routedTransfers[transferId];
      if (routers.length != 0) {
        uint256 routerAmt;
        if (init.total != 0 && repayment.aaveReturns) {
          routerAmt = swap.input > args.amount ? args.amount : args.amount - swap.input;
        } else {
          routerAmt = args.amount / s.routedTransfers[transferId].length;
        }
        // Fast liquidity route. Should have reimbursed routers.
        for (uint256 i = 0; i < routers.length; i++) {
          assertEq(s.routerBalances[routers[i]][_local], routerBalances[i] + routerAmt);
        }
      }

      if (init.total != 0) {
        // assert repayment
        assertEq(s.portalDebt[transferId], init.debt - repayment.debt);
        assertEq(s.portalFeeDebt[transferId], init.fee - repayment.fee);
      }
    }
  }

  function helpers_reconcileAndAssert(
    bytes32 transferId,
    XCallArgs memory args,
    bytes4 expectedError,
    PortalInfo memory repayment
  ) public {
    helpers_reconcileAndAssert(transferId, args, expectedError, repayment, SwapInfo(repayment.total, args.amount));
  }

  function helpers_reconcileAndAssert(
    bytes32 transferId,
    XCallArgs memory args,
    bytes4 expectedError
  ) public {
    helpers_reconcileAndAssert(transferId, args, expectedError, PortalInfo(0, 0, 0, true));
  }

  function helpers_reconcileAndAssert(bytes4 expectedError) public {
    (bytes32 transferId, XCallArgs memory args) = utils_makeXCallArgs();
    helpers_reconcileAndAssert(transferId, args, expectedError);
  }

  // Shortcut for above method.
  function helpers_reconcileAndAssert() public {
    helpers_reconcileAndAssert(bytes4(""));
  }

  // ============ xAppConnectionManager ============
  // NOTE: tested via assertions below

  // ============ remotes ============
  // NOTE: tested via assertions below

  // ============ setXAppConnectionManager ============

  function test_NomadFacet__setXAppConnectionManager_works() public {
    assertEq(address(this.xAppConnectionManager()), address(0));
    address value = address(1234);

    vm.prank(LibDiamond.contractOwner());
    this.setXAppConnectionManager(value);
    assertEq(address(this.xAppConnectionManager()), value);
  }

  function test_NomadFacet__setXAppConnectionManager_failsIfNotOwner() public {
    assertEq(address(this.xAppConnectionManager()), address(0));
    address value = address(1234);
    vm.prank(address(2345));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));
    this.setXAppConnectionManager(value);
  }

  // ============ enrollRemoteRouter ============
  function test_NomadFacet__enrollRemoteRouter_works() public {
    assertEq(this.remotes(_originDomain), bytes32(0));

    vm.prank(LibDiamond.contractOwner());
    this.enrollRemoteRouter(_originDomain, _remote);
    assertEq(this.remotes(_originDomain), _remote);
  }

  function test_NomadFacet__enrollRemoteRouter_failsIfNotOwner() public {
    assertEq(this.remotes(_originDomain), bytes32(0));
    vm.prank(address(2345));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));
    this.enrollRemoteRouter(_originDomain, _remote);
  }

  // =========== handle / reconcile ==========
  // NOTE: modifier tests happen in BaseConnext.t.sol. Below are the reconcile (internal fn)
  // unit tests

  // ============ reconcile fail cases

  // should not process invalid messages
  function test_NomadFacet__reconcile_invalidMessage() public {
    bytes memory _message = bytes("");
    vm.expectRevert(bytes("Validity assertion failed"));
    _reconcile(_originDomain, _message);
  }

  // fails if action is not transfer
  function test_NomadFacet__reconcile_invalidTransfer() public {
    bytes29 tokenId = ConnextMessage.formatTokenId(_canonicalDomain, _canonicalId);
    bytes29 action = abi
      .encodePacked(ConnextMessage.Types.Message, bytes32("recip"), uint256(100), bytes32("details"), bytes32("id"))
      .ref(0)
      .castTo(uint40(ConnextMessage.Types.Message));
    bytes29[] memory _views = new bytes29[](2);
    _views[0] = tokenId;
    _views[1] = action;
    bytes memory _message = TypedMemView.join(_views);
    vm.expectRevert(NomadFacet.NomadFacet__reconcile_invalidAction.selector);
    _reconcile(_originDomain, _message);
  }

  // fails if already reconciled (s.reconciledTransfers[transferId] = true)
  function test_NomadFacet__reconcile_failIfAlreadyReconciled() public {
    utils_setupAsset(true, false);
    (bytes32 transferId, XCallArgs memory args) = utils_makeXCallArgs();
    s.reconciledTransfers[transferId] = true;
    helpers_reconcileAndAssert(transferId, args, NomadFacet.NomadFacet__reconcile_alreadyReconciled.selector);
  }

  // fails if portal record, but used in slow mode
  function test_NomadFacet__reconcile_failsIfPortalAndNoRouter() public {
    utils_setupAsset(true, false);
    (bytes32 transferId, XCallArgs memory args) = utils_makeXCallArgs();
    delete s.routedTransfers[transferId];

    // set portal fee debt
    s.portalDebt[transferId] = 15;
    s.portalFeeDebt[transferId] = 10;

    helpers_reconcileAndAssert(
      transferId,
      args,
      NomadFacet.NomadFacet__reconcile_noPortalRouter.selector,
      PortalInfo(10, 15, 25, true)
    );
  }

  // ============ reconcile success cases
  // works with local representational tokens (remote origin, so they will be minted)
  function test_NomadFacet__reconcile_worksWithLocal() public {
    utils_setupAsset(true, false);
    helpers_reconcileAndAssert();
  }

  function test_NomadFacet__reconcile_worksWithCanonical() public {
    utils_setupAsset(true, true);
    helpers_reconcileAndAssert();
  }

  // funds contract when pre-execute (slow liquidity route)
  function test_NomadFacet__reconcile_worksPreExecute() public {
    utils_setupAsset(true, false);
    (bytes32 transferId, XCallArgs memory args) = utils_makeXCallArgs();
    delete s.routedTransfers[transferId];

    helpers_reconcileAndAssert(transferId, args, bytes4(""));
  }

  // funds router when post-execute (fast liquidity route)
  function test_NomadFacet__reconcile_fastLiquiditySingleRouterWorks() public {
    utils_setupAsset(true, false);
    (bytes32 transferId, XCallArgs memory args) = utils_makeXCallArgs();
    s.routedTransfers[transferId] = [address(42)];
    helpers_reconcileAndAssert(transferId, args, bytes4(""));
  }

  // funds routers when post-execute multipath (fast liquidity route)
  function test_NomadFacet__reconcile_fastLiquidityMultipathWorks() public {
    utils_setupAsset(true, false);
    (bytes32 transferId, XCallArgs memory args) = utils_makeXCallArgs();
    s.routedTransfers[transferId] = [address(42), address(43), address(44), address(45)];
    helpers_reconcileAndAssert(transferId, args, bytes4(""));
  }

  // should work with portals without swap
  function test_NomadFacet__reconcile_canUsePortalsWithoutSwap() public {
    utils_setupAsset(true, false);
    // get args
    (bytes32 transferId, XCallArgs memory args) = utils_makeXCallArgs();

    // set router
    address router = address(456545654);
    s.routedTransfers[transferId] = [router];

    // get the total debt (no repayment)
    uint256 portaled = (args.amount * _liquidityFeeNumerator) / _liquidityFeeDenominator;
    PortalInfo memory portals = utils_setPortals(transferId, portaled);

    // assume full repayment
    helpers_reconcileAndAssert(transferId, args, bytes4(""), portals);
  }

  // should work with portals with swap
  function test_NomadFacet__reconcile_canUsePortalsWithSwap() public {
    utils_setupAsset(false, false);
    // get args
    (bytes32 transferId, XCallArgs memory args) = utils_makeXCallArgs();

    // set router
    address router = address(456545654);
    s.routedTransfers[transferId] = [router];

    // get the total debt (no repayment)
    uint256 portaled = (args.amount * _liquidityFeeNumerator) / _liquidityFeeDenominator;
    PortalInfo memory portals = utils_setPortals(transferId, portaled);

    // assume full repayment
    helpers_reconcileAndAssert(transferId, args, bytes4(""), portals, SwapInfo(args.amount - 10000, args.amount));
  }

  function test_NomadFacet__reconcile_handlesPortalSwapFailures() public {
    utils_setupAsset(false, false);
    // get args
    (bytes32 transferId, XCallArgs memory args) = utils_makeXCallArgs();

    // set router
    address router = address(456545654);
    s.routedTransfers[transferId] = [router];

    // get the total debt (no repayment)
    uint256 portaled = (args.amount * _liquidityFeeNumerator) / _liquidityFeeDenominator;
    PortalInfo memory init = utils_setPortals(transferId, portaled);

    // assume ratio of 10:1 (i.e. you put in 10x, the amount out from args.amount is 1/10 val)
    helpers_reconcileAndAssert(
      transferId,
      args,
      bytes4(""),
      PortalInfo(0, 0, 0, true),
      SwapInfo(args.amount * 10, args.amount * 10)
    );
  }

  // should credit router leftovers from portal repayment from positive slippage of amm
  // or previous
  function test_NomadFacet__reconcile_handlesPortalDebtSurplusViaSwap() public {
    utils_setupAsset(false, false);
    // get args
    (bytes32 transferId, XCallArgs memory args) = utils_makeXCallArgs();

    // set router
    address router = address(456545654);
    s.routedTransfers[transferId] = [router];

    // get the total debt (no repayment)
    uint256 portaled = (args.amount * _liquidityFeeNumerator) / _liquidityFeeDenominator;
    PortalInfo memory portals = utils_setPortals(transferId, portaled);

    // assume full repayment
    helpers_reconcileAndAssert(
      transferId,
      args,
      bytes4(""),
      portals,
      SwapInfo(args.amount - 0.01 ether, args.amount + 0.2 ether)
    );
  }

  // at some point some of the fee is repaid, remainder goes to router liq
  function test_NomadFacet__reconcile_handlesPortalDebtSurplusViaFeeRepayment() public {
    utils_setupAsset(true, false);
    // get args
    (bytes32 transferId, XCallArgs memory args) = utils_makeXCallArgs();

    // set router
    address router = address(456545654);
    s.routedTransfers[transferId] = [router];

    // get the total debt (no repayment)
    uint256 portaled = (args.amount * _liquidityFeeNumerator) / _liquidityFeeDenominator;
    uint256 fullFee = (args.amount * _portalFeeNumerator) / _liquidityFeeDenominator;
    uint256 paid = fullFee / 2;
    PortalInfo memory portals = utils_setPortals(transferId, portaled, fullFee - paid);

    // assume full repayment
    helpers_reconcileAndAssert(transferId, args, bytes4(""), portals);
  }

  // at some point some of the principle is repaid, remainder goes to router liq
  function test_NomadFacet__reconcile_handlesPortalDebtSurplusViaPrincipleRepayment() public {
    utils_setupAsset(true, false);
    // get args
    (bytes32 transferId, XCallArgs memory args) = utils_makeXCallArgs();

    // set router
    address router = address(456545654);
    s.routedTransfers[transferId] = [router];

    // get the total debt (no repayment)
    uint256 portaled = (args.amount * _liquidityFeeNumerator) / _liquidityFeeDenominator;
    uint256 fee = (args.amount * _portalFeeNumerator) / _liquidityFeeDenominator;
    uint256 paid = portaled / 2;
    PortalInfo memory portals = utils_setPortals(transferId, portaled - paid, fee);

    // assume full repayment
    helpers_reconcileAndAssert(transferId, args, bytes4(""), portals);
  }

  // should prioritize debt as: as much principle as possible then as much fee as possible
  function test_NomadFacet__reconcile_handlesPortalDeficitPartialPrinciple() public {
    // in this case, the swap only gives enough out to handle *some* of the amount portaled.
    // specifically, it can only handle amount < principle
    utils_setupAsset(false, false);
    // get args
    (bytes32 transferId, XCallArgs memory args) = utils_makeXCallArgs();

    // set router
    address router = address(456545654);
    s.routedTransfers[transferId] = [router];

    // set the total debt
    uint256 portaled = (args.amount * _liquidityFeeNumerator) / _liquidityFeeDenominator;
    PortalInfo memory init = utils_setPortals(transferId, portaled);

    // decrement portal repayment
    uint256 debtRepaid = (init.debt * 9997) / 10000; // 3bps debt remaining
    PortalInfo memory repayment = PortalInfo(0, debtRepaid, debtRepaid, true);
    helpers_reconcileAndAssert(transferId, args, bytes4(""), repayment, SwapInfo(init.total, debtRepaid));
  }

  function test_NomadFacet__reconcile_handlesPortalDeficitPartialFee() public {
    // in this case, the swap only gives enough out to handle *some* of the amount portaled.
    // specifically, it can only handle principle < amount < total
    utils_setupAsset(false, false);
    // get args
    (bytes32 transferId, XCallArgs memory args) = utils_makeXCallArgs();

    // set router
    address router = address(456545654);
    s.routedTransfers[transferId] = [router];

    // set the total debt
    uint256 portaled = (args.amount * _liquidityFeeNumerator) / _liquidityFeeDenominator;
    PortalInfo memory init = utils_setPortals(transferId, portaled);

    uint256 debtRepaid = (init.total * 9997) / 10000; // 3bps debt remaining
    PortalInfo memory repayment = PortalInfo(debtRepaid - init.debt, init.debt, debtRepaid, true);

    // assume full repayment
    helpers_reconcileAndAssert(transferId, args, bytes4(""), repayment, SwapInfo(init.total, debtRepaid));
  }

  function test_NomadFacet__reconcile_handlesPortalFailureToRepayFromAave() public {
    utils_setupAsset(true, false);
    // get args
    (bytes32 transferId, XCallArgs memory args) = utils_makeXCallArgs();

    // set router
    address router = address(456545654);
    s.routedTransfers[transferId] = [router];

    // get the total debt (no repayment)
    uint256 portaled = (args.amount * _liquidityFeeNumerator) / _liquidityFeeDenominator;
    PortalInfo memory init = utils_setPortals(transferId, portaled);

    // assume no repayment (aave will not be mocked)
    helpers_reconcileAndAssert(transferId, args, bytes4(""), PortalInfo(0, 0, 0, false));
  }
}
