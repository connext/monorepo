import { Wallet } from "ethers";
import { Logger } from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";
import { AuctioneerAPI } from "@connext/nxtp-adapters-auctioneer";
import { TransactionCache } from "@connext/nxtp-adapters-cache";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { Web3Signer } from "@connext/nxtp-adapters-web3signer";

import { NxtpRouterConfig } from "./config";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    wallet: Wallet | Web3Signer; // Used for signing metatxs for bids.
    subgraph: SubgraphReader; // Aggregates subgraphs in a FallbackSubgraph for each chain.
    auctioneer: AuctioneerAPI; // Auctioneer HTTP API interface.
    cache: TransactionCache; // Used to cache important data locally.
    chainreader: ChainReader; // Used to read from the blockchain using RPC providers.
  };
  config: NxtpRouterConfig;
};
