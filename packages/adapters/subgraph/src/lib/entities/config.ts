import { Type, Static } from "@sinclair/typebox";

export const SubgraphMeshOptionSchema = Type.Object({
  domain: Type.String(),
  prefix: Type.String(),
});

export const SubgraphMapSchema = Type.Object({
  sources: Type.Record(Type.String(), SubgraphMeshOptionSchema),
  supported: Type.Record(Type.String(), Type.Boolean()),
});

export type SubgraphMap = Static<typeof SubgraphMapSchema>;
