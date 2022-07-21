// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {IBridgeToken} from "../../contracts/core/connext/interfaces/IBridgeToken.sol";
import {ITokenRegistry} from "../../contracts/core/connext/interfaces/ITokenRegistry.sol";
import {IStableSwap} from "../../contracts/core/connext/interfaces/IStableSwap.sol";
import {IWrapped} from "../../contracts/core/connext/interfaces/IWrapped.sol";

import {ConnextMessage} from "../../contracts/core/connext/libraries/ConnextMessage.sol";
import {LibConnextStorage, AppStorage} from "../../contracts/core/connext/libraries/LibConnextStorage.sol";
import {TestERC20} from "../../contracts/test/TestERC20.sol";
import {ConnextMessage} from "../../contracts/core/connext/libraries/ConnextMessage.sol";
import {IStableSwap} from "../../contracts/core/connext/interfaces/IStableSwap.sol";

import {TestERC20} from "../../contracts/test/TestERC20.sol";

import {MockWrapper} from "./Mock.sol";
import "./ForgeHelper.sol";

contract FacetHelper is ForgeHelper {
  // ============ Storage ============
  // ============ Domains
  // domains
  uint32 _originDomain = 1000;
  uint32 _destinationDomain = 2000;
  // destination remote handler id
  bytes32 _remote = bytes32("remote");

  // ============ Assets
  // canonical token details
  address _canonical;
  bytes32 _canonicalId;
  uint32 _canonicalDomain = _originDomain;

  // adopted asset for this domain
  address _adopted;
  // local asset for this domain
  address _local;
  // native asset wrapper
  address _wrapper;

  // token registry
  address _tokenRegistry = address(6);
  // stable swap address
  address _stableSwap = address(5555555555555555555);

  // ============ Fees
  // fees
  uint256 _liquidityFeeNumerator = 9995;
  uint256 _liquidityFeeDenominator = 10000;
  // fees for credit
  uint256 _portalFeeNumerator = 5;

  // ============ Utils ============

  // Sets fee values
  function utils_setFees() public {
    AppStorage storage s = LibConnextStorage.connextStorage();
    s.LIQUIDITY_FEE_NUMERATOR = _liquidityFeeNumerator;
    s.LIQUIDITY_FEE_DENOMINATOR = _liquidityFeeDenominator;
    s.aavePortalFeeNumerator = _portalFeeNumerator;
  }

  // Sets remote router context
  function utils_setRemote(bool onOrigin) public {
    AppStorage storage s = LibConnextStorage.connextStorage();
    s.domain = onOrigin ? _originDomain : _destinationDomain;
    s.remotes[onOrigin ? _destinationDomain : _originDomain] = _remote;
  }

  // Deploys the wrapper, local, adopted, and canonical tokens. Also sets the
  // canonical id, token registry, wrapper
  function utils_deployAssetContracts() public {
    AppStorage storage s = LibConnextStorage.connextStorage();
    // Deploy the adopted token.
    _adopted = address(new TestERC20("Test Token", "TEST"));
    // Deploy the local token.
    _local = address(new TestERC20("Test Token", "TEST"));
    // Deploy the canonical token.
    _canonical = address(new TestERC20("Test Token", "TEST"));
    _canonicalId = bytes32(abi.encodePacked(_canonical));
    // Deploy wrapper for native asset.
    s.wrapper = IWrapped(new MockWrapper());
    _wrapper = address(s.wrapper);
    vm.mockCall(_wrapper, abi.encodeWithSelector(IBridgeToken.name.selector), abi.encode("TestERC20"));
    vm.mockCall(_wrapper, abi.encodeWithSelector(IBridgeToken.symbol.selector), abi.encode("TEST"));
    vm.mockCall(_wrapper, abi.encodeWithSelector(IBridgeToken.decimals.selector), abi.encode(18));
    // Set token registry
    s.tokenRegistry = ITokenRegistry(_tokenRegistry);
  }

  // Sets the storage and token registry return results.
  function utils_setupAsset(bool localIsAdopted, bool onCanonical) public {
    AppStorage storage s = LibConnextStorage.connextStorage();
    if (onCanonical) {
      _local = _canonical;
      _canonicalDomain = _originDomain;
    } else {
      // If the local is already set to the canonical (i.e. from some defaults)
      // redeploy
      if (_local == _canonical) {
        _local = address(new TestERC20("Test Token", "TEST"));
      }
      _canonicalDomain = _destinationDomain;
    }
    if (localIsAdopted) {
      _adopted = _local;
      _stableSwap = address(0);
    } else {
      // If the adopted is already set as the local, redeploy
      if (_adopted == _local) {
        _adopted = address(new TestERC20("Test Token", "TEST"));
      }
      if (_stableSwap == address(0)) {
        _stableSwap = address(5555555555555555555);
      }
    }
    // token registry should always return the canonical
    vm.mockCall(
      _tokenRegistry,
      abi.encodeWithSelector(ITokenRegistry.getTokenId.selector),
      abi.encode(_canonicalDomain, _canonicalId)
    );

    // if you are not on canonical domain, ensure the local origin returns false
    // (indicates whether token should be burned or not)
    vm.mockCall(
      _tokenRegistry,
      abi.encodeWithSelector(ITokenRegistry.isLocalOrigin.selector, _local),
      abi.encode(onCanonical)
    );

    // ensure local token should always return the local token wrt current domain
    vm.mockCall(_tokenRegistry, abi.encodeWithSelector(ITokenRegistry.ensureLocalToken.selector), abi.encode(_local));

    // Ensure token registry is always returned properly
    vm.mockCall(_tokenRegistry, abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector), abi.encode(_local));

    // Setup the storage variables
    s.adoptedToCanonical[_adopted] = ConnextMessage.TokenId(_canonicalDomain, _canonicalId);
    s.adoptedToLocalPools[_canonicalId] = IStableSwap(_stableSwap);
    s.canonicalToAdopted[_canonicalId] = _adopted;

    // // Log stored vars
    // console.log("setup asset:");
    // console.log("- adopted:", _adopted);
    // console.log("- local:", _local);
    // console.log("- canonical:", _canonical);
    // console.log("- stableSwap:", _stableSwap);
    // console.log("- wrapper:", address(s.wrapper));
    // console.log("- isLocalOrigin", onCanonical);
  }

  function utils_setupNative(bool localIsAdopted, bool onCanonical) public {
    AppStorage storage s = LibConnextStorage.connextStorage();
    // When you are using the native asset:
    // - canonical asset will always be the wrapper
    // - adopted asset will always be the wrapper
    // - the local asset may or may not be the wrapper
    if (onCanonical) {
      // The wrapper is canonical when on the canonical domain
      // only
      _canonical = address(s.wrapper);
      _canonicalId = bytes32(abi.encodePacked(_canonical));
    } else {
      // If localIsAdopted, then the local asset is the wrapper
      if (localIsAdopted) {
        // this is like if madETH is adopted on cronos. in this case,
        // the wrapper must also have the `detailsHash()` functionality
        // this is handled in the other utility function (see `utils_formatMessage`)
        _local = address(new TestERC20("Test Token", "TEST"));
        _adopted = _local;
      } else {
        // The adopted asset is the wrapper, local is bridge token
        _adopted = address(s.wrapper);
      }
    }
    utils_setupAsset(localIsAdopted, onCanonical);
  }
}
