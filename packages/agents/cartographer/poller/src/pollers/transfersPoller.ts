import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { createMethodContext, createRequestContext, getChainData, Logger } from "@connext/nxtp-utils";

import { getDatabase, closeDatabase } from "../adapters/database";
import { bindTransfers } from "../bindings";
import { CartographerConfig, getConfig } from "../config";
import { context } from "../shared";

export const makeTransfersPoller = async (_configOverride?: CartographerConfig) => {
  const requestContext = createRequestContext("Transfers Poller Init");
  const methodContext = createMethodContext(makeTransfersPoller.name);
  context.adapters = {} as any;

  /// MARK - Config
  // Get ChainData and parse out configuration.
  const chainData = await getChainData();
  context.chainData = chainData;
  context.config = _configOverride ?? (await getConfig());
  context.logger = new Logger({
    level: context.config.logLevel,
    name: "cartographer-transfers",
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
  });
  context.logger.info("Config generated", requestContext, methodContext, { config: context.config });

  /// MARK - Adapters
  context.adapters.subgraph = await SubgraphReader.create(
    chainData,
    context.config.environment,
    context.config.subgraphPrefix,
  );
  context.adapters.database = await getDatabase();

  /// MARK - Domains
  // Filter out the supported domains from the subgraph.
  const supported = context.adapters.subgraph.supported;
  context.domains = Object.keys(context.config.chains).filter((domain) => supported[domain]);

  /// MARK - Bindings
  context.logger.info("Transfers Poller initialized!", requestContext, methodContext, {
    domains: context.domains,
  });
  console.log(
    `

      _|_|_|     _|_|     _|      _|   _|      _|   _|_|_|_|   _|      _|   _|_|_|_|_|
    _|         _|    _|   _|_|    _|   _|_|    _|   _|           _|  _|         _|
    _|         _|    _|   _|  _|  _|   _|  _|  _|   _|_|_|         _|           _|
    _|         _|    _|   _|    _|_|   _|    _|_|   _|           _|  _|         _|
      _|_|_|     _|_|     _|      _|   _|      _|   _|_|_|_|   _|      _|       _|

    `,
  );

  await bindTransfers();
  await closeDatabase();
};
