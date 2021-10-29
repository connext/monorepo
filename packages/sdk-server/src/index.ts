import fastify from "fastify";
import { providers, BigNumber } from "ethers";
import pino from "pino";
import { Type } from "@sinclair/typebox";
import { NxtpSdkBase, CrossChainParams, CrossChainParamsSchema, CancelParams, CancelSchema } from "@connext/nxtp-sdk";
import {
  AuctionResponse,
  AuctionResponseSchema,
  TransactionPreparedEvent,
  TransactionPreparedEventSchema,
  MetaTxResponse,
} from "@connext/nxtp-utils";

import { getConfig } from "./config";

let sdkBaseInstance: NxtpSdkBase;
const config = getConfig();

const server = fastify({ logger: config.logger instanceof pino, pluginTimeout: 300_000, disableRequestLogging: false });

/// REQUEST PATHS

const getActiveTransactions = "/get-active-transactions";
const getHistoricalTransactions = "/get-historical-transactions";
const getTransferQuote = "/get-transfer-quote";
const approveForPrepare = "/approve-for-prepare";
const prepareTransfer = "/prepare-transfer";
const fulfillTransfer = "/fulfill-transfer";
const cancel = "/cancel";

/// REPLY PATHS

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

server.addHook("onReady", async () => {
  sdkBaseInstance = new NxtpSdkBase(config);
});

server.get("/", async () => {
  console.log(`Server listening`);
  return "welcome to connext!\n";
});

server.get("/ping", async () => {
  return "pong\n";
});

server.get(getActiveTransactions, async (request, response) => {
  console.log(sdkBaseInstance);
  const res = await sdkBaseInstance.getActiveTransactions();
  return response.status(200).send(res);
});

server.get(getHistoricalTransactions, async (request, response) => {
  const res = await sdkBaseInstance.getHistoricalTransactions();
  return response.status(200).send(res);
});

server.post<{ Body: CrossChainParams; Reply: AuctionResponse }>(
  getTransferQuote,
  {
    schema: {
      body: CrossChainParamsSchema,
      response: {
        200: AuctionResponseSchema,
      },
    },
  },
  async (request, response) => {
    const { body: req } = request;
    const res = await sdkBaseInstance.getTransferQuote(req);
    return response.status(200).send(res);
  },
);

server.post<{
  Body: { transferParams: AuctionResponse; infiniteApprove?: boolean };
  Reply: providers.TransactionRequest | undefined;
}>(
  approveForPrepare,
  {
    schema: {
      body: { transferParams: AuctionResponseSchema, infiniteApprove: Type.Boolean() },
    },
  },
  async (request, response) => {
    const { body: req } = request;
    const res = await sdkBaseInstance.approveForPrepare(req.transferParams, req.infiniteApprove);
    return response.status(200).send(res);
  },
);

server.post<{
  Body: AuctionResponse;
  Reply: providers.TransactionRequest;
}>(
  prepareTransfer,
  {
    schema: {
      body: AuctionResponseSchema,
    },
  },
  async (request, response) => {
    const { body: req } = request;
    const res = await sdkBaseInstance.prepareTransfer(req);
    return response.status(200).send(res);
  },
);

server.post<{
  Body: {
    params: Omit<TransactionPreparedEvent, "caller">;
    fulfillSignature: string;
    decryptedCallData: string;
    relayerFee?: string;
    useRelayers?: boolean;
  };
  Reply: { fulfillRequest?: providers.TransactionRequest; metaTxResponse?: MetaTxResponse };
}>(
  fulfillTransfer,
  {
    schema: {
      body: {
        params: TransactionPreparedEventSchema,
        fulfillSignature: Type.String(),
        decryptedCallData: Type.String(),
        relayerFee: Type.Optional(Type.String()),
        useRelayers: Type.Optional(Type.Boolean()),
      },
    },
  },
  async (request, response) => {
    const { body: req } = request;
    const res = await sdkBaseInstance.fulfillTransfer(
      req.params,
      req.fulfillSignature,
      req.decryptedCallData,
      req.relayerFee,
      req.useRelayers,
    );
    return response.status(200).send(res);
  },
);

server.post<{
  Body: { cancelParams: CancelParams; chainId: number };
  Reply: providers.TransactionRequest;
}>(
  cancel,
  {
    schema: {
      body: { cancelParams: CancelSchema, chainId: Type.Number() },
    },
  },
  async (request, response) => {
    const { body: req } = request;
    const res = await sdkBaseInstance.cancel(req.cancelParams, req.chainId);
    return response.status(200).send(res);
  },
);
