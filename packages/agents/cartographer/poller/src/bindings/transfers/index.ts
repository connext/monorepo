import { createLoggingContext, jsonifyError, NxtpError } from "@connext/nxtp-utils";

import { getContext } from "../../shared";
import { updateTransfers } from "../../lib/operations";

// Ought to be configured properly for each network; we consult the chain config below.
export const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindTransfers = async () => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindTransfers.name);
  try {
    logger.debug("Bind transfers polling loop start", requestContext, methodContext);
    await updateTransfers();
    logger.debug("Bind transfers polling loop complete", requestContext, methodContext);
  } catch (err: unknown) {
    logger.error(
      "Error getting txs, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }
};
