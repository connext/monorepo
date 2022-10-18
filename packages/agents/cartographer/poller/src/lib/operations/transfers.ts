import {
  createLoggingContext,
  SubgraphQueryMetaParams,
  SubgraphQueryByTimestampMetaParams,
  SubgraphQueryByTransferIDsMetaParams,
  XTransfer,
  DestinationTransfer,
} from "@connext/nxtp-utils";

import { getContext } from "../../shared";

const getMaxNonce = (transfers: DestinationTransfer[] | XTransfer[]): number => {
  return transfers.length == 0 ? 0 : Math.max(...transfers.map((transfer) => transfer.xparams.nonce ?? 0)) ?? 0;
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

  await Promise.all(
    domains.map(async (domain) => {
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
        return;
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
    }),
  );

  if (subgraphOriginQueryMetaParams.size > 0) {
    // Get origin transfers for all domains in the mapping.
    const transfers = await subgraph.getOriginTransfersByNonce(subgraphOriginQueryMetaParams);
    transfers.forEach((transfer) => {
      const { requestContext: _requestContext, methodContext: _methodContext } = createLoggingContext(
        "updateTransfers",
        undefined,
        transfer.transferId,
      );
      logger.info("Retrieved origin transfer", _requestContext, _methodContext, { transfer });
    });
    const checkpoints = domains
      .map((domain) => {
        const domainTransfers = transfers.filter((transfer) => transfer.xparams!.originDomain === domain);
        const max = getMaxNonce(domainTransfers);
        const latest = subgraphOriginQueryMetaParams.get(domain)?.latestNonce ?? 0;
        if (domainTransfers.length > 0 && max > latest) {
          return { domain, checkpoint: max };
        }
        return undefined;
      })
      .filter((x) => !!x) as { domain: string; checkpoint: number }[];

    await database.saveTransfers(transfers);
    for (const checkpoint of checkpoints) {
      await database.saveCheckPoint("origin_nonce_" + checkpoint.domain, checkpoint.checkpoint);
    }
  }

  if (subgraphDestinationQueryMetaParams.size > 0) {
    // Get destination transfers for all domains in the mapping.
    const transfers = await subgraph.getDestinationTransfersByNonce(subgraphDestinationQueryMetaParams);
    logger.info("Retrieved destination transfers by nonce", requestContext, methodContext, {
      transfers: transfers,
      count: transfers.length,
    });

    const checkpoints = domains
      .map((domain) => {
        const domainTransfers = transfers.filter((transfer) => transfer.xparams!.destinationDomain === domain);
        const max = getMaxNonce(domainTransfers);
        const latest = subgraphDestinationQueryMetaParams.get(domain)?.latestNonce ?? 0;
        if (domainTransfers.length > 0 && max > latest) {
          return { domain, checkpoint: max };
        }
        return undefined;
      })
      .filter((x) => !!x) as { domain: string; checkpoint: number }[];

    await database.saveTransfers(transfers as XTransfer[]);
    for (const checkpoint of checkpoints) {
      await database.saveCheckPoint("destination_nonce_" + checkpoint.domain, checkpoint.checkpoint);
    }
  }

  await Promise.all(
    domains.map(async (domain) => {
      // Get destination transfers per domain.
      const domainParams = subgraphReconcileQueryMetaParams.get(domain)!;
      const domainTransfers = await subgraph.getDestinationTransfersByDomainAndReconcileTimestamp(domainParams, domain);
      logger.info("Retrieved destination transfers by reconcile timestamp by domain", requestContext, methodContext, {
        transfers: domainTransfers,
        domain: domain,
        count: domainTransfers.length,
      });
      const max = getMaxReconcileTimestamp(domainTransfers as XTransfer[]);
      const latest = subgraphReconcileQueryMetaParams.get(domain)?.fromTimestamp ?? 0;

      await database.saveTransfers(domainTransfers as XTransfer[]);
      if (domainTransfers.length > 0 && max > latest) {
        await database.saveCheckPoint("destination_reconcile_timestamp_" + domain, max);
      }
    }),
  );

  if (subgraphOriginPendingQueryMetaParams.size > 0) {
    const transfers = await subgraph.getOriginTransfersById(subgraphOriginPendingQueryMetaParams);
    logger.info("Retrieved origin transfers by id", requestContext, methodContext, {
      transfers: transfers,
      count: transfers.length,
    });
    await database.saveTransfers(transfers);
  }

  if (subgraphDestinationPendingQueryMetaParams.size > 0) {
    const transfers = await subgraph.getDestinationTransfersById(subgraphDestinationPendingQueryMetaParams);
    logger.info("Retrieved destination transfers by id", requestContext, methodContext, {
      transfers: transfers,
      count: transfers.length,
    });
    await database.saveTransfers(transfers as XTransfer[]);
  }
};
