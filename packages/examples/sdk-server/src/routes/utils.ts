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
import { createLoggingContext, Logger, jsonifyError } from "@connext/nxtp-utils";
import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

interface UtilsRoutesOptions {
  sdkUtilsInstance: SdkUtils;
  logger: Logger;
  cacheConfig?: {
    enabled?: boolean;
    expirationTime?: number;
  };
}

export const utilsRoutes = async (server: FastifyInstance, options: UtilsRoutesOptions): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();
  const { sdkUtilsInstance, logger } = options;
  const { requestContext, methodContext } = createLoggingContext(utilsRoutes.name);

  server.setErrorHandler(function (error, request, reply) {
    logger.error(`Error: ${error.message} ${request.body}`, requestContext, methodContext);
    reply.status(500).send(jsonifyError(error as Error));
  });

  s.post<{ Body: SdkGetRoutersDataParams }>("/getRoutersData", async (request, reply) => {
    console.log(request.body); // Log the request body
    const res = await sdkUtilsInstance.getRoutersData(request.body);
    reply.status(200).send(res);
  });

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
