import { createLoggingContext, AggregatedRoot, PropagatedRoot, ReceivedAggregateRoot } from "@connext/nxtp-utils";

import { getContext } from "../../shared";

export const updateAggregatedRoots = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateAggregatedRoots.name);

  const metas = await subgraph.getConnectorMeta(domains);
  const hubs = new Set(metas.map((m) => m.hubDomain));

  for (const hub of [...hubs]) {
    const offset = await database.getCheckPoint("aggregated_root_" + hub);
    const limit = 100;
    logger.debug("Retrieving aggregated roots", requestContext, methodContext, {
      hub: hub,
      offset: offset,
      limit: limit,
    });

    const aggregatedRoots: AggregatedRoot[] = await subgraph.getGetAggregatedRootsByDomain([
      { hub, index: offset, limit },
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

export const updatePropagatedRoots = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updatePropagatedRoots.name);

  const metas = await subgraph.getConnectorMeta(domains);
  const hubs = new Set(metas.map((m) => m.hubDomain));
  for (const hub of [...hubs]) {
    const offset = await database.getCheckPoint("propagated_root_" + hub);
    const limit = 100;

    logger.debug("Retrieving propagated roots", requestContext, methodContext, {
      domain: hub,
      offset: offset,
      limit: limit,
    });

    const propagatedRoots: PropagatedRoot[] = await subgraph.getGetPropagatedRoots(hub, offset, limit);

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

export const updateReceivedAggregateRoots = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateReceivedAggregateRoots.name);

  for (const domain of domains) {
    const offset = await database.getCheckPoint("received_aggregate_root_" + domain);
    const limit = 100;
    logger.debug("Retrieving received aggregate root", requestContext, methodContext, {
      domain: domain,
      offset: offset,
      limit: limit,
    });

    const receivedRoots: ReceivedAggregateRoot[] = await subgraph.getReceivedAggregatedRootsByDomain([
      { domain, offset, limit },
    ]);

    const newOffset = receivedRoots.length == 0 ? 0 : Math.max(...receivedRoots.map((root) => root.blockNumber ?? 0));

    if (receivedRoots.length > 0 && newOffset > offset) {
      await database.saveReceivedAggregateRoot(receivedRoots);
      await database.saveCheckPoint("received_aggregate_root_" + domain, newOffset);
    }

    logger.debug("Saved received roots", requestContext, methodContext, { domain: domain, offset: newOffset });
  }
};
