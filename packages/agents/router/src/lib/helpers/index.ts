import { sanityCheck } from "./execute";
import {
  getDestinationLocalAsset,
  getTransactionId,
  signHandleRelayerFeePayload,
  getSubgraphHealth,
  getSubgraphName,
  existsSync,
  readFileSync,
} from "./shared";

export const getHelpers = () => {
  return {
    execute: {
      sanityCheck,
    },
    shared: {
      getDestinationLocalAsset,
      getTransactionId,
      signHandleRelayerFeePayload,
      getSubgraphHealth,
      getSubgraphName,
      existsSync,
      readFileSync,
    },
  };
};
