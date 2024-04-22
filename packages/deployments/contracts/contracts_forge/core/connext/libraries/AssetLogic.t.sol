// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "../../../../contracts/core/connext/libraries/AssetLogic.sol";
import "../../../../contracts/core/connext/libraries/SwapUtils.sol";
import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {LibConnextStorage, AppStorage, TokenId} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";

import "../../../utils/FacetHelper.sol";
import "../../../utils/Mock.sol";

// Helper to call library with native value functions
contract LibCaller {
  constructor() {
    AppStorage storage s = LibConnextStorage.connextStorage();
  }

  function handleIncomingAsset(address _asset, uint256 _amount) public payable {
    AssetLogic.handleIncomingAsset(_asset, _amount);
  }
}

contract AssetLogicTest is BaseConnextFacet, FacetHelper {
  // ============ Storage ============
  LibCaller caller;

  // ============ Setup ============
  function setUp() public {
    // set defaults
    utils_setFees();
    utils_deployAssetContracts();
    // set up assets (including remote swap)
    utils_setupAsset(false, false);
    // // set stable swap
    // utils_setMockStableSwap();
    caller = new LibCaller();
  }

  // ============ utils ============

  function utils_setMockStableSwap() internal {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(_adopted);
    _pooledTokens[1] = IERC20(address(22));
    uint256[] memory _tokenPrecisionMultipliers = new uint256[](2);
    _tokenPrecisionMultipliers[0] = 1;
    _tokenPrecisionMultipliers[1] = 1;
    uint256[] memory _balances = new uint256[](2);
    _balances[0] = 100;
    _balances[1] = 100;

    SwapUtils.Swap memory swap = SwapUtils.Swap({
      key: _canonicalKey,
      initialA: 0,
      futureA: 0,
      initialATime: 0,
      futureATime: 0,
      // fee calculations
      swapFee: 0,
      adminFee: 0,
      lpToken: LPToken(address(100)),
      // contract references for all tokens being pooled
      pooledTokens: _pooledTokens,
      // multipliers for each pooled token's precision to get to POOL_PRECISION_DECIMALS
      // for example, TBTC has 18 decimals, so the multiplier should be 1. WBTC
      // has 8, so the multiplier should be 10 ** 18 / 10 ** 8 => 10 ** 10
      tokenPrecisionMultipliers: _tokenPrecisionMultipliers,
      // the pool balance of each token, in the token's precision
      // the contract's actual token balance might differ
      balances: _balances,
      adminFees: new uint256[](2),
      disabled: false,
      removeTime: 0
    });

    s.swapStorages[_canonicalKey] = swap;
    s.tokenIndexes[_canonicalKey][_adopted] = 0;
  }

  // transfers specified asset to contract
  function utils_handleIncomingAssetAndAssert(address asset, uint256 amount) public {
    // get initial balances
    uint256 initSrcAssetBalance = IERC20(asset).balanceOf(address(this));
    uint256 initDestAssetBalance = IERC20(asset).balanceOf(address(caller));

    // approve
    IERC20(asset).approve(address(caller), amount);

    caller.handleIncomingAsset(asset, amount);

    console.log(asset, amount);

    // caller balance should go up in token amount.
    assertEq(IERC20(asset).balanceOf(address(caller)), initDestAssetBalance + amount);
    // source balance should go down in token amount.
    assertEq(IERC20(asset).balanceOf(address(this)), initSrcAssetBalance - amount);
  }

  // transfers specified asset from contract
  function utils_handleOutgoingAssetAndAssert(
    address assetId,
    address to,
    uint256 amount
  ) public {
    TestERC20(assetId).mint(address(this), 10 ether);

    // set expects
    if (amount != 0) {
      // Should transfer funds to user
      vm.expectCall(assetId, abi.encodeWithSelector(IERC20.transfer.selector, to, amount));
    } // otherwise, no calls should be made

    // get initial balances
    uint256 initContract = IERC20(assetId).balanceOf(address(this));
    uint256 initTarget = IERC20(assetId).balanceOf(to);

    // call
    AssetLogic.handleOutgoingAsset(assetId, to, amount);

    // assert balance changes on contract + target
    uint256 finalTarget = IERC20(assetId).balanceOf(to);
    assertEq(IERC20(assetId).balanceOf(address(this)), initContract - amount);
    assertEq(finalTarget, initTarget + amount);
  }

  // Sets up env to swap from local -> adopted using external pools only
  function utils_swapFromLocalAndAssertViaExternal(
    address asset,
    uint256 amount,
    uint256 swapOut,
    uint256 slippage,
    uint256 normalizedIn
  ) internal {
    // set mock
    vm.mockCall(_stableSwap, abi.encodeWithSelector(IStableSwap.swapExact.selector), abi.encode(swapOut));

    bool willSwap = asset == _local && amount != 0;
    if (willSwap) {
      // expect pool approval
      vm.expectCall(_local, abi.encodeWithSelector(IERC20.approve.selector, _stableSwap, amount));
      // expect swap
      vm.expectCall(_stableSwap, abi.encodeWithSelector(IStableSwap.swapExact.selector, amount, _local, _adopted));
    }

    uint32 domain = s.representationToCanonical[_local].domain;
    bytes32 canonicalId = s.representationToCanonical[_local].id;
    bytes32 key = keccak256(abi.encode(canonicalId, domain));
    (uint256 received, address out) = AssetLogic.swapFromLocalAssetIfNeeded(key, asset, amount, slippage, normalizedIn);
    // assert return amount
    assertEq(received, willSwap ? swapOut : amount);
    // assert return asset
    assertEq(out, _adopted);
  }

  // Sets up env to swap from local -> adopted using external pools only
  function utils_swapToLocalAndAssertViaExternal(
    address asset,
    uint256 amount,
    uint256 swapOut,
    uint256 slippage
  ) internal {
    // remove internal stableswap pool reference so we're using the external pool
    delete s.swapStorages[_canonicalKey];

    // Retrieve internal swap pool reference.
    SwapUtils.Swap storage ipool = s.swapStorages[_canonicalKey];

    console.log(ipool.pooledTokens.length);

    // set mock
    vm.mockCall(_stableSwap, abi.encodeWithSelector(IStableSwap.swapExact.selector), abi.encode(swapOut));

    bool willSwap = asset == _adopted && amount != 0;
    if (willSwap) {
      // expect pool approval
      vm.expectCall(_adopted, abi.encodeWithSelector(IERC20.approve.selector, _stableSwap, amount));
      // expect swap
      vm.expectCall(_stableSwap, abi.encodeWithSelector(IStableSwap.swapExact.selector, amount, _adopted, _local));
    }

    console.logBytes32(_canonicalKey);
    console.logBytes32(AssetLogic.calculateCanonicalHash(_canonicalId, _canonicalDomain));
    console.log(_stableSwap);

    uint256 received = AssetLogic.swapToLocalAssetIfNeeded(
      AssetLogic.calculateCanonicalHash(_canonicalId, _canonicalDomain),
      asset,
      _local,
      amount,
      slippage
    );
    // assert return amount
    assertEq(received, willSwap ? swapOut : amount);
  }

  // ============ getTokenIndexFromStableSwapPool ============
  function test_AssetLogic__getTokenIndexFromStableSwapPool_failsIfNotFound() public {
    utils_setMockStableSwap();
    address arbitrary = address(555555555555);
    vm.expectRevert(AssetLogic.AssetLogic__getTokenIndexFromStableSwapPool_notExist.selector);
    AssetLogic.getTokenIndexFromStableSwapPool(_canonicalKey, arbitrary);
  }

  function test_AssetLogic__getTokenIndexFromStableSwapPool_works() public {
    utils_setMockStableSwap();
    assertEq(AssetLogic.getTokenIndexFromStableSwapPool(_canonicalKey, _adopted), 0);
  }

  // ============ handleIncomingAsset ============
  function test_AssetLogic__handleIncomingAsset_worksWithToken() public {
    utils_handleIncomingAssetAndAssert(_local, 1 ether);
  }

  function test_AssetLogic__handleIncomingAsset_failsWithFeeOnTransferToken() public {
    FeeERC20 feeAsset = new FeeERC20();
    vm.expectRevert(AssetLogic.AssetLogic__handleIncomingAsset_feeOnTransferNotSupported.selector);
    caller.handleIncomingAsset(address(feeAsset), 1 ether);
  }

  // ============ handleOutgoingAsset ============
  function test_AssetLogic__handleOutgoingAsset_failsIfNoAsset() public {
    // set constants
    address assetId = address(0);
    address to = address(12345);
    uint256 amount = 12345678;
    vm.expectRevert(AssetLogic.AssetLogic__handleOutgoingAsset_notNative.selector);
    AssetLogic.handleOutgoingAsset(assetId, to, amount);
  }

  function test_AssetLogic__handleOutgoingAsset_works() public {
    // set constants
    address assetId = _local;
    address to = address(12345);
    uint256 amount = 12345678;
    utils_handleOutgoingAssetAndAssert(assetId, to, amount);
  }

  function test_AssetLogic__handleOutgoingAsset_worksIfZero() public {
    // set constants
    address assetId = _local;
    address to = address(12345);
    uint256 amount = 0;
    utils_handleOutgoingAssetAndAssert(assetId, to, amount);
  }

  // ============ calculateSlippageBoundary ============
  function test_AssetLogic__calculateSlippageBoundary_worksWithSameDecimals() public {
    uint8 _in = 18;
    uint8 _out = 18;

    uint256 _amount = 100 ether; // 100000000000000000000 wei
    uint256 _slippage = 1000;
    uint256 _expected = (_amount * 9000) / 10000;

    assertEq(_expected, AssetLogic.calculateSlippageBoundary(_in, _out, _amount, _slippage));
  }

  function test_AssetLogic__calculateSlippageBoundary_worksWithDecreasingPrecision() public {
    uint8 _in = 18;
    uint8 _out = 6;

    uint256 _amount = 100 ether; // 100000000000000000000 wei
    uint256 _slippage = 1000;
    uint256 _expected = (100000000 * 9000) / 10000;

    assertEq(_expected, AssetLogic.calculateSlippageBoundary(_in, _out, _amount, _slippage));
  }

  function test_AssetLogic__calculateSlippageBoundary_worksWithIncreasingPrecision() public {
    uint8 _in = 6;
    uint8 _out = 18;

    uint256 _amount = 100000000;
    uint256 _slippage = 1000;
    uint256 _expected = (100 ether * 9000) / 10000; // 90000000000000000000 wei

    assertEq(_expected, AssetLogic.calculateSlippageBoundary(_in, _out, _amount, _slippage));
  }

  // ============ normalizeDecimals ============
  function test_AssetLogic__normalizeDecimals_worksWhenIncreasingDecimals() public {
    uint8 _in = 6;
    uint8 _out = 18;

    uint256 _amount = 100000000;
    uint256 _expected = 100 ether; // 100000000000000000000 wei

    assertEq(_expected, AssetLogic.normalizeDecimals(_in, _out, _amount));
  }

  function test_AssetLogic__normalizeDecimals_worksWhenDecreasingDecimals() public {
    uint8 _in = 18;
    uint8 _out = 6;

    uint256 _amount = 100 ether; // 100000000000000000000 wei
    uint256 _expected = 100000000;

    assertEq(_expected, AssetLogic.normalizeDecimals(_in, _out, _amount));
  }

  function test_AssetLogic__normalizeDecimals_worksWhenDecimalsAreSame() public {
    uint8 _in = 18;
    uint8 _out = 18;

    uint256 _amount = 100 ether; // 100000000000000000000 wei
    uint256 _expected = 100 ether;

    assertEq(_expected, AssetLogic.normalizeDecimals(_in, _out, _amount));
  }

  // ============ swapToLocalAssetIfNeeded ============

  // doesn't swap
  function test_AssetLogic__swapToLocalAssetIfNeeded_worksIfZero() public {
    utils_swapToLocalAndAssertViaExternal(_adopted, 0, 10000, 1_000);
  }

  // does not swap if already local
  function test_AssetLogic__swapToLocalAssetIfNeeded_worksWithLocal() public {
    utils_swapToLocalAndAssertViaExternal(_local, 1 ether, 0.9 ether, 1_000);
  }

  // works
  function test_AssetLogic__swapToLocalAssetIfNeeded_worksWithAdopted() public {
    utils_swapToLocalAndAssertViaExternal(_adopted, 1 ether, 0.9 ether, 1_000);
  }

  // ============ swapFromLocalAssetIfNeeded ============

  // doesn't swap
  function test_AssetLogic__swapFromLocalAssetIfNeeded_worksIfZero() public {
    utils_swapFromLocalAndAssertViaExternal(_local, 0, 0.1 ether, 1_000, 0 ether);
  }

  // does not swap if already adopted
  function test_AssetLogic__swapFromLocalAssetIfNeeded_worksWithAdopted() public {
    utils_swapFromLocalAndAssertViaExternal(_adopted, 1 ether, 0.9 ether, 1_000, 1 ether);
  }

  // should work (swap local for adopted)
  function test_AssetLogic__swapFromLocalAssetIfNeeded_worksWithLocal() public {
    utils_swapFromLocalAndAssertViaExternal(_local, 1 ether, 0.9 ether, 1_000, 1 ether);
  }
}
