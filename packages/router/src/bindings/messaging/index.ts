import { createLoggingContext, jsonifyError, MetaTxFulfillPayload, NxtpError } from "@connext/nxtp-utils";

import { getContext } from "../../router";

import { auctionRequestBinding } from "./auctionRequest";
import { statusRequestBinding } from "./statusRequest";
import { metaTxRequestBinding } from "./metaTxRequest";

export const bindMessaging = async () => {
  const { messaging, logger } = getContext();

  // Setup Messaging Service events

  // <from>.auction.<fromChain>.<fromAsset>.<toChain>.<toAsset>
  await messaging.subscribeToAuctionRequest(async (from, inbox, data, e) => {
    const { requestContext, methodContext } = createLoggingContext(
      "subscribeToAuctionRequest",
      undefined,
      data?.transactionId,
    );
    try {
      await auctionRequestBinding(from, inbox, data, e, requestContext);
    } catch (err) {
      logger[(err as NxtpError).level ?? "error"](
        "Error subscribing to auction request",
        requestContext,
        methodContext,
        jsonifyError(err),
      );
    }
  });

  await messaging.subscribeToStatusRequest(async (from, inbox, data, e) => {
    const { requestContext, methodContext } = createLoggingContext("subscribeToStatusRequest", undefined, "");
    try {
      await statusRequestBinding(from, inbox, data, e, requestContext);
    } catch (err) {
      logger[(err as NxtpError).level ?? "error"](
        "Error subscribing to status request",
        requestContext,
        methodContext,
        jsonifyError(err),
      );
    }
  });

  // <from>.metatx
  await messaging.subscribeToMetaTxRequest(async (from, inbox, data, e) => {
    const { requestContext, methodContext } = createLoggingContext(
      "subscribeToMetaTxRequest",
      undefined,
      (data?.data as MetaTxFulfillPayload)?.txData?.transactionId,
    );

    if (e) {
      logger.error("Error in metatx request", requestContext, methodContext, e, { data });
      return;
    }

    if (!data) {
      logger.error("No data in metatx request", requestContext, methodContext, e);
      return;
    }

    try {
      await metaTxRequestBinding(from, inbox, data, e, requestContext);
    } catch (err) {
      logger[(err as NxtpError).level ?? "error"](
        "Error executing metatx request",
        requestContext,
        methodContext,
        jsonifyError(err),
      );
    }
  });
};
