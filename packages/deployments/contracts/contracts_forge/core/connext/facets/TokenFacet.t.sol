// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {IStableSwap} from "../../../../contracts/core/connext/interfaces/IStableSwap.sol";
import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {TokenFacet} from "../../../../contracts/core/connext/facets/TokenFacet.sol";
import {TestERC20} from "../../../../contracts/test/TestERC20.sol";
import {TokenId} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";

import "../../../utils/FacetHelper.sol";

contract TokenFacetTest is TokenFacet, FacetHelper {
  // ============ storage ============
  // owner
  address _owner = address(12345);

  // sample data
  uint32 _domain = _originDomain;

  // ============ Test set up ============
  function setUp() public {
    setOwner(_owner);
    utils_deployAssetContracts();
    utils_setFees();
  }

  // ============ Utils ==============
  // Set diamond storage owner
  function setOwner(address owner) internal {
    // set owner
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    ds.contractOwner = owner;
  }

  // Calls setupAsset and asserts state changes/events
  function setupAssetAndAssert(address asset, address pool) public {
    TokenId memory canonical = TokenId(_domain, _canonicalId);

    s.representationToCanonical[_local].domain = _canonicalDomain;
    s.representationToCanonical[_local].id = _canonicalId;
    s.canonicalToRepresentation[_canonicalKey] = _local;

    vm.expectEmit(true, true, false, true);
    emit AssetAdded(_canonicalKey, _canonicalId, _domain, asset, _local, _owner);

    vm.expectEmit(true, true, false, true);
    emit StableSwapAdded(_canonicalKey, _canonicalId, _domain, pool, _owner);

    // this.setupAsset(canonical, asset, pool);
    assertTrue(s.approvedAssets[_canonicalKey]);
    assertEq(s.adoptedToCanonical[asset].domain, _domain);
    assertEq(s.adoptedToCanonical[asset].id, _canonicalId);
    assertEq(s.canonicalToAdopted[_canonicalKey], asset);
    assertEq(address(s.adoptedToLocalExternalPools[_canonicalKey]), pool);
  }

  // Calls removeAsset and asserts state changes/events
  function removeAssetAndAssert(address adopted) public {
    vm.expectEmit(true, true, false, true);
    emit AssetRemoved(_canonicalKey, _owner);

    // this.removeAssetId(_canonicalKey, adopted);
    assertEq(s.approvedAssets[_canonicalKey], false);
    assertEq(s.adoptedToCanonical[adopted].domain, 0);
    assertEq(s.adoptedToCanonical[adopted].id, bytes32(0));
    assertEq(s.canonicalToAdopted[_canonicalKey], address(0));
    assertEq(address(s.adoptedToLocalExternalPools[_canonicalKey]), address(0));
  }

  // ============ Getters ============
  // canonicalToAdopted
  function test_TokenFacet__canonicalToAdopted_success() public {
    s.canonicalToAdopted[_canonicalId] = _local;
    assertTrue(this.canonicalToAdopted(_canonicalId) == _local);
  }

  // if the canonicalToAdopted lookup fails using the helper, we revert: adopted asset not whitelisted
  function test_TokenFacet__canonicalToAdopted_notFound() public {
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__getAdoptedAsset_notWhitelisted.selector);
    this.canonicalToAdopted(_canonicalId);
  }

  // adoptedToCanonical
  function test_TokenFacet__adoptedToCanonical_success() public {
    s.adoptedToCanonical[_local].domain = _domain;
    s.adoptedToCanonical[_local].id = _canonicalId;
    TokenId memory canonical = this.adoptedToCanonical(_local);
    assertEq(canonical.domain, _domain);
    assertEq(canonical.id, _canonicalId);
  }

  function test_TokenFacet__adoptedToCanonical_notFound() public {
    TokenId memory canonical = this.adoptedToCanonical(_local);
    assertTrue(canonical.domain == 0);
    assertTrue(canonical.id == bytes32(0));
  }

  // approvedAssets
  function test_TokenFacet__approvedAssets_success() public {
    s.approvedAssets[_canonicalId] = true;
    assertTrue(this.approvedAssets(_canonicalId));
  }

  function test_TokenFacet__approvedAssets_notFound() public {
    assertTrue(this.approvedAssets(_canonicalId) == false);
  }

  // adoptedToLocalExternalPools
  function test_TokenFacet__adoptedToLocalExternalPools_success() public {
    address stableSwap = address(42);
    s.adoptedToLocalExternalPools[_canonicalId] = IStableSwap(stableSwap);
    assertEq(address(this.adoptedToLocalExternalPools(_canonicalId)), stableSwap);
  }

  function test_TokenFacet__adoptedToLocalExternalPools_notFound() public {
    assertEq(address(this.adoptedToLocalExternalPools(_canonicalId)), address(0));
  }

  // ============ Admin functions ============

  // TODO: test_adminFunctions__onlyOwner ??

  // // setupAsset
  // function test_TokenFacet__setupAsset_successErc20Token() public {
  //   address asset = address(new TestERC20("Test Token", "TEST"));
  //   address stableSwap = address(5678);

  //   vm.prank(_owner);
  //   setupAssetAndAssert(asset, stableSwap);
  // }

  // function test_TokenFacet__setupAsset_failNativeAsset() public {
  //   address asset = address(0);
  //   address stableSwap = address(0);

  //   vm.prank(_owner);
  //   vm.expectRevert(TokenFacet.TokenFacet__addAssetId_nativeAsset.selector);
  //   this.setupAsset(TokenId(_domain, _canonicalId), asset, stableSwap);
  // }

  // function test_TokenFacet__setupAsset_failIfRedundant() public {
  //   TokenId memory canonical = TokenId(_domain, _canonicalId);
  //   address asset = address(new TestERC20("Test Token", "TEST"));
  //   s.approvedAssets[_canonicalKey] = true;

  //   vm.prank(_owner);
  //   vm.expectRevert(TokenFacet.TokenFacet__addAssetId_alreadyAdded.selector);
  //   this.setupAsset(canonical, asset, address(0));
  // }

  // addStableSwapPool
  function test_TokenFacet__addStableSwapPool_success() public {
    address stableSwap = address(65);

    vm.expectEmit(true, true, false, true);
    emit StableSwapAdded(_canonicalKey, _canonicalId, _domain, stableSwap, _owner);

    TokenId memory canonical = TokenId(_domain, _canonicalId);

    vm.prank(_owner);
    this.addStableSwapPool(canonical, stableSwap);
    assertEq(address(s.adoptedToLocalExternalPools[_canonicalKey]), stableSwap);
  }

  function test_TokenFacet__addStableSwapPool_canDelete() public {
    address og = address(65);
    s.adoptedToLocalExternalPools[_canonicalId] = IStableSwap(og);
    address empty = address(0);

    vm.expectEmit(true, true, false, true);
    emit StableSwapAdded(_canonicalKey, _canonicalId, _domain, empty, _owner);

    TokenId memory canonical = TokenId(_domain, _canonicalId);

    vm.prank(_owner);
    this.addStableSwapPool(canonical, empty);
    assertEq(address(s.adoptedToLocalExternalPools[_canonicalKey]), empty);
  }

  // // removeAssetId
  // function test_TokenFacet__removeAssetId_successErc20Token() public {
  //   vm.prank(_owner);
  //   setupAssetAndAssert(_local, address(12));

  //   vm.prank(_owner);
  //   removeAssetAndAssert(_local);
  // }

  // function test_TokenFacet__removeAssetId_failIfNotAlreadyApproved() public {
  //   vm.expectRevert(TokenFacet.TokenFacet__removeAssetId_notAdded.selector);

  //   vm.prank(_owner);
  //   this.removeAssetId(_canonicalId, _local);
  // }

  // updateLiquidityCap
  function test_TokenFacet__updateLiquidityCap_failsIfNotCanonicalDomain() public {
    s.domain = 123123;
    vm.prank(_owner);
    vm.expectRevert(TokenFacet.TokenFacet__setLiquidityCap_notCanonicalDomain.selector);
    this.updateLiquidityCap(TokenId(_canonicalDomain, _canonicalId), 0);
  }

  function test_TokenFacet__updateLiquidityCap_worksIfZero() public {
    s.domain = _canonicalDomain;
    bytes32 key = utils_calculateCanonicalHash();
    uint256 updated;
    // If balance is 0, do nothing
    vm.expectEmit(true, true, true, true);
    emit LiquidityCapUpdated(key, _canonicalId, _canonicalDomain, updated, _owner);

    vm.prank(_owner);
    this.updateLiquidityCap(TokenId(_canonicalDomain, _canonicalId), updated);

    // assertEq
    assertEq(s.custodied[_canonical], 0);
    assertEq(s.caps[key], updated);
  }

  function test_TokenFacet__updateLiquidityCap_works() public {
    s.domain = _canonicalDomain;
    bytes32 key = utils_calculateCanonicalHash();
    uint256 updated = 1 ether;
    uint256 balance = 2 ether;

    // If balance is nonzero, setup balance mock
    vm.mockCall(_canonical, abi.encodeWithSelector(TestERC20.balanceOf.selector, address(this)), abi.encode(balance));

    // Event emitted
    vm.expectEmit(true, true, true, true);
    emit LiquidityCapUpdated(key, _canonicalId, _canonicalDomain, updated, _owner);

    vm.prank(_owner);
    this.updateLiquidityCap(TokenId(_canonicalDomain, _canonicalId), updated);

    // assertEq
    assertEq(s.custodied[_canonical], balance);
    assertEq(s.caps[key], updated);
  }
}
