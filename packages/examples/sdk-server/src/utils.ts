import { NxtpSdkUtils } from "@connext/nxtp-sdk";
import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import {
  getCanonicalFromLocalSchema,
  getLPTokenAddressSchema,
  getLPTokenUserBalanceSchema,
  getPoolTokenIndexSchema,
  getPoolTokenBalanceSchema,
  getPoolTokenUserBalanceSchema,
  getPoolTokenAddressSchema,
  getVirtualPriceSchema,
  calculateSwapSchema,
  calculateTokenAmountSchema,
  calculateRemoveSwapLiquiditySchema,
  getPoolSchema,
  getUserPoolsSchema,
  addLiquiditySchema,
  removeLiquiditySchema,
  swapSchema,
} from "./types/api";

export const utilsRoutes = async (server: FastifyInstance, sdkUtilsInstance: NxtpSdkUtils): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();

  s.get(
    "/getTransfersByUser",
    {
      schema: {
        params: getTransfersByUsersSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress } = request.params;
      const res = await sdkUtilsInstance.getCanonicalFromLocal(domainId, tokenAddress);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getLPTokenAddress/:domainId/:canonicalId",
    {
      schema: {
        params: getLPTokenAddressSchema,
      },
    },
    async (request, reply) => {
      const { domainId, canonicalId } = request.params;
      const res = await sdkUtilsInstance.getLPTokenAddress(domainId, canonicalId);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/calculateSwap",
    {
      schema: {
        body: calculateSwapSchema,
      },
    },
    async (request, reply) => {
      const { domainId, canonicalId, tokenIndexFrom, tokenIndexTo, amount } = request.body;
      const res = await sdkUtilsInstance.calculateSwap(domainId, canonicalId, tokenIndexFrom, tokenIndexTo, amount);
      reply.status(200).send(res);
    },
  );
};
