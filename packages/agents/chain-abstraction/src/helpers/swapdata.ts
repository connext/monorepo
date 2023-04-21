import { defaultAbiCoder } from "ethers/lib/utils";

import { UniV2SwapperParams, UniV3SwapperParams } from "../types";

export type OriginSwapDataCallbackArgs = {
  fromAsset: string;
  toAsset: string;
  amountIn: string;
  additions?: any;
};
export type OriginSwapDataCallback = (args: OriginSwapDataCallbackArgs) => Promise<string>;
export type DestinationSwapDataCallback = (args: any) => Promise<string>;

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
export const getDestinationSwapDataForUniV2 = async (_args: any): Promise<string> => {
  const args = _args as UniV2SwapperParams;
  return defaultAbiCoder.encode(["uint256"], [args.amountOutMin]);
};

/**
 * Returns the `swapData` which will be used on the destination univ3 swapper
 */
export const getDestinationSwapDataForUniV3 = async (_args: any): Promise<string> => {
  const args = _args as UniV3SwapperParams;
  return defaultAbiCoder.encode(["uint24", "uint256"], [args.poolFee, args.amountOutMin]);
};

/**
 * Returns the `swapData` which will be used on the destination 1inch swapper
 */
export const getDestinationSwapDataForOneInch = async (_args: any): Promise<string> => {
  throw new Error("ToDo");
};
