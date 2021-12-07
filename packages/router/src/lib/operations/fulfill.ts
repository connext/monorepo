import {
  ajv,
  createLoggingContext,
  InvariantTransactionData,
  InvariantTransactionDataSchema,
  RequestContext,
} from "@connext/nxtp-utils";
import { providers, constants, utils } from "ethers";

import { getContext } from "../../router";
import { FulfillInput, FulfillInputSchema } from "../entities";
import { NoChainConfig, ParamsInvalid } from "../errors";
import { calculateGasFee } from "../helpers";

const { AddressZero, Zero } = constants;

// sender fulfill
export const fulfill = async (
  invariantData: InvariantTransactionData,
  input: FulfillInput,
  _requestContext: RequestContext<string>,
): Promise<providers.TransactionReceipt | undefined> => {
  const { requestContext, methodContext } = createLoggingContext(fulfill.name, _requestContext);

  const { logger, contractWriter, config, chainData, txService, isRouterContract } = getContext();
  logger.debug("Method start", requestContext, methodContext, { invariantData, input });

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

  const { signature, callData, relayerFee, amount, expiry, preparedBlockNumber } = input;

  let routerRelayerFeeAsset = AddressZero;
  let routerRelayerFee = Zero;

  if (!config.chainConfig[invariantData.sendingChainId]) {
    throw new NoChainConfig(invariantData.sendingChainId, { methodContext, requestContext, invariantData, input });
  }

  // router contract needs to have fee added
  if (isRouterContract) {
    routerRelayerFeeAsset = utils.getAddress(
      config.chainConfig[invariantData.receivingChainId].routerContractRelayerAsset || AddressZero,
    );
    const relayerFeeAssetDecimal = await txService.getDecimalsForAsset(
      invariantData.receivingChainId,
      invariantData.receivingAssetId,
    );
    routerRelayerFee = await calculateGasFee(
      invariantData.receivingChainId,
      routerRelayerFeeAsset,
      relayerFeeAssetDecimal,
      "fulfill",
      requestContext,
      methodContext,
      "sending",
    );
  }

  const receipt = await contractWriter.fulfill(
    invariantData.sendingChainId,
    {
      txData: { ...invariantData, amount, expiry, preparedBlockNumber },
      signature: signature,
      relayerFee: relayerFee,
      callData: callData,
    },
    requestContext,
    routerRelayerFeeAsset,
    routerRelayerFee.toString(),
  );
  logger.info("Method complete", requestContext, methodContext, { transactionHash: receipt.transactionHash });
  return receipt;
};
