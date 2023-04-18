import { Type, Static } from "@sinclair/typebox";
import { TAddress, TIntegerString } from "@connext/nxtp-utils";

export const XReceiveTarget = {
  MidasProtocol: "MidasProcotol",
  MeanFinance: "MeanFinance",
  Instadapp: "Instadapp",
  XSwapAndGreet: "XSwapAndGreet",
} as const;
export type XReceiveTarget = (typeof XReceiveTarget)[keyof typeof XReceiveTarget];

export const SwapAndXCallParamsSchema = Type.Object({
  originDomain: TIntegerString,
  destinationDomain: TIntegerString,
  fromAsset: TAddress,
  toAsset: TAddress,
  amountIn: TIntegerString,
  to: Type.String(),
  target: Type.Enum(XReceiveTarget),
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
