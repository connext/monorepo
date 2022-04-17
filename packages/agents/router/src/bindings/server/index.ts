import {
  jsonifyError,
  NxtpError,
  RemoveLiquidityRequest,
  RemoveLiquidityRequestSchema,
  RemoveLiquidityResponseSchema,
  AddLiquidityForRequest,
  AddLiquidityForRequestSchema,
  AddLiquidityForResponseSchema,
  ClearCacheRequestSchema,
  ClearCacheRequest,
  AdminRequest,
} from "@connext/nxtp-utils";
import fastify, { FastifyInstance, FastifyReply } from "fastify";
import { register } from "prom-client";

import { getContext } from "../../router";

export const bindServer = () =>
  new Promise<FastifyInstance>((res) => {
    const { config, logger } = getContext();

    const server = fastify();

    server.get("/ping", (_, res) => api.get.ping(res));

    server.get("/config", (_, res) => api.get.config(res));

    server.get("/metrics", (_, res) => api.get.metrics(res));

    server.post<{ Body: RemoveLiquidityRequest }>(
      "/remove-liquidity",
      { schema: { body: RemoveLiquidityRequestSchema, response: { "2xx": RemoveLiquidityResponseSchema } } },
      async (req, res) => api.auth.admin(req.body, res, api.post.removeLiquidity),
    );

    server.post<{ Body: AddLiquidityForRequest }>(
      "/add-liquidity-for",
      { schema: { body: AddLiquidityForRequestSchema, response: { "2xx": AddLiquidityForResponseSchema } } },
      async (req, res) => api.auth.admin(req.body, res, api.post.addLiquidityFor),
    );

    server.post<{ Body: ClearCacheRequest }>(
      "/clear-cache",
      { schema: { body: ClearCacheRequestSchema } },
      async (req, res) => api.auth.admin(req.body, res, api.post.clearCache),
    );

    server.listen(config.server.port, config.server.host, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      logger.info(`Server listening at ${address}`);
      res(server);
    });
  });

export const api = {
  auth: {
    admin: (body: AdminRequest, res: FastifyReply, nested: (res: FastifyReply) => Promise<void>) => {
      const { config } = getContext();
      const { adminToken } = body;
      if (adminToken !== config.server.adminToken) {
        return res.status(401).send("Unauthorized to perform this operation");
      }
      return nested(res);
    },
  },
  get: {
    ping: async (res: FastifyReply) => {
      return res.status(200).send("pong\n");
    },
    config: async (res: FastifyReply) => {
      const {
        adapters: { wallet },
        logger,
      } = getContext();
      try {
        return res.status(200).send({
          signerAddress: await wallet.getAddress(),
        });
      } catch (e: unknown) {
        const json = jsonifyError(e as NxtpError);
        logger.error("Failed to get wallet address", undefined, undefined, json);
        return res.status(500).send(json);
      }
    },
    metrics: async (res: FastifyReply) => {
      const { logger } = getContext();
      try {
        const result = await register.metrics();
        return res.status(200).send(result);
      } catch (e: unknown) {
        const json = jsonifyError(e as NxtpError);
        logger.error("Failed to collect metrics", undefined, undefined, json);
        return res.status(500).send(json);
      }
    },
  },
  post: {
    removeLiquidity: async (res: FastifyReply) => {
      return res.status(500).send("Not implemented");
    },
    addLiquidityFor: async (res: FastifyReply) => {
      return res.status(500).send("Not implemented");
    },
    clearCache: async (res: FastifyReply) => {
      const {
        adapters: { cache },
      } = getContext();
      await cache.auctions.clear();
      await cache.transfers.clear();
      return res.status(200).send();
    },
  },
};
