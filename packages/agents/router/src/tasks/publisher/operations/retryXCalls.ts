import { createLoggingContext, jsonifyError, OriginTransfer } from "@connext/nxtp-utils";

import { MQ_EXCHANGE, XCALL_MESSAGE_TYPE, XCALL_QUEUE } from "../../../setup";
import { getContext } from "../publisher";

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
  logger.info("Retrying xcalls...", requestContext, methodContext, { allowedDomains });

  for (const domain of allowedDomains) {
    // Random sort transfers
    const unsorted = await cache.transfers.getPending(domain);

    const domainPending = shuffle(unsorted);
    logger.debug(`Get pending transfers on domain: ${domain}`, requestContext, methodContext, { domainPending });

    // Page through the pending transfers
    const pageSize = 100;
    for (let offset = 0; offset < domainPending.length; offset += pageSize) {
      const pending = domainPending.slice(offset, pageSize);
      const originTransfers = (
        await Promise.all(pending.flatMap((transferId) => cache.transfers.getTransfer(transferId)))
      ).filter((i) => !!i);

      const destinationTransfers = await subgraph.getDestinationTransfers(originTransfers as OriginTransfer[]);
      const transferIdsToRemove = destinationTransfers.map((i) => i.transferId);

      if (destinationTransfers.length > 0) {
        logger.debug("Removing transfers from the cache", requestContext, methodContext, {
          transferIds: transferIdsToRemove,
        });

        await cache.transfers.pruneTransfersByIds(transferIdsToRemove);
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
            logger.debug("Published transfer to mq", _requestContext, _methodContext, { transfer });
          } catch (err: unknown) {
            logger.error("Error publishing to mq", _requestContext, _methodContext, jsonifyError(err as Error));
          }
        }),
      );
    }
  }
};
