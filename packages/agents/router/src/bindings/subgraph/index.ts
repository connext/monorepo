import { createLoggingContext, jsonifyError, SubgraphQueryMetaParams } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { AppContext } from "../../context";

const SUBGRAPH_POLL_INTERVAL = 15_000;

// Ought to be configured properly for each network; we consult the chain config below.
const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindSubgraph = async (context: AppContext, _pollInterval = SUBGRAPH_POLL_INTERVAL) => {
  interval(async () => {
    await pollSubgraph(context);
  }, _pollInterval);
};

export const pollSubgraph = async (context: AppContext) => {
  const {
    adapters: { cache, subgraph, txservice },
    logger,
    config,
  } = context;
  const { requestContext, methodContext } = createLoggingContext("pollSubgraph");
  try {
    const subgraphQueryMetaParams: Map<string, SubgraphQueryMetaParams> = new Map();
    for (const domain of Object.keys(config.chains)) {
      const latestBlockNumber = await txservice.getBlockNumber(parseInt(domain));
      const safeConfirmations = config.chains[domain].confirmations ?? DEFAULT_SAFE_CONFIRMATIONS;
      const latestNonce = await cache.transactions.getLatestNonce(domain);
      console.log({ domain, latestBlockNumber, safeConfirmations, latestNonce });
      subgraphQueryMetaParams.set(domain, {
        maxPrepareBlockNumber: latestBlockNumber - safeConfirmations,
        latestNonce: latestNonce + 1, // queries at >= latest nonce, so use 1 larger than whats in the cache
      });
    }

    const transactions = await subgraph.getPreparedTransactions(subgraphQueryMetaParams);
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
  }
}
