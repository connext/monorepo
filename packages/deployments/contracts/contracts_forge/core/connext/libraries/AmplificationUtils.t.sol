// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "../facets/FacetHelper.sol";

contract AmplificationUtilsTest is FacetHelper {
  // ============ Storage ============

  // ============ Setup ============
  function setUp() public {}

  // ============ utils ============

  // ============ getA ============
  function test_AmplificationUtils_getA_works() public {}

  // ============ getAPrecise ============
  function test_AmplificationUtils_getAPrecise_works() public {}

  // ============ _getAPrecise ============
  function test_AmplificationUtils__getAPrecise_works() public {}

  // ============ rampA ============
  function test_AmplificationUtils_rampA_revertIfWaitTimeNotEnough() public {}

  function test_AmplificationUtils_rampA_revertIfInsufficientRampTime() public {}

  function test_AmplificationUtils_rampA_revertIfInvalidFutureTime() public {}

  function test_AmplificationUtils_rampA_revertIfFuturePriceTooSmall() public {}

  function test_AmplificationUtils_rampA_revertIfFuturePriceTooLarge() public {}

  function test_AmplificationUtils_rampA_works() public {}

  // ============ stopRampA ============
  function test_AmplificationUtils_stopRampA_revertIfRampStopped() public {}

  function test_AmplificationUtils_stopRampA_works() public {}
}
