import Redis from "ioredis";

export type RedisUpdate = {
  redisInstance: Redis.Redis;
  PollPeriod: number;
};

export * from "./channels";
export * from "./config";
export * from "./cache";
