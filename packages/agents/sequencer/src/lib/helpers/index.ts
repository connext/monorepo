import {
  encodeExecuteFromBids,
  getDestinationLocalAsset,
  getBidsRoundMap,
  getAllSubsets,
  getMinimumBidsCountForRound,
} from "./auctions";
import { canSubmitToRelayer } from "./relayerfee";

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
  };
};
