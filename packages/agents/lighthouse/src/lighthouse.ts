import { logger } from "ethers";
import { createMethodContext, createRequestContext, getChainData, Logger, RequestContext } from "@connext/nxtp-utils";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { getContractInterfaces, ChainReader, contractDeployments } from "@connext/nxtp-txservice";

import { getConfig } from "./config";
import { bindSubgraph } from "./bindings";
import { AppContext } from "./lib/entities";

// AppContext instance used for interacting with adapters, config, etc.
const context: AppContext = {} as any;
export const getContext = () => context;

export const makeLighthouse = async () => {
  const requestContext = createRequestContext(makeLighthouse.name);
  const methodContext = createMethodContext(makeLighthouse.name);

  try {
    // Get ChainData and parse out configuration.
    const chainData = await getChainData();
    if (!chainData) {
      throw new Error("Could not get chain data");
    }
    context.adapters = {} as any;
    context.chainData = chainData;
    context.config = await getConfig(chainData, contractDeployments);

    // Make logger instance.
    context.logger = new Logger({
      level: context.config.logLevel,
      name: "lighthouse",
    });
    context.logger.info("Hello, World! Generated config!", requestContext, methodContext, {
      config: { ...context.config, mnemonic: "*****" },
    });

    // context.adapters.cache = await setupCache(requestContext);

    context.adapters.subgraph = await setupSubgraphReader(requestContext);

    context.adapters.chainreader = new ChainReader(
      context.logger.child({ module: "ChainReader" }),
      context.config.chains,
    );

    context.adapters.contracts = getContractInterfaces();

    // TODO: Cold start housekeeping.
    // - read subgraph to make sure router is approved
    // - read contract or subgraph for current liquidity in each asset, cache it
    // - read subgraph to make sure each asset is (still) approved
    // - bring cache up to speed

    // Set up bindings.

    await bindSubgraph(context.config.subgraphPollInterval!);
    // await bindCache();

    logger.info("Lighthouse ready!");
  } catch (e: unknown) {
    console.error("Error starting router. Sad! :(", e);
    process.exit();
  }
};

// export const setupCache = async (requestContext: RequestContext): Promise<StoreManager> => {
//   const {
//     config: { redis },
//     logger,
//   } = context;

//   const methodContext = createMethodContext("setupCache");
//   logger.info("Cache instance setup in progress...", requestContext, methodContext, {});

//   const cacheInstance = StoreManager.getInstance({
//     redis: { host: redis.host, port: redis.port, instance: undefined },
//     mock: !redis.host || !redis.port,
//     logger: logger.child({ module: "StoreManager" }),
//   });

//   logger.info("Cache instance setup is done!", requestContext, methodContext, {
//     host: redis.host,
//     port: redis.port,
//   });

//   return cacheInstance;
// };

export const setupSubgraphReader = async (requestContext: RequestContext): Promise<SubgraphReader> => {
  const { config: lighthouseConfig, logger } = context;
  const methodContext = createMethodContext(setupSubgraphReader.name);

  logger.info("Subgraph reader setup in progress...", requestContext, methodContext, {});
  // Separate out relevant subgraph chain config.
  const chains: { [chain: string]: any } = {};
  Object.entries(lighthouseConfig.chains).forEach(([chainId, config]) => {
    chains[chainId] = config.subgraph;
  });
  const subgraphReader = await SubgraphReader.create({
    chains,
  });

  logger.info("Subgraph reader setup is done!", requestContext, methodContext, {});
  return subgraphReader;
};
