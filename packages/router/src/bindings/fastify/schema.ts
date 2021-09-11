import { TAddress, TChainId, TDecimalString, TBytes32 } from "@connext/nxtp-utils";
import { Static, Type } from "@sinclair/typebox";

export const AdminSchema = Type.Object({
  adminToken: Type.String(),
});
export type AdminRequest = Static<typeof AdminSchema>;

export const RemoveLiquidityRequestSchema = Type.Intersect([
  AdminSchema,
  Type.Object({
    recipientAddress: Type.Optional(TAddress),
    chainId: TChainId,
    assetId: TAddress,
    amount: TDecimalString,
  }),
]);
export type RemoveLiquidityRequest = Static<typeof RemoveLiquidityRequestSchema>;

export const RemoveLiquidityResponseSchema = Type.Object({
  transactionHash: Type.String(),
});
export type RemoveLiquidityResponse = Static<typeof RemoveLiquidityResponseSchema>;

export const CancelSenderTransferRequestSchema = Type.Intersect([
  AdminSchema,
  Type.Object({
    transactionId: TBytes32,
    senderChainId: TChainId,
    user: TAddress,
  }),
]);
export type CancelSenderTransferRequest = Static<typeof CancelSenderTransferRequestSchema>;
