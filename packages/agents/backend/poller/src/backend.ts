import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { ChainData, createMethodContext, createRequestContext, getChainData, Logger } from "@connext/nxtp-utils";

import { Database, getDatabase } from "./adapters/database";
import { bindPoller } from "./bindings";
import { BackendConfig, getConfig } from "./config";

export type AppContext = {
  logger: Logger;
  adapters: {
    subgraph: SubgraphReader; // Aggregates subgraphs in a FallbackSubgraph for each chain.
    database: Database; // Database adapter.
  };
  config: BackendConfig;
  chainData: Map<string, ChainData>;
  domains: string[]; // List of all supported domains.
};

const context: AppContext = {} as any;
export const getContext = () => context;

export const makeBackend = async (_configOverride?: BackendConfig) => {
  const requestContext = createRequestContext("Backend Init");
  const methodContext = createMethodContext(makeBackend.name);
  context.adapters = {} as any;

  /// MARK - Config
  // Get ChainData and parse out configuration.
  const chainData = await getChainData();
  context.chainData = chainData;
  context.config = _configOverride ?? (await getConfig());
  context.logger = new Logger({
    level: context.config.logLevel,
    name: "Backend",
  });
  context.logger.info("Config generated", requestContext, methodContext, { config: context.config });

  /// MARK - Adapters
  context.adapters.subgraph = await SubgraphReader.create(chainData, context.config.environment);
  context.adapters.database = await getDatabase();

  /// MARK - Domains
  // Filter out the supported domains from the subgraph.
  const supported = context.adapters.subgraph.supported;
  context.domains = Object.keys(supported).filter((domain) => supported[domain]);

  /// MARK - Bindings
  await bindPoller();

  context.logger.info("Backend initialized!", requestContext, methodContext, {
    domains: context.domains,
  });
  context.logger.info(`
    _|_|_|     _|_|     _|      _|   _|      _|   _|_|_|_|   _|      _|   _|_|_|_|_|
  _|         _|    _|   _|_|    _|   _|_|    _|   _|           _|  _|         _|
  _|         _|    _|   _|  _|  _|   _|  _|  _|   _|_|_|         _|           _|
  _|         _|    _|   _|    _|_|   _|    _|_|   _|           _|  _|         _|
    _|_|_|     _|_|     _|      _|   _|      _|   _|_|_|_|   _|      _|       _|
  `);
};
