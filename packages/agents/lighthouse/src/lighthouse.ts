import { logger } from "ethers";
import { createMethodContext, createRequestContext, getChainData, Logger } from "@connext/nxtp-utils";
import { getContractInterfaces, ChainReader, contractDeployments } from "@connext/nxtp-txservice";

import { setupRelayer } from "./adapters";
import { getConfig } from "./config";
import { bindBackend } from "./bindings";
import { AppContext } from "./lib/entities";

// AppContext instance used for interacting with adapters, config, etc.
const context: AppContext = {} as any;
export const getContext = () => context;

export const makeLighthouse = async () => {
  const requestContext = createRequestContext(makeLighthouse.name);
  const methodContext = createMethodContext(makeLighthouse.name);

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
      name: "lighthouse",
    });
    context.logger.info("Hello, World! Generated config!", requestContext, methodContext, {
      config: { ...context.config, mnemonic: "*****" },
    });

    context.adapters.chainreader = new ChainReader(
      context.logger.child({ module: "ChainReader" }),
      context.config.chains,
    );

    context.adapters.contracts = getContractInterfaces();
    context.adapters.relayer = await setupRelayer();

    // Set up bindings.
    await bindBackend(context.config.polling.backend);

    logger.info("Lighthouse ready!");
  } catch (e: unknown) {
    console.error("Error starting router. Sad! :(", e);
    process.exit();
  }
};
