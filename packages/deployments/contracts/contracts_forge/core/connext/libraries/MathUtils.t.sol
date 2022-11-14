// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "../../../utils/ForgeHelper.sol";
import "../../../../contracts/core/connext/libraries/MathUtils.sol";

contract MathUtilsTest is ForgeHelper {
  // ============ Setup ============
  function setUp() public {}

  // ============ within1 ============
  function test_MathUtils_within1_works() public {
    assertEq(MathUtils.within1(1, 2), true);
    assertEq(MathUtils.within1(2, 1), true);
    assertEq(MathUtils.within1(1, 3), false);
  }

  // ============ difference ============
  function test_MathUtils_difference_works() public {
    assertEq(MathUtils.difference(1, 3), 2);
    assertEq(MathUtils.difference(3, 1), 2);
  }
}
