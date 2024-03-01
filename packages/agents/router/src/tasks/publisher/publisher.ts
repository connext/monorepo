import { createMethodContext, createRequestContext, getChainData, Logger } from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";

import { getConfig, NxtpRouterConfig } from "../../config";
import { bindMetrics } from "../../bindings";
import { setupCache, setupMq, setupSubgraphReader } from "../../setup";

import { AppContext } from "./context";
import { bindSubgraph, bindServer } from "./bindings";
import { Wallet } from "ethers";
import { Web3Signer } from "@connext/nxtp-adapters-web3signer";

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

    /// MARK - Signer
    if (!context.config.mnemonic && !context.config.web3SignerUrl) {
      throw new Error(
        "No mnemonic or web3signer was configured. Please ensure either a mnemonic or a web3signer" +
          " URL is provided in the config. Exiting!",
      );
    }
    context.adapters.wallet = context.config.mnemonic
      ? Wallet.fromMnemonic(context.config.mnemonic)
      : new Web3Signer(context.config.web3SignerUrl!);
    context.routerAddress = await context.adapters.wallet.getAddress();

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
