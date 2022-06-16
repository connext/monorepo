import { getAuctionStatus, sendBid, getMinimumBidsCountForRound } from "./auctions";
import {
  getDestinationLocalAsset,
  getTransactionId,
  signRouterPathPayload,
  recoverRouterPathPayload,
  getSubgraphHealth,
  getSubgraphName,
  existsSync,
  readFileSync,
} from "./shared";

export const getHelpers = () => {
  return {
    auctions: {
      getAuctionStatus,
      sendBid,
      getMinimumBidsCountForRound,
    },
    shared: {
      getDestinationLocalAsset,
      getTransactionId,
      signRouterPathPayload,
      recoverRouterPathPayload,
      getSubgraphHealth,
      getSubgraphName,
      existsSync,
      readFileSync,
    },
  };
};
