import { createLoggingContext, jsonifyError, MetaTxFulfillPayload } from "@connext/nxtp-utils";

import { getContext } from "../../router";

import { auctionRequestBinding } from "./auctionRequest";
import { metaTxRequestBinding } from "./metaTxRequest";

export const bindMessaging = async () => {
  const { messaging, logger, config } = getContext();

  // check clean up mode
  if (config.cleanUpMode) {
    // if clean up mode then don't subscribe to events
    return;
  }

  // Setup Messaging Service events

  // <from>.auction.<fromChain>.<fromAsset>.<toChain>.<toAsset>
  await messaging.subscribeToAuctionRequest(async (from, inbox, data, err) => {
    const { requestContext, methodContext } = createLoggingContext(
      "subscribeToAuctionRequest",
      undefined,
      data?.transactionId,
    );
    try {
      await auctionRequestBinding(from, inbox, data, err, requestContext);
    } catch (e) {
      logger.error("Error subscribing to auction request", requestContext, methodContext, jsonifyError(e));
    }
  });

  // <from>.metatx
  await messaging.subscribeToMetaTxRequest(async (from, inbox, data, err) => {
    const { requestContext, methodContext } = createLoggingContext(
      "subscribeToMetaTxRequest",
      undefined,
      (data?.data as MetaTxFulfillPayload)?.txData?.transactionId,
    );

    if (err) {
      logger.error("Error in metatx request", requestContext, methodContext, err, { data });
      return;
    }

    if (!data) {
      logger.error("No data in metatx request", requestContext, methodContext, err);
      return;
    }

    try {
      await metaTxRequestBinding(from, inbox, data, err, requestContext);
    } catch (err) {
      logger.error("Error executing metatx request", requestContext, methodContext, jsonifyError(err));
    }
  });
};
