import {
  createLoggingContext,
  SubgraphQueryMetaParams,
  SubgraphQueryByTimestampMetaParams,
  SubgraphQueryByTransferIDsMetaParams,
  XTransfer,
} from "@connext/nxtp-utils";

import { getContext } from "../../shared";

const getMaxNonce = (transfers: XTransfer[]): number => {
  return transfers.length == 0 ? 0 : Math.max(...transfers.map((transfer) => transfer.nonce ?? 0)) ?? 0;
};

const getMaxReconcileTimestamp = (transfers: XTransfer[]): number => {
  return transfers.length == 0
    ? 0
    : Math.max(...transfers.map((transfer) => transfer.destination?.reconcile?.timestamp ?? 0)) ?? 0;
};

export const updateTransfers = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("updateTransfers");

  const subgraphOriginQueryMetaParams: Map<string, SubgraphQueryMetaParams> = new Map();
  const subgraphDestinationQueryMetaParams: Map<string, SubgraphQueryMetaParams> = new Map();
  const subgraphOriginPendingQueryMetaParams: Map<string, SubgraphQueryByTransferIDsMetaParams> = new Map();
  const subgraphDestinationPendingQueryMetaParams: Map<string, SubgraphQueryByTransferIDsMetaParams> = new Map();
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

    // Retrieve the most recent origin transfers we've saved for this domain.
    const latestOriginNonce = await database.getCheckPoint("origin_nonce_" + domain);

    subgraphOriginQueryMetaParams.set(domain, {
      maxBlockNumber: latestBlockNumber,
      latestNonce: latestOriginNonce == 0 ? latestOriginNonce : latestOriginNonce + 1,
      orderDirection: "asc",
    });

    // Retrieve the most recent destination transfers we've saved for this domain.
    const latestDestinationNonce = await database.getCheckPoint("destination_nonce_" + domain);

    subgraphDestinationQueryMetaParams.set(domain, {
      maxBlockNumber: latestBlockNumber,
      latestNonce: latestDestinationNonce == 0 ? latestDestinationNonce : latestDestinationNonce + 1,
      orderDirection: "asc",
    });

    const reconciledTimestamp = await database.getCheckPoint("destination_reconcile_timestamp_" + domain);

    subgraphReconcileQueryMetaParams.set(domain, {
      maxBlockNumber: latestBlockNumber,
      fromTimestamp: reconciledTimestamp,
      destinationDomains: domains,
      orderDirection: "asc",
    });

    const pendingOriginTransfersIDs = await database.getTransfersWithOriginPending(domain, 100, "ASC");

    subgraphOriginPendingQueryMetaParams.set(domain, {
      maxBlockNumber: latestBlockNumber,
      transferIDs: pendingOriginTransfersIDs,
    });

    const pendingDestinationTransfersIDs = await database.getTransfersWithDestinationPending(domain, 100, "ASC");

    subgraphDestinationPendingQueryMetaParams.set(domain, {
      maxBlockNumber: latestBlockNumber,
      transferIDs: pendingDestinationTransfersIDs,
    });
  }

  if (subgraphOriginQueryMetaParams.size > 0) {
    // Get origin transfers for all domains in the mapping.
    const transfers = await subgraph.getOriginTransfersByNonce(subgraphOriginQueryMetaParams);
    logger.info("Retrieved origin transfers by nonce", requestContext, methodContext, {
      transfers,
      count: transfers.length,
    });
    await database.saveTransfers(transfers);

    for (const domain of domains) {
      const domainTransfers = transfers.filter((transfer) => transfer.originDomain === domain);
      const max = getMaxNonce(domainTransfers);
      const latest = subgraphOriginQueryMetaParams.get(domain)?.latestNonce ?? 0;
      if (domainTransfers.length > 0 && max > latest) {
        await database.saveCheckPoint("origin_nonce_" + domain, max);
      }
    }
  }

  if (subgraphDestinationQueryMetaParams.size > 0) {
    // Get destination transfers for all domains in the mapping.
    const transfers = await subgraph.getDestinationTransfersByNonce(subgraphDestinationQueryMetaParams);
    logger.info("Retrieved destination transfers by nonce", requestContext, methodContext, {
      transfers,
      count: transfers.length,
    });
    await database.saveTransfers(transfers);

    for (const domain of domains) {
      const domainTransfers = transfers.filter((transfer) => transfer.originDomain === domain);
      const max = getMaxNonce(domainTransfers);
      const latest = subgraphDestinationQueryMetaParams.get(domain)?.latestNonce ?? 0;
      if (domainTransfers.length > 0 && max > latest) {
        await database.saveCheckPoint("destination_nonce_" + domain, max);
      }
    }
  }

  if (subgraphReconcileQueryMetaParams.size > 0) {
    // Get destination transfers for all domains in the mapping.
    const transfers = await subgraph.getDestinationTransfersByReconcileTimestamp(subgraphReconcileQueryMetaParams);
    logger.info("Retrieved destination transfers by reconcile timestamp", requestContext, methodContext, {
      transfers,
      count: transfers.length,
    });
    await database.saveTransfers(transfers);

    for (const domain of domains) {
      const domainTransfers = transfers.filter((transfer) => transfer.originDomain === domain);
      const max = getMaxReconcileTimestamp(domainTransfers);
      const latest = subgraphReconcileQueryMetaParams.get(domain)?.fromTimestamp ?? 0;
      if (domainTransfers.length > 0 && max > latest) {
        await database.saveCheckPoint(
          "destination_reconcile_timestamp_" + domain,
          getMaxReconcileTimestamp(domainTransfers),
        );
      }
    }
  }

  if (subgraphOriginPendingQueryMetaParams.size > 0) {
    const transfers = await subgraph.getOriginTransfersById(subgraphOriginPendingQueryMetaParams);
    logger.info("Retrieved origin transfers by id", requestContext, methodContext, {
      transfers,
      count: transfers.length,
    });
    await database.saveTransfers(transfers);
  }

  if (subgraphDestinationPendingQueryMetaParams.size > 0) {
    const transfers = await subgraph.getDestinationTransfersById(subgraphDestinationPendingQueryMetaParams);
    logger.info("Retrieved destination transfers by id", requestContext, methodContext, {
      transfers,
      count: transfers.length,
    });
    await database.saveTransfers(transfers);
  }
};
