import { ChainData, Logger } from "@connext/nxtp-utils";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { ChainReader } from "@connext/nxtp-txservice";

import { SequencerConfig } from "./lib/entities";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    subgraph: SubgraphReader; // Aggregates subgraphs in a FallbackSubgraph for each chain.
    cache: StoreManager; // Used to cache important data locally.
    chainreader: ChainReader; // For reading blockchain using RPC providers.
  };
  config: SequencerConfig;
  chainData: Map<string, ChainData>;
};
