import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { NxtpSdkBridge } from "@connext/nxtp-sdk";
import { SdkServerApiXCallSchema, SdkServerApiXCall } from "@connext/nxtp-utils";

import { approveIfNeededSchema } from "./types/api";

export const bridgeRoutes = async (server: FastifyInstance, sdkBridgeInstance: NxtpSdkBridge): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();

  s.post<{ Body: SdkServerApiXCall }>(
    "/xcall",
    {
      schema: {
        body: SdkServerApiXCallSchema,
      },
    },
    async (request, reply) => {
      const txReq = await sdkBridgeInstance.xcall(request.body);
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
      const txReq = await sdkBridgeInstance.approveIfNeeded(domainId, assetId, amount, infiniteApprove);
      reply.status(200).send(txReq);
    },
  );
};
