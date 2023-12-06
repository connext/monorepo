// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {TypeCasts} from "../../../../contracts/shared/libraries/TypeCasts.sol";
import {TypedMemView} from "../../../../contracts/shared/libraries/TypedMemView.sol";

import {IConnectorManager} from "../../../../contracts/messaging/interfaces/IConnectorManager.sol";
import {IAavePool} from "../../../../contracts/core/connext/interfaces/IAavePool.sol";
import {IStableSwap} from "../../../../contracts/core/connext/interfaces/IStableSwap.sol";
import {AssetLogic} from "../../../../contracts/core/connext/libraries/AssetLogic.sol";
import {Constants} from "../../../../contracts/core/connext/libraries/Constants.sol";
import {TransferInfo, ExecuteArgs, TokenId, DestinationTransferStatus} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";
import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {BridgeFacet} from "../../../../contracts/core/connext/facets/BridgeFacet.sol";
import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {BridgeMessage} from "../../../../contracts/core/connext/libraries/BridgeMessage.sol";

import {TestERC20} from "../../../../contracts/test/TestERC20.sol";

import "../../../utils/Mock.sol";
import "../../../utils/FacetHelper.sol";

contract BridgeFacetTest is BridgeFacet, FacetHelper {
  // ============ Libs ============

  using TypedMemView for bytes29;
  using TypedMemView for bytes;

  // ============ Structs ============

  struct XCallBalances {
    uint256 relayerEth;
    uint256 contractAsset;
    uint256 callerEth;
    uint256 callerAsset;
    uint256 custodied;
  }

  // ============ Constants ============

  // ============ Storage ============

  // diamond storage contract owner
  address _ds_owner = address(987654321);

  // mock xapp contract
  address _xapp;

  // delegates
  address _delegate = address(123456654321);

  // sequencer
  uint256 _sequencerPKey = 0xA11CE;
  address _sequencer = vm.addr(_sequencerPKey);

  // aave pool details
  address _aavePool;

  // relayer fee
  uint256 _relayerFee = 0.1 ether;
  address _relayerFeeVault = address(12313454241);

  // Defaults
  // default origin sender
  address _defaultOriginSender = address(4);
  // default amount
  uint256 _defaultAmount = 1.1 ether;
  // default nonce on xcall
  uint256 _defaultNonce = s.nonce;
  // default TransferInfo
  TransferInfo _defaultParams =
    TransferInfo({
      originDomain: _originDomain,
      destinationDomain: _destinationDomain,
      canonicalDomain: 0, // Will be set in setUp; should also be updated in helpers.
      to: address(11),
      delegate: _delegate,
      receiveLocal: false,
      callData: bytes(""),
      slippage: 1000,
      // These items would normally be replaced in the nested internal _xcall,
      // but will be defined as the "expected values" for the purpose of getting
      // the expected transfer ID.
      originSender: _defaultOriginSender,
      bridgedAmt: 0,
      normalizedIn: 0,
      nonce: _defaultNonce,
      canonicalId: bytes32("") // Will be set in setUp.
    });

  // ============ Test set up ============
  function setUp() public {
    // Deploy any needed contracts.
    utils_deployContracts();

    utils_setFees();

    // Set up asset context. By default, local is the adopted asset - the one the 'user'
    // is using - and is representational (meaning canonically it belongs to another chain).
    utils_setupAsset(true, false);

    // Defaults setup.
    _defaultParams.canonicalId = _canonicalId;
    _defaultParams.canonicalDomain = _canonicalDomain;

    // Other context setup: configuration, storage, etc.
    s.approvedRelayers[address(this)] = true;
    s.approvedSequencers[_sequencer] = true;
    s.maxRoutersPerTransfer = 5;
    s._routerAllowlistRemoved = true;
    s.relayerFeeVault = _relayerFeeVault;
    s.domain = _originDomain;

    s.remotes[_destinationDomain] = TypeCasts.addressToBytes32(address(this));
    s.remotes[_originDomain] = TypeCasts.addressToBytes32(address(this));
    s.remotes[_canonicalDomain] = TypeCasts.addressToBytes32(address(this));

    vm.prank(address(this));
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    ds.contractOwner = _ds_owner;

    // default cap is v high
    _cap = 100_000 ether;

    vm.stopPrank();
  }

  // ============ Utils ============
  // Utils used in the following tests (as well as setup).

  // Used in set up for deploying any needed peripheral contracts.
  function utils_deployContracts() public {
    utils_deployAssetContracts();

    // Deploy mock home.
    MockHome originHome = new MockHome(_originDomain);
    // Deploy xAppConnectionManager contract.
    s.xAppConnectionManager = new MockXAppConnectionManager(originHome);

    // Deploy a mock xapp consumer.
    _xapp = address(new MockXApp());

    // setup aave pool
    _aavePool = address(new MockPool(false));
    s.aavePool = _aavePool;
  }

  function utils_makeSequencerSignature(
    bytes32 transferId,
    address[] memory routers,
    address sequencer,
    uint256 key
  ) public returns (bytes memory) {
    bytes32 preImage = keccak256(abi.encode(transferId, routers));
    bytes32 toSign = ECDSA.toEthSignedMessageHash(preImage);
    (uint8 v, bytes32 r, bytes32 _s) = vm.sign(key, toSign);
    return abi.encodePacked(r, _s, v);
  }

  // Makes some mock router signatures.
  function utils_makeRouterSignatures(
    bytes32 _transferId,
    address[] memory _routers,
    uint256[] memory _keys
  ) public returns (bytes[] memory) {
    uint256 pathLen = _routers.length;
    bytes[] memory signatures = new bytes[](pathLen);
    if (pathLen == 0) {
      return signatures;
    }
    bytes32 preImage = keccak256(abi.encode(_transferId, pathLen));
    bytes32 toSign = ECDSA.toEthSignedMessageHash(preImage);
    for (uint256 i; i < pathLen; i++) {
      (uint8 v, bytes32 r, bytes32 _s) = vm.sign(_keys[i], toSign);
      signatures[i] = abi.encodePacked(r, _s, v);
    }
    return signatures;
  }

  // Makes some mock execute arguments with given router/key pairs.
  function utils_makeExecuteArgs(
    address[] memory routers,
    uint256[] memory keys
  ) public returns (bytes32, ExecuteArgs memory) {
    s.domain = _destinationDomain;

    // Format TransferInfo.
    TransferInfo memory params = _defaultParams;
    params.canonicalId = _canonicalId;
    params.canonicalDomain = _canonicalDomain;
    params.bridgedAmt = _defaultAmount;
    params.normalizedIn = _defaultAmount;

    // Make args struct, will be updated / filled in below.
    bytes[] memory empty = new bytes[](0);
    ExecuteArgs memory args = ExecuteArgs({
      params: params,
      routers: routers,
      routerSignatures: empty,
      sequencer: address(0),
      sequencerSignature: bytes("")
    });

    // Generate transfer ID.
    bytes32 transferId = _calculateTransferId(args.params);
    // Generate router signatures, if applicable.
    if (routers.length != 0) {
      args.routerSignatures = utils_makeRouterSignatures(transferId, routers, keys);
      args.sequencer = _sequencer;
      args.sequencerSignature = utils_makeSequencerSignature(transferId, routers, _sequencer, _sequencerPKey);
    }
    return (transferId, args);
  }

  // Make execute args, fill in a number of router/key pairs.
  // Specifically input 0 to make execute arguments with no routers/keys for slow liq simulation.
  function utils_makeExecuteArgs(uint256 num) public returns (bytes32, ExecuteArgs memory) {
    if (num == 0) {
      address[] memory routers;
      uint256[] memory keys;
      return utils_makeExecuteArgs(routers, keys);
    }
    address[] memory routers = new address[](num);
    uint256[] memory keys = new uint256[](num);
    for (uint256 i; i < num; i++) {
      routers[i] = vm.addr(777 + i);
      keys[i] = 777 + i;
    }
    return utils_makeExecuteArgs(routers, keys);
  }

  // Intended to mock the fast transfer amount calculation in the target contract.
  function utils_getFastTransferAmount(uint256 _amount) public returns (uint256) {
    // This is the method used internally to get the amount of tokens to transfer after liquidity
    // fees are taken.
    return (_amount * s.LIQUIDITY_FEE_NUMERATOR) / Constants.BPS_FEE_DENOMINATOR;
  }

  // ============== Helpers ==================
  // Helpers used for executing target methods with given params that assert expected base behavior.
  function helpers_setupSuccessfulXcallCallAssertions(
    bytes32 transferId,
    TransferInfo memory params,
    address asset,
    uint256 amount,
    bool shouldSwap
  ) public {
    // Bridged asset will either local or canonical, depending on domain xcall originates on.
    address bridged = asset == address(0) ? address(0) : _canonicalDomain == s.domain ? _canonical : _local;
    uint256 bridgedAmt = params.bridgedAmt;
    bytes memory messageBody = MessagingUtils.formatDispatchedTransferMessage(params, address(this), address(this), 0);
    bytes32 messageHash = keccak256(messageBody);

    if (_relayerFee > 0) {
      vm.expectEmit(true, true, true, true);
      emit TransferRelayerFeesIncreased(transferId, _relayerFee, address(0), params.originSender);
    }

    vm.expectEmit(true, true, true, true);
    emit XCalled(transferId, s.nonce, messageHash, params, asset, amount, bridged, messageBody);

    // assert swap if expected
    if (shouldSwap && bridgedAmt != 0) {
      // Transacting asset shouldve been approved for amount in
      vm.expectCall(asset, abi.encodeWithSelector(IERC20.approve.selector, _stableSwap, amount));

      // swapExact on pool should have been called
      vm.expectCall(
        _stableSwap,
        abi.encodeWithSelector(
          IStableSwap.swapExact.selector,
          amount,
          asset,
          _local,
          (amount * (10_000 - params.slippage)) / 10_000
        )
      );
    }
  }

  // Helper to prevent stack too deep issues (since there a lot of arguments to xcall).
  function helpers_wrappedXCall(TransferInfo memory params, address asset, uint256 amount) public returns (bytes32) {
    vm.prank(params.originSender);
    return
      params.receiveLocal
        ? this.xcallIntoLocal{value: _relayerFee}(
          params.destinationDomain,
          params.to,
          asset,
          params.delegate,
          amount,
          params.slippage,
          params.callData
        )
        : this.xcall{value: _relayerFee}(
          params.destinationDomain,
          params.to,
          asset,
          params.delegate,
          amount,
          params.slippage,
          params.callData
        );
  }

  // Calls `xcall` with given args and handles standard assertions.
  function helpers_xcallAndAssert(
    TransferInfo memory params,
    address asset,
    uint256 amount,
    bytes4 expectedError,
    bool shouldSwap
  ) public {
    bool shouldSucceed = keccak256(abi.encode(expectedError)) == keccak256(abi.encode(bytes4("")));
    bool isCanonical = _canonicalDomain == s.domain;

    if (asset == address(0)) {
      // Both should be empty if the asset address is 0 (meaning this is probably a 0-value transfer).
      params.canonicalId = bytes32("");
      params.canonicalDomain = 0;
    } else {
      // Make sure canonical domain and ID are up to date in case this unit test altered the asset setup.
      params.canonicalId = _canonicalId;
      params.canonicalDomain = _canonicalDomain;
    }

    // If the bridged amount was pre-specified, it's likely we wanted to test a specific slippage
    // amount below in the stableswap mock call.
    if (params.bridgedAmt == 0) {
      // TODO: Is the normalizedIn correct in all cases here? What about diff decimals?

      if (shouldSwap) {
        // Bridged amount of asset will be the amount post-swap.
        // This is just an example of the kind of slippage we could expect.
        params.bridgedAmt = (_defaultAmount * 9995) / _liquidityFeeDenominator;
        // Normalized input amount is the pre-swap amount.
        params.normalizedIn = amount;
      } else if (asset == address(0)) {
        // An asset address of 0 indicates this is a 0-value transfer.
        params.bridgedAmt = 0;
        params.normalizedIn = 0;
      } else {
        // No swap will occur, so the amount bridged should just be the amount in.
        params.bridgedAmt = amount;
        params.normalizedIn = amount;
      }
    } else if (params.normalizedIn == 0) {
      params.normalizedIn = amount;
    }

    bytes32 transferId = _calculateTransferId(params);

    // Console logs for debugging:
    // console.log("asset", asset);
    // console.log("amount", amount);
    // console.log("transferID");
    // console.logBytes32(transferId);
    // console.log("bridgedAmt", params.bridgedAmt);
    // console.log("normalizedIn", params.normalizedIn);

    // Set up and record initial balances.
    XCallBalances memory balances;
    {
      // Deal the user required eth for transfer.
      vm.deal(params.originSender, 100 ether);

      TestERC20 tokenIn = TestERC20(asset != address(0) ? asset : _local);

      if (amount > 0) {
        // First, mint the specified amount of tokens for the user.
        tokenIn.mint(params.originSender, amount);

        // As the user, approve this contract to spend the specified amount of tokens.
        vm.prank(params.originSender);
        tokenIn.approve(address(this), amount);
      }

      // Record initial balances.
      balances.callerEth = address(params.originSender).balance;
      balances.callerAsset = tokenIn.balanceOf(params.originSender);
      balances.relayerEth = s.relayerFeeVault.balance;
      balances.contractAsset = tokenIn.balanceOf(address(this));
      balances.custodied = s.tokenConfigs[_canonicalKey].custodied;

      // Debugging logs.
      // console.log("initial balances");
      // console.log(address(this).balance);
      // console.log(params.originSender.balance);
      // console.log(tokenIn.balanceOf(params.originSender));
      // console.log(tokenIn.balanceOf(address(this)));
      // console.log(TestERC20(_local).balanceOf(address(this)));
    }

    if (shouldSwap) {
      // Set up the expected swap mock (adopted <> local).
      vm.mockCall(
        _stableSwap,
        abi.encodeWithSelector(IStableSwap.swapExact.selector),
        abi.encode(params.bridgedAmt, _local)
      );
    }

    if (shouldSucceed) {
      helpers_setupSuccessfulXcallCallAssertions(transferId, params, asset, amount, shouldSwap);
    } else {
      vm.expectRevert(expectedError);
    }

    bytes32 ret = helpers_wrappedXCall(params, asset, amount);

    if (shouldSucceed) {
      assertEq(ret, transferId, "transfer ID non match");

      // Nonce should have increased.
      assertEq(s.nonce, params.nonce + 1, "nonce did not match");

      TestERC20 tokenIn = TestERC20(asset != address(0) ? asset : _local);

      // Debugging logs.
      // console.log("out balances");
      // console.log(address(this).balance);
      // console.log(params.originSender.balance);
      // console.log(tokenIn.balanceOf(params.originSender));
      // console.log(tokenIn.balanceOf(address(this)));
      // console.log(TestERC20(_local).balanceOf(address(this)));

      // Contract should have received relayer fee from user.
      assertEq(s.relayerFeeVault.balance, balances.relayerEth + _relayerFee, "relayer did not receive fee");
      // User should have been debited relayer fee ETH and tx cost.
      assertLe(params.originSender.balance, balances.callerEth - _relayerFee, "user not debited eth");

      // Check that the contract has been credited the correct amount of tokens and that the user has
      // been debited the correct amount of tokens.
      // NOTE: If the tokens are a representational local asset, they are burnt. The contract
      // should NOT be holding any additional tokens after xcall completes.
      if (asset == address(0)) {
        // No balance changes should have occurred.
        assertEq(tokenIn.balanceOf(params.originSender), balances.callerAsset);
        assertEq(tokenIn.balanceOf(address(this)), balances.contractAsset);
      } else if (isCanonical) {
        // User should have been debited tokens.
        assertEq(tokenIn.balanceOf(params.originSender), balances.callerAsset - amount, "user not debited tokens");
        // The contract should have stored the asset in escrow.
        assertEq(tokenIn.balanceOf(address(this)), balances.contractAsset + amount);
        // Custodied balance should have increased if sending in canonical
        if (s.tokenConfigs[_canonicalKey].cap > 0) {
          assertEq(s.tokenConfigs[_canonicalKey].custodied, balances.custodied + amount);
        }
      } else {
        // NOTE: Normally the adopted asset would be swapped into the local asset and then
        // the local asset would be burned. Because the swap increases the contracts balance
        // the prod difference in balance is net 0. However, because the swap here is mocked,
        // when a swap occurs no balance increase of local happens (i.e. if swap needed, the
        // balance will decrease by bridgedAmt / what is burned).
        uint256 expectedLocalBalance = asset == _local
          ? balances.contractAsset
          : balances.contractAsset - params.bridgedAmt;
        assertEq(TestERC20(_local).balanceOf(address(this)), expectedLocalBalance);

        // TODO: Cannot test this because the swap is stubbed, but the contract should end up with 0
        // 0 additional adopted asset in production.

        // Assert user spent input asset.
        assertEq(tokenIn.balanceOf(params.originSender), balances.callerAsset - amount);
      }
    }
  }

  // Shortcut for the main fn. Uses default params.
  function helpers_xcallAndAssert(address asset, uint256 amount, bytes4 expectedError, bool shouldSwap) public {
    _defaultParams.originDomain = _originDomain;
    _defaultParams.destinationDomain = _destinationDomain;
    helpers_xcallAndAssert(_defaultParams, asset, amount, expectedError, shouldSwap);
  }

  // Shortcut helper where you just input an expected error.
  function helpers_xcallAndAssert(bytes4 expectedError) public {
    _defaultParams.originDomain = _originDomain;
    _defaultParams.destinationDomain = _destinationDomain;
    helpers_xcallAndAssert(_defaultParams, _adopted, _defaultAmount, expectedError, true);
  }

  // Shortcut helper with no expected error. Asset is determined to be local or adopted
  // depending on whether a swap should occur.
  function helpers_xcallAndAssert(uint256 amount, bool shouldSwap) public {
    _defaultParams.originDomain = _originDomain;
    _defaultParams.destinationDomain = _destinationDomain;
    helpers_xcallAndAssert(_defaultParams, shouldSwap ? _adopted : _local, amount, bytes4(""), shouldSwap);
  }

  // Shortcut helper with no expected error, specified input asset and amount.
  // Determines shouldSwap property implicitly.
  function helpers_xcallAndAssert(address asset, uint256 amount) public {
    _defaultParams.originDomain = _originDomain;
    _defaultParams.destinationDomain = _destinationDomain;
    // shouldSwap is determined by whether the asset is local or canonical or empty (meaning no swap is needed).
    // If it isn't any of those, it's an adopted asset that will require a swap.
    helpers_xcallAndAssert(
      _defaultParams,
      asset,
      amount,
      bytes4(""),
      asset != address(0) && asset != _local && _canonicalDomain != s.domain
    );
  }

  // Helper that uses default values for everything.
  function helpers_xcallAndAssert() public {
    _defaultParams.originDomain = _originDomain;
    _defaultParams.destinationDomain = _destinationDomain;
    helpers_xcallAndAssert(_defaultParams, _adopted, _defaultAmount, bytes4(""), true);
  }

  struct ExecuteBalances {
    uint256 bridge;
    uint256 to;
    uint256 debt;
    uint256 feeDebt;
  }

  struct ExecuteTestInputs {
    uint256 expectedAmt;
    uint256 routerAmt;
    address token;
    bool callsExternal;
    bool externalCallSucceeds;
    bool shouldSwap; // Whether the `to` address should receive the tokens.
    bool isSlow;
    bool usesPortals;
    bool useDelegate;
  }

  function utils_getExecuteBalances(
    bytes32 transferId,
    address asset,
    address _to
  ) public returns (ExecuteBalances memory) {
    uint256 debt = s.portalDebt[transferId];
    uint256 fee = s.portalFeeDebt[transferId];
    uint256 bridge = _local == address(0) ? address(this).balance : IERC20(_local).balanceOf(address(this));
    uint256 to = asset == address(0) ? _to.balance : IERC20(asset).balanceOf(_to);
    return ExecuteBalances(bridge, to, debt, fee);
  }

  function helpers_setupExecuteAssertions(
    bytes32 transferId,
    ExecuteArgs memory _args,
    ExecuteTestInputs memory _inputs
  ) public {
    // ----- register expected calls

    // expects portal
    if (_inputs.usesPortals) {
      // mint position
      vm.expectCall(
        _aavePool,
        abi.encodeWithSelector(IAavePool.mintUnbacked.selector, _adopted, _inputs.routerAmt, address(this), 0)
      );

      // withdraw
      vm.expectCall(
        _aavePool,
        abi.encodeWithSelector(IAavePool.withdraw.selector, _adopted, _inputs.routerAmt, address(this))
      );
    }

    // expected swap
    if (_inputs.shouldSwap) {
      // register expected approval
      vm.expectCall(_local, abi.encodeWithSelector(IERC20.approve.selector, _stableSwap, _inputs.routerAmt));
      uint256 slippage = s.slippage[transferId] > 0 ? s.slippage[transferId] : _args.params.slippage;
      // register expected swap amount
      vm.expectCall(
        _stableSwap,
        abi.encodeWithSelector(
          IStableSwap.swapExact.selector,
          _inputs.routerAmt,
          _local,
          _adopted,
          (_args.params.normalizedIn * (10_000 - slippage)) / 10_000
        )
      );
    }

    // expected transfer out of contract
    if (_args.params.bridgedAmt != 0) {
      // token transfer
      vm.expectCall(
        _inputs.token,
        abi.encodeWithSelector(IERC20.transfer.selector, _args.params.to, _inputs.expectedAmt)
      );
    }

    // expected external call
    if (_inputs.callsExternal) {
      vm.expectCall(
        _args.params.to,
        abi.encodeWithSelector(
          IXReceiver.xReceive.selector,
          transferId,
          _inputs.expectedAmt,
          _inputs.token,
          _inputs.isSlow ? _args.params.originSender : address(0),
          _args.params.originDomain,
          _args.params.callData
        )
      );
    }
  }

  // Calls `execute` on the target method with the given args and asserts expected behavior.
  function helpers_executeAndAssert(
    bytes32 transferId,
    ExecuteArgs memory _args,
    ExecuteTestInputs memory _inputs
  ) public {
    // get pre-execute liquidity in local
    uint256 pathLen = _args.routers.length;
    uint256[] memory prevLiquidity = new uint256[](pathLen);
    {
      for (uint256 i; i < pathLen; i++) {
        prevLiquidity[i] = s.routerBalances[_args.routers[i]][_local];
      }
    }

    // get pre-execute balance here in local
    IERC20 token = IERC20(_inputs.token);
    ExecuteBalances memory prevBalances = utils_getExecuteBalances(transferId, _inputs.token, _args.params.to);
    s.tokenConfigs[_canonicalKey].custodied = prevBalances.bridge;

    // execute
    // expected amount is impacted by (1) fast liquidity fees (2) slippage
    // router debited amount in local is only impacted by fast liquidity
    uint256 routerAmt = _inputs.isSlow ? _args.params.bridgedAmt : utils_getFastTransferAmount(_args.params.bridgedAmt);

    // setup pool mock if needed
    if (_inputs.shouldSwap) {
      vm.mockCall(
        _stableSwap,
        abi.encodeWithSelector(IStableSwap.swapExact.selector),
        abi.encode(_inputs.expectedAmt, _adopted)
      );
    }

    // register expected calls
    helpers_setupExecuteAssertions(transferId, _args, _inputs);

    if (_inputs.usesPortals) {
      vm.expectEmit(true, true, true, true);
      emit AavePortalMintUnbacked(transferId, _args.routers[0], _inputs.token, _inputs.expectedAmt);
    }

    // register expected emit event
    address sender = _inputs.useDelegate ? _args.params.delegate : address(this);
    vm.expectEmit(true, true, false, true);
    emit Executed(transferId, _args.params.to, _inputs.token, _args, _local, _inputs.expectedAmt, sender);
    // make call
    vm.prank(sender);
    this.execute(_args);

    // check local balance
    {
      if (pathLen != 0) {
        // should decrement router balance unless using aave
        for (uint256 i; i < pathLen; i++) {
          assertEq(
            s.routerBalances[_args.routers[i]][_local],
            _inputs.usesPortals ? prevLiquidity[i] : prevLiquidity[i] - (_inputs.routerAmt / pathLen),
            "did not decrement router balance"
          );
        }
      }

      // if on canonical domain, should decrease
      if (s.tokenConfigs[_canonicalKey].cap > 0) {
        assertEq(
          s.tokenConfigs[_canonicalKey].custodied,
          prevBalances.bridge - routerAmt,
          "custodied amount is incorrect"
        );
      }
    }

    {
      // assertions
      ExecuteBalances memory finalBalances = utils_getExecuteBalances(transferId, _inputs.token, _args.params.to);

      // NOTE: the balance of the bridge *should* always decrement in local, however that depends on
      // the token executing the `swap` / `withdraw` call when a swap is needed (which we have as mocked).
      // Instead, assert the swap functions on the pool were called correctly
      if (!_inputs.shouldSwap) {
        // NOTE: when using aave would normally send you funds for the position minted,
        // but we are not adding any funds from the pool, so always decrement
        assertEq(
          finalBalances.bridge,
          _inputs.usesPortals ? prevBalances.bridge : prevBalances.bridge - _inputs.routerAmt,
          "final balance of the bridge was incorrect"
        );
      }

      if (_inputs.usesPortals) {
        uint256 fee = (_inputs.routerAmt * _portalFeeNumerator) / _liquidityFeeDenominator;
        assertEq(finalBalances.feeDebt, prevBalances.feeDebt + fee);
        assertEq(finalBalances.debt, prevBalances.debt + _inputs.routerAmt);
      } else {
        assertEq(finalBalances.feeDebt, prevBalances.feeDebt);
        assertEq(finalBalances.debt, prevBalances.debt);
      }

      assertEq(finalBalances.to, prevBalances.to + _inputs.expectedAmt);
    }

    // should mark the transfer as executed
    DestinationTransferStatus expected = _inputs.isSlow
      ? DestinationTransferStatus.Completed
      : DestinationTransferStatus.Executed;
    assertTrue(s.transferStatus[transferId] == expected, "transfer status not updated");

    // should have assigned transfer as routed
    address[] memory savedRouters = s.routedTransfers[transferId];
    for (uint256 i; i < savedRouters.length; i++) {
      assertEq(savedRouters[i], _args.routers[i]);
    }
  }

  function helpers_executeAndAssert(
    bytes32 transferId,
    ExecuteArgs memory _args,
    uint256 expectedAmt, // amount out of swap
    bool callsExternal,
    bool externalCallSucceeds,
    bool shouldSwap, // Whether the `to` address should receive the tokens.
    bool usesPortals,
    bool useDelegate
  ) public {
    uint256 pathLen = _args.routers.length;
    bool isSlow = pathLen == 0;
    // get pre-execute balance here in local
    uint256 routerAmt = isSlow ? _args.params.bridgedAmt : utils_getFastTransferAmount(_args.params.bridgedAmt);
    helpers_executeAndAssert(
      transferId,
      _args,
      ExecuteTestInputs(
        expectedAmt,
        routerAmt,
        shouldSwap ? _adopted : _local, // token
        callsExternal,
        externalCallSucceeds,
        shouldSwap,
        isSlow,
        usesPortals,
        useDelegate
      )
    );
  }

  function helpers_executeAndAssert(
    bytes32 transferId,
    ExecuteArgs memory _args,
    uint256 expectedAmt, // amount out of swap
    bool callsExternal,
    bool externalCallSucceeds,
    bool shouldSwap // Whether the `to` address should receive the tokens.
  ) public {
    helpers_executeAndAssert(
      transferId,
      _args,
      expectedAmt,
      callsExternal,
      externalCallSucceeds,
      shouldSwap,
      false,
      false
    );
  }

  // ============ execute ============
  // Shortcut for above method:
  // - local == adopted
  // - does not call external
  // - calling on non-canonical domain
  function helpers_executeAndAssert(bytes32 transferId, ExecuteArgs memory _args) public {
    uint256 expected = _args.params.bridgedAmt;
    if (_args.routers.length != 0) {
      expected = utils_getFastTransferAmount(_args.params.bridgedAmt);
    }
    helpers_executeAndAssert(transferId, _args, expected, false, false, false, false, false);
  }

  // Shortcut where:
  // - local != adopted
  // - does not call external
  // - calling on noncanonical domain
  function helpers_executeAndAssert(
    bytes32 transferId,
    ExecuteArgs memory _args,
    uint256 expected,
    bool shouldSwap
  ) public {
    helpers_executeAndAssert(transferId, _args, expected, false, false, shouldSwap, false, false);
  }

  function helpers_executeAndAssert(bytes32 transferId, ExecuteArgs memory _args, bool useDelegate) public {
    uint256 expected = _args.params.bridgedAmt;
    if (_args.routers.length != 0) {
      expected = utils_getFastTransferAmount(_args.params.bridgedAmt);
    }
    helpers_executeAndAssert(transferId, _args, expected, false, false, false, false, useDelegate);
  }

  // ============ Getters ==============

  function test_BridgeFacet__domain_works() public {
    s.domain = 0;
    assertEq(this.domain(), 0);
    s.domain = _destinationDomain;
    assertEq(this.domain(), _destinationDomain);
  }

  function test_BridgeFacet__nonce_works() public {
    s.nonce = 0;
    assertEq(this.nonce(), 0);
    s.nonce = _destinationDomain;
    assertEq(this.nonce(), _destinationDomain);
  }

  // The rest (relayerFees, routedTransfers) are checked on
  // assertions for xcall / reconcile / execute

  // ============ Admin methods ==============
  // addSequencer
  function test_BridgeFacet__addSequencer_failIfNotOwner() public {
    // constants
    address sequencer = address(123);

    // test revert
    vm.prank(_defaultOriginSender);
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);
    this.addSequencer(sequencer);
  }

  function test_BridgeFacet__addSequencer_failIfEmptyAddress() public {
    address sequencer = address(0);

    vm.prank(LibDiamond.contractOwner());
    vm.expectRevert(BridgeFacet.BridgeFacet__addSequencer_invalidSequencer.selector);
    this.addSequencer(sequencer);
  }

  function test_BridgeFacet__addSequencer_failIfAlreadyApproved() public {
    // constants
    address sequencer = address(123);

    // set storage
    s.approvedSequencers[sequencer] = true;

    // test revert
    vm.expectRevert(BridgeFacet.BridgeFacet__addSequencer_alreadyApproved.selector);
    vm.prank(LibDiamond.contractOwner());
    this.addSequencer(sequencer);
  }

  function test_BridgeFacet__addSequencer_works() public {
    // constants
    address sequencer = address(123);

    // set storage
    s.approvedSequencers[sequencer] = false;

    // test revert
    vm.prank(LibDiamond.contractOwner());
    this.addSequencer(sequencer);

    assertEq(s.approvedSequencers[sequencer], true);
  }

  // removeSequencer
  function test_BridgeFacet__removeSequencer_failIfNotOwner() public {
    // constants
    address sequencer = address(123);

    // test revert
    vm.prank(_defaultOriginSender);
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);
    this.removeSequencer(sequencer);
  }

  function test_BridgeFacet__removeSequencer_failIfAlreadyApproved() public {
    // constants
    address sequencer = address(123);

    // set storage
    s.approvedSequencers[sequencer] = false;

    // test revert
    vm.prank(LibDiamond.contractOwner());
    vm.expectRevert(BridgeFacet.BridgeFacet__removeSequencer_notApproved.selector);
    this.removeSequencer(sequencer);
  }

  function test_BridgeFacet__removeSequencer_works() public {
    // constants
    address sequencer = address(123);

    // set storage
    s.approvedSequencers[sequencer] = true;

    // test revert
    vm.prank(LibDiamond.contractOwner());
    this.removeSequencer(sequencer);

    assertEq(s.approvedSequencers[sequencer], false);
  }

  // ============ setXAppConnectionManager ============
  function test_BridgeFacet__setXAppConnectionManager_failsIfDomainMismatch() public {
    // constants
    address manager = address(123);

    // set mock
    vm.mockCall(manager, abi.encodeWithSelector(IConnectorManager.localDomain.selector), abi.encode(s.domain + 1));

    // test revert
    vm.prank(LibDiamond.contractOwner());
    vm.expectRevert(BridgeFacet.BridgeFacet__setXAppConnectionManager_domainsDontMatch.selector);
    this.setXAppConnectionManager(manager);
  }

  function test_BridgeFacet__setXAppConnectionManager_works() public {
    // constants
    address manager = address(123);

    // set mock
    vm.mockCall(manager, abi.encodeWithSelector(IConnectorManager.localDomain.selector), abi.encode(s.domain));

    vm.expectEmit(true, true, true, true);
    emit XAppConnectionManagerSet(manager, LibDiamond.contractOwner());

    // test
    vm.prank(LibDiamond.contractOwner());
    this.setXAppConnectionManager(manager);

    assertEq(address(s.xAppConnectionManager), manager);
  }

  // ============ Public methods ==============

  // ============ xcall ============
  // ============ xcall fail cases

  // fails if paused
  // FIXME: move to BaseConnextFacet.t.sol
  function test_BridgeFacet__xcall_failIfPaused() public {
    // require(false, "not tested");
  }

  function test_BridgeFacet__xcall_failIfDestinationNotSupported() public {
    _destinationDomain = 10000;
    s.domain = _originDomain;
    helpers_xcallAndAssert(BridgeFacet.BridgeFacet__mustHaveRemote_destinationNotSupported.selector);
  }

  function test_BridgeFacet__xcall_failIfEmptyTo() public {
    _defaultParams.to = address(0);
    helpers_xcallAndAssert(BridgeFacet.BridgeFacet__xcall_emptyTo.selector);
  }

  function test_BridgeFacet__xcall_failIfInvalidSlippage() public {
    _defaultParams.slippage = 15_000;
    helpers_xcallAndAssert(BridgeFacet.BridgeFacet__xcall_invalidSlippage.selector);
  }

  // TODO: fails if destination domain does not have an xapp router registered
  // FIXME: this should be tested at the integration level (i.e. when we deploy
  // the contracts via Deployer.sol), or on a facet that asserts this

  // fails if asset is not supported (i.e. s.adoptedToCanonical[assetId].id == bytes32(0) and using non-local)
  function test_BridgeFacet__xcall_failIfAssetNotSupported() public {
    // setup asset with local != adopted, not on canonical domain
    utils_setupAsset(false, false);

    s.tokenConfigs[utils_calculateCanonicalHash()].approval = false;

    helpers_xcallAndAssert(BaseConnextFacet.BaseConnextFacet__getApprovedCanonicalId_notAllowlisted.selector);
  }

  // fails if asset cap would be exceeded on the canonical domain
  function test_BridgeFacet__xcall_failIfEmptyLocal() public {
    // setup asset with local == adopted, on remote domain
    utils_setupAsset(true, false);

    // ensure stored value returns 0
    s.tokenConfigs[utils_calculateCanonicalHash()].representation = address(0);

    helpers_xcallAndAssert(BridgeFacet.BridgeFacet_xcall__emptyLocalAsset.selector);
  }

  // fails if asset cap would be exceeded on the canonical domain
  function test_BridgeFacet__xcall_failIfCapReachedOnCanonical() public {
    // setup asset with local == adopted, on canonical domain
    utils_setupAsset(true, true);

    s.tokenConfigs[utils_calculateCanonicalHash()].cap = _defaultAmount + 1;
    s.tokenConfigs[utils_calculateCanonicalHash()].custodied = 3;

    helpers_xcallAndAssert(BridgeFacet.BridgeFacet__xcall_capReached.selector);
  }

  // fails if native asset is used && amount > 0
  function test_BridgeFacet__xcall_failIfNativeAsset() public {
    uint256 amount = 1 ether;
    TestERC20 localToken = TestERC20(_local);
    localToken.mint(_defaultOriginSender, 1 ether);
    vm.prank(_defaultOriginSender);
    localToken.approve(address(this), 1 ether);

    vm.deal(_defaultOriginSender, 100 ether);

    // Set transacting asset to address 0, indicating the user wants to send native token, which
    // isn't supported.
    address asset = address(0);

    vm.expectRevert(BridgeFacet.BridgeFacet__xcall_nativeAssetNotSupported.selector);
    vm.prank(_defaultOriginSender);
    this.xcall{value: _relayerFee}(
      _defaultParams.destinationDomain,
      _defaultParams.to,
      asset,
      _defaultParams.delegate,
      amount,
      _defaultParams.slippage,
      _defaultParams.callData
    );
  }

  // fails if user has insufficient tokens
  function test_BridgeFacet__xcall_failInsufficientErc20Tokens() public {
    // The supposed input amount of tokens to be transferred.
    uint256 amount = 10.1 ether;
    // Local token contract.
    TestERC20 localToken = TestERC20(_local);

    // Mint only 10 ether of the input asset for the user - they will be 0.1 ether short!
    localToken.mint(_defaultOriginSender, 10 ether);

    // Deal user some ETH for making calls.
    vm.deal(_defaultOriginSender, 100 ether);

    // Approve for 10.1 ether.
    vm.prank(_defaultOriginSender);
    localToken.approve(address(this), 10.1 ether);

    vm.expectRevert("ERC20: transfer amount exceeds balance");
    vm.prank(_defaultOriginSender);
    this.xcall{value: _relayerFee}(
      _defaultParams.destinationDomain,
      _defaultParams.to,
      _local,
      _defaultParams.delegate,
      amount,
      _defaultParams.slippage,
      _defaultParams.callData
    );
  }

  // fails if user has not set enough allowance
  function test_BridgeFacet__xcall_failInsufficientErc20Approval() public {
    // The input amount of tokens to be transferred.
    uint256 amount = 10.1 ether;
    // Local token contract.
    TestERC20 localToken = TestERC20(_local);

    // Mint 20 ether of the input asset for the user; they have plenty of funds.
    localToken.mint(_defaultOriginSender, 20 ether);

    // Deal user some ETH for making calls.
    vm.deal(_defaultOriginSender, 100 ether);

    // Approve for only 10 ether - approval is 0.1 ether short!
    vm.prank(_defaultOriginSender);
    localToken.approve(address(this), 10 ether);

    vm.expectRevert("ERC20: insufficient allowance");
    vm.prank(_defaultOriginSender);
    this.xcall{value: _relayerFee}(
      _defaultParams.destinationDomain,
      _defaultParams.to,
      _local,
      _defaultParams.delegate,
      amount,
      _defaultParams.slippage,
      _defaultParams.callData
    );
  }

  // ============ xcall success cases

  // canonical token transfer on canonical domain
  function test_BridgeFacet__xcall_canonicalTokenTransferWorks() public {
    utils_setupAsset(true, true);
    helpers_xcallAndAssert(_canonical, _defaultAmount);
  }

  // works when transferring 0 value and empty asset
  function test_BridgeFacet__xcall_zeroValueEmptyAssetWorks() public {
    helpers_xcallAndAssert(address(0), 0);
  }

  // local token transfer on non-canonical domain (local != adopted)
  function test_BridgeFacet__xcall_localTokenTransferWorksWithAdopted() public {
    utils_setupAsset(false, false);
    helpers_xcallAndAssert();
  }

  // `xcallIntoLocal` should effectively be the same as the xcall but the TransferInfo should
  // have `receiveLocal` set to true.
  function test_BridgeFacet__xcallIntoLocal_works() public {
    utils_setupAsset(false, false);
    _defaultParams.receiveLocal = true;
    helpers_xcallAndAssert();
  }

  // local token transfer on non-canonical domain, local != adopted, send in local
  // (e.g. I should be able to xcall with madEth on optimism)
  function test_BridgeFacet__xcall_localTokenTransferWorksWhenNotAdopted() public {
    // Local is not adopted, not on canonical domain, sending in local.
    s.domain = _originDomain;
    utils_setupAsset(false, false);
    helpers_xcallAndAssert(_local, _defaultAmount);
  }

  // should just add relayer fee to the entry under the given transfer ID
  function test_BridgeFacet__xcall_worksIfPreexistingRelayerFee() public {
    // Local is not adopted, not on canonical domain, sending in local.
    utils_setupAsset(true, false);

    _defaultParams.originDomain = _originDomain;
    _defaultParams.destinationDomain = _destinationDomain;

    // The relayer fee we'll be sending in the helper method below:
    _relayerFee = 0.1 ether;

    // Flesh out the params and get the expected transfer ID.
    TransferInfo memory params = _defaultParams;
    params.bridgedAmt = _defaultAmount;
    params.normalizedIn = _defaultAmount;
    params.canonicalId = _canonicalId;
    params.canonicalDomain = _canonicalDomain;
    bytes32 transferId = _calculateTransferId(params);

    // Set the current relayer fee record to 2 ether. The msg.value should add 0.1 ether
    // to this for a total of 2.1 ether, as asserted below.
    helpers_xcallAndAssert(params, _local, _defaultAmount, bytes4(""), false);
  }

  // local token transfer on non-canonical domain (local == adopted)
  function test_BridgeFacet__xcall_localTokenTransferWorksWithoutAdopted() public {
    utils_setupAsset(true, false);
    helpers_xcallAndAssert(_local, _defaultAmount);
  }

  // adopted asset transfer
  function test_BridgeFacet__xcall_adoptedTransferWorks() public {
    utils_setupAsset(false, false);
    // Set the expected slippage specifically:
    _defaultParams.bridgedAmt = (_defaultAmount * 9995) / _liquidityFeeDenominator;
    helpers_xcallAndAssert(_adopted, _defaultAmount);
  }

  // should work with positive slippage
  function test_BridgeFacet__xcall_worksWithPositiveSlippage() public {
    utils_setupAsset(false, false);
    // Set the expected slippage to be positive.
    _defaultParams.bridgedAmt = (_defaultAmount * 10005) / _liquidityFeeDenominator;
    helpers_xcallAndAssert(_adopted, _defaultAmount);
  }

  // should work with asset defined and 0 value
  function test_BridgeFacet__xcall_worksWithoutValue() public {
    utils_setupAsset(false, false);
    // Despite using the adopted asset as the input asset, this xcall shouldn't
    // call stableswap because it's a 0-value transfer.
    helpers_xcallAndAssert(_adopted, 0, bytes4(""), false);
  }

  // works if relayer fee is set to 0
  function test_BridgeFacet__xcall_zeroRelayerFeeWorks() public {
    _relayerFee = 0;
    s.domain = _originDomain;
    utils_setupAsset(true, true);
    helpers_xcallAndAssert(_adopted, _defaultAmount);
  }

  // ============ execute ============
  // ============ execute fail cases

  // FIXME: move to `BaseConnextFacet.t.sol`
  // should fail if paused
  function test_BridgeFacet__execute_failIfPaused() public {
    // set context
    s._paused = true;

    // get args
    (, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    // expect failure
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__whenNotPaused_paused.selector);
    this.execute(args);
  }

  // should fail if msg.sender is not an approved relayer && msg.sender != params.delegate
  function test_BridgeFacet__execute_failIfSenderNotApproved() public {
    // set context
    s.approvedRelayers[address(this)] = false;

    // get args
    (, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    // expect failure
    vm.expectRevert(BridgeFacet.BridgeFacet__execute_unapprovedSender.selector);
    this.execute(args);
  }

  // multipath: should fail if pathLength > maxRouters
  function test_BridgeFacet__execute_failIfPathLengthGreaterThanMaxRouters() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(s.maxRoutersPerTransfer + 1);

    for (uint256 i; i < args.routers.length; i++) {
      s.routerBalances[args.routers[i]][_local] += 10 ether;
    }

    vm.expectRevert(BridgeFacet.BridgeFacet__execute_maxRoutersExceeded.selector);
    this.execute(args);
  }

  // should fail if no routers were passed in and not reconciled (status != Reconciled)
  function test_BridgeFacet__execute_failIfNoRoutersAndNotReconciled() public {
    // Setting no routers in the execute call means that the transfer must already be reconciled.
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(0);

    vm.expectRevert(BridgeFacet.BridgeFacet__execute_notReconciled.selector);
    this.execute(args);
  }

  // should fail if the router is not approved and ownership is not renounced
  function test_BridgeFacet__execute_failIfRouterNotApproved() public {
    s._routerAllowlistRemoved = false;

    (, ExecuteArgs memory args) = utils_makeExecuteArgs(1);
    s.routerConfigs[args.routers[0]].approved = false;

    vm.expectRevert(BridgeFacet.BridgeFacet__execute_notSupportedRouter.selector);
    this.execute(args);
  }

  // should fail if the router signature is invalid
  function test_BridgeFacet__execute_failIfSignatureInvalid() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    s.routerBalances[args.routers[0]][_local] += 10 ether;

    // Make invalid args based on (slightly) altered params.
    _defaultParams.originDomain = 1001;
    (, ExecuteArgs memory invalidArgs) = utils_makeExecuteArgs(4);
    // The signature of the last router in the group will be invalid.
    args.routerSignatures[0] = invalidArgs.routerSignatures[0];

    vm.expectRevert(BridgeFacet.BridgeFacet__execute_invalidRouterSignature.selector);
    this.execute(args);
  }

  // should fail if the sequencer is not approved
  function test_BridgeFacet__execute_failIfSequencerNotApproved() public {
    (, ExecuteArgs memory args) = utils_makeExecuteArgs(1);
    s.approvedSequencers[args.sequencer] = false;

    vm.expectRevert(BridgeFacet.BridgeFacet__execute_notSupportedSequencer.selector);
    this.execute(args);
  }

  // should fail if the sequencer signature is invalid
  function test_BridgeFacet__execute_failIfSequencerSignatureInvalid() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    s.routerBalances[args.routers[0]][_local] += 10 ether;

    // Make invalid args based on (slightly) altered params (this will make
    // the transfer ID different).
    _defaultParams.originDomain = 1001;
    (, ExecuteArgs memory invalidArgs) = utils_makeExecuteArgs(4);
    // The signature of the sequencer will be invalid, as it signed a different transfer ID.
    args.sequencerSignature = invalidArgs.sequencerSignature;

    vm.expectRevert(BridgeFacet.BridgeFacet__execute_invalidSequencerSignature.selector);
    this.execute(args);
  }

  // should fail if the sequencer signature is invalid; for this test, we'll be attempting to replay
  // one of the routers in the array repeatedly.
  function test_BridgeFacet__execute_failIfSequencerSignatureAndRoutersMismatch() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(4);

    s.routerBalances[args.routers[0]][_local] += 100 ether;
    s.routerBalances[args.routers[1]][_local] += 100 ether;
    s.routerBalances[args.routers[2]][_local] += 100 ether;
    s.routerBalances[args.routers[3]][_local] += 100 ether;

    // Imagine a malicious relayer calling `execute` colludes with the first router in the array
    // to replay their address and signature for the other slots in the path.
    args.routers[1] = args.routers[0];
    args.routers[2] = args.routers[0];
    args.routers[3] = args.routers[0];
    args.routerSignatures[1] = args.routerSignatures[0];
    args.routerSignatures[2] = args.routerSignatures[0];
    args.routerSignatures[3] = args.routerSignatures[0];

    // The signature of the sequencer will be invalid, as it signed a different router array.
    vm.expectRevert(BridgeFacet.BridgeFacet__execute_invalidSequencerSignature.selector);
    this.execute(args);
  }

  function test_BridgeFacet__execute_failIfSequencerSignatureAndSequencerAddressMismatch() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    s.routerBalances[args.routers[0]][_local] += 10 ether;

    address otherSequencer = address(789456123);
    s.approvedSequencers[otherSequencer] = true;

    // The signature of the sequencer will be invalid, because the sig recovery will result in a
    // different address.
    args.sequencer = otherSequencer;

    vm.expectRevert(BridgeFacet.BridgeFacet__execute_invalidSequencerSignature.selector);
    this.execute(args);
  }

  // multipath: should fail if any 1 router's signature is invalid
  function test_BridgeFacet__execute_failIfAnySignatureInvalid() public {
    // Using multipath; this should fail if any 1 router signature is invalid.
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(4);

    for (uint256 i; i < args.routers.length; i++) {
      s.routerBalances[args.routers[i]][_local] += 10 ether;
    }

    // Make invalid args based on (slightly) altered params.
    _defaultParams.originDomain = 1001;
    (, ExecuteArgs memory invalidArgs) = utils_makeExecuteArgs(4);
    // The signature of the last router in the group will be invalid.
    args.routerSignatures[3] = invalidArgs.routerSignatures[3];

    vm.expectRevert(BridgeFacet.BridgeFacet__execute_invalidRouterSignature.selector);
    this.execute(args);
  }

  // should fail if it was already executed (s.transferStatus[transferId] != none)
  function test_BridgeFacet__execute_failIfAlreadyExecuted() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);
    s.transferStatus[transferId] = DestinationTransferStatus.Executed;

    s.routerBalances[args.routers[0]][_local] += 10 ether;

    vm.expectRevert(BridgeFacet.BridgeFacet__execute_badFastLiquidityStatus.selector);
    this.execute(args);
  }

  // should fail if the router does not have sufficient tokens
  function test_BridgeFacet__execute_failIfRouterHasInsufficientFunds() public {
    _defaultAmount = 5 ether;

    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(2);

    s.routerBalances[args.routers[0]][_local] = 1.5 ether;

    vm.expectRevert(stdError.arithmeticError);
    this.execute(args);
  }

  // multipath: should fail if any 1 router has insufficient tokens
  function test_BridgeFacet__execute_failIfAnyRouterHasInsufficientFunds() public {
    _defaultAmount = 5 ether;

    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(s.maxRoutersPerTransfer);

    uint256 routerAmountSent = _defaultAmount / args.routers.length; // The amount each individual router will send.

    // Set the first router's balance to be (slightly) less than the amount that they'd need to send.
    s.routerBalances[args.routers[0]][_local] = routerAmountSent - 0.1 ether;
    // All other routers have plenty of funds.
    for (uint256 i = 1; i < args.routers.length; i++) {
      s.routerBalances[args.routers[i]][_local] = 50 ether;
    }

    vm.expectRevert(stdError.arithmeticError);
    this.execute(args);
  }

  function test_BridgeFacet__execute_failsIfRouterNotApprovedForPortal() public {
    _defaultAmount = 5 ether;

    (bytes32 _id, ExecuteArgs memory _args) = utils_makeExecuteArgs(1);

    s.routerBalances[_args.routers[0]][_local] = 4.5 ether;

    // set aave enabled
    s.aavePool = _aavePool;

    vm.expectRevert(abi.encodeWithSelector(BridgeFacet.BridgeFacet__execute_notApprovedForPortals.selector));
    this.execute(_args);
  }

  // ============ execute success cases
  // should use the local asset if specified (receiveLocal = true)
  function test_BridgeFacet__execute_receiveLocalWorks() public {
    _defaultParams.receiveLocal = true;

    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    s.routerBalances[args.routers[0]][_local] += 10 ether;

    // set asset context (local != adopted)
    utils_setupAsset(false, false);

    helpers_executeAndAssert(transferId, args, utils_getFastTransferAmount(args.params.bridgedAmt), false);
  }

  // should work with approved router if router ownership is not renounced
  function test_BridgeFacet__execute_worksWithLocalAsAdopted() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    s.routerBalances[args.routers[0]][_local] += 10 ether;
    s.routerConfigs[args.routers[0]].approved = true;

    // set asset context (local == adopted)
    utils_setupAsset(true, false);

    helpers_executeAndAssert(transferId, args);
  }

  // should work with approved router if router ownership is not renounced
  function test_BridgeFacet__execute_worksWithEmptyCanonicalIfZeroValue() public {
    _defaultParams.canonicalId = bytes32(0);
    _defaultParams.canonicalDomain = 0;
    _defaultAmount = 0;
    _local = address(0);
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    s.routerBalances[args.routers[0]][_local] += 10 ether;
    s.routerConfigs[args.routers[0]].approved = true;

    // set asset context (local == adopted)
    utils_setupAsset(true, false);

    helpers_executeAndAssert(transferId, args);
  }

  // works when local != adopted
  function test_BridgeFacet__execute_worksWithAdopted() public {
    // set asset context (local != adopted)
    s.domain = _destinationDomain;
    utils_setupAsset(false, false);

    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    s.routerBalances[args.routers[0]][_local] += 10 ether;
    s.routerConfigs[args.routers[0]].approved = true;

    helpers_executeAndAssert(transferId, args, utils_getFastTransferAmount(args.params.bridgedAmt), true);
  }

  // works when local != adopted, should work with +ve slippage
  function test_BridgeFacet__execute_worksWithPositiveSlippage() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    s.routerBalances[args.routers[0]][_local] += 10 ether;
    s.routerConfigs[args.routers[0]].approved = true;

    // set asset context (local != adopted)
    utils_setupAsset(false, false);

    helpers_executeAndAssert(transferId, args, utils_getFastTransferAmount(args.params.bridgedAmt) + 1 ether, true);
  }

  // works when local != adopted, should work with -ve slippage
  function test_BridgeFacet__execute_worksWithNegativeSlippage() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    s.routerBalances[args.routers[0]][_local] += 10 ether;
    s.routerConfigs[args.routers[0]].approved = true;

    // set asset context (local != adopted)
    utils_setupAsset(false, false);

    helpers_executeAndAssert(transferId, args, utils_getFastTransferAmount(args.params.bridgedAmt) - 0.01 ether, true);
  }

  // works when on canonical domain
  function test_BridgeFacet__execute_worksOnCanonicalWithoutCap() public {
    // set asset context (local == adopted)
    _canonicalDomain = _destinationDomain;
    _cap = 0;
    utils_setupAsset(true, true);

    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    s.routerBalances[args.routers[0]][_canonical] += 10 ether;

    helpers_executeAndAssert(transferId, args);
  }

  function test_BridgeFacet__execute_worksOnCanonicalWithCap() public {
    // set asset context (local == adopted)
    _canonicalDomain = _destinationDomain;
    _cap = 10 ether;
    utils_setupAsset(true, true);
    s.tokenConfigs[utils_calculateCanonicalHash()].custodied = IERC20(_canonical).balanceOf(address(this));

    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    s.routerBalances[args.routers[0]][_canonical] += 10 ether;

    helpers_executeAndAssert(transferId, args);
  }

  // should work with unapproved router if router ownership is renounced
  function test_BridgeFacet__execute_worksWithUnapprovedIfNoAllowlist() public {
    s._routerAllowlistRemoved = true;

    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    s.routerBalances[args.routers[0]][_local] += 10 ether;
    s.routerConfigs[args.routers[0]].approved = false;

    // set asset context (local == adopted)
    utils_setupAsset(true, false);

    helpers_executeAndAssert(transferId, args);
  }

  // should work with 0 value
  function test_BridgeFacet__execute_worksWith0Value() public {
    _defaultAmount = 0;

    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    // set asset context (local == adopted)
    utils_setupAsset(true, false);

    helpers_executeAndAssert(transferId, args);
  }

  // should work without calldata
  function test_BridgeFacet__execute_noCalldataWorks() public {
    _defaultParams.callData = bytes("");
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    s.routerBalances[args.routers[0]][_local] += 10 ether;

    // set asset context (local == adopted)
    utils_setupAsset(true, false);

    // With no calldata set, this method call should just send funds directly to the user.
    helpers_executeAndAssert(transferId, args);
  }

  // should work with successful calldata and using fast liquidity
  function test_BridgeFacet__execute_successfulCalldata() public {
    // Set the args.to to the mock xapp address, and args.callData to the `fulfill` fn.
    _defaultParams.to = _xapp;
    _defaultParams.callData = bytes("zomg");

    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    s.routerBalances[args.routers[0]][_local] += 10 ether;

    // set asset context (local == adopted)
    utils_setupAsset(true, false);

    helpers_executeAndAssert(
      transferId,
      args,
      utils_getFastTransferAmount(args.params.bridgedAmt),
      true,
      true,
      false,
      false,
      false
    );
  }

  // should work with failing calldata : contract call failed
  function test_BridgeFacet__execute_calldataFailsLoudlyOnFast() public {
    // Set the args.to to the mock xapp address, and set to fail
    MockXApp(_xapp).setFail(true);
    _defaultParams.callData = bytes("zomg");
    _defaultParams.to = _xapp;

    // set asset context (local == adopted)
    s.domain = _destinationDomain;
    utils_setupAsset(true, false);

    // get args
    (bytes32 transferId, ExecuteArgs memory _args) = utils_makeExecuteArgs(1);

    s.routerBalances[_args.routers[0]][_local] += 10 ether;

    vm.expectRevert(BridgeFacet.BridgeFacet__execute_externalCallFailed.selector);
    this.execute(_args);
  }

  // should work with failing calldata : contract call failed
  function test_BridgeFacet__execute_calldataFailureHandledOnSlow() public {
    // Set the args.to to the mock xapp address, and set to fail
    MockXApp(_xapp).setFail(true);
    _defaultParams.callData = bytes("zomg");
    _defaultParams.to = _xapp;

    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(0);

    s.transferStatus[transferId] = DestinationTransferStatus.Reconciled;

    // set asset context (local == adopted)
    utils_setupAsset(true, false);

    helpers_executeAndAssert(transferId, args, args.params.bridgedAmt, true, false, false, false, false);
  }

  function test_BridgeFacet__execute_failsIfNoLiquidityAndAaveNotEnabled() public {
    // get args
    (bytes32 _id, ExecuteArgs memory _args) = utils_makeExecuteArgs(1);

    // set liquidity context
    for (uint256 i; i < _args.routers.length; i++) {
      s.routerBalances[_args.routers[i]][_local] = 0 ether;
    }

    // set aave not enabled
    s.aavePool = address(0);

    vm.expectRevert(stdError.arithmeticError);
    this.execute(_args);
  }

  // should work if already reconciled (happening in slow liquidity mode, uses
  // authenticated data)
  function test_BridgeFacet__execute_handleAlreadyReconciled() public {
    // set asset context (local == adopted)
    s.domain = _destinationDomain;
    utils_setupAsset(true, false);

    // Set the args.to to the mock xapp address, and args.callData to the
    // `fulfillWithProperties` fn. This will check to make sure `originDomain` and
    // `originSender` properties are correctly set.
    MockXApp(_xapp).setPermissions(_defaultOriginSender, _originDomain);
    _defaultParams.callData = bytes("yayaytestsyay");
    _defaultParams.to = _xapp;

    // We specify that 0 routers are in the path for this execution.
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(0);

    // Transfer has already been reconciled.
    s.transferStatus[transferId] = DestinationTransferStatus.Reconciled;

    helpers_executeAndAssert(transferId, args, args.params.bridgedAmt, true, true, false, false, false);
  }

  // multipath: should subtract equally from each router's liquidity
  function test_BridgeFacet__execute_multipath() public {
    _defaultAmount = 1 ether;

    // Should work if the pathLength == max routers.
    uint256 pathLength = s.maxRoutersPerTransfer;
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(pathLength);

    // Add initial liquiidty
    for (uint256 i = 1; i < args.routers.length; i++) {
      s.routerBalances[args.routers[i]][_local] = 10 ether;
    }
    // Sanity check: assuming the multipath is > 1, no router should need to have more than half of the
    // transfer amount.
    s.routerBalances[args.routers[0]][_local] = 0.5 ether;

    uint256 amount = utils_getFastTransferAmount(args.params.bridgedAmt);
    uint256 routerAmountSent = amount / pathLength; // The amount each individual router will send.

    // set asset context (local == adopted)
    utils_setupAsset(true, false);

    helpers_executeAndAssert(transferId, args);
  }

  // should work with approved router if router ownership is not renounced
  function test_BridgeFacet__execute_worksWithDelegateAsSender() public {
    address delegate = address(12345654321);
    _defaultParams.delegate = delegate;
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    s.routerBalances[args.routers[0]][_local] += 10 ether;
    s.routerConfigs[args.routers[0]].approved = true;

    // set asset context (local == adopted)
    utils_setupAsset(true, false);

    s.approvedRelayers[address(this)] = false;
    helpers_executeAndAssert(transferId, args, true);
  }

  // can use liquidity from portals
  function test_BridgeFacet__execute_worksWithAave() public {
    // set asset context (local == adopted)
    s.domain = _destinationDomain;
    utils_setupAsset(true, false);

    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    // set liquidity
    s.routerBalances[args.routers[0]][_local] = 0;

    // set approval
    s.routerConfigs[args.routers[0]].portalApproved = true;

    helpers_executeAndAssert(
      transferId,
      args,
      utils_getFastTransferAmount(args.params.bridgedAmt),
      false,
      true,
      false,
      true,
      false
    );
  }

  // uses slippage overrides
  function test_BridgeFacet__execute_respectsSlippageOverrides() public {
    // set asset context (local != adopted)
    s.domain = _destinationDomain;
    utils_setupAsset(false, false);

    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    // set liquidity
    s.routerBalances[args.routers[0]][_local] = 10 ether;

    // set slippage override
    s.slippage[transferId] = 5000;

    helpers_executeAndAssert(transferId, args, utils_getFastTransferAmount(args.params.bridgedAmt), true);
  }

  // uses force local overrides
  // uses slippage overrides
  function test_BridgeFacet__execute_respectsReceiveLocalOverrides() public {
    // set asset context (local != adopted)
    s.domain = _destinationDomain;
    utils_setupAsset(false, false);

    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);

    // set liquidity
    s.routerBalances[args.routers[0]][_local] = 10 ether;

    // set receive local override
    s.receiveLocalOverride[transferId] = true;

    helpers_executeAndAssert(transferId, args, utils_getFastTransferAmount(args.params.bridgedAmt), false);
  }

  // ============ bumpTransfer ============
  // ============ bumpTransfer fail cases
  // should work with unapproved router if router-allowlist ownership renouncedcanonicalId

  // ============ forceUpdateSlippage ============
  function test_BridgeFacet__forceUpdateSlippage_failsIfNotDelegate() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);
    vm.expectRevert(BridgeFacet.BridgeFacet__onlyDelegate_notDelegate.selector);
    this.forceUpdateSlippage(args.params, 5_000);
  }

  function test_BridgeFacet__forceUpdateSlippage_failsIfInvalidSlippage() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);
    vm.expectRevert(BridgeFacet.BridgeFacet__forceUpdateSlippage_invalidSlippage.selector);
    vm.prank(args.params.delegate);
    this.forceUpdateSlippage(args.params, 25_000);
  }

  function test_BridgeFacet__forceUpdateSlippage_failsIfNotDestination() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);
    s.domain = args.params.originDomain;
    vm.expectRevert(BridgeFacet.BridgeFacet__forceUpdateSlippage_notDestination.selector);
    vm.prank(args.params.delegate);
    this.forceUpdateSlippage(args.params, 5_000);
  }

  function test_BridgeFacet__forceUpdateSlippage_works() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);
    s.domain = args.params.destinationDomain;

    vm.expectEmit(true, true, true, true);
    emit SlippageUpdated(transferId, 5_000);

    vm.prank(args.params.delegate);
    this.forceUpdateSlippage(args.params, 5_000);
    assertEq(s.slippage[transferId], 5_000);
  }

  // ============ forceReceiveLocal ============
  function test_BridgeFacet__forceReceiveLocal_failsIfNotDelegate() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);
    vm.expectRevert(BridgeFacet.BridgeFacet__onlyDelegate_notDelegate.selector);
    this.forceReceiveLocal(args.params);
  }

  function test_BridgeFacet__forceReceiveLocal_failsIfNotDestination() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);
    s.domain = args.params.originDomain;
    vm.expectRevert(BridgeFacet.BridgeFacet__forceReceiveLocal_notDestination.selector);
    vm.prank(args.params.delegate);
    this.forceReceiveLocal(args.params);
  }

  function test_BridgeFacet__forceReceiveLocal_works() public {
    (bytes32 transferId, ExecuteArgs memory args) = utils_makeExecuteArgs(1);
    s.domain = args.params.destinationDomain;

    vm.expectEmit(true, true, true, true);
    emit ForceReceiveLocal(transferId);

    vm.prank(args.params.delegate);
    this.forceReceiveLocal(args.params);

    assertTrue(s.receiveLocalOverride[transferId]);
  }
}
