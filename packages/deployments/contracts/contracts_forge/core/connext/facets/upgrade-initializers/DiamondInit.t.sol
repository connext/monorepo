// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {LibDiamond} from "../../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {DiamondInit, BaseConnextFacet} from "../../../../../contracts/core/connext/facets/upgrade-initializers/DiamondInit.sol";

import "../../../../utils/FacetHelper.sol";

contract DiamondInitTest is DiamondInit, FacetHelper {
  // ============ Storage ============
  // manager
  address _xAppConnectionManager = address(2134123);

  // delay
  uint256 _delay = 1 days;

  // diamond storage contract owner
  address _ds_owner = address(987654321);

  // ============ Test set up ============
  function setUp() public {
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    ds.contractOwner = _ds_owner;
  }

  // should fail if the owner is not caller && not init-d
  function test_DiamondInit__init_failsIfNotOwner() public {
    vm.expectRevert(bytes("LibDiamond: !contract owner"));
    this.init(_originDomain, _xAppConnectionManager, _delay);
  }

  // should fail if already init-d
  function test_DiamondInit__init_failsIfInitialized() public {
    // set init
    s.initialized = true;

    // set revert
    vm.expectRevert(DiamondInit.DiamondInit__init_alreadyInitialized.selector);

    vm.prank(_ds_owner);
    this.init(_originDomain, _xAppConnectionManager, _delay);
  }

  // should work
  function test_DiamondInit__init_worksIfNotInitialized() public {
    vm.prank(_ds_owner);
    this.init(_originDomain, _xAppConnectionManager, _delay);

    assertEq(s.domain, _originDomain);
    assertEq(s.LIQUIDITY_FEE_NUMERATOR, 9995);
    assertEq(s.maxRoutersPerTransfer, 5);
    assertEq(address(s.xAppConnectionManager), _xAppConnectionManager);
    assertTrue(s.initialized);
    assertEq(s._status, _NOT_ENTERED);
  }
}
