import { createLoggingContext, jsonifyError, NxtpError, OriginTransfer, XTransfer } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { AuctionExpired } from "../../lib/errors";
import { getOperations } from "../../lib/operations";
import { getContext } from "../../subscriber/subscriber";

// Ought to be configured properly for each network; we consult the chain config below.
export const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindCache = async (_pollInterval?: number) => {
  const { config, logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindCache.name);
  const pollInterval = _pollInterval ?? config.polling.cache;
  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      try {
        await pollCache();
      } catch (e: unknown) {
        logger.error("Error binding cache", requestContext, methodContext, jsonifyError(e as Error));
      }
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

  await Promise.all(
    Object.keys(config.chains).map(async (domain) => {
      if (config.chains[domain].assets.length === 0) {
        // No assets configured for this domain, so skip processing this transfer.
        return;
      }
      // Retrieve the list of all pending transfer IDs for this domain.
      const pendingTransferIds = await cache.transfers.getPending(domain);

      const pendingTransfers: OriginTransfer[] = (
        await Promise.all(
          pendingTransferIds.map(async (transferId) => {
            // Retrieve the transfer data.
            // TODO: get the transfers from the cache in a single call
            const transfer: XTransfer | undefined = await cache.transfers.getTransfer(transferId);
            if (transfer && transfer.xparams?.destinationDomain && transfer.origin) {
              return transfer as OriginTransfer;
            }
            return undefined;
          }),
        )
      )
        .flat()
        .filter(Boolean) as OriginTransfer[];

      // Check the transfer status and update if it gets executed or reconciled on the destination domain]
      const PAGE_SIZE = 100;
      const numLoops = Math.ceil(pendingTransfers.length / PAGE_SIZE);
      await Promise.all(
        Array(numLoops)
          .fill(0)
          .map(async (_, i) => {
            let _pendingTransfers = pendingTransfers.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE);
            const confirmedTransfers: XTransfer[] = await subgraph.getDestinationTransfers(_pendingTransfers);
            if (confirmedTransfers.length > 0) await cache.transfers.storeTransfers(confirmedTransfers);

            const confirmedTransferIds = confirmedTransfers.map((confirmedTransfer) => confirmedTransfer.transferId);
            _pendingTransfers = _pendingTransfers.filter(
              (transfer) => !confirmedTransferIds.includes(transfer.transferId),
            );

            if (_pendingTransfers.length > 0) {
              logger.info("Retrieved pending transfers for execution.", requestContext, methodContext, {
                originDomain: domain,
                retrieved: pendingTransferIds,
                expired: confirmedTransferIds,
                pending: _pendingTransfers.map((transfer) => transfer.transferId),
              });
            } else {
              logger.debug("No pending transfers found.", requestContext, methodContext, {
                originDomain: domain,
              });
            }

            await Promise.all(
              _pendingTransfers.map(async (transfer) => {
                if (transfer.destination) {
                  // Transfer has already been processed, so skip it. This is possible if the transfer was just retrieved asynchronously
                  // via subgraph polling in a separate thread.
                  return;
                }

                try {
                  // Call execute to process the transfer.
                  await execute(transfer);
                } catch (error: any) {
                  const type = (error as NxtpError).type;
                  const isAuctionExpired = type === AuctionExpired.name;
                  // Save the error to the cache for this transfer. If the error was not previously recorded, log it.
                  const isNewError = await cache.transfers.saveError(transfer.transferId, (error as Error).toString());
                  if (isNewError) {
                    if (isAuctionExpired) {
                      logger.debug("Auction for transfer has expired", requestContext, methodContext, {
                        domain,
                        transferId: transfer.transferId,
                      });
                    } else {
                      logger.error(
                        "Error executing transfer",
                        requestContext,
                        methodContext,
                        jsonifyError(error as Error),
                        {
                          domain,
                          transferId: transfer.transferId,
                          xcall: transfer.origin.xcall,
                        },
                      );
                    }
                  }
                }
              }),
            );
          }),
      );
    }),
  );
};
