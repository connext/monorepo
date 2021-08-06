import { createRequestContext, jsonifyError } from "@connext/nxtp-utils";
import fastify from "fastify";

import { getContext } from "../../router";

import { RemoveLiquidityRequest, RemoveLiquidityRequestSchema, RemoveLiquidityResponseSchema } from "./schema";

export const bindFastify = () =>
  new Promise<void>((res) => {
    const { wallet, contractWriter, config, logger } = getContext();

    const server = fastify();

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
        try {
          const result = await contractWriter.removeLiquidity(
            req.body.chainId,
            req.body.amount,
            req.body.assetId,
            req.body.recipientAddress,
            requestContext,
          );
          return { transactionHash: result.transactionHash };
        } catch (err) {
          return { err: jsonifyError(err) };
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
