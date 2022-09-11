import { createMethodContext, createRequestContext, getChainData, Logger } from "@connext/nxtp-utils";
import { getContractInterfaces, ChainReader, contractDeployments } from "@connext/nxtp-txservice";

import { getConfig } from "../../config";

import { ProverContext } from "./context";
import { proveAndProcess } from "./operations";
import { setupCartographer, setupRelayer } from "./adapters";

// AppContext instance used for interacting with adapters, config, etc.
const context: ProverContext = {} as any;
export const getContext = () => context;

export const makeProver = async () => {
  const requestContext = createRequestContext(makeProver.name);
  const methodContext = createMethodContext(makeProver.name);

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
    context.adapters.cartographer = await setupCartographer();
    context.adapters.relayer = await setupRelayer();
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
  } catch (e: unknown) {
    console.error("Error starting Prover. Sad! :(", e);
    process.exit();
  }
};
