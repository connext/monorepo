import { createTypedData } from "./shared";

export const createTypedDataFns: Record<string, any> = {
  nextUSDC: createTypedData,
  USDC: createTypedData,
};
