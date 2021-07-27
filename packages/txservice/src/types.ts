import { BigNumber, BigNumberish, providers, Signer } from "ethers";

import { TransactionServiceFailure } from "./error";

export type MinimalTransaction = {
  chainId: number;
  to: string;
  value: BigNumberish;
  data: string;
  from?: string;
};

export type FullTransaction = {
  nonce?: number;
  gasPrice: BigNumber;
} & MinimalTransaction;

export type CachedGas = {
  price: BigNumber;
  timestamp: number;
};

/**
 * @classdesc Handles getting gas prices and enforcing maximums for transactions
 */
export class GasPrice {
  private _gasPrice: BigNumber;

  constructor(public readonly baseValue: BigNumber, public readonly limit: BigNumber) {
    this._gasPrice = baseValue;
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
   * @param value Gas price to validate
   */
  private validate(value: BigNumber) {
    if (value.gt(this.limit)) {
      throw new TransactionServiceFailure(TransactionServiceFailure.reasons.MaxGasPriceReached, {
        gasPrice: value.toString(),
        max: this.limit.toString(),
      });
    }
  }
}

/**
 * @classdesc We use this class to wrap NonceManager to ensure re-broadcast (tx's with defined nonce) is handled correctly.
 *
 */
export class NxtpNonceManager {
  private nonce = 0;

  constructor(private readonly signer: Signer) {}

  private async getNonce() {
    // Should handle outside of class usage by getting all pending transactions
    const pending = await this.signer.getTransactionCount("pending");
    // Update nonce value to greater of the two.
    this.nonce = Math.max(pending, this.nonce);
    return this.nonce;
  }

  private incrementNonce() {
    this.nonce++;
  }

  /**
   * @remarks
   *
   * This should only ever be called within the context of the serialized transaction queue.
   */
  async sendTransaction(transaction: providers.TransactionRequest): Promise<providers.TransactionResponse> {
    if (transaction.nonce) {
      return this.signer.sendTransaction(transaction);
    } else {
      const nonce = await this.getNonce();
      // NOTE: This can fail. If we throw an error here, increment nonce will never be called.
      const result = await this.signer.sendTransaction({ ...transaction, nonce });
      this.incrementNonce();
      return result;
    }
  }

  call(tx: MinimalTransaction): Promise<string> {
    return this.signer.call({
      to: tx.to,
      data: tx.data,
    });
  }
}
