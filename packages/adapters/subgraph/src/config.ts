import { Type, Static } from "@sinclair/typebox";
import { TIntegerString } from "@connext/nxtp-utils";

const MIN_SUBGRAPH_MAX_LAG = 25;

export const TChainConfig = Type.Object({
  subgraph: Type.Object({
    analytics: Type.Array(Type.String()), // Analytics subgraph uri(s).
    runtime: Type.Array(Type.String()), // Runtime subgraph uri(s).
    maxLag: Type.Integer({ minimum: MIN_SUBGRAPH_MAX_LAG }), // If subgraph is out of sync by this number, will not process actions.
  }),
});

export type ChainConfig = Static<typeof TChainConfig>;

export const ReadSubgraphConfigSchema = Type.Object({
  chains: Type.Record(TIntegerString, TChainConfig),
});

export type ReadSubgraphConfig = Static<typeof ReadSubgraphConfigSchema>;
