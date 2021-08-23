import {
  ajv,
  getUuid,
  InvariantTransactionData,
  InvariantTransactionDataSchema,
  RequestContext,
  calculateExchangeAmount,
} from "@connext/nxtp-utils";
import { providers, BigNumber } from "ethers";

import { getContext } from "../../router";
import { FulfillInput, FulfillInputSchema } from "../entities";
import { NoChainConfig, ParamsInvalid, NotEnoughRelayerFee } from "../errors";

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

  // Validate InvariantData schema
  const validateInvariantData = ajv.compile(InvariantTransactionDataSchema);
  const validInvariantData = validateInvariantData(invariantData);
  if (!validInvariantData) {
    const error = validateInvariantData.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    logger.error(
      { method, methodId, error: validateInvariantData.errors, invariantData },
      "Invalid invariantData params",
    );
    throw new ParamsInvalid({
      method,
      methodId,
      paramsError: error,
      requestContext,
    });
  }

  // Validate Prepare Input schema
  const validateInput = ajv.compile(FulfillInputSchema);
  const validInput = validateInput(input);
  if (!validInput) {
    const error = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    logger.error({ method, methodId, error: validateInput.errors, input }, "Invalid input params");
    throw new ParamsInvalid({
      method,
      methodId,
      paramsError: error,
      requestContext,
    });
  }

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

  const relayerFeeLowerBound = config.chainConfig[fulfillChain].safeRelayerFee.toString();
  if (BigNumber.from(input.relayerFee).lt(relayerFeeLowerBound)) {
    throw new NotEnoughRelayerFee(fulfillChain, {
      method,
      methodId,
      requestContext,
      relayerFee: input.relayerFee,
      relayerFeeLowerBound: relayerFeeLowerBound,
    });
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
        signature: signature,
        relayerFee: relayerFee,
        callData: callData,
      },
      requestContext,
    );
    logger.info({ method, methodId, requestContext, transactionHash: receipt.transactionHash }, "Method complete");
    return receipt;
  } finally {
    map.delete(invariantData.transactionId);
  }
};
