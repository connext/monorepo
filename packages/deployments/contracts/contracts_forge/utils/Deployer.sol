// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {Connext} from "../../contracts/test/Connext.sol";

import {DiamondCutFacet} from "../../contracts/core/connext/facets/DiamondCutFacet.sol";
import {DiamondLoupeFacet} from "../../contracts/core/connext/facets/DiamondLoupeFacet.sol";
import {DiamondInit} from "../../contracts/core/connext/facets/upgrade-initializers/DiamondInit.sol";
import {AssetFacet} from "../../contracts/core/connext/facets/AssetFacet.sol";
import {BridgeFacet} from "../../contracts/core/connext/facets/BridgeFacet.sol";
import {NomadFacet} from "../../contracts/core/connext/facets/NomadFacet.sol";
import {ProposedOwnableFacet} from "../../contracts/core/connext/facets/ProposedOwnableFacet.sol";
import {RelayerFacet} from "../../contracts/core/connext/facets/RelayerFacet.sol";
import {RoutersFacet} from "../../contracts/core/connext/facets/RoutersFacet.sol";
import {StableSwapFacet} from "../../contracts/core/connext/facets/StableSwapFacet.sol";
import {VersionFacet} from "../../contracts/core/connext/facets/VersionFacet.sol";
import {ConnextMessage} from "../../contracts/core/connext/libraries/ConnextMessage.sol";
import {XCallArgs, CallParams} from "../../contracts/core/connext/libraries/LibConnextStorage.sol";
import {IDiamondCut} from "../../contracts/core/connext/interfaces/IDiamondCut.sol";

import {TestSetterFacet} from "./Mock.sol";

contract Deployer {
  Connext connextDiamondProxy;
  DiamondCutFacet diamondCutFacet;
  DiamondLoupeFacet diamondLoupeFacet;
  DiamondInit diamondInit;
  AssetFacet assetFacet;
  BridgeFacet bridgeFacet;
  NomadFacet nomadFacet;
  ProposedOwnableFacet proposedOwnableFacet;
  RelayerFacet relayerFacet;
  RoutersFacet routersFacet;
  StableSwapFacet stableSwapAsset;
  VersionFacet versionFacet;
  TestSetterFacet testSetterFacet;

  function getDiamondCutFacetCut(address _diamondCutFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory diamondCutFacetSelectors = new bytes4[](1);
    diamondCutFacetSelectors[0] = DiamondCutFacet.diamondCut.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _diamondCutFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: diamondCutFacetSelectors
      });
  }

  function getDiamondLoupeFacetCut(address _diamondLoupeFacet) internal pure returns (IDiamondCut.FacetCut memory) {
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

  function getAssetFacetCut(address _assetFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory assetFacetSelectors = new bytes4[](11);
    assetFacetSelectors[0] = AssetFacet.canonicalToAdopted.selector;
    assetFacetSelectors[1] = AssetFacet.adoptedToCanonical.selector;
    assetFacetSelectors[2] = AssetFacet.approvedAssets.selector;
    assetFacetSelectors[3] = AssetFacet.adoptedToLocalPools.selector;
    assetFacetSelectors[4] = AssetFacet.wrapper.selector;
    assetFacetSelectors[5] = AssetFacet.tokenRegistry.selector;
    assetFacetSelectors[6] = AssetFacet.setWrapper.selector;
    assetFacetSelectors[7] = AssetFacet.setTokenRegistry.selector;
    assetFacetSelectors[8] = AssetFacet.setupAsset.selector;
    assetFacetSelectors[9] = AssetFacet.addStableSwapPool.selector;
    assetFacetSelectors[10] = AssetFacet.removeAssetId.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _assetFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: assetFacetSelectors
      });
  }

  function getBridgeFacetCut(address _bridgeFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory bridgeFacetSelectors = new bytes4[](15);
    // getters
    bridgeFacetSelectors[0] = BridgeFacet.relayerFees.selector;
    bridgeFacetSelectors[1] = BridgeFacet.routedTransfers.selector;
    bridgeFacetSelectors[2] = BridgeFacet.reconciledTransfers.selector;
    bridgeFacetSelectors[3] = BridgeFacet.domain.selector;
    bridgeFacetSelectors[4] = BridgeFacet.executor.selector;
    bridgeFacetSelectors[5] = BridgeFacet.nonce.selector;
    bridgeFacetSelectors[6] = BridgeFacet.sponsorVault.selector;
    bridgeFacetSelectors[7] = BridgeFacet.promiseRouter.selector;
    // admin
    bridgeFacetSelectors[8] = BridgeFacet.setPromiseRouter.selector;
    bridgeFacetSelectors[9] = BridgeFacet.setExecutor.selector;
    bridgeFacetSelectors[10] = BridgeFacet.setSponsorVault.selector;
    // public
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

  function getNomadFacetCut(address _nomadFacet) internal pure returns (IDiamondCut.FacetCut memory) {
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

  function getProposedOwnableFacetCut(address _proposedOwnableFacet)
    internal
    pure
    returns (IDiamondCut.FacetCut memory)
  {
    bytes4[] memory proposedOwnableFacetSelectors = new bytes4[](14);
    proposedOwnableFacetSelectors[0] = ProposedOwnableFacet.owner.selector;
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

  function getRelayerFacetCut(address _relayerFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory relayerFacetSelectors = new bytes4[](8);
    relayerFacetSelectors[0] = RelayerFacet.transferRelayer.selector;
    relayerFacetSelectors[1] = RelayerFacet.approvedRelayers.selector;
    relayerFacetSelectors[2] = RelayerFacet.relayerFeeRouter.selector;
    relayerFacetSelectors[3] = RelayerFacet.setRelayerFeeRouter.selector;
    relayerFacetSelectors[4] = RelayerFacet.addRelayer.selector;
    relayerFacetSelectors[5] = RelayerFacet.removeRelayer.selector;
    relayerFacetSelectors[6] = RelayerFacet.initiateClaim.selector;
    relayerFacetSelectors[7] = RelayerFacet.claim.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _relayerFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: relayerFacetSelectors
      });
  }

  function getRoutersFacetCut(address _routersFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory routersFacetSelectors = new bytes4[](20);
    routersFacetSelectors[0] = RoutersFacet.LIQUIDITY_FEE_NUMERATOR.selector;
    routersFacetSelectors[1] = RoutersFacet.LIQUIDITY_FEE_DENOMINATOR.selector;
    routersFacetSelectors[2] = RoutersFacet.getRouterApproval.selector;
    routersFacetSelectors[3] = RoutersFacet.getRouterRecipient.selector;
    routersFacetSelectors[4] = RoutersFacet.getRouterOwner.selector;
    routersFacetSelectors[5] = RoutersFacet.getProposedRouterOwner.selector;
    routersFacetSelectors[6] = RoutersFacet.getProposedRouterOwnerTimestamp.selector;
    routersFacetSelectors[7] = RoutersFacet.maxRoutersPerTransfer.selector;
    routersFacetSelectors[8] = RoutersFacet.routerBalances.selector;
    routersFacetSelectors[9] = RoutersFacet.setupRouter.selector;
    routersFacetSelectors[10] = RoutersFacet.removeRouter.selector;
    routersFacetSelectors[11] = RoutersFacet.setMaxRoutersPerTransfer.selector;
    routersFacetSelectors[12] = RoutersFacet.setLiquidityFeeNumerator.selector;
    routersFacetSelectors[13] = RoutersFacet.setRouterRecipient.selector;
    routersFacetSelectors[14] = RoutersFacet.proposeRouterOwner.selector;
    routersFacetSelectors[15] = RoutersFacet.acceptProposedRouterOwner.selector;
    routersFacetSelectors[16] = RoutersFacet.addRouterLiquidityFor.selector;
    routersFacetSelectors[17] = RoutersFacet.addRouterLiquidity.selector;
    routersFacetSelectors[18] = RoutersFacet.removeRouterLiquidity.selector;
    routersFacetSelectors[19] = RoutersFacet.removeRouterLiquidityFor.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _routersFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: routersFacetSelectors
      });
  }

  function getStableSwapFacetCut(address _stableSwapFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory stableSwapFacetSelectors = new bytes4[](23);
    stableSwapFacetSelectors[0] = StableSwapFacet.getSwapA.selector;
    stableSwapFacetSelectors[1] = StableSwapFacet.getSwapAPrecise.selector;
    stableSwapFacetSelectors[2] = StableSwapFacet.getSwapToken.selector;
    stableSwapFacetSelectors[3] = StableSwapFacet.getSwapTokenIndex.selector;
    stableSwapFacetSelectors[4] = StableSwapFacet.getSwapTokenBalance.selector;
    stableSwapFacetSelectors[5] = StableSwapFacet.getSwapVirtualPrice.selector;
    stableSwapFacetSelectors[6] = StableSwapFacet.calculateSwap.selector;
    stableSwapFacetSelectors[7] = StableSwapFacet.calculateSwapTokenAmount.selector;
    stableSwapFacetSelectors[8] = StableSwapFacet.calculateRemoveSwapLiquidity.selector;
    stableSwapFacetSelectors[9] = StableSwapFacet.calculateRemoveSwapLiquidityOneToken.selector;
    stableSwapFacetSelectors[10] = StableSwapFacet.getSwapAdminBalance.selector;
    stableSwapFacetSelectors[11] = StableSwapFacet.swap.selector;
    stableSwapFacetSelectors[12] = StableSwapFacet.swapExact.selector;
    stableSwapFacetSelectors[13] = StableSwapFacet.addSwapLiquidity.selector;
    stableSwapFacetSelectors[14] = StableSwapFacet.removeSwapLiquidity.selector;
    stableSwapFacetSelectors[15] = StableSwapFacet.removeSwapLiquidityOneToken.selector;
    stableSwapFacetSelectors[16] = StableSwapFacet.removeSwapLiquidityImbalance.selector;
    stableSwapFacetSelectors[17] = StableSwapFacet.initializeSwap.selector;
    stableSwapFacetSelectors[18] = StableSwapFacet.withdrawSwapAdminFees.selector;
    stableSwapFacetSelectors[19] = StableSwapFacet.setSwapAdminFee.selector;
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

  function getVersionFacetCut(address _versionFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory versionFacetSelectors = new bytes4[](1);
    versionFacetSelectors[0] = VersionFacet.VERSION.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _versionFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: versionFacetSelectors
      });
  }

  function getTestSetterFacetCut(address _testSetterFacetFacet) internal pure returns (IDiamondCut.FacetCut memory) {
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
    proposedOwnableFacet = new ProposedOwnableFacet();
    relayerFacet = new RelayerFacet();
    routersFacet = new RoutersFacet();
    stableSwapAsset = new StableSwapFacet();
    versionFacet = new VersionFacet();
    testSetterFacet = new TestSetterFacet();
  }

  function getFacetCuts() internal view returns (IDiamondCut.FacetCut[] memory) {
    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](11);
    facetCuts[0] = getTestSetterFacetCut(address(testSetterFacet));
    facetCuts[1] = getDiamondCutFacetCut(address(diamondCutFacet));
    facetCuts[2] = getDiamondLoupeFacetCut(address(diamondLoupeFacet));
    facetCuts[3] = getAssetFacetCut(address(assetFacet));
    facetCuts[4] = getBridgeFacetCut(address(bridgeFacet));
    facetCuts[5] = getNomadFacetCut(address(nomadFacet));
    facetCuts[6] = getProposedOwnableFacetCut(address(proposedOwnableFacet));
    facetCuts[7] = getRelayerFacetCut(address(relayerFacet));
    facetCuts[8] = getRoutersFacetCut(address(routersFacet));
    facetCuts[9] = getStableSwapFacetCut(address(stableSwapAsset));
    facetCuts[10] = getVersionFacetCut(address(versionFacet));

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
