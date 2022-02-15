import { logger, Wallet } from "ethers";
import { createMethodContext, createRequestContext, getChainData, Logger } from "@connext/nxtp-utils";

import { getConfig } from "./config";
import { SubgraphReader, Auctioneer, Web3Signer, RouterCache } from "./adapters";
import { bindFastify, bindMetrics, bindPrices } from "./bindings";
import { AppContext } from "./context";
import { bindSubgraph } from "./bindings/subgraph";

const context: AppContext = {} as any;

export const makeRouter = async () => {
  const requestContext = createRequestContext("makeRouter");
  const methodContext = createMethodContext(makeRouter.name);
  try {
    // Get ChainData and parse out configuration.
    const chainData = await getChainData();
    if (!chainData) {
      throw new Error("Could not get chain data");
    }
    context.config = await getConfig(chainData);

    // Create adapter instances.
    context.adapters.wallet = context.config.mnemonic
      ? Wallet.fromMnemonic(context.config.mnemonic)
      : new Web3Signer(context.config.web3SignerUrl!);
    context.adapters.cache = new RouterCache(context);
    context.adapters.subgraph = new SubgraphReader(context);
    context.adapters.auctioneer = new Auctioneer(context);

    // Make logger instance.
    context.logger = new Logger({
      level: context.config.logLevel,
      name: await context.adapters.wallet.getAddress(),
    });

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
