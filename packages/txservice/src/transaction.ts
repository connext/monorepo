import { jsonifyError } from "@connext/nxtp-utils";
import { BigNumber, providers, errors } from "ethers";
import { BaseLogger } from "pino";
import hyperid from "hyperid";
import { Logger } from "ethers/lib/utils";

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
   * @param log The pino.BaseLogger instance we use for logging.
   * @param provider The ChainRpcProvider instance we use for interfacing with the chain.
   * @param minTx The minimum transaction data required to send a transaction.
   * @param config The overall shared config of TransactionService.
   */
  constructor(
    private readonly log: BaseLogger,
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
      // TODO: Is this necessary anymore?
      if (
        this.responses.length >= 1 &&
        (error.message.includes("nonce has already been used") ||
          (error as any).reason.includes("nonce has already been used") ||
          (error as any).code === errors.NONCE_EXPIRED ||
          // If we get a 'nonce is too low' message, a previous tx has been mined, and ethers thought
          // we were making another tx attempt with the same nonce.
          error.message.includes("Transaction nonce is too low") ||
          // Another ethers message that we could potentially be getting back.
          error.message.includes("There is another transaction with same nonce in the queue"))
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
    if (typeof this.nonce === "undefined") {
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
    const method = this.confirm.name;
    await this.logInfo("Confirming transaction...", method);

    // Now we attempt to confirm the first response among our attempts. If it fails due to replacement,
    // the error it throws will give us the replacement's receipt.
    const response = this.responses[0];
    try {
      // TODO: Implement a timeout. This can be achieved with a Promise.race, but we must ensure a memory leak isn't possible.
      this.receipt = await response.wait(this.provider.confirmationsRequired);
    } catch (error) {
      /* From ethers docs:
       * If the transaction execution failed (i.e. the receipt status is 0), a CALL_EXCEPTION error will be rejected with the following properties:
       * error.transaction - the original transaction
       * error.transactionHash - the hash of the transaction
       * error.receipt - the actual receipt, with the status of 0
       *
       * If the transaction is replaced by another transaction, a TRANSACTION_REPLACED error will be rejected with the following properties:
       * error.hash - the hash of the original transaction which was replaced
       * error.reason - a string reason; one of "repriced", "cancelled" or "replaced"
       * error.cancelled - a boolean; a "repriced" transaction is not considered cancelled, but "cancelled" and "replaced" are
       * error.replacement - the replacement transaction (a TransactionResponse)
       * error.receipt - the receipt of the replacement transaction (a TransactionReceipt)
       */
      if (error.code === Logger.errors.TRANSACTION_REPLACED) {
        // This will be the replacement receipt (see above).
        this.receipt = error.receipt;
        this.logInfo(`Transaction ${error.reason}.`, method, { receipt: error.receipt });
      } else if (error.code === Logger.errors.CALL_EXCEPTION) {
        // This will be the receipt with a status of 0.
        this.receipt = error.receipt;
        this.logInfo("Transaction reverted.", method, { receipt: error.receipt });
      } else {
        this.log.error(
          {
            response,
            errorCode: error.code,
            error: jsonifyError(error),
          },
          "Received unexpected error code from response.wait!",
        );
      }
    }
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
    this.log.info(
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
