import { Logger } from "@connext/nxtp-utils";
import { BigNumber, BigNumberish, providers } from "ethers";

export type ReadTransaction = {
  chainId: number;
  to: string;
  data: string;
};

export type WriteTransaction = {
  from?: string;
  value: BigNumberish;
} & ReadTransaction;

/// Events
export type TxServiceSubmittedEvent = {
  responses: providers.TransactionResponse[];
};

export type TxServiceMinedEvent = {
  receipt: providers.TransactionReceipt;
};

export type TxServiceConfirmedEvent = {
  receipt: providers.TransactionReceipt;
};

export type TxServiceFailedEvent = {
  error: Error;
  receipt?: providers.TransactionReceipt;
};

export const NxtpTxServiceEvents = {
  TransactionSubmitted: "TransactionSubmitted",
  TransactionMined: "TransactionMined",
  TransactionConfirmed: "TransactionConfirmed",
  TransactionFailed: "TransactionFailed",
} as const;
export type NxtpTxServiceEvent = typeof NxtpTxServiceEvents[keyof typeof NxtpTxServiceEvents];

export interface NxtpTxServiceEventPayloads {
  [NxtpTxServiceEvents.TransactionSubmitted]: TxServiceSubmittedEvent;
  [NxtpTxServiceEvents.TransactionMined]: TxServiceMinedEvent;
  [NxtpTxServiceEvents.TransactionConfirmed]: TxServiceConfirmedEvent;
  [NxtpTxServiceEvents.TransactionFailed]: TxServiceFailedEvent;
}

export type Gas = {
  limit: BigNumber;
  // v0
  price?: BigNumber;
  // v2 (EIP-1559)
  maxFeePerGas?: BigNumber;
  maxPriorityFeePerGas?: BigNumber;
};

/**
 * Cache item used in ProviderCache schema property; either blocks to live (BTL) or time to live (TTL) must
 * be specified (the former is preferred but the latter can be used as a backup when a block listener will not
 * be actively updating the cache's block number).
 */
type ProviderCacheSchema<T> = {
  [K in keyof T]:
    | {
        btl: number;
        ttl?: number;
      }
    | {
        btl?: number;
        ttl: number;
      };
};

type ProviderCacheData<T> = {
  [K in keyof T]?: {
    value: T[K];
    timestamp: number;
    blockNumber: number;
  };
};

/**
 * @classdesc A data structure for managing time-sensitive (expiring) cached information from chain
 * that expires after a set number of blocks or amount of time.
 */
export class ProviderCache<T> {
  private _blockNumber = -1;
  public get blockNumber(): number {
    return this._blockNumber;
  }

  private _data: ProviderCacheData<T> = {};
  public get data(): Partial<T> {
    const data: Partial<T> = {};
    for (const k of Object.keys(this._data)) {
      const key = k as keyof T;
      data[key] = this.getItem(key)?.value;
    }
    return data;
  }

  /**
   * @param schema - A schema for the cache that determines whether each item expires after a set period of
   * time (ttl, ms) or a set number of blocks (btl, number).
   */
  constructor(private readonly logger: Logger, private readonly schema: ProviderCacheSchema<T>) {}

  /**
   * Update the cache block number, and optionally the data.
   * @param blockNumber - Current block number.
   * @param data - Optional data to update the cache with.
   */
  public update(blockNumber: number, data: Partial<T> = {}) {
    if (blockNumber < this._blockNumber) {
      this.logger.debug("Block number went backwards. Did a reorg occur?", undefined, undefined, {
        newBlockNumber: blockNumber,
        previousBlockNumber: this._blockNumber,
      });
    }
    this._blockNumber = blockNumber;
    this.set(data);
  }

  /**
   * Set a value in the cache.
   * @param data - The data to set.
   */
  public set(data: Partial<T>) {
    Object.keys(data).forEach((k) => {
      const key = k as keyof T;
      const value = data[key] as T[keyof T];
      this._data[key] = {
        value,
        timestamp: Date.now(),
        blockNumber: this.blockNumber,
      };
    });
  }

  /**
   * Helper for retrieving item from data depending on whether it's expired.
   * @param key - a key of the cache data schema.
   * @returns
   */
  private getItem(key: keyof T): ProviderCacheData<T>[keyof T] | undefined {
    const { ttl, btl } = this.schema[key];
    const item = this._data[key];
    if (!item) {
      return undefined;
    }
    // In these blocks, we'll also erase the item from the cache data if it's expired.
    if (ttl !== undefined && item.timestamp + ttl < Date.now()) {
      this._data[key] = undefined;
      return undefined;
    }
    if (btl !== undefined && item.blockNumber + btl < this.blockNumber) {
      this._data[key] = undefined;
      return undefined;
    }
    return item;
  }
}
