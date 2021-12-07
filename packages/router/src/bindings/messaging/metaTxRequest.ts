import {
  createLoggingContext,
  MetaTxFulfillPayload,
  MetaTxPayload,
  MetaTxRouterContractCancelPayload,
  MetaTxRouterContractFulfillPayload,
  MetaTxRouterContractPreparePayload,
  MetaTxType,
  NxtpErrorJson,
  RequestContext,
} from "@connext/nxtp-utils";

import { NoTransactionId } from "../../lib/errors";
import { getOperations } from "../../lib/operations";
import { getContext } from "../../router";

export const handlingTracker: Map<string, MetaTxType> = new Map();

export const metaTxRequestBinding = async (
  from: string,
  inbox: string,
  data?: MetaTxPayload<any>,
  err?: NxtpErrorJson,
  _requestContext?: RequestContext,
) => {
  const { messaging, logger, config } = getContext();
  const { sendMetaTx } = getOperations();
  const { requestContext, methodContext } = createLoggingContext(
    metaTxRequestBinding.name,
    _requestContext,
    data?.data?.txData.transactionId,
  );
  if (err || !data) {
    logger.error("Error in metatx request", requestContext, methodContext, err, {
      data,
    });
    return;
  }

  // On every metatx request (i.e. user wants router to fulfill for them)
  // route to metatx handler
  logger.debug("Got metatx", requestContext, methodContext, { data });
  const { chainId } = data;

  const chainConfig = config.chainConfig[chainId];
  if (!chainConfig) {
    logger.debug("No config for chainId", requestContext, methodContext, { chainId });
    return;
  }

  const transactionId =
    (data.data as MetaTxFulfillPayload).txData?.transactionId ??
    (
      data.data as
        | MetaTxRouterContractPreparePayload
        | MetaTxRouterContractFulfillPayload
        | MetaTxRouterContractCancelPayload
    ).params?.txData?.transactionId;

  if (!transactionId) {
    throw new NoTransactionId({ data });
  }
  const record = handlingTracker.get(transactionId);
  if (record && record === data.type) {
    logger.info("Handling metatx request for tx", requestContext, methodContext, {
      type: data.type,
      record: record,
    });
    return;
  }
  handlingTracker.set(transactionId, data.type);
  try {
    const tx = await sendMetaTx(data, requestContext as any);
    if (tx) {
      await messaging.publishMetaTxResponse(from, inbox, { chainId, transactionHash: tx.transactionHash });
    }
    logger.info("Handled fulfill request", requestContext, methodContext);
  } finally {
    handlingTracker.delete(transactionId);
  }
};
