import { gelatoSend, isChainSupportedByGelato, getGelatoRelayerAddress } from "./relayer";
import {
  encodeExecuteFromBids,
  getDestinationLocalAsset,
  getBidsRoundMap,
  generateCombinations,
  getMinimumBidsCountForRound,
} from "./auctions";

export const getHelpers = () => {
  return {
    relayer: {
      gelatoSend,
      isChainSupportedByGelato,
      getGelatoRelayerAddress,
    },
    auctions: {
      encodeExecuteFromBids,
      getDestinationLocalAsset,
      getBidsRoundMap,
      generateCombinations,
      getMinimumBidsCountForRound,
    },
  };
};
