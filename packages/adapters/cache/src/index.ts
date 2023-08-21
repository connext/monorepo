import { Logger } from "@connext/nxtp-utils";

import { TransfersCache, AuctionsCache, RoutersCache, TasksCache, ExecutorCache, MessagesCache } from "./lib/caches";
import { StoreManagerParams, StoreChannel } from "./lib/entities";

export interface Store {
  readonly transfers: TransfersCache;
  readonly auctions: AuctionsCache;
  readonly routers: RoutersCache;
  readonly tasks: TasksCache;
  readonly executors: ExecutorCache;
  readonly messages: MessagesCache;
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
  public readonly routers: RoutersCache;
  public readonly tasks: TasksCache;
  public readonly executors: ExecutorCache;
  public readonly messages: MessagesCache;

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
    this.tasks = new TasksCache({
      host,
      port,
      mock: !!mock,
      logger: this.logger.child({ name: "TasksCache" }),
    });
    this.executors = new ExecutorCache({
      host,
      port,
      mock: !!mock,
      logger: this.logger.child({ name: "ExecutorCache" }),
    });
    this.messages = new MessagesCache({
      host,
      port,
      mock: !!mock,
      logger: this.logger.child({ name: "MessagesCache" }),
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
