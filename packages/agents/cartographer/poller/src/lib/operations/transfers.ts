import {
  createLoggingContext,
  SubgraphQueryMetaParams,
  SubgraphQueryByTimestampMetaParams,
  SubgraphQueryByTransferIDsMetaParams,
  XTransfer,
  DestinationTransfer,
  RelayerFeesIncrease,
  SlippageUpdate,
} from "@connext/nxtp-utils";

import { getContext } from "../../shared";

import { DEFAULT_LOAD_SIZE } from ".";

const getMaxNonce = (transfers: DestinationTransfer[] | XTransfer[]): number => {
  return transfers.length == 0 ? 0 : Math.max(...transfers.map((transfer) => transfer.xparams.nonce ?? 0));
};

const getMaxReconcileNonce = (transfers: XTransfer[]): number => {
  return transfers.length == 0
    ? 0
    : Math.max(...transfers.map((transfer) => transfer.destination?.reconcile?.txNonce ?? 0));
};

const getMaxTimestamp = (entities: RelayerFeesIncrease[] | SlippageUpdate[]): number => {
  return entities.length == 0 ? 0 : Math.max(...entities.map((entity) => (entity?.timestamp as number) ?? 0));
};

const getMaxExecutedNonce = (transfers: XTransfer[]): number => {
  return transfers.length == 0
    ? 0
    : Math.max(...transfers.map((transfer) => transfer.destination?.execute?.txNonce ?? 0));
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
  const subgraphReconcileQueryMetaParams: Map<string, SubgraphQueryMetaParams> = new Map();
  const latestBlockNumbers: Map<string, number> = await subgraph.getLatestBlockNumber(domains);

  await Promise.all(
    domains.map(async (domain) => {
      let latestBlockNumber: number | undefined = undefined;
      if (latestBlockNumbers.has(domain)) {
        latestBlockNumber = latestBlockNumbers.get(domain)!;
      }
      if (!latestBlockNumber) {
        logger.error("Error getting the latestBlockNumber for domain.", requestContext, methodContext, undefined, {
          domain,
          latestBlockNumber,
          latestBlockNumbers,
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
      const lastestExecutedNonce = await database.getCheckPoint("destination_execute_tx_nonce_" + domain);

      subgraphDestinationQueryMetaParams.set(domain, {
        maxBlockNumber: latestBlockNumber,
        latestNonce: lastestExecutedNonce == 0 ? lastestExecutedNonce : lastestExecutedNonce + 1,
        orderDirection: "asc",
      });

      const lastestReconciledNonce = await database.getCheckPoint("destination_reconcile_tx_nonce_" + domain);

      subgraphReconcileQueryMetaParams.set(domain, {
        maxBlockNumber: latestBlockNumber,
        latestNonce: lastestReconciledNonce == 0 ? lastestReconciledNonce : lastestReconciledNonce + 1,
        orderDirection: "asc",
      });
    }),
  );

  if (subgraphOriginQueryMetaParams.size > 0) {
    // Get origin transfers for all domains in the mapping.
    const transfers = await subgraph.getOriginTransfersByNonce(subgraphOriginQueryMetaParams);
    logger.info("Retrieved origin transfers", requestContext, methodContext, { count: transfers.length });
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
    const transfers = await subgraph.getDestinationTransfersByExecutedNonce(subgraphDestinationQueryMetaParams);
    logger.info("Retrieved destination transfers by executed tx nonce", requestContext, methodContext, {
      count: transfers.length,
      params: Object.fromEntries(subgraphDestinationQueryMetaParams),
    });

    const checkpoints = domains
      .map((domain) => {
        const domainTransfers = transfers.filter((transfer) => transfer.xparams!.destinationDomain === domain);
        const max = getMaxExecutedNonce(domainTransfers as XTransfer[]);
        const latest = subgraphDestinationQueryMetaParams.get(domain)?.latestNonce ?? 0;
        if (domainTransfers.length > 0 && max > latest) {
          return { domain, checkpoint: max };
        }
        return undefined;
      })
      .filter((x) => !!x) as { domain: string; checkpoint: number }[];

    await database.saveTransfers(transfers as XTransfer[]);
    for (const checkpoint of checkpoints) {
      await database.saveCheckPoint("destination_execute_tx_nonce_" + checkpoint.domain, checkpoint.checkpoint);
    }
  }

  if (subgraphReconcileQueryMetaParams.size > 0) {
    await Promise.all(
      domains.map(async (domain) => {
        // Get destination transfers per domain.
        const domainParams = subgraphReconcileQueryMetaParams.get(domain)!;
        const domainTransfers = await subgraph.getDestinationTransfersByDomainAndReconcileNonce(domainParams, domain);
        logger.info("Retrieved destination transfers by reconcile tx nonce by domain", requestContext, methodContext, {
          domain: domain,
          count: domainTransfers.length,
          params: domainParams,
        });
        const max = getMaxReconcileNonce(domainTransfers as XTransfer[]);
        const latest = subgraphReconcileQueryMetaParams.get(domain)?.latestNonce ?? 0;

        await database.saveTransfers(domainTransfers as XTransfer[]);
        if (domainTransfers.length > 0 && max > latest) {
          await database.saveCheckPoint("destination_reconcile_tx_nonce_" + domain, max);
        }
      }),
    );
  }

  for (const originDomain of domains) {
    for (const destinationDomain of domains) {
      if (originDomain == destinationDomain) continue;

      const destinationTransfers: XTransfer[] = [];
      let offset = 0;
      const limit = 1000;
      let done = false;
      while (!done) {
        const pendingTransfers = await database.getPendingTransfersByDomains(
          originDomain,
          destinationDomain,
          limit,
          offset,
          "ASC",
        );

        const _destinationPendingQueryMetaParams: Map<string, SubgraphQueryByTransferIDsMetaParams> = new Map();
        _destinationPendingQueryMetaParams.set(destinationDomain, {
          maxBlockNumber: latestBlockNumbers.get(originDomain)!,
          transferIDs: pendingTransfers,
        });
        const _destinationTransfers = await subgraph.getDestinationTransfersById(_destinationPendingQueryMetaParams);

        if (_destinationTransfers.length > 0) {
          logger.info("Retrieved destination transfers by id", requestContext, methodContext, {
            originDomain,
            destinationDomain,
            pendingTransfers,
            nonces: _destinationTransfers.map((i) => i.xparams.nonce),
            count: _destinationTransfers.length,
          });
          destinationTransfers.push(...(_destinationTransfers as XTransfer[]));
        }

        if (offset >= DEFAULT_LOAD_SIZE) done = true;
        else if (pendingTransfers.length == limit) offset += limit;
        else done = true;
      }

      if (destinationTransfers.length > 0) {
        await database.saveTransfers(destinationTransfers);
      }
    }
  }

  const deletedTransferIds = await database.deleteNonExistTransfers();
  logger.info("Deleted non-exist transfers", requestContext, methodContext, {
    count: deletedTransferIds.length,
    transferIds: deletedTransferIds,
  });
};

export const updateBackoffs = async (): Promise<void> => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("updateBackoffs");
  const subgraphRelayerFeeQueryMetaParams: Map<string, SubgraphQueryByTimestampMetaParams> = new Map();
  const subgraphSlippageUpdatesQueryMetaParams: Map<string, SubgraphQueryByTimestampMetaParams> = new Map();
  await Promise.all(
    domains.map(async (domain) => {
      const increasesTimestamp = await database.getCheckPoint("relayer_fees_increases_timestamp_" + domain);
      subgraphRelayerFeeQueryMetaParams.set(domain, {
        fromTimestamp: increasesTimestamp,
        orderDirection: "asc",
      });

      const updatesTimestamp = await database.getCheckPoint("slippage_updates_timestamp_" + domain);
      subgraphSlippageUpdatesQueryMetaParams.set(domain, {
        fromTimestamp: updatesTimestamp,
        orderDirection: "asc",
      });
    }),
  );

  let increases: RelayerFeesIncrease[] = [];
  let updates: SlippageUpdate[] = [];
  if (subgraphRelayerFeeQueryMetaParams.size > 0) {
    increases = await subgraph.getRelayerFeesIncreasesByDomainAndTimestamp(subgraphRelayerFeeQueryMetaParams);
    logger.info("Retrieved relayer fee increases", requestContext, methodContext, {
      increases,
      count: increases.length,
    });
  }

  if (subgraphSlippageUpdatesQueryMetaParams.size > 0) {
    updates = await subgraph.getSlippageUpdatesByDomainAndTimestamp(subgraphSlippageUpdatesQueryMetaParams);
    logger.info("Retrieved slippage updates", requestContext, methodContext, {
      updates,
      count: updates.length,
    });
  }

  // update updated_slippage value for transfers
  await database.updateSlippage(updates);

  await database.resetBackoffs(
    increases.map((increase) => increase.transferId).concat(updates.map((update) => update.transferId)),
  );

  // filter by domain
  const increasesByDomain: Record<string, string[]> = {};

  const increaseCheckpoints = domains
    .map((domain) => {
      const domainIncreases = increases.filter((increase) => increase.domain === domain);
      increasesByDomain[domain] = domainIncreases.map((increase) => increase.transferId);
      const max = getMaxTimestamp(domainIncreases);
      const latest = subgraphRelayerFeeQueryMetaParams.get(domain)?.fromTimestamp ?? 0;
      if (domainIncreases.length > 0 && max > latest) {
        return { domain, checkpoint: max };
      }
      return undefined;
    })
    .filter((x) => !!x) as { domain: string; checkpoint: number }[];

  // update transfers with relayer fee bumps
  // query subgraphs to avoid recalculating relayer fee based on increases
  for (const domain of Object.keys(increasesByDomain)) {
    const transfers = await subgraph.getOriginTransfersByDomain(domain, increasesByDomain[domain]);
    await database.saveTransfers(transfers);
  }

  for (const checkpoint of increaseCheckpoints) {
    await database.saveCheckPoint("relayer_fees_increases_timestamp_" + checkpoint.domain, checkpoint.checkpoint);
  }

  const updateCheckpoints = domains
    .map((domain) => {
      const domainUpdates = updates.filter((update) => update.domain === domain);
      const max = getMaxTimestamp(domainUpdates);
      const latest = subgraphSlippageUpdatesQueryMetaParams.get(domain)?.fromTimestamp ?? 0;
      if (domainUpdates.length > 0 && max > latest) {
        return { domain, checkpoint: max };
      }
      return undefined;
    })
    .filter((x) => !!x) as { domain: string; checkpoint: number }[];

  for (const checkpoint of updateCheckpoints) {
    await database.saveCheckPoint("slippage_updates_timestamp_" + checkpoint.domain, checkpoint.checkpoint);
  }

  logger.debug("Reset backoffs", requestContext, methodContext, {
    increases: increases.length,
    updates: updates.length,
  });
};
