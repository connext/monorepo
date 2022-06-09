// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {NomadFacet, BaseConnextFacet} from "../../../../contracts/core/connext/facets/NomadFacet.sol";
import {XAppConnectionManager} from "../../../../contracts/nomad-core/contracts/XAppConnectionManager.sol";
import "./FacetHelper.sol";

contract NomadFacetTest is NomadFacet, FacetHelper {
  // ============ storage ============
  uint32 domain = 1337;
  NomadFacet nomadFacet;

  function setUp() public {
    nomadFacet = new NomadFacet();
    s.remotes[domain] = bytes32("mockRemote");
    s.xAppConnectionManager = new XAppConnectionManager();
  }

  // ============ setXAppConnectionManager ============
  function test_NomadFacet__setXAppConnectionManager_failsIfNotOwner() public {
    vm.prank(address(12345));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));
    nomadFacet.setXAppConnectionManager(address(111));
  }

  function test_NomadFacet__setXAppConnectionManager_works() public {
    nomadFacet.setXAppConnectionManager(address(111));
    assertEq(address(nomadFacet.xAppConnectionManager()), address(111));
  }

  // ============ enrollRemoteRouter ============
  function test_NomadFacet__enrollRemoteRouter_failsIfNotOwner() public {}

  function test_NomadFacet__enrollRemoteRouter_works() public {}

  // ============ xAppConnectionManager ============
  function test_NomadFacet__xAppConnectionManager_works() public {}

  // ============ remotes ============
  function test_NomadFacet__remotes_works() public {}
}
