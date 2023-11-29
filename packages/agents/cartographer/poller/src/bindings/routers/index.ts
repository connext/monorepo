import { createLoggingContext, jsonifyError, NxtpError } from "@connext/nxtp-utils";

import { AppContext } from "../../shared";
import { updateRouters, updateDailyRouterTvl } from "../../lib/operations";
import { updateAssets, updateRouterLiquidityEvents } from "../../lib/operations/routers";

export const bindRouters = async (context: AppContext) => {
  const { logger } = context;
  const { requestContext, methodContext } = createLoggingContext(bindRouters.name);
  try {
    logger.debug("Bind routers polling loop start", requestContext, methodContext);
    await updateRouters();
    await updateAssets();
    await updateDailyRouterTvl();
    await updateRouterLiquidityEvents();
    logger.debug("Bind routers polling loop complete", requestContext, methodContext);
  } catch (err: unknown) {
    logger.error(
      "Error getting txs, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }
};
