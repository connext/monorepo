import { calculateExchangeAmount, decodeAuctionBid, getUuid, RequestContext } from "@connext/nxtp-utils";
import { BigNumber } from "ethers/lib/ethers";

import { getContext } from "..";
import { ActiveTransaction, TransactionStatus } from "../adapters/subgraph";
import { AuctionSignerInvalid, SenderChainDataInvalid } from "../errors/prepare";
import { recoverAuctionSigner } from "../handler";

export const EXPIRY_DECREMENT = 3600 * 24;
export const SWAP_RATE = "0.9995"; // 0.05% fee
export const ONE_DAY_IN_SECONDS = 3600 * 24;

/** Determine if expiry is valid */
export const validExpiry = (expiry: number) => expiry - Math.floor(Date.now() / 1000) > ONE_DAY_IN_SECONDS;

/**
 * Returns the amount * SWAP_RATE to deduct fees when going from sending -> recieving chain to incentivize routing.
 *
 * @param amount The amount of the transaction on the sending chain
 * @returns The amount, less fees as determined by the SWAP_RATE
 *
 * @remarks
 * Router fulfills on sending chain, so gets `amount`, and user fulfills on receiving chain so gets `amount * SWAP_RATE`
 */
export const mutateAmount = (amount: string) => {
  return calculateExchangeAmount(amount, SWAP_RATE);
};

/**
 * Returns the expiry - EXPIRY_DECREMENT to ensure the receiving-side transfer expires prior to the sending-side transfer.
 *
 * @param expiry The expiry of the transaction on the sending chain
 * @returns The expiry for the receiving-chain transaction (expires sooner than the sending-chain transaction)
 *
 * @remarks
 * Recieiving chain expires first to force the secret to be revealed on the receiving side before the sending side expires
 */
export const mutateExpiry = (expiry: number): number => {
  const rxExpiry = expiry - EXPIRY_DECREMENT;
  return rxExpiry;
};

const receiverPreparing: Map<string, boolean> = new Map();

export const prepareReceiver = async (
  tx: ActiveTransaction,
  requestContext: RequestContext,
): Promise<ActiveTransaction> => {
  const method = "handleSenderPrepare";
  const methodId = getUuid();

  const { logger, wallet, contractWriter } = getContext();
  logger.info({ method, methodId, tx, requestContext }, "Method start");

  const { crosschainTx, bidSignature, encodedBid, encryptedCallData } = tx;
  const txData = { ...crosschainTx.invariant, ...crosschainTx.sending };

  if (receiverPreparing.get(txData.transactionId)) {
    logger.info({ methodId, method, requestContext, transactionId: txData.transactionId }, "Already preparing");
    return tx;
  }

  // Validate the prepare data
  const bid = decodeAuctionBid(encodedBid);
  logger.info({ method, methodId, requestContext, bid }, "Decoded bid from event");

  const recovered = recoverAuctionSigner(bid, bidSignature);
  if (recovered !== wallet.address) {
    throw new AuctionSignerInvalid(wallet.address, recovered, { method, methodId, requestContext });
  }

  if (!BigNumber.from(bid.amount).eq(txData.amount) || bid.transactionId !== txData.transactionId) {
    throw new SenderChainDataInvalid({ method, methodId, requestContext });
  }

  const receiverAmount = mutateAmount(txData.amount);

  // cancellable
  const receiverExpiry = mutateExpiry(txData.expiry);
  if (!validExpiry(receiverExpiry)) {
    logger.error({ method, methodId, requestContext }, "Invalid expiry, cancelling");
    const cancelRes = await contractWriter.cancel(
      txData.sendingChainId,
      {
        relayerFee: "0",
        txData,
        signature: "0x",
      },
      requestContext,
    );
    logger.info({ method, methodId, requestContext, txHash: cancelRes.transactionHash }, "Cancelled transaction");
  }

  logger.info({ method, methodId, requestContext }, "Validated input");
  receiverPreparing.set(txData.transactionId, true);

  // Next, prepare the outbound data
  // Must have:
  // - Sending and receiving chainId
  // - Sending and receiving assetId
  // - Sender address
  // - Router address
  // - Unique transferId (TODO: do we need this? How should we create this?)
  // - Price and fee quote (TODO: either we can agree upon this upfront)
  // - Amount sent by user
  // - Recipient (callTo) and callData

  // amount and expiry need to be modified

  // Then prepare tx object
  // Note tx object must have:
  // - Prepare fn params
  // - Destination chainId
  // - Amount
  // - AssetId
  // encode the data for contract call
  // Send to txService
  logger.info({ method, methodId, requestContext, transactionId: txData.transactionId }, "Sending receiver prepare tx");
  const receipt = await contractWriter.prepare(
    txData.receivingChainId,
    {
      txData,
      amount: receiverAmount,
      expiry: receiverExpiry,
      bidSignature,
      encodedBid,
      encryptedCallData,
    },
    requestContext,
  );
  logger.info({ method, methodId, transactionId: txData.transactionId }, "Sending receiver prepare tx");

  receiverPreparing.delete(txData.transactionId);

  return {
    bidSignature,
    encryptedCallData,
    crosschainTx: {
      ...crosschainTx,
      receiving: { amount: receiverAmount, expiry: receiverExpiry, preparedBlockNumber: receipt.blockNumber },
    },
    encodedBid,
    status: TransactionStatus.ReceiverPrepared,
  };
};
