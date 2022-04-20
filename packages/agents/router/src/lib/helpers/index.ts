import { getAuctionStatus, sendBid } from "./auctions";
import {
  getDestinationLocalAsset,
  getTransactionId,
  signHandleRelayerFeePayload,
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
      signHandleRelayerFeePayload,
      getSubgraphHealth,
      getSubgraphName,
      existsSync,
      readFileSync,
    },
  };
};
