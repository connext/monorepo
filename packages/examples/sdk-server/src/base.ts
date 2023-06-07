import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  SdkBase,
  SdkXCallParamsSchema,
  SdkXCallParams,
  SdkEstimateRelayerFeeParamsSchema,
  SdkEstimateRelayerFeeParams,
  SdkBumpTransferParamsSchema,
  SdkUpdateSlippageSchema,
  SdkCalculateAmountReceivedParamsSchema,
} from "@connext/sdk";

import { approveIfNeededSchema, getCanonicalTokenIdSchema, calculateCanonicalKeySchema } from "./types/api";

interface BaseRoutesOptions {
  sdkBaseInstance: SdkBase;
  cacheConfig?: {
    enabled?: boolean;
    expirationTime?: number;
  };
}

export const baseRoutes = async (server: FastifyInstance, options: BaseRoutesOptions): Promise<void> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();
  const { sdkBaseInstance, cacheConfig } = options;

  const CACHE_EXPIRATION_SECS = cacheConfig?.expirationTime || 300;

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
          reply.status(200).send({ fee: JSON.parse(cachedFee) });
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
    "/approveIfNeeded",
    {
      schema: {
        body: approveIfNeededSchema,
      },
    },
    async (request, reply) => {
      const { domainId, assetId, amount, infiniteApprove } = request.body;
      const txReq = await sdkBaseInstance.approveIfNeeded(domainId, assetId, amount, infiniteApprove);
      reply.status(200).send(txReq);
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

  s.post(
    "/updateSlippage",
    {
      schema: {
        body: SdkUpdateSlippageSchema,
      },
    },
    async (request, reply) => {
      const txReq = await sdkBaseInstance.updateSlippage(request.body);
      reply.status(200).send(txReq);
    },
  );

  s.get(
    "/getCanonicalTokenId/:domainId/:tokenAddress",
    {
      schema: {
        params: getCanonicalTokenIdSchema,
      },
    },
    async (request, reply) => {
      const { domainId, tokenAddress } = request.params;
      const res = await sdkBaseInstance.getCanonicalTokenId(domainId, tokenAddress);
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
      const res = sdkBaseInstance.calculateCanonicalKey(domainId, tokenId);
      reply.status(200).send(res);
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
      try {
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
      } catch (e: unknown) {
        console.log(e);
      }
    },
  );
};
