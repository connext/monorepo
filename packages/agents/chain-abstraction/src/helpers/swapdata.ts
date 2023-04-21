export type OriginSwapDataCallbackArgs = {
  fromAsset: string;
  toAsset: string;
  amountIn: string;
  additions?: any;
};
export type OriginSwapDataCallback = (args: OriginSwapDataCallbackArgs) => Promise<string>;

// ==================================== ORIGIN SIDE ==================================== //
/**
 * Returns the `swapData` which will be used as the low-level calldata
 * including a function signature for any univ2 DEXes.
 */
export const getOriginSwapDataForUniV2 = async (args: OriginSwapDataCallbackArgs): Promise<string> => {
  throw new Error("ToDo");
};

/**
 * Returns the `swapData` which will be used as the low-level calldata
 * including a function signature for any univ3 DEXes.
 */
export const getOriginSwapDataForUniV3 = async (args: OriginSwapDataCallbackArgs): Promise<string> => {
  throw new Error("ToDo");
};

/**
 * Returns the `swapData` which will be used as the low-level calldata
 * including a function signature for the 1inch aggregator.
 */
export const getOriginSwapDataForOneInch = async (args: OriginSwapDataCallbackArgs): Promise<string> => {
  throw new Error("ToDo");
};

// ==================================== DESTINATION SIDE ==================================== //
/**
 * Returns the `swapData` which will be used on the destination univ2 swapper
 */
export const getDestinationSwapDataForUniV2 = async (args: any): Promise<string> => {
  throw new Error("ToDo");
};

/**
 * Returns the `swapData` which will be used on the destination univ3 swapper
 */
export const getDestinationSwapDataForUniV3 = async (args: any): Promise<string> => {
  throw new Error("ToDo");
};

/**
 * Returns the `swapData` which will be used on the destination 1inch swapper
 */
export const getDestinationSwapDataForOneInch = async (args: any): Promise<string> => {
  throw new Error("ToDo");
};
