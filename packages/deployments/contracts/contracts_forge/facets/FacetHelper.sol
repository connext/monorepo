// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {ITokenRegistry} from "../../contracts/nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import {LibConnextStorage, AppStorage} from "../../contracts/libraries/LibConnextStorage.sol";

import "../ForgeHelper.sol";
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
  address _canonical = address(5);
  bytes32 _canonicalTokenId = bytes32(abi.encodePacked(_canonical));
  uint32 _canonicalDomain = _originDomain;

  // fees for liquidity
  uint256 _liquidityFeeNumerator = 9995;
  uint256 _liquidityFeeDenominator = 10000;
  // fees for credit
  uint256 _portalFeeNumerator = 5;

  function setDefaults(bool localIsAdopted) public {
    AppStorage storage s = LibConnextStorage.connextStorage();
    // set token registry
    s.tokenRegistry = ITokenRegistry(_tokenRegistry);
    // set local / adopted assets
    _local = address(new TestERC20());
    if (!localIsAdopted) {
      _adopted = address(new TestERC20());
      // set the token indices
    } else {
      _adopted = _local;
    }

    // set fees
    s.LIQUIDITY_FEE_NUMERATOR = _liquidityFeeNumerator;
    s.LIQUIDITY_FEE_DENOMINATOR = _liquidityFeeDenominator;
    s.aavePortalFeeNumerator = _portalFeeNumerator;
  }
}
