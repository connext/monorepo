import { Wallet } from "ethers";
import fastify from "fastify";
import {
  createRequestContext,
  jsonifyError,
  RouterNxtpNatsMessagingService,
  TAddress,
  TChainId,
  TDecimalString,
} from "@connext/nxtp-utils";
import { ChainConfig, TransactionService } from "@connext/nxtp-txservice";
import pino, { BaseLogger } from "pino";
import { Static, Type } from "@sinclair/typebox";

import { getConfig, NxtpRouterConfig } from "./config";
import { Handler } from "./handler";
import { Subgraph } from "./subgraph";
import { setupListeners } from "./listener";
import { TransactionManager } from "./contract";

const server = fastify();

type Context = {
  config: NxtpRouterConfig;
  wallet: Wallet;
  logger: BaseLogger;
  messaging: RouterNxtpNatsMessagingService;
  txService: TransactionService;
};

let context: Context | undefined;

const createContext = async (): Promise<Context> => {
  const config = getConfig();
  const wallet = Wallet.fromMnemonic(config.mnemonic);
  const logger = pino({
    level: config.logLevel,
    name: wallet.address,
  });
  logger.info({ signer: wallet.address }, "Created signer from mnemonic");
  const messaging = new RouterNxtpNatsMessagingService({
    signer: wallet,
    authUrl: config.authUrl,
    natsUrl: config.natsUrl,
    logger,
  });

  const subgraphs: Record<number, { subgraph: string }> = {};
  const chains: { [chainId: string]: ChainConfig } = {};
  Object.entries(config.chainConfig).forEach(([chainId, config]) => {
    subgraphs[parseInt(chainId)] = { subgraph: config.subgraph };
    chains[chainId] = {
      confirmations: config.confirmations,
      providers: config.providers.map((url) => ({ url })),
    } as ChainConfig;
  });
  const txService = new TransactionService(logger.child({ module: "TransactionService" }), wallet, { chains });
  const subgraph = new Subgraph(
    subgraphs,
    wallet.address,
    logger.child({ module: "SubgraphTransactionManagerListener" }),
  );
  const transactionManager = new TransactionManager(
    txService,
    wallet.address,
    logger.child({ module: "TransactionManager" }),
  );

  return { config, wallet, logger, messaging, txService };
};

export const getContext = (): Context => {
  if (!context) {
    throw new Error("Context not created");
  }
  return context;
};

export const makeRouter = async () => {
  context = await createContext();
};

const handler = new Handler(
  messaging,
  subgraph,
  transactionManager,
  txService,
  wallet,
  logger.child({ module: "Handler" }),
);

export const AddLiquidityRequestSchema = Type.Object({
  chainId: TChainId,
  assetId: TAddress,
  amount: TDecimalString,
});
export type AddLiquidityRequest = Static<typeof AddLiquidityRequestSchema>;

export const RemoveLiquidityRequestSchema = Type.Intersect([
  AddLiquidityRequestSchema,
  Type.Object({
    recipientAddress: Type.Optional(TAddress),
  }),
]);
export type RemoveLiquidityRequest = Static<typeof RemoveLiquidityRequestSchema>;

export const AddLiquidityResponseSchema = Type.Object({
  transactionHash: Type.String(),
});
export type AddLiquidityResponse = Static<typeof AddLiquidityResponseSchema>;

export const RemoveLiquidityResponseSchema = Type.Object({
  transactionHash: Type.String(),
});
export type RemoveLiquidityResponse = Static<typeof RemoveLiquidityResponseSchema>;

server.addHook("onReady", async function () {
  getConfig(); // validate config
  await messaging.connect();
  await setupListeners(messaging, subgraph, handler, logger);
});

server.get("/ping", async () => {
  return "pong\n";
});

server.get("/config", async () => {
  return {
    signerAddress: wallet.address,
  };
});

server.get<{ Body: RemoveLiquidityRequest }>(
  "/remove-liquidity",
  { schema: { body: RemoveLiquidityRequestSchema, response: { "2xx": RemoveLiquidityResponseSchema } } },
  async (req) => {
    const requestContext = createRequestContext("/remove-liquidity");
    const result = await transactionManager.removeLiquidity(
      req.body.chainId,
      req.body.amount,
      req.body.assetId,
      req.body.recipientAddress,
      requestContext,
    );
    if (result.isOk()) {
      return { transactionHash: result.value.transactionHash };
    } else {
      return { err: jsonifyError(result.error) };
    }
  },
);

server.listen(8080, "0.0.0.0", (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
