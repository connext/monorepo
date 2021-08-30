import RedisClient, { Redis } from "ioredis";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import RedisMock from "ioredis-mock";

import { Cache } from "../../lib/entities";
import { getContext } from "../../router";

import { getOutstandingLiquidity, storeOutstandingLiquidity, removeOutstandingLiquidity } from "./cache";

let redis: Redis;

export const getRedis = (): Redis => redis;

export const getCache = async (): Promise<Cache> => {
  const { config } = getContext();
  if (config.redisUrl) {
    redis = new RedisClient(config.redisUrl);
  } else {
    redis = new RedisMock();
  }

  return {
    getOutstandingLiquidity,
    storeOutstandingLiquidity,
    removeOutstandingLiquidity,
  };
};
