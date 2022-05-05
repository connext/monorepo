import { createLoggingContext } from "@connext/nxtp-utils";

import { getContext } from "../../backend";

export const updateRouters = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateRouters.name);

  const domains = Object.keys(config.chains);
  for (const domain of domains) {
    logger.debug("Saving balances", requestContext, methodContext, { domain });
    const balances = await subgraph.getAssetBalancesAllRouters(domain);
    await database.saveRouterBalances(balances);
    logger.debug("Saved balances", requestContext, methodContext, { domain });
  }
};
