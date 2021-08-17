import { TAddress, TChainId, TDecimalString } from "@connext/nxtp-utils";
import { Static, Type } from "@sinclair/typebox";

export const RemoveLiquidityRequestSchema = Type.Object({
  recipientAddress: Type.Optional(TAddress),
  chainId: TChainId,
  assetId: TAddress,
  amount: TDecimalString,
});
export type RemoveLiquidityRequest = Static<typeof RemoveLiquidityRequestSchema>;

export const RemoveLiquidityResponseSchema = Type.Object({
  transactionHash: Type.String(),
});
export type RemoveLiquidityResponse = Static<typeof RemoveLiquidityResponseSchema>;
