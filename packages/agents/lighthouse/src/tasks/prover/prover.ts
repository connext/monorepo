import { ChainData, createLoggingContext, Logger, RelayerType, sendHeartbeat } from "@connext/nxtp-utils";
import { getContractInterfaces, ChainReader } from "@connext/nxtp-txservice";
import { closeDatabase, getDatabase } from "@connext/nxtp-adapters-database";
import { setupConnextRelayer, setupGelatoRelayer } from "@connext/nxtp-adapters-relayer";

import { NxtpLighthouseConfig } from "../../config";

import { ProverContext } from "./context";
import { proveAndProcess } from "./operations";

// AppContext instance used for interacting with adapters, config, etc.
const context: ProverContext = {} as any;
export const getContext = () => context;

export const makeProver = async (config: NxtpLighthouseConfig, chainData: Map<string, ChainData>) => {
  const { requestContext, methodContext } = createLoggingContext(makeProver.name);

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

    // Start the prover.
    await proveAndProcess();
    if (context.config.healthUrls.prover) {
      await sendHeartbeat(context.config.healthUrls.prover, context.logger);
    }
  } catch (e: unknown) {
    console.error("Error starting Prover. Sad! :(", e);
  } finally {
    await closeDatabase();
    process.exit();
  }
};
