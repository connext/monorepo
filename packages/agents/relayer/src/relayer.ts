import { Logger, getChainData, RequestContext, createLoggingContext, createMethodContext } from "@connext/nxtp-utils";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import { ChainReader, getContractInterfaces, contractDeployments } from "@connext/nxtp-txservice";

import { RelayerConfig, AppContext } from "./lib/entities";
import { getConfig } from "./config";
import { bindServer } from "./bindings";

const context: AppContext = {} as any;
export const getContext = () => context;

export const makeRelayer = async (_configOverride?: RelayerConfig) => {
  const { requestContext, methodContext } = createLoggingContext(makeRelayer.name);
  try {
    context.adapters = {} as any;

    // Get ChainData and parse out configuration.
    const chainData = await getChainData();
    if (!chainData) {
      throw new Error("Could not get chain data");
    }
    context.chainData = chainData;
    context.config = _configOverride ?? (await getConfig(chainData, contractDeployments));
    context.logger = new Logger({ level: context.config.logLevel });
    context.logger.info("Relayer config generated.", requestContext, methodContext, { config: context.config });

    // Set up adapters.
    context.adapters.cache = await setupCache(context.config.redis, context.logger, requestContext);

    context.adapters.chainreader = new ChainReader(
      context.logger.child({ module: "ChainReader", level: context.config.logLevel }),
      context.config.chains,
    );

    context.adapters.contracts = getContractInterfaces();

    // Create server, set up routes, and start listening.
    await bindServer();

    context.logger.info("Relayer has been activated.", requestContext, methodContext, {
      port: context.config.server.port,
    });
  } catch (error: any) {
    console.error("Error starting Relayer! D: Who could have done this?", error);
    process.exit();
  }
};

export const setupCache = async (
  redis: { host?: string; port?: number },
  logger: Logger,
  requestContext: RequestContext,
): Promise<StoreManager> => {
  const methodContext = createMethodContext(setupCache.name);

  logger.info("Cache instance setup in progress...", requestContext, methodContext, {});

  const cacheInstance = StoreManager.getInstance({
    redis: { host: redis.host, port: redis.port, instance: undefined },
    mock: !redis.host || !redis.port,
    logger: logger.child({ module: "StoreManager" }),
  });

  logger.info("Cache instance setup is done!", requestContext, methodContext, {
    host: redis.host,
    port: redis.port,
  });
  return cacheInstance;
};
