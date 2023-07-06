import { AlphaRouter } from "@uniswap/smart-order-router";
import { ethers } from "ethers";
import { CurrencyAmount, Token, TradeType } from "@uniswap/sdk-core";
import { Route, Trade, Token as _Token, Fetcher, TokenAmount, Pair } from "@uniswap/sdk";
import { FeeAmount } from "@uniswap/v3-sdk";
import {
  Fetcher as PancakeFetcher,
  Trade as PancakeTrade,
  Token as PancakeToken,
  Route as PancakeRoute,
  CurrencyAmount as PancakeCurrencyAmount,
} from "@pancakeswap/sdk";

type SwapPathCallBackArgs = {
  fromTokenContractAddress: string;
  toTokenContractAddress: string;
  signerAddress: string;
  chainId: number;
  rpc: string;
  amount: string;
  fromTokenDecimal?: number;
  toTokenDecimal?: number;
};

export type DestinationSwapPathCallback = (args: SwapPathCallBackArgs) => Promise<any>;

const FEE_SIZE = 3;

export function encodePath(path: string[], fees: FeeAmount[]): string {
  if (path.length != fees.length + 1) {
    throw new Error("path/fee lengths do not match");
  }

  let encoded = "0x";
  for (let i = 0; i < fees.length; i++) {
    // 20 byte encoding of the address
    encoded += path[i].slice(2);
    // 3 byte encoding of the fee
    encoded += fees[i].toString(16).padStart(2 * FEE_SIZE, "0");
  }
  // encode the final token
  encoded += path[path.length - 1].slice(2);

  return encoded.toLowerCase();
}

/**
 * Returns the `path` from the uniswap v3 router.
 */
export const getSwapPathForUniV3 = async (_args: SwapPathCallBackArgs) => {
  try {
    const { fromTokenContractAddress, toTokenContractAddress, chainId, rpc, fromTokenDecimal, toTokenDecimal, amount } =
      _args;
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const tokenIn = new Token(chainId, fromTokenContractAddress, fromTokenDecimal ?? 18);
    const tokenOut = new Token(chainId, toTokenContractAddress, toTokenDecimal ?? 18);
    const amountIn = CurrencyAmount.fromRawAmount(tokenIn, +amount);

    const router = new AlphaRouter({
      chainId,
      provider,
    });

    const routes = await router.route(amountIn, tokenOut, TradeType.EXACT_INPUT);

    if (!routes) {
      throw Error("No routes found for given Pair");
    }

    const tokenPathAddress = routes?.route[0].tokenPath.map((tokenPath) => tokenPath.address);

    const feeAmount = [];

    for (let i = 0; i < tokenPathAddress.length - 1; i++) {
      feeAmount.push(FeeAmount.MEDIUM);
    }

    const path = encodePath(tokenPathAddress, feeAmount);

    return {
      quote: routes.quote,
      tokenPath: path,
      route: routes.route[0].route.protocol,
    };
  } catch (err: unknown) {
    throw Error(`getSwapPathForUniV3: Failed to get paths ${(err as Error).message}`);
  }
};

/**
 * Returns the `path` from the uniswap v2 router.
 */
export const getSwapPathForUniV2 = async (_args: SwapPathCallBackArgs) => {
  try {
    const { fromTokenContractAddress, toTokenContractAddress, chainId, rpc, fromTokenDecimal, toTokenDecimal, amount } =
      _args;

    const provider = new ethers.providers.JsonRpcProvider(rpc);

    const tokenIn = new _Token(chainId, fromTokenContractAddress, fromTokenDecimal ?? 18);
    const tokenOut = new _Token(chainId, toTokenContractAddress, toTokenDecimal ?? 18);
    const amountIn = new TokenAmount(tokenIn, ethers.utils.parseUnits(amount, fromTokenDecimal).toString());

    const pair: Pair = await Fetcher.fetchPairData(tokenIn, tokenOut, provider);
    const route = new Route([pair], tokenIn);
    const trade = new Trade(route, amountIn, TradeType.EXACT_INPUT);

    return {
      quote: trade.outputAmount.toSignificant(),
      tokenPath: route.path.map((token) => token.address),
      route: "V2",
    };
  } catch (err: unknown) {
    throw Error(err as string);
  }
};

export const getPathForPanCake = async (_args: SwapPathCallBackArgs) => {
  try {
    const { fromTokenContractAddress, toTokenContractAddress, chainId, fromTokenDecimal, toTokenDecimal, amount } =
      _args;
    const tokenIn = new PancakeToken(chainId, fromTokenContractAddress as `0x${string}`, fromTokenDecimal ?? 18, "");

    const tokenOut = new PancakeToken(chainId, toTokenContractAddress as `0x${string}`, toTokenDecimal ?? 18, "");
    const pair = await PancakeFetcher.fetchPairData(tokenIn, tokenOut);

    const amountIn = PancakeCurrencyAmount.fromRawAmount(tokenIn, amount);
    const route = new PancakeRoute([pair], tokenIn, tokenOut);
    const trade = new PancakeTrade(route, amountIn, TradeType.EXACT_INPUT);
    return {
      quote: trade.outputAmount.toSignificant(),
      tokenPath: route.path.map((token) => token.address),
      route: "PANCAKE",
    };
  } catch (err: unknown) {
    throw Error(err as string);
  }
};
