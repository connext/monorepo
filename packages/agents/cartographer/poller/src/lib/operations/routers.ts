import { createLoggingContext } from "@connext/nxtp-utils";

import { getContext } from "../../shared";

export const updateRouters = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateRouters.name);

  for (const domain of domains) {
    const offset = await database.getCheckPoint("router_" + domain);
    const limit = 100;
    logger.debug("Retrieving balances", requestContext, methodContext, {
      domain: domain,
      offset: offset,
      limit: limit,
    });

    const balances = await subgraph.getAssetBalancesRouters(domain, offset, limit, "asc");
    await database.saveRouterBalances(balances);

    // Reset offset at the end of the cycle.
    const newOffset = balances.length == 0 ? 0 : offset + balances.length;
    await database.saveCheckPoint("router_" + domain, newOffset);

    logger.debug("Saved balances", requestContext, methodContext, { domain: domain, offset: newOffset });
  }
};
