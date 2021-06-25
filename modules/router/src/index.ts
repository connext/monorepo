import { Wallet } from "ethers";
import fastify from "fastify";
import { NatsNxtpMessagingService } from "@connext/nxtp-utils";
import { TransactionService } from "@connext/nxtp-txservice";
import pino from "pino";

import { getConfig } from "./config";
import { Handler } from "./handler";
import { SubgraphTransactionManagerListener } from "./transactionManagerListener";
import { setupListeners } from "./listener";

const server = fastify();

const config = getConfig();
const wallet = Wallet.fromMnemonic(config.mnemonic);
const logger = pino({ name: wallet.address });
const messaging = new NatsNxtpMessagingService({
  signer: wallet,
  authUrl: config.authUrl,
  natsUrl: config.natsUrl,
});
const subgraphs: { [chainId: number]: string } = {};
const providers: { [chainId: number]: string[] } = {};
Object.entries(config.chainConfig).forEach(([chainId, config]) => {
  // @ts-ignore
  subgraphs[parseInt(chainId)] = config.subgraph;
  providers[parseInt(chainId)] = config.provider;
});
const subgraph = new SubgraphTransactionManagerListener(subgraphs, wallet.address, logger);
const txService = new TransactionService(logger, wallet, providers);
const handler = new Handler(messaging, subgraph, wallet, txService, logger);

server.addHook("onReady", async function() {
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

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
