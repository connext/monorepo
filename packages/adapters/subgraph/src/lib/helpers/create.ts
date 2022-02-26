import { FallbackSubgraph, SubgraphDomain } from "@connext/nxtp-utils";

import { Sdk as RuntimeSdk } from "../subgraphs/runtime/graphqlsdk";
import { SubgraphReaderConfig, SubgraphMap } from "../entities";
import { getRuntimeSdk } from "../..";

export const create = async (config: SubgraphReaderConfig): Promise<SubgraphMap> => {
  const subgraphMap: SubgraphMap = new Map();
  for (const chain of Object.keys(config.chains)) {
    const chainId = chain;
    const { maxLag, runtime: runtimeUrls } = config.chains[chain];
    subgraphMap.set(chainId, {
      runtime: new FallbackSubgraph<RuntimeSdk>(
        Number(chainId),
        (url: string) => getRuntimeSdk(url),
        maxLag,
        SubgraphDomain.RUNTIME,
        runtimeUrls,
      ),
    });
  }

  return subgraphMap;
};
