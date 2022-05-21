// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

// import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
// import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {LibDiamond} from "../../contracts/libraries/LibDiamond.sol";
import {IStableSwap} from "../../contracts/interfaces/IStableSwap.sol";
import {ITokenRegistry} from "../../contracts/nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import {IWrapped} from "../../contracts/interfaces/IWrapped.sol";
import {ConnextMessage} from "../../contracts/libraries/ConnextMessage.sol";
import {AssetFacet} from "../../contracts/facets/AssetFacet.sol";
import {TestERC20} from "../../contracts/test/TestERC20.sol";

import {MockWrapper, MockTokenRegistry} from "../Mock.sol";

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
  bytes32 _canonicalId = bytes32("canonical");

  // ============ Test set up ============
  function setUp() public {
    setOwner(_owner);
    // deploy any needed contracts
    // deployContracts();
    // set defaults
    // setDefaults();
    // vm.mockCall(
    //   _tokenRegistry,
    //   abi.encodeWithSelector(ITokenRegistry.getTokenId.selector),
    //   abi.encode(_canonicalDomain, _canonicalTokenId)
    // );
    // // setup asset context (use local == adopted)
    // s.adoptedToCanonical[_local] = ConnextMessage.TokenId(_canonicalDomain, _canonicalTokenId);
    // s.adoptedToLocalPools[_canonicalTokenId] = IStableSwap(address(0));
    // s.canonicalToAdopted[_canonicalTokenId] = _local;
    // // setup other context
    // s.approvedRelayers[address(this)] = true;
    // s.maxRoutersPerTransfer = 5;
  }

  // ============ Utils ==============
  function setOwner(address owner) internal {
    // set owner
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    ds.contractOwner = owner;
  }

  // ============ Getters ============
  // canonicalToAdopted
  function test_AssetFacet__canonicalToAdopted_success() public {
    s.canonicalToAdopted[_canonicalTokenId] = _local;
    assert(this.canonicalToAdopted(_canonicalTokenId) == _local);
  }

  function test_AssetFacet__canonicalToAdopted_notFound() public view {
    assert(this.canonicalToAdopted(_canonicalTokenId) == address(0));
  }

  // adoptedToCanonical
  function test_AssetFacet__adoptedToCanonical_success() public {
    s.adoptedToCanonical[_local].domain = _domain;
    s.adoptedToCanonical[_local].id = _canonicalTokenId;
    ConnextMessage.TokenId memory canonical = ConnextMessage.TokenId(_domain, _canonicalTokenId);
    assert(keccak256(abi.encode(this.adoptedToCanonical(_local))) == keccak256(abi.encode(canonical)));
  }

  function test_AssetFacet__adoptedToCanonical_notFound() public view {
    ConnextMessage.TokenId memory canonical = this.adoptedToCanonical(_local);
    assert(canonical.domain == 0);
    assert(canonical.id == bytes32(0));
  }

  // approvedAssets
  function test_AssetFacet__approvedAssets_success() public {
    s.approvedAssets[_canonicalTokenId] = true;
    assert(this.approvedAssets(_canonicalTokenId) == true);
  }

  function test_AssetFacet__approvedAssets_notFound() public view {
    assert(this.approvedAssets(_canonicalTokenId) == false);
  }

  // adoptedToLocalPools
  function test_AssetFacet__adoptedToLocalPools_success() public {
    address stableSwap = address(42);
    IStableSwap swap = IStableSwap(stableSwap);
    s.adoptedToLocalPools[_localTokenId] = swap;
    assert(address(this.adoptedToLocalPools(_localTokenId)) == stableSwap);
  }

  function test_AssetFacet__adoptedToLocalPools_notFound() public view {
    assert(address(this.adoptedToLocalPools(_localTokenId)) == address(0));
  }

  // wrapper
  function test_AssetFacet__wrapper_success() public {
    address wrapper = address(42);
    s.wrapper = IWrapped(wrapper);
    assert(address(this.wrapper()) == wrapper);
  }

  function test_AssetFacet__wrapper_notSet() public view {
    assert(address(this.wrapper()) == address(0));
  }

  // tokenRegistry
  function test_AssetFacet__tokenRegistry_success(address tokenRegistry) public {
    s.tokenRegistry = ITokenRegistry(tokenRegistry);
    assert(address(this.tokenRegistry()) == tokenRegistry);
  }

  function test_AssetFacet__tokenRegistry_notSet() public view {
    assert(address(this.tokenRegistry()) == address(0));
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
    assert(address(s.wrapper) == wrapper);
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
    assert(address(s.tokenRegistry) == tokenRegistry);
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

    ConnextMessage.TokenId memory canonical = ConnextMessage.TokenId(_domain, _canonicalId);

    vm.expectEmit(true, true, false, true);
    emit AssetAdded(_canonicalId, _domain, asset, asset, _owner);

    vm.expectEmit(true, true, false, true);
    emit StableSwapAdded(_canonicalId, _domain, stableSwap, _owner);

    vm.prank(_owner);
    this.setupAsset(canonical, asset, stableSwap);
    assert(s.approvedAssets[_canonicalId] == true);
    assert(s.adoptedToCanonical[asset].domain == _domain);
    assert(s.adoptedToCanonical[asset].id == _canonicalId);
    assert(s.canonicalToAdopted[_canonicalId] == asset);
  }

  function test_AssetFacet__setupAsset_successNativeAsset() public {
    address asset = address(0);
    address stableSwap = address(0);

    address wrapper = address(new MockWrapper());
    s.wrapper = IWrapped(wrapper);

    ConnextMessage.TokenId memory canonical = ConnextMessage.TokenId(_domain, _canonicalId);

    vm.expectEmit(true, true, false, true);
    emit AssetAdded(_canonicalId, _domain, asset, wrapper, _owner);

    vm.prank(_owner);
    this.setupAsset(canonical, asset, stableSwap);
    assert(s.approvedAssets[_canonicalId] == true);
    assert(s.adoptedToCanonical[wrapper].domain == _domain);
    assert(s.adoptedToCanonical[wrapper].id == _canonicalId);
    assert(s.canonicalToAdopted[_canonicalId] == wrapper);
  }

  function test_AssetFacet__setupAsset_failIfRedundant() public {
    ConnextMessage.TokenId memory canonical = ConnextMessage.TokenId(_domain, _canonicalId);
    address asset = address(new TestERC20());
    s.approvedAssets[_canonicalId] = true;

    vm.prank(_owner);
    vm.expectRevert(AssetFacet.AssetFacet__addAssetId_alreadyAdded.selector);
    this.setupAsset(canonical, asset, address(0));
  }

  // addStableSwapPool
  function test_AssetFacet__addStableSwapPool_success() public {
    address stableSwap = address(65);

    vm.expectEmit(true, true, false, true);
    emit StableSwapAdded(_canonicalId, _domain, stableSwap, _owner);

    ConnextMessage.TokenId memory canonical = ConnextMessage.TokenId(_domain, _canonicalId);

    vm.prank(_owner);
    this.addStableSwapPool(canonical, stableSwap);
    assert(address(s.adoptedToLocalPools[_canonicalId]) == stableSwap);
  }

  function test_AssetFacet__addStableSwapPool_canDelete() public {
    address og = address(65);
    s.adoptedToLocalPools[_canonicalId] = IStableSwap(og);
    address empty = address(0);

    vm.expectEmit(true, true, false, true);
    emit StableSwapAdded(_canonicalId, _domain, empty, _owner);

    ConnextMessage.TokenId memory canonical = ConnextMessage.TokenId(_domain, _canonicalId);

    vm.prank(_owner);
    this.addStableSwapPool(canonical, empty);
    assert(address(s.adoptedToLocalPools[_canonicalId]) == empty);
  }

  // removeAssetId
  function test_AssetFacet__removeAssetId_successErc20Token() public {
    s.approvedAssets[_canonicalId] = true;
    s.adoptedToCanonical[_local].domain = _domain;
    s.adoptedToCanonical[_local].id = _canonicalId;
    s.canonicalToAdopted[_canonicalId] = _local;
    s.adoptedToLocalPools[_canonicalId] = IStableSwap(address(5678));

    vm.expectEmit(true, true, false, true);
    emit AssetRemoved(_canonicalId, _owner);

    vm.prank(_owner);
    this.removeAssetId(_canonicalId, _local);
    assert(s.approvedAssets[_canonicalId] == false);
    assert(address(s.adoptedToLocalPools[_canonicalId]) == address(0));
    assert(s.adoptedToCanonical[_local].domain == 0);
    assert(s.adoptedToCanonical[_local].id == bytes32(0));
    assert(s.canonicalToAdopted[_canonicalId] == address(0));
  }

  function test_AssetFacet__removeAssetId_successNativeAsset() public {
    address local = address(0);
    address wrapper = address(new MockWrapper());
    s.wrapper = IWrapped(wrapper);

    s.approvedAssets[_canonicalId] = true;
    s.adoptedToCanonical[wrapper].domain = _domain;
    s.adoptedToCanonical[wrapper].id = _canonicalId;
    s.canonicalToAdopted[_canonicalId] = local;
    s.adoptedToLocalPools[_canonicalId] = IStableSwap(address(5678));

    vm.expectEmit(true, true, false, true);
    emit AssetRemoved(_canonicalId, _owner);

    vm.prank(_owner);
    this.removeAssetId(_canonicalId, local);
    assert(s.approvedAssets[_canonicalId] == false);
    assert(address(s.adoptedToLocalPools[_canonicalId]) == address(0));
    assert(s.adoptedToCanonical[wrapper].domain == 0);
    assert(s.adoptedToCanonical[wrapper].id == bytes32(0));
    assert(s.canonicalToAdopted[_canonicalId] == address(0));
  }

  function test_AssetFacet__removeAssetId_failIfNotAlreadyApproved() public {
    vm.expectRevert(AssetFacet.AssetFacet__removeAssetId_notAdded.selector);

    vm.prank(_owner);
    this.removeAssetId(_canonicalId, _local);
  }
}
