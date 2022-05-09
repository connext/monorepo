import {
  getTransactionId,
  getSubgraphHealth,
  getSubgraphName,
  existsSync,
  readFileSync,
  gelatoSend,
  isChainSupportedByGelato,
  getGelatoRelayerAddress,
} from "./shared";

export const getHelpers = () => {
  return {
    relayer: {
      gelatoSend,
      isChainSupportedByGelato,
      getGelatoRelayerAddress,
    },
    shared: {
      getTransactionId,
      getSubgraphHealth,
      getSubgraphName,
      existsSync,
      readFileSync,
    },
  };
};
