import { RouterNxtpNatsMessagingService } from "@connext/nxtp-utils";
import { BaseLogger } from "pino";

import { Handler } from "./handler";
import { Subgraph, SubgraphEvents } from "./subgraph";

// The goal of this file is *only* to set up and manage listeners. All handling logic should be routed to `handlers.ts`.

/**
 * Establishes all listeners and callbacks for the router for various messages and events.
 *
 * @param messagingService - NATS based messaging service
 * @param subgraph - TransactionManager.sol subgraph interface
 * @param handler - An interface that holds all handling logic for the necessary messages or events
 * @param logger - A simple logger
 */
export async function setupListeners(
  messagingService: RouterNxtpNatsMessagingService,
  subgraph: Subgraph,
  handler: Handler,
  logger: BaseLogger,
): Promise<void> {
  logger.info("setupListeners");
  // Setup Messaging Service events
  // <from>.auction.<fromChain>.<fromAsset>.<toChain>.<toAsset>
  void messagingService.subscribeToAuctionRequest(async (inbox, data, err) => {
    if (err || !data) {
      logger.error({ err, data }, "Error in auction request");
      return;
    }
    // On every new auction broadcast, route to the new auction handler
    await handler.handleNewAuction(data, inbox);
  });

  // <from>.metatx
  messagingService.subscribeToMetaTxRequest(async (inbox, data, err) => {
    if (err || !data) {
      logger.error({ err, data }, "Error in metatx request");
      return;
    }
    // On every metatx request (i.e. user wants router to fulfill for them)
    // route to metatx handler
    logger.info({ data }, "Got metatx");
    await handler.handleMetaTxRequest(data, inbox);
  });

  // Setup Subgraph events
  subgraph.attach(SubgraphEvents.SenderTransactionPrepared, async ({ senderEvent }) => {
    // On sender prepare, route to sender prepare handler
    await handler.handleSenderPrepare(senderEvent);
  });

  subgraph.attach(SubgraphEvents.ReceiverTransactionFulfilled, async ({ senderEvent, receiverEvent }) => {
    // On receiver fulfill, route to receiver fulfill handler
    await handler.handleReceiverFulfill(senderEvent, receiverEvent);
  });
}
