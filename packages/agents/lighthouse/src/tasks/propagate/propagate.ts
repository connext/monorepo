import { ChainReader, contractDeployments, getAmbABIs, getContractInterfaces } from "@connext/nxtp-txservice";
import { ChainData, createLoggingContext, Logger, RelayerType, sendHeartbeat } from "@connext/nxtp-utils";
import { setupConnextRelayer, setupGelatoRelayer } from "@connext/nxtp-adapters-relayer";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";

import { NxtpLighthouseConfig } from "../../config";

import { PropagateContext } from "./context";
import { propagate } from "./operations";

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
    await propagate();
    if (context.config.healthUrls.propagate) {
      await sendHeartbeat(context.config.healthUrls.propagate, context.logger);
    }
  } catch (e: unknown) {
    console.error("Error starting Propagate task. Sad! :(", e);
  } finally {
    context.logger.info("Propagate task complete!", requestContext, methodContext, {
      chains: [...Object.keys(context.config.chains)],
    });
  }
};
