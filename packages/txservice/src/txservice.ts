import { Signer, providers, BigNumber, utils } from "ethers";
import { Evt } from "evt";
import { createLoggingContext, jsonifyError, Logger, NxtpError, RequestContext } from "@connext/nxtp-utils";

import { TransactionServiceConfig, validateTransactionServiceConfig, DEFAULT_CONFIG, ChainConfig } from "./config";
import { ReadTransaction, WriteTransaction } from "./types";
import { AlreadyMined, TimeoutError, TransactionError, TransactionServiceFailure } from "./error";
import { TransactionDispatch, TransactionInterface } from "./dispatch";

export type TxServiceSubmittedEvent = {
  response: providers.TransactionResponse;
};

export type TxServiceConfirmedEvent = {
  receipt: providers.TransactionReceipt;
};

export type TxServiceFailedEvent = {
  error: TransactionError;
  receipt?: providers.TransactionReceipt;
};

export const NxtpTxServiceEvents = {
  TransactionAttemptSubmitted: "TransactionAttemptSubmitted",
  TransactionConfirmed: "TransactionConfirmed",
  TransactionFailed: "TransactionFailed",
} as const;
export type NxtpTxServiceEvent = typeof NxtpTxServiceEvents[keyof typeof NxtpTxServiceEvents];

export interface NxtpTxServiceEventPayloads {
  [NxtpTxServiceEvents.TransactionAttemptSubmitted]: TxServiceSubmittedEvent;
  [NxtpTxServiceEvents.TransactionConfirmed]: TxServiceConfirmedEvent;
  [NxtpTxServiceEvents.TransactionFailed]: TxServiceFailedEvent;
}

/**
 * @classdesc Handles submitting, confirming, and bumping gas of arbitrary transactions onchain. Also performs onchain reads with embedded retries
 */
export class TransactionService {
  // TODO: #152 Add an object/dictionary statically to the class prototype mapping the
  // signer to a flag indicating whether there is an instance using that signer.
  // This will prevent two queue instances using the same signer and therefore colliding.
  // Idea is to have essentially a modified 'singleton'-like pattern.
  // private static _instances: Map<string, TransactionService> = new Map();
  private static instance?: TransactionService;

  private readonly logger: Logger;

  /// Events emitted in lifecycle of TransactionService's sendTx.
  private evts: { [K in NxtpTxServiceEvent]: Evt<NxtpTxServiceEventPayloads[K]> } = {
    [NxtpTxServiceEvents.TransactionAttemptSubmitted]: Evt.create<TxServiceSubmittedEvent>(),
    [NxtpTxServiceEvents.TransactionConfirmed]: Evt.create<TxServiceConfirmedEvent>(),
    [NxtpTxServiceEvents.TransactionFailed]: Evt.create<TxServiceFailedEvent>(),
  };

  private config: TransactionServiceConfig;
  private providers: Map<number, TransactionDispatch> = new Map();

  /**
   * A singleton-like interface for handling all logic related to conducting on-chain transactions.
   *
   * @remarks
   * Using the Signer instance passed into this constructor outside of the context of this
   * class is not recommended, and may cause issues with nonce being tracked improperly
   * due to the caching mechanisms used here.
   *
   * @param logger The Logger used for logging.
   * @param signer The Signer or Wallet instance, or private key, for signing transactions.
   * @param config At least a partial configuration used by TransactionService for chains,
   * providers, etc.
   */
  constructor(logger: Logger, signer: string | Signer, config: Partial<TransactionServiceConfig>) {
    const { requestContext, methodContext } = createLoggingContext("TransactionService.constructor");
    // TODO: #152 See above TODO. Should we have a getInstance() method and make constructor private ??
    // const _signer: string = typeof signer === "string" ? signer : signer.getAddress();
    // if (TransactionService._instances.has(_signer)) {}
    if (TransactionService.instance) {
      const msg = "CRITICAL: TransactionService.constructor was called twice! Please report this incident.";
      const error = new NxtpError(msg);
      logger.error(msg, requestContext, methodContext, error, {
        instance: TransactionService.instance.toString(),
      });
      throw error;
    }

    this.logger = logger;
    // Set up the config.
    this.config = Object.assign(DEFAULT_CONFIG, config);
    validateTransactionServiceConfig(this.config);
    // For each chain ID / provider, map out all the utils needed for each chain.
    const chains = this.config.chains;
    Object.keys(chains).forEach((chainId) => {
      // Get this chain's config.
      const chain: ChainConfig = chains[chainId];
      // Ensure at least one provider is configured.
      if (chain.providers.length === 0) {
        const error = new TransactionServiceFailure(`Provider configurations not found for chainID: ${chainId}`);
        this.logger.error("Failed to create transaction service", requestContext, methodContext, error.toJson(), {
          chainId,
          providers,
        });
        throw error;
      }
      const chainIdNumber = parseInt(chainId);
      const provider = new TransactionDispatch(this.logger, signer, chainIdNumber, chain, this.config);
      this.providers.set(chainIdNumber, provider);
    });
    // Set the singleton instance.
    TransactionService.instance = this;
  }

  /**
   * Send specified transaction on specified chain and wait for the configured number of confirmations.
   * Will emit events throughout its lifecycle.
   *
   * @param tx - Tx to send
   * @param tx.chainId - Chain to send transaction on
   * @param tx.to - Address to send tx to
   * @param tx.value - Value to send tx with
   * @param tx.data - Calldata to execute
   * @param tx.from - (optional) Account to send tx from
   *
   * @returns TransactionReceipt once the tx is mined if the transaction was successful.
   *
   * @throws TransactionError with one of the reasons specified in ValidSendErrors. If another error occurs,
   * something went wrong within TransactionService process.
   * @throws TransactionServiceFailure, which indicates something went wrong with the service logic.
   */
  public async sendTx(tx: WriteTransaction, _requestContext: RequestContext): Promise<providers.TransactionReceipt> {
    const { requestContext, methodContext } = createLoggingContext(this.sendTx.name, _requestContext);
    this.logger.debug("Method start", requestContext, methodContext, {
      tx: { ...tx, value: tx.value.toString(), data: `${tx.data.substring(0, 9)}...` },
    });

    const newTx = () => this.getProvider(tx.chainId).createTransaction(tx, requestContext);

    let transaction = await newTx();
    let nonceExpired = 0;
    try {
      while (!transaction.didFinish) {
        // Submit: send to chain.
        try {
          await this.submitTransaction(transaction, requestContext);
        } catch (error) {
          this.logger.debug(`Transaction submit step: received ${error.type} error.`, requestContext, methodContext, {
            id: transaction.id,
            attempt: transaction.attempt,
            error: jsonifyError(error),
            responses: transaction.responses.map((r) => r.hash),
          });
          if (error.type === AlreadyMined.type) {
            if (transaction.attempt === 1) {
              if (nonceExpired > 1000) {
                // Nonce expired emergency stop: we should never encounter this expired nonce situation this many times.
                this.logger.warn(`Nonce expired encountered > MAX (1000)`, requestContext, methodContext, {
                  id: transaction.id,
                  attempt: transaction.attempt,
                  nonceExpired,
                  error: jsonifyError(error),
                });
                throw error;
              }
              // A transaction that's only been attempted once has an expired nonce. This means that dispatch
              // assigned us an already-used nonce.
              nonceExpired++;
              // In this event, we need to go back to the beginning and actually "recreate" the transaction
              // itself now. Assuming our nonce tracker (dispatch) is effective, this should normally never occur...
              // but there is at least 1 legit edge case: if the dispatch has just come online, it can only rely on
              // the provider's tx count (getTransactionCount) to assign nonce - and the provider turns out to be
              // incorrect (e.g. off by 1 or 2 pending tx's not in its mempool yet for some reason).
              transaction = await newTx();
              continue;
            } else {
              // Ignore this error, proceed to validation step.
              this.logger.debug("Continuing to confirmation step.", requestContext, methodContext, {
                id: transaction.id,
              });
            }
          } else {
            throw error;
          }
        }

        // Validate: wait for 1 confirmation.
        try {
          await transaction.validate();
        } catch (error) {
          this.logger.debug(
            `Transaction validation step: received ${error.type} error.`,
            requestContext,
            methodContext,
            { id: transaction.id, attempt: transaction.attempt, error: jsonifyError(error) },
          );
          if (error.type === TimeoutError.type) {
            // Transaction timed out trying to validate. We should bump the tx and submit again.
            await transaction.bumpGasPrice();
            continue;
          } else {
            throw error;
          }
        }

        // Confirm: get target # confirmations.
        try {
          await this.confirmTransaction(transaction, requestContext);
          break;
        } catch (error) {
          this.logger.debug(
            `Transaction confirmation step: received ${error.type} error`,
            requestContext,
            methodContext,
            { id: transaction.id, attempt: transaction.attempt, error: jsonifyError(error) },
          );
          if (error.type === TimeoutError.type) {
            // Transaction timed out trying to confirm. This implies a re-org has happened. We should attempt to resubmit.
            this.logger.warn(
              "Transaction timed out waiting for target confirmations. A possible re-org has occurred; resubmitting transaction.",
              requestContext,
              methodContext,
              { id: transaction.id },
            );
            continue;
          } else {
            throw error;
          }
        }
      }
    } catch (error) {
      this.handleFail(error, transaction, requestContext);
      throw error;
    }

    return transaction.receipt!;
  }

  /**
   * Create a non-state changing contract call. Returns hexdata that needs to be decoded.
   *
   * @param tx - ReadTransaction to create contract call
   * @param tx.chainId - Chain to read transaction on
   * @param tx.to - Address to execute read on
   * @param tx.data - Calldata to send
   *
   * @returns Encoded hexdata representing result of the read from the chain.
   */
  public async readTx(tx: ReadTransaction): Promise<string> {
    const result = await this.getProvider(tx.chainId).readTransaction(tx);
    if (result.isErr()) {
      throw result.error;
    } else {
      return result.value;
    }
  }

  /**
   * Gets the native asset balance for an address
   *
   * @param chainId - The ID of the chain for which this call is related.
   * @param address - The hexadecimal string address whose balance we are getting.
   * @returns BigNumber representing the current value held by the wallet at the
   * specified address.
   */
  public async getBalance(chainId: number, address: string): Promise<BigNumber> {
    const result = await this.getProvider(chainId).getBalance(address);
    if (result.isErr()) {
      throw result.error;
    } else {
      return result.value;
    }
  }

  /**
   * Gets the decimals for an asset by chainId
   *
   * @param chainId - The ID of the chain for which this call is related.
   * @param assetId - The hexadecimal string address whose decimals we are getting.
   * @returns number representing the decimals of the asset
   */
  public async getDecimalsForAsset(chainId: number, assetId: string): Promise<number> {
    const result = await this.getProvider(chainId).getDecimalsForAsset(assetId);
    if (result.isErr()) {
      throw result.error;
    } else {
      return result.value;
    }
  }

  /**
   * Gets the current blocktime
   *
   * @param chainId - The ID of the chain for which this call is related.
   * @returns number representing the current blocktime
   */
  public async getBlockTime(chainId: number): Promise<number> {
    const result = await this.getProvider(chainId).getBlockTime();
    if (result.isErr()) {
      throw result.error;
    } else {
      return result.value;
    }
  }

  /**
   * Gets the current block number
   *
   * @param chainId - The ID of the chain for which this call is related.
   * @returns number representing the current block
   */
  public async getBlockNumber(chainId: number): Promise<number> {
    const result = await this.getProvider(chainId).getBlockNumber();
    if (result.isErr()) {
      throw result.error;
    } else {
      return result.value;
    }
  }

  /**
   * Gets a trsanction receipt by hash
   *
   * @param chainId - The ID of the chain for which this call is related.
   * @returns number representing the current blocktime
   */
  public async getTransactionReceipt(chainId: number, hash: string): Promise<providers.TransactionReceipt> {
    const result = await this.getProvider(chainId).getTransactionReceipt(hash);
    if (result.isErr()) {
      throw result.error;
    } else {
      return result.value;
    }
  }

  /// LISTENER METHODS
  /**
   * Attaches a callback to the emitted event
   *
   * @param event - The event name to attach a handler for
   * @param callback - The callback to invoke on event emission
   * @param filter - (optional) A filter where callbacks are only invoked if the filter returns true
   * @param timeout - (optional) A timeout to detach the handler within. I.e. if no events fired within the timeout, then the handler is detached
   */
  public attach<T extends NxtpTxServiceEvent>(
    event: T,
    callback: (data: NxtpTxServiceEventPayloads[T]) => void,
    filter: (data: NxtpTxServiceEventPayloads[T]) => boolean = (_data: NxtpTxServiceEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    this.evts[event].pipe(filter).attach(...(args as [number, any]));
  }

  /**
   * Attaches a callback to the emitted event that will be executed one time and then detached.
   *
   * @param event - The event name to attach a handler for
   * @param callback - The callback to invoke on event emission
   * @param filter - (optional) A filter where callbacks are only invoked if the filter returns true
   * @param timeout - (optional) A timeout to detach the handler within. I.e. if no events fired within the timeout, then the handler is detached
   *
   */
  public attachOnce<T extends NxtpTxServiceEvent>(
    event: T,
    callback: (data: NxtpTxServiceEventPayloads[T]) => void,
    filter: (data: NxtpTxServiceEventPayloads[T]) => boolean = (_data: NxtpTxServiceEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    this.evts[event].pipe(filter).attachOnce(...(args as [number, any]));
  }

  /**
   * Removes all attached handlers from the given event.
   *
   * @param event - (optional) The event name to remove handlers from. If not provided, will detach handlers from *all* subgraph events
   */
  public detach<T extends NxtpTxServiceEvent>(event?: T): void {
    if (event) {
      this.evts[event].detach();
      return;
    }
    Object.values(this.evts).forEach((evt) => evt.detach());
  }

  /**
   * Returns a promise that resolves when the event matching the filter is emitted
   *
   * @param event - The event name to wait for
   * @param timeout - The ms to continue waiting before rejecting
   * @param filter - (optional) A filter where the promise is only resolved if the filter returns true
   *
   * @returns Promise that will resolve with the event payload once the event is emitted, or rejects if the timeout is reached.
   *
   */
  public waitFor<T extends NxtpTxServiceEvent>(
    event: T,
    timeout: number,
    filter: (data: NxtpTxServiceEventPayloads[T]) => boolean = (_data: NxtpTxServiceEventPayloads[T]) => true,
  ): Promise<NxtpTxServiceEventPayloads[T]> {
    return this.evts[event].pipe(filter).waitFor(timeout) as Promise<NxtpTxServiceEventPayloads[T]>;
  }

  /// HELPERS
  /**
   * Helper to wrap getting provider for specified chain ID.
   * @param chainId The ID of the chain for which we want a provider.
   * @returns The ChainRpcProvider for that chain.
   * @throws TransactionError.reasons.ProviderNotFound if provider is not configured for
   * that ID.
   */
  private getProvider(chainId: number): TransactionDispatch {
    // Ensure that a signer, provider, etc are present to execute on this chainId.
    if (!this.providers.has(chainId)) {
      throw new TransactionServiceFailure(
        `No provider was found for chain ${chainId}! Make sure this chain's providers are configured.`,
      );
    }
    return this.providers.get(chainId)!;
  }

  /**
   * Handle logging and event emitting on tx submit attempt.
   * @param response The transaction response received back from that attempt.
   */
  private async submitTransaction(transaction: TransactionInterface, context: RequestContext) {
    const { requestContext, methodContext } = createLoggingContext(this.submitTransaction.name, context);
    this.logger.debug(`Submitting tx`, requestContext, methodContext, {
      id: transaction.id,
      attempt: transaction.attempt,
      nonce: transaction.params.nonce,
    });
    const response = await transaction.submit();
    const gas = response.gasPrice ?? transaction.params.gasPrice;
    this.logger.info(`Tx submitted.`, requestContext, methodContext, {
      chainId: transaction.chainId,
      id: transaction.id,
      attempt: transaction.attempt,
      hash: response.hash,
      gas: `${utils.formatUnits(gas, "gwei")} gwei`,
      gasLimit: transaction.params.gasLimit.toString(),
      nonce: response.nonce,
    });
    this.evts[NxtpTxServiceEvents.TransactionAttemptSubmitted].post({ response });
  }

  /**
   * Handle logging and event emitting on tx confirmation.
   * @param receipt The transaction receipt received back.
   */
  private async confirmTransaction(transaction: TransactionInterface, context: RequestContext) {
    const { requestContext, methodContext } = createLoggingContext(this.confirmTransaction.name, context);

    this.logger.debug(`Confirming tx...`, requestContext, methodContext, {
      id: transaction.id,
      attempt: transaction.attempt,
    });
    const receipt = await transaction.confirm();
    this.logger.info(`Tx mined.`, requestContext, methodContext, {
      chainId: transaction.chainId,
      id: transaction.id,
      attempt: transaction.attempt,
      receipt: {
        gasUsed: receipt.gasUsed.toString(),
        transactionHash: receipt.transactionHash,
        blockHash: receipt.blockHash,
      },
    });
    this.evts[NxtpTxServiceEvents.TransactionConfirmed].post({ receipt });
  }

  /**
   * Handle logging and event emitting on tx failure.
   * @param error The TransactionError that occurred during the transaction lifecycle.
   * @param receipt The transaction receipt received back from reverted tx, if
   * applicable.
   */
  private handleFail(error: TransactionError, transaction: TransactionInterface, context: RequestContext) {
    const { requestContext, methodContext } = createLoggingContext(this.handleFail.name, context);
    const receipt = transaction.receipt;
    this.logger.error("Tx failed.", requestContext, methodContext, jsonifyError(error), {
      id: transaction.id,
      receipt,
      context,
      error,
    });
    this.evts[NxtpTxServiceEvents.TransactionFailed].post({ error, receipt });
  }
}
