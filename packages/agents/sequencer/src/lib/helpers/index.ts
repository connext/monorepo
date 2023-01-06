import {
  encodeExecuteFromBids,
  encodeRelayerProxyExecuteFromBids,
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
      encodeRelayerProxyExecuteFromBids,
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
