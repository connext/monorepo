import { existsSync, readFileSync, gelatoSend, isChainSupportedByGelato, getGelatoRelayerAddress } from "./shared";
import { connextRelayerSend, externalRelayerSend, getGasEstimateWithRevertCode } from "./relayer";
export const getHelpers = () => {
  return {
    relayer: {
      gelatoSend,
      isChainSupportedByGelato,
      getGelatoRelayerAddress,
      connextRelayerSend,
      externalRelayerSend,
      getGasEstimateWithRevertCode,
    },
    shared: {
      existsSync,
      readFileSync,
    },
  };
};
