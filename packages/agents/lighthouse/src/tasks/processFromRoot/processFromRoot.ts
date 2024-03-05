import { ChainReader, contractDeployments } from "@connext/nxtp-txservice";
import {
  ChainData,
  createLoggingContext,
  Logger,
  RelayerType,
  sendHeartbeat,
  RootManagerMode,
  ModeType,
} from "@connext/nxtp-utils";
import { closeDatabase, getDatabase } from "@connext/nxtp-adapters-database";
import { setupConnextRelayer, setupGelatoRelayer } from "@connext/nxtp-adapters-relayer";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";

import { NxtpLighthouseConfig } from "../../config";

import { ProcessFromRootContext } from "./context";
import { processFromRoot } from "./operations";

const context: ProcessFromRootContext = {} as any;
export const getContext = () => context;

export const makeProcessFromRoot = async (config: NxtpLighthouseConfig, chainData: Map<string, ChainData>) => {
  const { requestContext, methodContext } = createLoggingContext(makeProcessFromRoot.name);

  try {
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
    context.adapters.database = await getDatabase(context.config.databaseWriter.url, context.logger);

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
    context.adapters.contracts = contractDeployments;
    context.adapters.subgraph = await SubgraphReader.create(
      chainData,
      context.config.environment,
      context.config.subgraphPrefix as string,
    );

    context.logger.info("Process from root boot complete!", requestContext, methodContext, {
      chains: [...Object.keys(context.config.chains)],
      healthUrls: context.config.healthUrls,
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

    // Start the processor.
    const rootManagerMode: RootManagerMode = await context.adapters.subgraph.getRootManagerMode(config.hubDomain);
    if (rootManagerMode.mode === ModeType.OptimisticMode) {
      context.logger.info("In Optimistic Mode. No Op", requestContext, methodContext);
    } else if (rootManagerMode.mode === ModeType.SlowMode) {
      context.logger.info("In Slow Mode", requestContext, methodContext);
      await processFromRoot();
    } else {
      throw new Error(`Unknown mode detected: ${JSON.stringify(rootManagerMode)}`);
    }
    if (context.config.healthUrls.processor) {
      await sendHeartbeat(context.config.healthUrls.processor, context.logger);
    }
  } catch (e: unknown) {
    console.error("Error starting processor. Sad! :(", e);
  } finally {
    await closeDatabase();

    context.logger.info("Process from root complete!!!", requestContext, methodContext, {
      chains: [...Object.keys(context.config.chains)],
    });
  }
};
