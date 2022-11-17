// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IERC20Metadata} from "@openzeppelin/contracts/interfaces/IERC20Metadata.sol";

import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {TokenFacet} from "../../../../contracts/core/connext/facets/TokenFacet.sol";
import {TestERC20} from "../../../../contracts/test/TestERC20.sol";
import {TokenId} from "../../../../contracts/core/connext/libraries/TokenId.sol";
import {TokenConfig} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";

import "../../../utils/FacetHelper.sol";

contract TokenFacetTest is TokenFacet, FacetHelper {
  // ============ storage ============
  // owner
  address _owner = address(12345);

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
    TokenId memory canonical = TokenId(_canonicalDomain, _canonicalId);

    vm.expectEmit(true, true, false, true);
    emit AssetAdded(_canonicalKey, _canonicalId, _canonicalDomain, asset, _local, _owner);

    vm.expectEmit(true, true, false, true);
    emit StableSwapAdded(_canonicalKey, _canonicalId, _canonicalDomain, pool, _owner);

    this.setupAsset(canonical, _canonicalDecimals, tokenName, tokenSymbol, asset, pool, _cap);
    TokenConfig memory config = s.tokenConfigs[_canonicalKey];
    assertTrue(config.approval);
    assertEq(s.adoptedToCanonical[asset].domain, _canonicalDomain);
    assertEq(s.adoptedToCanonical[asset].id, _canonicalId);
    assertEq(config.adopted, asset);
    assertEq(config.representationDecimals, 18);
    assertEq(config.adoptedDecimals, 18);
    assertEq(config.adoptedToLocalExternalPools, pool);
  }

  // Calls removeAsset and asserts state changes/events
  function removeAssetAndAssert(
    bytes32 key,
    address adopted,
    address representation
  ) public {
    vm.expectEmit(true, true, false, true);
    emit AssetRemoved(key, _owner);

    this.removeAssetId(key, adopted, representation);
    TokenConfig memory config = s.tokenConfigs[_canonicalKey];
    assertEq(config.approval, false);
    assertEq(s.adoptedToCanonical[adopted].domain, 0);
    assertEq(s.adoptedToCanonical[adopted].id, bytes32(0));
    assertEq(config.adopted, address(0));
    assertEq(config.representationDecimals, 0);
    assertEq(config.adoptedDecimals, 0);

    assertEq(config.adoptedToLocalExternalPools, address(0));
  }

  // ============ Getters ============
  // canonicalToAdopted
  function test_TokenFacet__canonicalToAdopted_success() public {
    s.tokenConfigs[_canonicalKey].adoptedDecimals = 18;
    s.tokenConfigs[_canonicalKey].adopted = _local;
    assertTrue(this.canonicalToAdopted(_canonicalKey) == _local);
  }

  // if the canonicalToAdopted lookup fails using the helper, we revert: adopted asset not whitelisted
  function test_TokenFacet__canonicalToAdopted_notFound() public {
    s.tokenConfigs[_canonicalKey].adoptedDecimals = 18;
    s.tokenConfigs[_canonicalKey].adopted = address(0);
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__getAdoptedAsset_assetNotFound.selector);
    this.canonicalToAdopted(_canonicalKey);
  }

  // adoptedToCanonical
  function test_TokenFacet__adoptedToCanonical_success() public {
    s.adoptedToCanonical[_local].domain = _canonicalDomain;
    s.adoptedToCanonical[_local].id = _canonicalId;
    TokenId memory canonical = this.adoptedToCanonical(_local);
    assertEq(canonical.domain, _canonicalDomain);
    assertEq(canonical.id, _canonicalId);
  }

  function test_TokenFacet__adoptedToCanonical_notFound() public {
    TokenId memory canonical = this.adoptedToCanonical(_local);
    assertTrue(canonical.domain == 0);
    assertTrue(canonical.id == bytes32(0));
  }

  // approvedAssets
  function test_TokenFacet__approvedAssets_success() public {
    s.tokenConfigs[_canonicalId].approval = true;
    assertTrue(this.approvedAssets(_canonicalId));
  }

  function test_TokenFacet__approvedAssets_notFound() public {
    assertTrue(this.approvedAssets(_canonicalId) == false);
  }

  // adoptedToLocalExternalPools
  function test_TokenFacet__adoptedToLocalExternalPools_success() public {
    address stableSwap = address(42);
    s.tokenConfigs[_canonicalId].adoptedToLocalExternalPools = stableSwap;
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
  //   this.setupAsset(TokenId(_canonicalDomain, _canonicalId), asset, stableSwap);
  // }

  function test_TokenFacet__setupAssetWithDeployedRepresentation_failOnCanonicalDomain() public {
    address asset = address(999999);
    address stableSwap = address(0);
    address adoptedAssetId = address(1234);

    vm.prank(_owner);
    vm.expectRevert(TokenFacet.TokenFacet__setupAssetWithDeployedRepresentation_onCanonicalDomain.selector);
    this.setupAssetWithDeployedRepresentation(
      // Passing in the current domain as the canonical domain for the asset should result in a revert.
      TokenId(s.domain, _canonicalId),
      asset,
      adoptedAssetId,
      stableSwap,
      100000 ether
    );
  }

  function test_TokenFacet__setupAssetWithDeployedRepresentation_failWithEmptyRepresentation() public {
    address asset = address(0);
    address stableSwap = address(0);
    address adoptedAssetId = address(1234);

    vm.prank(_owner);
    vm.expectRevert(TokenFacet.TokenFacet__setupAssetWithDeployedRepresentation_invalidRepresentation.selector);
    this.setupAssetWithDeployedRepresentation(
      // Passing in the current domain as the canonical domain for the asset should result in a revert.
      TokenId(s.domain, _canonicalId),
      asset,
      adoptedAssetId,
      stableSwap,
      100000 ether
    );
  }

  function test_TokenFacet__setupAssetWithDeployedRepresentation_works() public {
    address asset = address(1234);
    address stableSwap = address(0);
    address adoptedAssetId = address(0);
    _cap = 0;

    // Get key
    bytes32 _canonicalKey = utils_calculateCanonicalHash();

    // Mock call to .decimals()
    vm.mockCall(asset, abi.encodeWithSelector(IERC20Metadata.decimals.selector), abi.encode(18));

    // Setup event calls
    if (stableSwap != address(0)) {
      vm.expectEmit(true, true, true, true);
      emit StableSwapAdded(_canonicalKey, _canonicalId, _canonicalDomain, stableSwap, _owner);
    }

    vm.expectEmit(true, true, true, true);
    emit AssetAdded(
      _canonicalKey,
      _canonicalId,
      _canonicalDomain,
      adoptedAssetId == address(0) ? asset : adoptedAssetId,
      asset,
      _owner
    );

    if (_cap > 0) {
      vm.expectEmit(true, true, true, true);
      emit LiquidityCapUpdated(_canonicalKey, _canonicalId, _canonicalDomain, _cap, _owner);
    }

    vm.prank(_owner);
    this.setupAssetWithDeployedRepresentation(
      TokenId(_canonicalDomain, _canonicalId),
      asset,
      adoptedAssetId,
      stableSwap,
      _cap
    );

    // verification
    TokenConfig memory config = s.tokenConfigs[_canonicalKey];
    assertTrue(config.approval);
    assertEq(config.adoptedDecimals, 18);
    assertEq(s.adoptedToCanonical[asset].domain, _canonicalDomain);
    assertEq(s.adoptedToCanonical[asset].id, _canonicalId);
    assertEq(config.adopted, asset);
    assertEq(config.adoptedToLocalExternalPools, stableSwap);
    if (s.domain != _canonicalDomain) {
      assertEq(config.representationDecimals, 18);
      assertEq(s.representationToCanonical[asset].domain, _canonicalDomain);
      assertEq(s.representationToCanonical[asset].id, _canonicalId);
      assertEq(config.representation, asset);
    }
  }

  // function test_TokenFacet__setupAsset_failIfRedundant() public {
  //   TokenId memory canonical = TokenId(_canonicalDomain, _canonicalId);
  //   address asset = address(new TestERC20("Test Token", "TEST"));
  //   s.tokenConfigs[_canonicalKey].approval = true;

  //   vm.prank(_owner);
  //   vm.expectRevert(TokenFacet.TokenFacet__addAssetId_alreadyAdded.selector);
  //   this.setupAsset(canonical, asset, address(0));
  // }

  // ============ addStableSwapPool ============
  function test_TokenFacet__addStableSwapPool_success() public {
    address stableSwap = address(65);

    vm.expectEmit(true, true, false, true);
    emit StableSwapAdded(_canonicalKey, _canonicalId, _canonicalDomain, stableSwap, _owner);

    TokenId memory canonical = TokenId(_canonicalDomain, _canonicalId);

    vm.prank(_owner);
    this.addStableSwapPool(canonical, stableSwap);
    assertEq(s.tokenConfigs[_canonicalKey].adoptedToLocalExternalPools, stableSwap);
  }

  function test_TokenFacet__addStableSwapPool_canDelete() public {
    address og = address(65);
    s.tokenConfigs[_canonicalId].adoptedToLocalExternalPools = og;
    address empty = address(0);

    vm.expectEmit(true, true, false, true);
    emit StableSwapAdded(_canonicalKey, _canonicalId, _canonicalDomain, empty, _owner);

    TokenId memory canonical = TokenId(_canonicalDomain, _canonicalId);

    vm.prank(_owner);
    this.addStableSwapPool(canonical, empty);
    assertEq(s.tokenConfigs[_canonicalKey].adoptedToLocalExternalPools, empty);
  }

  // ============ removeAssetId ============
  // function test_TokenFacet__removeAssetId_successErc20Token() public {
  //   vm.prank(_owner);
  //   setupAssetAndAssert(_local, address(12));

  //   removeAssetAndAssert(_canonicalKey, _local, _local);
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
    assertEq(s.tokenConfigs[key].custodied, 0);
    assertEq(s.tokenConfigs[key].cap, updated);
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
    assertEq(s.tokenConfigs[key].custodied, balance);
    assertEq(s.tokenConfigs[key].cap, updated);
  }
}
