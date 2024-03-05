import { Deployment } from "../../helpers";

export const FACET_CONTRACTS = [
  "DiamondLoupeFacet",
  "TokenFacet",
  "BridgeFacet",
  "InboxFacet",
  "ProposedOwnableFacet",
  "PortalFacet",
  "RelayerFacet",
  "RoutersFacet",
  "StableSwapFacet",
  "SwapAdminFacet",
  "DiamondCutFacet",
  "DiamondInit",
] as const;

type FacetDeployments = Record<(typeof FACET_CONTRACTS)[number], Deployment>;

export type ExecutionUpgradeDeployments = FacetDeployments & {
  // Connext diamond
  Connext: Deployment;
};
