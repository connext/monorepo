import {
  CallParams,
  FulfillArgs,
  SignedBid,
  createLoggingContext,
  CrossChainTx,
  getChainIdFromDomain,
  signHandleRelayerFeePayload,
} from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { getContext } from "../../router";
import { NotEnoughAmount, NotEnoughLiquidity, SenderChainDataInvalid } from "../errors";
import { SlippageInvalid } from "../errors/fulfill";
import { getReceiverAmount } from "../helpers";
import {
  getAmountOut,
  getDestinationLocalAsset,
  getDestinationTransactingAsset,
  sanitationCheck,
} from "../helpers/shared";

// fee percentage paid to relayer. need to be updated later
const RelayerFeePercentage = "1"; //  1%

/**
 * Router creates a new bid and sends it to auctioneer.
 * should be subsribed to NewPreparedTransaction channel of redis.
 *
 * @param pendingTx The prepared crosschain tranaction
 */
export const fulfill = async (pendingTx: CrossChainTx) => {
  const { requestContext, methodContext } = createLoggingContext(fulfill.name);
  const {
    logger,
    config,
    adapters: { sequencer, subgraph, txservice, wallet },
    chainData,
    routerAddress,
  } = getContext();
  logger.info("Method start", requestContext, methodContext, pendingTx);

  /// sanitation check before validiation
  await sanitationCheck(pendingTx, "fulfill");

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

  const sendingChainId = getChainIdFromDomain(originDomain);
  const receivingChainId = getChainIdFromDomain(destinationDomain);
  const trascitingInputDecimals = await txservice.getDecimalsForAsset(sendingChainId, prepareTransactingAsset);
  const localInputDecimals = await txservice.getDecimalsForAsset(sendingChainId, prepareLocalAsset);
  const fulfillLocalAsset = await getDestinationLocalAsset(originDomain, prepareLocalAsset, destinationDomain);
  const fulfillTransactingAsset = await getDestinationTransactingAsset(
    originDomain,
    prepareTransactingAsset,
    destinationDomain,
  );
  const transactingOutputDecimals = await txservice.getDecimalsForAsset(receivingChainId, fulfillTransactingAsset);
  const localOutputDecimals = await txservice.getDecimalsForAsset(receivingChainId, fulfillLocalAsset);

  let { receivingAmount: receiverAmount } = await getReceiverAmount(
    prepareLocalAmount,
    localInputDecimals,
    localOutputDecimals,
  );
  const fulfillTransactingAmount = await getAmountOut(
    receiverAmount,
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

  // signature must be updated with @connext/nxtp-utils signature functions
  const signature = await signHandleRelayerFeePayload(pendingTx.nonce.toString(), RelayerFeePercentage, wallet);
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
  await sequencer.sendBid(bid);
};
