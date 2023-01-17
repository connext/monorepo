import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  NxtpSdkBase,
  SdkXCallParamsSchema,
  SdkXCallParams,
  SdkBumpTransferParamsSchema,
  SdkUpdateSlippageParamsSchema,
} from "@connext/nxtp-sdk";

import { approveIfNeededSchema, getCanonicalTokenIdSchema, calculateCanonicalKeySchema } from "./types/api";

export const baseRoutes = async (server: FastifyInstance, sdkBaseInstance: NxtpSdkBase): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();

  s.post<{ Body: SdkXCallParams }>(
    "/xcall",
    {
      schema: {
        body: SdkXCallParamsSchema,
      },
    },
    async (request, reply) => {
      const txReq = await sdkBaseInstance.xcall(request.body);
      reply.status(200).send(txReq);
    },
  );

  s.post(
    "/approveIfNeeded",
    {
      schema: {
        body: approveIfNeededSchema,
      },
    },
    async (request, reply) => {
      const { domainId, assetId, amount, infiniteApprove } = request.body;
      const txReq = await sdkBaseInstance.approveIfNeeded(domainId, assetId, amount, infiniteApprove);
      reply.status(200).send(txReq);
    },
  );

  s.post(
    "/bumpTransfer",
    {
      schema: {
        body: SdkBumpTransferParamsSchema,
      },
    },
    async (request, reply) => {
      const txReq = await sdkBaseInstance.bumpTransfer(request.body);
      reply.status(200).send(txReq);
    },
  );

  s.post(
    "/updateSlippage",
    {
      schema: {
        body: SdkUpdateSlippageParamsSchema,
      },
    },
    async (request, reply) => {
      const txReq = await sdkBaseInstance.updateSlippage(request.body);
      reply.status(200).send(txReq);
    },
  );

  s.get(
    "/getCanonicalTokenId/:domainId/:tokenAddress",
    {
      schema: {
        params: getCanonicalTokenIdSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress } = request.params;
      const res = await sdkBaseInstance.getCanonicalTokenId(domainId, tokenAddress);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/calculateCanonicalKey/:domainId/:tokenId",
    {
      schema: {
        params: calculateCanonicalKeySchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenId } = request.params;
      const res = sdkBaseInstance.calculateCanonicalKey(domainId, tokenId);
      reply.status(200).send(res);
    },
  );
};
