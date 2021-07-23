import { BigNumber, providers } from "ethers";
import { BaseLogger } from "pino";
import hyperid from "hyperid";

import { TransactionServiceConfig } from "./config";
import { ChainError } from "./error";
import { ChainRpcProvider } from "./provider";
import { FullTransaction, GasPrice, MinimalTransaction } from "./types";

/**
 * @classdesc Handles the sending of a single transaction and making it easier to monitor the execution/rebroadcast
 */
export class Transaction {
  /// We use a unique ID to internally track a transaction through logs.
  public id: hyperid.Instance = hyperid();
  /// Responses, in the order of attempts made for this tx.
  public responses: providers.TransactionResponse[] = [];
  /// Receipt that we received for the on-chain transaction that was mined with
  /// the desired number of confirmations.
  public receipt?: providers.TransactionReceipt;

  /// Internal nonce tracking.
  private _nonce?: number;
  public get nonce(): number | undefined {
    return this._nonce;
  }
  private set nonce(value: number | undefined) {
    if (typeof value === "undefined") {
      throw new TypeError("Cannot set nonce to undefined.");
    } else if (typeof this._nonce !== "undefined") {
      throw new TypeError("Cannot overwrite already existing nonce value; nonce may only be set once per transaction!");
    }
    this._nonce = value;
  }
  public nonceExpired = false;

  /// Which transaction attempt we are on.
  private _attempt = 0;
  /**
   * Getter to return the internal attempt
   *
   * @returns The _attempt of the transction
   */
  public get attempt(): number {
    return this._attempt;
  }

  /// Current set gas price.
  private gasPrice: GasPrice;

  /**
   * A data structure used for management of the lifecycle of one on-chain transaction.
   * 
   * @param logger The pino.BaseLogger instance we use for logging.
   * @param provider The ChainRpcProvider instance we use for interfacing with the chain.
   * @param minTx The minimum transaction data required to send a transaction.
   * @param config The overall shared config of TransactionService.
   */
  constructor(
    private readonly logger: BaseLogger,
    private readonly provider: ChainRpcProvider,
    private readonly minTx: MinimalTransaction,
    private readonly config: TransactionServiceConfig,
  ) {
    this.gasPrice = new GasPrice(BigNumber.from(this.config.gasLimit), this.provider);
  }

  /**
   * Retrieves all data needed to format a full transaction.
   *
   * @returns A transaction that is ready to be sent to chain (with specified gasPrice and nonce iff rebroadcasting)
   */
  public async getData(): Promise<FullTransaction> {
    const gasPrice = await this.gasPrice.get();
    return {
      ...this.minTx,
      gasPrice,
      nonce: this.nonce,
    };
  }

  /**
   * Makes a single attempt to send this transaction based on its current data.
   *
   * @returns A TransactionResponse once the transaction has been mined
   */
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
      if (lastPrice && (await this.gasPrice.get()) <= lastPrice) {
        throw new ChainError(ChainError.reasons.ReplacementGasInvalid);
      }
    }

    const data = await this.getData();
    await this.logInfo("Sending transaction...", this.confirm.name);
    const { response: _response, success } = await this.provider.sendTransaction(data);
    this._attempt++;
    if (!success) {
      const error = _response as Error;
      this.logger.error({ method, error }, "Failed to send tx");
      throw error;
    }
    const response = _response as providers.TransactionResponse;

    // Save nonce if applicable.
    if (typeof this.nonce === "undefined") {
      this.nonce = response.nonce;
    } else if (this.nonce !== response.nonce) {
      // NOTE: This should never happen, but we are logging just in case.
      this.logger.warn(
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
    await this.logInfo("Transaction successfully sent.", this.confirm.name);
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
  public async confirm(): Promise<providers.TransactionReceipt | undefined> {
    // Ensure we've submitted at least 1 tx.
    if (this.responses.length === 0) {
      throw new ChainError(ChainError.reasons.TxNotFound);
    }
    // Ensure we don't already have a receipt.
    if (this.receipt != null) {
      throw new ChainError(ChainError.reasons.TxAlreadyMined);
    }
    const method = this.confirm.name;
    await this.logInfo("Confirming transaction...", method);

    // Now we attempt to confirm the first response among our attempts. If it fails due to replacement,
    // we'll get back the replacement's receipt from confirmTransaction.
    const response = this.responses[0];
    // Get receipt for tx with at least 1 confirmation. If it times out (using default, configured timeout),
    // it will throw a ChainError.reasons.ConfirmationTimeout.
    this.receipt = await this.provider.confirmTransaction(response, 1);
    if (this.receipt == null) {
      // Receipt is undefined or null. 
      throw new ChainError(ChainError.reasons.TxNotFound);
    } else if (this.receipt.status === 0) {
      this.logInfo("Transaction reverted.", method, { receipt: this.receipt });
      return this.receipt;
    } else if (this.receipt.confirmations < this.provider.confirmationsRequired) {
      // Now we'll wait (up until an absurd amount of time) to receive all confirmations needed.
      this.receipt = await this.provider.confirmTransaction(response, undefined, 60_000 * 20);
    }

    // 
    // this.logger.error(
    //   {
    //     response,
    //     errorCode: error.code,
    //     error: jsonifyError(error),
    //   },
    //   "Received unexpected error code from response.wait!",
    // );
    return this.receipt;
  }

  /**
   * Bump the gas price for this tx up by the configured percentage.
   */
  public async bumpGasPrice() {
    const currentPrice = await this.gasPrice.get();
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

  /**
   * This helper exists to ensure we are always logging the full transaction data
   * and ID whenever we log info.
   * 
   * @param message The message string to log.
   * @param method The caller method's string name.
   * @param info Any additional info to log on top of the standard tx data stack.
   */
  private async logInfo(message: string, method: string, info: any = {}) {
    const data = await this.getData();
    this.logger.info(
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
