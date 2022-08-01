import { storeBid, executeAuction } from "./auctions";
import { sendToRelayer } from "./relayer";

export const getOperations = () => {
  return {
    auctions: {
      storeBid,
      executeAuction,
    },
    relayer: {
      sendToRelayer,
    },
  };
};
