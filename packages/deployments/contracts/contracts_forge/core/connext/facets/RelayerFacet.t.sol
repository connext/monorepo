// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {RelayerFacet, BaseConnextFacet} from "../../../../contracts/core/connext/facets/RelayerFacet.sol";

import "../../../utils/FacetHelper.sol";

import "forge-std/console.sol";

contract RelayerFacetTest is RelayerFacet, FacetHelper {
  // ============ storage ============
  // owner
  address _owner = address(12345);

  // sample data
  uint32 _domain = 1000;

  address _relayer = address(222);
  address _relayerFeeVault = address(555);

  // ============ Test set up ============
  function setUp() public {
    setOwner(_owner);

    s.relayerFeeVault = _relayerFeeVault;
  }

  // ============ Utils ==============
  // Set diamond storage owner
  function setOwner(address owner) internal {
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    ds.contractOwner = owner;
  }

  // ============ Test methods ============
  // ============ Modifiers ============
  // whenNotPaused? onlyOwner?

  // ============ Getters ==============
  // approvedRelayers
  // retrieves false if not set
  function test_RelayerFacet__approvedRelayers_empty() public {
    assertEq(this.approvedRelayers(address(42)), false);
  }

  // true works
  function test_RelayerFacet__approvedRelayers_definedTrue() public {
    s.approvedRelayers[_relayer] = true;
    assertEq(this.approvedRelayers(_relayer), true);
  }

  // false works
  function test_RelayerFacet__approvedRelayers_definedFalse() public {
    s.approvedRelayers[_relayer] = false;
    assertEq(this.approvedRelayers(_relayer), false);
  }

  // relayerFeeVault
  // retrieves empty if not set
  function test_RelayerFacet__relayerFeeVault_empty() public {
    s.relayerFeeVault = address(0);
    assertEq(this.relayerFeeVault(), address(0));
  }

  // retrieves defined
  function test_RelayerFacet__relayerFeeVault_defined() public {
    assertEq(this.relayerFeeVault(), _relayerFeeVault);
  }

  // ============ Admin functions ============
  // setRelayerFeeVault
  // fail if not owner
  function test_RelayerFacet__setRelayerFeeVault_failsIfNotOwner() public {
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);

    this.setRelayerFeeVault(address(42));
  }

  // fail if same as previous relayer fee router
  function test_RelayerFacet__setRelayerFeeVault_failsIfRedundant() public {
    vm.expectRevert(RelayerFacet.RelayerFacet__setRelayerFeeVault_invalidRelayerFeeVault.selector);

    vm.prank(_owner);
    this.setRelayerFeeVault(_relayerFeeVault);
  }

  // works; updates relayerFeeVault
  function test_RelayerFacet__setRelayerFeeVault_works() public {
    address newRelayerFeeVault = address(42);

    vm.expectEmit(true, true, true, true);
    emit RelayerFeeVaultUpdated(_relayerFeeVault, newRelayerFeeVault, _owner);

    vm.prank(_owner);
    this.setRelayerFeeVault(newRelayerFeeVault);

    assertEq(s.relayerFeeVault, newRelayerFeeVault);
  }

  // addRelayer
  // fails if not owner
  function test_RelayerFacet__addRelayer_failsIfNotOwner() public {
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);

    this.addRelayer(address(42));
  }

  // fails if already approved
  function test_RelayerFacet__addRelayer_failsIfAlreadyApproved() public {
    address relayer = address(42);
    s.approvedRelayers[relayer] = true;
    vm.expectRevert(RelayerFacet.RelayerFacet__addRelayer_alreadyApproved.selector);

    vm.prank(_owner);
    this.addRelayer(relayer);
  }

  // works; adds an approved relayer
  function test_RelayerFacet__addRelayer_works() public {
    address relayer = address(42);
    s.approvedRelayers[relayer] = false;

    vm.expectEmit(true, true, true, true);
    emit RelayerAdded(relayer, _owner);

    vm.prank(_owner);
    this.addRelayer(relayer);

    assertEq(s.approvedRelayers[relayer], true);
  }

  // removeRelayer
  // fails if not owner
  function test_RelayerFacet__removeRelayer_failsIfNotOwner() public {
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);

    this.removeRelayer(address(42));
  }

  // fails if not approved / already removed
  function test_RelayerFacet__removeRelayer_failsIfAlreadyUnapproved() public {
    address relayer = address(42);
    s.approvedRelayers[relayer] = false;
    vm.expectRevert(RelayerFacet.RelayerFacet__removeRelayer_notApproved.selector);

    vm.prank(_owner);
    this.removeRelayer(relayer);
  }

  // works; removes an approved relayer
  function test_RelayerFacet__removeRelayer_works() public {
    address relayer = address(42);
    s.approvedRelayers[relayer] = true;

    vm.expectEmit(true, true, true, true);
    emit RelayerRemoved(relayer, _owner);

    vm.prank(_owner);
    this.removeRelayer(relayer);

    assertEq(s.approvedRelayers[relayer], false);
  }
}
