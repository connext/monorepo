import {
  SdkUtils,
  SdkGetRoutersDataParamsSchema,
  SdkGetRoutersDataParams,
  SdkGetRouterLiquidityParamsSchema,
  SdkGetRouterLiquidityParams,
  SdkGetTransfersParamsSchema,
  SdkGetTransfersParams,
  SdkCheckRouterLiquidityParamsSchema,
  SdkCheckRouterLiquidityParams,
} from "@connext/sdk-core";
import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

export const utilsRoutes = async (server: FastifyInstance, sdkUtilsInstance: SdkUtils): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();

  s.post<{ Body: SdkGetRoutersDataParams }>(
    "/getRoutersData",
    {
      schema: {
        body: SdkGetRoutersDataParamsSchema,
      },
    },
    async (request, reply) => {
      const res = await sdkUtilsInstance.getRoutersData(request.body);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetRouterLiquidityParams }>(
    "/getRouterLiquidity",
    {
      schema: {
        body: SdkGetRouterLiquidityParamsSchema,
      },
    },
    async (request, reply) => {
      const res = await sdkUtilsInstance.getRouterLiquidity(request.body);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetTransfersParams }>(
    "/getTransfers",
    {
      schema: {
        body: SdkGetTransfersParamsSchema,
      },
    },
    async (request, reply) => {
      const res = await sdkUtilsInstance.getTransfers(request.body);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkCheckRouterLiquidityParams }>(
    "/checkRouterLiquidity",
    {
      schema: {
        body: SdkCheckRouterLiquidityParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, asset, topN } = request.body;
      const res = await sdkUtilsInstance.checkRouterLiquidity(domainId, asset, topN);
      reply.status(200).send(res);
    },
  );
};
