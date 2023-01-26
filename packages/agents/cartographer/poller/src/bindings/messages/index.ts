import { createLoggingContext, jsonifyError, ConnextError } from "@connext/utils";

import { AppContext } from "../../shared";
import {
  retrieveOriginMessages,
  updateMessages,
  retrieveSentRootMessages,
  retrieveProcessedRootMessages,
} from "../../lib/operations";

export const bindMessages = async (context: AppContext) => {
  const { logger, config } = context;
  const { requestContext, methodContext } = createLoggingContext(`bindMessages-${config.service}`);
  logger.debug("Bind messages polling loop start", requestContext, methodContext);

  try {
    await retrieveOriginMessages();
  } catch (err: unknown) {
    logger.error(
      "Error getting origin messages, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as ConnextError),
    );
  }

  try {
    await updateMessages();
  } catch (err: unknown) {
    logger.error(
      "Error updating messages, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as ConnextError),
    );
  }

  try {
    await retrieveSentRootMessages();
  } catch (err: unknown) {
    logger.error(
      "Error getting sent root messages, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as ConnextError),
    );
  }

  try {
    await retrieveProcessedRootMessages();
  } catch (err: unknown) {
    logger.error(
      "Error getting processed root messages, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as ConnextError),
    );
  }

  logger.debug("Bind messages polling loop complete", requestContext, methodContext);
};
