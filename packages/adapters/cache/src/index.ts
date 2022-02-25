import { Logger } from "@connext/nxtp-utils";

import { TransactionsCache } from "./lib/caches";
import { StoreManagerParams, Subscriptions } from "./lib/entities";

export interface Store {
  readonly transactions: TransactionsCache;
}

/**
 * @classdesc Singleton to handle instantiation of publicly accessible cache adapters.
 */
export class StoreManager implements Store {
  private static instance: StoreManager | undefined;

  private readonly subscriptions: Subscriptions = new Map();
  private readonly logger: Logger;

  public readonly transactions: TransactionsCache;

  private constructor({ redis, logger }: StoreManagerParams) {
    this.logger = logger;
    const { url } = redis;
    this.transactions = new TransactionsCache({ url, subscriptions: this.subscriptions });
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
