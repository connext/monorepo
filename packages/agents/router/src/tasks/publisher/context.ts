import { ChainData, Logger } from "@connext/nxtp-utils";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import Rabbit from "foo-foo-mq";

import { NxtpRouterConfig } from "../../config";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    cache: StoreManager; // Used to cache important data locally.
    subgraph: SubgraphReader; // Aggregates subgraphs in a FallbackSubgraph for each chain.
    mqClient: typeof Rabbit;
  };
  config: NxtpRouterConfig;
  chainData: Map<string, ChainData>;
  routerAddress: string;
};
