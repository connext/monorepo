import { createMethodContext, createRequestContext, getChainData, Logger } from "@connext/nxtp-utils";
import { getContractInterfaces, ChainReader, contractDeployments } from "@connext/nxtp-txservice";

import { getConfig } from "../../config";

import { bindCartographer } from "./bindings";
import { AppContext } from "./context";

// AppContext instance used for interacting with adapters, config, etc.
const context: AppContext = {} as any;
export const getContext = () => context;

export const makeExecutor = async () => {
  const requestContext = createRequestContext(makeExecutor.name);
  const methodContext = createMethodContext(makeExecutor.name);

  try {
    // Get ChainData and parse out configuration.
    const chainData = await getChainData();
    if (!chainData) {
      throw new Error("Could not get chain data");
    }
    context.adapters = {} as any;
    context.chainData = chainData;
    context.config = await getConfig(chainData, contractDeployments);

    // Make logger instance.
    context.logger = new Logger({
      level: context.config.logLevel,
      name: "router-executor",
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
    });
    context.logger.info("Hello, World! Generated config!", requestContext, methodContext, {
      config: { ...context.config, mnemonic: "*****" },
    });

    context.adapters.chainreader = new ChainReader(
      context.logger.child({ module: "ChainReader" }),
      context.config.chains,
    );

    context.adapters.contracts = getContractInterfaces();

    // Set up bindings.
    context.logger.info("Bindings initialized.", requestContext, methodContext);
    await bindCartographer(context.config.polling.cartographer);

    context.logger.info("Executor boot complete!", requestContext, methodContext, {
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
  } catch (e: unknown) {
    console.error("Error starting router. Sad! :(", e);
    process.exit();
  }
};
