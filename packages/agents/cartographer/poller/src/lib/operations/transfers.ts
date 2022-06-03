import {
  createLoggingContext,
  OriginTransfer,
  XTransferStatus,
  SubgraphQueryMetaParams,
  SubgraphQueryByTimestampMetaParams,
} from "@connext/nxtp-utils";

import { getContext } from "../../cartographer";

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
    const latestNonce = await database.getLatestNonce(domain);

    subgraphQueryMetaParams.set(domain, {
      maxBlockNumber: latestBlockNumber,
      latestNonce,
      destinationDomains: domains,
    });

    const executedTimestamp = await database.getLatestExecuteTimestamp(domain);

    subgraphExecuteQueryMetaParams.set(domain, {
      maxBlockNumber: latestBlockNumber,
      destinationDomains: domains,
      fromTimestamp: executedTimestamp,
    });

    const reconciledTimestamp = await database.getLatestReconcileTimestamp(domain);

    subgraphReconcileQueryMetaParams.set(domain, {
      maxBlockNumber: latestBlockNumber,
      fromTimestamp: reconciledTimestamp,
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

  if (subgraphExecuteQueryMetaParams.size > 0) {
    // Get origin transfers for all domains in the mapping.
    const transfers = await subgraph.getDestinationTransfersByExecuteTimestamp(subgraphExecuteQueryMetaParams);
    logger.info("Retrieved destination transfers by execute timestamp", requestContext, methodContext, {
      transfers,
    });
    await database.saveTransfers(transfers);
  }

  if (subgraphReconcileQueryMetaParams.size > 0) {
    // Get origin transfers for all domains in the mapping.
    const transfers = await subgraph.getDestinationTransfersByReconcileTimestamp(subgraphReconcileQueryMetaParams);
    logger.info("Retrieved destination transfers by reconcile timestamp", requestContext, methodContext, {
      transfers,
    });
    await database.saveTransfers(transfers);
  }
};
