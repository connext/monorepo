import { Type, Static } from "@sinclair/typebox";

export const SubgraphMeshOptionSchema = Type.Object({
  domain: Type.String(),
  prefix: Type.String(),
});

export const SubgraphMapSchema = Type.Object({
  sources: Type.Record(Type.String(), SubgraphMeshOptionSchema),
});

export type SubgraphMap = Static<typeof SubgraphMapSchema>;
