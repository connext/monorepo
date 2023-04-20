import { Type, Static } from "@sinclair/typebox";
import { TAddress, TIntegerString } from "@connext/nxtp-utils";

export const XReceiveTarget = {
  MidasProtocol: "MidasProcotol",
  MeanFinance: "MeanFinance",
  Instadapp: "Instadapp",
  XSwapAndGreet: "XSwapAndGreet",
} as const;
export type XReceiveTarget = (typeof XReceiveTarget)[keyof typeof XReceiveTarget];

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

export const MidasProtocolForwardCallDataSchema = Type.Object({});
export type MidasForwardCallData = Static<typeof MidasProtocolForwardCallDataSchema>;

export const MeanFinanceForwardCallDataSchema = Type.Object({});
export type MeanFinanceForwardCallData = Static<typeof MeanFinanceForwardCallDataSchema>;

export const InstadappForwardCallDataSchema = Type.Object({});
export type InstadappForwardCallData = Static<typeof InstadappForwardCallDataSchema>;
