import { NxtpMessaging } from "@connext/nxtp-utils";

import { BaseLogger } from "pino";

import { Handler } from "./handler";

/*
    Listener.ts

    The goal of this file is *only* to set up and manage listeners. All handling
    logic should be routed to handlers.ts. 
*/
export async function setupListeners(
  messagingService: NxtpMessaging,
  subgraph: Subgraph,
  handler: Handler,
  logger: BaseLogger,
): Promise<void> {
  // Setup Messaging Service events
  // <from>.auction.<fromChain>.<fromAsset>.<toChain>.<toAsset>
  messagingService.subscribe("*.auction.>", async data => {
    // On every new auction broadcast, route to the new auction handler
    const res = await handler.handleNewAuction();
  });

  // <from>.metatx
  messagingService.subscribe("*.metatx", async data => {
    // On every metatx request (i.e. user wants router to fulfill for them)
    // route to metatx handler
    const res = await handler.handleMetaTxRequest();
  });

  // Setup Subgraph events
  subgraph.on(SubgraphEvents.SENDER_PREPARE, async (data: EventData.SENDER_PREPARE) => {
    // On sender prepare, route to sender prepare handler
    const res = await handler.handleSenderPrepare(data);
  });

  subgraph.on(SubgraphEvents.RECEIVER_PREPARE, async data => {
    // On receiver prepare, route to receiver prepare handler
    const res = await handler.handleReceiverPrepare();
  });

  subgraph.on(SubgraphEvents.SENDER_FULFILL, async data => {
    // On sender fulfill, route to sender fulfill handler
    const res = await handler.handleSenderFulfill();
  });

  subgraph.on(SubgraphEvents.RECEIVER_FULFILL, async data => {
    // On receiver fulfill, route to receiver fulfill handler
    const res = await handler.handleReceiverFulfill();
  });
}
