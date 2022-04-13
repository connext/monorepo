import { gelatoSend, isChainSupportedByGelato } from "./relayer";
import { encodeExecuteFromBid } from "./auctions";

export const getHelpers = () => {
  return {
    relayer: {
      gelatoSend,
      isChainSupportedByGelato,
    },
    auctions: {
      encodeExecuteFromBid,
    },
  };
};
