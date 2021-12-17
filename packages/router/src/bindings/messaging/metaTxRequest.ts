import {
  createLoggingContext,
  MetaTxFulfillPayload,
  MetaTxPayload,
  MetaTxType,
  MetaTxTypes,
  NxtpErrorJson,
  RequestContext,
} from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { getAddress } from "ethers/lib/utils";

import { TransactionReasons } from "../../lib/entities";
import { incrementFees, incrementGasConsumed } from "../../lib/helpers";
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
  const { fulfill } = getOperations();
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

  if (data.type !== MetaTxTypes.Fulfill) {
    logger.warn("Unhandled metatx type", requestContext, methodContext, { chainConfig, type: data.type });
    return;
  }

  if (getAddress(data.to) !== getAddress(chainConfig.transactionManagerAddress)) {
    logger.warn(
      "Provided transactionManagerAddress does not map to our configured transactionManagerAddress",
      requestContext,
      methodContext,
      { to: data.to, transactionManagerAddress: chainConfig.transactionManagerAddress },
    );
    return;
  }

  const { txData, callData, relayerFee, signature }: MetaTxFulfillPayload = data.data;
  if (chainId !== txData.receivingChainId) {
    logger.warn("Request not sent for receiving chain", requestContext, methodContext, {
      chainId,
      receivingChainId: txData.receivingChainId,
    });
    return;
  }

  const record = handlingTracker.get(txData.transactionId);
  if (record && record === data.type) {
    logger.info("Handling metatx request for tx", requestContext, methodContext, {
      type: data.type,
    });
    return;
  }
  handlingTracker.set(txData.transactionId, data.type);

  logger.debug("Handling fulfill request", requestContext, methodContext);
  try {
    const tx = await fulfill(
      {
        receivingChainTxManagerAddress: txData.receivingChainTxManagerAddress,
        user: txData.user,
        router: txData.router,
        initiator: txData.initiator,
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
      { ...requestContext, transactionId: txData.transactionId },
    );
    if (tx) {
      await messaging.publishMetaTxResponse(from, inbox, { chainId, transactionHash: tx.transactionHash });
      // Increment collected fees + gas used on relayer fee
      incrementFees(txData.receivingAssetId, txData.receivingChainId, BigNumber.from(relayerFee), requestContext);
      incrementGasConsumed(txData.receivingChainId, tx.gasUsed, TransactionReasons.Relay, requestContext);
    }
    logger.info("Handled fulfill request", requestContext, methodContext);
  } finally {
    handlingTracker.delete(txData.transactionId);
  }
};
