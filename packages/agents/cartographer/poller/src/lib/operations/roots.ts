import { createLoggingContext, AggregatedRoot, PropagatedRoot } from "@connext/nxtp-utils";

import { getContext } from "../../shared";

export const updateAggregatedRoots = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateAggregatedRoots.name);

  for (const domain of domains) {
    const offset = await database.getCheckPoint("aggregated_root_" + domain);
    const limit = 100;
    logger.debug("Retrieving aggregated roots", requestContext, methodContext, {
      domain: domain,
      offset: offset,
      limit: limit,
    });

    const aggregatedRoots: AggregatedRoot[] = await subgraph.getGetAggregatedRootsByDomain([
      { domain, index: offset, limit },
    ]);

    // Reset offset at the end of the cycle.
    const newOffset = aggregatedRoots.length == 0 ? 0 : aggregatedRoots[aggregatedRoots.length - 1].index;
    if (offset === 0 || newOffset > offset) {
      await database.transaction(async (txnClient) => {
        await database.saveAggregatedRoots(aggregatedRoots, txnClient);

        await database.saveCheckPoint("aggregated_root_" + domain, newOffset, txnClient);
      });
      logger.debug("Saved aggregated roots", requestContext, methodContext, { domain: domain, offset: newOffset });
    }
  }
};

export const updatePropagatedRoots = async () => {
  const {
    adapters: { subgraph, database },
    logger,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updatePropagatedRoots.name);

  // TODO: should replace below hardcoded value
  const domain = "1735353714";
  const offset = await database.getCheckPoint("propagated_root_");
  const limit = 100;

  logger.debug("Retrieving propagated roots", requestContext, methodContext, {
    domain: domain,
    offset: offset,
    limit: limit,
  });

  const propagatedRoots: PropagatedRoot[] = await subgraph.getGetPropagatedRoots(domain, offset, limit);

  // Reset offset at the end of the cycle.
  const newOffset = propagatedRoots.length == 0 ? 0 : propagatedRoots[propagatedRoots.length - 1].count;
  if (offset === 0 || newOffset > offset) {
    // TODO: Add a working transaction wraper
    await database.savePropagatedRoots(propagatedRoots);

    await database.saveCheckPoint("propagated_root_", newOffset);
    logger.debug("Saved propageted roots", requestContext, methodContext, { offset: newOffset });
  }
};
