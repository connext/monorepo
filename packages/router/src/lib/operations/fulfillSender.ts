import { getUuid, RequestContext, TransactionFulfilledEvent, TransactionPreparedEvent } from "@connext/nxtp-utils";
import { providers } from "ethers";
import { getContext } from "../..";

const senderFulfilling: Map<string, boolean> = new Map();

export const fulfillSender = async (
  senderEvent: TransactionPreparedEvent, // TODO: better types
  receiverEvent: TransactionFulfilledEvent,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt | undefined> => {
  const method = "fulfillSender";
  const methodId = getUuid();

  const { logger, contractWriter } = getContext();
  logger.info({ method, methodId, requestContext, senderEvent, receiverEvent }, "Method start");

  const { txData, signature, callData, relayerFee } = receiverEvent;

  if (senderFulfilling.get(txData.transactionId)) {
    logger.info({ methodId, method, requestContext, transactionId: txData.transactionId }, "Already fulfilling");
    return;
  }

  senderFulfilling.set(txData.transactionId, true);

  // Send to tx service
  logger.info(
    { method, methodId, requestContext, transactionId: txData.transactionId, signature },
    "Sending sender fulfill tx",
  );

  try {
    const receipt = await contractWriter.fulfill(
      txData.sendingChainId,
      {
        txData: senderEvent.txData,
        signature,
        relayerFee,
        callData,
      },
      requestContext,
    );
    logger.info({ method, methodId, requestContext, transactionHash: receipt.transactionHash }, "Method complete");
    return receipt;
  } catch (err) {
    senderFulfilling.delete(txData.transactionId);
    throw err;
  }
};
