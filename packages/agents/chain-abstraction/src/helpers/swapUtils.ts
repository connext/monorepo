import { UniswapPair, ChainId, UniswapVersion, ETH, UniswapPairSettings } from "simple-uniswap-sdk";
import { AlphaRouter } from "@uniswap/smart-order-router";
import { ethers } from "ethers";
import { CurrencyAmount, Token, TradeType } from "@uniswap/sdk-core";
import { Route, Trade, TokenAmount, Token as _Token, Pair } from "@uniswap/sdk";

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
      tokenPath: routes.route[0].tokenPath,
      route: routes.route[0].route,
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

    const tokenIn = new _Token(chainId, fromTokenContractAddress, fromTokenDecimal ?? 18);
    const tokenOut = new _Token(chainId, toTokenContractAddress, toTokenDecimal ?? 18);

    const pair = new Pair(new TokenAmount(tokenIn, amount), new TokenAmount(tokenOut, amount));

    const route = new Route([pair], tokenIn);
    const trade = new Trade(route, new TokenAmount(tokenIn, amount), TradeType.EXACT_INPUT);

    console.log(route.path);
    console.log(trade.outputAmount);

    return {
      quote: trade.outputAmount,
      tokenPath: route.path,
      route: "V2",
    };

    // const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // USDC token address on Ethereum mainnet
    // const daiAddress = "0x6b175474e89094c44da98b954eedeac495271d0f"; // DAI token address on Ethereum mainnet
    // const dai = await Fetcher.fetchTokenData(chainId, daiAddress);
    // console.log(dai, "dai");
    // const usdc = await Fetcher.fetchTokenData(chainId, usdcAddress);

    // // Specify the amount you want to swap (in USDC decimals)
    // const amountIn = "1000000"; // 1 USDC (6 decimal places)

    // const startToken = usdc;
    // const endToken = dai;

    // // Fetch pair data
    // const pair = await Fetcher.fetchPairData(startToken, endToken);

    // // Construct route
    // const route = new Route([pair], startToken);

    // // Construct trade
    // const trade = new Trade(route, new TokenAmount(startToken, amountIn), TradeType.EXACT_INPUT);

    // console.log(route.path);
  } catch (err) {
    console.log(err);
    throw Error(err as string);
  }
};
