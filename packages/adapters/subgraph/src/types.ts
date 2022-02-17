import { FallbackSubgraph } from "@connext/nxtp-utils";
import Redis from "ioredis";

import { Sdk } from "./runtime/graphqlsdk";

export type ChainSubgraphs = {
  runtime: FallbackSubgraph<Sdk>;
};

export type SubgraphMap = Map<number, ChainSubgraphs>;

export type RedisUpdate = {
  redisInstance: Redis.Redis;
  PollPeriod: number;
};
