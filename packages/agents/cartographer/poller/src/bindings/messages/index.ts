import { createLoggingContext, jsonifyError, NxtpError } from "@connext/nxtp-utils";

import { getContext } from "../../shared";
import {
  retrieveOriginMessages,
  updateMessages,
  retrieveSentRootMessages,
  retrieveProcessedRootMessages,
} from "../../lib/operations/messages";

export const bindMessages = async () => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindMessages.name);
  logger.debug("Bind messages polling loop start", requestContext, methodContext);

  try {
    await retrieveOriginMessages();
  } catch (err: unknown) {
    logger.error(
      "Error getting origin messages, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }

  try {
    await updateMessages();
  } catch (err: unknown) {
    logger.error(
      "Error updating messages, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }

  try {
    await retrieveSentRootMessages();
  } catch (err: unknown) {
    logger.error(
      "Error getting sent root messages, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }

  try {
    await retrieveProcessedRootMessages();
  } catch (err: unknown) {
    logger.error(
      "Error getting processed root messages, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }

  logger.debug("Bind messages polling loop complete", requestContext, methodContext);
};
