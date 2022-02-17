import Redis from "ioredis";

import { RedisUpdate, SubgraphMap } from "../entities";
import { FallbackSubgraph, SubgraphDomain } from "@connext/nxtp-utils";
import { getRuntimeSdk, RuntimeSdk } from "../../adapters";

export const redisUpdate = async (config: RedisUpdate): Promise<void> => {
  const { redisInstance } = config;
};

export const addAndUpdateTransactions = async (subgraphs: SubgraphMap, redis: Redis.Redis) => {
  const { transactions } = await getPreparedTransactions;

  redis.save();
};
