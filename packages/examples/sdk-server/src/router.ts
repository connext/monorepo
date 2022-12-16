import { NxtpSdkRouter } from "@connext/nxtp-sdk";
import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { addLiquidityForRouterSchema, removeRouterLiquiditySchema } from "./types/api";

export const routerRoutes = async (server: FastifyInstance, sdkRouterInstance: NxtpSdkRouter): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();

  s.post(
    "/addLiquidityForRouter",
    {
      schema: {
        body: addLiquidityForRouterSchema,
      },
    },
    async (request, reply) => {
      const { params } = request.body;
      const res = await sdkRouterInstance.addLiquidityForRouter(params);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/removeRouterLiquidity",
    {
      schema: {
        body: removeRouterLiquiditySchema,
      },
    },
    async (request, reply) => {
      const { params } = request.body;
      const res = await sdkRouterInstance.removeRouterLiquidity(params);
      reply.status(200).send(res);
    },
  );
};
