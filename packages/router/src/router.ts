import { logger, Wallet } from "ethers";
import { createMethodContext, createRequestContext, getChainData, Logger } from "@connext/nxtp-utils";
import { SubgraphReader, ReadSubgraphConfig } from "@connext/nxtp-adapters-subgraph";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import { Web3Signer } from "@connext/nxtp-adapters-web3signer";
import { AuctioneerAPI } from "@connext/nxtp-adapters-auctioneer";

import { getConfig, NxtpRouterConfig } from "./config";
import { bindFastify, bindMetrics, bindPrices } from "./bindings";
import { AppContext } from "./context";

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

    // Make logger instance.
    context.logger = new Logger({
      level: context.config.logLevel,
      name: await context.adapters.wallet.getAddress(),
    });

    // Create adapter instances.
    context.adapters.wallet = context.config.mnemonic
      ? Wallet.fromMnemonic(context.config.mnemonic)
      : new Web3Signer(context.config.web3SignerUrl!);
    context.adapters.cache = StoreManager.getInstance({ redisUrl: context.config.redisUrl!, logger: context.logger });

    context.adapters.subgraph = await setupReadSubgraph(context.config);

    context.adapters.auctioneer = new AuctioneerAPI();

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

    logger.info("Router ready!");
  } catch (e) {
    console.error("Error starting router. Sad! :(", e);
    process.exit();
  }
};

const setupReadSubgraph = async (config: NxtpRouterConfig): Promise<SubgraphReader> => {
  // setup read subgraph

  const subgraphConfig: ReadSubgraphConfig = { chains: {} };
  Object.keys(config.chains).map((chainId) => {
    // subgraphConfig.chains[chainId.toString()] = config.chains[chainId].subgraph;
    subgraphConfig.chains[chainId.toString()] = {
      subgraph: {
        analytics: config.chains[chainId].subgraph.analytics,
        runtime: config.chains[chainId].subgraph.runtime,
        maxLag: config.chains[chainId].subgraph.maxLag,
      },
    };
  });

  const subgraph = new SubgraphReader();
  subgraph.create(subgraphConfig);

  return subgraph;
};
