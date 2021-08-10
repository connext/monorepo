import { getUuid, InvariantTransactionData, RequestContext, TransactionData } from "@connext/nxtp-utils";
import { providers } from "ethers";

import { getContext } from "../../router";
import { FulfillInput } from "../entities";
import { NoChainConfig } from "../errors";

export const senderFulfilling: Map<string, boolean> = new Map();
export const receiverFulfilling: Map<string, boolean> = new Map();

export const fulfill = async (
  invariantData: InvariantTransactionData,
  input: FulfillInput,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt | undefined> => {
  const method = "fulfill";
  const methodId = getUuid();

  const { logger, contractWriter, config } = getContext();
  logger.info({ method, methodId, requestContext, invariantData, input }, "Method start");

  const { signature, callData, relayerFee, amount, expiry, side, preparedBlockNumber } = input;

  // Send to tx service
  logger.info(
    { method, methodId, requestContext, transactionId: invariantData.transactionId, signature, side },
    "Sending fulfill tx",
  );

  let fulfillChain: number;
  let map;
  if (side === "sender") {
    fulfillChain = invariantData.sendingChainId;
    map = senderFulfilling;
  } else {
    fulfillChain = invariantData.receivingChainId;
    map = receiverFulfilling;
  }

  if (!config.chainConfig[fulfillChain]) {
    throw new NoChainConfig(fulfillChain, { method, methodId, requestContext });
  }

  if (map.get(invariantData.transactionId)) {
    logger.info({ methodId, method, requestContext, transactionId: invariantData.transactionId }, "Already fulfilling");
    return;
  }
  map.set(invariantData.transactionId, true);

  try {
    const receipt = await contractWriter.fulfill(
      fulfillChain,
      {
        txData: { ...invariantData, amount, expiry, preparedBlockNumber },
        signature: signature!,
        relayerFee: relayerFee!,
        callData: callData!,
      },
      requestContext,
    );
    logger.info({ method, methodId, requestContext, transactionHash: receipt.transactionHash }, "Method complete");
    return receipt;
  } finally {
    map.delete(invariantData.transactionId);
  }
};
