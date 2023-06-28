import { AdminRequest, ClearCacheRequestSchema, ClearCacheRequest, NxtpError, jsonifyError } from "@connext/nxtp-utils";
import fastify, { FastifyInstance, FastifyReply } from "fastify";

import { getContext } from "../prover";

export const bindHealthServer = async (): Promise<FastifyInstance> => {
  const { config, logger } = getContext();

  const server = fastify();

  server.get("/ping", (_, res) => api.get.ping(res));

  server.get("/nonce", (_, res) => api.get.nonce(res));

  server.post<{ Body: ClearCacheRequest }>(
    "/clear-cache",
    { schema: { body: ClearCacheRequestSchema } },
    async (req, res) => api.auth.admin(req.body, res, api.post.clearCache),
  );

  const address = await server.listen({ port: config.server.prover.port, host: config.server.prover.host });
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
    nonce: async (res: FastifyReply) => {
      const {
        config: { chains },
        logger,
        adapters: { cache },
      } = getContext();
      try {
        const result: any = {};
        for (const originDomain of Object.keys(chains)) {
          result[originDomain] = await cache.messages.getNonce(originDomain);
        }
        return res.status(200).send(JSON.stringify(result));
      } catch (e: unknown) {
        const json = jsonifyError(e as NxtpError);
        logger.error("Failed to getNonce", undefined, undefined, json);
        return res.status(500).send(json);
      }
    },
  },
  post: {
    clearCache: async (res: FastifyReply) => {
      const {
        adapters: { cache },
      } = getContext();
      await cache.messages.clear();
      return res.status(200).send();
    },
  },
};
