import { createLoggingContext, jsonifyError, NxtpError } from "@connext/nxtp-utils";

import { AppContext } from "../../shared";
import { updateTransfers } from "../../lib/operations";

export const bindTransfers = async (context: AppContext) => {
  const { logger } = context;
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
