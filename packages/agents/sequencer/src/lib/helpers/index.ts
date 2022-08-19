import {
  gelatoSend,
  isChainSupportedByGelato,
  getGelatoRelayerAddress,
  getGelatoTaskStatus,
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
      getGelatoTaskStatus,
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
