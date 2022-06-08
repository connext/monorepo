// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "../../../utils/ForgeHelper.sol";
import "../../../../contracts/test/TestAggregator.sol";

contract ConnextPriceOracleTest is ForgeHelper {
  // ============ Storage ============

  // ============ Events ============
  event NewAdmin(address oldAdmin, address newAdmin);
  event PriceRecordUpdated(address token, address baseToken, address lpToken, bool _active);
  event DirectPriceUpdated(address token, uint256 oldPrice, uint256 newPrice);
  event AggregatorUpdated(address tokenAddress, address source);
  event V1PriceOracleUpdated(address oldAddress, address newAddress);

  // ============ Setup ============
  function setup() public {}

  // ============ utils ============
  function deployMockContracts() public {}

  // ============ getTokenPrice ============
  function test_ConnextPriceOracle_getTokenPrice_worksIfExistsInAssetPrices() public {}

  function test_ConnextPriceOracle_getTokenPrice_worksIfAggregatorExists() public {}

  function test_ConnextPriceOracle_getTokenPrice_worksIfDexRecordExists() public {}

  function test_ConnextPriceOracle_getTokenPrice_worksIfv1Exists() public {}

  function test_ConnextPriceOracle_getTokenPrice_fails() public {}

  // ============ getPriceFromOracle ============
  function test_ConnextPriceOracle_getPriceFromOracle_works() public {}

  // ============ getPriceFromDex ============
  function test_ConnextPriceOracle_getPriceFromDex_works() public {}

  function test_ConnextPriceOracle_getPriceFromDex_fails() public {}

  // ============ getPriceFromChainlink ============
  function test_ConnextPriceOracle_getPriceFromChainlink_works() public {}

  function test_ConnextPriceOracle_getPriceFromChainlink_fails() public {}

  // ============ setDexPriceInfo ============
  function test_ConnextPriceOracle_setDexPriceInfo_failsIfInvalidBaseToken() public {}

  function test_ConnextPriceOracle_setDexPriceInfo_failsIfNotAdmin() public {}

  function test_ConnextPriceOracle_setDexPriceInfo_worksIfOnlyAdmin() public {}

  // ============ setDirectPrice ============
  function test_ConnextPriceOracle_setDirectPrice_worksIfOnlyAdmin() public {}

  function test_ConnextPriceOracle_setDirectPrice_failsIfNotAdmin() public {}

  // ============ setV1PriceOracle ============
  function test_ConnextPriceOracle_setV1PriceOracle_worksIfOnlyAdmin() public {}

  function test_ConnextPriceOracle_setV1PriceOracle_failsIfNotAdmin() public {}

  // ============ setAdmin ============
  function test_ConnextPriceOracle_setAdmin_worksIfOnlyAdmin() public {}

  function test_ConnextPriceOracle_setAdmin_failsIfNotAdmin() public {}

  // ============ setAggregators ============
  function test_ConnextPriceOracle_setAggregators_worksIfOnlyAdmin() public {}

  function test_ConnextPriceOracle_setAggregators_failsIfNotAdmin() public {}
}
