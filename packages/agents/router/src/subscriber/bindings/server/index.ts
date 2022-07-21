import { jsonifyError, NxtpError, AdminRequest } from "@connext/nxtp-utils";
import fastify, { FastifyInstance, FastifyReply } from "fastify";
import { register } from "prom-client";

import { getContext } from "../../subscriber";

export const bindServer = async (): Promise<FastifyInstance> => {
  const { config, logger } = getContext();

  const server = fastify();

  server.get("/ping", (_, res) => api.get.ping(res));

  server.get("/config", (_, res) => api.get.config(res));

  server.get("/metrics", (_, res) => api.get.metrics(res));

  const address = await server.listen({ port: config.server.sub.port, host: config.server.sub.host });
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
};
