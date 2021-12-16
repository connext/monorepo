import { TAddress, TChainId, TDecimalString, TBytes32 } from "@connext/nxtp-utils";
import { Static, Type } from "@sinclair/typebox";

export const AdminSchema = Type.Object({
  adminToken: Type.String(),
});
export type AdminRequest = Static<typeof AdminSchema>;

export const MigrateLiquidityRequestSchema = Type.Intersect([
  AdminSchema,
  Type.Object({
    chainId: TChainId,
    routerAddress: Type.Optional(TAddress),
    assets: Type.Optional(Type.Array(TAddress)),
  }),
]);
export type MigrateLiquidityRequest = Static<typeof MigrateLiquidityRequestSchema>;

export const MigrateLiquidityResponseSchema = Type.Array(
  Type.Object({
    removeLiquidityTx: Type.Optional(Type.String()),
    addLiquidityForTx: Type.Optional(Type.String()),
    err: Type.Optional(Type.Any()),
  }),
);
export type MigrateLiquidityResponse = Static<typeof MigrateLiquidityResponseSchema>;

export const AddLiquidityForRequestSchema = Type.Intersect([
  AdminSchema,
  Type.Object({
    routerAddress: Type.Optional(TAddress),
    chainId: TChainId,
    assetId: TAddress,
    amount: TDecimalString,
  }),
]);
export type AddLiquidityForRequest = Static<typeof AddLiquidityForRequestSchema>;

export const AddLiquidityForResponseSchema = Type.Object({
  transactionHash: Type.String(),
});
export type AddLiquidityForResponse = Static<typeof AddLiquidityForResponseSchema>;

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
