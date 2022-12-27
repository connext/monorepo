import { Type, Static } from "@sinclair/typebox";

export const SubgraphMeshOptionSchema = Type.Object({
  domain: Type.String(),
  prefix: Type.String(),
});

export const AssetIdSchema = Type.Object({
  symbol: Type.String(),
  mainnetEquivalent: Type.Optional(Type.String()),
  decimals: Type.Optional(Type.Number()),
});
export type AssetId = Static<typeof AssetIdSchema>;

// all keyed on domainid
export const SubgraphMapSchema = Type.Object({
  sources: Type.Record(Type.String(), SubgraphMeshOptionSchema),
  // internally assetids keyed on token address
  assetId: Type.Record(Type.String(), Type.Record(Type.String(), AssetIdSchema)),
  supported: Type.Record(Type.String(), Type.Boolean()),
});

export type SubgraphMap = Static<typeof SubgraphMapSchema>;
