import {
  createLoggingContext,
  AggregatedRoot,
  PropagatedRoot,
  ReceivedAggregateRoot,
  Snapshot,
  SnapshotRoot,
  OptimisticRootFinalized,
  OptimisticRootPropagated,
  SpokeOptimisticRoot,
} from "@connext/nxtp-utils";

import { getContext } from "../../shared";

export const updateAggregatedRoots = async (maxBlockNumbers: Map<string, number>) => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateAggregatedRoots.name);

  const metas = await subgraph.getConnectorMeta(domains);
  const hubs = new Set(metas.map((m) => m.hubDomain));

  for (const hub of [...hubs]) {
    const maxBlockNumber = maxBlockNumbers.get(hub) ?? 0;
    if (maxBlockNumber == 0) {
      logger.info("Error getting block number on hub", requestContext, methodContext, { hub });
      continue;
    }
    const offset = await database.getCheckPoint("aggregated_root_" + hub);
    const limit = 100;
    logger.debug("Retrieving aggregated roots", requestContext, methodContext, {
      hub: hub,
      offset: offset,
      limit: limit,
    });

    const aggregatedRoots: AggregatedRoot[] = await subgraph.getGetAggregatedRootsByDomain([
      { hub, index: offset, limit, maxBlockNumber },
    ]);

    // Reset offset at the end of the cycle.
    const newOffset = aggregatedRoots.length == 0 ? 0 : aggregatedRoots[aggregatedRoots.length - 1].index;
    if (offset === 0 || newOffset > offset) {
      await database.saveAggregatedRoots(aggregatedRoots);

      await database.saveCheckPoint("aggregated_root_" + hub, newOffset);
      logger.debug("Saved aggregated roots", requestContext, methodContext, { hub: hub, offset: newOffset });
    }
  }
};

export const updateProposedSnapshots = async (maxBlockNumbers: Map<string, number>) => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateProposedSnapshots.name);

  const metas = await subgraph.getConnectorMeta(domains);
  const hubs = new Set(metas.map((m) => m.hubDomain));

  for (const hub of [...hubs]) {
    const maxBlockNumber = maxBlockNumbers.get(hub) ?? 0;
    if (maxBlockNumber == 0) {
      logger.info("Error getting block number on hub", requestContext, methodContext, { hub });
      continue;
    }

    const disputeCliff = await database.getCheckPoint("proposed_optimistic_root_" + hub);
    const limit = 100;
    logger.debug("Retrieving proposed aggregated root snapshot", requestContext, methodContext, {
      hub: hub,
      disputeCliff: disputeCliff,
      limit: limit,
    });

    const snapshots: Snapshot[] = await subgraph.getProposedSnapshotsByDomain([
      { hub, snapshotId: disputeCliff, limit, maxBlockNumber },
    ]);

    const newDisputeCliff =
      snapshots.length == 0 ? 0 : snapshots.sort((a, b) => b.endOfDispute - a.endOfDispute)[0].endOfDispute;
    if (disputeCliff === 0 || newDisputeCliff > disputeCliff) {
      await database.saveProposedSnapshots(snapshots);

      //Mainnet spoke connecter does not emit AggregateRootProposed event
      const mainnetSpokeOptimisticRoots: SpokeOptimisticRoot[] = [];
      for (const snapshot of snapshots) {
        const mainnetSpokeOptimisticRoot: SpokeOptimisticRoot = {
          id: `${snapshot.aggregateRoot}-${snapshot.proposedTimestamp}`,
          aggregateRoot: snapshot.aggregateRoot,
          rootTimestamp: snapshot.proposedTimestamp,
          endOfDispute: snapshot.endOfDispute,
          domain: hub,
          proposeTimestamp: snapshot.proposedTimestamp,
        };
        mainnetSpokeOptimisticRoots.push(mainnetSpokeOptimisticRoot);
      }
      await database.saveProposedSpokeRoots(mainnetSpokeOptimisticRoots);

      await database.saveCheckPoint("proposed_optimistic_root_" + hub, newDisputeCliff);
      logger.debug("Saved proposed aggregated root snapshot", requestContext, methodContext, {
        hub: hub,
        disputeCliff: newDisputeCliff,
      });
    }
  }
};

export const updateProposedSpokeOptimisticRoot = async (maxBlockNumbers: Map<string, number>) => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateProposedSpokeOptimisticRoot.name);

  for (const domain of domains) {
    const maxBlockNumber = maxBlockNumbers.get(domain) ?? 0;
    if (maxBlockNumber == 0) {
      logger.info("Error getting block number on spoke", requestContext, methodContext, { domain });
      continue;
    }

    const rootTimestamp = await database.getCheckPoint("proposed_optimistic_root_" + domain);
    const limit = 100;
    logger.debug("Retrieving proposed optimistic root for spoke", requestContext, methodContext, {
      domain,
      rootTimestamp: rootTimestamp,
      limit: limit,
    });

    const opRoots: SpokeOptimisticRoot[] = await subgraph.getProposedSpokeOptimisticRootsByDomain([
      { domain, rootTimestamp, limit, maxBlockNumber },
    ]);

    const newRootTimestamp =
      opRoots.length == 0 ? 0 : opRoots.sort((a, b) => b.rootTimestamp - a.rootTimestamp)[0].rootTimestamp;
    if (rootTimestamp === 0 || newRootTimestamp > rootTimestamp) {
      await database.saveProposedSpokeRoots(opRoots);

      await database.saveCheckPoint("proposed_optimistic_root_" + domain, newRootTimestamp);
      logger.debug("Saved proposed optimistic root for spoke", requestContext, methodContext, {
        domain,
        rootTimestamp: newRootTimestamp,
      });
    }
  }
};

export const updateFinalizedRoots = async (maxBlockNumbers: Map<string, number>) => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateFinalizedRoots.name);

  const metas = await subgraph.getConnectorMeta(domains);
  const hubs = new Set(metas.map((m) => m.hubDomain));

  for (const hub of [...hubs]) {
    const maxBlockNumber = maxBlockNumbers.get(hub) ?? 0;
    if (maxBlockNumber == 0) {
      logger.info("Error getting block number on hub", requestContext, methodContext, { hub });
      continue;
    }
    const timestamp = await database.getCheckPoint("finalized_hub_optimistic_root_" + hub);
    const limit = 100;
    logger.debug("Retrieving finalized aggregated root", requestContext, methodContext, {
      hub: hub,
      offset: timestamp,
      limit: limit,
    });

    const roots: OptimisticRootFinalized[] = await subgraph.getFinalizedRootsByDomain(
      [{ domain: hub, timestamp, limit, maxBlockNumber }],
      true,
    );

    // Reset offset at the end of the cycle.
    const newTimestamp = roots.length == 0 ? 0 : roots.sort((a, b) => b.timestamp - a.timestamp)[0].timestamp;
    if (timestamp === 0 || newTimestamp > timestamp) {
      await database.saveFinalizedRoots(roots);

      await database.saveCheckPoint("finalized_hub_optimistic_root_" + hub, newTimestamp);
      logger.debug("Saved finalized aggregated root", requestContext, methodContext, {
        hub: hub,
        offset: newTimestamp,
      });
    }
  }
};

export const updateFinalizedSpokeRoots = async (maxBlockNumbers: Map<string, number>) => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateFinalizedSpokeRoots.name);

  for (const domain of domains) {
    const maxBlockNumber = maxBlockNumbers.get(domain) ?? 0;
    if (maxBlockNumber == 0) {
      logger.info("Error getting block number on spoke", requestContext, methodContext, { domain });
      continue;
    }
    const timestamp = await database.getCheckPoint("finalized_spoke_optimistic_root_" + domain);
    const limit = 100;
    logger.debug("Retrieving finalized aggregated root on domain", requestContext, methodContext, {
      domain,
      offset: timestamp,
      limit: limit,
    });

    const roots: OptimisticRootFinalized[] = await subgraph.getFinalizedRootsByDomain(
      [{ domain, timestamp, limit, maxBlockNumber }],
      false,
    );

    // Reset offset at the end of the cycle.
    const newTimestamp = roots.length == 0 ? 0 : roots.sort((a, b) => b.timestamp - a.timestamp)[0].timestamp;
    if (timestamp === 0 || newTimestamp > timestamp) {
      await database.saveFinalizedSpokeRoots(domain, roots);

      await database.saveCheckPoint("finalized_spoke_optimistic_root_" + domain, newTimestamp);
      logger.debug("Saved finalized aggregated root for domain", requestContext, methodContext, {
        domain,
        offset: newTimestamp,
      });
    }
  }
};

export const updatePropagatedOptmisticRoots = async (maxBlockNumbers: Map<string, number>) => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updatePropagatedOptmisticRoots.name);

  const metas = await subgraph.getConnectorMeta(domains);
  const hubs = new Set(metas.map((m) => m.hubDomain));

  for (const hub of [...hubs]) {
    const maxBlockNumber = maxBlockNumbers.get(hub) ?? 0;
    if (maxBlockNumber == 0) {
      logger.info("Error getting block number on spoke", requestContext, methodContext, { hub });
      continue;
    }
    const offset = await database.getCheckPoint("propagated_optimistic_root_" + hub);
    const limit = 100;
    logger.debug("Retrieving propagated optimistic aggregated root", requestContext, methodContext, {
      hub: hub,
      offset: offset,
      limit: limit,
    });

    const snapshots: OptimisticRootPropagated[] = await subgraph.getPropagatedOptimisticRootsByDomain([
      { hub, timestamp: offset, limit, maxBlockNumber },
    ]);

    // Reset offset at the end of the cycle.
    // TODO: Pagination criteria off by one ?
    const newOffset = snapshots.length == 0 ? 0 : offset + snapshots.length - 1;
    if (offset === 0 || newOffset > offset) {
      await database.savePropagatedOptimisticRoots(snapshots);

      await database.saveCheckPoint("propagated_optimistic_root_" + hub, newOffset);
      logger.debug("Saved propagagted optimistic aggregated root", requestContext, methodContext, {
        hub: hub,
        offset: newOffset,
      });
    }
  }
};

export const retrieveSavedSnapshotRoot = async (maxBlockNumbers: Map<string, number>) => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(retrieveSavedSnapshotRoot.name);

  for (const domain of domains) {
    const maxBlockNumber = maxBlockNumbers.get(domain) ?? 0;
    if (maxBlockNumber == 0) {
      logger.info("Error getting block number on spoke", requestContext, methodContext, { domain });
      continue;
    }
    const offset = await database.getCheckPoint("saved_snapshoted_root_" + domain);
    const limit = 100;
    logger.debug("Retrieving saved snapshot roots", requestContext, methodContext, {
      domain: domain,
      offset: offset,
      limit: limit,
    });

    const roots: SnapshotRoot[] = await subgraph.getSavedSnapshotRootsByDomain([
      { hub: domain, snapshotId: offset, limit, maxBlockNumber },
    ]);

    // Reset offset at the end of the cycle.
    const newOffset = roots.length == 0 ? 0 : Math.max(...roots.map((root) => +root.id ?? 0));

    await database.saveSnapshotRoots(roots);

    if (roots.length > 0 && newOffset > offset) {
      await database.saveCheckPoint("saved_snapshoted_root_" + domain, newOffset);
    }

    logger.debug("Saved snapshot roots", requestContext, methodContext, { domain: domain, offset: newOffset });
  }
};

export const updatePropagatedRoots = async (maxBlockNumbers: Map<string, number>) => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updatePropagatedRoots.name);

  const metas = await subgraph.getConnectorMeta(domains);
  const hubs = new Set(metas.map((m) => m.hubDomain));
  for (const hub of [...hubs]) {
    const maxBlockNumber = maxBlockNumbers.get(hub) ?? 0;
    if (maxBlockNumber == 0) {
      logger.info("Error getting block number on hub", requestContext, methodContext, { hub });
      continue;
    }
    const offset = await database.getCheckPoint("propagated_root_" + hub);
    const limit = 100;

    logger.debug("Retrieving propagated roots", requestContext, methodContext, {
      domain: hub,
      offset: offset,
      limit: limit,
    });

    const propagatedRoots: PropagatedRoot[] = await subgraph.getGetPropagatedRoots(hub, offset, limit, maxBlockNumber);

    // Reset offset at the end of the cycle.
    const newOffset = propagatedRoots.length == 0 ? 0 : propagatedRoots[propagatedRoots.length - 1].count;
    if (offset === 0 || newOffset > offset) {
      // TODO: Add a working transaction wraper
      await database.savePropagatedRoots(propagatedRoots);

      await database.saveCheckPoint("propagated_root_" + hub, newOffset);
      logger.debug("Saved propageted roots", requestContext, methodContext, { offset: newOffset });
    }
  }
};

export const updateReceivedAggregateRoots = async (maxBlockNumbers: Map<string, number>) => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateReceivedAggregateRoots.name);

  for (const domain of domains) {
    const maxBlockNumber = maxBlockNumbers.get(domain) ?? 0;
    if (maxBlockNumber == 0) {
      logger.info("Error getting block number on spoke", requestContext, methodContext, { domain });
      continue;
    }
    const offset = await database.getCheckPoint("received_aggregate_root_" + domain);
    const limit = 100;
    logger.debug("Retrieving received aggregate root", requestContext, methodContext, {
      domain: domain,
      offset: offset,
      limit: limit,
    });

    const receivedRoots: ReceivedAggregateRoot[] = await subgraph.getReceivedAggregatedRootsByDomain([
      { domain, offset, limit, maxBlockNumber },
    ]);

    const newOffset = receivedRoots.length == 0 ? 0 : Math.max(...receivedRoots.map((root) => root.blockNumber ?? 0));

    if (receivedRoots.length > 0 && newOffset > offset) {
      await database.saveReceivedAggregateRoot(receivedRoots);
      await database.saveCheckPoint("received_aggregate_root_" + domain, newOffset);
    }

    logger.debug("Saved received roots", requestContext, methodContext, { domain: domain, offset: newOffset });
  }
};
