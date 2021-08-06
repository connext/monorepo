import { createRequestContext, jsonifyError } from "@connext/nxtp-utils";

import { getContext } from "../..";
import { TransactionStatus } from "../../lib/entities";
import { fulfillSender, prepareReceiver } from "../../lib/operations";

const LOOP_INTERVAL = 15_000;

export const bindContractReader = async () => {
  const { contractReader, logger } = getContext();
  setInterval(async () => {
    const requestContext = createRequestContext("ContractReader");
    const transactions = await contractReader.getActiveTransactions();
    transactions.forEach(async (transaction) => {
      if (transaction.status === TransactionStatus.SenderPrepared) {
        try {
          logger.info({ requestContext }, "Preparing receiver");
          const receipt = await prepareReceiver(transaction, requestContext);
          logger.info({ requestContext, txHash: receipt?.transactionHash }, "Prepared receiver");
        } catch (err) {
          logger.error({ err: jsonifyError(err), requestContext }, "Error preparing receiver");
        }
      } else if ((transaction.status = TransactionStatus.ReceiverFulfilled)) {
        try {
          logger.info({ requestContext }, "Fulfilling sender");
          const receipt = await fulfillSender(transaction, requestContext);
          logger.info({ requestContext, txHash: receipt?.transactionHash }, "Prepared receiver");
        } catch (err) {
          logger.error({ err: jsonifyError(err), requestContext }, "Error fulfilling sender");
        }
      }
    });
  }, LOOP_INTERVAL);
};
