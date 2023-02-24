import { writeFileSync } from "fs";

import { Contract, providers } from "ethers";
import commandLineArgs from "command-line-args";
import { FacetCut } from "hardhat-deploy/types";

import { getProposedFacetCuts } from "../../getProposedFacetCuts";
import { Env } from "../../utils";
import { hardhatNetworks } from "../../config";

import { getDeployments } from "./helpers";

export const optionDefinitions = [
  { name: "env", type: String },
  { name: "chains", type: Number, multiple: true },
];

export const getDiamondUpgradeProposal = async () => {
  let cmdArgs: any;
  try {
    cmdArgs = commandLineArgs(optionDefinitions);
  } catch (err: any) {
    throw new Error(`Parsing arguments failed, cmdArgs: ${process.argv}`);
  }

  // Validate command line arguments
  // const chains = [1, 10, 56, 100, 137, 42161];
  const { env, chains } = cmdArgs;
  if (!["staging", "production"].includes(env as string)) {
    throw new Error(`Environment should be either staging or production, env: ${env}`);
  }

  const chainCuts: Record<number, FacetCut[]> = {};
  for (const chain of chains) {
    // get the hardhat config
    const config: any = Object.values(hardhatNetworks).find((c: any) => c.chainId === chain);
    if (!config?.url) {
      throw new Error(`Could not find url for chainId: ${chain}`);
    }
    // get provider
    const provider = new providers.JsonRpcProvider(config.url as string);
    // get all the deployments
    const deployments = getDeployments(`${chain}`, env as Env);

    // generate the facet options
    const { Connext, ...facets } = deployments;
    const facetOptions = Object.entries(facets).map(([name, deployment]) => {
      return {
        name,
        contract: new Contract(deployment.address, deployment.abi, provider),
      };
    });

    // get the proposed cut
    const namedCuts = await getProposedFacetCuts(facetOptions, new Contract(Connext.address, Connext.abi, provider));
    // write to file without `name` field (matching contract call)
    chainCuts[chain] = namedCuts.map((cut) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { name, ...rest } = cut;
      return rest;
    });
  }

  // write output to json file
  writeFileSync("cuts.json", JSON.stringify(chainCuts), { encoding: "utf-8" });
};
