import { getUuid, RequestContext } from "@connext/nxtp-utils";
import { providers } from "ethers";

import { getContext } from "../../router";
import { ActiveTransaction } from "../entities";

export const senderCancelling: Map<string, boolean> = new Map();

export const cancelSender = async (
  tx: ActiveTransaction,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt | undefined> => {
  const method = "cancelSender";
  const methodId = getUuid();

  const { logger, contractWriter } = getContext();
  logger.info({ method, methodId, requestContext, tx }, "Method start");

  const {
    crosschainTx: { invariant, sending },
    signature,
  } = tx;
  const txData = { ...invariant, ...sending };

  if (senderCancelling.get(invariant.transactionId)) {
    logger.info({ methodId, method, requestContext, transactionId: invariant.transactionId }, "Already cancelling");
    return;
  }

  senderCancelling.set(invariant.transactionId, true);

  // Send to tx service
  logger.info(
    { method, methodId, requestContext, transactionId: invariant.transactionId, signature },
    "Sending sender cancel tx",
  );

  try {
    const receipt = await contractWriter.cancel(
      txData.sendingChainId,
      {
        relayerFee: "0",
        txData,
        signature: "0x",
      },
      requestContext,
    );
    logger.info({ method, methodId, requestContext, transactionHash: receipt.transactionHash }, "Method complete");
    return receipt;
  } finally {
    senderCancelling.delete(invariant.transactionId);
  }
};
