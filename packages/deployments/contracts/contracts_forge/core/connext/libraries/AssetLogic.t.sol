// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "../../../../contracts/core/connext/libraries/AssetLogic.sol";
import "../../../../contracts/core/connext/libraries/SwapUtils.sol";
import {IWrapped} from "../../../../contracts/core/connext/interfaces/IWrapped.sol";
import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {ConnextMessage} from "../../../../contracts/core/connext/libraries/ConnextMessage.sol";
import {LibConnextStorage, AppStorage, PausedFunctions} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";
import {ITokenRegistry} from "../../../../contracts/core/connext/interfaces/ITokenRegistry.sol";

import "../facets/FacetHelper.sol";

import "forge-std/console.sol";

// Helper to call library with native value functions
contract LibCaller {
  function handleIncomingAsset(
    address _assetId,
    uint256 _assetAmount,
    uint256 _fee
  ) public payable {
    AssetLogic.handleIncomingAsset(_assetId, _assetAmount, _fee);
  }
}

contract AssetLogicTest is BaseConnextFacet, FacetHelper {
  // ============ Storage ============
  LibCaller caller;

  // ============ Setup ============
  function setUp() public {
    // set defaults
    utils_deployAssetContracts();
    // set up assets (including remote swap)
    utils_setupAsset(false, false);
    // // set stable swap
    // utils_setMockStableSwap();
    caller = new LibCaller();
  }

  // ============ utils ============

  function utils_setMockStableSwap() internal {
    IERC20[] memory _pooledTokens = new IERC20[](1);
    _pooledTokens[0] = IERC20(_adopted);
    uint256[] memory _tokenPrecisionMultipliers = new uint256[](1);
    _tokenPrecisionMultipliers[0] = 1;
    uint256[] memory  _balances = new uint256[](1);
    _balances[0] = 100;
    SwapUtils.Swap memory swap = SwapUtils.Swap({
        initialA : 0,
        futureA : 0,
        initialATime: 0,
        futureATime: 0,
        // fee calculations
        swapFee : 0,
        adminFee : 0,
        lpToken: LPToken(address(100)),
        // contract references for all tokens being pooled
        pooledTokens: _pooledTokens,
        // multipliers for each pooled token's precision to get to POOL_PRECISION_DECIMALS
        // for example, TBTC has 18 decimals, so the multiplier should be 1. WBTC
        // has 8, so the multiplier should be 10 ** 18 / 10 ** 8 => 10 ** 10
        tokenPrecisionMultipliers: _tokenPrecisionMultipliers,
        // the pool balance of each token, in the token's precision
        // the contract's actual token balance might differ
        balances: _balances
    });

    s.swapStorages[_canonicalId] = swap;
    s.tokenIndexes[_canonicalId][_adopted] = 0;
    
  }

  // Sets up env to swap from local -> adopted using external pools only
  function utils_swapFromLocalAndAssertViaExternal(address asset, uint256 amount, uint256 swapOut) internal {
    // set mock
    vm.mockCall(_stableSwap, abi.encodeWithSelector(IStableSwap.swapExact.selector), abi.encode(swapOut));

    bool willSwap = asset == _local && amount > 0;
    if (willSwap) {
      // expect pool approval
      vm.expectCall(_local, abi.encodeWithSelector(IERC20.approve.selector, _stableSwap, amount));
      // expect swap
      vm.expectCall(_stableSwap, abi.encodeWithSelector(IStableSwap.swapExact.selector, amount, _local, _adopted));
    }

    (uint256 received, address out) = AssetLogic.swapFromLocalAssetIfNeeded(asset, amount);
    // assert return amount
    assertEq(received, willSwap ? swapOut : amount);
    // assert return asset
    assertEq(out, _adopted);
  }

  // Sets up env to swap from local -> adopted using external pools only
  function utils_swapToLocalAndAssertViaExternal(address asset, uint256 amount, uint256 swapOut) internal {
    // set mock
    vm.mockCall(_stableSwap, abi.encodeWithSelector(IStableSwap.swapExact.selector), abi.encode(swapOut));

    bool willSwap = asset == _adopted && amount > 0;
    if (willSwap) {
      // expect pool approval
      vm.expectCall(_adopted, abi.encodeWithSelector(IERC20.approve.selector, _stableSwap, amount));
      // expect swap
      vm.expectCall(_stableSwap, abi.encodeWithSelector(IStableSwap.swapExact.selector, amount, _adopted, _local));
    }

    (uint256 received, address out) = AssetLogic.swapToLocalAssetIfNeeded(ConnextMessage.TokenId(_canonicalDomain, _canonicalId), asset, amount);
    // assert return amount
    assertEq(received, willSwap ? swapOut : amount);
    // assert return asset
    assertEq(out, _local);
  }

  // ============ stableSwapPoolExist ============
  function test_AssetLogic_stableSwapPoolExist_works() public {
    utils_setMockStableSwap();
    assertEq(AssetLogic.stableSwapPoolExist(_canonicalId), true);
    assertEq(AssetLogic.stableSwapPoolExist(bytes32(abi.encodePacked(address(5)))), false);
  }

  // ============ getTokenIndexFromStableSwapPool ============
  function test_AssetLogic_getTokenIndexFromStableSwapPool_failsIfNotFound() public {
    utils_setMockStableSwap();
    address arbitrary = address(555555555555);
    vm.expectRevert(AssetLogic.AssetLogic__getTokenIndexFromStableSwapPool_notExist.selector);
    AssetLogic.getTokenIndexFromStableSwapPool(_canonicalId, arbitrary);
  }

  function test_AssetLogic_getTokenIndexFromStableSwapPool_works() public {
    utils_setMockStableSwap();
    assertEq(AssetLogic.getTokenIndexFromStableSwapPool(_canonicalId, _adopted), 0);
  }

  // ============ handleIncomingAsset ============
  function test_AssetLogic_handleIncomingAsset_failsIfValueBadWhenNative() public {
    vm.expectRevert(AssetLogic.AssetLogic__handleIncomingAsset_notAmount.selector);
    AssetLogic.handleIncomingAsset(address(0), 10, 1);
  }

  function test_AssetLogic_handleIncomingAsset_failsIfValueBad() public {
    vm.expectRevert(AssetLogic.AssetLogic__handleIncomingAsset_ethWithErcTransfer.selector);
    caller.handleIncomingAsset{value: 10}(_local, 10, 1);
  }

  function test_AssetLogic_handleIncomingAsset_works() public {
  }

  function test_AssetLogic_handleIncomingAsset_worksWithNative() public {}

  function test_AssetLogic_handleIncomingAsset_worksWithNativeAndFee() public {}

  function test_AssetLogic_handleIncomingAsset_worksWithFeeOnTransfer() public {}

  // ============ wrapNativeAsset ============
  function test_AssetLogic_wrapNativeAsset_works() public {}

  // ============ transferAssetToContract ============
  function test_AssetLogic_transferAssetToContract_works() public {}

  function test_AssetLogic_transferAssetToContract_worksWithFeeOnTransfer() public {}

  // ============ transferAssetFromContract ============
  function test_AssetLogic_transferAssetFromContract_failsIfNoAsset() public {}

  function test_AssetLogic_transferAssetFromContract_works() public {}

  function test_AssetLogic_transferAssetFromContract_worksIfZero() public {}

  function test_AssetLogic_transferAssetFromContract_worksForNative() public {}

  // ============ swapToLocalAssetIfNeeded ============

  // should revert
  function testFail_AssetLogic_swapToLocalAssetIfNeeded_failsIfPaused() public {
    s._paused = PausedFunctions.Swap;
    // NOTE: this function should fail with the following error, but the `expectRevert` will not
    // work because it checks for `CALL` results not `JUMP` results. see:
    // https://book.getfoundry.sh/cheatcodes/expect-revert.html
    // vm.expectRevert(AssetLogic.AssetLogic__swapFromLocalAssetIfNeeded_swapPaused.selector);
    // AssetLogic.swapFromLocalAssetIfNeeded(_local, 10000);
    utils_swapToLocalAndAssertViaExternal(_adopted, 1 ether, 0.9 ether);
  }

  // doesnt swap
  function test_AssetLogic_swapToLocalAssetIfNeeded_worksIfZero() public {
    utils_swapToLocalAndAssertViaExternal(_adopted, 0, 10000);
  }

  // does not swap if already local
  function test_AssetLogic_swapToLocalAssetIfNeeded_worksWithLocal() public {
    utils_swapToLocalAndAssertViaExternal(_local, 1 ether, 0.9 ether);
  }

  // works
  function test_AssetLogic_swapToLocalAssetIfNeeded_worksWithAdopted() public {
    utils_swapToLocalAndAssertViaExternal(_adopted, 1 ether, 0.9 ether);
  }

  // ============ swapFromLocalAssetIfNeeded ============
  // should revert
  function testFail_AssetLogic_swapFromLocalAssetIfNeeded_revertIfSwappingPaused() public {
    s._paused = PausedFunctions.Swap;
    // NOTE: this function should fail with the following error, but the `expectRevert` will not
    // work because it checks for `CALL` results not `JUMP` results. see:
    // https://book.getfoundry.sh/cheatcodes/expect-revert.html
    // vm.expectRevert(AssetLogic.AssetLogic__swapFromLocalAssetIfNeeded_swapPaused.selector);
    // AssetLogic.swapFromLocalAssetIfNeeded(_local, 10000);
    utils_swapFromLocalAndAssertViaExternal(_local, 1 ether, 0.9 ether);
  }

  // doesnt swap
  function test_AssetLogic_swapFromLocalAssetIfNeeded_worksIfZero() public {
    utils_swapFromLocalAndAssertViaExternal(_local, 0, 0.1 ether);
  }

  // does not swap if already adopted
  function test_AssetLogic_swapFromLocalAssetIfNeeded_worksWithAdopted() public {
    utils_swapFromLocalAndAssertViaExternal(_adopted, 1 ether, 0.9 ether);
  }

  // should work (swap local for adopted)
  function test_AssetLogic_swapFromLocalAssetIfNeeded_worksWithLocal() public {
    utils_swapFromLocalAndAssertViaExternal(_local, 1 ether, 0.9 ether);
  }
}
