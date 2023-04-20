export type SwapDataCallbackArgs = {
  fromAsset: string;
  toAsset: string;
  amountIn: string;
  slippage: string;
  additions?: any;
};
export type SwapDataCallback = (args: SwapDataCallbackArgs) => Promise<string>;

/**
 * Returns the `swapData` which will be used as the low-level calldata
 * including a function signature for any univ2 DEXes.
 */
export const getSwapDataForUniV2 = async (args: SwapDataCallbackArgs): Promise<string> => {
  throw new Error("ToDo");
};

/**
 * Returns the `swapData` which will be used as the low-level calldata
 * including a function signature for any univ3 DEXes.
 */
export const getSwapDataForUniV3 = async (args: SwapDataCallbackArgs): Promise<string> => {
  throw new Error("ToDo");
};

/**
 * Returns the `swapData` which will be used as the low-level calldata
 * including a function signature for the 1inch aggregator.
 */
export const getSwapDataForOneInch = async (args: SwapDataCallbackArgs): Promise<string> => {
  throw new Error("ToDo");
};
