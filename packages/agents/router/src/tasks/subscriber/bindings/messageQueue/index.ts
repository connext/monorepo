import { createLoggingContext, jsonifyError, OriginTransfer } from "@connext/nxtp-utils";

import { ExecuteError } from "../../../../errors";
import { XCALL_MESSAGE_TYPE, XCALL_QUEUE } from "../../../../setup";
import { execute } from "../../operations";
import { getContext } from "../../subscriber";

// Ought to be configured properly for each network; we consult the chain config below.
export const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindMessageQueue = async (): Promise<void> => {
  const {
    logger,
    adapters: { mqClient },
  } = getContext();

  mqClient.handle<OriginTransfer>({ queue: XCALL_QUEUE, type: XCALL_MESSAGE_TYPE }, async (message) => {
    const { requestContext, methodContext } = createLoggingContext(
      bindMessageQueue.name,
      undefined,
      message.body.transferId,
    );
    logger.info("Handling message", requestContext, methodContext, { message });

    try {
      await execute(message.body, requestContext);
      message.ack();
    } catch (err: unknown) {
      if ((err as ExecuteError).retryable) {
        logger.error("Error handling message, retryable", requestContext, methodContext, jsonifyError(err as Error));
        message.nack();
      } else {
        logger.error(
          "Error handling message, not retryable",
          requestContext,
          methodContext,
          jsonifyError(err as Error),
        );
        message.reject();
      }
    }
  });

  mqClient.startSubscription(XCALL_QUEUE);
};
