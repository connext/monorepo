import { Type, Static } from "@sinclair/typebox";
import { TAddress, TIntegerString } from "@connext/nxtp-utils";

export const SwapAndXCallParamsSchema = Type.Object({
  originDomain: TIntegerString,
  destinationDomain: TIntegerString,
  fromAsset: TAddress,
  toAsset: TAddress,
  amountIn: TIntegerString,
  to: Type.String(),
  delegate: Type.Optional(TAddress),
  slippage: Type.Optional(TIntegerString),
  swapper: Type.Optional(TAddress),
  swapData: Type.Optional(Type.String()),
  callData: Type.Optional(Type.String()),
});

export type SwapAndXCallParams = Static<typeof SwapAndXCallParamsSchema>;
