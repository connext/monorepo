import { logger, Wallet } from "ethers";
import {
  ChainData,
  createMethodContext,
  createRequestContext,
  getChainData,
  Logger,
  RouterNxtpNatsMessagingService,
} from "@connext/nxtp-utils";
import { ChainConfig, TransactionService } from "@connext/nxtp-txservice";

import { getConfig, NxtpRouterConfig } from "./config";
import { ContractReader, subgraphContractReader } from "./adapters/subgraph";
import { contractWriter, ContractWriter } from "./adapters/contract";
import { bindContractReader } from "./bindings/contractReader";
import { bindMessaging } from "./bindings/messaging";
import { bindFastify } from "./bindings/fastify";
import { bindMetrics } from "./bindings/metrics";

export type Context = {
  config: NxtpRouterConfig;
  wallet: Wallet;
  logger: Logger;
  messaging: RouterNxtpNatsMessagingService;
  txService: TransactionService;
  contractReader: ContractReader;
  contractWriter: ContractWriter;
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
    context.wallet = Wallet.fromMnemonic(context.config.mnemonic);
    context.logger = new Logger({
      level: context.config.logLevel,
      name: context.wallet.address,
    });
    context.logger.info("Config generated", requestContext, methodContext, {
      config: { ...context.config, mnemonic: "......." },
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
        gasStations: config.gasStations,
        defaultInitialGas: config.defaultInitialGas,
      } as ChainConfig;
    });
    // TODO: txserviceconfig log level
    context.txService = new TransactionService(
      context.logger.child({ module: "TransactionService" }, context.config.logLevel),
      {
        chains,
      },
      context.wallet,
    );

    // adapters
    context.contractReader = subgraphContractReader();
    context.contractWriter = contractWriter();

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
    await bindFastify();
    await bindMetrics();
    logger.info("Router ready 🚀");
  } catch (e) {
    console.error("Error starting router :(", e);
    process.exit();
  }
};
