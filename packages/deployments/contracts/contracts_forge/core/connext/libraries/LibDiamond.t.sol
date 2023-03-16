// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "../../../utils/ForgeHelper.sol";
import {Deployer, DiamondInit, BridgeFacet, IConnectorManager} from "../../../utils/Deployer.sol";

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
  address internal lpTokenTargetAddress = address(2);

  // ============ Setup ============

  function setUp() public {
    // ensure manager returns correct domain by default
    vm.mockCall(
      xAppConnectionManager,
      abi.encodeWithSelector(IConnectorManager.localDomain.selector),
      abi.encode(domain)
    );
    // Deploy token beacon
    deployConnext(uint256(domain), xAppConnectionManager, acceptanceDelay, lpTokenTargetAddress);

    connextHandler = IConnext(address(connextDiamondProxy));
  }

  // ============ Utils ============

  // Should work: first initialization
  function test_LibDiamond__initializeDiamondCut_works() public {
    assertTrue(connextDiamondProxy.isInitialized());
  }

  // Second initialization should fail.
  function test_LibDiamond__initializeDiamondCut_failDuplicateInit() public {
    uint32 newDomain = 2;
    address newXAppConnectionManager = address(11);

    bytes memory initCallData = abi.encodeWithSelector(
      DiamondInit.init.selector,
      newDomain,
      newXAppConnectionManager,
      acceptanceDelay,
      lpTokenTargetAddress
    );

    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](1);
    bytes4[] memory facetSelectors = new bytes4[](1);
    facetSelectors[0] = BridgeFacet.execute.selector;
    facetCuts[0] = IDiamondCut.FacetCut({
      facetAddress: address(0),
      action: IDiamondCut.FacetCutAction.Remove,
      functionSelectors: facetSelectors
    });

    vm.warp(100);
    connextHandler.proposeDiamondCut(facetCuts, address(diamondInit), initCallData);

    vm.warp(100 + 7 days + 1);
    vm.expectRevert(DiamondInit.DiamondInit__init_alreadyInitialized.selector);
    connextHandler.diamondCut(facetCuts, address(diamondInit), initCallData);

    // still initialized
    assertTrue(connextDiamondProxy.isInitialized());
  }

  // Diamond cut prior to elapsed delay should revert.
  function testFail_LibDiamond__initializeDiamondCut_beforeAcceptanceDelay_reverts() public {
    uint32 newDomain = 2;
    address newXAppConnectionManager = address(11);

    bytes memory initCallData = abi.encodeWithSelector(
      DiamondInit.init.selector,
      newDomain,
      newXAppConnectionManager,
      acceptanceDelay
    );

    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](1);
    bytes4[] memory facetSelectors = new bytes4[](1);
    facetSelectors[0] = BridgeFacet.execute.selector;
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
    deployConnext(uint256(domain), xAppConnectionManager, 0, lpTokenTargetAddress);

    connextHandler = IConnext(address(connextDiamondProxy));

    uint32 newDomain = 2;
    address newXAppConnectionManager = address(11);

    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](1);
    bytes4[] memory facetSelectors = new bytes4[](1);
    facetSelectors[0] = BridgeFacet.execute.selector;
    facetCuts[0] = IDiamondCut.FacetCut({
      facetAddress: address(0),
      action: IDiamondCut.FacetCutAction.Remove,
      functionSelectors: facetSelectors
    });

    vm.warp(100);
    connextHandler.proposeDiamondCut(facetCuts, address(0), bytes(""));
    connextHandler.diamondCut(facetCuts, address(0), bytes(""));

    assertTrue(connextDiamondProxy.isInitialized());
  }

  // ============ diamondCut ============
  // Should fail if it includes `proposeDiamondCut` selector
  function test_LibDiamond__diamondCut_failsIfProposeCutRemoved() public {
    deployConnext(uint256(domain), xAppConnectionManager, 0, lpTokenTargetAddress);

    connextHandler = IConnext(address(connextDiamondProxy));
    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](1);
    bytes4[] memory facetSelectors = new bytes4[](1);
    facetSelectors[0] = IDiamondCut.proposeDiamondCut.selector;
    facetCuts[0] = IDiamondCut.FacetCut({
      facetAddress: address(0),
      action: IDiamondCut.FacetCutAction.Remove,
      functionSelectors: facetSelectors
    });

    vm.warp(100);
    connextHandler.proposeDiamondCut(facetCuts, address(0), bytes(""));
    vm.expectRevert(bytes("LibDiamondCut: Cannot remove cut selectors"));
    connextHandler.diamondCut(facetCuts, address(0), bytes(""));
  }

  // Should fail if it includes `diamondCut` selector
  function test_LibDiamond__diamondCut_failsIfCutRemoved() public {
    deployConnext(uint256(domain), xAppConnectionManager, 0, lpTokenTargetAddress);

    connextHandler = IConnext(address(connextDiamondProxy));
    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](1);
    bytes4[] memory facetSelectors = new bytes4[](1);
    facetSelectors[0] = IDiamondCut.diamondCut.selector;
    facetCuts[0] = IDiamondCut.FacetCut({
      facetAddress: address(0),
      action: IDiamondCut.FacetCutAction.Remove,
      functionSelectors: facetSelectors
    });

    vm.warp(100);
    connextHandler.proposeDiamondCut(facetCuts, address(0), bytes(""));
    vm.expectRevert(bytes("LibDiamondCut: Cannot remove cut selectors"));
    connextHandler.diamondCut(facetCuts, address(0), bytes(""));
  }
}
