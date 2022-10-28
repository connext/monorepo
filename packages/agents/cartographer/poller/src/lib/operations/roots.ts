import { createLoggingContext, AggregatedRoot, PropagatedRoot } from "@connext/nxtp-utils";

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

  for (const domain of domains) {
    for (const hub of [...hubs]) {
      const offset = await database.getCheckPoint("aggregated_root_" + domain + "_" + hub);
      const limit = 100;
      logger.debug("Retrieving aggregated roots", requestContext, methodContext, {
        domain: domain,
        offset: offset,
        limit: limit,
      });

      const aggregatedRoots: AggregatedRoot[] = await subgraph.getGetAggregatedRootsByDomain([
        { hub, domain, index: 0, limit },
      ]);

      // Reset offset at the end of the cycle.
      const newOffset = aggregatedRoots.length == 0 ? 0 : aggregatedRoots[aggregatedRoots.length - 1].index;
      if (offset === 0 || newOffset > offset) {
        await database.saveAggregatedRoots(aggregatedRoots);

        await database.saveCheckPoint("aggregated_root_" + domain + "_" + hub, newOffset);
        logger.debug("Saved aggregated roots", requestContext, methodContext, { domain: domain, offset: newOffset });
      }
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
