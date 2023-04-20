import { getSwapDataForUniV2, getSwapDataForUniV3, getSwapDataForOneInch } from "./swapdata";
import { getSwapperForUniV2, getSwapperForUniV3, getSwapperForOneInch } from "./swapper";
export * from "./abis";

export type SwapperCallback = (domainId: string) => Promise<string>;

export type SwapDataCallbackArgs = {
  fromAsset: string;
  toAsset: string;
  amountIn: string;
  additions?: any;
};
export type SwapDataCallback = (args: SwapDataCallbackArgs) => Promise<string>;

export const SwapperMapping: Record<string, { swapData: SwapDataCallback; swapper: SwapperCallback }> = {
  univ2: { swapper: getSwapperForUniV2, swapData: getSwapDataForUniV2 },
  univ3: { swapper: getSwapperForUniV3, swapData: getSwapDataForUniV3 },
  oneinch: { swapper: getSwapperForOneInch, swapData: getSwapDataForOneInch },
};
