import { BigNumber, BigNumberish, utils } from "ethers";

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
