import { existsSync, readFileSync, gelatoSend, isChainSupportedByGelato, getGelatoRelayerAddress } from "./shared";
import { connextRelayerSend } from "./relayer";
export const getHelpers = () => {
  return {
    relayer: {
      gelatoSend,
      isChainSupportedByGelato,
      getGelatoRelayerAddress,
      connextRelayerSend,
    },
    shared: {
      existsSync,
      readFileSync,
    },
  };
};
