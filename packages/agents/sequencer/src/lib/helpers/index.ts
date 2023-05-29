import {
  encodeExecuteFromBids,
  getDestinationLocalAsset,
  getBidsRoundMap,
  getAllSubsets,
  getMinimumBidsCountForRound,
} from "./auctions";
import { canSubmitToRelayer } from "./relayerfee";
import { bindHealthServer } from "./healthserver";

export const getHelpers = () => {
  return {
    auctions: {
      encodeExecuteFromBids,
      getDestinationLocalAsset,
      getBidsRoundMap,
      getAllSubsets,
      getMinimumBidsCountForRound,
    },
    relayerfee: {
      canSubmitToRelayer,
    },
    healthserver: {
      bindHealthServer,
    },
  };
};
