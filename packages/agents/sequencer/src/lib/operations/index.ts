import { storeBid, executeAuction } from "./auctions";
import { executeSlowPathData, storeLightHouseData } from "./lighthouse";
import { sendBidsToRelayer, sendLightHouseDataToRelayer } from "./relayer";

export const getOperations = () => {
  return {
    auctions: {
      storeBid,
      executeAuction,
    },
    relayer: {
      sendBidsToRelayer,
      sendLightHouseDataToRelayer,
    },
    lighthouse: {
      storeLightHouseData,
      executeSlowPathData,
    },
  };
};
