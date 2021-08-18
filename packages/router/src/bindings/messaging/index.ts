import { createRequestContext, jsonifyError } from "@connext/nxtp-utils";

import { getContext } from "../../router";

import { auctionRequestBinding } from "./auctionRequest";
import { metaTxRequestBinding } from "./metaTxRequest";

export const bindMessaging = async () => {
  const { messaging, logger } = getContext();

  // Setup Messaging Service events

  // <from>.auction.<fromChain>.<fromAsset>.<toChain>.<toAsset>
  await messaging.subscribeToAuctionRequest(async (inbox, data, err) => {
    const requestContext = createRequestContext("subscribeToAuctionRequest");
    try {
      await auctionRequestBinding(inbox, data, err, requestContext);
    } catch (e) {
      logger.error({ requestContext, err: jsonifyError(e) }, "Error in auction request");
    }
  });

  // <from>.metatx
  await messaging.subscribeToMetaTxRequest(async (inbox, data, err) => {
    const requestContext = createRequestContext("subscribeToMetaTxRequest");
    try {
      await metaTxRequestBinding(inbox, data, err, requestContext);
    } catch (err) {
      logger.error({ requestContext, err: jsonifyError(err) }, "Error fulfilling request");
    }
    if (err || !data) {
      logger.error({ err, data, requestContext }, "Error in metatx request");
      return;
    }
  });
};
