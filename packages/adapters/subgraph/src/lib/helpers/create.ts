import { ChainData } from "@connext/nxtp-utils";

import { SubgraphMap } from "../entities";

import { getSubgraphNames } from "./graphclient";

export const getNetwork = (sourceName: string, env: string): RegExpMatchArray | null => {
  const result =
    env === "staging" ? sourceName.match(/Connext_Staging_(.*)$/) : sourceName.match(/Connext_(?!Staging)(.*)$/);
  return result;
};

export const create = async (
  chaindata: Map<string, ChainData>,
  env: "staging" | "production" = "production",
  prefixOverride?: string, // optional override for the prefix
): Promise<SubgraphMap> => {
  const names = await getSubgraphNames();

  // Parse the Network names from the subgraph prefix names in the mesh config.
  const networks = names
    .filter((name) => {
      const result = getNetwork(name, prefixOverride ? "production" : env);
      return !!result && (prefixOverride === "devnet" ? name.toLowerCase().includes("devnet") : true);
    })
    .map((name) => {
      const result = getNetwork(name, prefixOverride ? "production" : env);
      // Should be the first match group.
      return result![1].toLowerCase();
    });
  const config: SubgraphMap = {
    sources: {},
    supported: {},
    assetId: {},
  };
  const _networks = networks.map((n) => n.replace("test_", "").replace("devnet_", "").replace("local_", ""));
  [...chaindata.values()].forEach((chainData) => {
    if (_networks.includes(chainData.network)) {
      config.sources[chainData.domainId] = {
        domain: chainData.domainId,
        prefix: prefixOverride
          ? `${prefixOverride}${chainData.network}`
          : env === "staging"
          ? `${env}${chainData.network}`
          : chainData.network,
      };
      config.assetId[chainData.domainId] = { ...chainData.assetId };
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
