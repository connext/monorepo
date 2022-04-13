import { getAuctionStatus, sendBid } from "./auctions";
import { sanityCheck } from "./execute";
import { getDestinationLocalAsset, getTransactionId, signHandleRelayerFeePayload } from "./shared";

export const getHelpers = () => {
  return {
    auctions: {
      getAuctionStatus,
      sendBid,
    },
    execute: {
      sanityCheck,
    },
    shared: {
      getDestinationLocalAsset,
      getTransactionId,
      signHandleRelayerFeePayload,
    },
  };
};
