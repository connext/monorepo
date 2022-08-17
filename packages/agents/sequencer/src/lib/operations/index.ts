import { storeBid, executeAuction } from "./auctions";
import { executeSlowPathData, storeExecutorData } from "./executor";
import { sendExecuteFastToRelayer, sendExecuteSlowToRelayer } from "./relayer";

export const getOperations = () => {
  return {
    auctions: {
      storeBid,
      executeAuction,
    },
    relayer: {
      sendExecuteFastToRelayer,
      sendExecuteSlowToRelayer,
    },
    lighthouse: {
      storeExecutorData,
      executeSlowPathData,
    },
  };
};
