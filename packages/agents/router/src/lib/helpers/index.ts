import { getAuctionStatus, sendBid } from "./auctions";
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
