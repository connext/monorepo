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
import { cacheMiddleware } from "../cacheMiddleware";

interface BaseRoutesOptions extends RoutesOptions {
  sdkBaseInstance: SdkBase;
}

export const baseRoutes = async (server: FastifyInstance, options: BaseRoutesOptions): Promise<void> => {
  const s = server.withTypeProvider<TypeBoxTypeProvider>();
  const { sdkBaseInstance, logger } = options;
  const { requestContext, methodContext } = createLoggingContext(baseRoutes.name);

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
      await cacheMiddleware(
        server,
        request,
        reply,
        async () => sdkBaseInstance.estimateRelayerFee(request.body),
        "estimateRelayerFee",
        options
      );
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
      const {
        originDomain,
        destinationDomain,
        originTokenAddress,
        amount,
        receiveLocal,
        checkFastLiquidity,
        signerAddress,
      } = request.body;
      const res = await sdkBaseInstance.calculateAmountReceived(
        originDomain,
        destinationDomain,
        originTokenAddress,
        amount,
        receiveLocal,
        checkFastLiquidity,
        signerAddress,
      );
      reply.status(200).send(res);
    },
  );
};
