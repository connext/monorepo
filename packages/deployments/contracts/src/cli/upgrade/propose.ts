import { Contract, providers } from "ethers";

import { getProposedFacetCuts } from "../../getProposedFacetCuts";
import { Env } from "../../utils";

import { getDeployments } from "./helpers";

export const getDiamondUpgradeProposal = async (chainId: number, provider: providers.JsonRpcProvider, env: Env) => {
  // get all the deployments
  const deployments = getDeployments(`${chainId}`, env);

  // generate the facet options
  const { Connext, ...facets } = deployments;
  const facetOptions = Object.entries(facets).map(([name, deployment]) => {
    return {
      name,
      contract: new Contract(deployment.address, deployment.abi, provider),
    };
  });

  // get the proposed cut
  const cuts = await getProposedFacetCuts(facetOptions, new Contract(Connext.address, Connext.abi, provider));
  console.log("got cuts", cuts);
  throw new Error("not done");
};
