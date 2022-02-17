import { FallbackSubgraph } from "@connext/nxtp-utils";
import { Sdk } from "../../runtime/graphqlsdk";
import Redis from "ioredis";

export type ChainSubgraphs = {
  runtime: FallbackSubgraph<Sdk>;
};

export type SubgraphMap = Map<number, ChainSubgraphs>;

export type RedisUpdate = {
  redisInstance: Redis.Redis;
  PollPeriod: number;
};

export * from "./config";
