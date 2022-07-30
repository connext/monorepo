import { NxtpSdkPool } from "@connext/nxtp-sdk";
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

export const poolRoutes = async (server: FastifyInstance, sdkPoolInstance: NxtpSdkPool): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();

  // ------------------- Read Operations ------------------- //

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
    "/getLPTokenUserBalance/:domainId/:lpTokenAddress/:userAddress",
    {
      schema: {
        params: getLPTokenUserBalanceSchema,
      },
    },
    async (request, reply) => {
      const { domainId, lpTokenAddress, userAddress } = request.params;
      const res = await sdkPoolInstance.getLPTokenUserBalance(domainId, lpTokenAddress, userAddress);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getPoolTokenIndex/:domainId/:canonicalId/:tokenAddress",
    {
      schema: {
        params: getPoolTokenIndexSchema,
      },
    },
    async (request, reply) => {
      const { domainId, canonicalId, tokenAddress } = request.params;
      const res = await sdkPoolInstance.getPoolTokenIndex(domainId, canonicalId, tokenAddress);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getPoolTokenBalance/:domainId/:canonicalId/:tokenAddress",
    {
      schema: {
        params: getPoolTokenBalanceSchema,
      },
    },
    async (request, reply) => {
      const { domainId, canonicalId, tokenAddress } = request.params;
      const res = await sdkPoolInstance.getPoolTokenBalance(domainId, canonicalId, tokenAddress);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getPoolTokenUserBalance/:domainId/:tokenAddress/:userAddress",
    {
      schema: {
        params: getPoolTokenUserBalanceSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, userAddress } = request.params;
      const res = await sdkPoolInstance.getPoolTokenUserBalance(domainId, tokenAddress, userAddress);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getPoolTokenAddress/:domainId/:canonicalId/:index",
    {
      schema: {
        params: getPoolTokenAddressSchema,
      },
    },
    async (request, reply) => {
      const { domainId, canonicalId, index } = request.params;
      const res = await sdkPoolInstance.getPoolTokenAddress(domainId, canonicalId, index);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getVirtualPrice/:domainId/:canonicalId",
    {
      schema: {
        params: getVirtualPriceSchema,
      },
    },
    async (request, reply) => {
      const { domainId, canonicalId } = request.params;
      const res = await sdkPoolInstance.getVirtualPrice(domainId, canonicalId);
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
      const res = await sdkPoolInstance.calculateSwap(domainId, canonicalId, tokenIndexFrom, tokenIndexTo, amount);
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
    "/calculateRemoveSwapLiquidity",
    {
      schema: {
        body: calculateRemoveSwapLiquiditySchema,
      },
    },
    async (request, reply) => {
      const { domainId, canonicalId, amount } = request.body;
      const res = await sdkPoolInstance.calculateRemoveSwapLiquidity(domainId, canonicalId, amount);
      reply.status(200).send(res);
    },
  );

  // ------------------- Pool Operations ------------------- //

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

  // ------------------- Pool Data ------------------- //

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
};
