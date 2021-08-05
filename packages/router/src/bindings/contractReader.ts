import { createRequestContext, jsonifyError } from "@connext/nxtp-utils";

import { getContext } from "..";
import { TransactionStatus } from "../adapters/subgraph";
import { prepareReceiver } from "../operations/prepareReceiver";

const LOOP_INTERVAL = 15_000;

export const bindContractReader = () => {
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
