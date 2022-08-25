import fastify, { FastifyInstance, FastifyReply } from "fastify";
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
  ExecuteFastApiGetQueuedResponseSchema,
  ExecuteFastApiGetQueuedResponse,
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
} from "@connext/nxtp-utils";

import { getContext } from "../../../sequencer";
import { getOperations } from "../../../lib/operations";

export const bindServer = async (): Promise<FastifyInstance> => {
  const {
    config,
    logger,
    adapters: { cache },
  } = getContext();
  const server = fastify();

  server.get("/ping", async (_req, res) => {
    return res.code(200).send("pong\n");
  });

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
      const {
        execute: { storeFastPathData },
      } = getOperations();
      const { requestContext } = createLoggingContext("POST /execute-fast/:transferId endpoint", undefined, "");
      try {
        const bid = request.body;
        requestContext.transferId = bid.transferId;
        await storeFastPathData(bid, requestContext);
        return response.status(200).send({ message: "Bid received", transferId: bid.transferId, router: bid.router });
      } catch (error: unknown) {
        const type = (error as NxtpError).type;
        return response.code(500).send({ message: type, error: jsonifyError(error as Error) });
      }
    },
  );

  server.get<{ Reply: ExecuteFastApiGetQueuedResponse | SequencerApiErrorResponse }>(
    "/queued",
    {
      schema: {
        response: {
          200: ExecuteFastApiGetQueuedResponseSchema,
          500: SequencerApiErrorResponseSchema,
        },
      },
    },
    async (_, response) => {
      const { requestContext, methodContext } = createLoggingContext("GET /queued endpoint");
      try {
        const queued = await cache.auctions.getQueuedTransfers();
        return response.status(200).send({ queued });
      } catch (error: unknown) {
        logger.error(`Pending Bid Get Error`, requestContext, methodContext);
        return response.code(500).send({ message: `Pending Bid Get Error`, error: jsonifyError(error as Error) });
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
      const { requestContext } = createLoggingContext("POST /execute-slow endpoint");
      const {
        execute: { storeSlowPathData },
      } = getOperations();
      try {
        const executorData = request.body;
        await storeSlowPathData(executorData, requestContext);
        return response.status(200).send({ message: "executor data received", transferId: executorData.transferId });
      } catch (error: unknown) {
        const type = (error as NxtpError).type;
        return response.code(500).send({ message: type, error: jsonifyError(error as Error) });
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
  post: {
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
