// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IStableSwap} from "../../contracts/core/connext/interfaces/IStableSwap.sol";

import {LibConnextStorage, AppStorage, TokenId, TransferInfo} from "../../contracts/core/connext/libraries/LibConnextStorage.sol";
import {TypeCasts} from "../../contracts/shared/libraries/TypeCasts.sol";
import {IStableSwap} from "../../contracts/core/connext/interfaces/IStableSwap.sol";

import {TestERC20} from "../../contracts/test/TestERC20.sol";

import "./ForgeHelper.sol";

contract FacetHelper is ForgeHelper {
  // ============ Storage ============
  // ============ Domains
  // domains
  uint32 _originDomain = 1000;
  uint32 _destinationDomain = 2000;
  // destination remote handler id
  bytes32 _remote = bytes32("remote");

  // ============ CallParam defaults
  bool _receiveLocal = false;

  string tokenName = "Test Token";
  string tokenSymbol = "Test";
  // ============ Assets
  // canonical token details
  address _canonical;
  bytes32 _canonicalId;
  uint8 _canonicalDecimals = 18;
  uint32 _canonicalDomain = _originDomain;
  bytes32 _canonicalKey;

  // adopted asset for this domain
  address _adopted;
  // local asset for this domain
  address _local;

  // stable swap address
  address _stableSwap = address(5555555555555555555);

  // safe cap
  uint256 _cap = 10_000_000 ether;

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
    s.aavePortalFeeNumerator = _portalFeeNumerator;
  }

  // Deploys the local, adopted, and canonical tokens. Also sets the
  // canonical id, token registry
  function utils_deployAssetContracts() public {
    AppStorage storage s = LibConnextStorage.connextStorage();
    // Deploy the adopted token.
    _adopted = address(new TestERC20(tokenName, tokenSymbol));
    // Deploy the local token.
    _local = address(new TestERC20(tokenName, tokenSymbol));
    // Deploy the canonical token.
    _canonical = address(new TestERC20(tokenName, tokenSymbol));
    _canonicalId = TypeCasts.addressToBytes32(_canonical);
    _canonicalKey = keccak256(abi.encode(_canonicalId, _canonicalDomain));
  }

  // Sets the storage results
  function utils_setupAsset(bool localIsAdopted, bool onCanonical) public {
    AppStorage storage s = LibConnextStorage.connextStorage();

    // clear any previous listings
    delete s.tokenConfigs[_canonicalKey];
    delete s.adoptedToCanonical[_local];
    delete s.representationToCanonical[_local];

    if (onCanonical) {
      // set domain
      s.domain = _canonicalDomain;
      // on canonical, local is always adopted && local is always canonical
      _local = _canonical;
      _adopted = _canonical;
      _stableSwap = address(0);
    } else {
      // Ensure stored domain is not canonical domain
      if (s.domain == _canonicalDomain) {
        _canonicalDomain = _canonicalDomain == _originDomain ? _destinationDomain : _originDomain;
      }

      // If the local is already set to the canonical (i.e. from some defaults)
      // redeploy
      if (_local == _canonical) {
        _local = address(new TestERC20(tokenName, tokenSymbol));
      }

      // If the local is adopted, ensure addresses align
      if (localIsAdopted) {
        _local = _adopted;
        _stableSwap = address(0);
      } else {
        _stableSwap = address(5555555555555555555);
        // ensure addresses are unique
        if (_adopted == _local) {
          _adopted = address(new TestERC20(tokenName, tokenSymbol));
        }
      }
    }

    _canonicalKey = keccak256(abi.encode(_canonicalId, _canonicalDomain));

    // Regardless of whether there are two different assets for representation and adopted,
    // the representation decimals must be set (the default behavior in TokenFacet for configuring
    // new assets involves setting the adopted decimals to the local decimals of the latter does
    // not exist).
    // IFF on the canonical domain, however, representation should be address(0)!
    s.tokenConfigs[_canonicalKey].representationDecimals = 18;

    // - token registry should always return the canonical
    // - if you are not on canonical domain, ensure the local origin returns false
    //   (indicates whether token should be burned or not)
    bool isCanonical = s.domain == _canonicalDomain;
    if (!isCanonical) {
      s.representationToCanonical[_local].domain = _canonicalDomain;
      s.representationToCanonical[_local].id = _canonicalId;

      s.tokenConfigs[_canonicalKey].representation = _local;
    }

    // Setup the storage variables for adopted
    s.adoptedToCanonical[_adopted].domain = _canonicalDomain;
    s.adoptedToCanonical[_adopted].id = _canonicalId;

    // Remaining config
    s.tokenConfigs[_canonicalKey].approval = true;
    s.tokenConfigs[_canonicalKey].adopted = _adopted;
    s.tokenConfigs[_canonicalKey].adoptedDecimals = 18;
    s.tokenConfigs[_canonicalKey].adoptedToLocalExternalPools = _stableSwap;
    s.tokenConfigs[_canonicalKey].cap = isCanonical ? _cap : 0; //10_000_000 ether;
    s.tokenConfigs[_canonicalKey].custodied = 0;

    // // Log stored vars
    // console.log("setup asset:");
    // console.log("- adopted:", _adopted);
    // console.log("- local:", _local);
    // console.log("- canonical:", _canonical);
    // console.log("");
    // console.log("- domain:", s.domain);
    // console.log("- destination:", _destinationDomain);
    // console.log("- origin:", _originDomain);
    // console.log("- canonicalDomain:", _canonicalDomain);
    // console.log("- stableSwap:", _stableSwap);
    // console.log("- isLocalOrigin", onCanonical);
  }

  function utils_calculateCanonicalHash() internal view returns (bytes32) {
    return keccak256(abi.encode(_canonicalId, _canonicalDomain));
  }

  function utils_getTransferIdInformation(
    uint32 _destination,
    address _to,
    address _asset,
    address _delegate,
    uint256 _amount,
    uint256 _slippage,
    bytes calldata _callData
  ) public returns (TransferInfo memory) {
    return
      TransferInfo({
        to: _to,
        callData: _callData,
        originDomain: _originDomain,
        destinationDomain: _destination,
        delegate: _delegate,
        receiveLocal: false, // Always swap into adopted in xcall pass.
        slippage: _slippage,
        originSender: msg.sender,
        // The following values should be assigned in _xcall.
        nonce: 0,
        canonicalDomain: 0,
        bridgedAmt: 0,
        normalizedIn: 0,
        canonicalId: bytes32(0)
      });
  }
}
