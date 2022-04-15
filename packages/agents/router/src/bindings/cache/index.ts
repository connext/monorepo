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
    logger.debug("Got pending transfers", requestContext, methodContext, { domain, pending });

    // TODO make this logic work to update
    // const toUpdate: XTransfer[] = [];
    for (const transferId of pending) {
      // Retrieve the transfer data.
      const transfer: XTransfer | undefined = await cache.transfers.getTransfer(transferId);
      if (!transfer) {
        // Sanity check: transfer should exist. This shouldn't happen unless the cache was manipulated outside of
        // the context of this application.
        logger.warn(
          "Error retrieving pending transfer from cache : transfer not found!",
          requestContext,
          methodContext,
          {
            domain,
            transferId,
          },
        );
        continue;
      } else if (!transfer.xcall) {
        // Sanity check: this transfer should never have been labeled as pending.
        logger.warn(
          "Error retrieving pending transfer from cache : XCall not defined!",
          requestContext,
          methodContext,
          {
            domain,
            transfer,
          },
        );
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
        logger.error(
          "Error executing transaction, marking as failed",
          requestContext,
          methodContext,
          jsonifyError(err as Error),
          {
            transferId,
            xcall: transfer.xcall,
          },
        );
        // TODO: maybe we can retry some later?
        await cache.transfers.removePending(domain, transferId);
        // const _t: XTransfer = { ...transfer, status: XTransferStatus.Failed };
        // toUpdate.push(_t);
      }
      // await cache.transfers.storeTransfers(toUpdate);
    }
  }
};
