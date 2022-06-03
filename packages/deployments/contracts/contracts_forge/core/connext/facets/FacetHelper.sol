// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {ITokenRegistry} from "../../../../contracts/core/connext/interfaces/ITokenRegistry.sol";
import {LibConnextStorage, AppStorage} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";

import "../../../utils/ForgeHelper.sol";

contract FacetHelper is ForgeHelper {
  // token registry / assets
  address _tokenRegistry = address(6);

  // fees
  uint256 _liquidityFeeNumerator = 9995;
  uint256 _liquidityFeeDenominator = 10000;

  function setDefaults() public {
    AppStorage storage s = LibConnextStorage.connextStorage();
    s.tokenRegistry = ITokenRegistry(_tokenRegistry);
    s.LIQUIDITY_FEE_NUMERATOR = _liquidityFeeNumerator;
    s.LIQUIDITY_FEE_DENOMINATOR = _liquidityFeeDenominator;
  }
}
