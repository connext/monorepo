import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  SdkUtils,
  SdkGetRoutersDataParams,
  SdkGetRouterLiquidityParams,
  SdkGetTransfersParams,
  SdkCheckRouterLiquidityParamsSchema,
  SdkCheckRouterLiquidityParams,
  SdkEnoughRouterLiquidityParamsSchema,
  SdkEnoughRouterLiquidityParams,
  SdkGetLatestAssetPriceParamsSchema,
  SdkGetLatestAssetPriceParams,
} from "@connext/sdk-core";
import { createLoggingContext, jsonifyError } from "@connext/nxtp-utils";

import { RoutesOptions } from "../server";
import { cacheMiddleware } from "../cacheMiddleware";

interface UtilsRoutesOptions extends RoutesOptions {
  sdkUtilsInstance: SdkUtils;
}

export const utilsRoutes = async (server: FastifyInstance, options: UtilsRoutesOptions): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();
  const { sdkUtilsInstance, logger } = options;
  const { requestContext, methodContext } = createLoggingContext(utilsRoutes.name);

  server.setErrorHandler(function (error, request, reply) {
    logger?.error(`Error: ${error.message} ${request.body}`, requestContext, methodContext);
    reply.status(500).send(jsonifyError(error as Error));
  });

  s.post<{ Body: SdkGetRoutersDataParams }>("/getRoutersData", async (request, reply) => {
    const res = await sdkUtilsInstance.getRoutersData(request.body);
    reply.status(200).send(res);
  });

  s.post<{ Body: SdkGetRouterLiquidityParams }>("/getRouterLiquidity", async (request, reply) => {
    const res = await sdkUtilsInstance.getRouterLiquidity(request.body);
    reply.status(200).send(res);
  });

  s.post<{ Body: SdkGetTransfersParams }>("/getTransfers", async (request, reply) => {
    const res = await sdkUtilsInstance.getTransfers(request.body);
    reply.status(200).send(res);
  });

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

  s.post<{ Body: SdkEnoughRouterLiquidityParams }>(
    "/enoughRouterLiquidity",
    {
      schema: {
        body: SdkEnoughRouterLiquidityParamsSchema,
      },
    },
    async (request, reply) => {
      await cacheMiddleware(
        server,
        request,
        reply,
        async () => {
          const { domainId, asset, minLiquidity, maxN, bufferPercentage } = request.body;
          return sdkUtilsInstance.enoughRouterLiquidity(domainId, asset, minLiquidity, maxN, bufferPercentage);
        },
        "enoughRouterLiquidity",
        options
      );
    }
  );

  s.post<{ Body: SdkGetLatestAssetPriceParams }>(
    "/getLatestAssetPrice",
    {
      schema: {
        body: SdkGetLatestAssetPriceParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, asset } = request.body;
      const res = await sdkUtilsInstance.getLatestAssetPrice(domainId, asset);
      reply.status(200).send(res);
    },
  );
};
