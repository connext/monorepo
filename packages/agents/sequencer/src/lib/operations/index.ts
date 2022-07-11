import { storeBid, executeAuction } from "./auctions";
import { sendToRelayer } from "./relayer";
import { setupMQ } from "./mq";

export const getOperations = () => {
  return {
    auctions: {
      storeBid,
      executeAuction,
    },
    relayer: {
      sendToRelayer,
    },
    mq: {
      setupMQ,
    },
  };
};
