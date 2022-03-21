import {
  CallParams,
  FulfillArgs,
  Bid,
  createLoggingContext,
  CrossChainTx,
  CrossChainTxSchema,
  signHandleRelayerFeePayload,
  formatUrl,
  ajv,
} from "@connext/nxtp-utils";

import axios, { AxiosResponse } from "axios";

import { SequencerResponseInvalid, ParamsInvalid } from "../errors";
import { getHelpers } from "../helpers";
import { getContext } from "../../router";

// fee percentage paid to relayer. need to be updated later
const RelayerFeePercentage = "1"; //  1%

/**
 * Router creates a new bid and sends it to auctioneer.
 * should be subsribed to NewPreparedTransaction channel of redis.
 *
 * @param params - The prepared crosschain tranaction
 */
export const fulfill = async (params: CrossChainTx) => {
  const { requestContext, methodContext } = createLoggingContext(fulfill.name);

  const {
    logger,
    adapters: { wallet },
    routerAddress,
  } = getContext();
  const {
    fulfill: { sanityCheck },
    shared: { getDestinationLocalAsset },
  } = getHelpers();

  logger.info("Method start", requestContext, methodContext, { params });

  // Validate Prepare Input schema
  const validateInput = ajv.compile(CrossChainTxSchema);
  const validInput = validateInput(params);
  if (!validInput) {
    const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    throw new ParamsInvalid({
      paramsError: msg,
      params,
    });
  }

  /// create a bid
  const {
    nonce,
    originDomain,
    destinationDomain,
    transactionId,
    recipient,
    prepareLocalAsset,
    prepareLocalAmount,
    callTo,
    callData,
  } = params;
  // generate bid params
  const callParams: CallParams = {
    recipient,
    callTo,
    callData,
    originDomain,
    destinationDomain,
  };

  // TODO:  get local Asset from onChain call and later switch to subgraph
  const fulfillLocalAsset = await getDestinationLocalAsset(originDomain, prepareLocalAsset, destinationDomain);

  let receivingAmount = prepareLocalAmount;

  // signature must be updated with @connext/nxtp-utils signature functions
  const signature = await signHandleRelayerFeePayload(nonce.toString(), RelayerFeePercentage, wallet);
  const fulfillArguments: FulfillArgs = {
    params: callParams,
    local: fulfillLocalAsset ?? "0x80dA4efc379E9ab45D2032F9EDf4D4aBc4EF2f9d",
    router: routerAddress,
    feePercentage: RelayerFeePercentage,
    amount: receivingAmount,
    nonce: nonce.toString(),
    relayerSignature: signature,
  };

  const bid: Bid = {
    transactionId,
    data: fulfillArguments,
  };

  const res = await sanityCheck(bid, requestContext);

  if (res) {
    /// send the bid to auctioneer
    logger.info("Sending bid to sequencer", requestContext, methodContext, { bid });
    await sendBid(bid);
  } else {
    // sanity check failed
  }
};

export const sendBid = async (bid: Bid): Promise<any> => {
  const { requestContext, methodContext } = createLoggingContext(sendBid.name);
  const { logger, config } = getContext();

  /// TODO don't send the signature in logs, edit bid during logging
  logger.info("Method start", requestContext, methodContext, { bid });

  let response: AxiosResponse<string> = await axios.post(formatUrl(config.sequencerUrl, "bid"), {
    bid,
  });

  if (!response || !response.data) {
    throw new SequencerResponseInvalid({ response });
  } else {
    return response.data;
  }
};
