// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {RelayerFeeRouter} from "../../../../contracts/core/relayer-fee/RelayerFeeRouter.sol";
import {RelayerFacet} from "../../../../contracts/core/connext/facets/RelayerFacet.sol";

import {MockWrapper, MockTokenRegistry} from "../../../utils/Mock.sol";

// import "../../lib/forge-std/src/console.sol";
import "./FacetHelper.sol";

contract RelayerFacetTest is RelayerFacet, FacetHelper {
  // ============ storage ============
  // sample data
  uint32 _domain = 1000;

  address _relayer = address(222);
  address _relayerFeeRouter = address(555);

  // ============ Test set up ============
  function setUp() public {
    s.relayerFeeRouter = RelayerFeeRouter(_relayerFeeRouter);
    vm.mockCall(
      _relayerFeeRouter,
      abi.encodeWithSelector(
        RelayerFeeRouter.send.selector
      ),
      abi.encode()
    );
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
  // should fail if not relayer for the transfer (1/200)

  // sends transferIds via the relayer router
  // function test_RelayerFacet__initiateClaim


  // claim
  // fails if not the relayer fee router
  function test_RelayerFacet__claim_failsIfNotRelayerFeeRouter(address other) public {
    if (other == _relayerFeeRouter) return;
    vm.expectRevert(RelayerFacet.RelayerFacet__onlyRelayerFeeRouter_notRelayerFeeRouter.selector);
    bytes32[] memory transferIds = new bytes32[](1);
    this.claim(_relayer, transferIds);
  }

  // sends total value from 1 transfer
  function test_RelayerFacet__claim_sendsFeesSingleTransfer() public {
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
  function test_RelayerFacet__claim_sendsFeesMultipleTransfers() public {
    bytes32[] memory transferIds = new bytes32[](200);
    uint256 total;
    for (uint32 i = 0; i < 200; i++) {
      transferIds[i] = bytes32(abi.encode(i));
      total += 0.0123 ether;
      s.relayerFees[transferIds[i]] = 0.0123 ether;
    }
    
    vm.expectEmit(true, true, true, true);
    emit Claimed(_relayer, total, transferIds);

    vm.prank(_relayerFeeRouter);
    this.claim(_relayer, transferIds);

    assertEq(payable(_relayer).balance, total);
    for (uint i = 0; i < 200; i++) {
      assertEq(s.relayerFees[transferIds[i]], 0);
    }
  }
}