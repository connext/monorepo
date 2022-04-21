import {
  createLoggingContext,
  getSubgraphHealth,
  getSubgraphName,
  jsonifyError,
  NxtpError,
  SubgraphQueryMetaParams,
  XTransferStatus,
} from "@connext/nxtp-utils";
import interval from "interval-promise";

import { getContext } from "../../backend";

// Ought to be configured properly for each network; we consult the chain config below.
export const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindSubgraph = async (_pollInterval: number) => {
  interval(async (_) => {
    await pollSubgraph();
  }, _pollInterval);
};

export const pollSubgraph = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("pollSubgraph");
  try {
    const subgraphQueryMetaParams: Map<string, SubgraphQueryMetaParams> = new Map();
    for (const domain of Object.keys(config.chains)) {
      // TODO: Needs to implement the selection algorithm
      const healthUrls = config.chains[domain].subgraph.runtime.map((url) => {
        return { name: getSubgraphName(url.query), url: url.health };
      });
      let latestBlockNumber = 0;
      for (const healthEp of healthUrls) {
        const subgraphHealth = await getSubgraphHealth(healthEp.name, healthEp.url);
        if (subgraphHealth && subgraphHealth.synced && subgraphHealth.latestBlock > latestBlockNumber)
          latestBlockNumber = subgraphHealth.latestBlock;
      }

      if (latestBlockNumber === 0) {
        logger.error(
          `Error getting the latestBlockNumber, domain: ${domain}, healthUrls: ${healthUrls.flat()}`,
          requestContext,
          methodContext,
        );

        continue;
      }

      const latestNonce = await database.getLatestNonce(domain);

      subgraphQueryMetaParams.set(domain, {
        maxBlockNumber: latestBlockNumber,
        latestNonce: latestNonce + 1, // queries at >= latest nonce, so use 1 larger than whats in the cache
      });
    }

    if ([...subgraphQueryMetaParams.keys()].length > 0) {
      const transactions = await subgraph.getTransactionsWithStatuses(subgraphQueryMetaParams, XTransferStatus.xcalled);

      const transferIds = transactions.map((transaction) => transaction.transferId);
      logger.debug("Got transactions", requestContext, methodContext, {
        transferIds,
      });

      await database.saveTransfers(transactions);
    }

    // TODO: query pending transfers
  } catch (err: unknown) {
    logger.error(
      "Error getting pending txs, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }
};
