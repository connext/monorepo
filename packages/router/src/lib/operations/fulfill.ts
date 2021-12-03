import {
  ajv,
  createLoggingContext,
  InvariantTransactionData,
  InvariantTransactionDataSchema,
  RequestContext,
} from "@connext/nxtp-utils";
import { providers, BigNumber, constants, utils } from "ethers";

import { getContext } from "../../router";
import { FulfillInput, FulfillInputSchema } from "../entities";
import { NoChainConfig, ParamsInvalid, NotEnoughRelayerFee } from "../errors";
import { NotAllowedFulfillRelay } from "../errors/fulfill";
import { calculateGasFeeInReceivingTokenForFulfill } from "../helpers/shared";

const { AddressZero } = constants;
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

  const { signature, callData, relayerFee, amount, expiry, side, preparedBlockNumber } = input;

  const fulfillChain = side === "sender" ? invariantData.sendingChainId : invariantData.receivingChainId;

  let routerRelayerFeeAsset = AddressZero;
  let routerRelayerFee = BigNumber.from("0");

  if (!config.chainConfig[fulfillChain]) {
    throw new NoChainConfig(fulfillChain, { methodContext, requestContext, invariantData, input });
  }

  // Only check for relayer fee at receiving side
  if (fulfillChain === invariantData.receivingChainId) {
    const relayerFeeLowerBound = config.chainConfig[fulfillChain].relayerFeeThreshold;
    const allowFulfillRelay = config.chainConfig[fulfillChain].allowFulfillRelay;
    if (!allowFulfillRelay) {
      throw new NotAllowedFulfillRelay(fulfillChain, {
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

    if (isRouterContract) {
      routerRelayerFeeAsset = utils.getAddress(
        config.chainConfig[invariantData.receivingChainId].routerContractRelayerAsset || AddressZero,
      );
      const relayerFeeAssetDecimal = await txService.getDecimalsForAsset(
        invariantData.receivingChainId,
        invariantData.receivingAssetId,
      );
      routerRelayerFee = await txService.calculateGasFee(
        invariantData.receivingChainId,
        routerRelayerFeeAsset,
        relayerFeeAssetDecimal,
        "fulfill",
        requestContext,
        methodContext,
        "receiving",
      );
    }

    const recvAmountLowerBound = expectedFulfillFee.mul(100 - relayerFeeLowerBound).div(100);

    if (BigNumber.from(amount).sub(input.relayerFee).lt(recvAmountLowerBound)) {
      throw new NotEnoughRelayerFee(fulfillChain, {
        methodContext,
        requestContext,
        relayerFee: input.relayerFee,
        recvAmountLowerBound: recvAmountLowerBound.toString(),
        invariantData,
        input,
      });
    }
  }

  const receipt = await contractWriter.fulfill(
    fulfillChain,
    {
      txData: { ...invariantData, amount, expiry, preparedBlockNumber },
      signature: signature,
      relayerFee: relayerFee,
      callData: callData,
    },
    routerRelayerFeeAsset,
    routerRelayerFee.toString(),
    requestContext,
  );
  logger.info("Method complete", requestContext, methodContext, { transactionHash: receipt.transactionHash });
  return receipt;
};
