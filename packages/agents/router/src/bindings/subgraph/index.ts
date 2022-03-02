import { createLoggingContext, jsonifyError } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { AppContext } from "../../context";

const SUBGRAPH_POLL_INTERVAL = 15_000;

export const bindSubgraph = async (context: AppContext) => {
  const {
    adapters: { cache, subgraph },
    logger,
  } = context;
  const { requestContext, methodContext } = createLoggingContext("bindSubgraph");
  interval(async () => {
    try {
      const transactions = await subgraph.getTransactionsWithStatuses();
      logger.debug("Got transactions", requestContext, methodContext, {
        transactions,
      });
      await cache.transactions.storeTxData(transactions);
    } catch (err: any) {
      logger.error(
        "Error getting pending txs, waiting for next loop",
        requestContext,
        methodContext,
        jsonifyError(err),
      );
      return;
    }
  }, SUBGRAPH_POLL_INTERVAL);
};
