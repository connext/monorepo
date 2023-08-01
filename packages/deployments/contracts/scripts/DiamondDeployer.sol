// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import {DiamondCutFacet} from "../contracts/core/connext/facets/DiamondCutFacet.sol";
import {DiamondLoupeFacet} from "../contracts/core/connext/facets/DiamondLoupeFacet.sol";
import {DiamondInit, IConnectorManager} from "../contracts/core/connext/facets/upgrade-initializers/DiamondInit.sol";
import {TokenFacet} from "../contracts/core/connext/facets/TokenFacet.sol";
import {BridgeFacet} from "../contracts/core/connext/facets/BridgeFacet.sol";
import {InboxFacet} from "../contracts/core/connext/facets/InboxFacet.sol";
import {ProposedOwnableFacet} from "../contracts/core/connext/facets/ProposedOwnableFacet.sol";
import {RelayerFacet} from "../contracts/core/connext/facets/RelayerFacet.sol";
import {RoutersFacet} from "../contracts/core/connext/facets/RoutersFacet.sol";
import {StableSwapFacet} from "../contracts/core/connext/facets/StableSwapFacet.sol";
import {SwapAdminFacet} from "../contracts/core/connext/facets/SwapAdminFacet.sol";
import {PortalFacet} from "../contracts/core/connext/facets/PortalFacet.sol";
import {TransferInfo} from "../contracts/core/connext/libraries/LibConnextStorage.sol";
import {IDiamondCut} from "../contracts/core/connext/interfaces/IDiamondCut.sol";

import {console2 as console} from "forge-std/console2.sol";

import {Connext} from "../contracts_forge/utils/Connext.sol";
import {Deployer} from "./Deployer.sol";
import {DiamondHelper} from "./DiamondHelper.sol";

abstract contract DiamondDeployer is Deployer, DiamondHelper {
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

  function deployDiamond(
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

    connextDiamondProxy = new Connext(msg.sender, address(diamondInit), initCallData, getFacetCuts());
    save("Connext_DiamondProxy", address(connextDiamondProxy));
    console.log("Connext_DiamondProxy deployed at %s", address(connextDiamondProxy));

    return address(connextDiamondProxy);
  }

  function deployFacets() internal {
    diamondCutFacet = new DiamondCutFacet();
    save("DiamondCutFacet", address(diamondCutFacet));
    console.log("DiamondCutFacet deployed at %s", address(diamondCutFacet));

    diamondLoupeFacet = new DiamondLoupeFacet();
    save("DiamondLoupeFacet", address(diamondLoupeFacet));
    console.log("DiamondLoupeFacet deployed at %s", address(diamondLoupeFacet));

    diamondInit = new DiamondInit();
    save("DiamondInit", address(diamondInit));
    console.log("DiamondInit deployed at %s", address(diamondInit));

    tokenFacet = new TokenFacet();
    save("TokenFacet", address(tokenFacet));
    console.log("TokenFacet deployed at %s", address(tokenFacet));

    bridgeFacet = new BridgeFacet();
    save("BridgeFacet", address(bridgeFacet));
    console.log("BridgeFacet deployed at %s", address(bridgeFacet));

    inboxFacet = new InboxFacet();
    save("InboxFacet", address(inboxFacet));
    console.log("InboxFacet deployed at %s", address(inboxFacet));

    proposedOwnableFacet = new ProposedOwnableFacet();
    save("ProposedOwnableFacet", address(proposedOwnableFacet));
    console.log("ProposedOwnableFacet deployed at %s", address(proposedOwnableFacet));

    relayerFacet = new RelayerFacet();
    save("RelayerFacet", address(relayerFacet));
    console.log("RelayerFacet deployed at %s", address(relayerFacet));

    routersFacet = new RoutersFacet();
    save("RoutersFacet", address(routersFacet));
    console.log("RoutersFacet deployed at %s", address(routersFacet));

    stableSwapFacet = new StableSwapFacet();
    save("StableSwapFacet", address(stableSwapFacet));
    console.log("StableSwapFacet deployed at %s", address(stableSwapFacet));

    swapAdminFacet = new SwapAdminFacet();
    save("SwapAdminFacet", address(swapAdminFacet));
    console.log("SwapAdminFacet deployed at %s", address(swapAdminFacet));

    portalFacet = new PortalFacet();
    save("PortalFacet", address(portalFacet));
    console.log("PortalFacet deployed at %s", address(portalFacet));
  }

  function getFacetCuts() internal returns (IDiamondCut.FacetCut[] memory) {
    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](11);
    facetCuts[0] = generateFacetCuts(address(diamondCutFacet), "DiamondCutFacet");
    facetCuts[1] = generateFacetCuts(address(diamondLoupeFacet), "DiamondLoupeFacet");
    facetCuts[2] = generateFacetCuts(address(tokenFacet), "TokenFacet");
    facetCuts[3] = generateFacetCuts(address(bridgeFacet), "BridgeFacet");
    facetCuts[4] = generateFacetCuts(address(inboxFacet), "InboxFacet");
    facetCuts[5] = generateFacetCuts(address(proposedOwnableFacet), "ProposedOwnableFacet");
    facetCuts[6] = generateFacetCuts(address(relayerFacet), "RelayerFacet");
    facetCuts[7] = generateFacetCuts(address(routersFacet), "RoutersFacet");
    facetCuts[8] = generateFacetCuts(address(stableSwapFacet), "StableSwapFacet");
    facetCuts[9] = generateFacetCuts(address(swapAdminFacet), "SwapAdminFacet");
    facetCuts[10] = generateFacetCuts(address(portalFacet), "PortalFacet");

    return facetCuts;
  }

  function generateFacetCuts(
    address _facetAddress,
    string memory _facetName
  ) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory selectors = generateSelectors(_facetName);
    return (
      IDiamondCut.FacetCut({
        facetAddress: address(_facetAddress),
        action: IDiamondCut.FacetCutAction.Add,
        functionSelectors: selectors
      })
    );
  }
}
