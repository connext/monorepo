import { Wallet } from "ethers";
import { Logger } from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";
import { SubgraphReader } from "@connext/nxtp-read-subgraph";

import { Auctioneer, Web3Signer, RouterCache } from "./adapters";
import { NxtpRouterConfig } from "./config";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    wallet: Wallet | Web3Signer; // Used for signing metatxs for bids.
    subgraph: SubgraphReader; // Aggregates subgraphs in a FallbackSubgraph for each chain.
    auctioneer: Auctioneer; // Auctioneer HTTP API interface.
    cache: RouterCache; // Used to cache important data locally.
    chainreader: ChainReader;
  };
  config: NxtpRouterConfig;
};
