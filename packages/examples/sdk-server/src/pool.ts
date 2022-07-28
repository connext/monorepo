import { NxtpSdkPool } from "@connext/nxtp-sdk";
import { FastifyInstance } from "fastify";

import {
  getLPTokenAddressSchema,
  calculateTokenAmountSchema,
  getCanonicalFromLocalSchema,
  getPoolSchema,
  getUserPoolsSchema,
  addLiquiditySchema,
  removeLiquiditySchema,
  swapSchema,
} from "./types/api";

import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

export const poolRoutes = async (server: FastifyInstance, sdkPoolInstance: NxtpSdkPool): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();

  s.get(
    "/getLPTokenAddress/:domainId/:canonicalId",
    {
      schema: {
        params: getLPTokenAddressSchema,
      },
    },
    async (request, reply) => {
      const { domainId, canonicalId } = request.params;
      const res = await sdkPoolInstance.getLPTokenAddress(domainId, canonicalId);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getCanonicalFromLocal/:domainId/:tokenAddress",
    {
      schema: {
        params: getCanonicalFromLocalSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress } = request.params;
      const res = await sdkPoolInstance.getCanonicalFromLocal(domainId, tokenAddress);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/calculateTokenAmount",
    {
      schema: {
        body: calculateTokenAmountSchema,
      },
    },
    async (request, reply) => {
      const { domainId, canonicalId, amounts } = request.body;
      const res = await sdkPoolInstance.calculateTokenAmount(domainId, canonicalId, amounts);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/getPool",
    {
      schema: {
        body: getPoolSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress } = request.body;
      const res = await sdkPoolInstance.getPool(domainId, tokenAddress);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/getUserPools",
    {
      schema: {
        body: getUserPoolsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, userAddress } = request.body;
      const res = await sdkPoolInstance.getUserPools(domainId, userAddress);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/addLiquidity",
    {
      schema: {
        body: addLiquiditySchema,
      },
    },
    async (request, reply) => {
      const { domainId, canonicalId, amounts } = request.body;
      const res = await sdkPoolInstance.addLiquidity(domainId, canonicalId, amounts);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/removeLiquidity",
    {
      schema: {
        body: removeLiquiditySchema,
      },
    },
    async (request, reply) => {
      const { domainId, canonicalId, amount } = request.body;
      const res = await sdkPoolInstance.removeLiquidity(domainId, canonicalId, amount);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/swap",
    {
      schema: {
        body: swapSchema,
      },
    },
    async (request, reply) => {
      const { domainId, canonicalId, from, to, amount } = request.body;
      const res = await sdkPoolInstance.swap(domainId, canonicalId, from, to, amount);
      reply.status(200).send(res);
    },
  );
};
