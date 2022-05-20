// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {ITokenRegistry} from "../../contracts/nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import {LibConnextStorage, AppStorage} from "../../contracts/libraries/LibConnextStorage.sol";
import {ConnextMessage} from "../../contracts/libraries/ConnextMessage.sol";
import {IStableSwap} from "../../contracts/interfaces/IStableSwap.sol";

import "../utils/ForgeHelper.sol";
import {TestERC20} from "../../contracts/test/TestERC20.sol";

contract FacetHelper is ForgeHelper {
  // domains
  uint32 _originDomain = 1000;
  uint32 _destinationDomain = 2000;

  // token registry / assets
  address _tokenRegistry = address(6);
  address _stableSwap = address(3333);

  // local asset for dest domain
  address _local;
  // adopted asset for dest domain
  address _adopted;
  // canonical token details
  address _canonical;
  bytes32 _canonicalTokenId;
  uint32 _canonicalDomain = _originDomain;

  // fees for liquidity
  uint256 _liquidityFeeNumerator = 9995;
  uint256 _liquidityFeeDenominator = 10000;
  // fees for credit
  uint256 _portalFeeNumerator = 5;

  function setDefaults() public {
    AppStorage storage s = LibConnextStorage.connextStorage();
    // set token registry
    s.tokenRegistry = ITokenRegistry(_tokenRegistry);

    // deploy canonical token
    _canonical = address(new TestERC20());
    // set Id
    _canonicalTokenId = bytes32(abi.encodePacked(_canonical));

    // set fees
    s.LIQUIDITY_FEE_NUMERATOR = _liquidityFeeNumerator;
    s.LIQUIDITY_FEE_DENOMINATOR = _liquidityFeeDenominator;
    s.aavePortalFeeNumerator = _portalFeeNumerator;
  }

  function setAssetContext(uint32 domain, bool localIsAdopted) public {
    AppStorage storage s = LibConnextStorage.connextStorage();
    // if the domain is the canonical domain, then the local asset is
    // the canonical asset
    if (domain == _canonicalDomain) {
      _local = _canonical;
      _adopted = _canonical;
    } else {
      // otherwise, you are on a remote domain requiring a local asset
      // adopted may or may not be this asset
      _local = address(new TestERC20());
      _adopted = localIsAdopted ? _local : address(new TestERC20());
    }

    // setup asset context
    s.adoptedToCanonical[_adopted] = ConnextMessage.TokenId(_canonicalDomain, _canonicalTokenId);
    s.adoptedToLocalPools[_canonicalTokenId] = IStableSwap(_stableSwap);
    s.canonicalToAdopted[_canonicalTokenId] = _adopted;

    // set mock to return canonical domain + id
    vm.mockCall(
      _tokenRegistry,
      abi.encodeWithSelector(ITokenRegistry.getTokenId.selector),
      abi.encode(_canonicalDomain, _canonicalTokenId)
    );

    // set mock to return local address
    vm.mockCall(_tokenRegistry, abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector), abi.encode(_local));
  }
}
