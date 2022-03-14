import { jsonifyError } from "@connext/nxtp-utils";
import fastify from "fastify";
import { register } from "prom-client";

import { context } from "../../router";

import {
  RemoveLiquidityRequest,
  RemoveLiquidityRequestSchema,
  RemoveLiquidityResponseSchema,
  AddLiquidityForRequest,
  AddLiquidityForRequestSchema,
  AddLiquidityForResponseSchema,
} from "./schema";

export const bindServer = () =>
  new Promise<void>((res) => {
    const {
      adapters: { wallet },
      config,
      logger,
    } = context;

    const server = fastify();

    server.get("/ping", async () => {
      return "pong\n";
    });

    server.get("/config", async () => {
      return {
        signerAddress: await wallet.getAddress(),
      };
    });

    server.get("/metrics", async (request, response) => {
      try {
        const res = await register.metrics();
        return response.status(200).send(res);
      } catch (e: any) {
        const json = jsonifyError(e);
        logger.error("Failed to collect metrics", undefined, undefined, json);
        return response.status(500).send(json);
      }
    });

    server.post<{ Body: RemoveLiquidityRequest }>(
      "/remove-liquidity",
      { schema: { body: RemoveLiquidityRequestSchema, response: { "2xx": RemoveLiquidityResponseSchema } } },
      async (req, res) => {
        // const requestContext = createRequestContext("/remove-liquidity");
        const { adminToken } = req.body;
        if (adminToken !== config.server.adminToken) {
          return res.code(401).send("Unauthorized to perform this operation");
        }
        return res.code(500).send("Not implemented");
      },
    );

    server.post<{ Body: AddLiquidityForRequest }>(
      "/add-liquidity-for",
      { schema: { body: AddLiquidityForRequestSchema, response: { "2xx": AddLiquidityForResponseSchema } } },
      async (req, res) => {
        // const requestContext = createRequestContext("/add-liquidity-for");
        const { adminToken } = req.body;
        if (adminToken !== config.server.adminToken) {
          return res.code(401).send("Unauthorized to perform this operation");
        }
        return res.code(500).send("Not implemented");
      },
    );

    server.listen(config.server.port, config.server.host, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      logger.info(`Server listening at ${address}`);
      res();
    });
  });
