import { TAddress, TChainId, TDecimalString } from "@connext/nxtp-utils";
import { Static, Type } from "@sinclair/typebox";

export const AdminSchema = Type.Object({
  adminToken: Type.String(),
});
export type AdminRequest = Static<typeof AdminSchema>;

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
