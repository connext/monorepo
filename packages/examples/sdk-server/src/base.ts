import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { NxtpSdkBase } from "@connext/nxtp-sdk";

import { approveIfNeededSchema } from "./types/api";

export const baseRoutes = async (server: FastifyInstance, sdkBaseInstance: NxtpSdkBase): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();

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
