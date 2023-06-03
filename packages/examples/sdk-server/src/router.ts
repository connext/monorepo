import {
  SdkRouter,
  SdkAddLiquidityForRouterParamsSchema,
  SdkAddLiquidityForRouterParams,
  SdkRemoveRouterLiquidityParamsSchema,
  SdkRemoveRouterLiquidityParams,
  SdkRemoveRouterLiquidityForParamsSchema,
  SdkRemoveRouterLiquidityForParams,
} from "@connext/sdk-core";
import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

export const routerRoutes = async (server: FastifyInstance, sdkRouterInstance: SdkRouter): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();

  s.post<{ Body: SdkAddLiquidityForRouterParams }>(
    "/addLiquidityForRouter",
    {
      schema: {
        body: SdkAddLiquidityForRouterParamsSchema,
      },
    },
    async (request, reply) => {
      const params = request.body;
      const res = await sdkRouterInstance.addLiquidityForRouter(params);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkRemoveRouterLiquidityParams }>(
    "/removeRouterLiquidity",
    {
      schema: {
        body: SdkRemoveRouterLiquidityParamsSchema,
      },
    },
    async (request, reply) => {
      const params = request.body;
      const res = await sdkRouterInstance.removeRouterLiquidity(params);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkRemoveRouterLiquidityForParams }>(
    "/removeRouterLiquidityFor",
    {
      schema: {
        body: SdkRemoveRouterLiquidityForParamsSchema,
      },
    },
    async (request, reply) => {
      const params = request.body;
      const res = await sdkRouterInstance.removeRouterLiquidityFor(params);
      reply.status(200).send(res);
    },
  );
};
