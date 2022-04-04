import { createLoggingContext, jsonifyError, NxtpError, SubgraphQueryMetaParams } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { getContext } from "../../router";

export const SUBGRAPH_POLL_INTERVAL = 15_000;

// Ought to be configured properly for each network; we consult the chain config below.
export const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindSubgraph = async (_pollInterval = SUBGRAPH_POLL_INTERVAL) => {
  const { config } = getContext();
  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      await pollSubgraph();
    }
  }, _pollInterval);
};

export const pollSubgraph = async () => {
  const {
    adapters: { cache, subgraph, txservice },
    logger,
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("pollSubgraph");
  try {
    const subgraphQueryMetaParams: Map<string, SubgraphQueryMetaParams> = new Map();
    for (const domain of Object.keys(config.chains)) {
      // TODO: Convert domain to chainID ??
      const latestBlockNumber = await txservice.getBlockNumber(parseInt(domain));
      const safeConfirmations = config.chains[domain].confirmations ?? DEFAULT_SAFE_CONFIRMATIONS;

      const latestNonce = await cache.transfers.getLatestNonce(domain);

      // logger.debug("Retrieved domain information for subgraph polling", undefined, undefined, {
      //   domain,
      //   latestBlockNumber,
      //   safeConfirmations,
      //   latestNonce,
      // });
      subgraphQueryMetaParams.set(domain, {
        maxXCallBlockNumber: latestBlockNumber - safeConfirmations,
        latestNonce: latestNonce + 1, // queries at >= latest nonce, so use 1 larger than whats in the cache
      });
    }

    const transactions = await subgraph.getXCalls(subgraphQueryMetaParams);
    logger.debug("Got transactions", requestContext, methodContext, {
      transactions,
    });
    await cache.transfers.storeTransfers(transactions);
  } catch (err: unknown) {
    logger.error(
      "Error getting pending txs, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }
};
