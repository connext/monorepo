import { SdkUtils } from "@connext/sdk";
import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { getTransfersSchema, getRoutersDataSchema } from "./types/api";

export const utilsRoutes = async (server: FastifyInstance, sdkUtilsInstance: SdkUtils): Promise<any> => {
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

  s.post(
    "/getRoutersData",
    {
      schema: {
        body: getRoutersDataSchema,
      },
    },
    async (request, reply) => {
      const { params } = request.body;
      const res = await sdkUtilsInstance.getRoutersData(params);
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
