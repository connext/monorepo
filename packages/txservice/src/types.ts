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
  nonce?: number;
  gasPrice: BigNumber;
  gasLimit: BigNumber;
} & WriteTransaction;

export type CachedGas = {
  price: BigNumber;
  timestamp: number;
};

/**
 * @classdesc Handles getting gas prices and enforcing maximums for transactions
 */
export class GasPrice {
  private _gasPrice: BigNumber;
  private readonly _maxGasPrice: BigNumber;

  constructor(public readonly baseValue: BigNumber, public readonly limit: BigNumber) {
    this._gasPrice = baseValue;
    // Enforce a max gas price 20% higher than the base value as a buffer.
    this._maxGasPrice = limit.mul(12).div(100);
  }

  /**
   * Gets the current gas price
   * @returns BigNumber representation of gas price
   */
  public get(): BigNumber {
    return BigNumber.from(this._gasPrice);
  }

  /**
   * Validates + sets the current gas price
   *
   * @param value - Gas price to set
   */
  public set(value: BigNumber) {
    this.validate(value);
    this._gasPrice = value;
  }

  /**
   * Check to see if the gas price provided is past the max. If so, throw.
   * 
   * @param value Gas price to validate.
   * 
   * @throws TransactionServiceFailure with reason MaxGasPriceReached if we exceed the limit.
   */
  private validate(value: BigNumber) {
    if (value.gt(this._maxGasPrice)) {
      throw new TransactionServiceFailure(TransactionServiceFailure.reasons.MaxGasPriceReached, {
        gasPrice: `${utils.formatUnits(value, "gwei")} gwei`,
        max: `${utils.formatUnits(this.limit, "gwei")} gwei`,
      });
    }
  }
}
