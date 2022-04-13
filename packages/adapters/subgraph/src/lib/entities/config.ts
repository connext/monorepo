import { Type, Static } from "@sinclair/typebox";
import { FallbackSubgraph } from "@connext/nxtp-utils";

import { RuntimeSdk } from "../subgraphs";

const MIN_SUBGRAPH_MAX_LAG = 25;

export type ChainSubgraphs = {
  runtime: FallbackSubgraph<RuntimeSdk>;
};

export type SubgraphMap = Map<string, ChainSubgraphs>;

export const SubgraphReaderChainConfigSchema = Type.Object({
  analytics: Type.Array(
    Type.Object({
      query: Type.String(),
      health: Type.String(),
    }),
  ), // Analytics subgraph uri(s).
  runtime: Type.Array(
    Type.Object({
      query: Type.String(),
      health: Type.String(),
    }),
  ), // Runtime subgraph uri(s).
  maxLag: Type.Integer({ minimum: MIN_SUBGRAPH_MAX_LAG }), // If subgraph is out of sync by this number, will not process actions.
});

export const SubgraphReaderConfigSchema = Type.Object({
  chains: Type.Record(Type.String(), SubgraphReaderChainConfigSchema),
});

export type SubgraphReaderConfig = Static<typeof SubgraphReaderConfigSchema>;
