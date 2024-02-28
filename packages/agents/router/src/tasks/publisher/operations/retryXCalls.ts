import { createLoggingContext, jsonifyError, OriginTransfer, getNtpTimeSeconds, XTransfer } from "@connext/nxtp-utils";

import { MQ_EXCHANGE, XCALL_MESSAGE_TYPE, XCALL_QUEUE } from "../../../setup";
import { getContext } from "../publisher";

import { sendStatusToSequencer } from "./status";

const DEFAULT_EXECUTION_WINDOW = 4 * 60; // The average execution window is 4mins
// Shuffle the input array in place
// Algorithm: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
const shuffle = (input: string[]): string[] => {
  let index = input.length;
  while (index > 0) {
    const pos = Math.floor(Math.random() * index--);
    [input[index], input[pos]] = [input[pos], input[index]];
  }
  return input;
};

/**
 * Gets the pending xcalls from the cache and updates their statuses using subgraph.
 * Remove transfers from the cache if its status is one of both `Executed` and `Reconciled`.
 * Send transfers to the sequencer if its status is still `XCalled`.
 */
export const retryXCalls = async (): Promise<void> => {
  const {
    adapters: { cache, subgraph, mqClient },
    logger,
    config,
  } = getContext();

  const { requestContext, methodContext } = createLoggingContext("pollCache");
  const allowedDomains = Object.keys(config.chains);
  logger.info("Retrying xcalls", requestContext, methodContext, { allowedDomains });

  for (const domain of allowedDomains) {
    // Page through the pending transfers
    let offset = 0;
    const pageSize = 100;
    let done = false;
    while (!done) {
      const _pending = await cache.transfers.getPending(domain, offset, pageSize);
      const pending = shuffle(_pending);
      logger.debug(`Getting pending transfers from the cache for domain: ${domain}`, requestContext, methodContext, {
        domain,
        offset,
        pageSize,
        read: pending.length,
      });

      const originTransfersFromSubgraph: XTransfer[] = await subgraph.getOriginTransfersByDomain(domain, pending);
      const originTransfers = (
        await Promise.all(
          originTransfersFromSubgraph.flatMap(async (transfer) => {
            const cacheTransfer = await cache.transfers.getTransfer(transfer.transferId);
            if (JSON.stringify(transfer) === JSON.stringify(cacheTransfer)) {
              const bidStatus = await cache.transfers.getBidStatus(transfer.transferId);
              // Remove from pending xcalls that are not ready for retry
              if (bidStatus !== undefined) {
                const startTime = Number(bidStatus.timestamp);
                const elapsedTime = getNtpTimeSeconds() - startTime;
                // Retries every 2^n x 4min.
                const waitTime = DEFAULT_EXECUTION_WINDOW * Math.pow(2, bidStatus.attempts - 1);
                if (elapsedTime > waitTime) {
                  return transfer;
                }
                // Not yet ready for retry
                return;
              }
            } else {
              await cache.transfers.storeTransfers([transfer], false);
              // Reset bid status on change in origin transfer
              await cache.transfers.pruneBidStatusByIds([transfer.transferId]);
            }
            // Ready for retry
            return transfer;
          }),
        )
      ).filter((i) => !!i);

      const destinationTransfers = await subgraph.getDestinationTransfers(originTransfers as OriginTransfer[]);
      const transferIdsToRemove = destinationTransfers.map((i) => i.transferId);

      if (destinationTransfers.length > 0) {
        logger.debug("Removing transfers from the cache", requestContext, methodContext, {
          transferIds: transferIdsToRemove,
        });

        await cache.transfers.pruneTransfersByIds(transferIdsToRemove);
        await cache.transfers.pruneBidStatusByIds(transferIdsToRemove);
      }

      const transfersToPublish = originTransfers.filter(
        (transfer) => transferIdsToRemove.includes(transfer!.transferId) === false,
      );

      await Promise.all(
        transfersToPublish.map(async (transfer) => {
          // new request context with the transfer id
          const { requestContext: _requestContext, methodContext: _methodContext } = createLoggingContext(
            "pollSubgraph",
            undefined,
            transfer!.transferId,
          );
          try {
            await mqClient.publish<OriginTransfer>(MQ_EXCHANGE, {
              body: transfer as OriginTransfer,
              type: XCALL_MESSAGE_TYPE,
              routingKey: XCALL_QUEUE,
            });
            await cache.transfers.setBidStatus(transfer?.transferId as string);
            logger.debug("Published transfer to mq", _requestContext, _methodContext, { transfer });
          } catch (err: unknown) {
            logger.error("Error publishing to mq", _requestContext, _methodContext, jsonifyError(err as Error));
          }
        }),
      );

      if (pending.length == pageSize) offset += pageSize;
      else done = true;
    }
  }

  await sendStatusToSequencer();
};
