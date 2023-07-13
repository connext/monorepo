import { AlphaRouter, V3RouteWithValidQuote } from "@uniswap/smart-order-router";
import { ethers } from "ethers";
import { CurrencyAmount, Token, TradeType } from "@uniswap/sdk-core";
import { Route, Trade, Token as _Token, Fetcher, TokenAmount, Pair } from "@uniswap/sdk";
import { encodeRouteToPath } from "@uniswap/v3-sdk";
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

    const route = routes?.route[0] as V3RouteWithValidQuote;
    const path = encodeRouteToPath(route.route, false);

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
