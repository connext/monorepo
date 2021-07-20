import { NonceManager } from "@ethersproject/experimental";
import { BigNumber, BigNumberish, providers } from "ethers";

import { ChainError } from "./error";
import { ChainRpcProvider } from "./provider";

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

export class GasPrice {
  private _gasPrice?: BigNumber;

  constructor(private readonly limit: BigNumber, private readonly provider: ChainRpcProvider) {}

  public async get(): Promise<BigNumber> {
    if (!this._gasPrice) {
      const value = await this.provider.getGasPrice();
      this.validate(value);
      this._gasPrice = value;
    }
    return BigNumber.from(this._gasPrice);
  }

  public set(value: BigNumber) {
    this.validate(value);
    this._gasPrice = value;
  }

  /// Check to see if the gas price provided is past the max. If so, throw.
  private validate(value: BigNumber) {
    if (value.gt(this.limit)) {
      throw new ChainError(ChainError.reasons.MaxGasPriceReached, {
        gasPrice: value.toString(),
        max: this.limit.toString(),
      });
    }
  }
}

/* We use this class to wrap NonceManager to ensure re-broadcast (tx's with defined nonce) is handled
 * correctly.
 */
export class NxtpNonceManager extends NonceManager {
  sendTransaction(transaction: providers.TransactionRequest): Promise<providers.TransactionResponse> {
    if (transaction.nonce) {
      return this.signer.sendTransaction(transaction);
    } else {
      return super.sendTransaction(transaction);
    }
  }
}
