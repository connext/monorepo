// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {VersionFacet} from "../../../../contracts/core/connext/facets/VersionFacet.sol";

import "../../../utils/FacetHelper.sol";

contract VersionFacetTest is VersionFacet, FacetHelper {
  function setUp() public {}

  // ============ VERSION ============

  function test_VersionFacet__VERSION_works() public {
    assertEq(this.VERSION(), 0);
  }
}
