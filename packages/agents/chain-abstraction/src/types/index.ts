import { Type, Static } from "@sinclair/typebox";
import { TAddress, TIntegerString } from "@connext/nxtp-utils";

export const Swapper = {
  UniV2: "UniV2",
  UniV3: "UniV3",
  OneInch: "OneInch",
};
export type Swapper = (typeof Swapper)[keyof typeof Swapper];

export const SwapAndXCallParamsSchema = Type.Object({
  originDomain: TIntegerString,
  destinationDomain: TIntegerString,
  fromAsset: TAddress,
  toAsset: TAddress,
  amountIn: TIntegerString,
  to: Type.String(),
  relayerFeeInNativeAsset: Type.Optional(TIntegerString),
  relayerFeeInTransactingAsset: Type.Optional(TIntegerString),
  delegate: Type.Optional(TAddress),
  slippage: Type.Optional(TIntegerString),
  route: Type.Optional(
    Type.Object({
      swapper: TAddress,
      swapData: Type.String(),
    }),
  ),
  callData: Type.Optional(Type.String()),
});

export type SwapAndXCallParams = Static<typeof SwapAndXCallParamsSchema>;

export const UniV2SwapperParamsSchema = Type.Object({
  amountOutMin: TIntegerString,
});
export type UniV2SwapperParams = Static<typeof UniV2SwapperParamsSchema>;

export const UniV3SwapperParamsSchema = Type.Object({
  poolFee: TIntegerString,
  amountOutMin: TIntegerString,
});
export type UniV3SwapperParams = Static<typeof UniV3SwapperParamsSchema>;

export const DestinationSwapForwarderParamsSchema = Type.Object({
  toAsset: TAddress,
  swapData: Type.Union([UniV2SwapperParamsSchema, UniV3SwapperParamsSchema]), // UniV2SwapperParamsSchema isn't currently supported
});
export type DestinationSwapForwarderParams = Static<typeof DestinationSwapForwarderParamsSchema>;

export const DestinationCallDataParamsSchema = Type.Object({
  fallback: TAddress,
  swapForwarderData: DestinationSwapForwarderParamsSchema,
});
export type DestinationCallDataParams = Static<typeof DestinationCallDataParamsSchema>;

export const SwapQuoteParamsSchema = Type.Object({
  domainId: TIntegerString,
  fromAsset: TAddress,
  toAsset: TAddress,
  amountIn: TIntegerString,
  rpc: Type.String(),
  fee: Type.Optional(TIntegerString),
});
export type SwapQuoteParams = Static<typeof SwapQuoteParamsSchema>;

export const HoneySwapTokenSchema = Type.Object({
  name: Type.String(),
  address: TAddress,
  symbol: Type.String(),
  chainId: Type.Number(),
  logoURI: Type.String(),
});

export type HoneyswapToken = Static<typeof HoneySwapTokenSchema>;

export type UniswapToken = {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  extensions: {
    bridgeInfo: {
      [key: string]: {
        tokenAddress: string;
      };
    };
  };
};

export type Asset = {
  name: string;
  chainId: number;
  symbol: string;
  logoURI: string;
  address: string;
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
  signerAddress: string;
  fee?: string;
  originDecimals?: number;
  destinationDecimals?: number;
};

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

export type coingeckoTokenType = {
  id: string;
  symbol: string;
  name: string;
  platforms: {
    [key: string]: string;
  };
};
