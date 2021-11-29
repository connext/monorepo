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

import { Gas, WriteTransaction, OnchainTransaction, TransactionBuffer } from "./types";
import {
  BadNonce,
  TransactionReplaced,
  TransactionReverted,
  TimeoutError,
  TransactionBackfilled,
  InitialSubmitFailure,
  TransactionProcessingError,
  NotEnoughConfirmations,
} from "./error";
import { ChainConfig, TransactionServiceConfig } from "./config";
import { ChainRpcProvider } from "./provider";

export type DispatchCallbacks = {
  onSubmit: (transaction: OnchainTransaction) => void;
  onMined: (transaction: OnchainTransaction) => void;
  onConfirm: (transaction: OnchainTransaction) => void;
  onFail: (transaction: OnchainTransaction) => void;
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

      // Starts an interval loop that synchronizes the provider every configured interval.
      interval(async () => await this.syncProviders(), this.config.syncProvidersInterval);
    }
  }

  /**
   * Check for mined transactions in the inflight buffer; if any are present it will wait for 1 confirmation
   * and then push the transaction to the mined buffer for each one in FIFO order.
   */
  private async mineLoop() {
    const { requestContext, methodContext } = createLoggingContext(this.mineLoop.name);
    let transaction: OnchainTransaction | undefined = undefined;
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
              const transactionCount = await this.getTransactionCount("latest");
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
  private async determineNonce(
    attemptedNonces: number[],
    error?: BadNonce,
  ): Promise<{ nonce: number; backfill: boolean; transactionCount: number }> {
    const transactionCount = await this.getTransactionCount("latest");

    // Set the nonce initially to the last used nonce. If no nonce has been used yet (i.e. this is the first initial send attempt),
    // set to whichever value is higher: local nonce or txcount. This should almost always be our local nonce, but often both will be the same.
    let nonce =
      attemptedNonces.length > 0
        ? attemptedNonces[attemptedNonces.length - 1]
        : Math.max(
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
        // If we are here, likely one of following has occurred:
        // 1. Signer used outside of this class to send tx (should never happen).
        // 2. The router was rebooted, and our nonce has not yet caught up with that in the current pending pool of txs.
        // 3. We just performed a backfill operation, and are now catching back up to the *actual* nonce.
        if (!attemptedNonces.includes(transactionCount)) {
          // If we have not tried mined tx count, let's try that next.
          nonce = transactionCount;
        } else {
          // If we haven't tried the up-to-date tx count (latest or pending), let's try that next.
          const pendingTransactionCount = await this.getTransactionCount("pending");
          if (!attemptedNonces.includes(pendingTransactionCount)) {
            nonce = pendingTransactionCount;
          } else {
            // If mined and pending tx count fail, we should just increment the nonce by 1 until we get a nonce we haven't tried.
            // This is sort of a spray-and-pray solution, but it's the best we can do when providers aren't giving us more reliable info.
            // Set the nonce to the lowest/min value in the array of attempted nonce first.
            nonce = Math.min(...attemptedNonces);
            while (attemptedNonces.includes(nonce)) {
              nonce++;
            }
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
    const method = this.send.name;
    const { requestContext, methodContext } = createLoggingContext(method, context);
    const txsId = getUuid();
    this.logger.debug("Method start", requestContext, methodContext, {
      chainId: this.chainId,
      txsId,
    });

    const result = await this.queue.add(
      async (): Promise<{ value: OnchainTransaction | NxtpError; success: boolean }> => {
        try {
          // Wait until there's room in the buffer.
          if (this.inflightBuffer.isFull) {
            this.logger.warn("Inflight buffer is full! Waiting in queue to send.", requestContext, methodContext, {
              chainId: this.chainId,
              bufferLength: this.inflightBuffer.length,
              txsId,
            });
            while (this.inflightBuffer.isFull) {
              // TODO: This delay was raised to help alleviate a "trickling bottleneck" when the inflight buffer remains full for
              // an extended period. An alternative: maybe we should wait until the buffer falls *below* a certain threshold?
              await delay(10_000);
            }
          }

          // Estimate gas here will throw if the transaction is going to revert on-chain for "legit" reasons. This means
          // that, if we get past this method, we can *generally* assume that the transaction will go through on submit - although it's
          // still possible to revert due to a state change below.
          const attemptedNonces: number[] = [];
          const [gasLimit, gasPrice, nonceInfo] = await Promise.all([
            this.estimateGas(minTx),
            this.getGasPrice(requestContext),
            this.determineNonce(attemptedNonces),
          ]);
          let { nonce, backfill, transactionCount } = nonceInfo;

          // TODO: Remove hardcoded (exposed gasLimitInflation config var should replace this).
          let gas = new Gas(gasPrice, gasLimit);
          if (this.chainId === 42161) {
            gas = new Gas(gas.baseValue, BigNumber.from(10_000_000));
          }

          // Here we are going to ensure our initial submit gets through at the correct nonce. If all goes well, it should
          // go through on the first try.
          let transaction: OnchainTransaction | undefined = undefined;
          let lastErrorReceived: Error | undefined = undefined;

          // It should never take more than MAX_INFLIGHT_TRANSACTIONS + 2 iterations to get the transaction through.
          let iterations = 0;
          while (
            iterations < TransactionDispatch.MAX_INFLIGHT_TRANSACTIONS + 2 &&
            (!transaction || !transaction.didSubmit)
          ) {
            iterations++;
            // Create a new transaction instance to track lifecycle. We will be submitting below.
            transaction = new OnchainTransaction(
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
                attemptedNonces,
                backfill: backfill ?? undefined,
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
            throw new InitialSubmitFailure(
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
      },
    );

    if (!result.success) {
      throw result.value;
    }

    const transaction = result.value as OnchainTransaction;
    // Wait for transaction to be picked up by the mine and confirm loops and closed out.
    while (!transaction.didFinish && !transaction.error) {
      // TODO: Use wait, and wait a designated number of blocks if possible to optimize!
      await delay(1_000);
    }

    if (transaction.error) {
      throw transaction.error;
    }

    if (!transaction.receipt) {
      throw new TransactionProcessingError(TransactionProcessingError.reasons.NoReceipt, method);
    }

    return transaction.receipt;
  }

  /**
   * Submit an OnchainTransaction to the chain.
   *
   * @param transaction - OnchainTransaction object to modify based on submit result.
   */
  private async submit(transaction: OnchainTransaction) {
    const method = this.submit.name;
    const { requestContext, methodContext } = createLoggingContext(method, transaction.context);
    this.logger.debug("Method start", requestContext, methodContext, {
      chainId: this.chainId,
      txsId: transaction.uuid,
    });

    // Check to make sure we haven't already mined this transaction.
    if (transaction.didFinish) {
      // NOTE: We do not set this._error here, as the transaction hasn't failed - just the txservice.
      throw new TransactionProcessingError(TransactionProcessingError.reasons.SubmitOutOfOrder, method);
    }

    // Check to make sure that, if this is a replacement tx, the replacement gas is higher.
    if (transaction.responses.length > 0) {
      // NOTE: There *should* always be a gasPrice in every response, but it is
      // defined as optional. Handle that case?
      // If there isn't a lastPrice, we're going to skip this validation step.
      const lastPrice = transaction.responses[transaction.responses.length - 1].gasPrice;
      if (lastPrice && transaction.gas.price.lte(lastPrice)) {
        // NOTE: We do not set this._error here, as the transaction hasn't failed - just the txservice.
        throw new TransactionProcessingError(TransactionProcessingError.reasons.DidNotBump, method);
      }
    }

    // Increment transaction # attempts made.
    transaction.attempt++;

    // Send the tx.
    try {
      const response = await this.sendTransaction(transaction);
      // Add this response to our local response history.
      if (transaction.hashes.includes(response.hash)) {
        // Duplicate response? This should never happen.
        throw new TransactionProcessingError(TransactionProcessingError.reasons.DuplicateHash, method, {
          chainId: this.chainId,
          response,
          transaction: transaction.loggable,
        });
      }
      transaction.responses.push(response);

      this.logger.info(`Tx submitted.`, requestContext, methodContext, {
        chainId: this.chainId,
        response: {
          hash: response.hash,
          nonce: response.nonce,
          gasPrice: response.gasPrice ? utils.formatUnits(response.gasPrice, "gwei") : undefined,
          gasLimit: response.gasLimit.toString(),
        },
        transaction: transaction.loggable,
      });
      this.callbacks.onSubmit(transaction);
    } catch (error) {
      // If we end up with an error, it should be thrown here. But first, log loudly if we get an insufficient
      // funds error.
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
      throw error;
    }
  }

  /**
   * Wait for an OnchainTransaction to be mined (1 confirmation).
   *
   * @param transaction - OnchainTransaction object to modify based on mine result.
   */
  private async mine(transaction: OnchainTransaction) {
    const method = this.mine.name;
    const { requestContext, methodContext } = createLoggingContext(method, transaction.context);
    this.logger.debug("Method start", requestContext, methodContext, {
      chainId: this.chainId,
      txsId: transaction.uuid,
    });

    // Ensure we've submitted at least 1 tx.
    if (!transaction.didSubmit) {
      throw new TransactionProcessingError(TransactionProcessingError.reasons.MineOutOfOrder, method, {
        chainId: this.chainId,
        transaction: transaction.loggable,
      });
    }

    try {
      // Get receipt for tx with at least 1 confirmation. If it times out (using default, configured timeout),
      // it will throw a TransactionTimeout error.
      const receipt = await this.confirmTransaction(transaction, 1);

      // Sanity checks.
      if (receipt.status === 0) {
        // This should never occur. We should always get a TransactionReverted error in this event.
        throw new TransactionProcessingError(TransactionProcessingError.reasons.DidNotThrowRevert, method, {
          chainId: this.chainId,
          receipt,
          transaction: transaction.loggable,
        });
      } else if (receipt.confirmations < 1) {
        // Again, should never occur.
        throw new TransactionProcessingError(TransactionProcessingError.reasons.InsufficientConfirmations, method, {
          chainId: this.chainId,
          receipt: transaction.receipt,
          confirmations: receipt.confirmations,
          transaction: transaction.loggable,
        });
      }

      // Set transaction's receipt.
      transaction.receipt = receipt;
    } catch (_error) {
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
          throw new TransactionProcessingError(TransactionProcessingError.reasons.ReplacedButNoReplacement, method, {
            chainId: this.chainId,
            replacement: error.replacement,
            receipt: error.receipt,
            transaction: transaction.loggable,
          });
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
    }

    this.logger.info(`Tx mined.`, requestContext, methodContext, {
      chainId: this.chainId,
      receipt: {
        transactionHash: transaction.receipt.transactionHash,
        blockNumber: transaction.receipt.blockNumber,
      },
      transaction: transaction.loggable,
    });
    this.callbacks.onMined(transaction);
  }

  /**
   * Makes an attempt to confirm this transaction, waiting up to a designated period to achieve
   * a desired number of confirmation blocks. If confirmation times out, throws TimeoutError.
   * If all txs, including replacements, are reverted, throws TransactionReverted.
   *
   * @param transaction - OnchainTransaction object to modify based on confirm result.
   */
  private async confirm(transaction: OnchainTransaction) {
    const method = this.confirm.name;
    const { requestContext, methodContext } = createLoggingContext(method, transaction.context);
    this.logger.debug("Method start", requestContext, methodContext, {
      chainId: this.chainId,
      txsId: transaction.uuid,
    });

    // Ensure we've submitted a tx.
    if (!transaction.didSubmit) {
      throw new TransactionProcessingError(TransactionProcessingError.reasons.MineOutOfOrder, method, {
        chainId: this.chainId,
        transaction: transaction.loggable,
      });
    }

    if (!transaction.receipt) {
      throw new TransactionProcessingError(TransactionProcessingError.reasons.ConfirmOutOfOrder, method, {
        chainId: this.chainId,
        receipt: transaction.receipt === undefined ? "undefined" : transaction.receipt,
        transaction: transaction.loggable,
      });
    }

    // Here we wait for the target confirmations.
    // TODO: Ensure we are comfortable with how this timeout period is calculated.
    const timeout = this.confirmationTimeout * this.confirmationsRequired * 2;
    let receipt: providers.TransactionReceipt;
    try {
      receipt = await this.confirmTransaction(transaction, this.confirmationsRequired, timeout);
    } catch (error) {
      // No other errors should normally occur during this confirmation attempt. This could occur during a reorg.
      throw new NotEnoughConfirmations(
        this.confirmationsRequired,
        transaction.receipt.transactionHash,
        transaction.receipt.confirmations,
        {
          method,
          chainId: this.chainId,
          receipt: transaction.receipt,
          error: transaction.error,
          transaction: transaction.loggable,
        },
      );
    }

    // Sanity checks.
    if (receipt.status === 0) {
      // This should never occur. We should always get a TransactionReverted error in this event : and that error should
      // have been thrown in the mine() method.
      throw new TransactionProcessingError(TransactionProcessingError.reasons.DidNotThrowRevert, method, {
        chainId: this.chainId,
        receipt,
        transaction: transaction.loggable,
      });
    }

    transaction.receipt = receipt;

    this.logger.info(`Tx confirmed.`, requestContext, methodContext, {
      chainId: this.chainId,
      receipt: {
        transactionHash: transaction.receipt.transactionHash,
        confirmations: transaction.receipt.confirmations,
        blockNumber: transaction.receipt.blockNumber,
      },
      transactionExecutionTime: Date.now() - transaction.timestamp,
      transaction: transaction.loggable,
    });
    this.callbacks.onConfirm(transaction);
  }

  /**
   * Bump the gas price for this tx up by the configured percentage.
   *
   * @param transaction - OnchainTransaction object to modify based on bump result.
   */
  public async bump(transaction: OnchainTransaction) {
    const { requestContext, methodContext } = createLoggingContext(this.bump.name, transaction.context);
    if (
      transaction.bumps >= transaction.hashes.length ||
      transaction.gas.price.gte(BigNumber.from(this.config.gasMaximum))
    ) {
      // If we've already bumped this tx but it's failed to resubmit, we should return here without bumping.
      // The number of gas bumps we've done should always be less than the number of txs we've submitted.
      this.logger.warn("Bump skipped.", requestContext, methodContext, {
        chainId: this.chainId,
        bumps: transaction.bumps,
        gasPrice: utils.formatUnits(transaction.gas.price, "gwei"),
        gasMaximum: utils.formatUnits(this.config.gasMaximum, "gwei"),
      });
      return;
    }
    transaction.bumps++;
    const previousPrice = transaction.gas.price;
    // Get the current gas baseline price, in case it's changed drastically in the last block.
    let updatedPrice: BigNumber;
    try {
      updatedPrice = await this.getGasPrice(requestContext);
    } catch {
      updatedPrice = BigNumber.from(this.config.gasMinimum);
    }
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

  /**
   * Handles OnchainTransaction failure.
   *
   * @param transaction - OnchainTransaction object to read from and modify based on fail event.
   */
  private async fail(transaction: OnchainTransaction) {
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
}
