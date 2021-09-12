import {
  AuctionPayload,
  createLoggingContext,
  jsonifyError,
  NxtpError,
  NxtpErrorJson,
  RequestContext,
} from "@connext/nxtp-utils";

import { ProvidersNotAvailable } from "../../lib/errors";
import { getOperations } from "../../lib/operations";
import { getContext } from "../../router";
import { attemptedAuction } from "../metrics";

export const auctionRequestBinding = async (
  from: string,
  inbox: string,
  data?: AuctionPayload,
  err?: NxtpErrorJson,
  _requestContext?: RequestContext<string>,
) => {
  const { logger, messaging } = getContext();
  const { newAuction } = getOperations();
  const { requestContext, methodContext } = createLoggingContext(
    auctionRequestBinding.name,
    _requestContext,
    data?.transactionId,
  );
  if (err) {
    if (err.type === ProvidersNotAvailable.name) {
      logger.debug("No provider configured", requestContext, methodContext, {
        data,
        err: jsonifyError(err as NxtpError),
      });
    } else {
      logger.error("Error in auction request", requestContext, methodContext, err, { data });
    }
    return;
  }
  if (!data) {
    logger.error("No data in auction request", requestContext, methodContext, err);
    return;
  }
  // On every new auction broadcast, route to the new auction handler
  logger.info("Received auction request", requestContext, methodContext);
  const { bid, bidSignature } = await newAuction(data, requestContext);
  await messaging.publishAuctionResponse(from, inbox, { bid, bidSignature });
  attemptedAuction.inc({
    sendingAssetId: bid.sendingAssetId,
    receivingAssetId: bid.receivingAssetId,
    sendingChainId: bid.sendingChainId,
    receivingChainId: bid.receivingChainId,
  });
  logger.info("Handled auction request");
};
