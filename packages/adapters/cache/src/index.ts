import { Logger } from "@connext/nxtp-utils";

import { TransfersCache, AuctionsCache, ConsumersCache } from "./lib/caches";
import { StoreManagerParams, StoreChannel } from "./lib/entities";

export interface Store {
  readonly transfers: TransfersCache;
  readonly auctions: AuctionsCache;
  readonly consumers: ConsumersCache;
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
    this.consumers = new ConsumersCache({
      host,
      port,
      mock: !!mock,
      logger: this.logger.child({ name: "ConsumersCache" }),
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
