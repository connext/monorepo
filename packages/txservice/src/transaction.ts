import { jsonifyError } from "@connext/nxtp-utils";
import { BigNumber, providers } from "ethers";
import { BaseLogger } from "pino";
import hyperid from "hyperid";

import { TransactionServiceConfig } from "./config";
import { ChainError } from "./error";
import { ChainRpcProvider } from "./provider";
import { FullTransaction, GasPrice, MinimalTransaction } from "./types";

export class Transaction {
  // We use a unique ID to internally track a transaction through logs.
  public id: hyperid.Instance = hyperid();
  // Responses, in the order of attempts made for this tx.
  public responses: providers.TransactionResponse[] = [];
  public receipt?: providers.TransactionReceipt;
  // Receipts, mapped by hash.
  private receipts: Map<string, providers.TransactionReceipt> = new Map();
  public nonce?: number;
  public nonceExpired = false;

  // Flag to indicate that we did submit a tx (successfully) at least once.
  private didSubmit = false;

  private _attempt = 0;
  public get attempt(): number {
    return this._attempt;
  }

  private gasPrice: GasPrice;

  public get data(): Promise<FullTransaction> {
    return new Promise(async (resolve) => {
      const gasPrice = await this.gasPrice.get();
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
  ) {
    this.gasPrice = new GasPrice(BigNumber.from(this.config.gasLimit), this.provider);
  }

  /// Makes a single attempt to send this transaction based on its current data.
  public async send(): Promise<providers.TransactionResponse> {
    const method = this.send.name;

    // Sanity check to make sure nonce is not expired.
    if (this.nonceExpired) {
      throw new ChainError(ChainError.reasons.NonceExpired, { method });
    }

    // Check to make sure that, if this is a replacement tx, the replacement gas is higher.
    if (this.responses.length > 0) {
      const lastPrice = this.responses[this.responses.length - 1].gasPrice;
      // TODO: Won't there always be a gasPrice in every response? Why is this member optional?
      // If there isn't a lastPrice, we're going to skip this validation step.
      if (lastPrice && await this.gasPrice.get() <= lastPrice) {
        throw new ChainError(ChainError.reasons.ReplacementGasInvalid);
      }
    }

    const data = await this.data;
    await this.logInfo("Sending transaction...", this.confirm.name);
    const { response: _response, success } = await this.provider.sendTransaction(data);
    this._attempt++;
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
        await this.logInfo("Tx reverted: nonce already used.", method, { error: error.message });
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
    // Raise this flag to enable confirmation step.
    this.didSubmit = true;
    return response;
  }

  /// Makes an attempt to confirm this transaction. If confirmation times out, throws. If all
  /// previous txs are reverted, throws.
  public async confirm(): Promise<providers.TransactionReceipt | undefined> {
    if (!this.didSubmit) {
      throw new ChainError(ChainError.reasons.TxNotFound);
    }
    const method = this.confirm.name;
    await this.logInfo("Confirming transaction...", method);

    let confirmationAttempts = 0;
    let receipt: providers.TransactionReceipt | undefined;
    // We must check for confirmation in all previous transactions. Although it's most likely
    // that it's the previous one, any of them could have been confirmed.
    while (!receipt || (receipt.confirmations > 0 && receipt.confirmations < this.provider.confirmationsRequired)) {
      confirmationAttempts++;
      await this.logInfo(`confirmation attempt: ${confirmationAttempts}`, method);
      // Make a pool of promises for resolving each receipt call (once it reaches target confirmations).
      receipt = await Promise.race<providers.TransactionReceipt | any>(
        this.responses
          .map((response) => {
            return new Promise(async (resolve) => {
              const result = await this.provider.confirmTransaction(response.hash);
              if (result.success) {
                const r = result.receipt as providers.TransactionReceipt;
                if (r.confirmations >= 1) {
                  // Save this receipt by hash locally.
                  this.receipts.set(r.transactionHash, r);
                  if (r.status !== 0) {
                    // If we found a valid, confirmed receipt, resolve immediately.
                    return resolve(r);
                  } else {
                    // TODO: is there a way to check if the tx got replaced (harmless) or tx got reverted (concerning)?
                  }
                }
              } else {
                // Check to ensure we received an expected error.
                const e = result.receipt as Error;
                // TODO: Should this be moved somewhere? Like to a constants file or something?
                const expected = ["transaction was replaced", "timeout exceeded"];
                if (expected.every((value) => !e.message.includes(value))) {
                  // If the error wasn't any of the expected errors, we should log it.
                  this.log.error({ method, error: jsonifyError(e) }, "Unexpected error while polling to confirm.");
                }
              }
            });
          })
          .concat(
            new Promise((resolve) =>
              setTimeout(() => {
                return resolve(undefined);
              }, this.provider.confirmationTimeout),
            ),
          ),
      );
    }

    if (this.receipts.size === this.responses.length) {
      // We know every tx was reverted.
      throw new ChainError(ChainError.reasons.TxReverted);
    }

    // If there is still no receipt, we timed out in our polling operation.
    if (!receipt) {
      throw new ChainError(ChainError.reasons.ConfirmationTimeout);
    }

    return receipt;
  }

  /// Bump the gas price up by configured percentage.
  public async bumpGasPrice() {
    const currentPrice = await this.gasPrice.get();
    // Scale up gas by percentage as specified by config.
    const bumpedGasPrice = currentPrice.add(currentPrice.mul(this.config.gasReplacementBumpPercent).div(100)).add(1);
    this.gasPrice.set(bumpedGasPrice);
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
