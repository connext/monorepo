import { ChainData } from "@connext/nxtp-utils";

import { SubgraphMap } from "../entities";
import { PrefixInvalid } from "../errors";

import { getMeshOptions } from "./shared";

const getNetwork = (sourceName: string, env: string): RegExpMatchArray | null => {
  const result =
    env === "staging" ? sourceName.match(/Connext_Staging_(.*)$/) : sourceName.match(/Connext_(?!Staging)(.*)$/);
  return result;
};
export const create = async (
  chaindata: Map<string, ChainData>,
  env: "staging" | "production" = "production",
): Promise<SubgraphMap> => {
  const meshOptions = await getMeshOptions();
  const names = meshOptions.sources.map((source) => source.name);

  // Parse the Network names from the subgraph prefix names in the mesh config.
  const networks = names
    .filter((name) => {
      const result = getNetwork(name, env);
      return !!result;
    })
    .map((name) => {
      const result = getNetwork(name, env);
      if (!result) {
        throw new PrefixInvalid(name, result);
      }
      // Should be the first match group.
      return result[1].toLowerCase();
    });
  const config: SubgraphMap = {
    sources: {},
    supported: {},
  };
  [...chaindata.values()].forEach((chainData) => {
    if (networks.includes(chainData.network)) {
      config.sources[chainData.domainId] = {
        domain: chainData.domainId,
        prefix: env === "staging" ? `${env}${chainData.network}` : chainData.network,
      };
      config.supported[chainData.domainId] = true;
    } else {
      config.supported[chainData.domainId] = false;
    }
  });

  // Log any domains that were given in chaindata but not configured in the mesh config.
  const unsupportedDomains = Object.keys(config.supported).filter((domain) => !config.supported[domain]);
  if (unsupportedDomains.length > 0) {
    console.log(
      "Some domains are not configured .graphclientrc.yml. No subgraph support will be supplied for these domains." +
        ` domains: ${unsupportedDomains.join(", ")}`,
    );
  }

  console.log(config);
  return config;
};
