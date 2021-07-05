import {
  RouterNxtpNatsMessagingService,
  TransactionFulfilledEvent,
  TransactionPreparedEvent,
} from "@connext/nxtp-utils";
import { BaseLogger } from "pino";

import { Handler } from "./handler";
import { TransactionManagerListener } from "./transactionManagerListener";

/*
    Listener.ts

    The goal of this file is *only* to set up and manage listeners. All handling
    logic should be routed to handlers.ts. 
*/
export async function setupListeners(
  messagingService: RouterNxtpNatsMessagingService,
  txManager: TransactionManagerListener,
  handler: Handler,
  logger: BaseLogger,
): Promise<void> {
  logger.info("setupListeners");
  // Setup Messaging Service events
  // <from>.auction.<fromChain>.<fromAsset>.<toChain>.<toAsset>
  void messagingService.subscribeToAuctionRequest(async (data) => {
    // On every new auction broadcast, route to the new auction handler
    await handler.handleNewAuction(data);
  });

  // <from>.metatx
  messagingService.subscribeToMetaTxRequest(async (data) => {
    // On every metatx request (i.e. user wants router to fulfill for them)
    // route to metatx handler
    logger.debug({ data }, "Got metatx");
    await handler.handleMetaTxRequest(data);
  });

  // Setup Subgraph events
  txManager.onSenderPrepare(async (data: TransactionPreparedEvent) => {
    // On sender prepare, route to sender prepare handler
    await handler.handleSenderPrepare(data);
  });

  txManager.onReceiverPrepare(async (data: TransactionPreparedEvent) => {
    // On receiver prepare, route to receiver prepare handler
    await handler.handleReceiverPrepare(data);
  });

  txManager.onSenderFulfill(async (data: TransactionFulfilledEvent) => {
    // On sender fulfill, route to sender fulfill handler
    await handler.handleSenderFulfill(data);
  });

  txManager.onReceiverFulfill(async (data: TransactionFulfilledEvent) => {
    // On receiver fulfill, route to receiver fulfill handler
    await handler.handleReceiverFulfill(data);
  });
}
