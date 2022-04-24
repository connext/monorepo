import { Type, Static } from "@sinclair/typebox";

export const SubgraphMeshOptionSchema = Type.Object({
  domain: Type.String(),
  prefix: Type.String(),
});

export const SubgraphReaderConfigSchema = Type.Object({
  sources: Type.Record(Type.String(), SubgraphMeshOptionSchema),
});

export type SubgraphReaderConfig = Static<typeof SubgraphReaderConfigSchema>;
