import { storeBid, executeAuctions } from "./auctions";
import { sendToRelayer } from "./relayer";

export const getOperations = () => {
  return {
    auctions: {
      storeBid,
      executeAuctions,
    },
    relayer: {
      sendToRelayer,
    },
  };
};
