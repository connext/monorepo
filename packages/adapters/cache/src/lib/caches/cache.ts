import { Logger } from "@connext/nxtp-utils";
import Redis from "ioredis";

import { CacheParams } from "../entities";

/**
 * @classdesc Manages storage, updates, and retrieval of a set of data determined by use-case.
 */
export abstract class Cache {
  protected readonly data!: Redis;
  protected readonly logger: Logger;

  constructor({ host, port, mock, logger }: CacheParams) {
    this.logger = logger;
    if (mock) {
      const IoRedisMock = require("ioredis-mock");
      this.data = new IoRedisMock();
    } else {
      this.data = new Redis({
        host: host,
        port: port,
        connectTimeout: 17000,
        maxRetriesPerRequest: 4,
        retryStrategy: (times) => Math.min(times * 30, 1000),
      });
    }
  }

  /**
   * Flushes the entire cache.
   *
   * @returns string "OK"
   */
  public async clear(): Promise<"OK"> {
    return await this.data.flushall();
  }
}
