// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {DiamondCutFacet} from "../../contracts/core/connext/facets/DiamondCutFacet.sol";
import {DiamondLoupeFacet} from "../../contracts/core/connext/facets/DiamondLoupeFacet.sol";
import {DiamondInit, IConnectorManager} from "../../contracts/core/connext/facets/upgrade-initializers/DiamondInit.sol";
import {TokenFacet} from "../../contracts/core/connext/facets/TokenFacet.sol";
import {BridgeFacet} from "../../contracts/core/connext/facets/BridgeFacet.sol";
import {InboxFacet} from "../../contracts/core/connext/facets/InboxFacet.sol";
import {ProposedOwnableFacet} from "../../contracts/core/connext/facets/ProposedOwnableFacet.sol";
import {RelayerFacet} from "../../contracts/core/connext/facets/RelayerFacet.sol";
import {RoutersFacet} from "../../contracts/core/connext/facets/RoutersFacet.sol";
import {StableSwapFacet} from "../../contracts/core/connext/facets/StableSwapFacet.sol";
import {SwapAdminFacet} from "../../contracts/core/connext/facets/SwapAdminFacet.sol";
import {PortalFacet} from "../../contracts/core/connext/facets/PortalFacet.sol";
import {TransferInfo} from "../../contracts/core/connext/libraries/LibConnextStorage.sol";
import {IDiamondCut} from "../../contracts/core/connext/interfaces/IDiamondCut.sol";

import {Connext} from "./Connext.sol";

contract Deployer {
  Connext connextDiamondProxy;
  DiamondCutFacet diamondCutFacet;
  DiamondLoupeFacet diamondLoupeFacet;
  DiamondInit diamondInit;
  TokenFacet tokenFacet;
  BridgeFacet bridgeFacet;
  InboxFacet inboxFacet;
  ProposedOwnableFacet proposedOwnableFacet;
  RelayerFacet relayerFacet;
  RoutersFacet routersFacet;
  StableSwapFacet stableSwapFacet;
  SwapAdminFacet swapAdminFacet;
  PortalFacet portalFacet;

  function getDiamondCutFacetCut(address _diamondCutFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory diamondCutFacetSelectors = new bytes4[](4);
    diamondCutFacetSelectors[0] = DiamondCutFacet.diamondCut.selector;
    diamondCutFacetSelectors[1] = DiamondCutFacet.proposeDiamondCut.selector;
    diamondCutFacetSelectors[2] = DiamondCutFacet.rescindDiamondCut.selector;
    diamondCutFacetSelectors[3] = DiamondCutFacet.getAcceptanceTime.selector;
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

  function getTokenFacetCut(address _tokenFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory tokenFacetSelectors = new bytes4[](17);
    // NOTE: because you cannot differentiate between overloaded function selectors, you must calculate
    // them manually here.
    tokenFacetSelectors[0] = getSelector("canonicalToAdopted(bytes32)");
    tokenFacetSelectors[1] = getSelector("canonicalToAdopted(tuple(uint32,bytes32))");
    tokenFacetSelectors[2] = TokenFacet.adoptedToCanonical.selector;
    tokenFacetSelectors[3] = getSelector("canonicalToRepresentation(bytes32)");
    tokenFacetSelectors[4] = getSelector("canonicalToRepresentation(tuple(uint32,bytes32))");
    tokenFacetSelectors[5] = TokenFacet.representationToCanonical.selector;
    tokenFacetSelectors[6] = TokenFacet.getLocalAndAdoptedToken.selector;
    tokenFacetSelectors[7] = getSelector("approvedAssets(bytes32)");
    tokenFacetSelectors[8] = getSelector("approvedAssets(tuple(uint32,bytes32))");
    tokenFacetSelectors[9] = getSelector("adoptedToLocalExternalPools(bytes32)");
    tokenFacetSelectors[10] = getSelector("adoptedToLocalExternalPools(tuple(uint32,bytes32))");
    tokenFacetSelectors[11] = TokenFacet.setupAsset.selector;
    tokenFacetSelectors[12] = TokenFacet.setupAssetWithDeployedRepresentation.selector;
    tokenFacetSelectors[13] = TokenFacet.addStableSwapPool.selector;
    tokenFacetSelectors[14] = getSelector("removeAssetId(bytes32,address)");
    tokenFacetSelectors[15] = getSelector("removeAssetId(tuple(uint32,bytes32),address)");
    tokenFacetSelectors[16] = TokenFacet.updateDetails.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _tokenFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: tokenFacetSelectors
      });
  }

  function getBridgeFacetCut(address _bridgeFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory bridgeFacetSelectors = new bytes4[](19);
    // getters
    bridgeFacetSelectors[0] = BridgeFacet.routedTransfers.selector;
    bridgeFacetSelectors[1] = BridgeFacet.transferStatus.selector;
    bridgeFacetSelectors[2] = BridgeFacet.remote.selector;
    bridgeFacetSelectors[3] = BridgeFacet.domain.selector;
    bridgeFacetSelectors[4] = BridgeFacet.nonce.selector;
    bridgeFacetSelectors[5] = BridgeFacet.approvedSequencers.selector;

    // admin
    bridgeFacetSelectors[6] = BridgeFacet.addSequencer.selector;
    bridgeFacetSelectors[7] = BridgeFacet.removeSequencer.selector;
    bridgeFacetSelectors[8] = BridgeFacet.setXAppConnectionManager.selector;
    bridgeFacetSelectors[9] = BridgeFacet.enrollRemoteRouter.selector;

    // public:bridge
    bridgeFacetSelectors[10] = getSelector("xcall(uint32,address,address,address,uint256,uint256,bytes)");
    bridgeFacetSelectors[11] = getSelector("xcall(uint32,address,address,address,uint256,uint256,bytes,uint256)");
    bridgeFacetSelectors[12] = getSelector("xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes)");
    bridgeFacetSelectors[13] = getSelector(
      "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes,uint256)"
    );
    bridgeFacetSelectors[14] = BridgeFacet.execute.selector;
    bridgeFacetSelectors[15] = getSelector("bumpTransfer(bytes32)");
    bridgeFacetSelectors[16] = getSelector("bumpTransfer(bytes32,address,uint256)");
    bridgeFacetSelectors[17] = BridgeFacet.forceUpdateSlippage.selector;
    bridgeFacetSelectors[18] = BridgeFacet.forceReceiveLocal.selector;

    return
      IDiamondCut.FacetCut({
        facetAddress: _bridgeFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: bridgeFacetSelectors
      });
  }

  function getInboxFacetCut(address _inboxFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory inboxFacetSelectors = new bytes4[](1);
    inboxFacetSelectors[0] = InboxFacet.handle.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _inboxFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: inboxFacetSelectors
      });
  }

  function getProposedOwnableFacetCut(
    address _proposedOwnableFacet
  ) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory proposedOwnableFacetSelectors = new bytes4[](13);
    proposedOwnableFacetSelectors[0] = ProposedOwnableFacet.owner.selector;
    proposedOwnableFacetSelectors[1] = ProposedOwnableFacet.routerAllowlistRemoved.selector;
    proposedOwnableFacetSelectors[2] = ProposedOwnableFacet.proposed.selector;
    proposedOwnableFacetSelectors[3] = ProposedOwnableFacet.proposedTimestamp.selector;
    proposedOwnableFacetSelectors[4] = ProposedOwnableFacet.routerAllowlistTimestamp.selector;
    proposedOwnableFacetSelectors[5] = ProposedOwnableFacet.delay.selector;
    proposedOwnableFacetSelectors[6] = ProposedOwnableFacet.paused.selector;
    proposedOwnableFacetSelectors[7] = ProposedOwnableFacet.proposeRouterAllowlistRemoval.selector;
    proposedOwnableFacetSelectors[8] = ProposedOwnableFacet.removeRouterAllowlist.selector;
    proposedOwnableFacetSelectors[9] = ProposedOwnableFacet.proposeNewOwner.selector;
    proposedOwnableFacetSelectors[10] = ProposedOwnableFacet.acceptProposedOwner.selector;
    proposedOwnableFacetSelectors[11] = ProposedOwnableFacet.pause.selector;
    proposedOwnableFacetSelectors[12] = ProposedOwnableFacet.unpause.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _proposedOwnableFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: proposedOwnableFacetSelectors
      });
  }

  function getRelayerFacetCut(address _relayerFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory relayerFacetSelectors = new bytes4[](5);
    relayerFacetSelectors[0] = RelayerFacet.approvedRelayers.selector;
    relayerFacetSelectors[1] = RelayerFacet.relayerFeeVault.selector;
    relayerFacetSelectors[2] = RelayerFacet.setRelayerFeeVault.selector;
    relayerFacetSelectors[3] = RelayerFacet.addRelayer.selector;
    relayerFacetSelectors[4] = RelayerFacet.removeRelayer.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _relayerFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: relayerFacetSelectors
      });
  }

  function getRoutersFacetCut(address _routersFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory routersFacetSelectors = new bytes4[](24);
    routersFacetSelectors[0] = RoutersFacet.LIQUIDITY_FEE_NUMERATOR.selector;
    routersFacetSelectors[1] = RoutersFacet.LIQUIDITY_FEE_DENOMINATOR.selector;
    routersFacetSelectors[2] = RoutersFacet.getRouterApproval.selector;
    routersFacetSelectors[3] = RoutersFacet.getRouterRecipient.selector;
    routersFacetSelectors[4] = RoutersFacet.getRouterOwner.selector;
    routersFacetSelectors[5] = RoutersFacet.getProposedRouterOwner.selector;
    routersFacetSelectors[6] = RoutersFacet.getProposedRouterOwnerTimestamp.selector;
    routersFacetSelectors[7] = RoutersFacet.maxRoutersPerTransfer.selector;
    routersFacetSelectors[8] = RoutersFacet.routerBalances.selector;
    routersFacetSelectors[9] = RoutersFacet.getRouterApprovalForPortal.selector;
    routersFacetSelectors[10] = RoutersFacet.approveRouter.selector;
    routersFacetSelectors[11] = RoutersFacet.unapproveRouter.selector;
    routersFacetSelectors[12] = RoutersFacet.setMaxRoutersPerTransfer.selector;
    routersFacetSelectors[13] = RoutersFacet.setLiquidityFeeNumerator.selector;
    routersFacetSelectors[14] = RoutersFacet.approveRouterForPortal.selector;
    routersFacetSelectors[15] = RoutersFacet.unapproveRouterForPortal.selector;
    routersFacetSelectors[16] = RoutersFacet.setRouterRecipient.selector;
    routersFacetSelectors[17] = RoutersFacet.proposeRouterOwner.selector;
    routersFacetSelectors[18] = RoutersFacet.acceptProposedRouterOwner.selector;
    routersFacetSelectors[19] = RoutersFacet.initializeRouter.selector;
    routersFacetSelectors[20] = RoutersFacet.addRouterLiquidityFor.selector;
    routersFacetSelectors[21] = RoutersFacet.addRouterLiquidity.selector;
    routersFacetSelectors[22] = RoutersFacet.removeRouterLiquidityFor.selector;
    routersFacetSelectors[23] = RoutersFacet.removeRouterLiquidity.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _routersFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: routersFacetSelectors
      });
  }

  function getStableSwapFacetCut(address _stableSwapFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory stableSwapFacetSelectors = new bytes4[](20);
    stableSwapFacetSelectors[0] = StableSwapFacet.getSwapStorage.selector;
    stableSwapFacetSelectors[1] = StableSwapFacet.getSwapLPToken.selector;
    stableSwapFacetSelectors[2] = StableSwapFacet.getSwapA.selector;
    stableSwapFacetSelectors[3] = StableSwapFacet.getSwapAPrecise.selector;
    stableSwapFacetSelectors[4] = StableSwapFacet.getSwapToken.selector;
    stableSwapFacetSelectors[5] = StableSwapFacet.getSwapTokenIndex.selector;
    stableSwapFacetSelectors[6] = StableSwapFacet.getSwapTokenBalance.selector;
    stableSwapFacetSelectors[7] = StableSwapFacet.getSwapVirtualPrice.selector;
    stableSwapFacetSelectors[8] = StableSwapFacet.calculateSwap.selector;
    stableSwapFacetSelectors[9] = StableSwapFacet.calculateSwapTokenAmount.selector;
    stableSwapFacetSelectors[10] = StableSwapFacet.calculateRemoveSwapLiquidity.selector;
    stableSwapFacetSelectors[11] = StableSwapFacet.calculateRemoveSwapLiquidityOneToken.selector;
    stableSwapFacetSelectors[12] = StableSwapFacet.getSwapAdminBalance.selector;
    stableSwapFacetSelectors[13] = StableSwapFacet.swap.selector;
    stableSwapFacetSelectors[14] = StableSwapFacet.swapExact.selector;
    stableSwapFacetSelectors[15] = StableSwapFacet.swapExactOut.selector;
    stableSwapFacetSelectors[16] = StableSwapFacet.addSwapLiquidity.selector;
    stableSwapFacetSelectors[17] = StableSwapFacet.removeSwapLiquidity.selector;
    stableSwapFacetSelectors[18] = StableSwapFacet.removeSwapLiquidityOneToken.selector;
    stableSwapFacetSelectors[19] = StableSwapFacet.removeSwapLiquidityImbalance.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _stableSwapFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: stableSwapFacetSelectors
      });
  }

  function getSwapAdminFacetCut(address _swapAdminFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory adminFacetSelectors = new bytes4[](8);
    adminFacetSelectors[0] = SwapAdminFacet.initializeSwap.selector;
    adminFacetSelectors[1] = SwapAdminFacet.withdrawSwapAdminFees.selector;
    adminFacetSelectors[2] = SwapAdminFacet.setSwapAdminFee.selector;
    adminFacetSelectors[3] = SwapAdminFacet.setSwapFee.selector;
    adminFacetSelectors[4] = SwapAdminFacet.rampA.selector;
    adminFacetSelectors[5] = SwapAdminFacet.stopRampA.selector;
    adminFacetSelectors[6] = SwapAdminFacet.lpTokenTargetAddress.selector;
    adminFacetSelectors[7] = SwapAdminFacet.updateLpTokenTarget.selector;
    return
      IDiamondCut.FacetCut({
        facetAddress: _swapAdminFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: adminFacetSelectors
      });
  }

  function getPortalFacetCut(address _portalFacet) internal pure returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory portalFacetSelectors = new bytes4[](8);
    portalFacetSelectors[0] = PortalFacet.getAavePortalDebt.selector;
    portalFacetSelectors[1] = PortalFacet.getAavePortalFeeDebt.selector;
    portalFacetSelectors[2] = PortalFacet.aavePool.selector;
    portalFacetSelectors[3] = PortalFacet.aavePortalFee.selector;
    portalFacetSelectors[4] = PortalFacet.setAavePool.selector;
    portalFacetSelectors[5] = PortalFacet.setAavePortalFee.selector;
    portalFacetSelectors[6] = PortalFacet.repayAavePortal.selector;
    portalFacetSelectors[7] = PortalFacet.repayAavePortalFor.selector;

    return
      IDiamondCut.FacetCut({
        facetAddress: _portalFacet,
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: portalFacetSelectors
      });
  }

  function deployFacets() internal {
    diamondCutFacet = new DiamondCutFacet();
    diamondLoupeFacet = new DiamondLoupeFacet();
    diamondInit = new DiamondInit();
    tokenFacet = new TokenFacet();
    bridgeFacet = new BridgeFacet();
    inboxFacet = new InboxFacet();
    proposedOwnableFacet = new ProposedOwnableFacet();
    relayerFacet = new RelayerFacet();
    routersFacet = new RoutersFacet();
    stableSwapFacet = new StableSwapFacet();
    swapAdminFacet = new SwapAdminFacet();
    portalFacet = new PortalFacet();
  }

  function getFacetCuts() internal view returns (IDiamondCut.FacetCut[] memory) {
    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](11);
    facetCuts[0] = getDiamondCutFacetCut(address(diamondCutFacet));
    facetCuts[1] = getDiamondLoupeFacetCut(address(diamondLoupeFacet));
    facetCuts[2] = getTokenFacetCut(address(tokenFacet));
    facetCuts[3] = getBridgeFacetCut(address(bridgeFacet));
    facetCuts[4] = getInboxFacetCut(address(inboxFacet));
    facetCuts[5] = getProposedOwnableFacetCut(address(proposedOwnableFacet));
    facetCuts[6] = getRelayerFacetCut(address(relayerFacet));
    facetCuts[7] = getRoutersFacetCut(address(routersFacet));
    facetCuts[8] = getStableSwapFacetCut(address(stableSwapFacet));
    facetCuts[9] = getSwapAdminFacetCut(address(swapAdminFacet));
    facetCuts[10] = getPortalFacetCut(address(portalFacet));

    return facetCuts;
  }

  function deployConnext(
    uint256 domain,
    address xAppConnectionManager,
    uint256 acceptanceDelay,
    address lpTokenTargetAddress
  ) internal returns (address) {
    bytes memory initCallData = abi.encodeWithSelector(
      DiamondInit.init.selector,
      domain,
      xAppConnectionManager,
      acceptanceDelay,
      lpTokenTargetAddress
    );

    deployFacets();

    connextDiamondProxy = new Connext(address(this), address(diamondInit), initCallData, getFacetCuts());
    return address(connextDiamondProxy);
  }

  function getSelector(bytes memory fnSig) internal pure returns (bytes4) {
    return bytes4(keccak256(fnSig));
  }
}
