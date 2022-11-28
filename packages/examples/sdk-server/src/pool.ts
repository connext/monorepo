import { NxtpSdkPool } from "@connext/nxtp-sdk";
import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { getCanonicalHash } from "@connext/nxtp-utils";

import {
  getCanonicalTokenIdSchema,
  calculateCanonicalKeySchema,
  getLPTokenAddressSchema,
  getLPTokenSupplySchema,
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
  calculateCanonicalHashSchema,
  calculateAddLiquidityPriceImpactSchema,
  calculateRemoveLiquidityPriceImpactSchema,
  calculateSwapPriceImpactSchema,
} from "./types/api";

export const poolRoutes = async (server: FastifyInstance, sdkPoolInstance: NxtpSdkPool): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();

  // ------------------- Read Operations ------------------- //

  s.get(
    "/getCanonicalTokenId/:domainId/:tokenAddress",
    {
      schema: {
        params: getCanonicalTokenIdSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress } = request.params;
      const res = await sdkPoolInstance.getCanonicalTokenId(domainId, tokenAddress);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/calculateCanonicalKey/:domainId/:tokenId",
    {
      schema: {
        params: calculateCanonicalKeySchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenId } = request.params;
      const res = await sdkPoolInstance.calculateCanonicalKey(domainId, tokenId);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getLPTokenAddress/:domainId/:tokenAddress",
    {
      schema: {
        params: getLPTokenAddressSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress } = request.params;
      const res = await sdkPoolInstance.getLPTokenAddress(domainId, tokenAddress);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getLPTokenSupply/:domainId/:lpTokenAddress",
    {
      schema: {
        params: getLPTokenSupplySchema,
      },
    },
    async (request, reply) => {
      const { domainId, lpTokenAddress } = request.params;
      const res = await sdkPoolInstance.getLPTokenSupply(domainId, lpTokenAddress);
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
    "/getPoolTokenIndex/:domainId/:tokenAddress/:poolTokenAddress",
    {
      schema: {
        params: getPoolTokenIndexSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, poolTokenAddress } = request.params;
      const res = await sdkPoolInstance.getPoolTokenIndex(domainId, tokenAddress, poolTokenAddress);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getPoolTokenBalance/:domainId/:tokenAddress/:poolTokenAddress",
    {
      schema: {
        params: getPoolTokenBalanceSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, poolTokenAddress } = request.params;
      const res = await sdkPoolInstance.getPoolTokenBalance(domainId, tokenAddress, poolTokenAddress);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getPoolTokenUserBalance/:domainId/:poolTokenAddress/:userAddress",
    {
      schema: {
        params: getPoolTokenUserBalanceSchema,
      },
    },
    async (request, reply) => {
      const { domainId, poolTokenAddress, userAddress } = request.params;
      const res = await sdkPoolInstance.getPoolTokenUserBalance(domainId, poolTokenAddress, userAddress);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getPoolTokenAddress/:domainId/:tokenAddress/:index",
    {
      schema: {
        params: getPoolTokenAddressSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, index } = request.params;
      const res = await sdkPoolInstance.getPoolTokenAddress(domainId, tokenAddress, index);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getVirtualPrice/:domainId/:tokenAddress",
    {
      schema: {
        params: getVirtualPriceSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress } = request.params;
      const res = await sdkPoolInstance.getVirtualPrice(domainId, tokenAddress);
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
      const { domainId, tokenAddress, tokenIndexFrom, tokenIndexTo, amount } = request.body;
      const res = await sdkPoolInstance.calculateSwap(domainId, tokenAddress, tokenIndexFrom, tokenIndexTo, amount);
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
      const { domainId, tokenAddress, amounts } = request.body;
      const res = await sdkPoolInstance.calculateTokenAmount(domainId, tokenAddress, amounts);
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
      const { domainId, tokenAddress, amount } = request.body;
      const res = await sdkPoolInstance.calculateRemoveSwapLiquidity(domainId, tokenAddress, amount);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/calculateAddLiquidityPriceImpact",
    {
      schema: {
        body: calculateAddLiquidityPriceImpactSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, amountX, amountY } = request.body;
      const res = await sdkPoolInstance.calculateAddLiquidityPriceImpact(domainId, tokenAddress, amountX, amountY);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/calculateRemoveLiquidityPriceImpact",
    {
      schema: {
        body: calculateRemoveLiquidityPriceImpactSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, amountX, amountY } = request.body;
      const res = await sdkPoolInstance.calculateRemoveLiquidityPriceImpact(domainId, tokenAddress, amountX, amountY);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/calculateSwapPriceImpact",
    {
      schema: {
        body: calculateSwapPriceImpactSchema,
      },
    },
    async (request, reply) => {
      const { domainId, amountX, tokenX, tokenY } = request.body;
      const res = await sdkPoolInstance.calculateSwapPriceImpact(domainId, amountX, tokenX, tokenY);
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
      const { domainId, tokenAddress, amounts } = request.body;
      const res = await sdkPoolInstance.addLiquidity(domainId, tokenAddress, amounts);
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
      const { domainId, tokenAddress, amount } = request.body;
      const res = await sdkPoolInstance.removeLiquidity(domainId, tokenAddress, amount);
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
      const { domainId, tokenAddress, from, to, amount } = request.body;
      const res = await sdkPoolInstance.swap(domainId, tokenAddress, from, to, amount);
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

  s.post(
    "/calculateCanonicalHash",
    {
      schema: {
        body: calculateCanonicalHashSchema,
      },
    },
    async (request, reply) => {
      const { canonicalDomain, canonicalId } = request.body;
      const res = getCanonicalHash(canonicalDomain, canonicalId);
      reply.status(200).send(res);
    },
  );
};
