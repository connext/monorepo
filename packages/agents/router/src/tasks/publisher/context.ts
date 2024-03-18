import { ChainData, Logger } from "@connext/nxtp-utils";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import Rabbit from "foo-foo-mq";
import { Web3Signer } from "@connext/nxtp-adapters-web3signer";
import { Wallet } from "ethers";

import { NxtpRouterConfig } from "../../config";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    wallet: Wallet | Web3Signer; // Used for signing metatxs for bids.
    cache: StoreManager; // Used to cache important data locally.
    subgraph: SubgraphReader; // Aggregates subgraphs in a FallbackSubgraph for each chain.
    mqClient: typeof Rabbit;
  };
  config: NxtpRouterConfig;
  chainData: Map<string, ChainData>;
  routerAddress: string;
};
