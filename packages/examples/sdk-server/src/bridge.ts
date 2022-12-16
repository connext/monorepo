import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { NxtpSdkBase } from "@connext/nxtp-sdk";
import { SdkServerApiXCallSchema, SdkServerApiXCall } from "@connext/nxtp-utils";

export const bridgeRoutes = async (server: FastifyInstance, sdkBridgeInstance: NxtpSdkBase): Promise<any> => {
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
};
