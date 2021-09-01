import {
  ajv,
  createLoggingContext,
  InvariantTransactionData,
  InvariantTransactionDataSchema,
  RequestContext,
} from "@connext/nxtp-utils";
import { providers, BigNumber } from "ethers";

import { getContext } from "../../router";
import { FulfillInput, FulfillInputSchema } from "../entities";
import { NoChainConfig, ParamsInvalid, NotEnoughRelayerFee } from "../errors";

export const fulfill = async (
  invariantData: InvariantTransactionData,
  input: FulfillInput,
  _requestContext: RequestContext<string>,
): Promise<providers.TransactionReceipt | undefined> => {
  const { requestContext, methodContext } = createLoggingContext(fulfill.name, _requestContext);

  const { logger, contractWriter, config } = getContext();
  logger.info("Method start", requestContext, methodContext, { invariantData, input });

  // Validate InvariantData schema
  const validateInvariantData = ajv.compile(InvariantTransactionDataSchema);
  const validInvariantData = validateInvariantData(invariantData);
  if (!validInvariantData) {
    const msg = validateInvariantData.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    throw new ParamsInvalid({
      methodContext,
      requestContext,
      paramsError: msg,
      invariantData,
    });
  }

  // Validate Prepare Input schema
  const validateInput = ajv.compile(FulfillInputSchema);
  const validInput = validateInput(input);
  if (!validInput) {
    const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    throw new ParamsInvalid({
      methodContext,
      requestContext,
      paramsError: msg,
    });
  }

  const { signature, callData, relayerFee, amount, expiry, side, preparedBlockNumber } = input;

  // Send to tx service
  logger.info("Sending fulfill tx", requestContext, methodContext, { signature, side });

  let fulfillChain: number;
  if (side === "sender") {
    fulfillChain = invariantData.sendingChainId;
  } else {
    fulfillChain = invariantData.receivingChainId;
  }

  if (!config.chainConfig[fulfillChain]) {
    throw new NoChainConfig(fulfillChain, { methodContext, requestContext, invariantData, input });
  }

  const relayerFeeLowerBound = config.chainConfig[fulfillChain].safeRelayerFee;
  if (BigNumber.from(input.relayerFee).lt(relayerFeeLowerBound)) {
    throw new NotEnoughRelayerFee(fulfillChain, {
      methodContext,
      requestContext,
      relayerFee: input.relayerFee,
      relayerFeeLowerBound: relayerFeeLowerBound,
      invariantData,
      input,
    });
  }

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
  logger.info("Method complete", requestContext, methodContext, { transactionHash: receipt.transactionHash });
  return receipt;
};
