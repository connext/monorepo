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
    logger.debug("Retrieving balances", requestContext, methodContext, { domain });
    const balances = await subgraph.getAssetBalancesAllRouters(domain);
    await database.saveRouterBalances(balances);
    logger.debug("Saved balances", requestContext, methodContext, { domain });
  }
};
