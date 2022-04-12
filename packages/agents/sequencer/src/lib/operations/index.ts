import { storeBid, selectBids } from "./auctions";
import { sendToRelayer } from "./relayer";

export const getOperations = () => {
  return {
    auctions: {
      storeBid,
      selectBids,
    },
    relayer: {
      sendToRelayer,
    },
  };
};
