import { gelatoSend, isChainSupportedByGelato, getGelatoRelayerAddress } from "./relayer";
import { encodeExecuteFromBids, getDestinationLocalAsset, recoverRouterPathPayload } from "./auctions";

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
      recoverRouterPathPayload,
    },
  };
};
