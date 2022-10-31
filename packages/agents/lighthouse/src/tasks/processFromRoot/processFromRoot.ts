import { ChainReader, contractDeployments } from "@connext/nxtp-txservice";
import { createLoggingContext, getChainData, Logger, sendHeartbeat } from "@connext/nxtp-utils";
import { closeDatabase, getDatabase } from "@connext/nxtp-adapters-database";
import { setupConnextRelayer, setupGelatoRelayer } from "@connext/nxtp-adapters-relayer";

import { getConfig } from "../../config";

import { ProcessFromRootContext } from "./context";
import { processFromRoot } from "./operations";

const context: ProcessFromRootContext = {} as any;
export const getContext = () => context;

export const makeProcessFromRoot = async () => {
  const { requestContext, methodContext } = createLoggingContext(makeProcessFromRoot.name);

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
    context.adapters.relayer = await setupGelatoRelayer();
    context.adapters.backupRelayer = await setupConnextRelayer(context.config.relayerUrl);
    context.adapters.contracts = contractDeployments;

    context.logger.info("Process from root boot complete!", requestContext, methodContext, {
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
    await processFromRoot();
    if (context.config.healthUrls.processor) {
      await sendHeartbeat(context.config.healthUrls.processor, context.logger);
    }
  } catch (e: unknown) {
    console.error("Error starting Prover. Sad! :(", e);
  } finally {
    await closeDatabase();
    process.exit();
  }
};
