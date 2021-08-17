import { getUuid, InvariantTransactionData, RequestContext } from "@connext/nxtp-utils";
import { BigNumber, providers } from "ethers/lib/ethers";

import { getContext } from "../../router";
import { PrepareInput } from "../entities";
import { AuctionSignerInvalid, ExpiryInvalid, NotEnoughLiquidity, SenderChainDataInvalid } from "../errors";
import {
  decodeAuctionBid,
  getReceiverAmount,
  getReceiverExpiryBuffer,
  recoverAuctionBid,
  validExpiryBuffer,
} from "../helpers";

export const receiverPreparing: Map<string, boolean> = new Map();

export const prepare = async (
  invariantData: InvariantTransactionData,
  input: PrepareInput,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt | undefined> => {
  const method = "prepare";
  const methodId = getUuid();

  const { logger, wallet, contractWriter, contractReader, txService } = getContext();
  logger.info({ method, methodId, invariantData, input, requestContext }, "Method start");

  const { encryptedCallData, encodedBid, bidSignature, senderAmount, senderExpiry } = input;

  // Validate the prepare data
  const bid = decodeAuctionBid(encodedBid);
  logger.info({ method, methodId, requestContext, bid }, "Decoded bid from event");

  const recovered = recoverAuctionBid(bid, bidSignature);
  if (recovered !== wallet.address) {
    // cancellable error
    throw new AuctionSignerInvalid(wallet.address, recovered, { method, methodId, requestContext });
  }

  if (!BigNumber.from(bid.amount).eq(senderAmount) || bid.transactionId !== invariantData.transactionId) {
    // cancellable error
    throw new SenderChainDataInvalid({ method, methodId, requestContext });
  }

  const inputDecimals = await txService.getDecimalsForAsset(invariantData.sendingChainId, invariantData.sendingAssetId);

  const outputDecimals = await txService.getDecimalsForAsset(
    invariantData.receivingChainId,
    invariantData.receivingAssetId,
  );

  const receiverAmount = getReceiverAmount(senderAmount, inputDecimals, outputDecimals);

  const routerBalance = await contractReader.getAssetBalance(
    invariantData.receivingAssetId,
    invariantData.receivingChainId,
  );
  if (routerBalance.lt(receiverAmount)) {
    // cancellable error
    throw new NotEnoughLiquidity(invariantData.receivingChainId, { method, methodId, requestContext });
  }

  // Handle the expiries.
  // Some notes on expiries -- each participant should be using the latest
  // block timestamp as the baseline for evaluating the expiries rather than
  // the Date.now() to avoid local clock errors. The block.timestamp should
  // be evaluated against the chain they are preparing on (i.e. user refs
  // sending chain and router refs receiving chain).

  // Get current block times
  const currentBlockTimeReceivingChain = await txService.getBlockTime(invariantData.receivingChainId);
  const currentBlockTimeSendingChain = await txService.getBlockTime(invariantData.sendingChainId);

  // Get buffers
  const senderBuffer = senderExpiry - currentBlockTimeSendingChain;
  const receiverBuffer = getReceiverExpiryBuffer(senderBuffer);

  // Calculate receiver expiry
  const receiverExpiry = receiverBuffer + currentBlockTimeReceivingChain;

  if (!validExpiryBuffer(receiverBuffer)) {
    // cancellable error
    throw new ExpiryInvalid(receiverExpiry, {
      method,
      methodId,
      requestContext,
      senderExpiry,
      senderBuffer,
      receiverBuffer,
    });
  }

  logger.info({ method, methodId, requestContext }, "Validated input");

  if (receiverPreparing.get(invariantData.transactionId)) {
    logger.info({ methodId, method, requestContext, transactionId: invariantData.transactionId }, "Already preparing");
    return;
  }
  receiverPreparing.set(invariantData.transactionId, true);

  logger.info(
    { method, methodId, requestContext, transactionId: invariantData.transactionId },
    "Sending receiver prepare tx",
  );
  try {
    const receipt = await contractWriter.prepare(
      invariantData.receivingChainId,
      {
        txData: invariantData,
        amount: receiverAmount,
        expiry: receiverExpiry,
        bidSignature,
        encodedBid,
        encryptedCallData,
      },
      requestContext,
    );
    logger.info({ method, methodId, transactionId: invariantData.transactionId }, "Sent receiver prepare tx");
    return receipt;
  } finally {
    receiverPreparing.delete(invariantData.transactionId);
  }
};
