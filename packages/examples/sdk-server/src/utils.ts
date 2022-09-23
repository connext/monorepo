import { NxtpSdkUtils } from "@connext/nxtp-sdk";
import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import {
  getTransfersByUserSchema,
  getTransfersByStatusSchema,
  getTransfersByRouterSchema,
  getTransfersByIdSchema,
  getTransfersByTransactionHashSchema,
  getTransfersSchema,
} from "./types/api";

export const utilsRoutes = async (server: FastifyInstance, sdkUtilsInstance: NxtpSdkUtils): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();

  s.post(
    "/getTransfersByUser",
    {
      schema: {
        body: getTransfersByUserSchema,
      },
    },
    async (request, reply) => {
      const { params } = request.body;
      const res = await sdkUtilsInstance.getTransfersByUser(params);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/getTransfersByStatus",
    {
      schema: {
        body: getTransfersByStatusSchema,
      },
    },
    async (request, reply) => {
      const { params } = request.body;
      const res = await sdkUtilsInstance.getTransfersByStatus(params);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/getTransfersByRouter",
    {
      schema: {
        body: getTransfersByRouterSchema,
      },
    },
    async (request, reply) => {
      const { params } = request.body;
      const res = await sdkUtilsInstance.getTransfersByRouter(params);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/getTransferById",
    {
      schema: {
        body: getTransfersByIdSchema,
      },
    },
    async (request, reply) => {
      const { transferId } = request.body;
      const res = await sdkUtilsInstance.getTransferById(transferId);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/getTransferByTransactionHash",
    {
      schema: {
        body: getTransfersByTransactionHashSchema,
      },
    },
    async (request, reply) => {
      const { transactionHash } = request.body;
      const res = await sdkUtilsInstance.getTransferByTransactionHash(transactionHash);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/getTransfers",
    {
      schema: {
        body: getTransfersSchema,
      },
    },
    async (request, reply) => {
      const { params } = request.body;
      const res = await sdkUtilsInstance.getTransfers(params);
      reply.status(200).send(res);
    },
  );
};
