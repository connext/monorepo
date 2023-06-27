// import { UniswapPair, ChainId, UniswapVersion, ETH, UniswapPairSettings } from "simple-uniswap-sdk";
import { AlphaRouter } from "@uniswap/smart-order-router";
import { ethers, utils } from "ethers";
import { CurrencyAmount, Token, TradeType } from "@uniswap/sdk-core";
import { Route, Trade, TokenAmount, Token as _Token, Fetcher } from "@uniswap/sdk";
import {
  Fetcher as PancakeFetcher,
  Trade as PancakeTrade,
  ChainId as PancakeChainID,
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
 * Returns the `path` from the uniswap v2 | v3 router.
 * Only works with mainnet
 */
// export const getSwapPathForUniswap = async (_args: SwapPathCallBackArgs) => {
//   const {
//     fromTokenContractAddress,
//     toTokenContractAddress,
//     signerAddress: ethereumAddress,
//     chainId,
//     rpc: providerUrl,
//   } = _args;

//   const uniswapPair = new UniswapPair({
//     fromTokenContractAddress,
//     toTokenContractAddress,
//     ethereumAddress,
//     chainId,
//     providerUrl,
//   });

//   const uniswapPairFactory = await uniswapPair.createFactory();
//   const trade = await uniswapPairFactory.trade("1");

//   return trade;
// };

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
    return {
      quote: routes.quote,
      tokenPath: routes.route[0].tokenPath.map((token) => token.address),
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
    console.log(provider._isProvider);

    const tokenIn = new _Token(chainId, fromTokenContractAddress, fromTokenDecimal ?? 18);
    const tokenOut = new _Token(chainId, toTokenContractAddress, toTokenDecimal ?? 18);
    const amountIn = new TokenAmount(tokenIn, ethers.utils.parseUnits(amount, fromTokenDecimal).toString());

    const pair = await Fetcher.fetchPairData(tokenIn, tokenOut, provider);
    console.log(pair);
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

export const getSwapPathForHoneySwap = async (_args: SwapPathCallBackArgs) => {
  try {
    const { fromTokenContractAddress, toTokenContractAddress, chainId, rpc, fromTokenDecimal, toTokenDecimal, amount } =
      _args;

    const provider = new ethers.providers.JsonRpcProvider(rpc);
    console.log(provider._isProvider);

    const tokenIn = new _Token(chainId, fromTokenContractAddress, fromTokenDecimal ?? 18);
    const tokenOut = new _Token(chainId, toTokenContractAddress, toTokenDecimal ?? 18);
    const amountIn = new TokenAmount(tokenIn, ethers.utils.parseUnits(amount, fromTokenDecimal).toString());

    const pair = await Fetcher.fetchPairData(tokenIn, tokenOut, provider);
    console.log(pair);
    const route = new Route([pair], tokenIn);
    const trade = new Trade(route, amountIn, TradeType.EXACT_INPUT);

    return {
      quote: trade.outputAmount.toSignificant(),
      tokenPath: route.path.map((token) => token.address),
      route: "HONEYSWAP",
    };
  } catch (err: unknown) {
    console.log(err);
    throw Error(err as string);
  }
};

export const getPathForPanCake = async (_args: SwapPathCallBackArgs) => {
  try {
    const { fromTokenContractAddress, toTokenContractAddress, chainId, rpc, fromTokenDecimal, toTokenDecimal, amount } =
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
 