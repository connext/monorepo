import {
  CallParams,
  ExecuteArgs,
  Bid,
  createLoggingContext,
  XTransfer,
  formatUrl,
  jsonifyError,
  RequestContext,
} from "@connext/nxtp-utils";
import axios, { AxiosResponse } from "axios";

import { SequencerResponseInvalid, SanityCheckFailed } from "../errors";
import { getHelpers } from "../helpers";
import { getContext } from "../../router";

// fee percentage paid to relayer. need to be updated later
export const RELAYER_FEE_PERCENTAGE = "1"; //  1%

/**
 * Router creates a new bid and sends it to auctioneer.
 * should be subsribed to NewXCall channel of redis.
 *
 * @param params - The crosschain xcall params.
 */
export const execute = async (params: XTransfer): Promise<void> => {
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
  // const validateInput = ajv.compile(XTransferSchema);
  // const validInput = validateInput(params);
  // if (!validInput) {
  //   const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
  //   throw new ParamsInvalid({
  //     paramsError: msg,
  //     params,
  //   });
  // }

  /// create a bid
  const { originDomain, destinationDomain, transferId, to, xcall, callData, nonce } = params;
  // generate bid params
  const callParams: CallParams = {
    to,
    callData,
    originDomain,
    destinationDomain,
  };

  // TODO:  get local Asset from onChain call and later switch to subgraph
  const executeLocalAsset = await getDestinationLocalAsset(originDomain, xcall.localAsset, destinationDomain);

  const receivingAmount = xcall.localAmount;

  // signature must be updated with @connext/nxtp-utils signature functions
  const signature = await signHandleRelayerFeePayload(transferId, RELAYER_FEE_PERCENTAGE, wallet);
  const executeArguments: ExecuteArgs = {
    params: callParams,
    local: executeLocalAsset,
    router: routerAddress,
    amount: receivingAmount,
    nonce: Number(nonce),
    feePercentage: RELAYER_FEE_PERCENTAGE,
    relayerSignature: signature,
    originSender: xcall.caller,
  };

  const bid: Bid = {
    transferId,
    data: executeArguments,
  };

  logger.info("Bid created", requestContext, methodContext, { bid, signature, executeArguments });

  try {
    // sanity check
    await sanityCheck(bid, requestContext);
  } catch (e: unknown) {
    throw new SanityCheckFailed({
      error: jsonifyError(e as Error),
      bid,
    });
  }

  logger.info("Sending bid to sequencer", requestContext, methodContext, { bid, executeArguments });
  const data = await sendBid(bid, requestContext);
  logger.info("Sent bid to sequencer", requestContext, methodContext, { data });
};

export const sendBid = async (bid: Bid, requestContext: RequestContext): Promise<any> => {
  const { methodContext } = createLoggingContext(sendBid.name, requestContext);
  const { logger, config } = getContext();

  /// TODO don't send the signature in logs, edit bid during logging
  logger.info("Method start", requestContext, methodContext, { bid });

  const response: AxiosResponse<string> = await axios.post(formatUrl(config.sequencerUrl, "bid"), {
    bid,
  });

  if (!response || !response.data) {
    throw new SequencerResponseInvalid({ response });
  } else {
    return response.data;
  }
};
