// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {Connext} from "../../contracts/test/Connext.sol";
import {DiamondCutFacet} from "../../contracts/facets/DiamondCutFacet.sol";
import {DiamondLoupeFacet} from "../../contracts/facets/DiamondLoupeFacet.sol";
import {DiamondInit} from "../../contracts/upgradeInitializers/DiamondInit.sol";
import {AssetFacet} from "../../contracts/facets/AssetFacet.sol";
import {BridgeFacet} from "../../contracts/facets/BridgeFacet.sol";
import {NomadFacet} from "../../contracts/facets/NomadFacet.sol";
import {OwnershipFacet} from "../../contracts/facets/OwnershipFacet.sol";
import {ProposedOwnableFacet} from "../../contracts/facets/ProposedOwnableFacet.sol";
import {RelayerFacet} from "../../contracts/facets/RelayerFacet.sol";
import {RoutersFacet} from "../../contracts/facets/RoutersFacet.sol";
import {StableSwapFacet} from "../../contracts/facets/StableSwapFacet.sol";
import {ConnextMessage} from "../../contracts/libraries/ConnextMessage.sol";
import {XCallArgs, CallParams} from "../../contracts/libraries/LibConnextStorage.sol";
import {IDiamondCut} from "../../contracts/interfaces/IDiamondCut.sol";

import {TestSetterFacet} from "../Mock.sol";

contract Deployer {
  Connext connextDiamondProxy;
  DiamondCutFacet diamondCutFacet;
  DiamondLoupeFacet diamondLoupeFacet;
  DiamondInit diamondInit;
  AssetFacet assetFacet;
  BridgeFacet bridgeFacet;
  NomadFacet nomadFacet;
  OwnershipFacet ownershipFacet;
  ProposedOwnableFacet proposedOwnableFacet;
  RelayerFacet relayerFacet;
  RoutersFacet routersFacet;
  StableSwapFacet stableSwapAsset;
  TestSetterFacet testSetterFacet;

  function getDiamondCutFacetCut(address _diamondCutFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory diamondCutFacetSelectors = new bytes4[](1);
    diamondCutFacetSelectors[0] = DiamondCutFacet.diamondCut.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _diamondCutFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: diamondCutFacetSelectors
      });
  }

  function getDiamondLoupeFacetCut(address _diamondLoupeFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory diamondLoupeFacetSelectors = new bytes4[](5);
    diamondLoupeFacetSelectors[0] = DiamondLoupeFacet.facets.selector;
    diamondLoupeFacetSelectors[1] = DiamondLoupeFacet.facetFunctionSelectors.selector;
    diamondLoupeFacetSelectors[2] = DiamondLoupeFacet.facetAddresses.selector;
    diamondLoupeFacetSelectors[3] = DiamondLoupeFacet.facetAddress.selector;
    diamondLoupeFacetSelectors[4] = DiamondLoupeFacet.supportsInterface.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _diamondLoupeFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: diamondLoupeFacetSelectors
      });
  }

  function getAssetFacetCut(address _assetFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory assetFacetSelectors = new bytes4[](7);
    assetFacetSelectors[0] = AssetFacet.canonicalToAdopted.selector;
    assetFacetSelectors[1] = AssetFacet.adoptedToCanonical.selector;
    assetFacetSelectors[2] = AssetFacet.approvedAssets.selector;
    assetFacetSelectors[3] = AssetFacet.adoptedToLocalPools.selector;
    assetFacetSelectors[4] = AssetFacet.setupAsset.selector;
    assetFacetSelectors[5] = AssetFacet.addStableSwapPool.selector;
    assetFacetSelectors[6] = AssetFacet.removeAssetId.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _assetFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: assetFacetSelectors
      });
  }

  function getBridgeFacetCut(address _bridgeFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory bridgeFacetSelectors = new bytes4[](15);
    bridgeFacetSelectors[0] = BridgeFacet.relayerFees.selector;
    bridgeFacetSelectors[1] = BridgeFacet.routedTransfers.selector;
    bridgeFacetSelectors[2] = BridgeFacet.reconciledTransfers.selector;
    bridgeFacetSelectors[3] = BridgeFacet.tokenRegistry.selector;
    bridgeFacetSelectors[4] = BridgeFacet.domain.selector;
    bridgeFacetSelectors[5] = BridgeFacet.executor.selector;
    bridgeFacetSelectors[6] = BridgeFacet.nonce.selector;
    bridgeFacetSelectors[7] = BridgeFacet.wrapper.selector;
    bridgeFacetSelectors[8] = BridgeFacet.sponsorVault.selector;
    bridgeFacetSelectors[9] = BridgeFacet.promiseRouter.selector;
    bridgeFacetSelectors[10] = BridgeFacet.setSponsorVault.selector;
    bridgeFacetSelectors[11] = BridgeFacet.xcall.selector;
    bridgeFacetSelectors[12] = BridgeFacet.handle.selector;
    bridgeFacetSelectors[13] = BridgeFacet.execute.selector;
    bridgeFacetSelectors[14] = BridgeFacet.bumpTransfer.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _bridgeFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: bridgeFacetSelectors
      });
  }

  function getNomadFacetCut(address _nomadFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory nomadFacetSelectors = new bytes4[](4);
    nomadFacetSelectors[0] = NomadFacet.xAppConnectionManager.selector;
    nomadFacetSelectors[1] = NomadFacet.remotes.selector;
    nomadFacetSelectors[2] = NomadFacet.setXAppConnectionManager.selector;
    nomadFacetSelectors[3] = NomadFacet.enrollRemoteRouter.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _nomadFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: nomadFacetSelectors
      });
  }

  function getOwnershipFacetCut(address _ownershipFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory ownershipFacetSelectors = new bytes4[](2);
    ownershipFacetSelectors[0] = OwnershipFacet.transferOwnership.selector;
    ownershipFacetSelectors[1] = OwnershipFacet.owner.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _ownershipFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: ownershipFacetSelectors
      });
  }

  function getProposedOwnableFacetCut(address _proposedOwnableFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory proposedOwnableFacetSelectors = new bytes4[](14);
    proposedOwnableFacetSelectors[0] = ProposedOwnableFacet.proposedOwnableOwner.selector;
    proposedOwnableFacetSelectors[1] = ProposedOwnableFacet.proposed.selector;
    proposedOwnableFacetSelectors[2] = ProposedOwnableFacet.proposedTimestamp.selector;
    proposedOwnableFacetSelectors[3] = ProposedOwnableFacet.routerOwnershipTimestamp.selector;
    proposedOwnableFacetSelectors[4] = ProposedOwnableFacet.assetOwnershipTimestamp.selector;
    proposedOwnableFacetSelectors[5] = ProposedOwnableFacet.delay.selector;
    proposedOwnableFacetSelectors[6] = ProposedOwnableFacet.proposeRouterOwnershipRenunciation.selector;
    proposedOwnableFacetSelectors[7] = ProposedOwnableFacet.renounceRouterOwnership.selector;
    proposedOwnableFacetSelectors[8] = ProposedOwnableFacet.proposeAssetOwnershipRenunciation.selector;
    proposedOwnableFacetSelectors[9] = ProposedOwnableFacet.renounceAssetOwnership.selector;
    proposedOwnableFacetSelectors[10] = ProposedOwnableFacet.renounced.selector;
    proposedOwnableFacetSelectors[11] = ProposedOwnableFacet.proposeNewOwner.selector;
    proposedOwnableFacetSelectors[12] = ProposedOwnableFacet.renounceOwnership.selector;
    proposedOwnableFacetSelectors[13] = ProposedOwnableFacet.acceptProposedOwner.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _proposedOwnableFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: proposedOwnableFacetSelectors
      });
  }

  function getRelayerFacetCut(address _relayerFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory relayerFacetSelectors = new bytes4[](9);
    relayerFacetSelectors[0] = RelayerFacet.transferRelayer.selector;
    relayerFacetSelectors[1] = RelayerFacet.approvedRelayers.selector;
    relayerFacetSelectors[2] = RelayerFacet.relayerFeeRouter.selector;
    relayerFacetSelectors[3] = RelayerFacet.LIQUIDITY_FEE_NUMERATOR.selector;
    relayerFacetSelectors[4] = RelayerFacet.LIQUIDITY_FEE_DENOMINATOR.selector;
    relayerFacetSelectors[5] = RelayerFacet.addRelayer.selector;
    relayerFacetSelectors[6] = RelayerFacet.removeRelayer.selector;
    relayerFacetSelectors[7] = RelayerFacet.initiateClaim.selector;
    relayerFacetSelectors[8] = RelayerFacet.claim.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _relayerFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: relayerFacetSelectors
      });
  }

  function getRoutersFacetCut(address _routersFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory routersFacetSelectors = new bytes4[](16);
    routersFacetSelectors[0] = RoutersFacet.getRouterApproval.selector;
    routersFacetSelectors[1] = RoutersFacet.getRouterRecipient.selector;
    routersFacetSelectors[2] = RoutersFacet.getRouterOwner.selector;
    routersFacetSelectors[3] = RoutersFacet.getProposedRouterOwner.selector;
    routersFacetSelectors[4] = RoutersFacet.getProposedRouterOwnerTimestamp.selector;
    routersFacetSelectors[5] = RoutersFacet.maxRoutersPerTransfer.selector;
    routersFacetSelectors[6] = RoutersFacet.routerBalances.selector;
    routersFacetSelectors[7] = RoutersFacet.setRouterRecipient.selector;
    routersFacetSelectors[8] = RoutersFacet.proposeRouterOwner.selector;
    routersFacetSelectors[9] = RoutersFacet.acceptProposedRouterOwner.selector;
    routersFacetSelectors[10] = RoutersFacet.setupRouter.selector;
    routersFacetSelectors[11] = RoutersFacet.removeRouter.selector;
    routersFacetSelectors[12] = RoutersFacet.setMaxRoutersPerTransfer.selector;
    routersFacetSelectors[13] = RoutersFacet.addLiquidityFor.selector;
    routersFacetSelectors[14] = RoutersFacet.addLiquidity.selector;
    routersFacetSelectors[15] = RoutersFacet.removeLiquidity.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _routersFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: routersFacetSelectors
      });
  }

  function getStableSwapFacetCut(address _stableSwapFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory stableSwapFacetSelectors = new bytes4[](23);
    stableSwapFacetSelectors[0] = StableSwapFacet.getA.selector;
    stableSwapFacetSelectors[1] = StableSwapFacet.getAPrecise.selector;
    stableSwapFacetSelectors[2] = StableSwapFacet.getToken.selector;
    stableSwapFacetSelectors[3] = StableSwapFacet.getTokenIndex.selector;
    stableSwapFacetSelectors[4] = StableSwapFacet.getTokenBalance.selector;
    stableSwapFacetSelectors[5] = StableSwapFacet.getVirtualPrice.selector;
    stableSwapFacetSelectors[6] = StableSwapFacet.calculateSwap.selector;
    stableSwapFacetSelectors[7] = StableSwapFacet.calculateTokenAmount.selector;
    stableSwapFacetSelectors[8] = StableSwapFacet.calculateRemoveLiquidity.selector;
    stableSwapFacetSelectors[9] = StableSwapFacet.calculateRemoveLiquidityOneToken.selector;
    stableSwapFacetSelectors[10] = StableSwapFacet.getAdminBalance.selector;
    stableSwapFacetSelectors[11] = StableSwapFacet.swap.selector;
    stableSwapFacetSelectors[12] = StableSwapFacet.swapExact.selector;
    stableSwapFacetSelectors[13] = StableSwapFacet.addStableLiquidity.selector;
    stableSwapFacetSelectors[14] = StableSwapFacet.removeStableLiquidity.selector;
    stableSwapFacetSelectors[15] = StableSwapFacet.removeStableLiquidityOneToken.selector;
    stableSwapFacetSelectors[16] = StableSwapFacet.removeStableLiquidityImbalance.selector;
    stableSwapFacetSelectors[17] = StableSwapFacet.initializeStableSwap.selector;
    stableSwapFacetSelectors[18] = StableSwapFacet.withdrawAdminFees.selector;
    stableSwapFacetSelectors[19] = StableSwapFacet.setAdminFee.selector;
    stableSwapFacetSelectors[20] = StableSwapFacet.setSwapFee.selector;
    stableSwapFacetSelectors[21] = StableSwapFacet.rampA.selector;
    stableSwapFacetSelectors[22] = StableSwapFacet.stopRampA.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _stableSwapFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: stableSwapFacetSelectors
      });
  }

  function getTestSetterFacetCut(address _testSetterFacetFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory testSetterFacetSelectors = new bytes4[](6);
    testSetterFacetSelectors[0] = TestSetterFacet.setTestRelayerFees.selector;
    testSetterFacetSelectors[1] = TestSetterFacet.setTestTransferRelayer.selector;
    testSetterFacetSelectors[2] = TestSetterFacet.setTestSponsorVault.selector;
    testSetterFacetSelectors[3] = TestSetterFacet.setTestApprovedRelayer.selector;
    testSetterFacetSelectors[4] = TestSetterFacet.setTestRouterBalances.selector;
    testSetterFacetSelectors[5] = TestSetterFacet.setTestApprovedRouter.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _testSetterFacetFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: testSetterFacetSelectors
      });
  }

  function deployFacets() internal {
    diamondCutFacet = new DiamondCutFacet();
    diamondLoupeFacet = new DiamondLoupeFacet();
    diamondInit = new DiamondInit();
    assetFacet = new AssetFacet();
    bridgeFacet = new BridgeFacet();
    nomadFacet = new NomadFacet();
    ownershipFacet = new OwnershipFacet();
    proposedOwnableFacet = new ProposedOwnableFacet();
    relayerFacet = new RelayerFacet();
    routersFacet = new RoutersFacet();
    stableSwapAsset = new StableSwapFacet();
    testSetterFacet = new TestSetterFacet();
  }

  function getFacetCuts() internal returns (IDiamondCut.FacetCut[] memory) {
    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](11);
    facetCuts[0] = getTestSetterFacetCut(address(testSetterFacet));
    facetCuts[1] = getDiamondCutFacetCut(address(diamondCutFacet));
    facetCuts[2] = getDiamondLoupeFacetCut(address(diamondLoupeFacet));
    facetCuts[3] = getAssetFacetCut(address(assetFacet));
    facetCuts[4] = getBridgeFacetCut(address(bridgeFacet));
    facetCuts[5] = getNomadFacetCut(address(nomadFacet));
    facetCuts[6] = getOwnershipFacetCut(address(ownershipFacet));
    facetCuts[7] = getProposedOwnableFacetCut(address(proposedOwnableFacet));
    facetCuts[8] = getRelayerFacetCut(address(relayerFacet));
    facetCuts[9] = getRoutersFacetCut(address(routersFacet));
    facetCuts[10] = getStableSwapFacetCut(address(stableSwapAsset));

    return facetCuts;
  }

  function deployConnext(
    uint256 domain,
    address xAppConnectionManager,
    address tokenRegistry,
    address wrapper,
    address relayerFeeRouter,
    address payable promiseRouter
  ) internal {
    bytes memory initCallData = abi.encodeWithSelector(
      DiamondInit.init.selector,
      domain,
      xAppConnectionManager,
      tokenRegistry,
      wrapper,
      relayerFeeRouter,
      promiseRouter
    );

    deployFacets();

    connextDiamondProxy = new Connext(address(this), address(diamondInit), initCallData, getFacetCuts());
  }
}
