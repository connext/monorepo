import { createLoggingContext, jsonifyError, NxtpError } from "@connext/nxtp-utils";

import { getContext } from "../../shared";
import { retrieveOriginMessages, updateMessages } from "../../lib/operations/messages";

export const bindMessages = async () => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindMessages.name);
  try {
    logger.debug("Bind messages polling loop start", requestContext, methodContext);
    await retrieveOriginMessages();
    await updateMessages();
    logger.debug("Bind messages polling loop complete", requestContext, methodContext);
  } catch (err: unknown) {
    logger.error(
      "Error getting txs, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }
};
