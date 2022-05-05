import { ChainData } from "@connext/nxtp-utils";

import { SubgraphMap } from "../entities";
import { PrefixInvalid } from "../errors";

import { getMeshOptions } from "./shared";

export const create = async (chaindata: Map<string, ChainData>): Promise<SubgraphMap> => {
  const meshOptions = await getMeshOptions();
  const names = meshOptions.sources.map((source) => source.name);

  // Parse the Network names from the subgraph prefix names in the mesh config.
  const networks = names.map((name) => {
    const result = name.match(/Connext_(.*)$/);
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
        prefix: chainData.network,
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
  return config;
};
