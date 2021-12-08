import { AuctionPayload, createLoggingContext, NxtpErrorJson, RequestContext } from "@connext/nxtp-utils";

import { attemptedAuction } from "../../lib/entities";
import { getAssetName } from "../../lib/helpers/metrics";
import { getOperations } from "../../lib/operations";
import { getContext } from "../../router";

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
    logger.error("Error in auction request", requestContext, methodContext, err, {
      data,
    });
    return;
  }
  if (!data) {
    logger.error("No data in auction request", requestContext, methodContext, err);
    return;
  }

  // On every new auction broadcast, route to the new auction handler
  logger.debug("Received auction request", requestContext, methodContext);
  const { bid, bidSignature, gasFeeInReceivingToken } = await newAuction(data, requestContext);

  await messaging.publishAuctionResponse(from, inbox, { bid, bidSignature, gasFeeInReceivingToken });
  const sendingAssetName = getAssetName(bid.sendingAssetId, bid.sendingChainId);
  const receivingAssetName = getAssetName(bid.receivingAssetId, bid.receivingChainId);
  logger.debug("Got asset names", requestContext, methodContext, {
    sendingAssetName,
    receivingAssetName,
    sendingChainId: bid.sendingChainId,
    sendingAssetId: bid.sendingAssetId,
    receivingChainId: bid.receivingChainId,
    receivingAssetId: bid.receivingAssetId,
  });
  attemptedAuction.inc({
    sendingAssetId: bid.sendingAssetId,
    receivingAssetId: bid.receivingAssetId,
    sendingChainId: bid.sendingChainId,
    receivingChainId: bid.receivingChainId,
    sendingAssetName,
    receivingAssetName,
  });
  logger.debug("Handled auction request", requestContext, methodContext, { bid, gasFeeInReceivingToken });
};
