import { SdkPool, SdkShared } from "@connext/sdk";
import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { getCanonicalHash } from "@connext/nxtp-utils";

import {
  getLPTokenAddressSchema,
  getTokenSupplySchema,
  getTokenUserBalanceSchema,
  getPoolTokenIndexSchema,
  getPoolTokenBalanceSchema,
  getPoolTokenAddressSchema,
  getVirtualPriceSchema,
  calculateSwapSchema,
  calculateTokenAmountSchema,
  calculateRemoveSwapLiquiditySchema,
  calculateRemoveSwapLiquidityOneTokenSchema,
  getPoolSchema,
  getUserPoolsSchema,
  addLiquiditySchema,
  removeLiquidityOneTokenSchema,
  removeLiquiditySchema,
  removeLiquidityImbalanceSchema,
  swapSchema,
  calculateCanonicalHashSchema,
  calculateAddLiquidityPriceImpactSchema,
  calculateRemoveLiquidityPriceImpactSchema,
  calculateSwapPriceImpactSchema,
  getTokenPriceSchema,
  getYieldStatsForDaysSchema,
  getYieldDataSchema,
  getBlockNumberFromUnixTimestampSchema,
  getTokenSwapEventsSchema,
  getHourlySwapVolumeSchema,
  getDailySwapVolumeSchema,
} from "./types/api";

export const poolRoutes = async (server: FastifyInstance, sdkPoolInstance: SdkPool): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();

  // ------------------- Read Operations ------------------- //

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
    "/getTokenSupply/:domainId/:lpTokenAddress",
    {
      schema: {
        params: getTokenSupplySchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress } = request.params;
      const res = await sdkPoolInstance.getTokenSupply(domainId, tokenAddress);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getTokenUserBalance/:domainId/:lpTokenAddress/:userAddress",
    {
      schema: {
        params: getTokenUserBalanceSchema,
      },
    },
    async (request, reply) => {
      const { domainId, lpTokenAddress, userAddress } = request.params;
      const res = await sdkPoolInstance.getTokenUserBalance(domainId, lpTokenAddress, userAddress);
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
    "/calculateRemoveSwapLiquidityOneToken",
    {
      schema: {
        body: calculateRemoveSwapLiquidityOneTokenSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, amount, index } = request.body;
      const res = await sdkPoolInstance.calculateRemoveSwapLiquidityOneToken(domainId, tokenAddress, amount, index);
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

  s.get(
    "/getTokenPrice/:tokenSymbol",
    {
      schema: {
        params: getTokenPriceSchema,
      },
    },
    async (request, reply) => {
      const { tokenSymbol } = request.params;
      const res = await sdkPoolInstance.getTokenPrice(tokenSymbol);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/getTokenSwapEvents",
    {
      schema: {
        body: getTokenSwapEventsSchema,
      },
    },
    async (request, reply) => {
      const { params } = request.body;
      const res = await sdkPoolInstance.getTokenSwapEvents(params);
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
    "/removeLiquidityOneToken",
    {
      schema: {
        body: removeLiquidityOneTokenSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, withdrawTokenAddress, amount, minAmount } = request.body;
      const res = await sdkPoolInstance.removeLiquidityOneToken(
        domainId,
        tokenAddress,
        withdrawTokenAddress,
        amount,
        minAmount,
      );
      reply.status(200).send(res);
    },
  );

  s.post(
    "/removeLiquidityImbalance",
    {
      schema: {
        body: removeLiquidityImbalanceSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, amounts, maxBurnAmount, deadline } = request.body;
      const res = await sdkPoolInstance.removeLiquidityImbalance(
        domainId,
        tokenAddress,
        amounts,
        maxBurnAmount,
        deadline,
      );
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
      const { domainId, tokenAddress, amount, minAmounts } = request.body;
      const res = await sdkPoolInstance.removeLiquidity(domainId, tokenAddress, amount, minAmounts);
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

  s.get(
    "/getBlockNumberFromUnixTimestamp/:domainId/:unixTimestamp",
    {
      schema: {
        params: getBlockNumberFromUnixTimestampSchema,
      },
    },
    async (request, reply) => {
      const { domainId, unixTimestamp } = request.params;
      const res = await SdkShared.getBlockNumberFromUnixTimestamp(domainId, unixTimestamp);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getYieldStatsForDays/:domainId/:tokenAddress/:unixTimestamp",
    {
      schema: {
        params: getYieldStatsForDaysSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, unixTimestamp, days } = request.params;
      const res = await sdkPoolInstance.getYieldStatsForDays(domainId, tokenAddress, unixTimestamp, days);
      reply.status(200).send(res);
    },
  );

  s.get(
    "/getYieldData/:domainId/:tokenAddress/:days",
    {
      schema: {
        params: getYieldDataSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, days } = request.params;
      const res = await sdkPoolInstance.getYieldData(domainId, tokenAddress, days);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/getDailySwapVolume",
    {
      schema: {
        body: getDailySwapVolumeSchema,
      },
    },
    async (request, reply) => {
      const { params } = request.body;
      const res = await sdkPoolInstance.getDailySwapVolume(params);
      reply.status(200).send(res);
    },
  );

  s.post(
    "/getHourlySwapVolume",
    {
      schema: {
        body: getHourlySwapVolumeSchema,
      },
    },
    async (request, reply) => {
      const { params } = request.body;
      const res = await sdkPoolInstance.getHourlySwapVolume(params);
      reply.status(200).send(res);
    },
  );
};
