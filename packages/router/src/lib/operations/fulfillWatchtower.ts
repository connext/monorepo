import {
  ajv,
  createLoggingContext,
  FulfillParams,
  getBatchStatus,
  InvariantTransactionData,
  InvariantTransactionDataSchema,
  MetaTxPayloads,
  MetaTxTypes,
  RequestContext,
} from "@connext/nxtp-utils";
import { constants, utils } from "ethers";

import { getContext } from "../../router";
import { FulfillInput, FulfillInputSchema } from "../entities";
import { NoChainConfig, ParamsInvalid } from "../errors";
import { signRouterFulfillTransactionPayload, getNtpTimeSeconds, WATCHTOWER_CALL_BUFFER } from "../helpers";

const { AddressZero, Zero } = constants;

// sender fulfill to watch tower
export const fulfillWatchtower = async (
  invariantData: InvariantTransactionData,
  input: FulfillInput,
  _requestContext: RequestContext<string>,
): Promise<boolean> => {
  const { requestContext, methodContext } = createLoggingContext(fulfillWatchtower.name, _requestContext);

  const { messaging, logger, config, txService, isRouterContract, wallet, routerAddress, chainData } = getContext();
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

  // Check to make sure Watchtower can handle this fulfill before expiry.
  const currentTime = await getNtpTimeSeconds();
  const { ttl, timestamp } = await getBatchStatus(invariantData.sendingChainId);
  // Get the timestamp that the batch will or would be sent at.
  const batchSendTimestamp = (timestamp ?? currentTime) + ttl;
  // We need to be sure that the transaction won't expire while it sits in the batch. Additionally,
  // we won't risk sending the transaction to the Watchtower if it's within the safety buffer period.
  if (expiry < batchSendTimestamp - WATCHTOWER_CALL_BUFFER) {
    logger.info("Failed to delegate SenderFulfill to Watchtower: expiry too close", requestContext, methodContext, {
      input,
      expiry,
      batchCreatedTimestamp: timestamp,
      batchSendTimestamp,
      batchTTL: ttl,
      callBuffer: WATCHTOWER_CALL_BUFFER,
    });
    return false;
  }

  logger.info("Delegating SenderFulfill to Watchtower", requestContext, methodContext, { input });

  if (!config.chainConfig[invariantData.sendingChainId]) {
    throw new NoChainConfig(invariantData.sendingChainId, { methodContext, requestContext, invariantData, input });
  }

  if (isRouterContract) {
    let routerRelayerFeeAsset = AddressZero;
    let routerRelayerFee = Zero;

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
      relayerFee,
      callData,
      "0x",
      routerRelayerFeeAsset,
      routerRelayerFee.toString(),
      invariantData.sendingChainId,
      wallet,
    );

    // Request sender Fulfill request to watchtower!

    const fulfillParams: FulfillParams = {
      txData: { ...invariantData, amount, expiry, preparedBlockNumber },
      signature: fulfillSignature,
      relayerFee,
      callData,
    };

    const payload = {
      chainId: invariantData.sendingChainId,
      to: routerAddress,
      type: MetaTxTypes.RouterContractFulfill,
      data: {
        params: fulfillParams,
        signature,
        relayerFee,
        relayerFeeAsset: routerRelayerFeeAsset,
      } as MetaTxPayloads[typeof MetaTxTypes.RouterContractFulfill],
    };

    await messaging.publishWatchtowerFulfillRequest(payload);
    logger.info("Publishing Watchtower fulfill request", requestContext, methodContext, payload);

    return true;
  } else {
    return false;
  }
};
