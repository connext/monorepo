import { AuctionPayload, createRequestContext, NxtpErrorJson, RequestContext } from "@connext/nxtp-utils";

import { getOperations } from "../../lib/operations";
import { getContext } from "../../router";

export const auctionRequestBinding = async (
  inbox: string,
  data?: AuctionPayload,
  err?: NxtpErrorJson,
  _requestContext?: RequestContext,
) => {
  const { logger, messaging } = getContext();
  const { newAuction } = getOperations();
  const requestContext = _requestContext ?? createRequestContext("auctionRequestBinding");
  if (err || !data) {
    logger.error({ requestContext, err, data }, "Error in auction request");
    return;
  }
  // On every new auction broadcast, route to the new auction handler
  logger.info({ requestContext }, "Received auction request");
  const { bid, bidSignature } = await newAuction(data, requestContext);
  await messaging.publishAuctionResponse(inbox, { bid, bidSignature });
  logger.info({ requestContext, inbox }, "Handled auction request");
};
