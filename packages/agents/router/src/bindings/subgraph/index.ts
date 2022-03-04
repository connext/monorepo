import { createLoggingContext, jsonifyError, SubgraphCache } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { AppContext } from "../../context";

const SUBGRAPH_POLL_INTERVAL = 15_000;

// Must be updated properly for each network
const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindSubgraph = async (context: AppContext) => {
  const {
    adapters: { cache, subgraph, txservice },
    logger,
    config,
  } = context;
  const { requestContext, methodContext } = createLoggingContext("bindSubgraph");
  interval(async () => {
    try {
      const subgraphCache: Map<string, SubgraphCache> = new Map();
      for (const domain of Object.keys(config.chains)) {
        // TODO. txservice currently works with chainId, not domain. It needs to be updated
        const latestBlockNumber = await txservice.getBlockNumber(parseInt(domain));
        const safeConfirmations = DEFAULT_SAFE_CONFIRMATIONS;
        const latestNonce = await cache.transactions.getLatestNonce(domain);
        console.log({ domain, latestBlockNumber, safeConfirmations, latestNonce });
        subgraphCache.set(domain, {
          currentBlock: latestBlockNumber,
          safeConfirmation: safeConfirmations,
          latestNonce,
        });
      }

      const transactions = await subgraph.getTransactionsWithStatuses(subgraphCache);
      logger.debug("Got transactions", requestContext, methodContext, {
        transactions,
      });
      await cache.transactions.storeTxData(transactions);
    } catch (err: any) {
      logger.error("Error getting pending txs, waiting for next loop", requestContext, methodContext, err);
    }
  }, SUBGRAPH_POLL_INTERVAL);
};
