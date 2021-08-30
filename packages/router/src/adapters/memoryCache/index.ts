import { Cache } from "../../lib/entities";

import { getOutstandingLiquidity, storeOutstandingLiquidity, removeOutstandingLiquidity } from "./cache";

export const getCache = async (): Promise<Cache> => {
  return {
    getOutstandingLiquidity,
    storeOutstandingLiquidity,
    removeOutstandingLiquidity,
  };
};
