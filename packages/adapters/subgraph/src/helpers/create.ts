import { FallbackSubgraph, SubgraphDomain } from "@connext/nxtp-utils";

import { Sdk as RuntimeSdk } from "../runtime/graphqlsdk";
import { ReadSubgraphConfig, SubgraphMap } from "../types";
import { getRuntimeSdk } from "../";

export const create = async (config: ReadSubgraphConfig): Promise<SubgraphMap> => {
  const subgraphMap: SubgraphMap = new Map();
  for (const chain of Object.keys(config.chains)) {
    const chainId = chain;
    const { maxLag, runtime: runtimeUrls } = config.chains[chain].subgraph;
    subgraphMap.set(chainId, {
      runtime: new FallbackSubgraph<RuntimeSdk>(
        chainId,
        (url: string) => getRuntimeSdk(url),
        maxLag,
        SubgraphDomain.RUNTIME,
        runtimeUrls,
      ),
    });
  }

  return subgraphMap;
};
