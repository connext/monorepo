import { BigNumber, providers } from "ethers";
import { BaseLogger } from "pino";
import { getUuid } from "@connext/nxtp-utils";

import { TransactionServiceConfig } from "./config";
// import { ChainError } from "./error";
import { ChainRpcProvider } from "./provider";
import { FullTransaction, GasPrice, MinimalTransaction } from "./types";
import { NonceExpired, TransactionReplaced, TransactionReverted, TransactionServiceFailure } from "./error";

/**
 * @classdesc Handles the sending of a single transaction and making it easier to monitor the execution/rebroadcast
 */
export class Transaction {
  // We use a unique ID to internally track a transaction through logs.
  public id: string = getUuid();
  // Responses, in the order of attempts made for this tx.
  public responses: providers.TransactionResponse[] = [];
  // Receipt that we received for the on-chain transaction that was mined with
  // the desired number of confirmations.
  public receipt?: providers.TransactionReceipt;

  /**
   * Retrieves all data needed to format a full transaction, including current gas price set, nonce, etc.
   */
  public get data(): FullTransaction {
    return {
      ...this.minTx,
      gasPrice: this.gasPrice.get(),
      nonce: this.nonce,
    };
  }

  public get latestResponse(): providers.TransactionResponse {
    return this.responses[this.responses.length - 1];
  }

  // Internal nonce tracking.
  private _nonce?: number;
  public get nonce(): number | undefined {
    return this._nonce;
  }
  private set nonce(value: number | undefined) {
    if (value == null) {
      throw new TypeError(`Cannot set nonce to ${value}.`);
    } else if (typeof this._nonce !== "undefined") {
      if (value === this._nonce) {
        // Safely return: the value passed in is the same as the current nonce.
        // This has the added affect of having this setter perform as a validator.
        return;
      }
      // For some reason, the nonce changed. Log this occurance as a critical failure.
      this.logger.error(
        {
          currentNonce: this.nonce,
          responseNonce: value,
          transactionId: this.id,
        },
        "Attempt made to overwrite nonce!",
      );
      throw new TransactionServiceFailure(
        "Cannot overwrite already existing nonce value; nonce may only be set once per transaction!",
      );
    }
    this._nonce = value;
  }

  // Which transaction attempt we are on.
  private _attempt = 0;
  /**
   * Getter to return the internal attempt
   *
   * @returns The _attempt of the transction
   */
  public get attempt(): number {
    return this._attempt;
  }

  /**
   * A data structure used for management of the lifecycle of one on-chain transaction.
   *
   * @param logger The pino.BaseLogger instance we use for logging.
   * @param provider The ChainRpcProvider instance we use for interfacing with the chain.
   * @param minTx The minimum transaction data required to send a transaction.
   * @param config The overall shared config of TransactionService.
   */
  private constructor(
    private readonly logger: BaseLogger,
    private readonly provider: ChainRpcProvider,
    private readonly minTx: MinimalTransaction,
    private readonly config: TransactionServiceConfig,
    private readonly gasPrice: GasPrice,
  ) {}

  /**
   * Static constructor method to generate a transaction instance, as it requires some
   * async operations. Stubbed in unit tests in order to solely test the interface.
   *
   * @param logger The pino.BaseLogger instance we use for logging.
   * @param provider The ChainRpcProvider instance we use for interfacing with the chain.
   * @param minTx The minimum transaction data required to send a transaction.
   * @param config The overall shared config of TransactionService.
   */
  static async create(
    logger: BaseLogger,
    provider: ChainRpcProvider,
    minTx: MinimalTransaction,
    config: TransactionServiceConfig,
  ): Promise<Transaction> {
    const result = await provider.getGasPrice();
    if (result.isErr()) {
      throw result.error;
    }
    const gasPrice = new GasPrice(result.value, BigNumber.from(config.gasLimit));
    return new Transaction(logger, provider, minTx, config, gasPrice);
  }

  /**
   * Specifies whether the transaction has been completed - meaning that it's been
   * mined and has received the target number of confirmations.
   * @returns boolean indicating whether the transaction is completed.
   */
  public didSubmit(): boolean {
    return this.responses.length > 0;
  }

  /**
   * Specifies whether the transaction has been completed - meaning that it's been
   * mined and has received the target number of confirmations.
   * @returns boolean indicating whether the transaction is completed.
   */
  public didFinish(): boolean {
    return !!this.receipt && this.receipt.confirmations >= this.provider.confirmationsRequired;
  }

  /**
   * Makes a single attempt to send this transaction based on its current data.
   *
   * @returns A TransactionResponse once the transaction has been mined
   */
  public async submit(): Promise<providers.TransactionResponse> {
    const method = this.submit.name;

    // Check to make sure that, if this is a replacement tx, the replacement gas is higher.
    if (this.responses.length > 0) {
      // TODO: Won't there always be a gasPrice in every response? Why is this member optional?
      // If there isn't a lastPrice, we're going to skip this validation step.
      const lastPrice = this.responses[this.responses.length - 1].gasPrice;
      if (lastPrice && this.gasPrice.get().lte(lastPrice)) {
        throw new TransactionServiceFailure("Gas price was not incremented from last transaction.", { method });
      }
    }

    // Check to make sure we haven't already mined this transaction.
    if (this.didFinish()) {
      throw new TransactionServiceFailure("Submit was called but transaction is already completed.", { method });
    }

    // Increment transaction attempts made.
    this._attempt++;

    // Send the tx.
    let result = await this.provider.sendTransaction(this.data);

    // If we experienced an error, throw.
    if (result.isErr()) {
      // TODO: This is the sledgehammer fix to the nonce expired problem. Would be nice
      // to see a more elegant solution.
      // If the error is a NonceExpired error and we haven't submitted yet, we want to keep
      // trying to send here.
      let { error } = result;
      if (error instanceof NonceExpired) {
        let nonceErrorCount = 1;
        this.logger.warn({ id: this.id, nonceErrorCount }, "Received nonce expired error.");
        while (!this.didSubmit) {
          result = await this.provider.sendTransaction(this.data);
          if (result.isErr()) {
            error = result.error;

            if (error instanceof NonceExpired) {
              nonceErrorCount++;
              this.logger.warn({ id: this.id, nonceErrorCount }, "Received nonce expired error.");
            } else {
              // If for some reason, we get an error here other than nonce expired, we want
              // to throw.
              throw error;
            }
          }
        }
      } else {
        throw error;
      }
    }

    // TODO: Bad code
    if (result.isErr()) {
      throw result.error;
    }

    const response = result.value;

    // Save nonce if applicable; if not, this is a validation step to ensure nonce
    // remains the same.
    this.nonce = response.nonce;

    // Add this response to our local response history.
    this.responses.push(response);
    return response;
  }

  /**
   * Makes an attempt to confirm this transaction, waiting up to a designated period to achieve
   * a desired number of confirmation blocks. If confirmation times out, throws ChainError.ConfirmationTimeout.
   * If all txs, including replacements, are reverted, throws ChainError.TxReverted.
   *
   * @privateRemarks
   *
   * Ultimately, we should see 1 tx accepted and confirmed, and the rest - if any - rejected (due to
   * replacement) and confirmed. If at least 1 tx has been accepted and received 1 confirmation, we will
   * wait an extended period for the desired number of confirmations. If no further confirmations appear
   * (which is extremely unlikely), we throw a ChainError.NotEnoughConfirmations.
   *
   * @returns A TransactionReceipt (or undefined if it did not confirm).
   */
  public async confirm(): Promise<providers.TransactionReceipt> {
    const method = this.confirm.name;

    // Ensure we've submitted at least 1 tx.
    if (this.responses.length === 0) {
      throw new TransactionServiceFailure("Transaction confirm was called, but no transaction has been sent.", {
        method,
      });
    }

    // Ensure we don't already have a receipt.
    if (this.receipt != null) {
      throw new TransactionServiceFailure("Transaction confirm was called, but we already have receipt.", { method });
    }

    // Now we attempt to confirm the first response among our attempts. If it fails due to replacement,
    // we'll get back the replacement's receipt from confirmTransaction.
    let response = this.responses[0];

    // Get receipt for tx with at least 1 confirmation. If it times out (using default, configured timeout),
    // it will throw a TransactionTimeout error.
    const result = await this.provider.confirmTransaction(response, 1);
    if (result.isErr()) {
      const { error } = result;
      if (error instanceof TransactionReplaced) {
        // TODO: Should we handle error.reason?:
        // error.reason - a string reason; one of "repriced", "cancelled" or "replaced"
        // error.receipt - the receipt of the replacement transaction (a TransactionReceipt)
        this.receipt = error.receipt;
        // error.replacement - the replacement transaction (a TransactionResponse)
        response = error.replacement;
      } else if (error instanceof TransactionReverted) {
        // NOTE: This is the official receipt with status of 0, so it's safe to say the
        // transaction was in fact reverted and we should throw here.
        this.receipt = error.receipt;
        throw error;
      } else {
        throw error;
      }
    } else {
      this.receipt = result.value;
    }

    if (this.receipt == null) {
      // Receipt is undefined or null. This normally should never occur.
      throw new TransactionServiceFailure("Unable to obtain receipt: ethers responded with null.", {
        method,
        receipt: this.receipt,
      });
    } else if (this.receipt.status === 0) {
      throw new TransactionServiceFailure("Transaction was reverted but TransactionReverted error was not thrown.");
    }

    if (this.receipt.confirmations < this.provider.confirmationsRequired) {
      // Now we'll wait (up until an absurd amount of time) to receive all confirmations needed.
      // TODO: Maybe set timeout to confirmationsRequired * confirmationTimeout...?
      const result = await this.provider.confirmTransaction(response, undefined, 60_000 * 20);
      if (result.isErr()) {
        // No errors should occur during this confirmation attempt.
        throw result.error;
      }
      this.receipt = result.value;
    }

    return this.receipt;
  }

  /**
   * Bump the gas price for this tx up by the configured percentage.
   */
  public bumpGasPrice() {
    const currentPrice = this.gasPrice.get();
    // Scale up gas by percentage as specified by config.
    const bumpedGasPrice = currentPrice.add(currentPrice.mul(this.config.gasReplacementBumpPercent).div(100)).add(1);
    this.gasPrice.set(bumpedGasPrice);
    this.logger.info(
      {
        method: this.bumpGasPrice.name,
        previousGasPrice: currentPrice.toString(),
        newGasPrice: bumpedGasPrice.toString(),
      },
      "Bumping tx gas price for reattempt.",
    );
  }
}
