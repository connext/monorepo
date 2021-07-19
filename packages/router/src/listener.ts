import {
  RouterNxtpNatsMessagingService,
  TransactionFulfilledEvent,
  TransactionPreparedEvent,
} from "@connext/nxtp-utils";
import { BaseLogger } from "pino";

import { Handler } from "./handler";
import { Subgraph } from "./subgraph";

/*
    Listener.ts

    The goal of this file is *only* to set up and manage listeners. All handling
    logic should be routed to handlers.ts. 
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
  void messagingService.subscribeToAuctionRequest(async (data, inbox, err) => {
    if (err) {
      logger.error({ err }, "Error in auction request");
    }
    // On every new auction broadcast, route to the new auction handler
    await handler.handleNewAuction(data, inbox);
  });

  // <from>.metatx
  messagingService.subscribeToMetaTxRequest(async (data, inbox) => {
    // On every metatx request (i.e. user wants router to fulfill for them)
    // route to metatx handler
    logger.info({ data }, "Got metatx");
    await handler.handleMetaTxRequest(data, inbox);
  });

  // Setup Subgraph events
  subgraph.onSenderPrepare(async (data: TransactionPreparedEvent) => {
    // On sender prepare, route to sender prepare handler
    await handler.handleSenderPrepare(data);
  });

  subgraph.onReceiverFulfill(
    async (senderEvent: TransactionPreparedEvent, receiverEvent: TransactionFulfilledEvent) => {
      // On receiver fulfill, route to receiver fulfill handler
      await handler.handleReceiverFulfill(senderEvent, receiverEvent);
    },
  );
}
