import { getUuid, RequestContext, TransactionFulfilledEvent, TransactionPreparedEvent } from "@connext/nxtp-utils";
import { providers } from "ethers";
import { getContext } from "../..";
import { ActiveTransaction } from "../entities";

const senderFulfilling: Map<string, boolean> = new Map();

export const fulfillSender = async (
  tx: ActiveTransaction,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt | undefined> => {
  const method = "fulfillSender";
  const methodId = getUuid();

  const { logger, contractWriter } = getContext();
  logger.info({ method, methodId, requestContext, tx }, "Method start");

  const {
    crosschainTx: { invariant, sending, receiving },
    signature,
    callData,
    relayerFee,
  } = tx;

  if (senderFulfilling.get(invariant.transactionId)) {
    logger.info({ methodId, method, requestContext, transactionId: invariant.transactionId }, "Already fulfilling");
    return;
  }

  senderFulfilling.set(invariant.transactionId, true);

  // Send to tx service
  logger.info(
    { method, methodId, requestContext, transactionId: invariant.transactionId, signature },
    "Sending sender fulfill tx",
  );

  try {
    const receipt = await contractWriter.fulfill(
      invariant.sendingChainId,
      {
        txData: { ...invariant, ...sending },
        signature: signature!,
        relayerFee: relayerFee!,
        callData: callData!,
      },
      requestContext,
    );
    logger.info({ method, methodId, requestContext, transactionHash: receipt.transactionHash }, "Method complete");
    return receipt;
  } catch (err) {
    throw err;
  } finally {
    senderFulfilling.delete(invariant.transactionId);
  }
};
