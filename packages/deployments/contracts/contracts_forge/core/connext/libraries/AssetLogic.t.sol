// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "../facets/FacetHelper.sol";
import "../../../../contracts/core/connext/libraries/AssetLogic.sol";
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
  bytes32 canonicalTokenId = bytes32(abi.encodePacked(canonical));
  uint32 canonicalDomain = domain;

  // ============ Setup ============

  function setUp() public {
    // set defaults
    setDefaults();
  }

  // ============ stableSwapPoolExist ============

  function test_AssetLogic_stableSwapPoolExist_works() public {}

  // ============ getTokenIndexFromStableSwapPool ============

  function test_AssetLogic_getTokenIndexFromStableSwapPool_failsIfNotFound() public {}

  function test_AssetLogic_getTokenIndexFromStableSwapPool_works() public {}

  // ============ handleIncomingAsset ============

  function test_AssetLogic_handleIncomingAsset_failsIfValueBadWhenNative() public {}

  function test_AssetLogic_handleIncomingAsset_failsIfValueBad() public {}

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
