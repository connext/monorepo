import fastify, { FastifyInstance, FastifyReply } from "fastify";
import Broker from "amqplib";
import {
  ExecStatus,
  createLoggingContext,
  jsonifyError,
  ExecuteFastApiPostBidReq,
  ExecuteFastApiBidResponse,
  ExecuteFastApiPostBidReqSchema,
  ExecuteFastApiBidResponseSchema,
  SequencerApiErrorResponseSchema,
  SequencerApiErrorResponse,
  ExecuteFastApiGetExecStatusResponse,
  ExecuteFastApiGetAuctionsStatusResponseSchema,
  ClearCacheRequest,
  ClearCacheRequestSchema,
  AdminRequest,
  NxtpError,
  ExecutorDataSchema,
  ExecutorPostDataRequest,
  ExecutorPostDataResponseSchema,
  ExecutorPostDataResponse,
  ExecStatusRequest,
  ExecStatusResponse,
  ExecStatusResponseSchema,
  RouterPingRequest,
  RouterPingRequestSchema,
  RouterPingMessage,
  RouterStatusApiResponseSchema,
  RouterStatusApiResponse,
} from "@connext/nxtp-utils";
import { verifyMessage } from "ethers/lib/utils";

import { getContext } from "../../sequencer";
import { MessageType, HTTPMessage } from "../../lib/entities";

export const bindServer = async (queueName: string, channel: Broker.Channel): Promise<FastifyInstance> => {
  const {
    config,
    logger,
    adapters: { cache },
  } = getContext();
  const server = fastify();

  server.get("/ping", (_, res) => api.get.ping(res));

  server.get("/supportedBidVersion", (_, res) => api.get.supportedBidVersion(res));

  server.get<{
    Params: { router: string };
    Reply: RouterStatusApiResponse | SequencerApiErrorResponse;
  }>(
    "/router-status/:router",
    {
      schema: {
        response: {
          200: RouterStatusApiResponseSchema,
          500: SequencerApiErrorResponseSchema,
        },
      },
    },
    async (request, response) => {
      const { requestContext, methodContext } = createLoggingContext("GET /router-status/:router endpoint");

      try {
        const { router } = request.params;
        const lastActiveTimestamp = await cache.routers.getLastActive(router.toLowerCase());
        const lastBidTimestamp = await cache.routers.getLastBidTime(router.toLowerCase());

        return response.status(200).send({
          lastActiveTimestamp,
          lastBidTimestamp: lastBidTimestamp ?? ({} as any),
        });
      } catch (error: unknown) {
        logger.debug(`Router Status by Router Get Error`, requestContext, methodContext, jsonifyError(error as Error));
        return response
          .code(500)
          .send({ message: `Router Status by Router Get Error`, error: jsonifyError(error as Error) });
      }
    },
  );

  server.get<{
    Params: { transferId: string };
    Reply: ExecuteFastApiGetExecStatusResponse | SequencerApiErrorResponse;
  }>(
    "/execute-fast/:transferId",
    {
      schema: {
        response: {
          200: ExecuteFastApiGetAuctionsStatusResponseSchema,
          500: SequencerApiErrorResponseSchema,
        },
      },
    },
    async (request, response) => {
      const { requestContext, methodContext } = createLoggingContext("GET /execute-fast/:transferId endpoint");
      try {
        const { transferId } = request.params;
        const status = await cache.auctions.getExecStatus(transferId);
        if (status === ExecStatus.None) {
          throw new Error("No auction found for transferId");
        }
        const auction = await cache.auctions.getAuction(transferId);
        if (!auction) {
          throw new Error("Critical error: auction status was present but data not found");
        }

        const task = await cache.auctions.getMetaTxTask(transferId);

        return response.status(200).send({
          bids: auction.bids,
          status,
          taskId: task?.taskId,
          attempts: task?.attempts,
          timestamps: {
            start: auction.timestamp,
            sent: task?.timestamp,
          },
        });
      } catch (error: unknown) {
        logger.debug(`Auction by TransferId Get Error`, requestContext, methodContext, jsonifyError(error as Error));
        return response
          .code(500)
          .send({ message: `Auction by TransferId Get Error`, error: jsonifyError(error as Error) });
      }
    },
  );

  server.post<{ Body: ExecuteFastApiPostBidReq; Reply: ExecuteFastApiBidResponse | SequencerApiErrorResponse }>(
    "/execute-fast",
    {
      schema: {
        body: ExecuteFastApiPostBidReqSchema,
        response: {
          200: ExecuteFastApiBidResponseSchema,
          500: SequencerApiErrorResponseSchema,
        },
      },
    },
    async (request, response) => {
      const { requestContext, methodContext } = createLoggingContext(
        "POST /execute-fast/:transferId endpoint",
        undefined,
        "",
      );
      try {
        const bid = request.body;
        requestContext.transferId = bid.transferId;

        const message: HTTPMessage = { transferId: bid.transferId, type: MessageType.ExecuteFast, data: bid };

        channel.publish(config.messageQueue.publisher!, queueName, Buffer.from(JSON.stringify(message)), {
          persistent: config.messageQueue.exchanges[0].persistent,
        });
        return response.status(200).send({ message: "Bid received", transferId: bid.transferId, router: bid.router });
      } catch (error: unknown) {
        logger.error(`Failed to submit fastpath data`, requestContext, methodContext, jsonifyError(error as Error));
        const type = (error as NxtpError).type;
        return response
          .code(500)
          .send({ message: type ?? "Failed to submit fastpath data", error: jsonifyError(error as Error) });
      }
    },
  );

  server.post<{ Body: ExecutorPostDataRequest; Reply: ExecutorPostDataResponse | SequencerApiErrorResponse }>(
    "/execute-slow",
    {
      schema: {
        body: ExecutorDataSchema,
        response: {
          200: ExecutorPostDataResponseSchema,
          500: SequencerApiErrorResponseSchema,
        },
      },
    },
    async (request, response) => {
      const { requestContext, methodContext } = createLoggingContext("POST /execute-slow endpoint");
      try {
        const executorData = request.body;

        const message: HTTPMessage = {
          transferId: executorData.transferId,
          type: MessageType.ExecuteSlow,
          data: executorData,
        };

        channel.publish(config.messageQueue.publisher!, queueName, Buffer.from(JSON.stringify(message)), {
          persistent: config.messageQueue.exchanges[0].persistent,
        });
        return response.status(200).send({ message: "executor data received", transferId: executorData.transferId });
      } catch (error: unknown) {
        logger.error(`Failed to submit slowpath data`, requestContext, methodContext, jsonifyError(error as Error));
        const type = (error as NxtpError).type;
        return response
          .code(500)
          .send({ message: type ?? "Failed to submit slowpath data", error: jsonifyError(error as Error) });
      }
    },
  );

  server.get<{ Params: ExecStatusRequest; Reply: ExecStatusResponse | SequencerApiErrorResponse }>(
    "/execute-slow/:transferId",
    {
      schema: {
        response: {
          200: ExecStatusResponseSchema,
          500: SequencerApiErrorResponseSchema,
        },
      },
    },
    async (request, response) => {
      try {
        const { transferId } = request.params;
        const status = await cache.executors.getExecStatus(transferId);
        return response.status(200).send({ transferId, status });
      } catch (error: unknown) {
        const type = (error as NxtpError).type;
        return response.code(500).send({ message: type, error: jsonifyError(error as Error) });
      }
    },
  );

  server.post<{ Body: ClearCacheRequest }>(
    "/clear-cache",
    { schema: { body: ClearCacheRequestSchema } },
    async (req, res) => api.auth.admin(req.body, res, api.post.clearCache),
  );

  server.post<{ Body: RouterPingRequest }>(
    "/router-ping",
    { schema: { body: RouterPingRequestSchema } },
    async (req, res) => {
      const { router, timestamp, signed } = req.body;
      const signerAddress = verifyMessage(`${RouterPingMessage}-${timestamp}`, signed);
      if (router.toLowerCase() == signerAddress.toLowerCase()) {
        await cache.routers.setLastActive(router.toLowerCase());
        return res.status(200).send({ message: "OK" });
      } else {
        return res.code(500).send({ message: "Invalid signature" });
      }
    },
  );

  const address = await server.listen({ port: config.server.http.port, host: config.server.http.host });
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
    supportedBidVersion: async (res: FastifyReply) => {
      const { config } = getContext();
      try {
        return res.status(200).send({
          supportedVersion: config.supportedVersion,
        });
      } catch (e: unknown) {
        const json = jsonifyError(e as NxtpError);
        return res.status(500).send(json);
      }
    },
  },
  post: {
    clearCache: async (res: FastifyReply) => {
      const {
        adapters: { cache },
      } = getContext();
      await cache.auctions.clear();
      await cache.transfers.clear();
      await cache.executors.clear();
      return res.status(200).send();
    },
  },
};
