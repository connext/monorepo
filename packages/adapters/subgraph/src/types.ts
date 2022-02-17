import { Type, Static } from "@sinclair/typebox";
import { TIntegerString } from "@connext/nxtp-utils";
import { FallbackSubgraph } from "@connext/nxtp-utils";
import Redis from "ioredis";

import { Sdk } from "./runtime/graphqlsdk";

const MIN_SUBGRAPH_MAX_LAG = 25;

export type ChainSubgraphs = {
  runtime: FallbackSubgraph<Sdk>;
};

export type SubgraphMap = Map<number, ChainSubgraphs>;

export type RedisUpdate = {
  redisInstance: Redis.Redis;
  PollPeriod: number;
};

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
