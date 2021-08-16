import { createRequestContext, jsonifyError } from "@connext/nxtp-utils";

import { getContext } from "../../router";
import { ActiveTransaction, CrosschainTransactionStatus, FulfillPayload, PreparePayload } from "../../lib/entities";
import { fulfill, prepare, cancel } from "../../lib/operations";

const LOOP_INTERVAL = 15_000;
export const getLoopInterval = () => LOOP_INTERVAL;

export const bindContractReader = async (supportedChains: number[]) => {
  const { contractReader, logger } = getContext();
  setInterval(async () => {
    const transactions = (await contractReader.getActiveTransactions())
      .filter(
        (t: ActiveTransaction<any>) => {
          if (!supportedChains.includes(t.crosschainTx.invariant.sendingChainId)) {
            logger.warn(
              {
                transaction: t,
              }, "Ignoring transaction whose chain is not supported by this router."
            );
            return false;
          }
          return true;
        }
      );
    await handleActiveTransactions(transactions);
  }, getLoopInterval());
};

export const handleActiveTransactions = async (transactions: ActiveTransaction<any>[]) => {
  const { logger } = getContext();
  return await Promise.all(
    transactions.map(async (transaction): Promise<void> => {
      if (transaction.status === CrosschainTransactionStatus.SenderPrepared) {
        const preparePayload: PreparePayload = transaction.payload;
        const requestContext = createRequestContext("ContractReader => SenderPrepared");
        try {
          logger.info({ requestContext }, "Preparing receiver");
          const receipt = await prepare(
            transaction.crosschainTx.invariant,
            {
              senderExpiry: transaction.crosschainTx.sending.expiry,
              senderAmount: transaction.crosschainTx.sending.amount,
              bidSignature: preparePayload.bidSignature,
              encodedBid: preparePayload.encodedBid,
              encryptedCallData: preparePayload.encryptedCallData,
            },
            requestContext,
          );
          logger.info({ requestContext, txHash: receipt?.transactionHash }, "Prepared receiver");
        } catch (err) {
          logger.error({ err: jsonifyError(err), requestContext }, "Error preparing receiver");
          if (err.cancellable === true) {
            logger.error({ requestContext }, "Cancellable validation error, cancelling");
            const cancelRes = await cancel(
              transaction.crosschainTx.invariant,
              {
                amount: transaction.crosschainTx.sending.amount,
                expiry: transaction.crosschainTx.sending.expiry,
                preparedBlockNumber: transaction.crosschainTx.sending.preparedBlockNumber,
                side: "sender",
              },
              requestContext,
            );
            logger.info({ requestContext, txHash: cancelRes?.transactionHash }, "Cancelled transaction");
          }
        }
      } else if (transaction.status === CrosschainTransactionStatus.ReceiverFulfilled) {
        const fulfillPayload: FulfillPayload = transaction.payload;
        const requestContext = createRequestContext("ContractReader => ReceiverFulfilled");
        try {
          logger.info({ requestContext }, "Fulfilling sender");
          const receipt = await fulfill(
            transaction.crosschainTx.invariant,
            {
              amount: transaction.crosschainTx.sending.amount,
              expiry: transaction.crosschainTx.sending.expiry,
              preparedBlockNumber: transaction.crosschainTx.sending.preparedBlockNumber,
              signature: fulfillPayload.signature,
              callData: fulfillPayload.callData,
              relayerFee: fulfillPayload.relayerFee,
              side: "sender",
            },
            requestContext,
          );
          logger.info({ requestContext, txHash: receipt?.transactionHash }, "Fulfilled sender");
        } catch (err) {
          logger.error({ err: jsonifyError(err), requestContext }, "Error fulfilling sender");
        }
      } else if (transaction.status === CrosschainTransactionStatus.ReceiverExpired) {
        const requestContext = createRequestContext("ContractReader => ReceiverExpired");
        try {
          logger.info({ requestContext }, "Cancelling expired receiver");
          const receipt = await cancel(
            transaction.crosschainTx.invariant,
            {
              amount: transaction.crosschainTx.receiving!.amount,
              expiry: transaction.crosschainTx.receiving!.expiry,
              preparedBlockNumber: transaction.crosschainTx.receiving!.preparedBlockNumber,
              side: "receiver",
            },
            requestContext,
          );
          logger.info({ requestContext, txHash: receipt?.transactionHash }, "Cancelled receiver");
        } catch (err) {
          logger.error({ err: jsonifyError(err), requestContext }, "Error cancelling receiver");
        }
      }
    }),
  );
};
