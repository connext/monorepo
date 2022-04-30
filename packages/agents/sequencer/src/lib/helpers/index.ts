import { gelatoSend, isChainSupportedByGelato, getGelatoRelayerAddress } from "./relayer";
import { encodeExecuteFromBids, getDestinationLocalAsset } from "./auctions";

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
    },
  };
};
