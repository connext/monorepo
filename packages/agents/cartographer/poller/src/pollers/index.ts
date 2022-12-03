import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { createMethodContext, createRequestContext, getChainData, Logger, sendHeartbeat } from "@connext/nxtp-utils";
import { closeDatabase, getDatabase } from "@connext/nxtp-adapters-database";

import { bind } from "../bindings";
import { CartographerConfig, getConfig } from "../config";
import { context } from "../shared";
import { runMigration } from "../lib/operations";

export const makePoller = async (_configOverride?: CartographerConfig) => {
  const requestContext = createRequestContext("Poller Init");
  context.adapters = {} as any;

  /// MARK - Config
  // Get ChainData and parse out configuration.
  const chainData = await getChainData();
  context.chainData = chainData;
  context.config = _configOverride ?? (await getConfig());

  context.logger = new Logger({
    level: context.config.logLevel,
    name: `cartographer-${context.config.service}`,
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
  });

  const methodContext = createMethodContext(`makePoller-${context.config.service})`);
  context.logger.info("Config generated", requestContext, methodContext, { config: context.config });

  /// MARK - Adapters
  context.adapters.subgraph = await SubgraphReader.create(
    chainData,
    context.config.environment,
    context.config.subgraphPrefix,
  );
  context.adapters.database = await getDatabase(context.config.database.url, context.logger);

  /// MARK - Domains
  // Filter out the supported domains from the subgraph.
  const supported = context.adapters.subgraph.supported;
  context.domains = Object.keys(context.config.chains).filter((domain) => supported[domain]);

  /// MARK - Bindings
  context.logger.info(`${context.config.service} poller initialized!`, requestContext, methodContext, {
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

  await runMigration(context);
  await bind(context);
  await closeDatabase();
  if (context.config.healthUrls[context.config.service] !== undefined) {
    const url = context.config.healthUrls[context.config.service]!;
    await sendHeartbeat(url, context.logger);
  }
};
