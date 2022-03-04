import { createLoggingContext, jsonifyError, SubgraphQueryMetaParams } from "@connext/nxtp-utils";
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
    chainData,
  } = context;
  const { requestContext, methodContext } = createLoggingContext("bindSubgraph");
  interval(async () => {
    try {
      const subgraphQueryMetaParams: Map<string, SubgraphQueryMetaParams> = new Map();
      for (const domain of Object.keys(config.chains)) {
        const latestBlockNumber = await txservice.getBlockNumber(parseInt(domain));
        const safeConfirmations = DEFAULT_SAFE_CONFIRMATIONS;
        const latestNonce = await cache.transactions.getLatestNonce(domain);
        console.log({ domain, latestBlockNumber, safeConfirmations, latestNonce });
        subgraphQueryMetaParams.set(domain, {
          maxPrepareBlockNumber: latestBlockNumber - safeConfirmations,
          latestNonce,
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
  }, SUBGRAPH_POLL_INTERVAL);
};
