import {
  gelatoSend,
  isChainSupportedByGelato,
  getGelatoRelayerAddress,
  getTaskStatusFromGelato,
  connextRelayerSend,
} from "./relayer";
import {
  encodeExecuteFromBids,
  getDestinationLocalAsset,
  getBidsRoundMap,
  getAllSubsets,
  getMinimumBidsCountForRound,
} from "./auctions";

export const getHelpers = () => {
  return {
    relayer: {
      gelatoSend,
      isChainSupportedByGelato,
      getGelatoRelayerAddress,
      getTaskStatusFromGelato,
      connextRelayerSend,
    },
    auctions: {
      encodeExecuteFromBids,
      getDestinationLocalAsset,
      getBidsRoundMap,
      getAllSubsets,
      getMinimumBidsCountForRound,
    },
  };
};
