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

export type CachedGas = {
  price: BigNumber;
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
    this.validate(value);
    this._gasPrice = value;
  }

  constructor(public readonly baseValue: BigNumber, public readonly limit: BigNumber) {
    this._gasPrice = baseValue;
    // Convert the gas limit into wei units using the base value.
    const limitInWei = limit.mul(baseValue);
    // Enforce a max gas price 20% higher than the base value as a buffer.
    this._maxGasPrice = limitInWei.add(limitInWei.mul(6).div(5));
  }

  public setToMax() {
    this._gasPrice = this._maxGasPrice.sub(10);
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
        gasLimit: `${utils.formatUnits(this.limit, "gwei")} gwei`,
        max: `${utils.formatUnits(this._maxGasPrice, "gwei")} gwei`,
      });
    }
  }
}
