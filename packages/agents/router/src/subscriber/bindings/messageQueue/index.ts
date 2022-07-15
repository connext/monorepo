import { createLoggingContext, jsonifyError, OriginTransfer } from "@connext/nxtp-utils";

import { XCALL_MESSAGE_TYPE, XCALL_QUEUE } from "../../../setup";
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
      logger.error("Error handling message", requestContext, methodContext, jsonifyError(err as Error));
      message.nack();
    }
  });

  mqClient.startSubscription(XCALL_QUEUE);
};
