import { storeBid, executeAuction } from "./auctions";
import { executeSlowPathData, storeExecutorData } from "./executor";
import { sendExecuteFastToRelayer, sendExecuteSlowToRelayer } from "./relayer";
import { updateTask } from "./tasks";

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
    executor: {
      storeExecutorData,
      executeSlowPathData,
    },
    tasks: {
      updateTask,
    },
  };
};
