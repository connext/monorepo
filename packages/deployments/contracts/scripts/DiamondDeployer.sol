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

import {Connext} from "../contracts_forge/utils/Connext.sol";

import {Script} from "forge-std/Script.sol";

abstract contract DiamondDeployer is Script {
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

    connextDiamondProxy = new Connext(address(this), address(diamondInit), initCallData, getFacetCuts());
    return address(connextDiamondProxy);
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

  function generateSelectors(string memory _facetName) internal returns (bytes4[] memory selectors) {
    string[] memory cmd = new string[](3);
    cmd[0] = "node";
    cmd[1] = "scripts/genSelectors.js";
    cmd[2] = _facetName;
    bytes memory res = vm.ffi(cmd);
    selectors = abi.decode(res, (bytes4[]));
  }
}
