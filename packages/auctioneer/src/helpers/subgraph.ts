import { SubgraphReader, ReadSubgraphConfig } from "@connext/nxtp-adapters-subgraph";
import { ChainData } from "@connext/nxtp-utils";

const DEFAULT_SUBGRAPH_MAX_LAG = 40;

export const setupReadSubgraph = async (chainData: Map<string, ChainData>): Promise<SubgraphReader> => {
  const subgraphConfig: ReadSubgraphConfig = { chains: {} };
  Object.keys(chainData).map((chainId) => {
    subgraphConfig.chains[chainId] = {
      subgraph: {
        analytics: chainData.get(chainId)!.analyticsSubgraph ?? [],
        runtime: chainData.get(chainId)!.subgraph ?? [],
        maxLag: DEFAULT_SUBGRAPH_MAX_LAG,
      },
    };
  });

  const subgraph = new SubgraphReader();
  subgraph.create(subgraphConfig);

  return subgraph;
};
