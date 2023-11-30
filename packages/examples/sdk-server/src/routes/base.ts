import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  SdkBase,
  SdkXCallParamsSchema,
  SdkXCallParams,
  SdkEstimateRelayerFeeParamsSchema,
  SdkEstimateRelayerFeeParams,
  SdkBumpTransferParamsSchema,
  SdkUpdateSlippageParamsSchema,
  SdkUpdateSlippageParams,
  SdkCalculateAmountReceivedParamsSchema,
} from "@connext/sdk-core";
import { createLoggingContext, jsonifyError } from "@connext/nxtp-utils";

import { RoutesOptions } from "../server";

interface BaseRoutesOptions extends RoutesOptions {
  sdkBaseInstance: SdkBase;
}

export const baseRoutes = async (server: FastifyInstance, options: BaseRoutesOptions): Promise<void> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();
  const { sdkBaseInstance, logger, cacheConfig } = options;
  const { requestContext, methodContext } = createLoggingContext(baseRoutes.name);

  const CACHE_EXPIRATION_SECS = cacheConfig?.expirationTime || 300;

  server.setErrorHandler(function (error, request, reply) {
    logger?.error(`Error: ${error.message} ${request.body}`, requestContext, methodContext);
    reply.status(500).send(jsonifyError(error as Error));
  });

  s.post<{ Body: SdkXCallParams }>(
    "/xcall",
    {
      schema: {
        body: SdkXCallParamsSchema,
      },
    },
    async (request, reply) => {
      const txReq = await sdkBaseInstance.xcall(request.body);
      reply.status(200).send(txReq);
    },
  );

  s.post<{ Body: SdkEstimateRelayerFeeParams }>(
    "/estimateRelayerFee",
    {
      schema: {
        body: SdkEstimateRelayerFeeParamsSchema,
      },
    },
    async (request, reply) => {
      const {
        originDomain,
        destinationDomain,
        callDataGasAmount,
        priceIn,
        isHighPriority,
        originNativeTokenPrice,
        destinationNativeTokenPrice,
        destinationGasPrice,
      } = request.body;

      const handleEstimateRelayerFee = async () => {
        return sdkBaseInstance.estimateRelayerFee({
          originDomain,
          destinationDomain,
          callDataGasAmount,
          priceIn,
          isHighPriority,
          originNativeTokenPrice,
          destinationNativeTokenPrice,
          destinationGasPrice,
        });
      };

      if (cacheConfig?.enabled) {
        const cacheKey = JSON.stringify(request.body);
        const cachedFee = await server.redis.get(cacheKey);

        if (cachedFee) {
          reply.status(200).send(JSON.parse(cachedFee));
        } else {
          const txReq = await handleEstimateRelayerFee();
          await server.redis.set(cacheKey, JSON.stringify(txReq), "EX", CACHE_EXPIRATION_SECS);
          reply.status(200).send(txReq);
        }
      } else {
        const txReq = await handleEstimateRelayerFee();
        reply.status(200).send(txReq);
      }
    },
  );

  s.post(
    "/bumpTransfer",
    {
      schema: {
        body: SdkBumpTransferParamsSchema,
      },
    },
    async (request, reply) => {
      const txReq = await sdkBaseInstance.bumpTransfer(request.body);
      reply.status(200).send(txReq);
    },
  );

  s.post<{ Body: SdkUpdateSlippageParams }>(
    "/updateSlippage",
    {
      schema: {
        body: SdkUpdateSlippageParamsSchema,
      },
    },
    async (request, reply) => {
      const txReq = await sdkBaseInstance.updateSlippage(request.body);
      reply.status(200).send(txReq);
    },
  );

  s.post(
    "/calculateAmountReceived",
    {
      schema: {
        body: SdkCalculateAmountReceivedParamsSchema,
      },
    },
    async (request, reply) => {
      const { originDomain, destinationDomain, originTokenAddress, amount, receiveLocal, checkFastLiquidity } =
        request.body;
      const res = await sdkBaseInstance.calculateAmountReceived(
        originDomain,
        destinationDomain,
        originTokenAddress,
        amount,
        receiveLocal,
        checkFastLiquidity,
      );
      reply.status(200).send(res);
    },
  );
};
