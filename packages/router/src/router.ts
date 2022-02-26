import { logger, Wallet } from "ethers";
import { createMethodContext, createRequestContext, getChainData, Logger } from "@connext/nxtp-utils";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import { Web3Signer } from "@connext/nxtp-adapters-web3signer";
import { AuctioneerAPI } from "@connext/nxtp-adapters-auctioneer";
import { TransactionService } from "@connext/nxtp-txservice";

import { getConfig } from "./config";
import { bindFastify, bindMetrics, bindPrices, bindSubgraph } from "./bindings";
import { AppContext } from "./context";
import { getOperations } from "./lib/operations";

const context: AppContext = {} as any;

export const getContext = (): AppContext => {
  if (!context || Object.keys(context).length === 0) {
    throw new Error("Context not created");
  }
  return context;
};

export const makeRouter = async () => {
  const requestContext = createRequestContext("makeRouter");
  const methodContext = createMethodContext(makeRouter.name);
  const { prepare } = getOperations();
  try {
    // Get ChainData and parse out configuration.
    const chainData = await getChainData();
    if (!chainData) {
      throw new Error("Could not get chain data");
    }
    context.chainData = chainData;
    context.config = await getConfig(chainData);
    context.routerAddress = await context.adapters.wallet.getAddress();

    // Make logger instance.
    context.logger = new Logger({
      level: context.config.logLevel,
      name: await context.adapters.wallet.getAddress(),
    });

    // Create adapter instances.
    context.adapters.wallet = context.config.mnemonic
      ? Wallet.fromMnemonic(context.config.mnemonic)
      : new Web3Signer(context.config.web3SignerUrl!);

    context.adapters.cache = StoreManager.getInstance({
      redis: { url: context.config.redisUrl! },
      logger: context.logger,
    });
    // Subscribe to `NewPreparedTx` channel and attach prepare handler.
    context.adapters.cache.subscribe(StoreManager.Channel.NewPreparedTx, prepare);

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

    // TODO: URL for auctioneer??
    context.adapters.auctioneer = new AuctioneerAPI({ url: "" });

    context.adapters.txservice = new TransactionService(
      context.logger.child({ module: "TransactionService" }, context.config.logLevel),
      context.config.chains as any,
      context.adapters.wallet,
    );

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
      await bindPrices(context);
    } else {
      logger.warn("Running router without price caching.");
    }
    await bindFastify(context);
    await bindMetrics(context);
    await bindSubgraph(context);

    logger.info("Router ready!");
  } catch (e) {
    console.error("Error starting router. Sad! :(", e);
    process.exit();
  }
};
