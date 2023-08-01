import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  SdkPool,
  SdkCalculateSwapParamsSchema,
  SdkCalculateSwapParams,
  SdkCalculateSwapLocalParamsSchema,
  SdkCalculateSwapLocalParams,
  SdkGetSwapOutParamsSchema,
  SdkGetSwapOutParams,
  SdkScientificToBigIntParamsSchema,
  SdkScientificToBigIntParams,
  SdkCalculateTokenAmountParamsSchema,
  SdkCalculateTokenAmountParams,
  SdkCalculateRemoveSwapLiquidityParamsSchema,
  SdkCalculateRemoveSwapLiquidityParams,
  SdkCalculateRemoveSwapLiquidityOneTokenParamsSchema,
  SdkCalculateRemoveSwapLiquidityOneTokenParams,
  SdkCalculatePriceImpactParamsSchema,
  SdkCalculatePriceImpactParams,
  SdkCalculateAddLiquidityPriceImpactParamsSchema,
  SdkCalculateAddLiquidityPriceImpactParams,
  SdkCalculateRemoveLiquidityPriceImpactParamsSchema,
  SdkCalculateRemoveLiquidityPriceImpactParams,
  SdkCalculateSwapPriceImpactParamsSchema,
  SdkCalculateSwapPriceImpactParams,
  SdkGetTokenPriceParamsSchema,
  SdkGetTokenPriceParams,
  SdkGetLPTokenAddressParamsSchema,
  SdkGetLPTokenAddressParams,
  SdkGetTokenSupplyParamsSchema,
  SdkGetTokenSupplyParams,
  SdkGetTokenUserBalanceParamsSchema,
  SdkGetTokenUserBalanceParams,
  SdkGetPoolTokenIndexParamsSchema,
  SdkGetPoolTokenIndexParams,
  SdkGetPoolTokenDecimalsParamsSchema,
  SdkGetPoolTokenDecimalsParams,
  SdkGetPoolTokenBalanceParamsSchema,
  SdkGetPoolTokenBalanceParams,
  SdkGetPoolTokenAddressParamsSchema,
  SdkGetPoolTokenAddressParams,
  SdkGetVirtualPriceParamsSchema,
  SdkGetVirtualPriceParams,
  SdkGetRepresentationParamsSchema,
  SdkGetRepresentationParams,
  SdkGetAdoptedParamsSchema,
  SdkGetAdoptedParams,
  SdkGetTokenSwapEventsParamsSchema,
  SdkGetTokenSwapEventsParams,
  SdkGetPoolDataParamsSchema,
  SdkGetPoolDataParams,
  SdkAddLiquidityParamsSchema,
  SdkAddLiquidityParams,
  SdkRemoveLiquidityOneTokenParamsSchema,
  SdkRemoveLiquidityOneTokenParams,
  SdkRemoveLiquidityParamsSchema,
  SdkRemoveLiquidityParams,
  SdkRemoveLiquidityImbalanceParamsSchema,
  SdkRemoveLiquidityImbalanceParams,
  SdkSwapParamsSchema,
  SdkSwapParams,
  SdkGetPoolParamsSchema,
  SdkGetPoolParams,
  SdkGetUserPoolsParamsSchema,
  SdkGetUserPoolsParams,
  SdkGetYieldStatsForDaysParamsSchema,
  SdkGetYieldStatsForDaysParams,
  SdkCalculateYieldParamsSchema,
  SdkCalculateYieldParams,
  SdkGetYieldDataParamsSchema,
  SdkGetYieldDataParams,
  SdkGetLiquidityMiningAprPerPoolParamsSchema,
  SdkGetLiquidityMiningAprPerPoolParams,
  SdkGetHourlySwapVolumeParamsSchema,
  SdkGetHourlySwapVolumeParams,
  SdkGetDailySwapVolumeParamsSchema,
  SdkGetDailySwapVolumeParams,
  Options,
} from "@connext/sdk-core";
import { createLoggingContext, jsonifyError } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { RoutesOptions } from "../server";

interface PoolRoutesOptions extends RoutesOptions {
  sdkPoolInstance: SdkPool;
}

export const poolRoutes = async (server: FastifyInstance, options: PoolRoutesOptions): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();
  const { sdkPoolInstance, logger } = options;
  const { requestContext, methodContext } = createLoggingContext(poolRoutes.name);

  server.setErrorHandler(function (error, request, reply) {
    logger?.error(`Error: ${error.message} ${request.body}`, requestContext, methodContext);
    reply.status(500).send(jsonifyError(error as Error));
  });

  s.post<{ Body: SdkCalculateSwapParams }>(
    "/calculateSwap",
    {
      schema: {
        body: SdkCalculateSwapParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, tokenIndexFrom, tokenIndexTo, amount, options } = request.body;
      const res = await sdkPoolInstance.calculateSwap(
        domainId,
        tokenAddress,
        tokenIndexFrom,
        tokenIndexTo,
        amount,
        options as Options,
      );
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkCalculateSwapLocalParams }>(
    "/calculateSwapLocal",
    {
      schema: {
        body: SdkCalculateSwapLocalParamsSchema,
      },
    },
    async (request, reply) => {
      const requestBody = request.body;

      // create a new object with the correct types
      const params = {
        domainId: requestBody.domainId,
        pool: {
          ...requestBody.pool,
          local: {
            ...requestBody.pool.local,
            balance: BigNumber.from(requestBody.pool.local.balance),
          },
          adopted: {
            ...requestBody.pool.adopted,
            balance: BigNumber.from(requestBody.pool.adopted.balance),
          },
          balances: requestBody.pool.balances.map((balance) => BigNumber.from(balance)),
          decimals: requestBody.pool.decimals,
          invariant: BigNumber.from(requestBody.pool.invariant),
          initialA: BigNumber.from(requestBody.pool.initialA),
          initialATime: requestBody.pool.initialATime,
          futureA: BigNumber.from(requestBody.pool.futureA),
          futureATime: requestBody.pool.futureATime,
          currentA: BigNumber.from(requestBody.pool.currentA),
          swapFee: requestBody.pool.swapFee,
          adminFee: requestBody.pool.adminFee,
        },
        tokenAddress: requestBody.tokenAddress,
        tokenIndexFrom: requestBody.tokenIndexFrom,
        tokenIndexTo: requestBody.tokenIndexTo,
        amount: BigNumber.from(requestBody.amount),
      };

      const res = await sdkPoolInstance.calculateSwapLocal(
        params.domainId,
        params.pool,
        params.tokenAddress,
        params.tokenIndexFrom,
        params.tokenIndexTo,
        params.amount,
      );
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetSwapOutParams }>(
    "/getSwapOut",
    {
      schema: {
        body: SdkGetSwapOutParamsSchema,
      },
    },
    async (request, reply) => {
      const requestBody = request.body;

      // convert fields to their appropriate types
      const params = {
        pool: {
          ...requestBody.pool,
          local: {
            ...requestBody.pool.local,
            balance: BigNumber.from(requestBody.pool.local.balance),
          },
          adopted: {
            ...requestBody.pool.adopted,
            balance: BigNumber.from(requestBody.pool.adopted.balance),
          },
          balances: requestBody.pool.balances.map((balance) => BigNumber.from(balance)),
          decimals: requestBody.pool.decimals,
          invariant: BigNumber.from(requestBody.pool.invariant),
          initialA: BigNumber.from(requestBody.pool.initialA),
          futureA: BigNumber.from(requestBody.pool.futureA),
          currentA: BigNumber.from(requestBody.pool.currentA),
          swapFee: requestBody.pool.swapFee,
          adminFee: requestBody.pool.adminFee,
        },
        x: BigNumber.from(requestBody.x),
        xp: requestBody.xp.map((balance) => BigNumber.from(balance)),
        tokenIndexFrom: requestBody.tokenIndexFrom ?? 0,
        tokenIndexTo: requestBody.tokenIndexTo ?? 1,
      };

      const res = sdkPoolInstance.getSwapOut(
        params.pool,
        params.x,
        params.xp,
        params.tokenIndexFrom,
        params.tokenIndexTo,
      );
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkScientificToBigIntParams }>(
    "/scientificToBigInt",
    {
      schema: {
        body: SdkScientificToBigIntParamsSchema,
      },
    },
    async (request, reply) => {
      const { scientificNotationString } = request.body;
      const res = sdkPoolInstance.scientificToBigInt(scientificNotationString);
      reply.status(200).send(res.toString()); // serialize to string here
    },
  );

  s.post<{ Body: SdkCalculateTokenAmountParams }>(
    "/calculateTokenAmount",
    {
      schema: {
        body: SdkCalculateTokenAmountParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, amounts, isDeposit, options } = request.body;
      const res = await sdkPoolInstance.calculateTokenAmount(
        domainId,
        tokenAddress,
        amounts,
        isDeposit,
        options as Options,
      );
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkCalculateRemoveSwapLiquidityParams }>(
    "/calculateRemoveSwapLiquidity",
    {
      schema: {
        body: SdkCalculateRemoveSwapLiquidityParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, amount, options } = request.body;
      const res = await sdkPoolInstance.calculateRemoveSwapLiquidity(
        domainId,
        tokenAddress,
        amount,
        options as Options,
      );
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkCalculateRemoveSwapLiquidityOneTokenParams }>(
    "/calculateRemoveSwapLiquidityOneToken",
    {
      schema: {
        body: SdkCalculateRemoveSwapLiquidityOneTokenParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, amount, index, options } = request.body;
      const res = await sdkPoolInstance.calculateRemoveSwapLiquidityOneToken(
        domainId,
        tokenAddress,
        amount,
        index,
        options as Options,
      );
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkCalculatePriceImpactParams }>(
    "/calculatePriceImpact",
    {
      schema: {
        body: SdkCalculatePriceImpactParamsSchema,
      },
    },
    async (request, reply) => {
      const { tokenInputAmount, tokenOutputAmount, virtualPrice, isDeposit } = request.body;
      const res = sdkPoolInstance.calculatePriceImpact(
        BigNumber.from(tokenInputAmount),
        BigNumber.from(tokenOutputAmount),
        virtualPrice ? BigNumber.from(virtualPrice) : undefined,
        isDeposit ? isDeposit : undefined,
      );
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkCalculateAddLiquidityPriceImpactParams }>(
    "/calculateAddLiquidityPriceImpact",
    {
      schema: {
        body: SdkCalculateAddLiquidityPriceImpactParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, amountX, amountY } = request.body;
      const res = await sdkPoolInstance.calculateAddLiquidityPriceImpact(domainId, tokenAddress, amountX, amountY);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkCalculateRemoveLiquidityPriceImpactParams }>(
    "/calculateRemoveLiquidityPriceImpact",
    {
      schema: {
        body: SdkCalculateRemoveLiquidityPriceImpactParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, amountX, amountY } = request.body;
      const res = await sdkPoolInstance.calculateRemoveLiquidityPriceImpact(domainId, tokenAddress, amountX, amountY);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkCalculateSwapPriceImpactParams }>(
    "/calculateSwapPriceImpact",
    {
      schema: {
        body: SdkCalculateSwapPriceImpactParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, amountX, tokenX, tokenY, options } = request.body;
      const res = await sdkPoolInstance.calculateSwapPriceImpact(domainId, amountX, tokenX, tokenY, options as Options);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetTokenPriceParams }>(
    "/getTokenPrice",
    {
      schema: {
        body: SdkGetTokenPriceParamsSchema,
      },
    },
    async (request, reply) => {
      const { tokenSymbol } = request.body;
      const res = await sdkPoolInstance.getTokenPrice(tokenSymbol);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetLPTokenAddressParams }>(
    "/getLPTokenAddress",
    {
      schema: {
        body: SdkGetLPTokenAddressParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress } = request.body;
      const res = await sdkPoolInstance.getLPTokenAddress(domainId, tokenAddress);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetTokenSupplyParams }>(
    "/getTokenSupply",
    {
      schema: {
        body: SdkGetTokenSupplyParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, options } = request.body;
      const res = await sdkPoolInstance.getTokenSupply(domainId, tokenAddress, options as Options);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetTokenUserBalanceParams }>(
    "/getTokenUserBalance",
    {
      schema: {
        body: SdkGetTokenUserBalanceParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, userAddress, options } = request.body;
      const res = await sdkPoolInstance.getTokenUserBalance(domainId, tokenAddress, userAddress, options as Options);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetPoolTokenIndexParams }>(
    "/getPoolTokenIndex",
    {
      schema: {
        body: SdkGetPoolTokenIndexParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, poolTokenAddress } = request.body;
      const res = await sdkPoolInstance.getPoolTokenIndex(domainId, tokenAddress, poolTokenAddress);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetPoolTokenDecimalsParams }>(
    "/getPoolTokenDecimals",
    {
      schema: {
        body: SdkGetPoolTokenDecimalsParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, poolTokenAddress } = request.body;
      const res = await sdkPoolInstance.getPoolTokenDecimals(domainId, tokenAddress, poolTokenAddress);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetPoolTokenBalanceParams }>(
    "/getPoolTokenBalance",
    {
      schema: {
        body: SdkGetPoolTokenBalanceParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, poolTokenAddress, _index, options } = request.body;
      const res = await sdkPoolInstance.getPoolTokenBalance(
        domainId,
        tokenAddress,
        poolTokenAddress,
        _index,
        options as Options,
      );
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetPoolTokenAddressParams }>(
    "/getPoolTokenAddress",
    {
      schema: {
        body: SdkGetPoolTokenAddressParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, index } = request.body;
      const res = await sdkPoolInstance.getPoolTokenAddress(domainId, tokenAddress, index);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetVirtualPriceParams }>(
    "/getVirtualPrice",
    {
      schema: {
        body: SdkGetVirtualPriceParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, options } = request.body;
      const res = await sdkPoolInstance.getVirtualPrice(domainId, tokenAddress, options as Options);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetRepresentationParams }>(
    "/getRepresentation",
    {
      schema: {
        body: SdkGetRepresentationParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress } = request.body;
      const res = await sdkPoolInstance.getRepresentation(domainId, tokenAddress);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetAdoptedParams }>(
    "/getAdopted",
    {
      schema: {
        body: SdkGetAdoptedParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress } = request.body;
      const res = await sdkPoolInstance.getAdopted(domainId, tokenAddress);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetTokenSwapEventsParams }>(
    "/getTokenSwapEvents",
    {
      schema: {
        body: SdkGetTokenSwapEventsParamsSchema,
      },
    },
    async (request, reply) => {
      const params = request.body;
      const res = await sdkPoolInstance.getTokenSwapEvents(params);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetPoolDataParams }>(
    "/getPoolData",
    {
      schema: {
        body: SdkGetPoolDataParamsSchema,
      },
    },
    async (request, reply) => {
      const params = request.body;
      const res = await sdkPoolInstance.getPoolData(params);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkAddLiquidityParams }>(
    "/addLiquidity",
    {
      schema: {
        body: SdkAddLiquidityParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, amounts, minToMint, deadline, options } = request.body;
      const res = await sdkPoolInstance.addLiquidity(
        domainId,
        tokenAddress,
        amounts,
        minToMint,
        deadline,
        options as Options,
      );
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkRemoveLiquidityOneTokenParams }>(
    "/removeLiquidityOneToken",
    {
      schema: {
        body: SdkRemoveLiquidityOneTokenParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, withdrawTokenAddress, amount, minAmount, deadline, options } = request.body;
      const res = await sdkPoolInstance.removeLiquidityOneToken(
        domainId,
        tokenAddress,
        withdrawTokenAddress,
        amount,
        minAmount,
        deadline,
        options as Options,
      );
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkRemoveLiquidityParams }>(
    "/removeLiquidity",
    {
      schema: {
        body: SdkRemoveLiquidityParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, amount, minAmounts, deadline, options } = request.body;
      const res = await sdkPoolInstance.removeLiquidity(
        domainId,
        tokenAddress,
        amount,
        minAmounts,
        deadline,
        options as Options,
      );
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkRemoveLiquidityImbalanceParams }>(
    "/removeLiquidityImbalance",
    {
      schema: {
        body: SdkRemoveLiquidityImbalanceParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, amounts, maxBurnAmount, deadline, options } = request.body;
      const res = await sdkPoolInstance.removeLiquidityImbalance(
        domainId,
        tokenAddress,
        amounts,
        maxBurnAmount,
        deadline,
        options as Options,
      );
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkSwapParams }>(
    "/swap",
    {
      schema: {
        body: SdkSwapParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, from, to, amount, minDy, deadline, options } = request.body;
      const res = await sdkPoolInstance.swap(
        domainId,
        tokenAddress,
        from,
        to,
        amount,
        minDy,
        deadline,
        options as Options,
      );
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetPoolParams }>(
    "/getPool",
    {
      schema: {
        body: SdkGetPoolParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress } = request.body;
      const res = await sdkPoolInstance.getPool(domainId, tokenAddress);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetUserPoolsParams }>(
    "/getUserPools",
    {
      schema: {
        body: SdkGetUserPoolsParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, userAddress, options } = request.body;
      const res = await sdkPoolInstance.getUserPools(domainId, userAddress, options as Options);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetYieldStatsForDaysParams }>(
    "/getYieldStatsForDays",
    {
      schema: {
        body: SdkGetYieldStatsForDaysParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, unixTimestamp, days } = request.body;
      const res = await sdkPoolInstance.getYieldStatsForDays(domainId, tokenAddress, unixTimestamp, days);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkCalculateYieldParams }>(
    "/calculateYield",
    {
      schema: {
        body: SdkCalculateYieldParamsSchema,
      },
    },
    async (request, reply) => {
      const { feesEarned, principal, days } = request.body;
      const res = sdkPoolInstance.calculateYield(feesEarned, principal, days);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetYieldDataParams }>(
    "/getYieldData",
    {
      schema: {
        body: SdkGetYieldDataParamsSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress, days = 1 } = request.body;
      const res = await sdkPoolInstance.getYieldData(domainId, tokenAddress, days);
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetLiquidityMiningAprPerPoolParams }>(
    "/getLiquidityMiningAprPerPool",
    {
      schema: {
        body: SdkGetLiquidityMiningAprPerPoolParamsSchema,
      },
    },
    async (request, reply) => {
      const { totalTokens, totalBlocks, numPools, tokenSymbol, poolTVL } = request.body;
      const res = await sdkPoolInstance.getLiquidityMiningAprPerPool(
        totalTokens,
        totalBlocks,
        numPools,
        tokenSymbol,
        poolTVL,
      );
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetHourlySwapVolumeParams }>(
    "/getHourlySwapVolume",
    {
      schema: {
        body: SdkGetHourlySwapVolumeParamsSchema,
      },
    },
    async (request, reply) => {
      const { key, domainId, startTimestamp, endTimestamp, range } = request.body;
      const res = await sdkPoolInstance.getHourlySwapVolume({ key, domainId, startTimestamp, endTimestamp, range });
      reply.status(200).send(res);
    },
  );

  s.post<{ Body: SdkGetDailySwapVolumeParams }>(
    "/getDailySwapVolume",
    {
      schema: {
        body: SdkGetDailySwapVolumeParamsSchema,
      },
    },
    async (request, reply) => {
      const { key, domainId, startTimestamp, endTimestamp, range } = request.body;
      const res = await sdkPoolInstance.getDailySwapVolume({ key, domainId, startTimestamp, endTimestamp, range });
      reply.status(200).send(res);
    },
  );
};
