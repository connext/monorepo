import {
  encodeExecuteFromBids,
  encodeRelayerProxyExecuteFromBids,
  getDestinationLocalAsset,
  getBidsRoundMap,
  getAllSubsets,
  getMinimumBidsCountForRound,
} from "./auctions";

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
  };
};
