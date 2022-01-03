import { logger, Wallet } from "ethers";
import {
  ChainData,
  createMethodContext,
  createRequestContext,
  getChainData,
  Logger,
  RouterNxtpNatsMessagingService,
} from "@connext/nxtp-utils";
import { TransactionService } from "@connext/nxtp-txservice";

import { getConfig, NxtpRouterConfig } from "./config";
import { getSubgraphContractReader } from "./adapters/subgraph";
import { getContractWriter } from "./adapters/contract";
import { bindContractReader } from "./bindings/contractReader";
import { bindMessaging } from "./bindings/messaging";
import { bindFastify } from "./bindings/fastify";
import { Cache, ContractReader, ContractWriter } from "./lib/entities";
import { getCache } from "./adapters/redisCache";
import { bindMetrics } from "./bindings/metrics";
import { Web3Signer } from "./adapters/web3signer";
import { bindPrices } from "./bindings/prices";

export type Context = {
  config: NxtpRouterConfig;
  wallet: Wallet | Web3Signer;
  isRouterContract: boolean;
  routerAddress: string;
  signerAddress: string;
  logger: Logger;
  messaging: RouterNxtpNatsMessagingService;
  txService: TransactionService;
  contractReader: ContractReader;
  contractWriter: ContractWriter;
  cache: Cache;
  chainData: Map<string, ChainData>;
};

const context: Context = {} as any;
export const getContext = (): Context => {
  if (!context || Object.keys(context).length === 0) {
    throw new Error("Context not created");
  }
  return context;
};

export const makeRouter = async () => {
  const requestContext = createRequestContext("makeRouter");
  const methodContext = createMethodContext(makeRouter.name);
  try {
    // set up external, config based services
    const chainData = await getChainData();
    if (!chainData) {
      throw new Error("Could not get chain data");
    }
    context.chainData = chainData;
    context.config = await getConfig();
    context.wallet = context.config.mnemonic
      ? Wallet.fromMnemonic(context.config.mnemonic)
      : new Web3Signer(context.config.web3SignerUrl!);
    context.signerAddress = await context.wallet.getAddress();
    context.isRouterContract = context.config.routerContractAddress ? true : false;
    context.routerAddress = context.config.routerContractAddress || context.signerAddress;
    context.logger = new Logger({
      level: context.config.logLevel,
      name: context.wallet.address,
    });
    context.logger.info("Connected Router", requestContext, methodContext, {
      signerAddress: context.signerAddress,
      isRouterContract: context.isRouterContract,
      routerAddress: context.routerAddress,
    });

    context.logger.info("Config generated", requestContext, methodContext, {
      config: Object.assign(context.config, context.config.mnemonic ? { mnemonic: "......." } : { mnemonic: "N/A" }),
    });
    context.messaging = new RouterNxtpNatsMessagingService({
      signer: context.wallet,
      authUrl: context.config.authUrl,
      natsUrl: context.config.natsUrl,
      logger: context.logger,
    });
    await context.messaging.connect();

    // TODO: txserviceconfig log level
    context.txService = new TransactionService(
      context.logger.child({ module: "TransactionService" }, context.config.logLevel),
      context.config.chainConfig as any,
      context.wallet,
    );

    // adapters
    context.cache = await getCache();
    context.contractReader = await getSubgraphContractReader();
    context.contractWriter = await getContractWriter();

    // bindings
    if (!context.config.diagnosticMode) {
      await bindContractReader();
    } else {
      logger.warn("Running router in diagnostic mode");
    }
    if (!context.config.cleanUpMode) {
      await bindMessaging();
    } else {
      logger.warn("Running router in cleanup mode");
    }

    if (context.config.priceCacheMode) {
      await bindPrices();
    } else {
      logger.warn("Running router not in price cache mode");
    }
    await bindFastify();
    await bindMetrics();
    logger.info("Router ready!");
  } catch (e) {
    console.error("Error starting router :(", e);
    process.exit();
  }
};
