import axios, { AxiosResponse } from "axios";
import {
  AuctionsApiGetAuctionStatusResponse,
  AuctionsApiPostBidReq,
  Bid,
  RequestContext,
  createLoggingContext,
  jsonifyError,
  formatUrl,
  getMinimumBidsCountForRound as _getMinimumBidsCountForRound,
} from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { AuctionExpired, InvalidAuctionRound, SequencerResponseInvalid } from "../errors";
import { getContext } from "../../subscriber/subscriber";

export const sendBid = async (bid: Bid, _requestContext: RequestContext): Promise<any> => {
  const { config, logger } = getContext();
  const { sequencerUrl } = config;
  const { requestContext, methodContext } = createLoggingContext(sendBid.name);

  const { transferId } = bid;

  logger.debug("Sending bid to sequencer", requestContext, methodContext, {
    transferId,
    // Remove actual signatures (sensitive data) from logs, but list participating rounds.
    bid: { ...bid, signatures: Object.keys(bid.signatures).join(",") },
  });

  const url = formatUrl(sequencerUrl, "auctions");
  try {
    const response = await axios.post<any, AxiosResponse<any, any>, AuctionsApiPostBidReq>(url, bid);
    // Make sure response.data is valid.
    if (!response || !response.data) {
      throw new SequencerResponseInvalid({ response });
    }
    logger.info("Sent bid to sequencer", requestContext, methodContext, { data: response.data });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message === "AuctionExpired") {
      // TODO: Should we mark this transfer as expired? Technically speaking, it *could* become unexpired
      // if the sequencer decides relayer execution has timed out.
      throw new AuctionExpired({ transferId });
    } else {
      logger.error(`Bid Post Error`, requestContext, methodContext, jsonifyError(error as Error), { transferId });
      throw error;
    }
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

/**
 * Calculates the auction amount for `roundId`. Router needs to decide which rounds it needs to bid on.
 * @param roundId - The round number you're going to get the auction amount.
 * @param receivingAmount - The total amount
 */
export const getAuctionAmount = (roundId: number, receivingAmount: BigNumber): BigNumber => {
  return receivingAmount.div(getMinimumBidsCountForRound(roundId));
};

/**
 * Calculates the number of routers needed for a specific round
 * @param roundId - The round number
 */
export const getMinimumBidsCountForRound = (roundId: number): number => {
  const { config } = getContext();
  if (roundId > config.auctionRoundDepth || roundId < 1 || roundId != Math.trunc(roundId)) {
    throw new InvalidAuctionRound({
      roundId,
      startRound: 1,
      maxRoundDepth: config.auctionRoundDepth,
    });
  }
  return _getMinimumBidsCountForRound(roundId);
};
