import { BigNumber, Signer, providers, utils } from "ethers";
import PriorityQueue from "p-queue";
import {
  createLoggingContext,
  delay,
  getUuid,
  jsonifyError,
  Logger,
  NxtpError,
  RequestContext,
} from "@connext/nxtp-utils";
import interval from "interval-promise";

import { Gas, WriteTransaction, Transaction, TransactionBuffer } from "./types";
import { BadNonce, TransactionReplaced, TransactionReverted, TimeoutError, TransactionServiceFailure, TransactionBackfilled } from "./error";
import { ChainConfig, TransactionServiceConfig } from "./config";
import { ChainRpcProvider } from "./provider";

export type DispatchCallbacks = {
  onSubmit: (transaction: Transaction) => void;
  onMined: (transaction: Transaction) => void;
  onConfirm: (transaction: Transaction) => void;
  onFail: (transaction: Transaction) => void;
};

/**
 * @classdesc Transaction lifecycle manager.
 *
 */
export class TransactionDispatch extends ChainRpcProvider {
  private loopsRunning = false;

  // Based on default per account rate limiting on geth.
  // TODO: Make this a configurable value, since the dev may be able to implement or may be using a custom geth node.
  static MAX_INFLIGHT_TRANSACTIONS = 64;
  // Buffer of in-flight transactions waiting to get 1 confirmation.
  private inflightBuffer: TransactionBuffer;

  // TODO: Cap this buffer as well. # of inflight txs max * # of confirmations needed seems reasonable as a max # of waiting-for-x-confirmations queue length
  // Buffer of mined transactions waiting for X confirmations.
  private minedBuffer: TransactionBuffer;

  private readonly queue = new PriorityQueue({ concurrency: 1 });

  // The current nonce of the signer is tracked locally here. It will be used for comparison
  // to the nonce we get back from the pending transaction count call to our providers.
  // NOTE: Should not be accessed outside of the helper methods, getNonce and incrementNonce.
  private nonce = 0;
  private lastReceivedTxCount = -1;

  /**
   * Transaction lifecycle management class. Extends ChainRpcProvider, thus exposing all provider methods
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
    public readonly chainId: number,
    chainConfig: ChainConfig,
    config: TransactionServiceConfig,
    signer: string | Signer,
    private readonly callbacks: DispatchCallbacks,
    startLoops = true,
  ) {
    super(logger, chainId, chainConfig, config, signer);
    this.inflightBuffer = new TransactionBuffer(logger, TransactionDispatch.MAX_INFLIGHT_TRANSACTIONS, {
      name: "INFLIGHT",
      chainId: this.chainId,
    });
    this.minedBuffer = new TransactionBuffer(logger, undefined, {
      name: "MINED",
      chainId: this.chainId,
    });
    if (startLoops) {
      this.startLoops();
    }
  }

  /**
   * Start background loops for mining and confirming transactions.
   */
  public startLoops() {
    if (!this.loopsRunning) {
      this.loopsRunning = true;
      // Use interval promise to make sure loop iterations don't overlap.
      interval(async () => await this.mineLoop(), 2_000);
      interval(async () => await this.confirmLoop(), 2_000);
    }
  }

  /**
   * Check for mined transactions in the inflight buffer; if any are present it will wait for 1 confirmation
   * and then push the transaction to the mined buffer for each one in FIFO order.
   */
  private async mineLoop() {
    const { requestContext, methodContext } = createLoggingContext(this.mineLoop.name);
    let transaction: Transaction | undefined = undefined;
    try {
      while (this.inflightBuffer.length > 0) {
        transaction = this.inflightBuffer.shift()!;
        // Shift the first transaction from the buffer and get it mined.
        let receivedBadNonce = false;
        let shouldResubmit = false;
        while (!transaction.didMine && !transaction.error) {
          try {
            if (shouldResubmit) {
              // Transaction timed out trying to validate. We should bump the tx and submit again.
              await this.bump(transaction);
              // Resubmit
              await this.submit(transaction);
            }
            await this.mine(transaction);
            this.minedBuffer.push(transaction);
            break;
          } catch (error) {
            this.logger.debug("Received error waiting for transaction to be mined:", requestContext, methodContext, {
              chainId: this.chainId,
              txsId: transaction.uuid,
              error,
            });
            if (error.type === TimeoutError.type && !receivedBadNonce) {
              // Check to see if this nonce has already been mined; this would imply this transaction got replaced, or
              // failed to reach chain.
              const result = await this.getTransactionCount("latest");
              if (result.isErr()) {
                throw result.error;
              }
              const transactionCount = result.value;
              if (transactionCount > transaction.nonce) {
                transaction.error = new TransactionBackfilled({
                  latestTransactionCount: transactionCount,
                  nonce: transaction.nonce,
                });
              } else {
                shouldResubmit = true;
              }
            } else if (error.type === BadNonce.type) {
              // If we timeout in the next mine attempt, then we know the transaction was replaced by a foreign (unknown) transaction,
              // so we'll want to fail the tx with whatever error we get.
              receivedBadNonce = true;
              shouldResubmit = false;
            } else if (
              error.type === TransactionReverted.type &&
              error.reason === TransactionReverted.reasons.InsufficientFunds
            ) {
              // If we get an insufficient funds error during a resubmit, we should log this critical alert but continue to try to mine
              // whatever txs we've sent so far, on the basis that the router owner will eventually refill the account (and we'll eventually)
              // be able to bump.
              // Set shouldResubmit to false; next time around it will only attempt to mine and then if it times out again, it will go back to
              // attempting to resubmit.
              shouldResubmit = false;
            } else {
              transaction.error = error;
            }
          }
          // If any errors occurred, fail that transaction and move on.
          if (transaction.error) {
            await this.fail(transaction);
          }
        }
      }
    } catch (error) {
      this.logger.error("Error in mine loop.", requestContext, methodContext, jsonifyError(error), {
        handlingTransaction: transaction ? transaction.loggable : undefined,
      });
    }
  }

  // TODO: Do we even need a confirm loop / buffer? Shouldn't we just call this.confirm with .then and .catch asyncronously
  // in the mine loop?
  /**
   * Check for mined transactions in the mined buffer; if any are present it will wait for the target confirmations for each
   * one in FIFO order.
   */
  private async confirmLoop() {
    const { requestContext, methodContext } = createLoggingContext(this.confirmLoop.name);
    const promises: Promise<void>[] = [];
    while (this.minedBuffer.length > 0) {
      const transaction = this.minedBuffer.shift()!;
      promises.push(
        new Promise<void>((resolve) => {
          // Checks to make sure we hit the target number of confirmations.
          this.confirm(transaction)
            .then(() => resolve())
            .catch((error) => {
              this.logger.debug(
                "Received error waiting for transaction to be confirmed:",
                requestContext,
                methodContext,
                {
                  chainId: this.chainId,
                  txsId: transaction.uuid,
                  error,
                },
              );
              transaction.error = error;
              this.fail(transaction).then(() => resolve());
            });
        }),
      );
    }
    await Promise.all(promises);
  }

  /**
   * Determine the nonce assignment for a transaction based on the current state, as well as what nonces have already
   * been attempted, etc.
   * @remarks
   * This should only ever be called within the queue in the send() method.
   *
   * @param attemptedNonces - Array of nonces that have already been attempted, in order of attempt.
   * @param error - (optional) The last error that was thrown when attempting to send an initial transaction.
   * @param previousNonce - (optional) The previous nonce assigned. Should only be defined if the error argument is also
   * passed in.
   * @returns object - containing nonce, backfill, and transactionCount.
   */
  private async determineNonce(attemptedNonces: number[], error?: BadNonce): Promise<{ nonce: number; backfill: boolean; transactionCount: number }> {
    // Retrieve the current pending transaction count.
    const result = await this.getTransactionCount("pending");
    if (result.isErr()) {
      throw result.error;
    }
    const transactionCount = result.value;

    const latestRes = await this.getTransactionCount("latest");
    if (latestRes.isErr()) {
      throw latestRes.error;
    }
    const latestTxCount = latestRes.value;
    this.logger.debug("tx counts", undefined, undefined, {
      transactionCount,
      latestTxCount,
    });

    // Set the nonce initially to the last used nonce. If no nonce has been used yet (i.e. this is the first initial send attempt),
    // set to whichever value is higher: local nonce or txcount. This should almost always be our local nonce, but often both will be the same.
    let nonce = attemptedNonces.length > 0 ? attemptedNonces[attemptedNonces.length - 1] : Math.max(
      this.nonce, // TODO: See below ... + 1 ?
      transactionCount,
    );
    // If backfill conditions are met, then we should instead set the nonce to the backfill value.
    const backfill = transactionCount < this.lastReceivedTxCount;
    if (backfill) {
      // If for some reason the transaction count we received from the provider is lower than the last once we received (meaning nonce
      // backtracked), we should start at the lower value instead. This will backfill any nonce gaps that may have been left behind
      // as a result of provider connection issues and/or reorgs.
      // NOTE: If this backfill replaces an "existing" faulty transaction (i.e. one that the provider doesn't actually have in mempool),
      // the push operation to the inflight buffer we do in the send method will handle replacing/killing the faulty transaction.
      nonce = transactionCount;
    } else if (error) {
      if (
        error.reason === BadNonce.reasons.NonceExpired ||
        // TODO: Should replacement underpriced result in us raising the gas price and attempting to override the transaction?
        // Or should we treat the nonce as expired?
        error.reason === BadNonce.reasons.ReplacementUnderpriced
      ) {
        // Currently only two possibilities are known to (potentially) cause this to happen:
        // 1. Signer used outside of this class to send tx (should never happen).
        // 2. The router was rebooted, and our nonce has not yet caught up with that in the current pending pool of txs.
        // If we haven't tried the up-to-date tx count, let's try that next; otherwise, just increment the nonce by 1 until we
        // get a nonce we haven't tried.
        if (!attemptedNonces.includes(transactionCount)) {
          nonce = transactionCount;
        } else {
          // TODO: Do we need to set the nonce to the lowest/min value in the array of attempted nonce first?
          while (attemptedNonces.includes(nonce)) {
            nonce++;
          }
        }
      } else if (error.reason === BadNonce.reasons.NonceIncorrect) {
        // It's unknown whether nonce was too low or too high. For safety, we're going to set the nonce to the latest transaction count
        // and retry (continually). Eventually the transaction count will catch up to / converge on the correct number.
        // NOTE: This occasionally happens because a provider falls behind in terms of the current mempool and hasn't registered a tx yet.
        // Regardless of whether we've already attempted this nonce, we're going to try it again.
        nonce = transactionCount;
      }
    }

    // Set lastReceivedTxCount - this will be used in future calls of this method to determine if we need to backtrack nonce (i.e. backfill).
    this.lastReceivedTxCount = transactionCount;
    attemptedNonces.push(nonce);
    // TODO: Should we just set/update the member var nonce here? In which case, add 1 in the TODO above? ^^
    // this.nonce = nonce;
    return { nonce, backfill, transactionCount };
  }

  /// LIFECYCLE
  /**
   *
   * @param minTx - Minimum transaction params needed to form a transaction.
   * @param context - Request context object used for logging.
   *
   * @returns A list of receipts or errors that occurred for each.
   */
  public async send(minTx: WriteTransaction, context: RequestContext): Promise<providers.TransactionReceipt> {
    const { requestContext, methodContext } = createLoggingContext(this.send.name, context);
    const txsId = getUuid();
    this.logger.debug("Method start", requestContext, methodContext, {
      chainId: this.chainId,
      minTx: { to: minTx.to, from: minTx.from },
      txsId,
    });

    const result = await this.queue.add(async (): Promise<{ value: Transaction | NxtpError; success: boolean }> => {
      try {
        // Wait until there's room in the buffer.
        if (this.inflightBuffer.isFull) {
          this.logger.warn("Inflight buffer is full! Waiting in queue to send.", requestContext, methodContext, {
            chainId: this.chainId,
            bufferLength: this.inflightBuffer.length,
            txsId,
          });
          while (this.inflightBuffer.isFull) {
            await delay(200);
          }
        }

        // Estimate gas here will throw if the transaction is going to revert on-chain for "legit" reasons. This means
        // that, if we get past this method, we can *generally* assume that the transaction will go through on submit - although it's
        // still possible to revert due to a state change below.
        const gas = await this.getGas(minTx, requestContext);

        // Get initial nonce.
        const attemptedNonces: number[] = [];
        let { nonce, backfill, transactionCount } = await this.determineNonce(attemptedNonces);

        // Here we are going to ensure our initial submit gets through at the correct nonce. If all goes well, it should
        // go through on the first try.
        let transaction: Transaction | undefined = undefined;
        let lastErrorReceived: Error | undefined = undefined;
        // It should never take more than MAX_INFLIGHT_TRANSACTIONS + 2 iterations to get the transaction through.
        let iterations = 0;
        while (
          iterations < TransactionDispatch.MAX_INFLIGHT_TRANSACTIONS + 2 &&
          (!transaction || !transaction.didSubmit)
        ) {
          iterations++;
          // Create a new transaction instance to track lifecycle. We will be submitting below.
          transaction = new Transaction(
            requestContext,
            minTx,
            nonce,
            gas,
            {
              confirmationTimeout: this.confirmationTimeout,
              confirmationsRequired: this.confirmationsRequired,
            },
            txsId,
          );
          this.logger.debug("Sending initial submit for transaction.", requestContext, methodContext, {
            chainId: this.chainId,
            iterations,
            lastErrorReceived,
            transaction: transaction.loggable,
            nonceInfo: {
              backfill,
              transactionCount,
              localNonce: this.nonce,
              assignedNonce: nonce,
            },
          });
          try {
            if (backfill) {
              const replaced = this.inflightBuffer.getTxByNonce(transaction.nonce);
              // Lets make sure we only replace/backfill a transaction that did not actually make it to chain.
              if (replaced) {
                transaction.gas.price = replaced.gas.price;
              }
            }
            await this.submit(transaction);
          } catch (error) {
            if (error.type === BadNonce.type) {
              lastErrorReceived = error.reason;
              ({ nonce, backfill, transactionCount } = await this.determineNonce(attemptedNonces, error));
              continue;
            }
            // This could be a reverted error, etc.
            throw error;
          }
        }
        if (!transaction || transaction.responses.length === 0) {
          throw new TransactionServiceFailure(
            "Transaction never submitted: exceeded maximum iterations in initial submit loop.",
          );
        }
        // Push submitted transaction to inflight buffer.
        this.inflightBuffer.push(transaction);
        // Increment the successful nonce, and assign our local nonce to that value.
        this.nonce = nonce + 1;
        return { value: transaction, success: true };
      } catch (error) {
        return { value: error, success: false };
      }
    });

    if (!result.success) {
      throw result.value;
    }

    const transaction = result.value as Transaction;
    // Wait for transaction to be picked up by the mine and confirm loops and closed out.
    while (!transaction.didFinish && !transaction.error) {
      await delay(1_000);
    }

    if (transaction.error) {
      throw transaction.error;
    }

    if (!transaction.receipt) {
      throw new TransactionServiceFailure("Transaction did not return a receipt");
    }

    return transaction.receipt;
  }

  private async submit(transaction: Transaction) {
    const method = this.submit.name;
    const { requestContext, methodContext } = createLoggingContext(method, transaction.context);
    this.logger.debug("Method start", requestContext, methodContext, {
      chainId: this.chainId,
      txsId: transaction.uuid,
    });

    // Check to make sure we haven't already mined this transaction.
    if (transaction.didFinish) {
      // NOTE: We do not set this._error here, as the transaction hasn't failed - just the txservice.
      throw new TransactionServiceFailure("Submit was called but transaction is already completed.", { method });
    }

    // Check to make sure that, if this is a replacement tx, the replacement gas is higher.
    if (transaction.responses.length > 0) {
      // NOTE: There *should* always be a gasPrice in every response, but it is
      // defined as optional. Handle that case?
      // If there isn't a lastPrice, we're going to skip this validation step.
      const lastPrice = transaction.responses[transaction.responses.length - 1].gasPrice;
      if (lastPrice && transaction.gas.price.lte(lastPrice)) {
        // NOTE: We do not set this._error here, as the transaction hasn't failed - just the txservice.
        throw new TransactionServiceFailure("Gas price was not incremented from last transaction.", { method });
      }
    }

    // Increment transaction # attempts made.
    transaction.attempt++;
    // Set the timestamp according to when we last submitted.
    transaction.timestamp = Date.now();

    // Send the tx.
    const result = await this.sendTransaction(transaction);
    // If we end up with an error, it should be thrown here.
    if (result.isErr()) {
      const error = result.error;
      if (
        error.type === TransactionReverted.type &&
        (error as TransactionReverted).reason === TransactionReverted.reasons.InsufficientFunds
      ) {
        this.logger.error(
          "ROUTER HAS INSUFFICIENT FUNDS TO SUBMIT TRANSACTION.",
          requestContext,
          methodContext,
          jsonifyError(error),
          {
            chainId: this.chainId,
            transaction: transaction.loggable,
          },
        );
      }
      throw result.error;
    }

    // Add this response to our local response history.
    const response = result.value;
    if (transaction.hashes.includes(response.hash)) {
      // Duplicate response? This should never happen.
      throw new TransactionServiceFailure("Received a transaction response with a duplicate hash!", {
        method,
        chainId: this.chainId,
        response,
        transaction: transaction.loggable,
      });
    }
    transaction.responses.push(response);

    this.logger.info(`Tx submitted.`, requestContext, methodContext, {
      chainId: this.chainId,
      transaction: transaction.loggable,
    });
    this.callbacks.onSubmit(transaction);
  }

  private async mine(transaction: Transaction) {
    const method = this.mine.name;
    const { requestContext, methodContext } = createLoggingContext(method, transaction.context);
    this.logger.debug("Method start", requestContext, methodContext, {
      chainId: this.chainId,
      txsId: transaction.uuid,
    });

    // Ensure we've submitted at least 1 tx.
    if (!transaction.didSubmit) {
      throw new TransactionServiceFailure("Transaction mine was called, but no transaction has been sent.", {
        method,
        chainId: this.chainId,
        transaction: transaction.loggable,
      });
    }

    // Get receipt for tx with at least 1 confirmation. If it times out (using default, configured timeout),
    // it will throw a TransactionTimeout error.
    const result = await this.confirmTransaction(transaction, 1);
    if (result.isErr()) {
      const { error: _error } = result;
      if (_error.type === TransactionReplaced.type) {
        const error = _error as TransactionReplaced;
        this.logger.debug(
          "Received TransactionReplaced error - but this may be expected behavior.",
          requestContext,
          methodContext,
          {
            chainId: this.chainId,
            error,
            transaction: transaction.loggable,
          },
        );
        // Sanity check.
        if (!error.replacement || !error.receipt) {
          throw new TransactionServiceFailure(
            "Transaction was replaced, but no replacement transaction and/or receipt was returned.",
            {
              method,
              chainId: this.chainId,
              replacement: error.replacement,
              receipt: error.receipt,
              transaction: transaction.loggable,
            },
          );
        }

        // Validate that we've been replaced by THIS transaction (and not an unrecognized transaction).
        if (
          transaction.responses.length < 2 ||
          !transaction.responses.map((response) => response.hash).includes(error.replacement.hash)
        ) {
          throw error;
        }

        // error.receipt - the receipt of the replacement transaction (a TransactionReceipt)
        transaction.receipt = error.receipt;
      } else if (_error.type === TransactionReverted.type) {
        const error = _error as TransactionReverted;
        // NOTE: This is the official receipt with status of 0, so it's safe to say the
        // transaction was in fact reverted and we should throw here.
        transaction.receipt = error.receipt;
        throw error;
      } else {
        throw _error;
      }
    } else {
      const receipt = result.value;
      // Sanity checks.
      if (receipt == null) {
        // Receipt is undefined or null. This should never occur; timeout should occur before this does,
        // as a null receipt indicates 0 confirmations.
        throw new TransactionServiceFailure("Unable to obtain receipt: ethers responded with null.", {
          method,
          chainId: this.chainId,
          receipt,
          transaction: transaction.loggable,
        });
      } else if (receipt.status === 0) {
        // This should never occur. We should always get a TransactionReverted error in this event.
        throw new TransactionServiceFailure("Transaction was reverted but TransactionReverted error was not thrown.", {
          method,
          chainId: this.chainId,
          receipt,
          transaction: transaction.loggable,
        });
      } else if (receipt.confirmations < 1) {
        // Again, should never occur.
        throw new TransactionServiceFailure("Receipt did not have any confirmations, should have timed out!", {
          method,
          chainId: this.chainId,
          receipt: transaction.receipt,
          transaction: transaction.loggable,
        });
      }
      // Set transaction's receipt.
      transaction.receipt = receipt;
    }

    this.logger.info(`Tx mined.`, requestContext, methodContext, {
      chainId: this.chainId,
      transaction: transaction.loggable,
    });
    this.callbacks.onMined(transaction);
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
   * @param transaction -
   */
  private async confirm(transaction: Transaction) {
    const method = this.confirm.name;
    const { requestContext, methodContext } = createLoggingContext(method, transaction.context);
    this.logger.debug("Method start", requestContext, methodContext, {
      chainId: this.chainId,
      txsId: transaction.uuid,
    });

    // Ensure we've submitted a tx.
    if (!transaction.didSubmit) {
      throw new TransactionServiceFailure("Transaction mine was called, but no transaction has been sent.", {
        method,
        chainId: this.chainId,
        transaction: transaction.loggable,
      });
    }

    if (!transaction.receipt) {
      throw new TransactionServiceFailure(
        "Tried to confirm but tansaction did not complete 'mine' step; no receipt was found.",
        {
          method,
          chainId: this.chainId,
          receipt: transaction.receipt === undefined ? "undefined" : transaction.receipt,
          transaction: transaction.loggable,
        },
      );
    }

    // Here we wait for the target confirmations.
    // TODO: Ensure we are comfortable with how this timeout period is calculated.
    const timeout = this.confirmationTimeout * this.confirmationsRequired * 2;
    const confirmResult = await this.confirmTransaction(transaction, this.confirmationsRequired, timeout);
    if (confirmResult.isErr()) {
      // No other errors should occur during this confirmation attempt. This could occur during a reorg.
      throw new TransactionServiceFailure(TransactionServiceFailure.reasons.NotEnoughConfirmations, {
        method,
        chainId: this.chainId,
        receipt: transaction.receipt,
        error: transaction.error,
        transaction: transaction.loggable,
      });
    }
    const receipt = confirmResult.value;
    if (receipt == null) {
      // Should never occur.
      throw new TransactionServiceFailure("Transaction receipt was null.", {
        method,
        chainId: this.chainId,
        badReceipt: receipt,
        minedReceipt: transaction.receipt,
        transaction: transaction.loggable,
      });
    } else if (receipt.status === 0) {
      // This should never occur. We should always get a TransactionReverted error in this event : and that error should
      // have been thrown in the mine() method.
      throw new TransactionServiceFailure("Transaction was reverted but TransactionReverted error was not thrown.", {
        method,
        chainId: this.chainId,
        receipt,
        transaction: transaction.loggable,
      });
    }
    transaction.receipt = receipt;

    this.logger.info(`Tx confirmed.`, requestContext, methodContext, {
      chainId: this.chainId,
      receipt: {
        gasUsed: receipt.gasUsed.toString(),
        transactionHash: receipt.transactionHash,
        blockHash: receipt.blockHash,
      },
      transaction: transaction.loggable,
    });
    this.callbacks.onConfirm(transaction);
  }

  /**
   * Bump the gas price for this tx up by the configured percentage.
   */
  public async bump(transaction: Transaction) {
    const { requestContext, methodContext } = createLoggingContext(this.bump.name, transaction.context);
    if (transaction.attempt >= Transaction.MAX_ATTEMPTS) {
      const error = new TransactionServiceFailure(TransactionServiceFailure.reasons.MaxAttemptsReached, {
        gasPrice: `${utils.formatUnits(transaction.gas.price, "gwei")} gwei`,
        transaction: transaction.loggable,
      });
      throw error;
    } else if (transaction.bumps >= transaction.hashes.length) {
      // If we've already bumped this tx but it's failed to resubmit, we should return here without bumping.
      // The number of gas bumps we've done should always be less than the number of txs we've submitted.
      return;
    }
    transaction.bumps++;
    const previousPrice = transaction.gas.price;
    // Get the current gas baseline price, in case it's changed drastically in the last block.
    const result = await this.getGasPrice(requestContext);
    const updatedPrice = result.isOk() ? result.value : BigNumber.from(this.config.gasMinimum);
    const determinedBaseline = updatedPrice.gt(previousPrice) ? updatedPrice : previousPrice;
    // Scale up gas by percentage as specified by config.
    transaction.gas.price = determinedBaseline
      .add(determinedBaseline.mul(this.config.gasReplacementBumpPercent).div(100))
      .add(1);
    this.logger.info(`Tx bumped.`, requestContext, methodContext, {
      chainId: this.chainId,
      updatedPrice: utils.formatUnits(updatedPrice, "gwei"),
      previousPrice: utils.formatUnits(previousPrice, "gwei"),
      newGasPrice: utils.formatUnits(transaction.gas.price, "gwei"),
      transaction: transaction.loggable,
    });
  }

  private async fail(transaction: Transaction) {
    const { requestContext, methodContext } = createLoggingContext(this.fail.name, transaction.context);
    this.logger.error(
      "Tx failed.",
      requestContext,
      methodContext,
      jsonifyError(transaction.error ?? new Error("No transaction error was present.")),
      {
        chainId: this.chainId,
        transaction: transaction.loggable,
      },
    );
    this.callbacks.onFail(transaction);
  }

  /// HELPERS
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
}
