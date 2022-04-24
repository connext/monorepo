import { ChainData } from "@connext/nxtp-utils";

import { SubgraphReaderConfig } from "../entities";
import { getMeshOptions } from "./shared";

export const create = async (chaindata: Map<string, ChainData>): Promise<SubgraphReaderConfig> => {
  const meshOption = await getMeshOptions();
  const names = meshOption.sources.map((source) => source.name);
  const prefixes = names.map((name) => name.split("_")[1].toLowerCase());

  const sources: { [domain: string]: any } = {};

  [...chaindata.values()].forEach((chainData) => {
    if (prefixes.includes(chainData.network)) {
      sources.set(chainData.domainId, {
        domain: chainData.domainId,
        prefix: chainData.network,
      });
    } else {
      console.log(`Not configured yet in .graphclientrc.yml, domainId: ${chainData.domainId}`);
    }
  });

  return { sources };
};
