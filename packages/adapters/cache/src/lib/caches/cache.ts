import Redis from "ioredis";
import { Logger } from "@connext/nxtp-utils";

import { CacheParams } from "../entities";

/**
 * @classdesc Manages storage, updates, and retrieval of a set of data determined by use-case.
 */
export abstract class Cache {
  protected readonly data!: Redis.Redis;
  protected readonly logger: Logger;

  constructor({ host, port, mock, logger }: CacheParams) {
    this.logger = logger;
    if (mock) {
      const IoRedisMock = require("ioredis-mock");
      this.data = new IoRedisMock();
    } else {
      this.data = new Redis({
        port: port,
        host: host,
      });
    }
  }
}
