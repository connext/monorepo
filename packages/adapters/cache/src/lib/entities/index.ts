import Redis from "ioredis";

export type RedisUpdate = {
  redisInstance: Redis.Redis;
  PollPeriod: number;
};

export * from "./cache";
export * from "./config";
