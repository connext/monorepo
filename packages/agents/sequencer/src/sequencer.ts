import { fastify } from "fastify";
import pino from "pino";
import { Logger, getChainData, createRequestContext, createMethodContext, RequestContext } from "@connext/nxtp-utils";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import { ChainReader } from "@connext/nxtp-txservice";

import { SequencerConfig } from "./lib/entities";
import { getConfig } from "./config";
import { AppContext } from "./context";
import { setupHandlers } from "./handlers";

const context: AppContext = {} as any;

export const getContext = (): AppContext => {
  if (!context || Object.keys(context).length === 0) {
    throw new Error("Context not created");
  }
  return context;
};

export const makeSequencer = async () => {
  const requestContext = createRequestContext("makeSequencer");
  const methodContext = createMethodContext(makeSequencer.name);
  try {
    context.adapters = {} as any;
    context.logger = new Logger({ level: "debug" });

    context.logger.info("Setting up Sequencer", requestContext, methodContext, {});
    // Get ChainData and parse out configuration.
    const chainData = await getChainData();
    if (!chainData) {
      throw new Error("Could not get chain data");
    }
    context.chainData = chainData;
    context.config = await getConfig();

    // Set up adapters.
    context.adapters.cache = await setupCache(context.config.redisUrl!, context.logger, requestContext);

    context.adapters.subgraph = await setupSubgraphReader(context.config, context.logger, requestContext);

    context.adapters.chainreader = new ChainReader(
      context.logger.child({ module: "ChainReader" }),
      context.config.chains as any,
    );

    // Create server, set up routes, and start listening.
    const server = fastify({ logger: pino({ level: context.config.logLevel }) });
    setupHandlers(server);
    await server.listen(context.config.server.listenPort);

    context.logger.info("Sequencer is Ready!!", requestContext, methodContext, {
      listenPort: context.config.server.listenPort,
    });
  } catch (error: any) {
    console.error("Error starting sequencer :'(", error);
    process.exit();
  }
};

export const setupCache = async (
  redisUrl: string,
  logger: Logger,
  requestContext: RequestContext,
): Promise<StoreManager> => {
  const methodContext = createMethodContext(setupCache.name);

  logger.info("cache instance setup in progress...", requestContext, methodContext, {});

  const cacheInstance = StoreManager.getInstance({
    redis: { url: redisUrl },
    logger: logger.child({ module: "StoreManager" }),
  });

  logger.info("cache instance setup is done!", requestContext, methodContext, {
    redisUrl: redisUrl,
  });

  return cacheInstance;
};

export const setupSubgraphReader = async (
  sequencerConfig: SequencerConfig,
  logger: Logger,
  requestContext: RequestContext,
): Promise<SubgraphReader> => {
  const methodContext = createMethodContext(setupSubgraphReader.name);

  logger.info("subgrah reader setup in progress...", requestContext, methodContext, {});
  const subgraphReader = await SubgraphReader.create({
    // Separate out relevant subgraph chain config.
    chains: Object.entries(sequencerConfig.chains).reduce(
      (obj, [chainId, config]) => ({
        ...obj,
        [chainId]: config.subgraph,
      }),
      {},
    ),
  });

  logger.info("subgrah reader setup is done!", requestContext, methodContext, {});

  return subgraphReader;
};
