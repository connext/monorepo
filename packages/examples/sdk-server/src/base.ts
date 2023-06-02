import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  SdkBase,
  SdkXCallParamsSchema,
  SdkXCallParams,
  SdkEstimateRelayerFeeParamsSchema,
  SdkEstimateRelayerFeeParams,
  SdkBumpTransferParamsSchema,
  SdkBumpTransferParams,
  SdkUpdateSlippageParamsSchema,
  SdkUpdateSlippageParams,
  SdkCalculateAmountReceivedParamsSchema,
  SdkCalculateAmountReceivedParams,
} from "@connext/sdk-core";

export const baseRoutes = async (server: FastifyInstance, sdkBaseInstance: SdkBase): Promise<any> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();

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
      const txReq = await sdkBaseInstance.estimateRelayerFee({
        originDomain,
        destinationDomain,
        callDataGasAmount,
        priceIn,
        isHighPriority,
        originNativeTokenPrice,
        destinationNativeTokenPrice,
        destinationGasPrice,
      });
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
    "/bumpTransfer",
    {
      schema: {
        body: SdkBumpTransferParamsSchema,
      },
    },
    async (request, reply) => {
      const txReq = await sdkBaseInstance.bumpTransfer(request.body as SdkBumpTransferParams);
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
      try {
        const { originDomain, destinationDomain, originTokenAddress, amount, receiveLocal, checkFastLiquidity } =
          request.body as SdkCalculateAmountReceivedParams;
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
