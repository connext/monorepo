// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

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
  address _relayerFeeRouter = address(555);

  // ============ Test set up ============
  function setUp() public {
    setOwner(_owner);

    s.relayerFeeRouter = _relayerFeeRouter;
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
  // transferRelayer
  // retrieves empty if not set
  function test_RelayerFacet__transferRelayer_empty() public {
    bytes32 transferId = bytes32("test");
    assertEq(this.transferRelayer(transferId), address(0));
  }

  // retrieves defined value
  function test_RelayerFacet__transferRelayer_defined() public {
    bytes32 transferId = bytes32("test");
    s.transferRelayer[transferId] = address(42);
    assertEq(this.transferRelayer(transferId), address(42));
  }

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

  // relayerFeeRouter
  // retrieves empty if not set
  function test_RelayerFacet__relayerFeeRouter_empty() public {
    s.relayerFeeRouter = address(0);
    assertEq(this.relayerFeeRouter(), address(0));
  }

  // retrieves defined
  function test_RelayerFacet__relayerFeeRouter_defined() public {
    assertEq(this.relayerFeeRouter(), _relayerFeeRouter);
  }

  // ============ Admin functions ============
  // setRelayerFeeRouter
  // fail if not owner
  function test_RelayerFacet__setRelayerFeeRouter_failsIfNotOwner() public {
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector);

    this.setRelayerFeeRouter(address(42));
  }

  // fail if same as previous relayer fee router
  function test_RelayerFacet__setRelayerFeeRouter_failsIfRedundant() public {
    vm.expectRevert(RelayerFacet.RelayerFacet__setRelayerFeeRouter_invalidRelayerFeeRouter.selector);

    vm.prank(_owner);
    this.setRelayerFeeRouter(_relayerFeeRouter);
  }

  // works; updates relayerFeeRouter
  function test_RelayerFacet__setRelayerFeeRouter_works() public {
    address newRelayerFeeRouter = address(42);

    vm.expectEmit(true, true, true, true);
    emit RelayerFeeRouterUpdated(_relayerFeeRouter, newRelayerFeeRouter, _owner);

    vm.prank(_owner);
    this.setRelayerFeeRouter(newRelayerFeeRouter);

    assertEq(s.relayerFeeRouter, newRelayerFeeRouter);
  }

  // addRelayer
  // fails if not owner
  function test_RelayerFacet__addRelayer_failsIfNotOwner() public {
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector);

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
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector);

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
