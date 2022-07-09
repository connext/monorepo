import { Wallet } from "ethers";
import { ChainData, Logger } from "@connext/nxtp-utils";
import { ConnextContractInterfaces } from "@connext/nxtp-txservice";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { Web3Signer } from "@connext/nxtp-adapters-web3signer";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import Rabbit from "foo-foo-mq";

import { NxtpRouterConfig } from "../config";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    cache: StoreManager; // Used to cache important data locally.
    wallet: Wallet | Web3Signer; // Used for signing metatxs for bids.
    subgraph: SubgraphReader; // Aggregates subgraphs in a FallbackSubgraph for each chain.
    contracts: ConnextContractInterfaces; // Used to read and write to smart contracts.
  };
  config: NxtpRouterConfig;
  chainData: Map<string, ChainData>;
  routerAddress: string;
  mqClient: typeof Rabbit;
};
