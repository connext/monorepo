// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "../facets/FacetHelper.sol";
import "../../../../contracts/core/connext/libraries/AssetLogic.sol";
import "../../../../contracts/core/connext/libraries/SwapUtils.sol";
import {IWrapped} from "../../../../contracts/core/connext/interfaces/IWrapped.sol";
import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {ConnextMessage} from "../../../../contracts/core/connext/libraries/ConnextMessage.sol";
import {LibConnextStorage, AppStorage, PausedFunctions} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";
import {ITokenRegistry} from "../../../../contracts/core/connext/interfaces/ITokenRegistry.sol";

import "../../../../lib/forge-std/src/console.sol";

contract AssetLogicTest is BaseConnextFacet, FacetHelper {
  // ============ Storage ============
  uint32 domain = 1;
  address canonical = address(2);
  address asset = address(3);
  address adopted = address(4);
  address tokenAddr1 = address(11);
  bytes32 canonicalTokenId = bytes32(abi.encodePacked(canonical));
  uint32 canonicalDomain = domain;

  // ============ Setup ============

  function setUp() public {
    // set defaults
    setDefaults();

    // set stable swap
    setMockStableSwap();
  }

  function setMockStableSwap() internal {
    IERC20[] memory _pooledTokens = new IERC20[](1);
    _pooledTokens[0] = IERC20(tokenAddr1);
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

    s.swapStorages[canonicalTokenId] = swap;
    s.tokenIndexes[canonicalTokenId][tokenAddr1] = 0;
    
  }

  // ============ stableSwapPoolExist ============

  function test_AssetLogic_stableSwapPoolExist_works() public {
      assertEq(AssetLogic.stableSwapPoolExist(canonicalTokenId), true);
      assertEq(AssetLogic.stableSwapPoolExist(bytes32(abi.encodePacked(address(5)))), false);
  }

  // ============ getTokenIndexFromStableSwapPool ============

  function test_AssetLogic_getTokenIndexFromStableSwapPool_failsIfNotFound() public {
      address arbitrary = address(555555555555);
      vm.expectRevert(AssetLogic.AssetLogic__getTokenIndexFromStableSwapPool_notExist.selector);
      AssetLogic.getTokenIndexFromStableSwapPool(canonicalTokenId, arbitrary);
  }

  function test_AssetLogic_getTokenIndexFromStableSwapPool_works() public {
      assertEq(AssetLogic.getTokenIndexFromStableSwapPool(canonicalTokenId, tokenAddr1), 0);
  }

  // ============ handleIncomingAsset ============

  function test_AssetLogic_handleIncomingAsset_failsIfValueBadWhenNative() public {
      vm.expectRevert(AssetLogic.AssetLogic__handleIncomingAsset_notAmount.selector);
      AssetLogic.handleIncomingAsset(address(0), 10, 1);
  }

  function test_AssetLogic_handleIncomingAsset_failsIfValueBad() public {
      // TODO. need to determine how to setup a mock for msg.value for library.
  }

  function test_AssetLogic_handleIncomingAsset_works() public {}

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

  function test_AssetLogic_swapToLocalAssetIfNeeded_failsIfPaused() public {}

  function test_AssetLogic_swapToLocalAssetIfNeeded_worksIfZero() public {}

  // does not swap if already local
  function test_AssetLogic_swapToLocalAssetIfNeeded_worksIfLocal() public {}

  // works
  function test_AssetLogic_swapToLocalAssetIfNeeded_works() public {}

  // ============ swapFromLocalAssetIfNeeded ============

  // should revert
  function testFail_AssetLogic_swapFromLocalAssetIfNeeded_revertIfSwappingPaused() public {
    s.canonicalToAdopted[canonicalTokenId] = adopted;
    s._paused = PausedFunctions.Swap;

    vm.mockCall(
      _tokenRegistry,
      abi.encodeWithSelector(ITokenRegistry.getTokenId.selector),
      abi.encode(canonicalDomain, canonicalTokenId)
    );

    // NOTE: this function should fail with the following error, but the `expectRevert` will not
    // work because it checks for `CALL` results not `JUMP` results. see:
    // https://book.getfoundry.sh/cheatcodes/expect-revert.html
    // vm.expectRevert(AssetLogic.AssetLogic__swapFromLocalAssetIfNeeded_swapPaused.selector);

    AssetLogic.swapFromLocalAssetIfNeeded(asset, 10000);
  }

  function test_AssetLogic_swapFromLocalAssetIfNeeded_worksIfZero() public {}

  // does not swap if already adopted
  function test_AssetLogic_swapFromLocalAssetIfNeeded_worksIfAdopted() public {}

  // should work
  function test_AssetLogic_swapFromLocalAssetIfNeeded_works() public {
    vm.mockCall(
      _tokenRegistry,
      abi.encodeWithSelector(ITokenRegistry.getTokenId.selector),
      abi.encode(canonicalDomain, canonicalTokenId)
    );
    s.canonicalToAdopted[canonicalTokenId] = asset;
    (uint256 _amount, address _asset) = AssetLogic.swapFromLocalAssetIfNeeded(asset, 10000);
    assertEq(_amount, 10000);
    assertEq(_asset, asset);
  }
}
