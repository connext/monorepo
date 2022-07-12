import { createLoggingContext, jsonifyError, NxtpError, OriginTransfer } from "@connext/nxtp-utils";

import { XCALL_MESSAGE_TYPE, XCALL_QUEUE } from "../../../helpers";
import { AuctionExpired } from "../../../errors";
import { execute } from "../../operations";
import { getContext } from "../../subscriber";

// Ought to be configured properly for each network; we consult the chain config below.
export const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindMessageQueue = async (_pollInterval?: number) => {
  const {
    logger,
    mqClient,
    adapters: { subgraph },
  } = getContext();

  mqClient.handle<OriginTransfer>({ queue: XCALL_QUEUE, type: XCALL_MESSAGE_TYPE }, async (message) => {
    const { requestContext, methodContext } = createLoggingContext(
      bindMessageQueue.name,
      undefined,
      message.body.transferId,
    );
    logger.info("Handling message", requestContext, methodContext, { message });

    const transfer = message.body;
    const confirmed = await subgraph.getDestinationTransfers([transfer]);
    if (confirmed.length > 0) {
      logger.info("Transfer already confirmed", requestContext, methodContext, { transfer });
      message.ack();
      return;
    }

    try {
      // Call execute to process the transfer.
      await execute(transfer, requestContext);
      message.ack();
      logger.info("Executed transfer", requestContext, methodContext, { message });
    } catch (error: unknown) {
      const type = (error as NxtpError).type;
      const isAuctionExpired = type === AuctionExpired.name;
      // Save the error to the cache for this transfer. If the error was not previously recorded, log it.
      if (isAuctionExpired) {
        logger.debug("Auction for transfer has expired", requestContext, methodContext, {
          domain: transfer.xparams.originDomain,
        });
        message.ack();
      } else {
        logger.error("Error executing transfer", requestContext, methodContext, jsonifyError(error as Error), {
          domain: transfer.xparams.originDomain,
          xcall: transfer.origin.xcall,
        });
        message.nack();
      }
    }
  });

  mqClient.startSubscription(XCALL_QUEUE);
};
