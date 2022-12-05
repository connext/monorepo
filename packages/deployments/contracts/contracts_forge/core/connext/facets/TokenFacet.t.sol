// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IERC20Metadata} from "@openzeppelin/contracts/interfaces/IERC20Metadata.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";

import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {IStableSwap} from "../../../../contracts/core/connext/interfaces/IStableSwap.sol";
import {IBridgeToken} from "../../../../contracts/core/connext/interfaces/IBridgeToken.sol";
import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {ERC20} from "../../../../contracts/core/connext/helpers/OZERC20.sol";
import {TokenFacet} from "../../../../contracts/core/connext/facets/TokenFacet.sol";
import {TestERC20} from "../../../../contracts/test/TestERC20.sol";
import {TokenId} from "../../../../contracts/core/connext/libraries/TokenId.sol";
import {TokenConfig} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";
import {IBridgeToken} from "../../../../contracts/core/connext/interfaces/IBridgeToken.sol";

import "../../../utils/FacetHelper.sol";

contract TokenFacetTest is TokenFacet, FacetHelper {
  // ============ storage ============
  // owner
  address _owner = address(12345);

  // sample data
  uint32 _domain = _originDomain;

  // NOTE: this is pulled from test logs, should calculate what address the
  // TokenFacet deploys to in tests
  address _deployedLocal;

  // ============ Test set up ============
  function setUp() public {
    setOwner(_owner);
    utils_deployAssetContracts();
    utils_setFees();
    _deployedLocal = addressFrom(address(this), vm.getNonce(address(this)));
    _local = _deployedLocal;
  }

  // ============ Utils ==============
  // Set diamond storage owner
  function setOwner(address owner) internal {
    // set owner
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    ds.contractOwner = owner;
  }

  // Calls setupAsset and asserts state changes/events
  function setupAssetAndAssert(address adoptedInput, bytes4 err) public {
    // Get key
    bytes32 key = utils_calculateCanonicalHash();
    // Get shortcut
    bool isCanonical = s.domain == _canonicalDomain;
    bool success = keccak256(abi.encode(err)) == keccak256(abi.encode(bytes4("")));

    // setup events
    if (!success) {
      vm.expectRevert(err);
    } else {
      // Should emit a token deployed event
      if (!isCanonical) {
        vm.expectEmit(true, true, true, true);
        emit TokenDeployed(_canonicalDomain, _canonicalId, _local);
      }

      // Should emit a pool event if added
      if (_stableSwap != address(0) && !isCanonical) {
        vm.expectEmit(true, true, true, true);
        emit StableSwapAdded(key, _canonicalId, _canonicalDomain, _stableSwap, _owner);
      }

      // Should emit a cap event
      if (_cap > 0 && isCanonical) {
        vm.expectEmit(true, true, true, true);
        emit LiquidityCapUpdated(key, _canonicalId, _canonicalDomain, _cap, _owner);
      }

      // Should emit an AssetAdded event
      vm.expectEmit(true, true, true, true);
      emit AssetAdded(key, _canonicalId, _canonicalDomain, isCanonical ? _canonical : adoptedInput, _local, _owner);
    }
    // Make call
    vm.prank(_owner);
    this.setupAsset(
      TokenId(_canonicalDomain, _canonicalId),
      uint8(18),
      "nextTest",
      "nTST",
      adoptedInput,
      _stableSwap,
      _cap // Will be ignored if not on canonical domain.
    );

    TokenConfig storage config = s.tokenConfigs[_canonicalKey];

    // Check: approval
    assertEq(config.approval, success);

    if (!success) {
      return;
    }

    // Check: adopted <> canonical mappings
    assertEq(s.adoptedToCanonical[isCanonical ? _canonical : adoptedInput].id, _canonicalId);
    assertEq(s.adoptedToCanonical[isCanonical ? _canonical : adoptedInput].domain, _canonicalDomain);

    // Check: the local <> canonical mapping
    assertEq(s.representationToCanonical[isCanonical ? _canonical : _local].domain, isCanonical ? 0 : _canonicalDomain);
    assertEq(
      s.representationToCanonical[isCanonical ? _canonical : _local].id,
      isCanonical ? bytes32(0) : _canonicalId
    );

    // Check: should update the pool if nonzero
    if (isCanonical) {
      // Check: should update liquidity cap if on canonical
      assertEq(config.cap, _cap);
      // Check: no stableswap on canonical
      console.log("checking pool");
      assertEq(config.adoptedToLocalExternalPools, address(0));
      console.log("pool verified");
    } else if (_stableSwap != address(0)) {
      // Check: stableswap configured
      assertEq(config.adoptedToLocalExternalPools, _stableSwap);
    }

    // Check: config is set up as expected
    assertEq(config.adopted, isCanonical ? _canonical : adoptedInput);
    assertEq(config.representationDecimals, 18);
    assertEq(config.adoptedDecimals, 18);
  }

  // Calls removeAsset and asserts state changes/events
  function removeAssetAndAssert(
    bytes32 key,
    address adopted,
    address representation
  ) public {
    // Get previous representation values
    uint8 representationDecimals = s.tokenConfigs[key].representationDecimals;
    address representationStored = s.tokenConfigs[key].representation;
    // Get shortcut
    bool isCanonical = s.domain == _canonicalDomain;

    vm.expectEmit(true, true, false, true);
    emit AssetRemoved(key, _owner);

    vm.prank(_owner);
    this.removeAssetId(key, isCanonical ? _canonical : adopted, representation);
    TokenConfig memory config = s.tokenConfigs[_canonicalKey];
    assertEq(config.approval, false);
    assertEq(config.adopted, address(0));
    console.log("asserted adopted");
    assertEq(config.adoptedDecimals, 0);
    assertEq(config.representation, representationStored);
    console.log("asserted adopted");
    assertEq(config.representationDecimals, representationDecimals);
    assertEq(config.cap, 0);
    assertEq(config.custodied, 0);
    assertEq(config.adoptedToLocalExternalPools, address(0));
    console.log("asserted pool");

    assertEq(s.adoptedToCanonical[isCanonical ? _canonical : adopted].domain, 0);
    assertEq(s.adoptedToCanonical[isCanonical ? _canonical : adopted].id, bytes32(0));
    assertEq(s.representationToCanonical[representation].domain, 0);
    assertEq(s.representationToCanonical[representation].id, bytes32(0));
  }

  // ============ Getters ============
  // canonicalToAdopted
  function test_TokenFacet__canonicalToAdopted_success() public {
    s.tokenConfigs[_canonicalKey].adoptedDecimals = 18;
    s.tokenConfigs[_canonicalKey].adopted = _local;
    assertTrue(this.canonicalToAdopted(_canonicalKey) == _local);
  }

  // if the canonicalToAdopted lookup fails using the helper, we revert: adopted asset not allowlisted
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
  // ============ setupAsset ============
  function test_TokenFacet__setupAsset_failsIfInvalidCanonicalConfig() public {
    // local is adopted, on canonical
    s.domain = _canonicalDomain;
    _adopted = _canonical;
    _local = _canonical;

    // revert if nonzero stable swap
    _stableSwap = address(123123);
    setupAssetAndAssert(address(2), TokenFacet.TokenFacet__setupAsset_invalidCanonicalConfiguration.selector);

    // revert if adopted != (address(0), _canonical)
    _stableSwap = address(0);
    setupAssetAndAssert(address(123123), TokenFacet.TokenFacet__setupAsset_invalidCanonicalConfiguration.selector);
  }

  function test_TokenFacet__setupAsset_worksOnCanonical() public {
    // local is adopted, on canonical
    s.domain = _canonicalDomain;
    _adopted = _canonical;
    _local = _canonical;
    _stableSwap = address(0);
    setupAssetAndAssert(address(0), bytes4(""));
  }

  function test_TokenFacet__setupAsset_worksOnRemote() public {
    // local != adopted, on remote
    s.domain = 123123;
    _local = addressFrom(address(this), vm.getNonce(address(this)));
    _stableSwap = address(0);
    setupAssetAndAssert(_adopted, bytes4(""));
  }

  function test_TokenFacet__setupAsset_worksWithCap() public {
    // local is adopted, on canonical
    s.domain = _canonicalDomain;
    _adopted = _canonical;
    _local = _canonical;
    _stableSwap = address(0);
    _cap = 1 ether;
    setupAssetAndAssert(address(0), bytes4(""));
  }

  // ============ setupAssetWithDeployedRepresentation ============

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
      stableSwap
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
      stableSwap
    );
  }

  function test_TokenFacet__setupAssetWithDeployedRepresentation_works() public {
    address asset = address(new TestERC20("Test Token", "TEST"));
    address stableSwap = address(0);
    address adoptedAssetId = address(0);
    _cap = 0;

    // Get key
    bytes32 _canonicalKey = utils_calculateCanonicalHash();

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
      stableSwap
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

  function test_TokenFacet__setupAsset_failIfOnRemoteAndRepresentationPresent() public {
    TokenId memory canonical = TokenId(_domain, _canonicalId);
    s.domain = _domain + 1;
    address asset = address(new TestERC20("Test Token", "TEST"));
    s.tokenConfigs[_canonicalKey].representation = asset;

    vm.prank(_owner);
    vm.expectRevert(TokenFacet.TokenFacet__setupAsset_representationListed.selector);
    this.setupAsset(canonical, 18, "nextTest", "nTest", asset, address(0), 0);
  }

  // setupAssetWithDeployedRepresentation
  function test_TokenFacet__setupAssetWithDeployedRepresentation_failIfOnRemoteAndCannotMint() public {
    TokenId memory canonical = TokenId(_domain, _canonicalId);
    s.domain = _domain + 1;
    ERC20 asset = new ERC20(18, "Test Token", "TEST", "1");

    vm.prank(_owner);
    // no error message given bc shouldnt be able to find function
    vm.expectRevert();
    this.setupAssetWithDeployedRepresentation(canonical, address(asset), address(asset), address(0));
  }

  function test_TokenFacet__setupAssetWithDeployedRepresentation_failIfOnRemoteAndCannotMintExactlyOne() public {
    TokenId memory canonical = TokenId(_domain, _canonicalId);
    s.domain = _domain + 1;
    ERC20 asset = new ERC20(18, "Test Token", "TEST", "1");

    // mint should work
    vm.mockCall(address(asset), abi.encodeWithSelector(TestERC20.mint.selector), abi.encode(true));

    // balanceOf should return constant value
    vm.mockCall(address(asset), abi.encodeWithSelector(TestERC20.balanceOf.selector), abi.encode(12321));

    vm.prank(_owner);
    vm.expectRevert(TokenFacet.TokenFacet__addAssetId_badMint.selector);
    this.setupAssetWithDeployedRepresentation(canonical, address(asset), address(asset), address(0));
  }

  function test_TokenFacet__setupAssetWithDeployedRepresentation_failIfOnRemoteAndCannotBurn() public {
    TokenId memory canonical = TokenId(_domain, _canonicalId);
    s.domain = _domain + 1;
    ERC20 asset = new ERC20(18, "Test Token", "TEST", "1");

    // mint should work
    vm.mockCall(address(asset), abi.encodeWithSelector(TestERC20.mint.selector), abi.encode(true));

    vm.prank(_owner);
    // no error message given bc shouldnt be able to find function
    vm.expectRevert(TokenFacet.TokenFacet__addAssetId_badMint.selector);
    this.setupAssetWithDeployedRepresentation(canonical, address(asset), address(asset), address(0));
  }

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
  function test_TokenFacet__removeAssetId_worksOnCanonical() public {
    s.domain = _canonicalDomain;
    _adopted = address(0);
    _local = _canonical;
    _stableSwap = address(0);

    vm.mockCall(_local, abi.encodeWithSelector(IERC20.balanceOf.selector), abi.encode(0));
    vm.mockCall(_adopted, abi.encodeWithSelector(IERC20Metadata.decimals.selector), abi.encode(18));

    setupAssetAndAssert(_adopted, bytes4(""));

    s.tokenConfigs[utils_calculateCanonicalHash()].custodied = 0;
    vm.mockCall(_local, abi.encodeWithSelector(IERC20.balanceOf.selector, address(this)), abi.encode(0));
    removeAssetAndAssert(utils_calculateCanonicalHash(), _canonical, _adopted);
  }

  function test_TokenFacet__removeAssetId_worksOnRemote() public {
    s.domain = _canonicalDomain + 1;
    _adopted = address(12312391263);

    vm.mockCall(_adopted, abi.encodeWithSelector(IERC20Metadata.decimals.selector), abi.encode(18));

    _deployedLocal = addressFrom(address(this), vm.getNonce(address(this)));
    setupAssetAndAssert(_adopted, bytes4(""));

    removeAssetAndAssert(utils_calculateCanonicalHash(), _adopted, _deployedLocal);
  }

  function test_TokenFacet__removeAssetId_failIfNotAlreadyApproved() public {
    vm.expectRevert(TokenFacet.TokenFacet__removeAssetId_notAdded.selector);

    vm.prank(_owner);
    this.removeAssetId(TokenId(_domain, _canonicalId), _local, _local);
  }

  function test_TokenFacet__removeAssetId_failIfNotConsistentPair() public {
    bytes32 key = utils_calculateCanonicalHash();
    s.tokenConfigs[key].approval = true;
    s.tokenConfigs[key].adopted = _local;
    s.tokenConfigs[key].representation = address(123);

    vm.expectRevert(TokenFacet.TokenFacet__removeAssetId_invalidParams.selector);

    vm.prank(_owner);
    this.removeAssetId(TokenId(_domain, _canonicalId), _local, _local);
  }

  function test_TokenFacet__removeAssetId_failIfOnCanonicalAndHasCustodied() public {
    bytes32 key = utils_calculateCanonicalHash();
    s.domain = _domain;
    s.tokenConfigs[key].approval = true;

    // Using canonical asset as adopted (and local) here.
    address adopted = TypeCasts.bytes32ToAddress(_canonicalId);

    s.tokenConfigs[key].adopted = adopted;
    s.tokenConfigs[key].representation = adopted;
    s.tokenConfigs[key].custodied = 123;

    vm.expectRevert(TokenFacet.TokenFacet__removeAssetId_remainsCustodied.selector);

    vm.prank(_owner);
    this.removeAssetId(TokenId(_domain, _canonicalId), adopted, adopted);
  }

  function test_TokenFacet__removeAssetId_failIfOnRemoteAndHasSupply() public {
    bytes32 key = utils_calculateCanonicalHash();
    s.domain = _domain + 1;
    s.tokenConfigs[key].approval = true;
    s.tokenConfigs[key].adopted = _local;
    s.tokenConfigs[key].representation = _local;

    vm.mockCall(_local, abi.encodeWithSelector(IERC20.totalSupply.selector), abi.encode(10));

    vm.expectRevert(TokenFacet.TokenFacet__removeAssetId_remainsCustodied.selector);

    vm.prank(_owner);
    this.removeAssetId(TokenId(_domain, _canonicalId), _local, _local);
  }

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

  // updateDetails
  function test_TokenFacet__updateDetails_failsIfNoLocal() public {
    s.domain = _canonicalDomain + 2;
    bytes32 key = utils_calculateCanonicalHash();
    s.tokenConfigs[key].representation = address(0);
    s.tokenConfigs[key].adoptedDecimals = 1;

    // Inputs
    string memory updatedName = "asdfkj";
    string memory updatedSymbol = "lkjliji";

    vm.expectRevert(TokenFacet.TokenFacet__updateDetails_localNotFound.selector);
    vm.prank(_owner);
    this.updateDetails(TokenId(_canonicalDomain, _canonicalId), updatedName, updatedSymbol);
  }

  function test_TokenFacet__updateDetails_failsOnCanonical() public {
    s.domain = _canonicalDomain;
    bytes32 key = utils_calculateCanonicalHash();
    s.tokenConfigs[key].representation = _local;
    s.tokenConfigs[key].adoptedDecimals = 1;

    // Inputs
    string memory updatedName = "asdfkj";
    string memory updatedSymbol = "lkjliji";

    vm.expectRevert(TokenFacet.TokenFacet__updateDetails_onlyRemote.selector);
    vm.prank(_owner);
    this.updateDetails(TokenId(_canonicalDomain, _canonicalId), updatedName, updatedSymbol);
  }

  // works
  function test_TokenFacet__updateDetails_works() public {
    _local = address(new TestERC20("Test", "t"));
    s.domain = _canonicalDomain + 2;
    bytes32 key = utils_calculateCanonicalHash();
    s.tokenConfigs[key].adoptedDecimals = 1;
    s.tokenConfigs[key].representation = _local;
    s.tokenConfigs[key].approval = true;

    // Inputs
    string memory updatedName = "asdfkj";
    string memory updatedSymbol = "lkjliji";

    vm.prank(_owner);
    this.updateDetails(TokenId(_canonicalDomain, _canonicalId), updatedName, updatedSymbol);

    // assertEq
    assertEq(IBridgeToken(_local).name(), updatedName);
    assertEq(IBridgeToken(_local).symbol(), updatedSymbol);
  }
}
