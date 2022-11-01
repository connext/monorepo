import { createLoggingContext, getChainData, Logger, RelayerType, sendHeartbeat } from "@connext/nxtp-utils";
import { getContractInterfaces, ChainReader, contractDeployments } from "@connext/nxtp-txservice";
import { closeDatabase, getDatabase } from "@connext/nxtp-adapters-database";
import { setupConnextRelayer, setupGelatoRelayer } from "@connext/nxtp-adapters-relayer";

import { getConfig } from "../../config";

import { ProverContext } from "./context";
import { proveAndProcess } from "./operations";

// AppContext instance used for interacting with adapters, config, etc.
const context: ProverContext = {} as any;
export const getContext = () => context;

export const makeProver = async () => {
  const { requestContext, methodContext } = createLoggingContext(makeProver.name);

  try {
    // Get ChainData and parse out configuration.
    const chainData = await getChainData();
    if (!chainData) {
      throw new Error("Could not get chain data");
    }
    context.adapters = {} as any;
    context.chainData = chainData;
    context.config = await getConfig(context.chainData, contractDeployments);

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

    for (const relayerConfing of context.config.relayers) {
      const setupFunc =
        relayerConfing.type == RelayerType.Primary
          ? setupGelatoRelayer
          : RelayerType.Backup
          ? setupConnextRelayer
          : undefined;

      if (!setupFunc) {
        throw new Error(`Unknown relayer configured, relayer: ${relayerConfing}`);
      }

      const relayer = await setupFunc(relayerConfing.url);
      context.adapters.relayers.push({
        instance: relayer,
        apiKey: relayerConfing.apiKey,
        type: relayerConfing.type as RelayerType,
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
