import { PriceOracle } from "../../lib/entities";

export const priceOracle = (): PriceOracle => {
  return {
    calculateRouterFulfillFee,
    calculateRouterPrepareFee,
  };
};
