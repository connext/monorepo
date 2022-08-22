import { jsonifyError, NxtpError, ClearCacheRequestSchema, ClearCacheRequest, AdminRequest } from "@connext/nxtp-utils";
import fastify, { FastifyInstance, FastifyReply } from "fastify";
import { register } from "prom-client";

import { getContext } from "../../publisher";

export const bindServer = async (): Promise<FastifyInstance> => {
  const { config, logger } = getContext();

  const server = fastify();

  server.get("/ping", (_, res) => api.get.ping(res));

  server.get("/metrics", (_, res) => api.get.metrics(res));

  server.post<{ Body: ClearCacheRequest }>(
    "/clear-cache",
    { schema: { body: ClearCacheRequestSchema } },
    async (req, res) => api.auth.admin(req.body, res, api.post.clearCache),
  );

  const address = await server.listen({ port: config.server.pub.port, host: config.server.pub.host });
  logger.info(`Server listening at ${address}`);
  return server;
};

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
    clearCache: async (res: FastifyReply) => {
      const {
        adapters: { cache },
      } = getContext();
      await cache.transfers.clear();
      return res.status(200).send();
    },
  },
};
