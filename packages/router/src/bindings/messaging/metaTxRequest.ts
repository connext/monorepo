import {
  createRequestContext,
  MetaTxFulfillPayload,
  MetaTxPayload,
  MetaTxTypes,
  NxtpErrorJson,
  RequestContext,
} from "@connext/nxtp-utils";
import { getAddress } from "ethers/lib/utils";

import { getOperations } from "../../lib/operations";
import { getContext } from "../../router";

export const metaTxRequestBinding = async (
  inbox: string,
  data?: MetaTxPayload<any>,
  err?: NxtpErrorJson,
  _requestContext?: RequestContext,
) => {
  const { messaging, logger, config } = getContext();
  const { fulfill } = getOperations();
  const requestContext = _requestContext ?? createRequestContext("metaTxRequestBinding");
  if (err || !data) {
    logger.error({ err, data, requestContext }, "Error in metatx request");
    return;
  }

  // On every metatx request (i.e. user wants router to fulfill for them)
  // route to metatx handler
  logger.info({ data, requestContext }, "Got metatx");
  const { chainId } = data;

  const chainConfig = config.chainConfig[chainId];
  if (!chainConfig) {
    logger.error({ requestContext, chainId }, "No config for chainId");
    return;
  }

  if (data.type !== MetaTxTypes.Fulfill) {
    logger.warn({ requestContext, chainConfig, type: data.type }, "Unhandled metatx type");
    return;
  }

  if (getAddress(data.to) !== getAddress(chainConfig.transactionManagerAddress)) {
    logger.error(
      { requestContext, to: data.to, transactionManagerAddress: chainConfig.transactionManagerAddress },
      "Provided transactionManagerAddress does not map to our configured transactionManagerAddress",
    );
    return;
  }

  const { txData, callData, relayerFee, signature }: MetaTxFulfillPayload = data.data;
  if (chainId !== txData.receivingChainId) {
    logger.error(
      { requestContext, chainId, receivingChainId: txData.receivingChainId },
      "Request not sent for receiving chain",
    );
    return;
  }

  logger.info({ requestContext }, "Handling fulfill request");
  logger.info({ requestContext }, "Fulfilling tx");
  const tx = await fulfill(
    {
      receivingChainTxManagerAddress: txData.receivingChainTxManagerAddress,
      user: txData.user,
      router: txData.router,
      sendingChainId: txData.sendingChainId,
      sendingAssetId: txData.sendingAssetId,
      sendingChainFallback: txData.sendingChainFallback,
      receivingChainId: txData.receivingChainId,
      receivingAssetId: txData.receivingAssetId,
      receivingAddress: txData.receivingAddress,
      callDataHash: txData.callDataHash,
      callTo: txData.callTo,
      transactionId: txData.transactionId,
    },
    {
      amount: txData.amount,
      expiry: txData.expiry,
      preparedBlockNumber: txData.preparedBlockNumber,
      signature,
      relayerFee,
      callData,
      side: "receiver",
    },
    requestContext,
  );
  if (tx) {
    await messaging.publishMetaTxResponse(inbox, { chainId, transactionHash: tx.transactionHash });
  }
  logger.info({ requestContext }, "Handled fulfill request");
};
