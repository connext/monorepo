import { ChainReader, contractDeployments, getAmbABIs, getContractInterfaces } from "@connext/nxtp-txservice";
import { closeDatabase, getDatabase } from "@connext/nxtp-adapters-database";
import {
  ChainData,
  createLoggingContext,
  Logger,
  RelayerType,
  sendHeartbeat,
  RootManagerMode,
  SpokeConnectorMode,
  ModeType,
  jsonifyError,
  NxtpError,
} from "@connext/nxtp-utils";
import { setupConnextRelayer, setupGelatoRelayer } from "@connext/nxtp-adapters-relayer";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";

import { NxtpLighthouseConfig } from "../../config";

import { PropagateContext } from "./context";
import { propagate, finalize, finalizeSpoke } from "./operations";

const context: PropagateContext = {} as any;
export const getContext = () => context;

export const makePropagate = async (config: NxtpLighthouseConfig, chainData: Map<string, ChainData>) => {
  const { requestContext, methodContext } = createLoggingContext(makePropagate.name);

  try {
    context.adapters = {} as any;
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
    context.adapters.chainreader = new ChainReader(
      context.logger.child({ module: "ChainReader" }),
      context.config.chains,
    );
    context.adapters.database = await getDatabase(context.config.database.url, context.logger);

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
    context.adapters.deployments = contractDeployments;
    context.adapters.contracts = getContractInterfaces();
    context.adapters.ambs = getAmbABIs();
    context.adapters.subgraph = await SubgraphReader.create(
      chainData,
      context.config.environment,
      context.config.subgraphPrefix as string,
    );

    context.logger.info("Propagate task setup complete!", requestContext, methodContext, {
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

    // Start the propagate task.
    const rootManagerMode: RootManagerMode = await context.adapters.subgraph.getRootManagerMode(config.hubDomain);
    const domains: string[] = Object.keys(config.chains);
    for (const domain of domains) {
      const spokeConnectorMode: SpokeConnectorMode = await context.adapters.subgraph.getSpokeConnectorMode(domain);
      if (spokeConnectorMode.mode !== rootManagerMode.mode) {
        context.logger.info("Mode MISMATCH. Stop", requestContext, methodContext, {
          hubMode: rootManagerMode.mode,
          hubDomain: config.hubDomain,
          spokeMode: spokeConnectorMode.mode,
          spokeDomain: domain,
        });
        throw new Error(`Unknown mode detected: RootMode - ${rootManagerMode} SpokeMode - ${spokeConnectorMode}`);
      }
    }
    if (rootManagerMode.mode === ModeType.OptimisticMode) {
      context.logger.info("In Optimistic Mode", requestContext, methodContext);
      await finalize();
      for (const spokeDomain of domains) {
        try {
          await finalizeSpoke(spokeDomain);
        } catch (e: unknown) {
          context.logger.error(
            "Failed to finalize spoke ",
            requestContext,
            methodContext,
            jsonifyError(e as NxtpError),
            { spokeDomain },
          );
        }
      }
    } else if (rootManagerMode.mode === ModeType.SlowMode) {
      context.logger.info("In Slow Mode", requestContext, methodContext);
      await propagate();
    } else {
      throw new Error(`Unknown mode detected: ${rootManagerMode}`);
    }
    if (context.config.healthUrls.propagate) {
      await sendHeartbeat(context.config.healthUrls.propagate, context.logger);
    }
  } catch (e: unknown) {
    console.error("Error starting Propagate task. Sad! :(", e);
    await closeDatabase();
  } finally {
    process.exit();
  }
};
