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
import { NotAllowedFulfillRelay } from "../errors/fulfill";
import { calculateGasFeeInReceivingTokenForFulfill } from "../helpers/shared";

export const fulfill = async (
  invariantData: InvariantTransactionData,
  input: FulfillInput,
  _requestContext: RequestContext<string>,
): Promise<providers.TransactionReceipt | undefined> => {
  const { requestContext, methodContext } = createLoggingContext(fulfill.name, _requestContext);

  const { logger, contractWriter, config, chainData, txService, wallet } = getContext();
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

  const { signature, callData, relayerFee, amount, expiry, side, preparedBlockNumber } = input;

  if (!config.chainConfig[invariantData.sendingChainId]) {
    throw new NoChainConfig(invariantData.sendingChainId, { methodContext, requestContext, invariantData, input });
  }

  // check for relayer fee if we are not submitting ourselves
  // TODO: move this logic to the metatx logic and handle both types of relayer fee
  const myAddress = await wallet.getAddress();
  if (invariantData.router !== myAddress) {
    const relayerFeeLowerBound = config.chainConfig[invariantData.sendingChainId].relayerFeeThreshold;
    const allowRelay = config.chainConfig[invariantData.sendingChainId].allowRelay || config.allowRelay;
    if (!allowRelay) {
      throw new NotAllowedFulfillRelay(invariantData.sendingChainId, {
        methodContext,
        requestContext,
        relayerFee: input.relayerFee,
        relayerFeeLowerBound: relayerFeeLowerBound,
        invariantData,
        input,
      });
    }

    // Send to tx service
    logger.info("Sending fulfill tx", requestContext, methodContext, { signature, side });

    let outputDecimals = chainData.get(invariantData.receivingChainId.toString())?.assetId[
      invariantData.receivingAssetId
    ]?.decimals;
    if (!outputDecimals) {
      outputDecimals = await txService.getDecimalsForAsset(
        invariantData.receivingChainId,
        invariantData.receivingAssetId,
      );
    }
    logger.info("Got output decimals", requestContext, methodContext, { outputDecimals });
    const expectedFulfillFee = await calculateGasFeeInReceivingTokenForFulfill(
      invariantData.receivingAssetId,
      invariantData.receivingChainId,
      outputDecimals,
      requestContext,
    );
    logger.info("Expected Fulfill fee in router side", requestContext, methodContext, {
      expectedFulfillFee: expectedFulfillFee.toString(),
    });
    const recvAmountLowerBound = expectedFulfillFee.mul(100 - relayerFeeLowerBound).div(100);

    if (BigNumber.from(amount).sub(input.relayerFee).lt(recvAmountLowerBound)) {
      throw new NotEnoughRelayerFee(invariantData.sendingChainId, {
        methodContext,
        requestContext,
        relayerFee: input.relayerFee,
        recvAmountLowerBound: recvAmountLowerBound.toString(),
        invariantData,
        input,
      });
    }
  }

  const routerRelayerFeeAsset = "0x";
  const routerRelayerFee = "0";
  const receipt = await contractWriter.fulfill(
    invariantData.sendingChainId,
    {
      txData: { ...invariantData, amount, expiry, preparedBlockNumber },
      signature: signature,
      relayerFee: relayerFee,
      callData: callData,
    },
    routerRelayerFeeAsset,
    routerRelayerFee,
    requestContext,
  );
  logger.info("Method complete", requestContext, methodContext, { transactionHash: receipt.transactionHash });
  return receipt;
};
