import {
  CallParams,
  ExecuteArgs,
  Bid,
  createLoggingContext,
  CrossChainTx,
  CrossChainTxSchema,
  formatUrl,
  ajv,
} from "@connext/nxtp-utils";

import axios, { AxiosResponse } from "axios";

import { SequencerResponseInvalid, ParamsInvalid } from "../errors";
import { getHelpers } from "../helpers";
import { getContext } from "../../router";

// fee percentage paid to relayer. need to be updated later
export const RELAYER_FEE_PERCENTAGE = "1"; //  1%

/**
 * Router creates a new bid and sends it to auctioneer.
 * should be subsribed to NewPreparedTransaction channel of redis.
 *
 * @param params - The prepared crosschain tranaction
 */
export const execute = async (params: CrossChainTx): Promise<void> => {
  const { requestContext, methodContext } = createLoggingContext(execute.name);

  const {
    logger,
    adapters: { wallet },
    routerAddress,
  } = getContext();
  const {
    execute: { sanityCheck },
    shared: { getDestinationLocalAsset, signHandleRelayerFeePayload },
  } = getHelpers();

  logger.info("Method start", requestContext, methodContext, { params });

  // Validate Input schema
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
  const { originDomain, destinationDomain, transferId, to, xcalledLocalAsset, xcalledLocalAmount, callTo, callData } =
    params;
  // generate bid params
  const callParams: CallParams = {
    to,
    callData,
    originDomain,
    destinationDomain,
  };

  // TODO:  get local Asset from onChain call and later switch to subgraph
  const executeLocalAsset = await getDestinationLocalAsset(originDomain, xcalledLocalAsset, destinationDomain);

  let receivingAmount = xcalledLocalAmount;

  // signature must be updated with @connext/nxtp-utils signature functions
  const signature = await signHandleRelayerFeePayload(transferId, RELAYER_FEE_PERCENTAGE, wallet);
  const executeArguments: ExecuteArgs = {
    params: callParams,
    local: executeLocalAsset ?? "0x80dA4efc379E9ab45D2032F9EDf4D4aBc4EF2f9d",
    router: routerAddress,
    feePercentage: RELAYER_FEE_PERCENTAGE,
    amount: receivingAmount,
    index: 0,
    transferId,
    proof: [],
    relayerSignature: signature,
  };

  const bid: Bid = {
    transferId,
    data: executeArguments,
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
