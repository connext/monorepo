import { getReceiverAmount } from "./fulfill";
import {
  getDestinationTransactingAsset,
  getDestinationLocalAsset,
  getAmountIn,
  getAmountOut,
  getDecimalsForAsset,
  calculateGasFeeInReceivingToken,
} from "./shared";

export const getHelpers = () => {
  return {
    fulfill: {
      getReceiverAmount,
    },
    shared: {
      getDestinationTransactingAsset,
      getDestinationLocalAsset,
      getAmountIn,
      getAmountOut,
      getDecimalsForAsset,
      calculateGasFeeInReceivingToken,
    },
  };
};
