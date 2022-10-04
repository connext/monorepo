// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "../../../utils/ForgeHelper.sol";
import {Deployer, DiamondInit, BridgeFacet} from "../../../utils/Deployer.sol";

import "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {IConnext} from "../../../../contracts/core/connext/interfaces/IConnext.sol";
import {IDiamondCut} from "../../../../contracts/core/connext/interfaces/IDiamondCut.sol";

contract LibDiamondTest is ForgeHelper, Deployer {
  // ============ Libraries ============

  using stdStorage for StdStorage;

  // ============ Storage ============
  IConnext connextHandler;
  uint32 domain = 1;
  uint256 acceptanceDelay = 7 days;
  uint256 ownershipDelay = 6 days;
  address internal xAppConnectionManager = address(1);
  address relayerFeeVault = address(3);
  address beacon = address(1232);

  // ============ Setup ============

  function setUp() public {
    // Deploy token beacon
    deployConnext(uint256(domain), beacon, xAppConnectionManager, relayerFeeVault, acceptanceDelay, ownershipDelay);

    connextHandler = IConnext(address(connextDiamondProxy));
  }

  // ============ Utils ============

  // Should work: first initialization
  function test_LibDiamond__initializeDiamondCut_works() public {
    assertTrue(connextDiamondProxy.isInitialized());
  }

  // Second initialization should not alter state.
  function test_LibDiamond__initializeDiamondCut_ignoreDuplicateInit() public {
    uint32 newDomain = 2;
    address newBeacon = address(12312);
    address newXAppConnectionManager = address(11);
    address newRelayerFeeVault = address(13);

    bytes memory initCallData = abi.encodeWithSelector(
      DiamondInit.init.selector,
      newDomain,
      newBeacon,
      newXAppConnectionManager,
      newRelayerFeeVault,
      acceptanceDelay,
      ownershipDelay
    );

    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](1);
    bytes4[] memory facetSelectors = new bytes4[](1);
    facetSelectors[0] = BridgeFacet.xcall.selector;
    facetCuts[0] = IDiamondCut.FacetCut({
      facetAddress: address(0),
      action: IDiamondCut.FacetCutAction.Remove,
      functionSelectors: facetSelectors
    });

    vm.warp(100);
    connextHandler.proposeDiamondCut(facetCuts, address(diamondInit), initCallData);

    vm.warp(100 + 7 days + 1);
    connextHandler.diamondCut(facetCuts, address(diamondInit), initCallData);

    // still initialized
    assertTrue(connextDiamondProxy.isInitialized());
  }

  // Diamond cut prior to elapsed delay should revert.
  function testFail_LibDiamond__initializeDiamondCut_beforeAcceptanceDelay_reverts() public {
    uint32 newDomain = 2;
    address newBeacon = address(10001);
    address newXAppConnectionManager = address(11);
    address newRelayerFeeVault = address(13);

    bytes memory initCallData = abi.encodeWithSelector(
      DiamondInit.init.selector,
      newDomain,
      newBeacon,
      newXAppConnectionManager,
      newRelayerFeeVault,
      acceptanceDelay,
      ownershipDelay
    );

    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](1);
    bytes4[] memory facetSelectors = new bytes4[](1);
    facetSelectors[0] = BridgeFacet.xcall.selector;
    facetCuts[0] = IDiamondCut.FacetCut({
      facetAddress: address(0),
      action: IDiamondCut.FacetCutAction.Remove,
      functionSelectors: facetSelectors
    });

    vm.warp(100);
    connextHandler.proposeDiamondCut(facetCuts, address(diamondInit), initCallData);

    vm.warp(100 + 6 days + 1);
    connextHandler.diamondCut(facetCuts, address(diamondInit), initCallData);
  }

  // Diamond cut after setting 0 acceptance delay should work.
  function test_LibDiamond__initializeDiamondCut_withZeroAcceptanceDelay_works() public {
    deployConnext(uint256(domain), beacon, xAppConnectionManager, relayerFeeVault, 0, 0);

    connextHandler = IConnext(address(connextDiamondProxy));

    uint32 newDomain = 2;
    address newBeacon = address(10001);
    address newXAppConnectionManager = address(11);
    address newRelayerFeeVault = address(13);

    bytes memory initCallData = abi.encodeWithSelector(
      DiamondInit.init.selector,
      newDomain,
      newBeacon,
      newXAppConnectionManager,
      newRelayerFeeVault,
      acceptanceDelay,
      ownershipDelay
    );

    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](1);
    bytes4[] memory facetSelectors = new bytes4[](1);
    facetSelectors[0] = BridgeFacet.xcall.selector;
    facetCuts[0] = IDiamondCut.FacetCut({
      facetAddress: address(0),
      action: IDiamondCut.FacetCutAction.Remove,
      functionSelectors: facetSelectors
    });

    vm.warp(100);
    connextHandler.proposeDiamondCut(facetCuts, address(diamondInit), initCallData);
    connextHandler.diamondCut(facetCuts, address(diamondInit), initCallData);

    assertTrue(connextDiamondProxy.isInitialized());
  }
}
