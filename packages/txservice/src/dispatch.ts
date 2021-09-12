import { BigNumber, Signer, providers, utils } from "ethers";
import PriorityQueue from "p-queue";
import { createLoggingContext, delay, jsonifyError, Logger, RequestContext } from "@connext/nxtp-utils";

import { Gas, WriteTransaction } from "./types";
import {
  AlreadyMined,
  TransactionReplaced,
  TransactionReverted,
  TimeoutError,
  TransactionServiceFailure,
} from "./error";
import { ChainConfig, TransactionServiceConfig } from "./config";
import { ChainRpcProvider } from "./provider";
import { Transaction } from "./transaction";

/**
 * @classdesc Transaction lifecycle manager.
 *
 */
export class TransactionDispatch extends ChainRpcProvider {
  // This queue is used for serializing batches of transactions.
  private readonly batchQueue = new PriorityQueue({ concurrency: 1 });
  // This queue is used for creation of Transactions - specifically, for assigning nonce.
  private readonly nonceAssignmentQueue = new PriorityQueue({ concurrency: 1 });

  // The current nonce of the signer is tracked locally here. It will be used for comparison
  // to the nonce we get back from the pending transaction count call to our providers.
  // NOTE: Should not be accessed outside of the helper methods, getNonce and incrementNonce.
  private _nonce = 0;

  /**
   * Centralized transaction monitoring class. Extends ChainRpcProvider, thus exposing all provider methods
   * through this class.
   *
   * @param logger Logger used for logging.
   * @param signer Signer instance or private key used for signing transactions.
   * @param chainId The ID of the chain for which this class's providers will be servicing.
   * @param chainConfig Configuration for this specified chain, including the providers we'll
   * be using for it.
   * @param config The shared TransactionServiceConfig with general configuration.
   *
   * @throws ChainError.reasons.ProviderNotFound if no valid providers are found in the
   * configuration.
   */
  constructor(
    logger: Logger,
    signer: string | Signer,
    public readonly chainId: number,
    chainConfig: ChainConfig,
    config: TransactionServiceConfig,
  ) {
    super(logger, signer, chainId, chainConfig, config);
  }

  /**
   * Get the current nonce value. Should ONLY ever be called within a serialized
   * queue.
   *
   * @remarks
   * Caller should still be prepared to get the incorrect nonce back. For instance,
   * if the provider that just handled our sent tx has suddenly gone offline, this
   * method may give the wrong nonce. This can be solved by making additional calls to
   * submit the tx.
   *
   * @returns A number value for the current nonce.
   */
  private async getNonce(): Promise<number> {
    const result = await this.getTransactionCount();
    if (result.isErr()) {
      throw result.error;
    }
    const pending = result.value;
    // Set to whichever value is higher. This should almost always be our local nonce.
    this._nonce = Math.max(this._nonce, pending);
    return this._nonce;
  }

  /// LIFECYCLE
  /**
   *
   * @param minTxs -
   * @param context -
   *
   * @returns
   */
  public async send(minTxs: WriteTransaction[], context: RequestContext): Promise<providers.TransactionReceipt[]> {
    const { requestContext, methodContext } = createLoggingContext(this.send.name, context);
    this.logger.debug("Method start", requestContext, methodContext, {
      chainId: minTxs[0].chainId,
      txs: minTxs.map((tx) => ({
        to: tx.to,
        from: tx.from,
      })),
    });

    const batch: Transaction[] = [];
    for (let i = 0; i < minTxs.length; i++) {
      const minTx = minTxs[i];
      try {
        // TODO: This will effectively serialize estimateGas! Replace this with a promise.all?
        const transaction = await this.create(minTx, context);
        batch.push(transaction);
      } catch (error) {
        // TODO: log, emit
      }
    }

    return await this.batchQueue.add(async (): Promise<providers.TransactionReceipt[]> => {
      while (!batch.every((tx) => tx.didFinish)) {
        // To prevent CPU hogging by while loop and stagger provider calls:
        // TODO: Is this needed?
        delay(100);

        for (let i = 0; i < batch.length; i++) {
          const transaction = batch[i];
          if (transaction.discontinued) {
            continue;
          }
          try {
            this.submit(transaction);
          } catch (error) {
            this.logger.debug(`Transaction submit step: received ${error.type} error.`, requestContext, methodContext, {
              hashes: transaction.hashes,
              attempt: transaction.attempt,
              error: jsonifyError(error),
            });
            if (error.type === AlreadyMined.type) {
              if (transaction.responses.length > 0) {
                // Ignore this error, proceed to validation step.
                this.logger.debug("Continuing to confirmation step.", requestContext, methodContext, {
                  hashes: transaction.hashes,
                  attempt: transaction.attempt,
                });
              } else {
                // A transaction that's only been attempted once has an expired nonce. This means that we assigned
                // an already-used nonce.
                // TODO: In this event, we would need to go back to the beginning and actually "recreate" the transaction
                // itself now. Assuming our nonce tracker (dispatch) is effective, this should normally never occur...
                // but there is at least 1 legit edge case: if the dispatch has just come online, it can only rely on
                // the provider's tx count (getTransactionCount) to assign nonce - and the provider turns out to be
                // incorrect (e.g. off by 1 or 2 pending tx's not in its mempool yet for some reason).

                // For now, treat as a fail. This tx will have to be handled in next subgraph loop.
                this.fail(transaction);
              }
            }
          }
        }

        for (let i = 0; i < batch.length; i++) {
          const transaction = batch[i];
          if (transaction.discontinued) {
            continue;
          }
          try {
            this.confirm(transaction);
          } catch (error) {
            if (error.type === TimeoutError.type) {
              if (transaction.receipt && transaction.receipt.confirmations > 1) {
                // Transaction timed out trying to validate. We should bump the tx and submit again.
                // TODO: Check to see if we are at max gas or max attempts! If so, log as critical error, then stall indefinitely (until mined)
                await this.bump(transaction);
              } else {
                // Transaction timed out trying to confirm. This implies a re-org has happened. We should attempt to resubmit.
                this.logger.warn(
                  "Transaction timed out waiting for target confirmations. A possible re-org has occurred; resubmitting transaction.",
                  requestContext,
                  methodContext,
                  { hashes: transaction.hashes, attempt: transaction.attempt },
                );
              }
              // Break from this confirm loop. We should go back to resubmit.
              break;
            } else {
              throw error;
            }
          }
        }
      }
      return batch.map((tx) => tx.receipt!);
    });
  }

  /**
   * This will create a transaction with an assigned nonce as well as estimated gas / set gas price.
   * We use this structure to essentially enforce all created transactions are saved locally in the buffer for
   * continue monitoring, thus enabling us to further ensure they all go through.
   *
   * @param minTx - Minimum transaction params needed to form a transaction for sending.
   * @param context -
   *
   * @returns Transaction instance with populated params, ready for submit.
   */
  private async create(minTx: WriteTransaction, context: RequestContext): Promise<Transaction> {
    // Make sure we haven't aborted dispatch.
    this.assertNotAborted();
    // Estimate gas here will throw if the transaction is going to revert on-chain for "legit" reasons. This means
    // that, if we get past this method, we can safely assume that the transaction will go through on submit, saving for
    // instances where the provider malfunctions.
    const gas = await this.getGas(minTx, context);
    // Queue up the transaction with these values.
    const result = await this.nonceAssignmentQueue.add(
      async (): Promise<{ value: Transaction | Error; success: boolean }> => {
        try {
          // NOTE: This call must be here, serialized within the queue, as it is dependent on current pending transaction count.
          const nonce = await this.getNonce();
          // Create a new transaction instance to track lifecycle. We will NOT be submitting here.
          const transaction = new Transaction(context, minTx, nonce, gas, {
            confirmationTimeout: this.confirmationTimeout,
            confirmationsRequired: this.confirmationsRequired,
          });
          // NOTE: We should only ever increment nonce here.
          this._nonce++;
          return { value: transaction, success: true };
        } catch (e) {
          return { value: e, success: false };
        }
      },
    );
    if (result.success) {
      return result.value as Transaction;
    } else {
      throw result.value;
    }
  }

  /**
   * A helper method to get the Gas tracker instance, which is used to hold price and limit.
   *
   * @param transaction - The transaction to get the Gas tracker for.
   *
   * @returns A GasTracker instance.
   *
   * @throws TransactionReverted if gas estimate fails.
   */
  private async getGas(transaction: WriteTransaction, context?: RequestContext): Promise<Gas> {
    const { requestContext, methodContext } = createLoggingContext(this.getGas.name, context);
    // Get gas estimate.
    let gasLimit: BigNumber;
    let result = await this.estimateGas(transaction);
    if (result.isErr()) {
      if (result.error.type === TransactionReverted.type) {
        // If we get a TransactionReverted error, that means the gas estimate call
        // indicated our transaction would fail on-chain. The details of the failure will
        // be included in the error.
        throw result.error;
      }
      this.logger.warn("Estimate gas failed due to an unexpected error.", requestContext, methodContext, {
        transaction: transaction,
        error: jsonifyError(result.error),
      });
      throw result.error;
    } else {
      gasLimit = result.value;
    }

    // Get gas price and create tracker instance.
    result = await this.getGasPrice(requestContext);
    if (result.isErr()) {
      throw result.error;
    }
    return new Gas(result.value, gasLimit);
  }

  private async submit(transaction: Transaction) {
    const method = this.submit.name;

    // Check to make sure we haven't already mined this transaction.
    if (transaction.didFinish) {
      // NOTE: We do not set this._error here, as the transaction hasn't failed - just the txservice.
      throw new TransactionServiceFailure("Submit was called but transaction is already completed.", { method });
    }

    // Check to make sure this tx hasn't been killed.
    if (transaction.discontinued) {
      throw new TransactionServiceFailure("Tried to resubmit discontinued transaction.", { method });
    }

    // Check to make sure that, if this is a replacement tx, the replacement gas is higher.
    // if (this.responses.length > 0) {
    //   // NOTE: There *should* always be a gasPrice in every response, but it is
    //   // defined as optional. Handle that case?
    //   // If there isn't a lastPrice, we're going to skip this validation step.
    //   const lastPrice = this.responses[this.responses.length - 1].gasPrice;
    //   if (lastPrice && this.gas.price.lte(lastPrice)) {
    //     // NOTE: We do not set this._error here, as the transaction hasn't failed - just the txservice.
    //     throw new TransactionServiceFailure("Gas price was not incremented from last transaction.", { method });
    //   }
    // }

    // Increment transaction # attempts made.
    transaction.attempt++;
    // Set the timestamp according to when we last submitted.
    transaction.timestamp = Date.now();

    // Send the tx.
    const result = await this.sendTransaction(transaction);
    // If we end up with an error, it should be thrown here.
    if (result.isErr()) {
      transaction.error = result.error;
      throw result.error;
    }

    // Add this response to our local response history.
    const response = result.value;
    transaction.responses.push(response);

    // TODO: emit 'tx sent' event
  }

  /**
   * Makes an attempt to confirm this transaction, waiting up to a designated period to achieve
   * a desired number of confirmation blocks. If confirmation times out, throws TimeoutError.
   * If all txs, including replacements, are reverted, throws TransactionReverted.
   *
   * @privateRemarks
   *
   * Ultimately, we should see 1 tx accepted and confirmed, and the rest - if any - rejected (due to
   * replacement) and confirmed. If at least 1 tx has been accepted and received 1 confirmation, we will
   * wait an extended period for the desired number of confirmations. If no further confirmations appear
   * (which is extremely unlikely), we throw a TransactionServiceFailure.NotEnoughConfirmations.
   *
   * @returns A TransactionReceipt (or undefined if it did not confirm).
   */
  private async confirm(transaction: Transaction) {
    const method = this.confirm.name;

    // Ensure we've submitted at least 1 tx.
    if (!transaction.didSubmit) {
      throw new TransactionServiceFailure("Transaction validate was called, but no transaction has been sent.", {
        method,
        chainId: this.chainId,
        transaction: {
          hashes: transaction.hashes,
          attempt: transaction.attempt,
        },
      });
    }

    // Ensure we don't already have a receipt.
    if (transaction.receipt !== undefined) {
      throw new TransactionServiceFailure("Transaction validate was called, but we already have receipt.", {
        method,
        chainId: this.chainId,
        transaction: {
          hashes: transaction.hashes,
          attempt: transaction.attempt,
        },
      });
    }

    // Now we attempt to confirm the first response among our attempts. If it fails due to replacement,
    // we'll get back the replacement's receipt from confirmTransaction.
    const response = transaction.minedResponse ?? transaction.responses[0];

    // VALIDATE
    // Get receipt for tx with at least 1 confirmation. If it times out (using default, configured timeout),
    // it will throw a TransactionTimeout error.
    const validateResult = await this.confirmTransaction(response, 1);
    if (validateResult.isErr()) {
      const { error: _error } = validateResult;
      if (_error.type === TransactionReplaced.type) {
        const error = _error as TransactionReplaced;
        // TODO: #150 Should we handle error.reason?:
        // error.reason - a string reason; one of "repriced", "cancelled" or "replaced"
        // error.receipt - the receipt of the replacement transaction (a TransactionReceipt)
        transaction.receipt = error.receipt;
        // error.replacement - the replacement transaction (a TransactionResponse)
        if (!error.replacement) {
          throw new TransactionServiceFailure(
            "Transaction was replaced, but no replacement transaction was returned.",
            {
              method,
              chainId: this.chainId,
              transaction: {
                hashes: transaction.hashes,
                attempt: transaction.attempt,
              },
            },
          );
        }
        // Validate that we've been replaced by THIS transaction (and not an unrecognized transaction).
        if (!transaction.responses.map((response) => response.hash).includes(error.replacement.hash)) {
          transaction.error = error;
          throw error;
        }
        transaction.minedResponse = error.replacement;
      } else if (_error.type === TransactionReverted.type) {
        const error = _error as TransactionReverted;
        // NOTE: This is the official receipt with status of 0, so it's safe to say the
        // transaction was in fact reverted and we should throw here.
        transaction.receipt = error.receipt;
        transaction.error = error;
        throw error;
      } else {
        transaction.error = _error;
        throw _error;
      }
    } else {
      const receipt = validateResult.value;
      // Sanity checks.
      if (receipt == null) {
        // Receipt is undefined or null. This should never occur; timeout should occur before this does,
        // as a null receipt indicates 0 confirmations.
        throw new TransactionServiceFailure("Unable to obtain receipt: ethers responded with null.", {
          method,
          receipt,
          hash: transaction.minedResponse?.hash,
          chainId: this.chainId,
          transaction: {
            hashes: transaction.hashes,
            attempt: transaction.attempt,
          },
        });
      } else if (receipt.status === 0) {
        // This should never occur. We should always get a TransactionReverted error in this event.
        throw new TransactionServiceFailure("Transaction was reverted but TransactionReverted error was not thrown.", {
          method,
          chainId: this.chainId,
          receipt,
          hash: transaction.minedResponse?.hash,
          transaction: {
            hashes: transaction.hashes,
            attempt: transaction.attempt,
          },
        });
      } else if (receipt.confirmations < 1) {
        // Again, should never occur.
        throw new TransactionServiceFailure("Receipt did not have any confirmations, should have timed out!", {
          method,
          chainId: this.chainId,
          receipt: transaction.receipt,
          hash: transaction.minedResponse?.hash,
          transaction: {
            hashes: transaction.hashes,
            attempt: transaction.attempt,
          },
        });
      }
      // Set our local receipt and flag the tx as validated.
      transaction.receipt = receipt;
    }

    // CONFIRM
    if (!transaction.minedResponse) {
      throw new TransactionServiceFailure(
        "Tried to confirm but tansaction was not validated; no minedResponse was found.",
        {
          method,
          chainId: this.chainId,
          minedResponse: transaction.minedResponse,
          transaction: {
            hashes: transaction.hashes,
            attempt: transaction.attempt,
          },
        },
      );
    }

    // Here we wait for the target confirmations.
    // TODO: Ensure we are comfortable with how this timeout period is calculated.
    const timeout = this.confirmationTimeout * this.confirmationsRequired * 2;
    const confirmResult = await this.confirmTransaction(
      transaction.minedResponse ?? response,
      this.confirmationsRequired,
      timeout,
    );
    if (confirmResult.isErr()) {
      transaction.error = confirmResult.error;
      if (confirmResult.error.type === TimeoutError.type) {
        // This implies a re-org occurred.
        throw confirmResult.error;
      }
      // No other errors should occur during this confirmation attempt.
      throw new TransactionServiceFailure(TransactionServiceFailure.reasons.NotEnoughConfirmations, {
        method,
        chainId: this.chainId,
        receipt: transaction.receipt,
        error: transaction.error,
        hash: response.hash,
        transaction: {
          hashes: transaction.hashes,
          attempt: transaction.attempt,
        },
      });
    }
    const receipt = confirmResult.value;
    if (receipt == null) {
      // Should never occur.
      throw new TransactionServiceFailure("Transaction receipt was null.", {
        method,
        chainId: this.chainId,
        badReceipt: receipt,
        validationReceipt: transaction.receipt,
        hash: response.hash,
        transaction: {
          hashes: transaction.hashes,
          attempt: transaction.attempt,
        },
      });
    }
    transaction.receipt = receipt;

    // TODO: emit 'tx mined' event
  }

  /**
   * Bump the gas price for this tx up by the configured percentage.
   */
  public async bump(transaction: Transaction) {
    const { requestContext, methodContext } = createLoggingContext(this.bump.name, transaction.context);
    if (transaction.attempt >= Transaction.MAX_ATTEMPTS) {
      // TODO: Log more info?
      throw new TransactionServiceFailure(TransactionServiceFailure.reasons.MaxAttemptsReached, {
        gasPrice: `${utils.formatUnits(transaction.gas.price, "gwei")} gwei`,
        attempts: transaction.attempt,
      });
    }
    const previousPrice = transaction.gas.price;
    // Get the current gas baseline price, in case it's changed drastically in the last block.
    const result = await this.getGasPrice(requestContext);
    const updatedPrice = result.isOk() ? result.value : BigNumber.from(0);
    const determinedBaseline = updatedPrice.gt(previousPrice) ? updatedPrice : previousPrice;
    // Scale up gas by percentage as specified by config.
    transaction.gas.price = determinedBaseline
      .add(determinedBaseline.mul(this.config.gasReplacementBumpPercent).div(100))
      .add(1);
    this.logger.info(`Bumping tx gas price for reattempt.`, requestContext, methodContext, {
      chainId: this.chainId,
      attempt: transaction.attempt,
      latestAvgPrice: `${utils.formatUnits(updatedPrice, "gwei")} gwei`,
      previousPrice: `${utils.formatUnits(previousPrice, "gwei")} gwei`,
      newGasPrice: `${utils.formatUnits(transaction.gas.price, "gwei")} gwei`,
      transaction: {
        hashes: transaction.hashes,
        attempt: transaction.attempt,
      },
    });
  }

  private async fail(transaction: Transaction) {
    // TODO: Get error from transaction.error, log it, emit it.
    transaction.discontinued = true;
  }

  /// HELPERS
  /**
   * Method to execute a generic backfill at a specified nonce.
   * @param nonce - The nonce to backfill at.
   * @param blockade - The transaction that's blocking. Used predominantly for logging.
   * @param reason - The reason for the backfill, a string value to be specify in logs.
   */
  private async backfill(nonce: number, blockade: Transaction | undefined, reason: string, context?: RequestContext) {
    // Make sure that the blockade transaction didn't manage to confirm.
    if (blockade?.didFinish) {
      return;
    }
    const { requestContext, methodContext } = createLoggingContext(this.backfill.name, context);

    try {
      this.logger.warn(`Transaction requires backfill: ${reason}`, requestContext, methodContext, {
        chainId: this.chainId,
        nonce,
        timestamp: blockade?.timestamp,
        blockade: blockade?.params,
        hashes: blockade?.responses.map((r) => r.hash),
      });
      const addressResult = await this.getAddress();
      if (addressResult.isErr()) {
        throw addressResult.error;
      }
      // Sending a 0 wei transaction to fill the gap. We only have to eat the cost of gas here.
      const minTx: WriteTransaction = {
        chainId: this.chainId,
        value: BigNumber.from(0),
        data: "0x",
        to: addressResult.value,
      };
      const gas = await this.getGas(minTx, requestContext);
      // Set gas to maximum.
      gas.setToMax();
      // Create transaction, and forcefully overwrite the stale one (blockade) in the buffer.
      const transaction = new Transaction(requestContext, minTx, nonce, gas, {
        confirmationsRequired: this.confirmationsRequired,
        confirmationTimeout: this.confirmationTimeout,
      });
      const response = await this.sendTransaction(transaction);
      if (response.isErr()) {
        throw response.error;
      }
      const receipt = await this.confirmTransaction(
        response.value,
        this.confirmationsRequired,
        transaction.timeUntilExpiry(),
      );
      if (receipt.isErr()) {
        throw receipt.error;
      }
      this.logger.info("Backfill completed successfully", requestContext, methodContext, {
        chainId: this.chainId,
        nonce,
        backfillTx: {
          hash: response.value.hash,
          gasPrice: transaction.params.gasPrice.toString(),
          gasLimit: transaction.params.gasLimit.toString(),
          value: transaction.params.value.toString(),
          to: transaction.params.to.toString(),
        },
      });
    } catch (error) {
      if (error.type === AlreadyMined.type) {
        // We can assume that the transaction was sent using the signer outside of dispatch,
        // and as a result, we didn't have it stored in the buffer.
        this.logger.warn("Backfill failed: Transaction already mined", requestContext, methodContext, {
          chainId: this.chainId,
          nonce,
          error,
        });
        return;
      } else if (error.type === TransactionReplaced.type) {
        // The backfill was replaced by the original transaction, so we can just ignore it.
        this.logger.info("Backfill failed: Transaction replaced", requestContext, methodContext, {
          chainId: this.chainId,
          nonce,
          error,
          replacement: error.replacement?.hash,
          receipt: error.receipt?.hash,
        });
        return;
      }
      // Backfill failed, we should shut the system down.
      this.logger.error(`Backfill failed: ${error.type}`, requestContext, methodContext, jsonifyError(error), {
        nonce,
      });
      // Raise the pause flag.
      // TODO / DEBUG: Temporarily disabled for debugging.
      // this.paused = error;
    }
  }

  // TODO: Reimplement event emitters : should instead use callbacks from txservice parent.
  // /**
  //  * Handle logging and event emitting on tx submit attempt.
  //  * @param response The transaction response received back from that attempt.
  //  */
  // private async submitTransaction(transaction: TransactionInterface, context: RequestContext) {
  //   const { requestContext, methodContext } = createLoggingContext(this.submitTransaction.name, context);
  //   this.logger.debug(`Submitting tx`, requestContext, methodContext, {
  //     id: transaction.id,
  //     attempt: transaction.attempt,
  //   });
  //   const response = await transaction.submit();
  //   const gas = response.gasPrice ?? transaction.params.gasPrice;
  //   this.logger.info(`Tx submitted.`, requestContext, methodContext, {
  //     chainId: transaction.chainId,
  //     id: transaction.id,
  //     attempt: transaction.attempt,
  //     hash: response.hash,
  //     gas: `${utils.formatUnits(gas, "gwei")} gwei`,
  //     gasLimit: transaction.params.gasLimit.toString(),
  //     nonce: response.nonce,
  //   });
  //   this.evts[NxtpTxServiceEvents.TransactionAttemptSubmitted].post({ response });
  // }

  // /**
  //  * Handle logging and event emitting on tx confirmation.
  //  * @param receipt The transaction receipt received back.
  //  */
  // private async confirmTransaction(transaction: TransactionInterface, context: RequestContext) {
  //   const { requestContext, methodContext } = createLoggingContext(this.confirmTransaction.name, context);

  //   this.logger.debug(`Confirming tx...`, requestContext, methodContext, {
  //     id: transaction.id,
  //     attempt: transaction.attempt,
  //   });
  //   const receipt = await transaction.confirm();
  //   this.logger.info(`Tx mined.`, requestContext, methodContext, {
  //     chainId: transaction.chainId,
  //     id: transaction.id,
  //     attempt: transaction.attempt,
  //     receipt: {
  //       gasUsed: receipt.gasUsed.toString(),
  //       transactionHash: receipt.transactionHash,
  //       blockHash: receipt.blockHash,
  //     },
  //   });
  //   this.evts[NxtpTxServiceEvents.TransactionConfirmed].post({ receipt });
  // }

  // /**
  //  * Handle logging and event emitting on tx failure.
  //  * @param error The TransactionError that occurred during the transaction lifecycle.
  //  * @param receipt The transaction receipt received back from reverted tx, if
  //  * applicable.
  //  */
  // private handleFail(error: TransactionError, transaction: TransactionInterface, context: RequestContext) {
  //   const { requestContext, methodContext } = createLoggingContext(this.handleFail.name, context);
  //   const receipt = transaction.receipt;
  //   this.logger.error("Tx failed.", requestContext, methodContext, jsonifyError(error), {
  //     id: transaction.id,
  //     receipt,
  //     context,
  //     error,
  //   });
  //   this.evts[NxtpTxServiceEvents.TransactionFailed].post({ error, receipt });
  // }
}
