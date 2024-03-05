import { ChainReader, contractDeployments, getAmbABIs, getContractInterfaces } from "@connext/nxtp-txservice";
import {
  ChainData,
  createLoggingContext,
  Logger,
  RelayerType,
  sendHeartbeat,
  RootManagerMode,
  ModeType,
} from "@connext/nxtp-utils";
import { setupConnextRelayer, setupGelatoRelayer } from "@connext/nxtp-adapters-relayer";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";

import { NxtpLighthouseConfig } from "../../config";

import { SendOutboundRootContext } from "./context";
import { sendOutboundRoot } from "./operations";

const context: SendOutboundRootContext = {} as any;
export const getContext = () => context;

export const makeSendOutboundRoot = async (config: NxtpLighthouseConfig, chainData: Map<string, ChainData>) => {
  const { requestContext, methodContext } = createLoggingContext(makeSendOutboundRoot.name);

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

    context.logger.info("SendOutboundRoot task setup complete!", requestContext, methodContext, {
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

    // Start the sendOutboundRoot task.
    const rootManagerMode: RootManagerMode = await context.adapters.subgraph.getRootManagerMode(config.hubDomain);
    if (rootManagerMode.mode === ModeType.OptimisticMode) {
      context.logger.info("In Optimistic Mode. No Op", requestContext, methodContext);
    } else if (rootManagerMode.mode === ModeType.SlowMode) {
      context.logger.info("In Slow Mode", requestContext, methodContext);
      await sendOutboundRoot();
    } else {
      throw new Error(`Unknown mode detected: ${JSON.stringify(rootManagerMode)}`);
    }
    if (context.config.healthUrls.sendOutboundRoot) {
      await sendHeartbeat(context.config.healthUrls.sendOutboundRoot, context.logger);
    }
  } catch (e: unknown) {
    console.error("Error starting SendOutboundRoot task. Sad! :(", e);
  } finally {
    context.logger.info("SendOutboundRoot task complete!!!", requestContext, methodContext, {
      chains: [...Object.keys(context.config.chains)],
    });
  }
};
