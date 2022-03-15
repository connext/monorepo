import {
  CallParams,
  FulfillArgs,
  Bid,
  createLoggingContext,
  CrossChainTx,
  signHandleRelayerFeePayload,
} from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { NotEnoughAmount, SlippageInvalid } from "../errors";
import { getHelpers } from "../helpers";
import { sendBid } from "./sequencer";
import { getContext } from "../../router";

// fee percentage paid to relayer. need to be updated later
const RelayerFeePercentage = "1"; //  1%

/**
 * Router creates a new bid and sends it to auctioneer.
 * should be subsribed to NewPreparedTransaction channel of redis.
 *
 * @param pendingTx - The prepared crosschain tranaction
 */
export const fulfill = async (pendingTx: CrossChainTx) => {
  const { requestContext, methodContext } = createLoggingContext(fulfill.name);

  const {
    logger,
    config,
    adapters: { wallet },
    chainData,
    routerAddress,
  } = getContext();
  const {
    fulfill: { getReceiverAmount },
    shared: {
      calculateGasFeeInReceivingToken,
      getAmountOut,
      getDecimalsForAsset,
      getDestinationLocalAsset,
      getDestinationTransactingAsset,
    },
  } = getHelpers();

  logger.info("Method start", requestContext, methodContext, { pendingTx });

  /// create a bid
  const {
    originDomain,
    destinationDomain,
    transactionId,
    recipient,
    prepareTransactingAmount,
    prepareTransactingAsset,
    prepareLocalAsset,
    prepareLocalAmount,
    callTo,
    callData,
  } = pendingTx;
  // generate bid params
  const callParams: CallParams = {
    recipient,
    callTo,
    callData,
    originDomain,
    destinationDomain,
  };

  const localInputDecimals = await getDecimalsForAsset(originDomain, prepareLocalAsset);
  const fulfillLocalAsset = await getDestinationLocalAsset(originDomain, prepareLocalAsset, destinationDomain);
  const fulfillTransactingAsset = await getDestinationTransactingAsset(
    originDomain,
    prepareTransactingAsset,
    destinationDomain,
  );
  const transactingOutputDecimals = await getDecimalsForAsset(destinationDomain, fulfillTransactingAsset);
  const localOutputDecimals = await getDecimalsForAsset(destinationDomain, fulfillLocalAsset);

  let { receivingAmount } = await getReceiverAmount(prepareLocalAmount, localInputDecimals, localOutputDecimals);
  const fulfillTransactingAmount = await getAmountOut(
    receivingAmount,
    destinationDomain,
    fulfillTransactingAsset,
    fulfillLocalAsset,
  );

  // check maxSlippage here
  const thresholdPct = Number(config.maxSlippage.toString().split(".")[0]);
  const convertedPrepareTransactingAmount = BigNumber.from(prepareTransactingAmount).div(
    BigNumber.from(10).pow(18 - transactingOutputDecimals),
  );
  const highThreshold = convertedPrepareTransactingAmount.mul(100 + thresholdPct).div(100);
  const lowThreshold = convertedPrepareTransactingAmount.mul(100 - thresholdPct).div(100);
  const convertedFulfillTxAmount = BigNumber.from(fulfillTransactingAmount).div(
    BigNumber.from(10).pow(18 - transactingOutputDecimals),
  );

  if (convertedFulfillTxAmount.gt(highThreshold) || convertedFulfillTxAmount.lt(lowThreshold)) {
    throw new SlippageInvalid({
      requestContext,
      methodContext,
      lowThreshold: lowThreshold.toString(),
      highThreshold: highThreshold.toString(),
      prepareTransactingAmount: convertedPrepareTransactingAmount.toString(),
      fulfillTransactingAmount: convertedPrepareTransactingAmount.toString(),
      pendingTx,
    });
  }

  const gasFeeInFulfillLocalAsset = await calculateGasFeeInReceivingToken(
    originDomain,
    prepareLocalAsset,
    destinationDomain,
    fulfillLocalAsset,
    localOutputDecimals,
    chainData,
    requestContext,
  );

  receivingAmount = BigNumber.from(receivingAmount).sub(gasFeeInFulfillLocalAsset).toString();

  // TODO: `getAssetBalance` is not implemented yet.
  // const routerBalance = await subgraph.getAssetBalance(parseInt(destinationDomain), routerAddress, fulfillLocalAsset);
  // if (routerBalance.lt(receiverAmount)) {
  //   // TODO: need to double check balance on chain. MUST BE IMPLEMENTED

  //   throw new NotEnoughLiquidity(
  //     parseInt(destinationDomain),
  //     fulfillLocalAsset,
  //     routerBalance.toString(),
  //     receiverAmount.toString(),
  //     { methodContext, requestContext },
  //   );
  // }

  // Make sure amount is sensible.
  if (BigNumber.from(receivingAmount).lt(0)) {
    throw new NotEnoughAmount({
      receiverAmount: receivingAmount,
      prepareTransactingAmount: prepareTransactingAmount.toString(),
      prepareLocalAmount: prepareLocalAmount.toString(),
      transactionId,
      methodContext,
      requestContext,
    });
  }

  // signature must be updated with @connext/nxtp-utils signature functions
  const signature = await signHandleRelayerFeePayload(pendingTx.nonce.toString(), RelayerFeePercentage, wallet);
  const fulfillArguments: FulfillArgs = {
    params: callParams,
    local: fulfillLocalAsset ?? "0x80dA4efc379E9ab45D2032F9EDf4D4aBc4EF2f9d",
    router: routerAddress,
    feePercentage: RelayerFeePercentage,
    amount: receivingAmount,
    nonce: pendingTx.nonce.toString(),
    relayerSignature: signature,
  };

  const bid: Bid = {
    transactionId,
    data: fulfillArguments,
  };
  /// send the bid to auctioneer
  logger.info("Sending bid to sequencer", requestContext, methodContext, { bid });
  await sendBid(bid);
};
