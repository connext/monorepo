import { sanityCheck } from "./fulfill";
import { getDestinationLocalAsset, getTransactionId, signHandleRelayerFeePayload } from "./shared";

export const getHelpers = () => {
  return {
    fulfill: {
      sanityCheck,
    },
    shared: {
      getDestinationLocalAsset,
      getTransactionId,
      signHandleRelayerFeePayload,
    },
  };
};
