import { createLoggingContext, jsonifyError, NxtpError } from "@connext/nxtp-utils";

import { updateMessageStatus } from "../../lib/operations/messagestatus";
import { AppContext } from "../../shared";

export const bindMessageStatus = async (context: AppContext) => {
  const { logger, config } = context;
  const { requestContext, methodContext } = createLoggingContext(`bindMessageStatus-${config.service}`);
  logger.debug("Bind message status polling loop start", requestContext, methodContext);

  try {
    await updateMessageStatus();
  } catch (err: unknown) {
    logger.error(
      "Error updating message status, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }
};
