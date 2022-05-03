import { createLoggingContext, jsonifyError, NxtpError, XTransfer } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { AuctionExpired } from "../../lib/errors";
import { getOperations } from "../../lib/operations";
import { getContext } from "../../router";

// Ought to be configured properly for each network; we consult the chain config below.
export const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindCache = async (_pollInterval?: number) => {
  const { config } = getContext();
  const pollInterval = _pollInterval ?? config.polling.cache;
  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      await pollCache();
    }
  }, pollInterval);
};

export const pollCache = async () => {
  const {
    adapters: { cache, subgraph },
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
    let pending = await cache.transfers.getPending(domain);
    logger.debug("Got pending transfers", requestContext, methodContext, { domain, pending });

    const pendingTransfers: XTransfer[] = [];
    for (const transferId of pending) {
      // Retrieve the transfer data.
      const transfer: XTransfer | undefined = await cache.transfers.getTransfer(transferId);
      if (transfer) pendingTransfers.push(transfer);
    }

    // Check the transfer status and update if it gets executed or reconciled on the destination domain
    const confirmedTransfers: XTransfer[] = await subgraph.getDestinationTransfers(pendingTransfers);
    if (confirmedTransfers.length > 0) await cache.transfers.storeTransfers(confirmedTransfers);

    const confirmedTxIds = confirmedTransfers.map((confirmedTransfer) => confirmedTransfer.transferId);
    pending = pending.filter((txid) => !confirmedTxIds.includes(txid));

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
      } else if (!transfer.origin.xcall) {
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
      } else if (transfer.destination.execute?.transactionHash || transfer.destination.reconcile?.transactionHash) {
        // Transfer has already been processed, so skip it. This is possible if the transfer was just retrieved asynchronously
        // via subgraph polling in a separate thread.
        continue;
      }

      try {
        // Call execute to process the transfer.
        await execute(transfer);
      } catch (error: any) {
        const type = (error as NxtpError).type;
        const isAuctionExpired = type === AuctionExpired.name;
        // Save the error to the cache for this transfer. If the error was not previously recorded, log it.
        const isNewError = await cache.transfers.saveError(transferId, (error as Error).toString());
        if (isNewError) {
          if (isAuctionExpired) {
            logger.debug("Auction for transfer has expired", requestContext, methodContext, {
              domain,
              transferId,
            });
          } else {
            logger.error("Error executing transfer", requestContext, methodContext, jsonifyError(error as Error), {
              domain,
              transferId,
              xcall: transfer.origin.xcall,
            });
          }
        }
      }
    }
  }
};
