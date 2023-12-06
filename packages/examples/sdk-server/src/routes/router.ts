import {
  SdkRouter,
  SdkAddLiquidityForRouterParamsSchema,
  SdkAddLiquidityForRouterParams,
  SdkRemoveRouterLiquidityParamsSchema,
  SdkRemoveRouterLiquidityParams,
  SdkRemoveRouterLiquidityForParamsSchema,
  SdkRemoveRouterLiquidityForParams,
} from "@connext/sdk-core";
import { createLoggingContext, jsonifyError } from "@connext/nxtp-utils";
import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { RoutesOptions } from "../server";

interface RouterRoutesOptions extends RoutesOptions {
  sdkRouterInstance: SdkRouter;
}

export const routerRoutes = async (server: FastifyInstance, options: RouterRoutesOptions): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();
  const { sdkRouterInstance, logger } = options;
  const { requestContext, methodContext } = createLoggingContext(routerRoutes.name);

  server.setErrorHandler(function (error, request, reply) {
    logger?.error(`Error: ${error.message} ${request.body}`, requestContext, methodContext);
    reply.status(500).send(jsonifyError(error as Error));
  });

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
