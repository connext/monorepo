import axios, { AxiosResponse } from "axios";
import {
  AuctionsApiGetAuctionStatusResponse,
  AuctionsApiPostBidReq,
  Bid,
  RequestContext,
  createLoggingContext,
  jsonifyError,
  BidData,
  formatUrl,
} from "@connext/nxtp-utils";

import { getContext } from "../../router";
import { SequencerResponseInvalid } from "../errors";

export const sendBid = async (
  transferId: string,
  bid: Bid,
  bidData: BidData,
  _requestContext: RequestContext,
): Promise<any> => {
  const { config, logger } = getContext();
  const { sequencerUrl } = config;
  const { requestContext, methodContext } = createLoggingContext(sendBid.name);

  logger.info("Sending bid to sequencer", requestContext, methodContext, {
    transferId,
    // Remove actual signatures (sensitive data) from logs, but list participating rounds.
    bid: { ...bid, signatures: Object.keys(bid.signatures).join(",") },
  });

  const url = formatUrl(sequencerUrl, "auctions");
  try {
    const response = await axios.post<any, AxiosResponse<any, any>, AuctionsApiPostBidReq>(url, {
      transferId,
      bid,
      data: bidData,
    });
    // Make sure response.data is valid.
    if (!response || !response.data) {
      throw new SequencerResponseInvalid({ response });
    }
    logger.info("Sent bid to sequencer", requestContext, methodContext, { data: response.data });
    return response.data;
  } catch (error: any) {
    logger.error(`Bid Post Error`, requestContext, methodContext, jsonifyError(error as Error), { transferId });
    throw error;
  }
};

export const getAuctionStatus = async (
  transferId: string,
  _requestContext: RequestContext,
): Promise<AuctionsApiGetAuctionStatusResponse> => {
  const { config, logger } = getContext();
  const { sequencerUrl } = config;
  const { requestContext, methodContext } = createLoggingContext(sendBid.name);

  const url = `${sequencerUrl}/auctions/${transferId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    logger.error(`Bids by TransferId Get Error`, requestContext, methodContext, jsonifyError(error as Error));
    throw error;
  }
};
