import { createLoggingContext, jsonifyError, XTransfer } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { getOperations } from "../../lib/operations";

import { getContext } from "../../router";

export const CACHE_POLL_INTERVAL = 20_000;

// Ought to be configured properly for each network; we consult the chain config below.
export const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindCache = async (_pollInterval = CACHE_POLL_INTERVAL) => {
  const { config } = getContext();
  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      await pollCache();
    }
  }, _pollInterval);
};

export const pollCache = async () => {
  const {
    adapters: { cache },
    logger,
    config,
  } = getContext();
  const { execute } = getOperations();
  const { requestContext, methodContext } = createLoggingContext(pollCache.name);
  // For every domain in the chain config that we support (have liquidity for / assets listed in the config),
  // check the cache to see if there's any new transfers that we need to process.
  for (const domain of Object.keys(config.chains)) {
    if (config.chains[domain].assets.length === 0) {
      // No assets configured for this domain, so skip processing this transfer.
      continue;
    }
    // Retrieve the list of all pending transfer IDs for this domain.
    const pending = await cache.transfers.getPending(domain);
    for (const transferId of pending) {
      // Retrieve the transfer data.
      const transfer: XTransfer | undefined = await cache.transfers.getTransfer(transferId);
      if (!transfer) {
        logger.warn("Error retrieving pending transfer from cache : not found", requestContext, methodContext, {
          domain,
          transferId,
        });
        continue;
      } else if (transfer.execute?.transactionHash || transfer.reconcile?.transactionHash) {
        // Transfer has already been processed, so skip it. This is possible if the transfer was just retrieved asynchronously
        // via subgraph polling in a separate thread.
        continue;
      }
      try {
        // Call execute to process the transfer.
        await execute(transfer);
      } catch (err: unknown) {
        logger.error("Error executing transaction", requestContext, methodContext, jsonifyError(err as Error), {
          transferId,
          xcall: transfer.xcall,
        });
      }
    }
  }
};
