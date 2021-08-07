import { createRequestContext, jsonifyError } from "@connext/nxtp-utils";

import { getContext } from "../../router";
import { ActiveTransaction, TransactionStatus } from "../../lib/entities";
import { fulfillSender, prepareReceiver } from "../../lib/operations";
import { cancelSender } from "../../lib/operations/cancelSender";

const LOOP_INTERVAL = 15_000;
export const getLoopInterval = () => LOOP_INTERVAL;

export const bindContractReader = async () => {
  const { contractReader } = getContext();
  setInterval(async () => {
    const transactions = await contractReader.getActiveTransactions();
    await handleActiveTransactions(transactions);
  }, getLoopInterval());
};

export const handleActiveTransactions = async (transactions: ActiveTransaction[]) => {
  const { logger } = getContext();
  return await Promise.all(
    transactions.map(async (transaction): Promise<void> => {
      if (transaction.status === TransactionStatus.SenderPrepared) {
        const requestContext = createRequestContext("ContractReader => SenderPrepared");
        try {
          logger.info({ requestContext }, "Preparing receiver");
          const receipt = await prepareReceiver(transaction, requestContext);
          logger.info({ requestContext, txHash: receipt?.transactionHash }, "Prepared receiver");
        } catch (err) {
          logger.error({ err: jsonifyError(err), requestContext }, "Error preparing receiver");
          if (err.cancellable === true) {
            logger.error({ requestContext }, "Cancellable validation error, cancelling");
            const cancelRes = await cancelSender(transaction, requestContext);
            logger.info({ requestContext, txHash: cancelRes?.transactionHash }, "Cancelled transaction");
          }
        }
      } else if ((transaction.status = TransactionStatus.ReceiverFulfilled)) {
        const requestContext = createRequestContext("ContractReader => ReceiverFulfilled");
        try {
          logger.info({ requestContext }, "Fulfilling sender");
          const receipt = await fulfillSender(transaction, requestContext);
          logger.info({ requestContext, txHash: receipt?.transactionHash }, "Fulfilled sender");
        } catch (err) {
          logger.error({ err: jsonifyError(err), requestContext }, "Error fulfilling sender");
        }
      }
    }),
  );
};
