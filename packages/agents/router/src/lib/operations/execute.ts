import {
  CallParams,
  Bid,
  BidData,
  createLoggingContext,
  XTransfer,
  DEFAULT_ROUTER_FEE,
  ajv,
  XTransferSchema,
} from "@connext/nxtp-utils";

import { MissingXCall, NotEnoughAmount, ParamsInvalid } from "../errors";
import { getHelpers } from "../helpers";
import { getContext } from "../../router";

// fee percentage paid to relayer. need to be updated later
export const RELAYER_FEE_PERCENTAGE = "1"; //  1%

/**
 * Router creates a new bid and sends it to auctioneer.
 *
 * @param params - The crosschain xcall params.
 */
export const execute = async (params: XTransfer): Promise<void> => {
  const { requestContext, methodContext } = createLoggingContext(execute.name);

  const {
    logger,
    adapters: { wallet, subgraph },
    routerAddress,
  } = getContext();
  const {
    auctions: { sendBid },
    shared: { getDestinationLocalAsset, signHandleRelayerFeePayload },
  } = getHelpers();

  logger.info("Method start", requestContext, methodContext, { params });

  // Validate Input schema
  const validateInput = ajv.compile(XTransferSchema);
  const validInput = validateInput(params);
  if (!validInput) {
    const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    throw new ParamsInvalid({
      paramsError: msg,
      params,
    });
  }

  const { originDomain, destinationDomain, transferId, to, xcall, callData, nonce } = params;
  if (!xcall) {
    throw new MissingXCall({ requestContext, methodContext });
  }

  // Format the transfer's call params.
  const callParams: CallParams = {
    to,
    callData,
    originDomain,
    destinationDomain,
  };

  const executeLocalAsset = await getDestinationLocalAsset(originDomain, xcall.localAsset, destinationDomain);
  logger.debug("Got local asset", requestContext, methodContext, { executeLocalAsset });

  const receivingAmount = xcall.localAmount;

  // signature must be updated with @connext/nxtp-utils signature functions
  const signature = await signHandleRelayerFeePayload(transferId, RELAYER_FEE_PERCENTAGE, wallet);
  logger.debug("Signed payload", requestContext, methodContext, { signature });

  // TODO: Eventually, sending the bid data to the sequencer should be deprecated.
  const bidData: BidData = {
    params: callParams,
    local: executeLocalAsset,
    amount: receivingAmount,
    nonce: Number(nonce),
    feePercentage: RELAYER_FEE_PERCENTAGE,
    relayerSignature: signature,
    originSender: xcall.caller,
  };

  const fee = DEFAULT_ROUTER_FEE;
  const bid: Bid = {
    router: routerAddress,
    fee,
    // TODO: This list of signatures should reflect the auction rounds we want to bid on;
    // we should eventually calculate which rounds we can afford to bid on, and then pass those in.
    // For now, this is hardcoded to bid only on the first auction round.
    signatures: {
      "1": signature,
    },
  };

  // sanity check
  const balance = await subgraph.getAssetBalance(destinationDomain, routerAddress, executeLocalAsset);
  logger.info("Checking balance", requestContext, methodContext, { balance: balance.toString() });
  if (balance.lt(receivingAmount)) {
    throw new NotEnoughAmount({
      balance: balance.toString(),
      receivingAmount: receivingAmount.toString(),
    });
  }
  logger.info("Sanity checks passed", requestContext, methodContext, { liquidity: balance.toString() });

  await sendBid(transferId, bid, bidData, requestContext);
};
