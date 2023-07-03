import { ChainData, createLoggingContext, jsonifyError, Logger, RelayerType, sendHeartbeat } from "@connext/nxtp-utils";
import { getContractInterfaces, ChainReader } from "@connext/nxtp-txservice";
import { closeDatabase, getDatabase, getDatabaseAndPool } from "@connext/nxtp-adapters-database";
import { setupConnextRelayer, setupGelatoRelayer } from "@connext/nxtp-adapters-relayer";
import Broker from "amqplib";
import { StoreManager } from "@connext/nxtp-adapters-cache";

import { NxtpLighthouseConfig } from "../../config";

import { ProverContext } from "./context";
import { enqueue, consume } from "./operations";
import { bindHealthServer } from "./bindings";
import { prefetch } from "./operations/publisher";

// AppContext instance used for interacting with adapters, config, etc.
const context: ProverContext = {} as any;
export const getContext = () => context;
export const makeProverPublisher = async (config: NxtpLighthouseConfig, chainData: Map<string, ChainData>) => {
  try {
    await makeProver(config, chainData);
    await prefetch();
    await enqueue();
    if (context.config.healthUrls.prover) {
      await sendHeartbeat(context.config.healthUrls.prover, context.logger);
    }
  } catch (e: unknown) {
    console.error("Error starting Prover-Publisher. Sad! :(", e);
  } finally {
    await closeDatabase();
    process.exit();
  }
};

export const makeProverSubscriber = async (config: NxtpLighthouseConfig, chainData: Map<string, ChainData>) => {
  try {
    await makeProver(config, chainData);
    await consume();
    await bindHealthServer();
  } catch (e: unknown) {
    console.error("Error starting Prover-Subscriber. Sad! :(", e);
  }
};

export const makeProver = async (config: NxtpLighthouseConfig, chainData: Map<string, ChainData>) => {
  const { requestContext, methodContext } = createLoggingContext(makeProver.name);

  context.chainData = chainData;
  context.config = config;

  // Make logger instance.
  context.logger = new Logger({
    level: context.config.logLevel,
    name: "lighthouse",
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
  });
  context.logger.info("Hello, World! Generated config!", requestContext, methodContext, {
    config: { ...context.config, mnemonic: "*****" },
  });

  // Adapters
  context.adapters = {} as any;
  context.adapters.chainreader = new ChainReader(
    context.logger.child({ module: "ChainReader" }),
    context.config.chains,
  );
  context.adapters.database = await getDatabase(context.config.database.url, context.logger);
  // Default to database url if no writer url is provided.
  const databaseWriter = context.config.databaseWriter
    ? context.config.databaseWriter.url
    : context.config.database.url;
  context.adapters.databaseWriter = await getDatabaseAndPool(databaseWriter, context.logger);
  context.adapters.mqClient = await Broker.connect(config.messageQueue.connection.uri);
  // hard exit on errors or close, this will force a restart from AWS
  context.adapters.mqClient.on("error", (err: unknown) => {
    context.logger.error("MQ connection error", requestContext, methodContext, undefined, {
      error: jsonifyError(err as Error),
    });
    process.exit(1);
  });

  context.adapters.mqClient.on("close", (err: unknown) => {
    context.logger.error("MQ connection closed", requestContext, methodContext, undefined, {
      error: jsonifyError(err as Error),
    });
    process.exit(1);
  });
  context.adapters.cache = StoreManager.getInstance({
    redis: { host: context.config.redis.host, port: context.config.redis.port, instance: undefined },
    mock: !context.config.redis.host || !context.config.redis.port,
    logger: context.logger.child({ module: "StoreManager" }),
  });

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
  context.adapters.contracts = getContractInterfaces();

  context.logger.info("Prover boot complete!", requestContext, methodContext, {
    chains: [...Object.keys(context.config.chains)],
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
};
