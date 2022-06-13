import { createLoggingContext, SubgraphQueryMetaParams, SubgraphQueryByTimestampMetaParams } from "@connext/nxtp-utils";

import { getContext } from "../../shared";

export const updateTransfers = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("updateTransfers");

  const subgraphQueryMetaParams: Map<string, SubgraphQueryMetaParams> = new Map();
  const subgraphExecuteQueryMetaParams: Map<string, SubgraphQueryByTimestampMetaParams> = new Map();
  const subgraphReconcileQueryMetaParams: Map<string, SubgraphQueryByTimestampMetaParams> = new Map();
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
    const currentNonce = await database.getLatestNonce(domain);
    const lastXCallNonce = await database.getLastXCallNonce(domain);

    subgraphQueryMetaParams.set(domain, {
      maxBlockNumber: latestBlockNumber,
      latestNonce: lastXCallNonce < currentNonce ? lastXCallNonce : currentNonce + 1,
      destinationDomains: domains,
      orderDirection: "asc",
    });

    const executedTimestamp = await database.getLatestExecuteTimestamp(domain);

    subgraphExecuteQueryMetaParams.set(domain, {
      maxBlockNumber: latestBlockNumber,
      destinationDomains: domains,
      fromTimestamp: executedTimestamp,
      orderDirection: "asc",
    });

    const reconciledTimestamp = await database.getLatestReconcileTimestamp(domain);

    subgraphReconcileQueryMetaParams.set(domain, {
      maxBlockNumber: latestBlockNumber,
      fromTimestamp: reconciledTimestamp,
      destinationDomains: domains,
      orderDirection: "asc",
    });
  }

  if (subgraphQueryMetaParams.size > 0) {
    // Get origin transfers for all domains in the mapping.
    const transfers = await subgraph.getOriginTransfers(subgraphQueryMetaParams);
    logger.info("Retrieved origin transfers", requestContext, methodContext, {
      transfers,
      count: transfers.length,
    });
    await database.saveTransfers(transfers);
  }

  if (subgraphExecuteQueryMetaParams.size > 0) {
    // Get origin transfers for all domains in the mapping.
    const transfers = await subgraph.getDestinationTransfersByExecuteTimestamp(subgraphExecuteQueryMetaParams);
    logger.info("Retrieved destination transfers by execute timestamp", requestContext, methodContext, {
      transfers,
      count: transfers.length,
    });
    await database.saveTransfers(transfers);
  }

  if (subgraphReconcileQueryMetaParams.size > 0) {
    // Get origin transfers for all domains in the mapping.
    const transfers = await subgraph.getDestinationTransfersByReconcileTimestamp(subgraphReconcileQueryMetaParams);
    logger.info("Retrieved destination transfers by reconcile timestamp", requestContext, methodContext, {
      transfers,
      count: transfers.length,
    });
    await database.saveTransfers(transfers);
  }
};
