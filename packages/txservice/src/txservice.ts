/* eslint-disable require-jsdoc */
import { Signer, providers, BigNumber } from "ethers";
import { BaseLogger } from "pino";
import { Evt } from "evt";
import hyperid from "hyperid";
import { jsonifyError } from "@connext/nxtp-utils";
import { okAsync, errAsync, ResultAsync } from "neverthrow";

import { TransactionServiceConfig, validateTransactionServiceConfig, DEFAULT_CONFIG, ChainConfig } from "./config";
// import { ChainError } from "./error";

import { MinimalTransaction } from "./types";
import { ChainRpcProvider } from "./provider";
import { Transaction } from "./transaction";
import { TransactionErrorCode, TransactionServiceError, TransactionServiceFailure } from "./error";

const hId = hyperid();

export type TxServiceSubmittedEvent = {
  response: providers.TransactionResponse;
};

export type TxServiceConfirmedEvent = {
  receipt: providers.TransactionReceipt;
};

export type TxServiceFailedEvent = {
  error: ChainError;
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
  // TODO: Add an object/dictionary statically to the class prototype mapping the
  // signer to a flag indicating whether there is an instance using that signer.
  // This will prevent two queue instances using the same signer and therefore colliding.
  // Idea is to have essentially a modified 'singleton'-like pattern.
  // private static _instances: Map<string, TransactionService> = new Map();

  /// Events emitted in lifecycle of TransactionService's sendTx.
  private evts: { [K in NxtpTxServiceEvent]: Evt<NxtpTxServiceEventPayloads[K]> } = {
    [NxtpTxServiceEvents.TransactionAttemptSubmitted]: Evt.create<TxServiceSubmittedEvent>(),
    [NxtpTxServiceEvents.TransactionConfirmed]: Evt.create<TxServiceConfirmedEvent>(),
    [NxtpTxServiceEvents.TransactionFailed]: Evt.create<TxServiceFailedEvent>(),
  };

  private config: TransactionServiceConfig;
  private providers: Map<number, ChainRpcProvider> = new Map();

  /**
   * A singleton-like interface for handling all logic related to conducting on-chain transactions.
   *
   * @remarks
   * Using the Signer instance passed into this constructor outside of the context of this
   * class is not recommended, and may cause issues with nonce being tracked improperly
   * due to the caching mechanisms used here.
   *
   * @param logger The pino.BaseLogger used for logging.
   * @param signer The Signer or Wallet instance, or private key, for signing transactions.
   * @param config At least a partial configuration used by TransactionService for chains,
   * providers, etc.
   */
  constructor(private readonly logger: BaseLogger, signer: string | Signer, config: Partial<TransactionServiceConfig>) {
    // TODO: See above TODO. Should we have a getInstance() method and make constructor private ??
    // const _signer: string = typeof signer === "string" ? signer : signer.getAddress();
    // if (TransactionService._instances.has(_signer)) {}

    // Set up the config.
    this.config = Object.assign(DEFAULT_CONFIG, config);
    validateTransactionServiceConfig(this.config);
    // For each chain ID / provider, map out all the utils needed for each chain.
    const chains = this.config.chains;
    Object.keys(chains).forEach((chainId) => {
      // Get this chain's config.
      const chain: ChainConfig = chains[chainId];
      // Retrieve provider configs and ensure at least one provider is configured.
      const providers = chain.providers;
      if (providers.length === 0) {
        // TODO: This should be a config parser error (i.e. thrown in config parse).
        const error = `Provider configurations not found for chainID: ${chainId}`;
        this.logger.error({ chainId, providers }, error);
        throw new TransactionServiceFailure(error);
      }
      const chainIdNumber = parseInt(chainId);
      this.providers.set(
        chainIdNumber,
        new ChainRpcProvider(this.logger, signer, chainIdNumber, chain, providers, this.config),
      );
    });
  }

  /**
   * Send specified transaction on specified chain and wait for the configured number of confirmations.
   * Will emit events throughout its lifecycle.
   *
   * @param chainId - Chain to send transaction on
   * @param tx - Tx to send
   * @param tx.chainId - Chain to send transaction on
   * @param tx.to - Address to send tx to
   * @param tx.value - Value to send tx with
   * @param tx.data - Calldata to execute
   * @param tx.from - (optional) Account to send tx from
   * 
   * @returns TransactionReceipt once the tx is mined if the transaction was successful.
   * 
   * @throws ChainError with specified reason.
   */
  public async sendTx(tx: MinimalTransaction): Promise<providers.TransactionReceipt> {
    const method = this.sendTx.name;
    const methodId = hId();
    this.logger.info({ method, methodId, tx }, "Method start");

    const transaction = Transaction.create(this.logger, this.getProvider(tx.chainId), tx, this.config);

    // FLOW:
    // 1 Submit tx.

    // 2 Wait for receipt.
    //   - Confirmation Timeout
    //      -> bump gas
    //      -> 1
    //   - Reverted
    //   -
    // 3 If receipt times out, bump gas and resubmit.
    // 4

    // while (!receipt) {
    //   /// SUBMIT
    //   // First, send tx and get back a response.
    //   const result = await transaction.submit();
    //   if (result.isOk()) {
    //     const response = result.value;
    //     this.handleSubmit(response);
    //   } else {
    //     //   - If we already have a response:
    //     //     -> confirm
    //     //   - else:
    //     //     -> throw
    //   }

    //   receipt = await transaction.confirm();
    //   if (result.isOk
    // }

    // if (transaction.responses.length === 0) {
    //   // If we haven't got a response back, we can safely elevate this error.
    //   throw error;
    // } else if (error instanceof TransactionServiceFailure) {
    //   // Some part of txservice infrastructure failed. We need to ensure this error
    //   // is logged and escalated.
    //   this.logger.error({}, "TransactionServiceFailure occurred for transaction.");
    //   throw error;
    // }

    // } catch (error) {
    //   // Ensure that this is a

    //   switch (error) {
    //     case TransactionErrorCode.TIMEOUT:
    //       // bump gas
    //       break;
    //     case TransactionErrorCode.RPC_ERROR:
    //       // throw
    //       break;
    //     case TransactionErrorCode.REVERTED:
    //       // throw
    //       break;
    //     default:
    //       this.logger.error(
    //         { transaction: transaction.getData() },
    //         "TransactionServiceFailure occurred for transaction.",
    //       );
    //       throw error;
    //   }
    // }

    // const result = await ResultAsync.fromPromise(transaction.submit(), (error) => {
    //   if (transaction.responses.length === 0) {
    //     handleError(error);
    //   }
    // })
    // .andThen((response) => {

    // });

    //   try {
    //     try {
    //       this.handleSubmit(await transaction.submit());
    //     } catch (error) {}

    //     /// CONFIRM
    //     // Now we wait for required number of confirmations and get tx receipt.
    //     try {
    //       receipt = await transaction.confirm();
    //     } catch (error) {
    //       // Check if the error was a confirmation timeout.
    //       if (error.message === ChainError.reasons.ConfirmationTimeout) {
    //         // Bump the gas price up a bit for the next transaction attempt.
    //         transaction.bumpGasPrice();
    //         continue;
    //       }
    //     }
    //   } catch (error) {
    //     const reason = error.reason || error.message;
    //     // If we received an unexpected error, indicating a TransactionService failure, log it!
    //     if (!(reason in Transaction.ValidLifecycleErrors)) {
    //       this.logger.error(
    //         {
    //           receipt: receipt,
    //           error: jsonifyError(error),
    //         },
    //         "Received unexpected error from transaction process!",
    //       );
    //     }

    //     this.handleFail(error, receipt);
    //     throw error;
    //   }
    // }

    // Success!
    // this.handleConfirm(receipt);
    // return receipt;
  }

  /**
   * Create a non-state changing contract call. Returns hexdata that needs to be decoded.
   *
   * @param chainId - Chain to read from
   * @param tx - Data to read
   * @param tx.chainId - Chain to read transaction on
   * @param tx.to - Address to execute read on
   * @param tx.value - Value to execute read tx with
   * @param tx.data - Calldata to send
   * @param tx.from - (optional) Account to send tx from
   * @returns Encoded hexdata representing result of the read from the chain.
   */
  // TODO: read will never have a value/from, why include it in the type
  public async readTx(tx: MinimalTransaction): Promise<string> {
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
   * Returns an estimate of how much gas a given transaction would consume once sent.
   *
   * @param chainId - Chain to execute tx on
   * @param transaction Transaction to estimate gas of
   * 
   * @returns BigNumber representation of the approximate gas a given tx would consume
   */
  public async estimateGas(chainId: number, transaction: providers.TransactionRequest): Promise<BigNumber> {
    const result = await this.getProvider(chainId).estimateGas(transaction);
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
   * @throws ChainError.reasons.ProviderNotFound if provider is not configured for
   * that ID.
   */
  private getProvider(chainId: number): ChainRpcProvider {
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
  private handleSubmit(response: providers.TransactionResponse) {
    const method = this.sendTx.name;
    this.logger.debug(
      {
        method,
        hash: response.hash,
        gas: (response.gasPrice ?? "unknown").toString(),
        nonce: response.nonce,
      },
      "Tx submitted.",
    );
    this.evts[NxtpTxServiceEvents.TransactionAttemptSubmitted].post({ response });
  }

  /**
   * Handle logging and event emitting on tx confirmation.
   * @param receipt The transaction receipt received back.
   */
  private handleConfirm(receipt: providers.TransactionReceipt) {
    const method = this.sendTx.name;
    this.logger.debug({ method, receipt }, "Tx mined.");
    this.evts[NxtpTxServiceEvents.TransactionConfirmed].post({ receipt });
  }

  /**
   * Handle logging and event emitting on tx failure.
   * @param error The ChainError that occurred during the transaction lifecycle.
   * @param receipt The transaction receipt received back from reverted tx, if
   * applicable.
   */
  private handleFail(error: ChainError, receipt?: providers.TransactionReceipt) {
    const method = this.sendTx.name;
    this.logger.debug({ method, receipt, error: jsonifyError(error) }, "Tx failed.");
    this.evts[NxtpTxServiceEvents.TransactionFailed].post({ error, receipt });
  }
}
