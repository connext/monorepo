import { sanityCheck } from "./execute";
import { getDestinationLocalAsset, getTransactionId, signHandleRelayerFeePayload } from "./shared";

export const getHelpers = () => {
  return {
    execute: {
      sanityCheck,
    },
    shared: {
      getDestinationLocalAsset,
      getTransactionId,
      signHandleRelayerFeePayload,
    },
  };
};
