import { getUuid, MetaTxFulfillPayload, RequestContext } from "@connext/nxtp-utils";
import { providers } from "ethers";

import { getContext } from "../../router";
import { NoChainConfig } from "../errors";

export const fulfillReceiver = async (
  payload: MetaTxFulfillPayload,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const method = "fulfillReceiver";
  const methodId = getUuid();

  const { logger, config, contractWriter } = getContext();

  logger.info({ method, methodId, requestContext, transaction: payload }, "Method start");

  const { txData, relayerFee, signature, callData } = payload;

  const chainConfig = config.chainConfig[txData.receivingChainId];
  if (!chainConfig) {
    throw new NoChainConfig(txData.receivingChainId, {
      requestContext,
      methodId,
      method,
    });
  }
  // Validate that metatx request matches with known data about fulfill
  // Is this needed? Can we just submit to chain without validating?
  // Technically this is ok, but perhaps we want to validate only for our own
  // logging purposes.
  // Would also be bad if router had no gas here
  // Next, prepare the tx object
  // - Get chainId from data
  // - Get fulfill fee from data and validate it covers gas
  // - etc.
  // Send to txService
  // Update metrics

  // TODO: make sure fee is something we want to accept

  logger.info({ method, methodId, requestContext, chainId: txData.receivingChainId, payload }, "Submitting tx");
  const tx = await contractWriter.fulfill(
    txData.receivingChainId,
    {
      txData,
      relayerFee,
      signature,
      callData,
    },
    requestContext,
  );
  logger.info({ method, methodId, requestContext, transactionHash: tx.transactionHash }, "Method complete");
  return tx;
};
