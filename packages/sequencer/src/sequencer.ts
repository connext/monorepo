import { fastify } from "fastify";
import pino from "pino";
import { Logger, getChainData, createRequestContext, createMethodContext } from "@connext/nxtp-utils";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";

import { getConfig } from "./lib/entities";
import { AppContext } from "./context";
import { setupHandlers } from "./handlers";

const context: AppContext = {} as any;

export const getContext = (): AppContext => {
  if (!context || Object.keys(context).length === 0) {
    throw new Error("Context not created");
  }
  return context;
};

// const REDIS_URL = process.env.REDIS_URL || 'http://localhost:6379';
const LISTEN_PORT = process.env.PORT || 1234;
const LOG_LEVEL = process.env.loglevel || "debug";

export const makeSequencer = async () => {
  const requestContext = createRequestContext("makeSequencer");
  const methodContext = createMethodContext(makeSequencer.name);
  try {
    // Get ChainData and parse out configuration.
    const chainData = await getChainData();
    if (!chainData) {
      throw new Error("Could not get chain data");
    }
    context.chainData = chainData;
    context.config = getConfig();
    context.logger = new Logger({ level: "debug" });

    // Set up adapters.
    context.adapters.subgraph = await SubgraphReader.create({
      // Separate out relevant subgraph chain config.
      chains: Object.entries(context.config.chains).reduce(
        (obj, [chainId, config]) => ({
          ...obj,
          [chainId]: config.subgraph,
        }),
        {},
      ),
    });

    // Create server, set up routes, and start listening.
    const server = fastify({ logger: pino({ level: LOG_LEVEL }) });
    setupHandlers(context, server);
    await server.listen(LISTEN_PORT);
    context.logger.info(`Auctioneer Listening @ ${LISTEN_PORT}`, requestContext, methodContext);
  } catch (error: any) {
    console.error("Error starting sequencer. :'(", error);
    process.exit();
  }
};
