import { Wallet } from "ethers";
import {
  Logger,
  getChainData,
  RequestContext,
  createLoggingContext,
  createMethodContext,
  ChainData,
  jsonifyError,
  RelayerType,
} from "@connext/nxtp-utils";
import Broker from "amqplib";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import { ChainReader, getContractInterfaces, contractDeployments } from "@connext/nxtp-txservice";
import { Web3Signer } from "@connext/nxtp-adapters-web3signer";
import { setupConnextRelayer, setupGelatoRelayer } from "@connext/nxtp-adapters-relayer";
import { getDatabase } from "@connext/nxtp-adapters-database";

import { SequencerConfig } from "./lib/entities";
import { getConfig } from "./config";
import { AppContext } from "./lib/entities/context";
import { bindSubscriber } from "./bindings/subscriber";
import { bindHTTPSubscriber } from "./bindings/publisher";
import { bindServer } from "./bindings/server";
import { getHelpers } from "./lib/helpers";

const context: AppContext = {} as any;
export const getContext = () => context;
export const HTTP_QUEUE = "http";
export const msgContentType = "application/json";
export const SlippageErrorPatterns = ["dy < minDy", "Reverted 0x6479203c206d696e4479", "more than pool balance"]; // 0x6479203c206d696e4479 -- encoded hex string of "dy < minDy"
export const DEFAULT_PREFETCH_SIZE = 100;
/// MARK - Make Agents
/**
 * Sets up and runs the sequencer publisher unit. Receives bids from router network and assigns to transfer by ID,
 * publishing transfer info for consumption by sequencer subscriber (see `makeSubscriber`).
 *
 * @param _configOverride - Overrides for configuration; normally only used for testing.
 */
export const makePublisher = async (_configOverride?: SequencerConfig) => {
  const { requestContext, methodContext } = createLoggingContext(makePublisher.name);

  context.logger.info("Method Start", requestContext, methodContext, {});
  try {
    /// MARK - Bindings
    // Create server, set up routes, and start listening.
    const mqClient = context.adapters.mqClient;
    const channel = await mqClient.createChannel();
    await channel.assertExchange(
      context.config.messageQueue.exchanges[0].name,
      context.config.messageQueue.exchanges[0].type,
      {
        durable: context.config.messageQueue.exchanges[0].durable,
      },
    );

    if (HTTP_QUEUE) {
      const binding = context.config.messageQueue.bindings.find((it) => it.target == HTTP_QUEUE);
      const queue = context.config.messageQueue.queues.find((it) => it.name == HTTP_QUEUE);
      await channel.prefetch(queue?.limit || 1);

      if (binding && queue) {
        await channel.assertQueue(HTTP_QUEUE, {
          durable: true,
          maxLength: queue.queueLimit,
        });
        await channel.bindQueue(HTTP_QUEUE, binding?.exchange, binding?.keys[0]);
      } else {
        throw new Error("Sequencer publisher not configured");
      }

      bindServer(HTTP_QUEUE, channel);
    } else {
      throw new Error("Sequencer publisher not configured");
    }

    // hard error on channel issues, will be restarted from higher level orchestrator
    channel.on("error", (err: unknown) => {
      context.logger.error("MQ channel error", requestContext, methodContext, undefined, {
        error: jsonifyError(err as Error),
      });
      process.exit(1);
    });

    channel.on("close", (err: unknown) => {
      context.logger.error("MQ channel closed", requestContext, methodContext, undefined, {
        error: jsonifyError(err as Error),
      });
      process.exit(1);
    });

    context.logger.info("Sequencer boot complete!", requestContext, methodContext, {
      port: {
        pub: context.config.server.pub.port,
        sub: context.config.server.sub.port,
      },
      chains: [...Object.keys(context.config.chains)],
      address: context.adapters.wallet.address,
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
  } catch (error: any) {
    console.error("Error starting publisher :'(", error);
    process.exit(1);
  }
};

export const makeHTTPSubscriber = async () => {
  const {
    healthserver: { bindHealthServer },
  } = getHelpers();
  const { requestContext, methodContext } = createLoggingContext(makeSubscriber.name);

  context.logger.info("Method Start", requestContext, methodContext, {});
  try {
    const mqClient = context.adapters.mqClient;
    const channel = await mqClient.createChannel();
    await channel.assertExchange(
      context.config.messageQueue.exchanges[0].name,
      context.config.messageQueue.exchanges[0].type,
      {
        durable: context.config.messageQueue.exchanges[0].durable,
      },
    );
    if (HTTP_QUEUE) {
      const binding = context.config.messageQueue.bindings.find((it) => it.target == HTTP_QUEUE);
      const queue = context.config.messageQueue.queues.find((it) => it.name == HTTP_QUEUE);
      await channel.prefetch(queue?.limit || 1);

      if (binding && queue) {
        await channel.assertQueue(HTTP_QUEUE, {
          durable: true,
          maxLength: queue.queueLimit,
        });
        await channel.bindQueue(HTTP_QUEUE, binding?.exchange, binding?.keys[0]);
      } else {
        throw new Error("Sequencer publisher not configured");
      }

      bindHTTPSubscriber(HTTP_QUEUE, channel);
    } else {
      throw new Error("Sequencer publisher not configured");
    }

    // hard error on channel issues, will be restarted from higher level orchestrator
    channel.on("error", (err: unknown) => {
      context.logger.error("MQ channel error", requestContext, methodContext, undefined, {
        error: jsonifyError(err as Error),
      });
      process.exit(1);
    });

    channel.on("close", (err: unknown) => {
      context.logger.error("MQ channel closed", requestContext, methodContext, undefined, {
        error: jsonifyError(err as Error),
      });
      process.exit(1);
    });

    // Create health server, set up routes, and start listening.
    await bindHealthServer(context.config.server.pub.host, context.config.server.pub.port);
  } catch (error: any) {
    console.error("Error starting subscriber :'(", error);
    await context.adapters.mqClient.close();
    process.exit(1);
  }
};

/**
 * Sets up and runs the sequencer subscriber unit. Listens for messages regarding incoming bids and delegates
 * to child processes (see `execute` below).
 *
 * @param _configOverride - Overrides for configuration; normally only used for testing.
 */
export const makeSubscriber = async () => {
  const {
    healthserver: { bindHealthServer },
  } = getHelpers();
  const { requestContext, methodContext } = createLoggingContext(makeSubscriber.name);

  context.logger.info("Method Start", requestContext, methodContext, {});
  try {
    const mqClient = context.adapters.mqClient;
    const channel = await mqClient.createChannel();
    const prefetchSize = context.config.messageQueue.prefetch ?? DEFAULT_PREFETCH_SIZE;
    channel.prefetch(prefetchSize);

    await channel.assertExchange(
      context.config.messageQueue.exchanges[0].name,
      context.config.messageQueue.exchanges[0].type,
      {
        durable: context.config.messageQueue.exchanges[0].durable,
      },
    );

    if (context.config.messageQueue.subscriber && context.config.messageQueue.subscriber != HTTP_QUEUE) {
      const binding = context.config.messageQueue.bindings.find(
        (it) => it.target == context.config.messageQueue.subscriber,
      );
      const queue = context.config.messageQueue.queues.find((it) => it.name == context.config.messageQueue.subscriber);
      await channel.prefetch(queue?.limit || 1);

      if (binding && queue) {
        await channel.assertQueue(context.config.messageQueue.subscriber, {
          durable: true,
          maxLength: queue.queueLimit,
        });
        await channel.bindQueue(context.config.messageQueue.subscriber, binding?.exchange, binding?.keys[0]);
      }

      bindSubscriber(context.config.messageQueue.subscriber, channel);
    } else {
      // By default subscribe to all configured queues concurrently
      await Promise.all(
        context.config.messageQueue.bindings
          .filter((it) => it.target != HTTP_QUEUE)
          .map(async (binding) => {
            const queue = context.config.messageQueue.queues.find((it) => it.name == binding.target);
            await channel.assertQueue(binding.target, { durable: true, maxLength: queue?.queueLimit });
            await channel.bindQueue(binding.target, binding.exchange, binding.keys[0]);
          }),
      );
      await Promise.all(
        context.config.messageQueue.queues
          .filter((it) => it.name != HTTP_QUEUE)
          .map(async (queueConfig) => {
            if (queueConfig?.name) bindSubscriber(queueConfig.name, channel);
          }),
      );
    }

    // hard error on channel issues, will be restarted from higher level orchestrator
    channel.on("error", (err: unknown) => {
      context.logger.error("MQ channel error", requestContext, methodContext, undefined, {
        error: jsonifyError(err as Error),
      });
      process.exit(1);
    });

    channel.on("close", (err: unknown) => {
      context.logger.error("MQ channel closed", requestContext, methodContext, undefined, {
        error: jsonifyError(err as Error),
      });
      process.exit(1);
    });

    // Create health server, set up routes, and start listening.
    await bindHealthServer(context.config.server.sub.host, context.config.server.sub.port);
  } catch (error: any) {
    console.error("Error starting subscriber :'(", error);
    await context.adapters.mqClient.close();
    process.exit(1);
  }
};

/// MARK - Context Setup
export const setupContext = async (_configOverride?: SequencerConfig) => {
  const { requestContext, methodContext } = createLoggingContext(setupContext.name);
  context.adapters = {} as any;

  /// MARK - Config
  // Get ChainData and parse out configuration.
  context.chainData = await getChainData();
  // Apply override if it used (config override is intended namely for testing purposes).
  context.config = _configOverride ?? (await getConfig(context.chainData, contractDeployments));
  // Init logger used int he application.
  context.logger = new Logger({
    level: context.config.logLevel,
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
  });

  context.logger.info("Sequencer config generated.", requestContext, methodContext, {
    config: { ...context.config, mnemonic: context.config.mnemonic ? "*****" : "N/A" },
  });

  /// Mark - Sanity Check
  // Publisher must be specified in the config.
  if (!context.config.messageQueue.publisher) throw new Error(`No publisher found in config`);

  // Message queues must be present in the config.
  if (context.config.messageQueue.queues.length === 0) throw new Error("No queues found in config.");

  /// MARK - Adapters
  // Set up all adapters, peripherals, etc.
  // Either a mnemonic or a web3signer must be configured for the sequencer.
  // The signer is used for signing approvals for router paths.
  if (!context.config.mnemonic && !context.config.web3SignerUrl) {
    throw new Error(
      "No mnemonic or web3signer was configured. Please ensure either a mnemonic or a web3signer" +
        " URL is provided in the config. Exiting!",
    );
  }
  context.adapters.wallet = context.config.mnemonic
    ? Wallet.fromMnemonic(context.config.mnemonic)
    : new Web3Signer(context.config.web3SignerUrl!);

  context.adapters.cache = await setupCache(context.config.redis, context.logger, requestContext);
  context.adapters.subgraph = await setupSubgraphReader(requestContext);
  context.adapters.chainreader = new ChainReader(
    context.logger.child({ module: "ChainReader", level: context.config.logLevel }),
    context.config.chains,
  );
  context.adapters.contracts = getContractInterfaces();
  context.adapters.relayers = [];
  for (const relayerConfig of context.config.relayers) {
    const setupFunc =
      relayerConfig.type == RelayerType.Gelato
        ? setupGelatoRelayer
        : RelayerType.Connext
        ? setupConnextRelayer
        : undefined;

    if (!setupFunc) {
      throw new Error(`Unknown relayer configured, relayer: ${relayerConfig}`);
    }

    const relayer = await setupFunc(relayerConfig.url);
    context.adapters.relayers.push({
      instance: relayer,
      apiKey: relayerConfig.apiKey,
      type: relayerConfig.type as RelayerType,
    });
  }
  context.adapters.mqClient = await setupMQ(requestContext);
  try {
    context.adapters.database = await getDatabase(context.config.database.url, context.logger);
  } catch (err: unknown) {
    context.logger.error("Database error:getDatabase", requestContext, methodContext, undefined, {
      error: err,
    });
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

  logger.info("Subgraph reader setup in progress...", requestContext, methodContext, {
    allowedDomains,
  });

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

export const setupMQ = async (requestContext: RequestContext): Promise<Broker.Connection> => {
  const { logger, config } = context;

  const methodContext = createMethodContext(setupMQ.name);
  logger.info("MQ setup in progress...", requestContext, methodContext, {});
  const connection = await Broker.connect(config.messageQueue.connection.uri);

  // hard exit on errors or close, this will force a restart from AWS
  connection.on("error", (err: unknown) => {
    logger.error("MQ connection error", requestContext, methodContext, undefined, {
      error: jsonifyError(err as Error),
    });
    process.exit(1);
  });

  connection.on("close", (err: unknown) => {
    logger.error("MQ connection closed", requestContext, methodContext, undefined, {
      error: jsonifyError(err as Error),
    });
    process.exit(1);
  });

  logger.info("MQ setup is done!", requestContext, methodContext, {});
  return connection;
};
