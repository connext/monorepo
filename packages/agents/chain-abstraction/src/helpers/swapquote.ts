import { constants, providers } from "ethers";
import { jsonifyError } from "@connext/nxtp-utils";

import { axiosGet, getContract } from "../mockable";

import { UniV2RouterABI, UniV3QuoterABI } from "./abis";

export type SwapQuoteCallbackArgs = {
  chainId: number;
  quoter: string;
  rpc: string;
  fromAsset: string;
  toAsset: string;
  amountIn: string;
  fee?: string;
  sqrtPriceLimitX96?: string;
};
export type SwapQuoteCallback = (args: SwapQuoteCallbackArgs) => Promise<string>;

/**
 * Returns the `amountOut` from the uniswap v2 router
 */
export const getSwapQuoteForUniV2 = async (_args: SwapQuoteCallbackArgs): Promise<string> => {
  const { amountIn, quoter, rpc, fromAsset, toAsset } = _args;
  const rpcProvider = new providers.JsonRpcProvider(rpc);
  const v2RouterContract = getContract(quoter, UniV2RouterABI, rpcProvider);
  return (await v2RouterContract.getAmountsOut(amountIn, [fromAsset, toAsset])).toString();
};

/**
 * Returns the `amountOut` from the uniswap v3 quoter
 */
export const getSwapQuoteForUniV3 = async (_args: SwapQuoteCallbackArgs): Promise<string> => {
  const { amountIn, quoter, rpc, fromAsset, toAsset, fee, sqrtPriceLimitX96: _sqrtPriceLimitX96 } = _args;
  const rpcProvider = new providers.JsonRpcProvider(rpc);
  const v3QuoterV2Contract = getContract(quoter, UniV3QuoterABI, rpcProvider);

  return (
    await v3QuoterV2Contract.quoteExactInputSingle({
      tokenIn: fromAsset,
      tokenOut: toAsset,
      amountIn,
      fee,
      sqrtPriceLimitX96: _sqrtPriceLimitX96 ?? 0,
    })
  )[0].toString();
};

/**
 * Returns the `amountOut` from the 1inch aggregator
 */
export const getSwapQuoteForOneInch = async (args: SwapQuoteCallbackArgs): Promise<string> => {
  const fromAsset =
    args.fromAsset == constants.AddressZero ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" : args.fromAsset;
  const toAsset = args.toAsset == constants.AddressZero ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" : args.toAsset;
  try {
    const apiEndpoint = `https://api.1inch.io/v5.0/${
      args.chainId
    }/quote?fromTokenAddress=${fromAsset}&toTokenAddress=${toAsset}&amount=${Number(args.amountIn)}`;

    const res = await axiosGet(apiEndpoint);
    return res.data.fromTokenAmount;
  } catch (error: unknown) {
    throw new Error(`Getting quote from 1inch failed, e: ${jsonifyError(error as Error).message}`);
  }
};