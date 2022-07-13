import { spawn } from "child_process";

import { logger as ethersLogger } from "ethers";
import {
  Logger,
  getChainData,
  RequestContext,
  createLoggingContext,
  createMethodContext,
  ChainData,
} from "@connext/nxtp-utils";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import { ChainReader, getContractInterfaces, contractDeployments } from "@connext/nxtp-txservice";
import Broker from "foo-foo-mq";

import { SequencerConfig } from "./lib/entities";
import { getConfig } from "./config";
import { AppContext } from "./lib/entities/context";
import { bindServer, bindSubscriber } from "./bindings";
import { setupRelayer } from "./adapters";
import { getHelpers } from "./lib/helpers";
import { getOperations } from "./lib/operations";

const context: AppContext = {} as any;
export const getContext = () => context;
export const msgContentType = "application/json";

export const makePublisher = async (_configOverride?: SequencerConfig) => {
  const { requestContext, methodContext } = createLoggingContext(makePublisher.name);
  try {
    context.adapters = {} as any;

    /// MARK - Config.
    // Get ChainData and parse out configuration.
    context.chainData = await getChainData();
    context.config = _configOverride ?? (await getConfig(context.chainData, contractDeployments));
    context.logger = new Logger({
      level: context.config.logLevel,
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
    });

    if (!context.config.messageQueue.publisher) return;

    context.logger.info("Publisher config generated.", requestContext, methodContext, { config: context.config });

    /// MARK - Adapters
    context.adapters.cache = await setupCache(context.config.redis, context.logger, requestContext);
    context.adapters.subgraph = await setupSubgraphReader(requestContext);
    context.adapters.chainreader = new ChainReader(
      context.logger.child({ module: "ChainReader", level: context.config.logLevel }),
      context.config.chains,
    );
    context.adapters.contracts = getContractInterfaces();
    context.adapters.relayer = await setupRelayer();

    /// MARK - Bindings
    // Create server, set up routes, and start listening.
    await setupPublisher(requestContext);
    await bindServer();

    context.logger.info("Sequencer boot complete!", requestContext, methodContext, {
      port: context.config.server.port,
      chains: [...Object.keys(context.config.chains)],
    });
    ethersLogger.info(
      `

          _|_|_|     _|_|     _|      _|   _|      _|   _|_|_|_|   _|      _|   _|_|_|_|_|
        _|         _|    _|   _|_|    _|   _|_|    _|   _|           _|  _|         _|
        _|         _|    _|   _|  _|  _|   _|  _|  _|   _|_|_|         _|           _|
        _|         _|    _|   _|    _|_|   _|    _|_|   _|           _|  _|         _|
          _|_|_|     _|_|     _|      _|   _|      _|   _|_|_|_|   _|      _|       _|

        `,
    );
  } catch (error: any) {
    console.error("Error starting publisher :'(", error);
    process.exit(1);
  }
};

export const execute = async (_configOverride?: SequencerConfig) => {
  const { requestContext, methodContext } = createLoggingContext(execute.name);
  const {
    auctions: { executeAuction },
  } = getOperations();
  try {
    context.adapters = {} as any;

    /// MARK - Config.
    // Get ChainData and parse out configuration.
    context.chainData = await getChainData();
    context.config = _configOverride ?? (await getConfig(context.chainData, contractDeployments));
    context.logger = new Logger({
      level: context.config.logLevel,
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
    });
    context.logger.info("Sequencer config generated.", requestContext, methodContext, { config: context.config });

    // Transfer ID is a CLI argument. Always provided by the parent
    const transferId = process.argv[2];

    // TODO: Which of these are not needed ?
    context.adapters.cache = await setupCache(context.config.redis, context.logger, requestContext);
    context.adapters.subgraph = await setupSubgraphReader(requestContext);
    context.adapters.chainreader = new ChainReader(
      context.logger.child({ module: "ChainReader", level: context.config.logLevel }),
      context.config.chains,
    );
    context.adapters.contracts = getContractInterfaces();
    context.adapters.relayer = await setupRelayer();

    await executeAuction(transferId, requestContext);
    context.logger.info("Executed", requestContext, methodContext, { transferId: transferId });
  } catch (error: any) {
    console.error("Error executing:'(", error);
    process.exit(1);
  }
  process.exit();
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

export const setupSubgraphReader = async (requestContext: RequestContext): Promise<SubgraphReader> => {
  const { chainData, logger, config } = getContext();
  const {
    auctions: { getMinimumBidsCountForRound },
  } = getHelpers();
  const methodContext = createMethodContext(setupSubgraphReader.name);

  const allowedDomains = [...Object.keys(config.chains)];
  const allowedChainData: Map<string, ChainData> = new Map();
  for (const allowedDomain of allowedDomains) {
    if (chainData.has(allowedDomain)) {
      allowedChainData.set(allowedDomain, chainData.get(allowedDomain)!);
    }
  }

  logger.info("Subgraph reader setup in progress...", requestContext, methodContext, { allowedChainData });
  const subgraphReader = await SubgraphReader.create(
    allowedChainData,
    context.config.environment,
    context.config.subgraphPrefix,
  );

  // Pull support for domains that don't have a subgraph.
  const supported: Record<string, boolean> = subgraphReader.supported;
  for (const domain of Object.keys(supported)) {
    // If the domain is set to false, it indicates the SubgraphReader did not find active subgraphs for that domain.
    if (!supported[domain]) {
      delete context.config.chains[domain];
    }
  }

  logger.info("Subgraph reader setup is done!", requestContext, methodContext, {});

  logger.info("Validating the auction round depth for each domain...");
  const maxRoutersPerTransfer = await subgraphReader.getMaxRoutersPerTransfer(Object.keys(supported));
  for (const domain of maxRoutersPerTransfer.keys()) {
    const configuredMaxRouters = getMinimumBidsCountForRound(config.auctionRoundDepth);
    if (maxRoutersPerTransfer.has(domain) && configuredMaxRouters > maxRoutersPerTransfer.get(domain)!) {
      logger.info("Validation error, Invalid auctionRoundDepth configured!", requestContext, methodContext, {
        domain,
        auctionRoundDepth: config.auctionRoundDepth,
        configured: configuredMaxRouters,
        onchain: maxRoutersPerTransfer.get(domain),
      });
      process.exit(1);
    }
  }
  return subgraphReader;
};

export const setupPublisher = async (requestContext: RequestContext): Promise<void> => {
  const { logger, config } = context;
  const methodContext = createMethodContext(setupPublisher.name);
  const {
    mq: { setupMQ },
  } = getOperations();

  logger.info("MQ publisher setup in progress...", requestContext, methodContext, {});

  await setupMQ(config);

  logger.info("MQ publisher setup is done!", requestContext, methodContext, {});
};

export const setupSubscriber = async (requestContext: RequestContext): Promise<void> => {
  const { logger, config } = context;
  const methodContext = createMethodContext(setupSubscriber.name);
  const {
    mq: { setupMQ },
  } = getOperations();

  logger.info("MQ subscriber setup in progress...", requestContext, methodContext, {});

  await setupMQ(config);

  logger.info("MQ subscriber setup is done!", requestContext, methodContext, {});
};

export const makeSubscriber = async (_configOverride?: SequencerConfig) => {
  const { requestContext, methodContext } = createLoggingContext(makePublisher.name);
  try {
    context.adapters = {} as any;

    /// MARK - Config.
    // Get ChainData and parse out configuration.
    context.chainData = await getChainData();
    context.config = _configOverride ?? (await getConfig(context.chainData, contractDeployments));
    context.logger = new Logger({
      level: context.config.logLevel,
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
    });

    if (!context.config.messageQueue.subscriber) return;

    context.logger.info("Subscriber config generated.", requestContext, methodContext, { config: context.config });

    await setupSubscriber(requestContext);

    if (context.config.messageQueue.subscriber) {
      bindSubscriber(context.config.messageQueue.subscriber as string);
    } else {
      // By default subscribe to all configured queues concurrently
      await Promise.all(
        context.config.messageQueue.queues.map(async (queueConfig) => {
          if (queueConfig?.name) bindSubscriber(queueConfig.name as string);
        }),
      );
    }
  } catch (error: any) {
    console.error("Error starting subscriber :'(", error);
    Broker.close();
    process.exit(1);
  }
};
