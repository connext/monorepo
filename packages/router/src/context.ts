import { Wallet } from "ethers";
import { ChainData, Logger } from "@connext/nxtp-utils";
import { ChainReader, TransactionService } from "@connext/nxtp-txservice";
import { AuctioneerAPI } from "@connext/nxtp-adapters-auctioneer";
import { StoreManager } from "@connext/nxtp-adapters-cache";
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
    cache: StoreManager; // Used to cache important data locally.
    chainreader: ChainReader; // Used to read from the blockchain using RPC providers.
  };
  txService: TransactionService;
  config: NxtpRouterConfig;
  chainData: Map<string, ChainData>;
  routerAddress: string;
};
