import { createRequestContext, jsonifyError } from "@connext/nxtp-utils";

import { getContext } from "../..";
import { TransactionStatus } from "../../lib/entities";
import { prepareReceiver } from "../../lib/operations";

const LOOP_INTERVAL = 15_000;

export const bindContractReader = async () => {
  const { contractReader, logger } = getContext();
  setInterval(async () => {
    const requestContext = createRequestContext("ContractReader");
    const transactions = await contractReader.getActiveTransactions();
    transactions.forEach((transaction) => {
      if (transaction.status === TransactionStatus.SenderPrepared) {
        try {
          prepareReceiver(transaction, requestContext);
        } catch (err) {
          logger.error({ err: jsonifyError(err), requestContext }, "Error preparing receiver");
        }
      }
    });
  }, LOOP_INTERVAL);
};
