import { resolve } from "path";
import { readFileSync } from "fs";

import { Contract, ContractInterface } from "ethers";

import { Env } from "../../../utils";
import { getContract, Deployment } from "../../helpers";
import { getNetworkForkName } from "../../../config";

import { ExecutionUpgradeDeployments, FACET_CONTRACTS } from "./types";

export const getDeployments = (chainId: string, env: Env): ExecutionUpgradeDeployments => {
  const isStaging = env === "staging";

  // Get all the facets
  const facets: any = {};
  FACET_CONTRACTS.forEach((name) => {
    facets[name] = getFacetForkDeployment(chainId, env, name);
  });

  // Return fork facets and "official" connext to generate cuts
  // NOTE: the official connext will be present on the fork chain, so the addresses
  // should be the same
  return {
    Connext: getContract("Connext_DiamondProxy", chainId, isStaging),
    ...facets,
  };
};

const getFacetForkDeployment = (chainId: string, env: Env, name: string): Deployment => {
  const suffix = env === "staging" ? "Staging" : "";
  // Facet deployments will not be in `deployments.json` but instead in the fork
  // directory of deployments
  const path = resolve(
    `./deployments/${getNetworkForkName(+chainId)}/${
      name === "DiamondLoupeFacet" ? "_DefaultDiamondLoupeFacet" : name + suffix
    }.json`,
  );
  const artifact = JSON.parse(readFileSync(path, { encoding: "utf8" }));
  return {
    name,
    abi: artifact.abi,
    address: artifact.address,
    contract: new Contract(artifact.address as string, artifact.abi as ContractInterface),
  };
};
