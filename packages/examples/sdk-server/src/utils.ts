import { NxtpSdkUtils } from "@connext/nxtp-sdk";
import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { getTransfersSchema } from "./types/api";

export const utilsRoutes = async (server: FastifyInstance, sdkUtilsInstance: NxtpSdkUtils): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();

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

  s.get("/getRoutersData", async (request, reply) => {
    const res = await sdkUtilsInstance.getRoutersData();
    reply.status(200).send(res);
  });

  s.get("/getAssetsData", async (request, reply) => {
    const res = await sdkUtilsInstance.getAssetsData();
    reply.status(200).send(res);
  });

  s.get("/getSupported", async (request, reply) => {
    const res = await sdkUtilsInstance.getSupported();
    reply.status(200).send(res);
  });
};
