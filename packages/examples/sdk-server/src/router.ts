import { SdkRouter } from "@connext/sdk";
import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { addLiquidityForRouterSchema, removeRouterLiquiditySchema, removeRouterLiquidityForSchema } from "./types/api";

export const routerRoutes = async (server: FastifyInstance, sdkRouterInstance: SdkRouter): Promise<any> => {
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

  s.post(
    "/removeRouterLiquidityFor",
    {
      schema: {
        body: removeRouterLiquidityForSchema,
      },
    },
    async (request, reply) => {
      const { params } = request.body;
      const res = await sdkRouterInstance.removeRouterLiquidityFor(params);
      reply.status(200).send(res);
    },
  );
};
