// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {PausedFunctions} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";
import {RelayerFeeRouter} from "../../../../contracts/core/relayer-fee/RelayerFeeRouter.sol";
import {RelayerFacet, BaseConnextFacet} from "../../../../contracts/core/connext/facets/RelayerFacet.sol";

import {MockWrapper, MockTokenRegistry} from "../../../utils/Mock.sol";

import "../../../../lib/forge-std/src/console.sol";
import "./FacetHelper.sol";

contract RelayerFacetTest is RelayerFacet, FacetHelper {
  // ============ storage ============
  // sample data
  uint32 _domain = 1000;

  address _relayer = address(222);
  address _relayerFeeRouter = address(555);

  // ============ Test set up ============
  function setUp() public {
    bytes memory code = address((new RelayerFeeRouter())).code;
    vm.etch(_relayerFeeRouter, code);
    s.relayerFeeRouter = RelayerFeeRouter(_relayerFeeRouter);
  }

  // ============ Utils ==============
  // // Deploy contracts used in the tests
  // function utils_deployContracts() internal {
  //   // Deploy the relayerFeeRouter
  //   _relayerFeeRouter = address(new RelayerFeeRouter());
  // }

  // ============ Test methods ============
  // ============ Modifiers ============
  // TODO: onlyRelayerFeeRouter
  // whenNotPaused?

  // ============ Getters ==============
  // function test_RelayerFacet__transferRelayer
  // function test_RelayerFacet__approvedRelayers
  // function test_RelayerFacet__relayerFeeRouter

  // ============ Admin functions ============
  // function test_RelayerFacet__setRelayerFeeRouter
  // function test_RelayerFacet__addRelayer
  // function test_RelayerFacet__removeRelayer

  // ============ External functions ============
  // initiateClaim
  // should fail if not relayer for the transfer (1/1)
  function test_RelayerFacet__initiateClaim_singleClaimFailsIfNotRelayer() public {
    bytes32[] memory transferIds = new bytes32[](1);
    transferIds[0] = bytes32("test");
    s.transferRelayer[transferIds[0]] = address(42);

    vm.expectRevert(
      abi.encodeWithSelector(RelayerFacet.RelayerFacet__initiateClaim_notRelayer.selector, transferIds[0])
    );
    vm.prank(_relayer);
    this.initiateClaim(_domain, _relayer, transferIds);
  }

  // should fail if not relayer for the transfer (1/200)
  function test_RelayerFacet__initiateClaim_multipleClaimsfailIfNotRelayer() public {
    uint count = 200;
    bytes32[] memory transferIds = new bytes32[](count);
    for (uint32 i = 0; i < count; i++) {
      transferIds[i] = bytes32(abi.encode(i));
      s.transferRelayer[transferIds[i]] = _relayer;
    }
    s.transferRelayer[transferIds[123]] = address(42);

    vm.expectRevert(
      abi.encodeWithSelector(RelayerFacet.RelayerFacet__initiateClaim_notRelayer.selector, transferIds[123])
    );
    vm.prank(_relayer);
    this.initiateClaim(_domain, _relayer, transferIds);
  }

  // should fail if paused
  function test_RelayerFacet__initiateClaim_failsIfPaused() public {
    bytes32[] memory transferIds = new bytes32[](0);
    s._paused = PausedFunctions.All;

    vm.expectRevert(
      BaseConnextFacet.BaseConnextFacet__whenBridgeNotPaused_paused.selector
    );
    vm.prank(_relayer);
    this.initiateClaim(_domain, _relayer, transferIds);
  }

  // should fail if transfer IDs is empty
  function test_RelayerFacet__initiateClaim_failsIfTransferIdsEmpty() public {
    bytes32[] memory transferIds = new bytes32[](0);

    vm.expectRevert(
      RelayerFacet.RelayerFacet__initiateClaim_emptyClaim.selector
    );
    vm.prank(_relayer);
    this.initiateClaim(_domain, _relayer, transferIds);
  }

  // sends transferIds via the relayer router
  function test_RelayerFacet__initiateClaim_sendsClaim() public {
    uint count = 1000;
    bytes32[] memory transferIds = new bytes32[](count);
    for (uint32 i = 0; i < count; i++) {
      transferIds[i] = bytes32(abi.encode(i));
      s.transferRelayer[transferIds[i]] = _relayer;
    }

    vm.mockCall(
      address(s.relayerFeeRouter),
      abi.encodeWithSelector(
        RelayerFeeRouter.send.selector,
        _domain,
        _relayer,
        transferIds
      ),
      bytes("")
    );
    s.relayerFeeRouter.send(_domain, _relayer, transferIds);

    vm.expectCall(
      _relayerFeeRouter,
      abi.encodeWithSelector(
        RelayerFeeRouter.send.selector,
        _domain,
        _relayer,
        transferIds
      )
    );

    vm.expectEmit(true, true, true, true);
    emit InitiatedClaim(_domain, _relayer, _relayer, transferIds);

    vm.prank(_relayer);
    this.initiateClaim(_domain, _relayer, transferIds);
  }

  // claim
  // fails if not the relayer fee router
  function test_RelayerFacet__claim_failsIfNotRelayerFeeRouter(address other) public {
    if (other == _relayerFeeRouter) return;
    vm.expectRevert(RelayerFacet.RelayerFacet__onlyRelayerFeeRouter_notRelayerFeeRouter.selector);
    bytes32[] memory transferIds = new bytes32[](1);
    this.claim(_relayer, transferIds);
  }

  // sends total value from 1 transfer
  function test_RelayerFacet__claim_sendsFeesForSingleClaim() public {
    bytes32[] memory transferIds = new bytes32[](1);
    s.relayerFees[transferIds[0]] = 0.06 ether;
    
    vm.expectEmit(true, true, true, true);
    emit Claimed(_relayer, 0.06 ether, transferIds);

    vm.prank(_relayerFeeRouter);
    this.claim(_relayer, transferIds);

    assertEq(payable(_relayer).balance, 0.06 ether);
    assertEq(s.relayerFees[transferIds[0]], 0);
  }

  // sends total value from multiple transfers
  function test_RelayerFacet__claim_sendsFeesForMultipleClaims() public {
    uint count = 1;
    bytes32[] memory transferIds = new bytes32[](count);
    uint256 total;
    for (uint32 i = 0; i < count; i++) {
      transferIds[i] = bytes32(abi.encode(i));
      total += 0.0123 ether;
      s.relayerFees[transferIds[i]] = 0.0123 ether;
    }
    
    vm.expectEmit(true, true, true, true);
    emit Claimed(_relayer, total, transferIds);

    vm.prank(_relayerFeeRouter);
    this.claim(_relayer, transferIds);

    assertEq(payable(_relayer).balance, total);
    for (uint i = 0; i < count; i++) {
      assertEq(s.relayerFees[transferIds[i]], 0);
    }
  }
}