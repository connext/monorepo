import { createRequestContext, jsonifyError } from "@connext/nxtp-utils";
import fastify from "fastify";

import { getContext } from "../../router";
import { handleActiveTransactions } from "../contractReader";

import { prepareCancel } from "./cancel";
import {
  AdminRequest,
  AdminSchema,
  CancelSenderTransferRequest,
  CancelSenderTransferRequestSchema,
  RemoveLiquidityRequest,
  RemoveLiquidityRequestSchema,
  RemoveLiquidityResponseSchema,
} from "./schema";

export const bindFastify = () =>
  new Promise<void>((res) => {
    const { wallet, contractWriter, config, logger, contractReader } = getContext();

    const server = fastify();

    server.get("/ping", async () => {
      return "pong\n";
    });

    server.get("/config", async () => {
      return {
        signerAddress: wallet.address,
      };
    });

    server.post<{ Body: RemoveLiquidityRequest }>(
      "/remove-liquidity",
      { schema: { body: RemoveLiquidityRequestSchema, response: { "2xx": RemoveLiquidityResponseSchema } } },
      async (req, res) => {
        const requestContext = createRequestContext("/remove-liquidity");
        const { adminToken, chainId, amount, assetId, recipientAddress } = req.body;
        if (adminToken !== config.adminToken) {
          return res.code(401).send("Unauthorized to perform this operation");
        }
        try {
          const result = await contractWriter.removeLiquidity(
            chainId,
            amount,
            assetId,
            recipientAddress,
            requestContext,
          );
          return { transactionHash: result.transactionHash };
        } catch (err) {
          return res.code(400).send({ err: jsonifyError(err), requestContext });
        }
      },
    );

    server.post<{ Body: CancelSenderTransferRequest }>(
      "/cancel-sender",
      { schema: { body: CancelSenderTransferRequestSchema, response: { "2xx": RemoveLiquidityResponseSchema } } },
      async (req, res) => {
        const requestContext = createRequestContext("/cancel-sender");
        const { transactionId, adminToken, user, senderChainId } = req.body;
        if (adminToken !== config.adminToken) {
          return res.code(401).send("Unauthorized to perform this operation");
        }
        try {
          const senderTx = await prepareCancel({ senderChainId, user, transactionId });
          const result = await contractWriter.cancel(
            senderTx.txData.sendingChainId,
            { signature: senderTx.signature!, txData: senderTx.txData },
            requestContext,
          );
          return { transactionHash: result.transactionHash };
        } catch (err) {
          return res.code(400).send({ err: jsonifyError(err), requestContext });
        }
      },
    );

    server.post<{ Body: AdminRequest }>(
      "/process-active-transactions",
      { schema: { body: AdminSchema } },
      async (req, res) => {
        const requestContext = createRequestContext("/process-active-transactions");
        const { adminToken } = req.body;
        if (adminToken !== config.adminToken) {
          return res.code(401).send("Unauthorized to perform this operation");
        }
        try {
          const activeTxs = await contractReader.getActiveTransactions();
          await handleActiveTransactions(activeTxs);
          return res.code(200).send();
        } catch (err) {
          return res.code(400).send({ err: jsonifyError(err), requestContext });
        }
      },
    );

    server.listen(config.port, config.host, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      logger.info(`Server listening at ${address}`);
      res();
    });
  });
