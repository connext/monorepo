import { gelatoSend, isChainSupportedByGelato, getGelatoRelayerAddress } from "./relayer";
import { encodeExecuteFromBids } from "./auctions";

export const getHelpers = () => {
  return {
    relayer: {
      gelatoSend,
      isChainSupportedByGelato,
      getGelatoRelayerAddress,
    },
    auctions: {
      encodeExecuteFromBids,
    },
  };
};
