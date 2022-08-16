import { storeBid, executeAuction } from "./auctions";
import { executeSlowPathData, storeExecuteSlow } from "./lighthouse";
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
      storeExecuteSlow,
      executeSlowPathData,
    },
  };
};
