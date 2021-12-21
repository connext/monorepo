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
import { signRouterFulfillTransactionPayload } from "../helpers";

const { AddressZero, Zero } = constants;

// sender fulfill
export const fulfill = async (
  invariantData: InvariantTransactionData,
  input: FulfillInput,
  _requestContext: RequestContext<string>,
): Promise<providers.TransactionReceipt | undefined> => {
  const { requestContext, methodContext } = createLoggingContext(fulfill.name, _requestContext);

  const { logger, contractWriter, config, txService, isRouterContract, wallet, routerAddress, chainData } =
    getContext();
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

  const { signature: fulfillSignature, callData, relayerFee, amount, expiry, preparedBlockNumber } = input;

  let routerRelayerFeeAsset = AddressZero;
  let routerRelayerFee = Zero;

  if (!config.chainConfig[invariantData.sendingChainId]) {
    throw new NoChainConfig(invariantData.sendingChainId, { methodContext, requestContext, invariantData, input });
  }

  let receipt: providers.TransactionReceipt;
  // router contract needs to have fee added
  if (isRouterContract) {
    routerRelayerFeeAsset = utils.getAddress(
      config.chainConfig[invariantData.receivingChainId].routerContractRelayerAsset || AddressZero,
    );
    const relayerFeeAssetDecimal = await txService.getDecimalsForAsset(
      invariantData.sendingChainId,
      routerRelayerFeeAsset,
    );
    routerRelayerFee = await txService.calculateGasFee(
      invariantData.sendingChainId,
      routerRelayerFeeAsset,
      relayerFeeAssetDecimal,
      "fulfill",
      isRouterContract,
      chainData,
      requestContext,
    );

    const signature = await signRouterFulfillTransactionPayload(
      { ...invariantData, amount, expiry, preparedBlockNumber },
      fulfillSignature,
      callData,
      "0x",
      routerRelayerFeeAsset,
      routerRelayerFee.toString(),
      invariantData.sendingChainId,
      wallet,
    );

    receipt = await contractWriter.fulfillRouterContract(
      invariantData.sendingChainId,
      {
        txData: { ...invariantData, amount, expiry, preparedBlockNumber },
        signature: fulfillSignature,
        relayerFee: "0", // no relayer fee on sender side
        callData,
      },
      routerAddress,
      signature,
      routerRelayerFeeAsset,
      routerRelayerFee.toString(),
      true,
      requestContext,
    );
  } else {
    receipt = await contractWriter.fulfillTransactionManager(
      invariantData.sendingChainId,
      {
        txData: { ...invariantData, amount, expiry, preparedBlockNumber },
        signature: fulfillSignature,
        relayerFee: relayerFee,
        callData: callData,
      },
      requestContext,
    );
  }
  logger.info("Method complete", requestContext, methodContext, { transactionHash: receipt.transactionHash });
  return receipt;
};
