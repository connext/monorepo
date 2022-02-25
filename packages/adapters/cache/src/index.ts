import { Logger } from "@connext/nxtp-utils";

import { TransactionsCache } from "./lib/caches";
import { StoreManagerParams } from "./lib/entities";

export interface Store {
  readonly transactions: TransactionsCache;
}

/**
 * @classdesc Manages storage, updates, and retrieval of a set of data determined by use-case and organized by
 * domain. Includes a set of subscriptions for listening to changes in the data.
 * 
 * ex.
 * const store = StoreManager.getInstance<{ transactions: TransactionsCache }>({ redis: { url }, logger, domains });
 * store.transactions.getStatus(domain, nonce);
 */
export class StoreManager implements Store {
  public readonly transactions: TransactionsCache;

  private static instance: StoreManager | undefined;

  private readonly logger: Logger;

  private constructor({ redis, logger }: StoreManagerParams) {
    this.logger = logger;
    const { url } = redis;
    this.transactions =  new TransactionsCache({ url });
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
