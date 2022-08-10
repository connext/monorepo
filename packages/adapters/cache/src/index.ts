import { Logger } from "@connext/nxtp-utils";

import { TransfersCache, AuctionsCache, ConsumersCache, RoutersCache, TasksCache, LightHouseCache } from "./lib/caches";
import { StoreManagerParams, StoreChannel } from "./lib/entities";

export interface Store {
  readonly transfers: TransfersCache;
  readonly auctions: AuctionsCache;
  readonly consumers: ConsumersCache;
  readonly routers: RoutersCache;
  readonly tasks: TasksCache;
  readonly lighthousetxs: LightHouseCache;
}

/**
 * @classdesc Singleton to handle instantiation of publicly accessible cache adapters. Additionally,
 * provides interface for subscribing to cache events.
 */
export class StoreManager implements Store {
  public static readonly Channel = StoreChannel;
  private static instance: StoreManager | undefined;

  private readonly logger: Logger;

  public readonly transfers: TransfersCache;
  public readonly auctions: AuctionsCache;
  public readonly consumers: ConsumersCache;
  public readonly routers: RoutersCache;
  public readonly tasks: TasksCache;
  public readonly lighthousetxs: LightHouseCache;

  private constructor({ redis, logger, mock }: StoreManagerParams) {
    this.logger = logger;
    const { host, port } = redis ?? {};
    this.transfers = new TransfersCache({
      host,
      port,
      mock: !!mock,
      logger: this.logger.child({ name: "TransfersCache" }),
    });
    this.auctions = new AuctionsCache({
      host,
      port,
      mock: !!mock,
      logger: this.logger.child({ name: "AuctionsCache" }),
    });
    this.routers = new RoutersCache({
      host,
      port,
      mock: !!mock,
      logger: this.logger.child({ name: "RoutersCache" }),
    });
    this.consumers = new ConsumersCache({
      host,
      port,
      mock: !!mock,
      logger: this.logger.child({ name: "ConsumersCache" }),
    });
    this.tasks = new TasksCache({
      host,
      port,
      mock: !!mock,
      logger: this.logger.child({ name: "TasksCache" }),
    });
    this.lighthousetxs = new LightHouseCache({
      host,
      port,
      mock: !!mock,
      logger: this.logger.child({ name: "LightHouseCache" }),
    });
  }

  public getLogger(): Logger {
    return this.logger;
  }

  /**
   * Get the singleton instance used for interfacing with Redis caches.
   * @param params - store manager configuration params
   * @returns StoreManager instance
   */
  public static getInstance(params: StoreManagerParams): StoreManager {
    if (StoreManager.instance) {
      return StoreManager.instance;
    } else {
      const store = new StoreManager(params);
      StoreManager.instance = store;
      return store;
    }
  }
}
export * from "./lib/caches";
