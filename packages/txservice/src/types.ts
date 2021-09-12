import { BigNumber, BigNumberish, utils } from "ethers";

import { TransactionInterface } from "./dispatch";
import { TransactionServiceFailure } from "./error";

export type ReadTransaction = {
  chainId: number;
  to: string;
  data: string;
};

export type WriteTransaction = {
  from?: string;
  value: BigNumberish;
} & ReadTransaction;

export type FullTransaction = {
  nonce: number;
  gasPrice: BigNumber;
  gasLimit: BigNumber;
} & WriteTransaction;

// TODO: Cache all the provider call responses, and have one singular data structure for managing that cache.
export type CachedGas = {
  price: BigNumber;
  timestamp: number;
};

export type CachedTransactionCount = {
  value: number;
  timestamp: number;
};

/**
 * @classdesc Handles getting gas prices and enforcing maximums for transactions
 */
export class Gas {
  private _gasPrice: BigNumber;
  private readonly _maxGasPrice: BigNumber;

  /**
   * Gets the current gas price
   * @returns BigNumber representation of gas price
   */
  public get price(): BigNumber {
    return BigNumber.from(this._gasPrice);
  }

  /**
   * Validates + sets the current gas price
   *
   * @param value - Gas price to set
   */
  public set price(value: BigNumber) {
    this._gasPrice = value;
  }

  constructor(public readonly baseValue: BigNumber, public readonly limit: BigNumber) {
    this._gasPrice = baseValue;
    // Enforce a max gas price 250% higher than the base value as a buffer.
    // This means, using the default config (at the time of writing this) we'll be able to execute about
    // 10 gas bumps before hitting the ceiling.
    // TODO: Use the config to set this value.
    const absoluteMax = utils.parseUnits("5000", "gwei");
    const max = baseValue.mul(5).div(2);
    this._maxGasPrice = max.gt(absoluteMax) ? absoluteMax : max;
  }

  /**
   * Sets the gas price to the pre-set maximum. This is typically used to fire off backfill transactions
   * to ensure they'll go through quickly.
   */
  public setToMax() {
    this._gasPrice = this._maxGasPrice.sub(10);
  }
}

/**
 * @classdesc Really basic class: manages a map/buffer like it's an ordered dictionary, essentially.
 */
export class TransactionBuffer {
  // TODO: Maps in TS technically maintain order based on order of insertion - but in order for us to
  // guarantee that that order will be sequential in terms of nonce, we'd have to enforce that
  // in set() (in other words, throw if there's an attempt to insert out of order). Is that what
  // we want to do? If so, orderedKeys() will become obsolete.
  private buffer: Map<number, TransactionInterface> = new Map();

  public pending(): TransactionInterface[] {
    // Use this opportunity to trim previous finished transactions.
    return this.trim()
      .map((nonce) => this.get(nonce) ?? null)
      .filter((tx) => tx != null) as TransactionInterface[];
  }

  public insert(nonce: number, transaction: TransactionInterface, overwrite = false) {
    if (!overwrite && this.get(nonce) !== undefined) {
      const existingTx = this.get(nonce)!;
      throw new TransactionServiceFailure(`Attempted to overwrite transaction at nonce ${nonce}!`, {
        method: this.insert.name,
        nonce,
        offendingTransaction: {
          id: transaction.id,
          nonce: transaction.nonce,
        },
        existingTransaction: {
          id: existingTx.id,
          nonce: existingTx.nonce,
        },
      });
    }
    this.buffer.set(nonce, transaction);
  }

  public get(nonce: number): TransactionInterface | undefined {
    return this.buffer.get(nonce);
  }

  public getLastNonce(): number | undefined {
    return Math.max(...Array.from(this.buffer.keys()));
  }

  private orderedKeys() {
    return Array.from(this.buffer.keys()).sort();
  }

  /**
   *
   * @remarks It is okay if we trim all transactions in the buffer, and end up with none left;
   * it just means we'll use provider to get current nonce.
   *
   * @returns Remaining keys after trimming.
   */
  private trim(): number[] {
    // Once we've found the point where transactions stop being "finished",
    // we want to leave the rest in there.
    let highestIndex = -1;
    // Keys are ordered lowest to highest nonce values.
    const keys = this.orderedKeys();
    for (let i = 0; i < keys.length; i++) {
      const nonce = keys[i];
      const tx = this.get(nonce);
      if (!tx) {
        // For some reason, this tx is already missing. Not sure why this would happen (probably async
        // r/w), but we are ignoring it for now.
        continue;
      }
      if (tx.didFinish) {
        highestIndex = i;
      }
    }
    // We want to trim everything below the highest finished nonce's index.
    keys.splice(0, highestIndex).forEach((nonce) => this.buffer.delete(nonce));
    // Return remaining keys.
    return keys;
  }
}
