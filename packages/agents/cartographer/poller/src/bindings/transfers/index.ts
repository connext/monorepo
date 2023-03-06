import { createLoggingContext, jsonifyError, NxtpError } from "@connext/nxtp-utils";

import { AppContext } from "../../shared";
import { updateTransfers } from "../../lib/operations";
import { updateBackoffs } from "../../lib/operations/transfers";

export const bindTransfers = async (context: AppContext) => {
  const { logger } = context;
  const { requestContext, methodContext } = createLoggingContext(bindTransfers.name);
  try {
    logger.debug("Bind transfers polling loop start", requestContext, methodContext);
    await updateTransfers();
    await updateBackoffs(); // putting this in same try-catch, if we cant update transfers best to not update backoffs
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
