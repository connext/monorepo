import { logger, Wallet } from "ethers";
import {
  createLoggingContext,
  createMethodContext,
  createRequestContext,
  CrossChainTx,
  getChainData,
  jsonifyError,
  Logger,
  RequestContext,
} from "@connext/nxtp-utils";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import { Web3Signer } from "@connext/nxtp-adapters-web3signer";
import { getContractInterfaces, TransactionService } from "@connext/nxtp-txservice";

import { getConfig, NxtpRouterConfig } from "./config";
import { bindMetrics, bindPrices, bindSubgraph } from "./bindings";
import { AppContext } from "./context";
import { getOperations } from "./lib/operations";

export const context: AppContext = {} as any;

export const makeRouter = async () => {
  const requestContext = createRequestContext("makeRouter");
  const methodContext = createMethodContext(makeRouter.name);

  try {
    // Get ChainData and parse out configuration.
    const chainData = await getChainData();
    if (!chainData) {
      throw new Error("Could not get chain data");
    }
    context.adapters = {} as any;
    context.chainData = chainData;
    context.config = await getConfig(chainData);

    // Create adapter instances.
    context.adapters.wallet = context.config.mnemonic
      ? Wallet.fromMnemonic(context.config.mnemonic)
      : new Web3Signer(context.config.web3SignerUrl!);

    context.routerAddress = await context.adapters.wallet.getAddress();

    // Make logger instance.
    context.logger = new Logger({
      level: context.config.logLevel,
      name: context.routerAddress,
    });
    context.logger.info("Hello, World! Generated config!", requestContext, methodContext, {
      config: { ...context.config, mnemonic: "*****" },
    });

    context.adapters.cache = await setupCache(requestContext);

    context.adapters.subgraph = await setupSubgraphReader(requestContext);

    context.adapters.txservice = new TransactionService(
      context.logger.child({ module: "TransactionService" }, context.config.logLevel),
      context.config.chains,
      context.adapters.wallet,
    );

    context.adapters.contracts = getContractInterfaces();

    context.logger.info("Router config generated", requestContext, methodContext, {
      config: Object.assign(context.config, context.config.mnemonic ? { mnemonic: "......." } : { mnemonic: "N/A" }),
    });

    // TODO: Sanity checks on boot:
    // - read subgraph to make sure router is approved
    // - read subgraph for current liquidity in each asset, cache it
    // - read subgraph to make sure each asset is (still) approved

    // Set up bindings.
    // TODO: New diagnostic mode / cleanup mode?
    if (context.config.mode.priceCaching) {
      await bindPrices();
    } else {
      logger.warn("Running router without price caching.");
    }
    // await bindServer(context);
    await bindMetrics();
    await bindSubgraph();

    logger.info("Router ready!");
  } catch (e) {
    console.error("Error starting router. Sad! :(", e);
    process.exit();
  }
};

export const setupCache = async (requestContext: RequestContext): Promise<StoreManager> => {
  const {
    config: { redisUrl },
    logger,
  } = context;
  const { fulfill } = getOperations();

  const methodContext = createMethodContext("setupCache");
  logger.info("Cache instance setup in progress...", requestContext, methodContext, {});

  const cacheInstance = StoreManager.getInstance({
    redis: redisUrl ? { url: redisUrl } : undefined,
    mock: redisUrl ? false : true,
    logger: logger.child({ module: "StoreManager" }),
  });

  // Subscribe to `NewPreparedTx` channel and attach prepare handler.
  cacheInstance.consumers.subscribe(StoreManager.Channel.NewPreparedTx, async (pendingTx) => {
    const { requestContext, methodContext } = createLoggingContext("NewPreparedTx");
    try {
      await fulfill(JSON.parse(pendingTx) as CrossChainTx);
    } catch (err: any) {
      logger.error("Error fulfilling transaction", requestContext, methodContext, jsonifyError(err), { pendingTx });
    }
  });

  logger.info("Cache instance setup is done!", requestContext, methodContext, {
    redisUrl: redisUrl,
  });

  return cacheInstance;
};

export const setupSubgraphReader = async (requestContext: RequestContext): Promise<SubgraphReader> => {
  const { config: sequencerConfig, logger } = context;
  const methodContext = createMethodContext(setupSubgraphReader.name);

  logger.info("Subgraph reader setup in progress...", requestContext, methodContext, {});
  // Separate out relevant subgraph chain config.
  const chains: { [chain: string]: any } = {};
  Object.entries(sequencerConfig.chains).forEach(([chainId, config]) => {
    chains[chainId] = config.subgraph;
  });
  const subgraphReader = await SubgraphReader.create({
    chains,
  });

  logger.info("Subgraph reader setup is done!", requestContext, methodContext, {});
  return subgraphReader;
};
