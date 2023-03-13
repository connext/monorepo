import _Deployments from "../../../../deployments.json";
import { Env } from "../../../utils";
import { getContract } from "../../helpers";

import { ExecutionUpgradeDeployments, FACET_CONTRACTS } from "./types";

const Deployments = _Deployments as any;

export const getDeployments = (chainId: string, env: Env): ExecutionUpgradeDeployments => {
  const [deployments] = Deployments[chainId];
  if (!deployments) {
    throw new Error(`No deployments found for chain ${chainId}!`);
  }
  const contracts = deployments.contracts as { [contract: string]: any };
  if (!contracts) {
    throw new Error(`No contracts found under deployments for chain ${chainId}!`);
  }
  const isStaging = env === "staging";

  const facets: any = {};
  FACET_CONTRACTS.forEach((name) => {
    if (name === "DiamondLoupeFacet") {
      facets[name] = getContract("_DefaultDiamondLoupeFacet", chainId, false);
      return;
    }
    facets[name] = getContract(name, chainId, isStaging);
  });

  // Get all the facets
  return {
    Connext: getContract("Connext_DiamondProxy", chainId, isStaging),
    ...facets,
  };
};
