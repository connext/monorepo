import { logger, Wallet } from "ethers";
import { RouterNxtpNatsMessagingService } from "@connext/nxtp-utils";
import { ChainConfig, TransactionService } from "@connext/nxtp-txservice";
import pino, { BaseLogger } from "pino";

import { getConfig, NxtpRouterConfig } from "./config";
import { ContractReader, subgraphContractReader } from "./adapters/subgraph";
import { contractWriter, ContractWriter } from "./adapters/contract";
import { bindContractReader } from "./bindings/contractReader";
import { bindMessaging } from "./bindings/messaging";
import { bindFastify } from "./bindings/fastify";

type Context = {
  config: NxtpRouterConfig;
  wallet: Wallet;
  logger: BaseLogger;
  messaging: RouterNxtpNatsMessagingService;
  txService: TransactionService;
  contractReader: ContractReader;
  contractWriter: ContractWriter;
};

const context: Context = {} as any;
export const getContext = (): Context => {
  if (!context) {
    throw new Error("Context not created");
  }
  return context;
};

export const makeRouter = async () => {
  // set up external, config based services
  context.config = getConfig();
  context.wallet = Wallet.fromMnemonic(context.config.mnemonic);
  context.logger = pino({
    level: context.config.logLevel,
    name: context.wallet.address,
  });
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
  context.contractReader = subgraphContractReader();
  context.contractWriter = contractWriter();

  // bindings
  await bindContractReader();
  await bindMessaging();
  await bindFastify();

  logger.info("Router ready 🚀");
};

makeRouter();
