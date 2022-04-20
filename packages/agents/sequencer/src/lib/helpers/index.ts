import { gelatoSend, isChainSupportedByGelato, getGelatoRelayerAddress } from "./relayer";
import { encodeExecuteFromBid } from "./auctions";

export const getHelpers = () => {
  return {
    relayer: {
      gelatoSend,
      isChainSupportedByGelato,
      getGelatoRelayerAddress,
    },
    auctions: {
      encodeExecuteFromBid,
    },
  };
};
