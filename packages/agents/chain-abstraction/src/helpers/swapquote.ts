import { constants, utils } from "ethers";
import { domainToChainId, jsonifyError } from "@connext/nxtp-utils";

import { axiosGet, getContract, JsonRpcProvider } from "../mockable";
import { Swapper } from "../types";
import { getPoolFeeForUniV3 } from "../libs";

import { UniV2RouterABI, UniV3QuoterABI } from "./abis";
import { DEPLOYED_ADDRESSES } from "./address";

import { SwapQuoteFns, OriginSwapperPerDomain } from ".";
import { create, SdkConfig } from "@connext/sdk";

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

export type EstimateQuoteAmountArgs = {
  originDomain: number;
  destinationDomain: number;
  originRpc: string;
  destinationRpc: string;
  fromAsset: string;
  toAsset: string;
  underlyingAsset?: string;
  amountIn: string;
  swapper: string;
  signerAddress: string;
  fee?: string;
  originDecimals?: number;
  destinationDecimals?: number;
};

export type SwapQuoteCallback = (args: SwapQuoteCallbackArgs) => Promise<string>;

/**
 * Returns the `amountOut` from the uniswap v2 router
 */
export const getSwapQuoteForUniV2 = async (_args: SwapQuoteCallbackArgs): Promise<string> => {
  const { amountIn, quoter, rpc, fromAsset, toAsset } = _args;
  const rpcProvider = new JsonRpcProvider(rpc);
  const v2RouterContract = getContract(quoter, UniV2RouterABI, rpcProvider);
  const res = await v2RouterContract.getAmountsOut(amountIn, [fromAsset, toAsset]);
  return res[1].toString();
};

/**
 * Returns the `amountOut` from the uniswap v3 quoter
 */
export const getSwapQuoteForUniV3 = async (_args: SwapQuoteCallbackArgs): Promise<string> => {
  const { amountIn, quoter, rpc, fromAsset, toAsset, fee, sqrtPriceLimitX96: _sqrtPriceLimitX96 } = _args;
  const rpcProvider = new JsonRpcProvider(rpc);
  const v3QuoterV2Contract = getContract(quoter, UniV3QuoterABI, rpcProvider);

  const res = await v3QuoterV2Contract.callStatic.quoteExactInputSingle({
    tokenIn: fromAsset,
    tokenOut: toAsset,
    amountIn,
    fee,
    sqrtPriceLimitX96: _sqrtPriceLimitX96 ?? 0,
  });
  return res[0].toString();
};

/**
 * Returns the `amountOut` from the 1inch aggregator
 */
export const getSwapQuoteForOneInch = async (args: SwapQuoteCallbackArgs): Promise<string> => {
  const fromAsset =
    args.fromAsset == constants.AddressZero ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" : args.fromAsset;
  const toAsset = args.toAsset == constants.AddressZero ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" : args.toAsset;
  try {
    const apiEndpoint = `https://api.1inch.io/v5.0/${args.chainId}/quote?fromTokenAddress=${fromAsset}&toTokenAddress=${toAsset}&amount=${args.amountIn}`;

    const res = await axiosGet(apiEndpoint);
    return res.data.toTokenAmount;
  } catch (error: unknown) {
    throw new Error(`Getting quote from 1inch failed, e: ${jsonifyError(error as Error).message}`);
  }
};

const initCoreSDK = (
  signerAddress: string,
  originDomain: number,
  destinationDomain: number,
  originRPC: string,
  destinationRPC: string,
) => {
  const domainConfig: { [domainId: string]: { providers: string[] } } = {};
  domainConfig[originDomain.toString()] = { providers: [originRPC] };
  domainConfig[destinationDomain.toString()] = { providers: [destinationRPC] };

  const sdkConfig: SdkConfig = {
    signerAddress,
    network: "mainnet", // can change it to testnet as well
    chains: domainConfig,
  };

  return sdkConfig;
};

export const getEstimateAmountRecieved = async (args: EstimateQuoteAmountArgs): Promise<string> => {
  const {
    originDomain,
    destinationDomain,
    originRpc,
    destinationRpc,
    fromAsset,
    toAsset,
    amountIn,
    fee,
    swapper,
    signerAddress,
    originDecimals,
    destinationDecimals,
  } = args;
  // checking the swapper

  const originChainID = domainToChainId(originDomain);
  const destinationChainID = domainToChainId(destinationDomain);

  const swapFunction = SwapQuoteFns[swapper];

  // just check for the swap

  const originQuoterConfig = OriginSwapperPerDomain[originDomain.toString()];
  const destinationQuoterConfig = OriginSwapperPerDomain[destinationDomain.toString()];

  const originUnderlyingAsset = DEPLOYED_ADDRESSES.USDCAddress[originDomain.toString()];
  const destinationUnderlyingAsset = DEPLOYED_ADDRESSES.USDCAddress[destinationDomain.toString()];
  const _toAsset = originUnderlyingAsset; // origin Side
  try {
    let _fee = fee;
    if (swapper === Swapper.UniV3 && !_fee) {
      _fee = await getPoolFeeForUniV3(
        originDomain.toString(),
        originRpc,
        utils.getAddress(fromAsset),
        utils.getAddress(_toAsset),
      );
    }

    const args: SwapQuoteCallbackArgs = {
      chainId: originChainID,
      quoter: signerAddress,
      rpc: originRpc,
      fromAsset,
      toAsset: _toAsset, // fix need here
      amountIn,
      fee: _fee,
    };

    // Step 1: Calculate amountOut after origin swaps

    const originSwapAmountOut = await swapFunction(args);
    if (originDomain === destinationDomain) return originSwapAmountOut;

    // initing the core sdk for calculating amount recieved after bridging
    const sdkConfig = initCoreSDK(signerAddress, originDomain, destinationDomain, originRpc, destinationRpc);

    const { sdkBase } = await create(sdkConfig);

    // Step 2: Calculate amount after bridge.
    const { amountReceived } =
      (await sdkBase.calculateAmountReceived(
        originDomain.toString(),
        destinationDomain.toString(),
        _toAsset,
        originSwapAmountOut,
      )) || {};

    if (!amountReceived) {
      throw Error("Failed to fetch estimate bridging amountOut");
    }

    if (toAsset === destinationUnderlyingAsset) return amountReceived.toString();

    // check for the destination swaps quote
    // Step 3: Calculate amount after destination swap
    const destinationArgs: SwapQuoteCallbackArgs = {
      chainId: destinationChainID,
      quoter: destinationQuoterConfig.quoter,
      rpc: destinationRpc,
      amountIn: amountReceived.toString(),
      fromAsset: destinationUnderlyingAsset,
      toAsset,
      fee,
    };

    const amountOut = await swapFunction(destinationArgs);
    return amountOut;
  } catch (err: unknown) {
    throw Error(`Failed to swap with Error: ${jsonifyError(err as Error).message}`);
  }
};
