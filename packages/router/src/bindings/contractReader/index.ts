import { createLoggingContext, jsonifyError } from "@connext/nxtp-utils";

import { AppContext } from "../../context";

const LOOP_INTERVAL = 30_000;
export const bindContractReader = async (context: AppContext) => {
  const {
    adapters: { cache, subgraph },
    logger,
  } = context;
  const { requestContext, methodContext } = createLoggingContext("bindContractReader");
  setInterval(async () => {
    try {
      const activeTxs = await subgraph.getTransactionsWithStatuses();
      logger.debug("Getting active transactions", requestContext, methodContext, {
        activeTxIds: activeTxs.map((activeTx) => activeTx.transactionId),
      });
      await cache.storeTxData(activeTxs);
    } catch (err: any) {
      logger.error(
        "Error getting pending txs, waiting for next loop",
        requestContext,
        methodContext,
        jsonifyError(err),
      );
      return;
    }
  }, LOOP_INTERVAL);
};
