import { existsSync, readFileSync, gelatoSend, isChainSupportedByGelato, getGelatoRelayerAddress } from "./shared";

export const getHelpers = () => {
  return {
    relayer: {
      gelatoSend,
      isChainSupportedByGelato,
      getGelatoRelayerAddress,
    },
    shared: {
      existsSync,
      readFileSync,
    },
  };
};
