import { sanityCheck } from "./fulfill";
import { getDestinationLocalAsset, getTransactionId } from "./shared";

export const getHelpers = () => {
  return {
    fulfill: {
      sanityCheck,
    },
    shared: {
      getDestinationLocalAsset,
      getTransactionId,
    },
  };
};
