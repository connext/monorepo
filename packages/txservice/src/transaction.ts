import { delay, jsonifyError } from "@connext/nxtp-utils";
import { BigNumber, providers } from "ethers";
import { BaseLogger } from "pino";
import hyperid from "hyperid";

import { TransactionServiceConfig } from "./config";
import { ChainError } from "./error";
import { ChainRpcProvider } from "./provider";
import { FullTransaction, MinimalTransaction } from "./types";

export class Transaction {
  // We use a unique ID to internally track a transaction through logs.
  public id: hyperid.Instance = hyperid();
  public responses: providers.TransactionResponse[] = [];
  public receipt?: providers.TransactionReceipt;
  public nonce?: number;
  public nonceExpired = false;

  private _attempt = 0;
  public get attempt(): number {
    return this._attempt;
  }

  private _gasPrice?: BigNumber;
  public get gasPrice(): Promise<BigNumber> {
    return new Promise(async (resolve) => {
      const gasPrice = this._gasPrice ?? (await this.provider.getGasPrice());
      resolve(gasPrice);
    });
  }

  public get data(): Promise<FullTransaction> {
    return new Promise(async (resolve) => {
      const gasPrice = await this.gasPrice;
      resolve({
        ...this.minTx,
        gasPrice,
        nonce: this.nonce,
      });
    });
  }

  constructor(
    private readonly log: BaseLogger,
    private readonly provider: ChainRpcProvider,
    private readonly minTx: MinimalTransaction,
    private readonly config: TransactionServiceConfig,
    initialGasPrice?: BigNumber,
  ) {
    this._gasPrice = initialGasPrice;
  }

  public async send(): Promise<providers.TransactionResponse> {
    const method = this.send.name;

    // Sanity check to make sure nonce is not expired.
    if (this.nonceExpired) {
      throw new ChainError(ChainError.reasons.NonceExpired, { method });
    }

    const data = await this.data;
    this.logInfo("Sending transaction...", this.confirm.name);
    const { response: _response, success } = await this.provider.sendTransaction(data);
    if (!success) {
      const error = _response as Error;
      if (
        this.responses.length >= 1 &&
        (error.message.includes("nonce has already been used") ||
          // If we get a 'nonce is too low' message, a previous tx has been mined, and ethers thought
          // we were making another tx attempt with the same nonce.
          error.message.includes("Transaction nonce is too low.") ||
          // Another ethers message that we could potentially be getting back.
          error.message.includes("There is another transaction with same nonce in the queue."))
      ) {
        this.nonceExpired = true;
        this.logInfo("Tx reverted: nonce already used.", method, { error: error.message });
      } else {
        this.log.error({ method, error }, "Failed to send tx");
        throw _response;
      }
    }
    const response = _response as providers.TransactionResponse;

    // Save nonce if applicable.
    if (this.nonce === undefined) {
      this.nonce = response.nonce;
    } else if (this.nonce !== response.nonce) {
      // This should never happen, but we are logging just in case.
      this.log.warn(
        {
          method,
          currentNonce: this.nonce,
          responseNonce: response.nonce,
          transactionId: this.id,
          transactionData: data,
        },
        "NONCE WAS CHANGED DURING TX SEND LOOP.",
      );
    }

    // Add this response to our local response history.
    this.responses.push(response);
    return response;
  }

  public async confirm(): Promise<providers.TransactionReceipt | undefined> {
    const method = this.confirm.name;
    this.logInfo("Confirming transaction...", method);
    const { confirmationTimeoutExtensionMultiplier } = this.config;
    // A flag for marking when we have received at least 1 confirmation. We'll extend the wait period
    // if this is the case.
    let receivedConfirmation = false;
    let confirmationAttempts = 0;

    // An anon fn to get the tx receipts for all responses.
    // We must check for confirmation in all previous transactions. Although it's most likely
    // that it's the previous one, any of them could have been confirmed.
    const waitForReceipt = async (): Promise<providers.TransactionReceipt | undefined> => {
      confirmationAttempts++;
      this.logInfo(`Attempt ${confirmationAttempts}. Timeout ${this.provider.confirmationTimeout}`, method);
      // Save all reverted receipts for a check in case our Promise.race evaluates to be undefined.
      const reverted: providers.TransactionReceipt[] = [];
      // Make a pool of promises for resolving each receipt call (once it reaches target confirmations).
      const receipt = await Promise.race<any>(
        this.responses
          .map((response) => {
            return new Promise(async (resolve) => {
              const result = await this.provider.confirmTransaction(response.hash);
              if (result.success) {
                const r = result.receipt as providers.TransactionReceipt;
                if (r.status === 0) {
                  reverted.push(r);
                } else if (r.confirmations >= this.provider.confirmationsRequired) {
                  return resolve(r);
                } else if (r.confirmations >= 1) {
                  receivedConfirmation = true;
                }
              } else {
                // Check if we received an expected error.
                const e = result.receipt as Error;
                // TODO: Should this be moved somewhere? Like to a constants file or something?
                const expected = ["transaction was replaced", "timeout exceeded"];
                if (expected.every((value) => !e.message.includes(value))) {
                  // If the error wasn't any of the expected errors, we should log it.
                  this.log.error({ method, error: jsonifyError(e) });
                }
              }
            });
          })
          // Add a promise returning undefined with a delay of <timeout> to the pool.
          // This will execute in the event that none of the provider.getTransactionReceipt calls work,
          // and/or none of them have the number of confirmations we want.
          .concat(delay(this.provider.confirmationTimeout)),
      );
      if (!receivedConfirmation && reverted.length === this.responses.length) {
        // We know every tx was reverted.
        throw new ChainError(ChainError.reasons.TxReverted, { revertedReceipts: reverted });
      }
      return receipt;
    };

    // Initial poll for receipt.
    let receipt: providers.TransactionReceipt | undefined = await waitForReceipt();
    // If we received confirmation, wait for X more iterations.
    while (!receipt && receivedConfirmation && confirmationAttempts <= confirmationTimeoutExtensionMultiplier) {
      receipt = await waitForReceipt();
    }

    // If there is still no receipt, we timed out in our polling operation.
    if (!receipt) {
      throw new ChainError(ChainError.reasons.ConfirmationTimeout);
    }

    return receipt;
  }

  public async bumpGasPrice() {
    const currentPrice = await this.gasPrice;
    // Scale up gas by percentage as specified by config.
    const bumpedGasPrice = currentPrice.add(currentPrice.mul(this.config.gasReplacementBumpPercent).div(100)).add(1);
    const { gasLimit } = this.config;
    // if the gas price is past the max, throw.
    if (bumpedGasPrice.gt(gasLimit)) {
      const error = new ChainError(ChainError.reasons.MaxGasPriceReached, {
        gasPrice: bumpedGasPrice.toString(),
        max: gasLimit.toString(),
      });
      throw error;
    }
    this._gasPrice = bumpedGasPrice;
    this.log.info(
      {
        method: this.bumpGasPrice.name,
        previousGasPrice: currentPrice.toString(),
        newGasPrice: bumpedGasPrice.toString(),
      },
      "Bumping tx gas price for reattempt.",
    );
  }

  /// This helper exists to ensure we are always logging the full transaction data and ID whenever we log info.
  private async logInfo(message: string, method: string, info: any = {}) {
    const data = await this.data;
    this.log.info(
      {
        method,
        transactionId: this.id,
        transactionData: {
          ...data,
          gasPrice: (data.gasPrice ?? "none").toString(),
          value: data.value.toString(),
        },
        ...info,
      },
      message,
    );
  }
}
