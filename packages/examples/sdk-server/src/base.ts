import { NxtpSdkBase } from "@connext/nxtp-sdk";
import { FastifyInstance } from "fastify";
import { XCallArgsSchema, XCallArgs } from "@connext/nxtp-utils";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { approveIfNeededSchema } from "./types/api";

export const baseRoutes = async (server: FastifyInstance, sdkBaseInstance: NxtpSdkBase): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();

  s.post<{ Body: XCallArgs }>(
    "/xcall",
    {
      schema: {
        body: XCallArgsSchema,
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
};
