import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { ChainData, getChainData, Logger } from "@connext/nxtp-utils";

import { Database, getDatabase } from "./adapters/database";
import { bindSubgraph } from "./bindings/subgraph";
import { BackendConfig, getConfig } from "./config";

export type AppContext = {
  logger: Logger;
  adapters: {
    subgraph: SubgraphReader; // Aggregates subgraphs in a FallbackSubgraph for each chain.
    database: Database; // Database adapter.
  };
  config: BackendConfig;
  chainData: Map<string, ChainData>;
};

const context: AppContext = {} as any;
export const getContext = () => context;

export const makeBackend = async () => {
  // Get ChainData and parse out configuration.
  const chainData = await getChainData();
  if (!chainData) {
    console.error("Could not get chain data");
    process.exit(1);
  }
  context.adapters = {} as any;
  context.chainData = chainData;
  context.config = await getConfig(chainData);
  context.logger = new Logger({
    level: context.config.logLevel,
    name: "Backend",
  });

  context.logger.info("Config generated", undefined, undefined, { config: context.config });

  const chains: { [chain: string]: any } = {};
  Object.entries(context.config.chains).forEach(([chainId, config]) => {
    chains[chainId] = config.subgraph;
  });

  // setup adapters
  context.adapters.subgraph = await SubgraphReader.create({
    chains,
  });
  context.adapters.database = await getDatabase();

  // setup bindings
  await bindSubgraph(context.config.subgraphPollInterval);

  context.logger.info(`Backend initialized!
    _|_|_|     _|_|     _|      _|   _|      _|   _|_|_|_|   _|      _|   _|_|_|_|_|
  _|         _|    _|   _|_|    _|   _|_|    _|   _|           _|  _|         _|
  _|         _|    _|   _|  _|  _|   _|  _|  _|   _|_|_|         _|           _|
  _|         _|    _|   _|    _|_|   _|    _|_|   _|           _|  _|         _|
    _|_|_|     _|_|     _|      _|   _|      _|   _|_|_|_|   _|      _|       _|
  `);
};
