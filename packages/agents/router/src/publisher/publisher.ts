import {
  createMethodContext,
  createRequestContext,
  getChainData,
  jsonifyError,
  Logger,
  RequestContext,
  ChainData,
} from "@connext/nxtp-utils";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import { contractDeployments } from "@connext/nxtp-txservice";
import axios from "axios";
import rabbit from "foo-foo-mq";

import { getConfig, NxtpRouterConfig } from "../config";
import { bindMetrics } from "../bindings";

import { AppContext } from "./context";
import { bindSubgraph } from "./bindings/subgraph";

export const XCALL_QUEUE = "xcalls";
export const MQ_EXCHANGE = "router";

// AppContext instance used for interacting with adapters, config, etc.
const context: AppContext = {} as any;
export const getContext = () => context;

export const makePublisher = async (_configOverride?: NxtpRouterConfig) => {
  const requestContext = createRequestContext("Publisher Init");
  const methodContext = createMethodContext(makePublisher.name);

  try {
    context.adapters = {} as any;

    /// MARK - Config.
    // Get ChainData and parse out configuration.
    context.chainData = await getChainData();
    context.config = _configOverride ?? (await getConfig(context.chainData, contractDeployments));

    /// MARK - Logger
    context.logger = new Logger({
      level: context.config.logLevel,
      name: context.routerAddress,
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
    });
    context.logger.info("Generated config.", requestContext, methodContext, {
      config: { ...context.config, mnemonic: context.config.mnemonic ? "*****" : "N/A" },
    });

    /// MARK - Adapters
    context.adapters.subgraph = await setupSubgraphReader(requestContext);
    context.adapters.cache = await setupCache(requestContext);
    context.adapters.mqClient = await setupMq(requestContext);

    /// MARK - Validation for auctionRoundDepth

    /// MARK - Cold Start Housekeeping
    try {
      const res = await axios.get(`${context.config.sequencerUrl}/ping`);
      context.logger.info("Ping response received from sequencer", requestContext, methodContext, {
        response: res.data,
      });
    } catch (e: unknown) {
      context.logger.error(
        "Ping error, could not reach sequencer. Exiting!",
        requestContext,
        methodContext,
        jsonifyError(e as Error),
      );
      process.exit(1);
    }
    // TODO: Cold start housekeeping cont'd.
    // - read subgraph to make sure router is approved
    // - read contract or subgraph for current liquidity in each asset, cache it
    // - read subgraph to make sure each asset is (still) approved
    // - bring cache up to speed
    // - make sure a relayer is configured for supported chains.

    /// MARK - Bindings
    await bindMetrics();
    await bindSubgraph();

    context.logger.info("Bindings initialized.", requestContext, methodContext);
    context.logger.info("Router boot complete!", requestContext, methodContext, {
      port: context.config.server.port,
      chains: [...Object.keys(context.config.chains)],
    });
    context.logger.info(
      `

        _|_|_|     _|_|     _|      _|   _|      _|   _|_|_|_|   _|      _|   _|_|_|_|_|
      _|         _|    _|   _|_|    _|   _|_|    _|   _|           _|  _|         _|
      _|         _|    _|   _|  _|  _|   _|  _|  _|   _|_|_|         _|           _|
      _|         _|    _|   _|    _|_|   _|    _|_|   _|           _|  _|         _|
        _|_|_|     _|_|     _|      _|   _|      _|   _|_|_|_|   _|      _|       _|

      `,
    );
  } catch (e: unknown) {
    console.error("Error starting router. Sad! :(", e);
    process.exit();
  }
};

export const setupSubgraphReader = async (requestContext: RequestContext): Promise<SubgraphReader> => {
  const { logger, chainData, config } = context;
  const methodContext = createMethodContext(setupSubgraphReader.name);

  const allowedDomains = [...Object.keys(config.chains)];
  const allowedChainData: Map<string, ChainData> = new Map();
  for (const allowedDomain of allowedDomains) {
    if (chainData.has(allowedDomain)) {
      allowedChainData.set(allowedDomain, chainData.get(allowedDomain)!);
    }
  }
  logger.info("Subgraph reader setup in progress...", requestContext, methodContext, { allowedChainData });
  const subgraphReader = await SubgraphReader.create(allowedChainData, config.environment, config.subgraphPrefix);

  // Pull support for domains that don't have a subgraph.
  const supported: Record<string, boolean> = subgraphReader.supported;
  for (const domain of Object.keys(supported)) {
    // If the domain is set to false, it indicates the SubgraphReader did not find active subgraphs for that domain.
    if (!supported[domain]) {
      delete context.config.chains[domain];
    }
  }

  logger.info("Subgraph reader setup is done!", requestContext, methodContext, {});

  return subgraphReader;
};

export const setupCache = async (requestContext: RequestContext): Promise<StoreManager> => {
  const {
    config: { redis },
    logger,
  } = context;

  const methodContext = createMethodContext("setupCache");
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

export const setupMq = async (requestContext: RequestContext): Promise<typeof rabbit> => {
  const { config, logger } = context;
  const methodContext = createMethodContext("setupMq");
  const host = config.messageQueueUrl;
  logger.info("Message queue setup in progress...", requestContext, methodContext, { host });
  await rabbit.configure({
    connection: { host: "localhost", port: 5672 },
    queues: [{ name: XCALL_QUEUE }],
    exchanges: [{ name: MQ_EXCHANGE, type: "direct" }],
    bindings: [{ exchange: MQ_EXCHANGE, target: XCALL_QUEUE }],
  });
  logger.info("Message queue setup is done!", requestContext, methodContext, {
    host,
  });
  return rabbit;
};
