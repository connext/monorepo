import { createLoggingContext, jsonifyError, NxtpError } from "@connext/nxtp-utils";

import { AppContext } from "../../shared";
import { updateStableSwap, updatePoolEvents, updateLpTransfers } from "../../lib/operations";

export const bindStableSwap = async (context: AppContext) => {
  const { logger } = context;
  const { requestContext, methodContext } = createLoggingContext(bindStableSwap.name);
  try {
    logger.debug("Bind stableswap polling loop start", requestContext, methodContext);
    await updateStableSwap();
    await updatePoolEvents();
    await updateLpTransfers();
    logger.debug("Bind stableswap polling loop complete", requestContext, methodContext);
  } catch (err: unknown) {
    logger.error(
      "Error getting txs, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }
};
