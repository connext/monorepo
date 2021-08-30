import { logger, Wallet } from "ethers";
import { RouterNxtpNatsMessagingService } from "@connext/nxtp-utils";
import { ChainConfig, TransactionService } from "@connext/nxtp-txservice";
import pino, { BaseLogger } from "pino";

import { getConfig, NxtpRouterConfig } from "./config";
import { getSubgraphContractReader } from "./adapters/subgraph";
import { getContractWriter } from "./adapters/contract";
import { bindContractReader } from "./bindings/contractReader";
import { bindMessaging } from "./bindings/messaging";
import { bindFastify } from "./bindings/fastify";
import { Cache, ContractReader, ContractWriter } from "./lib/entities";
import { getCache } from "./adapters/redisCache";

export type Context = {
  config: NxtpRouterConfig;
  wallet: Wallet;
  logger: BaseLogger;
  messaging: RouterNxtpNatsMessagingService;
  txService: TransactionService;
  contractReader: ContractReader;
  contractWriter: ContractWriter;
  cache: Cache;
};

const context: Context = {} as any;
export const getContext = (): Context => {
  if (!context || Object.keys(context).length === 0) {
    throw new Error("Context not created");
  }
  return context;
};

export const makeRouter = async () => {
  try {
    // set up external, config based services
    context.config = await getConfig();
    context.wallet = Wallet.fromMnemonic(context.config.mnemonic);
    context.logger = pino({
      level: context.config.logLevel,
      name: context.wallet.address,
    });
    context.logger.info({ config: { ...context.config, mnemonic: "......." } }, "Config generated");
    context.messaging = new RouterNxtpNatsMessagingService({
      signer: context.wallet,
      authUrl: context.config.authUrl,
      natsUrl: context.config.natsUrl,
      logger: context.logger,
    });
    await context.messaging.connect();
    const chains: { [chainId: string]: ChainConfig } = {};
    Object.entries(context.config.chainConfig).forEach(([chainId, config]) => {
      chains[chainId] = {
        confirmations: config.confirmations,
        providers: config.providers.map((url) => ({ url })),
      } as ChainConfig;
    });
    context.txService = new TransactionService(context.logger.child({ module: "TransactionService" }), context.wallet, {
      chains,
    });

    // adapters
    context.cache = await getCache();
    context.contractReader = await getSubgraphContractReader();
    context.contractWriter = await getContractWriter();

    // bindings
    await bindContractReader();
    await bindMessaging();
    await bindFastify();

    logger.info("Router ready 🚀");
  } catch (e) {
    console.error("Error starting router :(", e);
    process.exit();
  }
};
