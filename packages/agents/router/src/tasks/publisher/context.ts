import { ChainData, Logger } from "@connext/utils";
import { SubgraphReader } from "@connext/adapters-subgraph";
import { StoreManager } from "@connext/adapters-cache";
import Rabbit from "foo-foo-mq";

import { RouterConfig } from "../../config";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    cache: StoreManager; // Used to cache important data locally.
    subgraph: SubgraphReader; // Aggregates subgraphs in a FallbackSubgraph for each chain.
    mqClient: typeof Rabbit;
  };
  config: RouterConfig;
  chainData: Map<string, ChainData>;
  routerAddress: string;
};
