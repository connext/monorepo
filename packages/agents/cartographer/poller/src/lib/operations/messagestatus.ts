import { createLoggingContext, XTransfer, XTransferMessageStatus } from "@connext/nxtp-utils";

import { getContext } from "../../shared";

export const updateMessageStatus = async () => {
  const {
    adapters: { database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateMessageStatus.name);

  for (const domain of domains) {
    const limit = 1000;
    let end = false;
    let offset = 0;
    while (!end) {
      logger.debug("Updating message status", requestContext, methodContext, { domain, offset, limit });
      const pendingTransfersByMessageStatus = await database.getPendingTransfersByMessageStatus(domain, offset, limit);
      const updatedTransfers = await Promise.all(
        pendingTransfersByMessageStatus.map(async (transfer) => {
          const messageStatus = await getMessageStatus(transfer);
          const _transfer = transfer;
          if (_transfer.origin) _transfer.origin!.messageStatus = messageStatus;
          return _transfer;
        }),
      );

      await database.saveTransfers(updatedTransfers);
      offset += pendingTransfersByMessageStatus.length;
      if (pendingTransfersByMessageStatus.length < limit) {
        end = true;
        break;
      }
    }
    logger.debug("Updated message status for domain", requestContext, methodContext, { domain });
  }
};

export const getMessageStatus = async (transfer: XTransfer): Promise<XTransferMessageStatus> => {
  const {
    adapters: { database },
  } = getContext();
  const messageHash = transfer.origin?.messageHash;
  if (!messageHash) {
    // non-completed transfer entity on the db.
    return XTransferMessageStatus.XCalled;
  }

  const message = await database.getMessageByLeaf(transfer.xparams.originDomain, messageHash);
  if (!message) {
    // cartographer-messages might be still behind of transfers in terms of timestamp
    return XTransferMessageStatus.XCalled;
  } else if (message.destination?.processed) {
    // A message has been proven and processed
    return XTransferMessageStatus.Processed;
  }
  const rootMessageStatus = await database.getMessageRootStatusFromIndex(
    transfer.xparams.originDomain,
    message.origin.index,
  );
  console.log(rootMessageStatus, transfer.xparams.originDomain, message.transferId);
  if (rootMessageStatus.processedCount + rootMessageStatus.unprocessedCount == 0) {
    // there are 2 possible reasons
    // 1. sendOutboundRoot didn't happen on the spoke domain
    // 2. sendOutboundRoot happened but the root_messages table sync might still be in progress.
    return XTransferMessageStatus.XCalled;
  }
  // const processed = rootMessage.processed;
  if (rootMessageStatus.processedCount === 0) {
    // A root message exist. this means sendOutboundRoot task executed on the spoke domain
    // 1. A spoke root got sent to the hub domain, the root might still be getting processed by AMB/LH processFromRoot task
    // 2. A spoke root got arrived at the hub domain, the root_messages table sync might still be in progress

    return XTransferMessageStatus.SpokeRootSent;
  }

  // A message root from the spoke domain got arrived at the hub domain successfully
  if (rootMessageStatus.aggregatedCount === 0) {
    // An aggregated root doesn't exist.
    // 1. A message root arrived at the hub domain but has been neither dequeued/propagated
    // 2. The aggregateRoot got propagated on-chain but either of both subgraph and carto sync might still be in progress
    return XTransferMessageStatus.SpokeRootArrivedOnHub;
  }

  // An aggregated root has been propagated to all the spoke domains so the messageStatus is XTransferMessageStatus.AggregateRootPropagated
  // TODO: A `PropagateFailed` event isn't getting handled on the subgraph side.
  // Apparently, we should handle the `PropagateFailed` event of RootManager and exclude from the propagated roots
  let messageStatus: XTransferMessageStatus = XTransferMessageStatus.AggregateRootPropagated;
  const receivedAggregateRoot = await database.getAggregateRootByRootAndDomain(
    transfer.xparams.destinationDomain,
    rootMessageStatus.lastAggregatedRoot!,
  );

  if (receivedAggregateRoot) {
    messageStatus = XTransferMessageStatus.AggregatedRootArrivedOnSpokeDomain;
  }

  return messageStatus;
};
