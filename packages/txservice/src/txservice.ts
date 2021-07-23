/* eslint-disable require-jsdoc */
import { Signer, providers, BigNumber } from "ethers";
import { BaseLogger } from "pino";
import { Evt } from "evt";
import hyperid from "hyperid";
import { jsonifyError } from "@connext/nxtp-utils";

import { TransactionServiceConfig, validateTransactionServiceConfig, DEFAULT_CONFIG, ChainConfig } from "./config";
import { ChainError } from "./error";
import { MinimalTransaction } from "./types";
import { ChainRpcProvider } from "./provider";
import { Transaction } from "./transaction";

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
        this.logger.error({ chainId, providers }, `Provider configurations not found for chainID: ${chainId}`);
        throw new ChainError(ChainError.reasons.ProviderNotFound);
      }
      const chainIdNumber = parseInt(chainId);
      this.providers.set(
        chainIdNumber,
        new ChainRpcProvider(this.logger, signer, chainIdNumber, chain, providers, this.config),
      );
    });
  }

  /**
   * Send specified transaction on specified chain. Will emit events throughout its lifecycle.
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

    let receipt: providers.TransactionReceipt | undefined;

    const transaction = this.createTx(tx);
    const submit = async () => this.handleSubmit(await transaction.send());

    try {
      /// SUBMIT
      // First, send tx and get back a response.
      await submit();

      /// CONFIRM
      // Now we wait for confirmation and get tx receipt.
      while (!receipt) {
        // TODO: Replace this try catch with neverthrow model.
        try {
          receipt = await transaction.confirm();
        } catch (e) {
          // Check if the error was a confirmation timeout.
          if (e.message === ChainError.reasons.ConfirmationTimeout) {

            // NOTE: REMOVE - THIS SHOULD NEVER HAPPEN
            // If nonce expired, and we were unable to confirm, something went wrong and there's
            // no reason to continue.
            if (transaction.nonceExpired) {
              throw new ChainError(ChainError.reasons.NonceExpired, { method });
            }

            // Bump the gas price up a bit for the next transaction attempt.
            transaction.bumpGasPrice();
            // Resubmit.
            await submit();
          } else {
            throw e;
          }
        }
      }
    } catch (e) {
      // Coerce error to be a ChainError.
      let error = e;
      const reason: string | undefined = ChainError.parseChainErrorReason(e.message);
      if (reason) {
        error = new ChainError(reason, { method });
      } else {
        error = new ChainError(error.message, { method });
      }
      this.handleFail(error, receipt);
      throw error;
    }

    // Success!
    this.handleConfirm(receipt);
    return receipt;
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
    const provider = this.getProvider(tx.chainId);
    return provider.readTransaction(tx);
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
    const provider = this.getProvider(chainId);
    return await provider.getBalance(address);
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
    const provider = this.getProvider(chainId);
    return await provider.estimateGas(transaction);
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
  /** Helper method to generate a transaction instance. Stubbed in unit tests in order to
   *  solely test the interface.
   *  @param tx The minimal transaction data needed to send transaction to chain.
   */
  private createTx(tx: MinimalTransaction) {
    return new Transaction(this.logger, this.getProvider(tx.chainId), tx, this.config);
  }

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
      throw new ChainError(ChainError.reasons.ProviderNotFound);
    }
    return this.providers.get(chainId)!;
  }

  /**
   * Handle logging and event emitting on tx submit attempt.
   * @param response The transaction response received back from that attempt.
   */
  private handleSubmit(response: providers.TransactionResponse) {
    const method = this.sendTx.name;
    this.logger.info(
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
    this.logger.info({ method, receipt }, "Tx mined.");
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
    this.logger.error({ method, receipt, error: jsonifyError(error) }, "Tx failed.");
    this.evts[NxtpTxServiceEvents.TransactionFailed].post({ error, receipt });
  }
}
