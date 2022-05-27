import { createLoggingContext, OriginTransfer, XTransferStatus, SubgraphQueryMetaParams } from "@connext/nxtp-utils";

import { getContext } from "../../backend";

export const updateTransfers = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("updateTransfers");

  const subgraphQueryMetaParams: Map<string, SubgraphQueryMetaParams> = new Map();
  const lastestBlockNumbers: Map<string, number> = await subgraph.getLatestBlockNumber(domains);

  for (const domain of domains) {
    let latestBlockNumber: number | undefined = undefined;
    if (lastestBlockNumbers.has(domain)) {
      latestBlockNumber = lastestBlockNumbers.get(domain)!;
    }

    if (!latestBlockNumber) {
      logger.error("Error getting the latestBlockNumber for domain.", requestContext, methodContext, undefined, {
        domain,
        latestBlockNumber,
        lastestBlockNumbers,
      });
      continue;
    }

    // Retrieve latest nonce from the database; will reflect the most recent origin transfers we've saved for this domain.
    const latestNonce = await database.getLatestNonce(domain);

    subgraphQueryMetaParams.set(domain, {
      maxBlockNumber: latestBlockNumber,
      latestNonce,
      destinationDomains: domains,
    });
  }

  if (subgraphQueryMetaParams.size > 0) {
    // Get origin transfers for all domains in the mapping.
    const transfers = await subgraph.getOriginTransfers(subgraphQueryMetaParams);
    logger.info("Retrieved origin transfers", requestContext, methodContext, {
      transfers,
    });
    await database.saveTransfers(transfers);
  }

  const PAGE_SIZE = 25;
  let page = 0;
  let done = false;
  while (!done) {
    // now query pending transfers to see if any status updates happened
    let xcalledTransfers = await database.getTransfersByStatus(
      XTransferStatus.XCalled,
      PAGE_SIZE,
      PAGE_SIZE * page,
      "ASC",
    );
    let executedTransfers = await database.getTransfersByStatus(
      XTransferStatus.Executed,
      PAGE_SIZE,
      PAGE_SIZE * page,
      "ASC",
    );
    let reconciledTransfers = await database.getTransfersByStatus(
      XTransferStatus.Reconciled,
      PAGE_SIZE,
      PAGE_SIZE * page,
      "ASC",
    );

    logger.debug("Got pending", requestContext, methodContext, {
      xcalledTransfers: xcalledTransfers.map((transfer) => transfer.transferId),
      executedTransfers: executedTransfers.map((transfer) => transfer.transferId),
      reconciledTransfers: reconciledTransfers.map((transfer) => transfer.transferId),
    });

    const destinationTransfers = await subgraph.getDestinationTransfers(
      xcalledTransfers.concat(executedTransfers).concat(reconciledTransfers) as OriginTransfer[],
    );
    logger.debug("Got destination transfers for pending", requestContext, methodContext, {
      destinationTransfers: destinationTransfers.map((transfer) => {
        return { transferId: transfer.transferId, status: transfer.destination?.status };
      }),
    });
    await database.saveTransfers(destinationTransfers);
    page += 1;

    if (xcalledTransfers.concat(executedTransfers).concat(reconciledTransfers).length == 0) {
      done = true;
      logger.debug("Processed all pending transfers. Last page", requestContext, methodContext, { page });
    }
    xcalledTransfers = [];
    executedTransfers = [];
    reconciledTransfers = [];
    logger.debug("Processed pending transfers for page", requestContext, methodContext, { page });
  }
};
