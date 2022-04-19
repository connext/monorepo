import {
  jsonifyError,
  NxtpError,
  RemoveLiquidityRequest,
  RemoveLiquidityRequestSchema,
  RemoveLiquidityResponseSchema,
  AdminRequest,
  XCallArgsSchema,
} from "@connext/nxtp-utils";

import { NxtpSdkConfigSchema, NxtpSdk } from "nxtp-sdk";
import fastify, { FastifyInstance, FastifyReply } from "fastify";

let sdkInstance: NxtpSdk;

export const sdkServer = () =>
  new Promise<FastifyInstance>((res) => {
    const server = fastify();

    server.addHook("onReady", async () => {
      sdkBaseInstance = new NxtpSdk(config);
    });

    server.get("/ping", (_, res) => api.get.ping(res));

    server.get("/config", (_, res) => api.get.config(res));

    server.post<{ Body: NxtpSdkConfigSchema }>(
      "/create",
      { schema: { body: NxtpSdkConfigSchema, response: NxtpSdk } },
      async (req, res) => api.post.create(req.body, res, api.post.create),
    );

    server.post<{ Body: XCallArgsSchema }>(
      "/xcall",
      { schema: { body: XCallArgsSchema, response: { "2xx": RemoveLiquidityResponseSchema } } },
      async (req, res) => api.post.xcall(req.body, res, api.post.removeLiquidity),
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
  },
  post: {
    create: async (res: FastifyReply) => {
      await NxtpSdk.create(config, signer, logger);
      return res.status(200).send();
    },
    xcall: async (res: FastifyReply) => {
      return res.status(500).send("Not implemented");
    },
  },
};
