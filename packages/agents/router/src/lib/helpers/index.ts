import { sanityCheck } from "./fulfill";
import { getDestinationLocalAsset } from "./shared";

export const getHelpers = () => {
  return {
    fulfill: {
      sanityCheck,
    },
    shared: {
      getDestinationLocalAsset,
    },
  };
};
