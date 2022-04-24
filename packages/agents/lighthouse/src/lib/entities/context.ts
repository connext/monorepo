import { ChainData, Logger } from "@connext/nxtp-utils";
import { ConnextContractInterfaces, ChainReader } from "@connext/nxtp-txservice";

import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";

import { NxtpLighthouseConfig } from "../../config";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    subgraph: SubgraphReader; // Aggregates subgraphs in a FallbackSubgraph for each chain.
    // cache: StoreManager; // Used to cache important data locally.
    chainreader: ChainReader; // For reading and executing txs on blockchain using RPC providers.
    contracts: ConnextContractInterfaces; // Used to read and write to smart contracts.
  };
  config: NxtpLighthouseConfig;
  chainData: Map<string, ChainData>;
};
