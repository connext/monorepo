// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {IStableSwap} from "../../../../contracts/core/connext/interfaces/IStableSwap.sol";
import {ITokenRegistry} from "../../../../contracts/core/connext/interfaces/ITokenRegistry.sol";
import {IWrapped} from "../../../../contracts/core/connext/interfaces/IWrapped.sol";
import {ConnextMessage} from "../../../../contracts/core/connext/libraries/ConnextMessage.sol";
import {AssetFacet} from "../../../../contracts/core/connext/facets/AssetFacet.sol";
import {TestERC20} from "../../../../contracts/test/TestERC20.sol";

import {MockWrapper, MockTokenRegistry} from "../../../utils/Mock.sol";

// import "../../lib/forge-std/src/console.sol";
import "./FacetHelper.sol";

contract AssetFacetTest is AssetFacet, FacetHelper {
  // ============ storage ============
  // owner
  address _owner = address(12345);

  // sample data
  uint32 _domain = 1000;

  address _local = address(7);
  bytes32 _localTokenId = bytes32(abi.encodePacked(_local));

  address _canonical = address(5);
  bytes32 _canonicalTokenId = bytes32(abi.encodePacked(_canonical));

  // ============ Test set up ============
  function setUp() public {
    setOwner(_owner);
  }

  // ============ Utils ==============
  // Set diamond storage owner
  function setOwner(address owner) internal {
    // set owner
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    ds.contractOwner = owner;
  }

  // Calls setupAsset and asserts state changes/events
  function setupAssetAndAssert(
    address asset,
    address pool,
    address wrapper
  ) public {
    address key = asset == address(0) ? wrapper : asset;
    ConnextMessage.TokenId memory canonical = ConnextMessage.TokenId(_domain, _canonicalTokenId);

    vm.expectEmit(true, true, false, true);
    emit AssetAdded(_canonicalTokenId, _domain, asset, key, _owner);

    vm.expectEmit(true, true, false, true);
    emit StableSwapAdded(_canonicalTokenId, _domain, pool, _owner);

    this.setupAsset(canonical, asset, pool);
    assertTrue(s.approvedAssets[_canonicalTokenId]);
    assertEq(s.adoptedToCanonical[key].domain, _domain);
    assertEq(s.adoptedToCanonical[key].id, _canonicalTokenId);
    assertEq(s.canonicalToAdopted[_canonicalTokenId], key);
    assertEq(address(s.adoptedToLocalPools[_canonicalTokenId]), pool);
  }

  // Calls removeAsset and asserts state changes/events
  function removeAssetAndAssert(address adopted, address wrapper) public {
    address key = adopted == address(0) ? wrapper : adopted;

    vm.expectEmit(true, true, false, true);
    emit AssetRemoved(_canonicalTokenId, _owner);

    this.removeAssetId(_canonicalTokenId, adopted);
    assertEq(s.approvedAssets[_canonicalTokenId], false);
    assertEq(s.adoptedToCanonical[key].domain, 0);
    assertEq(s.adoptedToCanonical[key].id, bytes32(0));
    assertEq(s.canonicalToAdopted[_canonicalTokenId], address(0));
    assertEq(address(s.adoptedToLocalPools[_canonicalTokenId]), address(0));
  }

  // ============ Getters ============
  // canonicalToAdopted
  function test_AssetFacet__canonicalToAdopted_success() public {
    s.canonicalToAdopted[_canonicalTokenId] = _local;
    assertTrue(this.canonicalToAdopted(_canonicalTokenId) == _local);
  }

  function test_AssetFacet__canonicalToAdopted_notFound() public {
    assertTrue(this.canonicalToAdopted(_canonicalTokenId) == address(0));
  }

  // adoptedToCanonical
  function test_AssetFacet__adoptedToCanonical_success() public {
    s.adoptedToCanonical[_local].domain = _domain;
    s.adoptedToCanonical[_local].id = _canonicalTokenId;
    ConnextMessage.TokenId memory canonical = this.adoptedToCanonical(_local);
    assertEq(canonical.domain, _domain);
    assertEq(canonical.id, _canonicalTokenId);
  }

  function test_AssetFacet__adoptedToCanonical_notFound() public {
    ConnextMessage.TokenId memory canonical = this.adoptedToCanonical(_local);
    assertTrue(canonical.domain == 0);
    assertTrue(canonical.id == bytes32(0));
  }

  // approvedAssets
  function test_AssetFacet__approvedAssets_success() public {
    s.approvedAssets[_canonicalTokenId] = true;
    assertTrue(this.approvedAssets(_canonicalTokenId));
  }

  function test_AssetFacet__approvedAssets_notFound() public {
    assertTrue(this.approvedAssets(_canonicalTokenId) == false);
  }

  // adoptedToLocalPools
  function test_AssetFacet__adoptedToLocalPools_success() public {
    address stableSwap = address(42);
    s.adoptedToLocalPools[_localTokenId] = IStableSwap(stableSwap);
    assertEq(address(this.adoptedToLocalPools(_localTokenId)), stableSwap);
  }

  function test_AssetFacet__adoptedToLocalPools_notFound() public {
    assertEq(address(this.adoptedToLocalPools(_localTokenId)), address(0));
  }

  // wrapper
  function test_AssetFacet__wrapper_success() public {
    address wrapper = address(42);
    s.wrapper = IWrapped(wrapper);
    assertEq(address(this.wrapper()), wrapper);
  }

  function test_AssetFacet__wrapper_notSet() public {
    assertEq(address(this.wrapper()), address(0));
  }

  // tokenRegistry
  function test_AssetFacet__tokenRegistry_success(address tokenRegistry) public {
    s.tokenRegistry = ITokenRegistry(tokenRegistry);
    assertEq(address(this.tokenRegistry()), tokenRegistry);
  }

  function test_AssetFacet__tokenRegistry_notSet() public {
    assertEq(address(this.tokenRegistry()), address(0));
  }

  // ============ Admin functions ============

  // TODO: test_adminFunctions__onlyOwner ??

  // test_setWrapper__shouldUpdateWrapper
  function test_AssetFacet__setWrapper_success() public {
    address old = address(new MockWrapper());
    s.wrapper = IWrapped(old);
    address wrapper = address(new MockWrapper());

    vm.expectEmit(true, true, false, true);
    emit WrapperUpdated(old, wrapper, _owner);

    vm.prank(_owner);
    this.setWrapper(wrapper);
    assertEq(address(s.wrapper), wrapper);
  }

  function test_AssetFacet__setWrapper_failIfRedundant() public {
    address old = address(new MockWrapper());
    s.wrapper = IWrapped(old);

    vm.prank(_owner);
    vm.expectRevert(AssetFacet.AssetFacet__setWrapper_invalidWrapper.selector);
    this.setWrapper(old);
  }

  function test_AssetFacet__setWrapper_failIfNotContract() public {
    address wrapper = address(42);

    vm.prank(_owner);
    vm.expectRevert(AssetFacet.AssetFacet__setWrapper_invalidWrapper.selector);
    this.setWrapper(wrapper);
  }

  // setTokenRegistry
  function test_AssetFacet__setTokenRegistry_success() public {
    address old = address(new MockTokenRegistry());
    s.tokenRegistry = ITokenRegistry(old);
    address tokenRegistry = address(new MockTokenRegistry());

    vm.expectEmit(true, true, false, true);
    emit TokenRegistryUpdated(old, tokenRegistry, _owner);

    vm.prank(_owner);
    this.setTokenRegistry(tokenRegistry);
    assertTrue(address(s.tokenRegistry) == tokenRegistry);
  }

  function test_AssetFacet__setTokenRegistry_failIfRedundant() public {
    address old = address(new MockTokenRegistry());
    s.tokenRegistry = ITokenRegistry(old);

    vm.prank(_owner);
    vm.expectRevert(AssetFacet.AssetFacet__setTokenRegistry_invalidTokenRegistry.selector);
    this.setTokenRegistry(old);
  }

  function test_AssetFacet__setTokenRegistry_failIfNotContract() public {
    address tokenRegistry = address(42);

    vm.prank(_owner);
    vm.expectRevert(AssetFacet.AssetFacet__setTokenRegistry_invalidTokenRegistry.selector);
    this.setTokenRegistry(tokenRegistry);
  }

  // setupAsset
  function test_AssetFacet__setupAsset_successErc20Token() public {
    address asset = address(new TestERC20());
    address stableSwap = address(5678);

    vm.prank(_owner);
    setupAssetAndAssert(asset, stableSwap, address(0));
  }

  function test_AssetFacet__setupAsset_successNativeAsset() public {
    address asset = address(0);
    address stableSwap = address(0);

    address wrapper = address(new MockWrapper());
    s.wrapper = IWrapped(wrapper);
    vm.prank(_owner);
    setupAssetAndAssert(asset, stableSwap, wrapper);
  }

  function test_AssetFacet__setupAsset_failIfRedundant() public {
    ConnextMessage.TokenId memory canonical = ConnextMessage.TokenId(_domain, _canonicalTokenId);
    address asset = address(new TestERC20());
    s.approvedAssets[_canonicalTokenId] = true;

    vm.prank(_owner);
    vm.expectRevert(AssetFacet.AssetFacet__addAssetId_alreadyAdded.selector);
    this.setupAsset(canonical, asset, address(0));
  }

  // addStableSwapPool
  function test_AssetFacet__addStableSwapPool_success() public {
    address stableSwap = address(65);

    vm.expectEmit(true, true, false, true);
    emit StableSwapAdded(_canonicalTokenId, _domain, stableSwap, _owner);

    ConnextMessage.TokenId memory canonical = ConnextMessage.TokenId(_domain, _canonicalTokenId);

    vm.prank(_owner);
    this.addStableSwapPool(canonical, stableSwap);
    assertEq(address(s.adoptedToLocalPools[_canonicalTokenId]), stableSwap);
  }

  function test_AssetFacet__addStableSwapPool_canDelete() public {
    address og = address(65);
    s.adoptedToLocalPools[_canonicalTokenId] = IStableSwap(og);
    address empty = address(0);

    vm.expectEmit(true, true, false, true);
    emit StableSwapAdded(_canonicalTokenId, _domain, empty, _owner);

    ConnextMessage.TokenId memory canonical = ConnextMessage.TokenId(_domain, _canonicalTokenId);

    vm.prank(_owner);
    this.addStableSwapPool(canonical, empty);
    assertEq(address(s.adoptedToLocalPools[_canonicalTokenId]), empty);
  }

  // removeAssetId
  function test_AssetFacet__removeAssetId_successErc20Token() public {
    vm.prank(_owner);
    setupAssetAndAssert(_local, address(12), address(12));

    vm.prank(_owner);
    removeAssetAndAssert(_local, address(12));
  }

  function test_AssetFacet__removeAssetId_successNativeAsset() public {
    address local = address(0);
    address wrapper = address(new MockWrapper());
    s.wrapper = IWrapped(wrapper);

    vm.prank(_owner);
    setupAssetAndAssert(local, address(0), wrapper);

    vm.prank(_owner);
    removeAssetAndAssert(local, wrapper);
  }

  function test_AssetFacet__removeAssetId_failIfNotAlreadyApproved() public {
    vm.expectRevert(AssetFacet.AssetFacet__removeAssetId_notAdded.selector);

    vm.prank(_owner);
    this.removeAssetId(_canonicalTokenId, _local);
  }
}
