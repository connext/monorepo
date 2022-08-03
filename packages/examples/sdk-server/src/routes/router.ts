import { NxtpSdkRouter } from "@connext/nxtp-sdk";
import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { addLiquidityForRouterSchema } from "../types/api";

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
      const { domain, amount, assetId, router } = request.body;
      const params = { domain, amount, assetId, router };
      const txReq = await sdkRouterInstance.addLiquidityForRouter(params);
      reply.status(200).send(txReq);
    },
  );
};
