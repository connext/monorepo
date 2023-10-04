import { constants } from "ethers";
import { defaultAbiCoder } from "ethers/lib/utils";
import { jsonifyError } from "@connext/nxtp-utils";

import { axiosGet } from "../mockable";
import { UniV2SwapperParams, UniV3SwapperParams } from "../types";

export type OriginSwapDataCallbackArgs = {
  chainId: number;
  fromAsset: string;
  toAsset: string;
  amountIn: string;
  fromAddress: string;
  config?:
    | {
        customURL: string;
        apiKey?: string;
      }
    | {
        customURL?: undefined;
        apiKey: string;
      };
  slippage?: number;
};
export type OriginSwapDataCallback = (args: OriginSwapDataCallbackArgs) => Promise<string>;
export type DestinationSwapDataCallback = (args: any, path?: any) => Promise<string>;

// ==================================== ORIGIN SIDE ==================================== //
/**
 * Returns the `swapData` which will be used as the low-level calldata
 * including a function signature for any univ2 DEXes.
 */
export const getOriginSwapDataForUniV2 = async (_args: OriginSwapDataCallbackArgs): Promise<string> => {
  throw new Error("ToDo");
};

/**
 * Returns the `swapData` which will be used as the low-level calldata
 * including a function signature for any univ3 DEXes.
 */
export const getOriginSwapDataForUniV3 = async (_args: OriginSwapDataCallbackArgs): Promise<string> => {
  throw new Error("ToDo");
};

/**
 * Returns the `swapData` which will be used as the low-level calldata
 * including a function signature for the 1inch aggregator.
 */
export const getOriginSwapDataForOneInch = async (args: OriginSwapDataCallbackArgs): Promise<string> => {
  if (!args.config) throw new Error("No Authorization config provided for 1Inch.");
  if (!args.config.apiKey && !args.config.customURL) throw new Error("No API key or custom URL passed for One Inch");
  const fromAsset =
    args.fromAsset == constants.AddressZero ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" : args.fromAsset;
  const toAsset = args.toAsset == constants.AddressZero ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" : args.toAsset;
  try {
    const slippage = args.slippage ?? 1;
    const { config } = args;

    const url = config.customURL ?? "https://api.1inch.dev/swap/v5.2";

    const apiEndpoint =
      `${url}/${args.chainId}/swap` +
      `?src=${fromAsset}` +
      `&dst=${toAsset}` +
      `&amount=${args.amountIn}` +
      `&from=${args.fromAddress}` +
      `&slippage=${slippage}` +
      `&disableEstimate=true`;

    const headers: Record<string, string> = {
      accept: "application/json",
    };
    if (config.apiKey) {
      headers["Authorization"] = `Bearer ${config.apiKey}`;
    }

    const res = await axiosGet(apiEndpoint, { headers: headers });
    return res.data.tx.data;
  } catch (error: unknown) {
    throw new Error(`Getting swapdata from 1inch failed, e: ${jsonifyError(error as Error).message}`);
  }
};

// ==================================== DESTINATION SIDE ==================================== //
/**
 * Returns the `swapData` which will be used on the destination univ2 swapper
 */
export const getDestinationSwapDataForUniV2 = async (_args: any, path?: any): Promise<string> => {
  const args = _args as UniV2SwapperParams;
  return path
    ? defaultAbiCoder.encode(["uint256", "address[]"], [args.amountOutMin, path])
    : defaultAbiCoder.encode(["uint256"], [args.amountOutMin]);
};

/**
 * Returns the `swapData` which will be used on the destination univ3 swapper
 */
export const getDestinationSwapDataForUniV3 = async (_args: any, path?: any): Promise<string> => {
  const args = _args as UniV3SwapperParams;
  if (!path) return defaultAbiCoder.encode(["uint24", "uint256"], [args.poolFee, args.amountOutMin]);
  return defaultAbiCoder.encode(["uint256", "bytes"], [args.amountOutMin, path]);
};

/**
 * Returns the `swapData` which will be used on the destination 1inch swapper
 */
export const getDestinationSwapDataForOneInch = async (_args: any): Promise<string> => {
  throw new Error("ToDo");
};
