import { createMethodContext, createRequestContext, getChainData, Logger } from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";

import { getConfig, NxtpRouterConfig } from "../../config";
import { bindMetrics } from "../../bindings";
import { setupCache, setupMq, setupSubgraphReader } from "../../setup";

import { AppContext } from "./context";
import { bindSubgraph, bindServer } from "./bindings";

// AppContext instance used for interacting with adapters, config, etc.
const context: AppContext = {} as any;
export const getContext = () => context;

export const makePublisher = async (_configOverride?: NxtpRouterConfig) => {
  const requestContext = createRequestContext("Publisher Init");
  const methodContext = createMethodContext(makePublisher.name);

  try {
    context.adapters = {} as any;

    /// MARK - Config.
    // Get ChainData and parse out configuration.
    context.chainData = await getChainData();
    context.config = _configOverride ?? (await getConfig(context.chainData, contractDeployments));

    /// MARK - Logger
    context.logger = new Logger({
      level: context.config.logLevel,
      name: context.routerAddress,
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
    });
    context.logger.info("Generated config.", requestContext, methodContext, {
      config: { ...context.config, mnemonic: context.config.mnemonic ? "*****" : "N/A" },
    });

    /// MARK - Adapters
    context.adapters.subgraph = await setupSubgraphReader(
      context.logger,
      context.chainData,
      Object.keys(context.config.chains),
      context.config.environment,
      context.config.subgraphPrefix,
      requestContext,
    );
    context.adapters.cache = await setupCache(
      context.config.redis.host,
      context.config.redis.port,
      context.logger,
      requestContext,
    );
    context.adapters.mqClient = await setupMq(
      context.config.messageQueue.uri as string,
      context.config.messageQueue.limit as number,
      context.config.messageQueue.heartbeat as number,
      context.config.messageQueue.failAfter as number,
      context.config.messageQueue.retryLimit as number,
      context.logger,
      requestContext,
    );

    /// MARK - Bindings
    await bindMetrics("publisher");
    await bindSubgraph();
    await bindServer();

    context.logger.info("Bindings initialized.", requestContext, methodContext);
    context.logger.info("Router publisher boot complete!", requestContext, methodContext, {
      port: context.config.server.pub.port,
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
    console.error("Error starting router publisher. Sad! :(", e);
    process.exit();
  }
};
