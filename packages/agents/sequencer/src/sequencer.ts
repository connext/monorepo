import { Logger, getChainData, createRequestContext, createMethodContext, RequestContext } from "@connext/nxtp-utils";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import { ChainReader } from "@connext/nxtp-txservice";

import { SequencerConfig } from "./lib/entities";
import { getConfig } from "./config";
import { AppContext } from "./context";
import { bindServer } from "./bindings/server";

const context: AppContext = {} as any;

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
      context.config.chains,
    );

    // Create server, set up routes, and start listening.
    await bindServer(context);

    context.logger.info("Sequencer is Ready!!", requestContext, methodContext, {
      port: context.config.server.port,
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

  logger.info("Cache instance setup in progress...", requestContext, methodContext, {});

  const cacheInstance = StoreManager.getInstance({
    redis: { url: redisUrl },
    logger: logger.child({ module: "StoreManager" }),
  });

  logger.info("Cache instance setup is done!", requestContext, methodContext, {
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

  logger.info("Subgraph reader setup in progress...", requestContext, methodContext, {});
  // Separate out relevant subgraph chain config.
  const chains: { [chain: string]: any } = {};
  Object.entries(sequencerConfig.chains).forEach(([chainId, config]) => {
    chains[chainId] = config.subgraph;
  });
  const subgraphReader = await SubgraphReader.create({
    chains,
  });

  logger.info("Subgraph reader setup is done!", requestContext, methodContext, {});
  return subgraphReader;
};
