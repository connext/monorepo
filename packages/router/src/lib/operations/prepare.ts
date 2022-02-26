import {
  CallParams,
  FulfillArgs,
  Bid,
  SignedBid,
  createLoggingContext,
  CrossChainTx,
  getChainIdFromDomain,
} from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { getContext } from "../../router";
import { NotEnoughAmount, NotEnoughLiquidity } from "../errors/prepare";
import { getReceiverAmount } from "../helpers";
import { getDestinationLocalAsset, sanitationCheck } from "../helpers/shared";

// fee percentage paid to relayer. need to be updated later
const RelayerFeePercentage = "1"; //  1%

/**
 * Router creates a new bid and sends it to auctioneer.
 * should be subsribed to NewPreparedTransaction channel of redis.
 *
 * @param pendingTx The prepared crosschain tranaction
 */
export const prepare = async (pendingTx: CrossChainTx) => {
  const { requestContext, methodContext } = createLoggingContext(prepare.name);
  const {
    logger,
    config,
    adapters: { auctioneer, subgraph, txservice },
    chainData,
    routerAddress,
  } = getContext();
  logger.info("Method start", requestContext, methodContext, pendingTx);

  /// sanitation check before validiation
  await sanitationCheck(pendingTx, "prepare");

  /// validate CallParam schema

  ///  validate Prepare Input schema

  ///  validate the prepare data

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
  const thresholdPct = Number(config.maxSlippage.toString().split(".")[0]);
  const highThreshold = BigNumber.from(prepareTransactingAmount)
    .mul(100 + thresholdPct)
    .div(100);
  const lowThreshold = BigNumber.from(prepareTransactingAmount)
    .mul(100 - thresholdPct)
    .div(100);

  const sendingChainId = getChainIdFromDomain(originDomain);
  const receivingChainId = getChainIdFromDomain(destinationDomain);
  const localInputDecimals = await txservice.getDecimalsForAsset(sendingChainId, prepareLocalAsset);
  const fulfillLocalAsset = await getDestinationLocalAsset(originDomain, prepareLocalAsset, destinationDomain);
  const localOutputDecimals = await txservice.getDecimalsForAsset(receivingChainId, fulfillLocalAsset);

  let { receivingAmount: receiverAmount } = await getReceiverAmount(
    prepareLocalAmount,
    localInputDecimals,
    localOutputDecimals,
  );
  const amountReceivedInBigNum = BigNumber.from(receiverAmount);
  const gasFeeInFulfillLocalAsset = await txservice.calculateGasFeeInReceivingToken(
    sendingChainId,
    prepareLocalAsset,
    receivingChainId,
    fulfillLocalAsset,
    localOutputDecimals,
    chainData,
    requestContext,
  );

  receiverAmount = amountReceivedInBigNum.sub(gasFeeInFulfillLocalAsset).toString();
  const routerBalance = await subgraph.getAssetBalance(receivingChainId, routerAddress, fulfillLocalAsset);
  if (routerBalance.lt(receiverAmount)) {
    // TODO: need to double check balance on chain. MUST BE IMPLEMENTED

    throw new NotEnoughLiquidity(
      receivingChainId,
      fulfillLocalAsset,
      routerBalance.toString(),
      receiverAmount.toString(),
      { methodContext, requestContext },
    );
  }

  // make sure amount is sensible
  if (BigNumber.from(receiverAmount).lt(0)) {
    throw new NotEnoughAmount({
      receiverAmount,
      prepareTransactingAmount: prepareTransactingAmount.toString(),
      prepareLocalAmount: prepareLocalAmount.toString(),
      transactionId,
      methodContext,
      requestContext,
    });
  }

  // TODO: should check maxSlippage here

  // generate bid params
  const callParams: CallParams = {
    recipient,
    callTo,
    callData,
    originDomain,
    destinationDomain,
  };

  // signature must be updated with @connext/nxtp-utils signature functions
  const signature = "0x";
  const fulfillArguments: FulfillArgs = {
    params: callParams,
    local: fulfillLocalAsset,
    router: routerAddress,
    feePercentage: RelayerFeePercentage,
    amount: receiverAmount,
    nonce: pendingTx.nonce.toString(),
    relayerSignature: signature,
  };

  const bid: SignedBid = {
    bid: {
      transactionId,
      data: fulfillArguments,
    },
    signature,
  };
  /// send the bid to auctioneer
  await auctioneer.sendBid(bid);
};
