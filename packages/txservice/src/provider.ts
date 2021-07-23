/* eslint-disable require-jsdoc */
import { jsonifyError } from "@connext/nxtp-utils";
import axios from "axios";
import { BigNumber, Signer, Wallet, providers } from "ethers";
import { Logger } from "ethers/lib/utils";
import PriorityQueue from "p-queue";
import { BaseLogger } from "pino";

import { TransactionServiceConfig, ProviderConfig, validateProviderConfig, ChainConfig } from "./config";
import { ChainError } from "./error";
import { FullTransaction, MinimalTransaction, NxtpNonceManager, CachedGas } from "./types";

const { JsonRpcProvider, FallbackProvider } = providers;

// TODO: Manage the security of our transactions in the event of a reorg. Possibly raise quorum value,
// implement a lookback, etc.

export class ChainRpcProvider {
  // Saving the list of underlying JsonRpcProviders used in FallbackProvider for the event
  // where we need to do a send() call directly on each one (Fallback doesn't raise that interface).
  private _providers: providers.JsonRpcProvider[];
  private provider: providers.FallbackProvider;
  private signer: NxtpNonceManager;
  private queue: PriorityQueue = new PriorityQueue({ concurrency: 1 });
  private readonly quorum: number;
  private cachedGas?: CachedGas;

  public confirmationsRequired: number;
  public confirmationTimeout: number;

  /**
   * A class for managing the usage of an ethers FallbackProvider, and for wrapping calls in
   * retries. Will ensure provider(s) are ready before any use case.
   *
   * @param logger pino.BaseLogger used for logging.
   * @param signer Signer instance or private key used for signing transactions.
   * @param chainId The ID of the chain for which this class's providers will be servicing.
   * @param chainConfig Configuration for this specified chain.
   * @param providerConfigs Configuration for each provider that will be used with this chain.
   * @param config The shared TransactionServiceConfig with general configuration.
   *
   * @throws ChainError.reasons.ProviderNotFound if no valid providers are found in the
   * configuration.
   */
  constructor(
    private readonly logger: BaseLogger,
    signer: string | Signer,
    public readonly chainId: number,
    private readonly chainConfig: ChainConfig,
    providerConfigs: ProviderConfig[],
    private readonly config: TransactionServiceConfig,
  ) {
    this.confirmationsRequired = chainConfig.confirmations ?? config.defaultConfirmationsRequired;
    this.confirmationTimeout = chainConfig.confirmationTimeout ?? config.defaultConfirmationTimeout;
    // TODO: Quorum is set to 1 here, but we may want to reconfigure later. Normally it is half the sum of the weights,
    // which might be okay in our case, but for now we have a low bar.
    // NOTE: This only applies to fallback provider case below.
    this.quorum = 1;

    // Register a provider for each url.
    // Make sure all providers are ready()
    const filteredConfigs = providerConfigs.filter((config) => {
      const valid = validateProviderConfig(config);
      if (!valid) {
        this.logger.error({ config }, "Configuration was invalid for provider.");
      }
      return valid;
    });
    if (filteredConfigs.length > 0) {
      const hydratedConfigs = filteredConfigs.map((config) => ({
        provider: new JsonRpcProvider({
          url: config.url,
          user: config.user,
          password: config.password,
        }),
        priority: config.priority ?? 1,
        weight: config.weight ?? 1,
        stallTimeout: config.stallTimeout,
      }));
      this.provider = new FallbackProvider(hydratedConfigs, this.quorum);
      this._providers = hydratedConfigs.map((p) => p.provider);
    } else {
      // Not enough valid providers were found in configuration.
      // We must throw here, as the router won't be able to support this chain without valid provider configs.
      throw new ChainError(ChainError.reasons.ProviderNotFound);
    }

    // Using NonceManager to wrap signer here.
    this.signer = new NxtpNonceManager(
      typeof signer === "string" ? new Wallet(signer, this.provider) : signer.connect(this.provider),
    );
  }

  /**
   * Send the transaction request to the provider.
   * @param tx The full transaction data for the request.
   * @returns An object containing the response or error if an error occurred,
   * and a success boolean indicating whether the process did result in an error.
   */
  public async sendTransaction(
    tx: FullTransaction,
  ): Promise<{ response: providers.TransactionResponse | Error; success: boolean }> {
    const method = this.sendTransaction.name;
    await this.isReady();
    // Define task to send tx with proper nonce.
    const task = async (): Promise<{ response: providers.TransactionResponse | Error; success: boolean }> => {
      try {
        // Send transaction using the passed in callback.
        const { to, data, chainId, value, gasPrice, nonce } = tx;
        const response: providers.TransactionResponse | undefined = await this.signer.sendTransaction({
          to,
          data,
          chainId,
          gasPrice,
          nonce,
          value: BigNumber.from(value || 0),
        });
        // Check to see if ethers returned undefined for the response; if so, handle as error case.
        if (typeof response === "undefined") {
          throw new ChainError(ChainError.reasons.FailedToSendTx, { method, ...tx, nonce });
        }
        return { response, success: true };
      } catch (e) {
        return { response: e, success: false };
      }
    };
    // Queue up the execution of the transaction.
    return await this.queue.add(task);
  }

  /**
   * Execute a read transaction using the passed in transaction data, which includes
   * the target contract which we are reading from.
   * @param tx Minimal transaction data needed to read from chain.
   * @returns A string of data read from chain.
   * @throws ChainError.reasons.ContractReadFailure in the event of a failure
   * to read from chain.
   */
  public async readTransaction(tx: MinimalTransaction): Promise<string> {
    const method = this.readTransaction.name;
    return await this.retryWrapper(method, async () => {
      try {
        const readResult = await this.signer.call({
          to: tx.to,
          data: tx.data,
        });
        return readResult;
      } catch (e) {
        throw new ChainError(ChainError.reasons.ContractReadFailure, { error: jsonifyError(e) });
      }
    });
  }

  /**
   * Get the receipt for the transaction with the specified hash, optionally blocking
   * until a specified timeout.
   *
   * @param hash The hexadecimal hash string of the transaction.
   * @param confirmations Optional parameter to override the configured number of confirmations
   * required to validate the receipt.
   * @param timeout Optional timeout parameter to override the configured parameter.
   *
   * @returns The ethers TransactionReceipt, if mined, otherwise null.
   *
   * @throws ChainError.reasons.ConfirmationTimeout if the wait for confirmation times out.
   */
  public async confirmTransaction(
    response: providers.TransactionResponse,
    confirmations?: number,
    timeout?: number,
  ): Promise<providers.TransactionReceipt | undefined> {
    await this.isReady();
    try {
      // The only way to access the functionality internal to ethers for handling replacement tx.
      // See issue: https://github.com/ethers-io/ethers.js/issues/1775
      return await (response as any).wait(confirmations ?? this.confirmationsRequired, timeout ?? this.confirmationTimeout);
      // Since response.wait does not allow us to pass in a timeout, we are accessing the internal method here
      // to handle tx replacement.
      // if (response.to && response.blockNumber) {
      //   return await this.provider._waitForTransaction(response.hash, 1, timeout, {
      //     data: response.data,
      //     from: response.from,
      //     nonce: response.nonce,
      //     to: response.to!,
      //     value: response.value,
      //     startBlock: response.blockNumber,
      //   });
      // } else {
      //   return await this.provider.waitForTransaction(response.hash, 1, timeout);
      // }
    } catch (error) {
      /**
       * From ethers docs:
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
      switch(error.code) {
        case Logger.errors.TRANSACTION_REPLACED:
          // This will be the replacement receipt (see above).
          return error.receipt;
        case Logger.errors.CALL_EXCEPTION:
          // This will be the receipt with a status of 0.
          return error.receipt;
        case Logger.errors.TIMEOUT:
          // Wrap as ChainError timeout for convenience.
          throw new ChainError(ChainError.reasons.ConfirmationTimeout);
        default:
          throw error;
      }
    }
    // return await this.provider.getTransactionReceipt(response.hash);
  }

  /**
   * Get the current gas price for the chain for which this instance is servicing.
   * @returns The BigNumber value for the current gas price.
   */
  public async getGasPrice(): Promise<BigNumber> {
    const method = this.getGasPrice.name;

    // If it's been less than a minute since we retrieved gas price, send the last update in gas price.
    if (this.cachedGas && Date.now() - this.cachedGas.timestamp < 60000) {
      return this.cachedGas.price;
    }

    const { gasInitialBumpPercent, gasMinimum } = this.config;
    return await this.retryWrapper<BigNumber>(method, async () => {
      let gasPrice: BigNumber | undefined = undefined;

      if (this.chainId === 1) {
        try {
          const gasNowResponse = await axios.get(`https://www.gasnow.org/api/v3/gas/price`);
          const { rapid } = gasNowResponse.data;
          gasPrice = typeof rapid !== "undefined" ? BigNumber.from(rapid) : undefined;
        } catch (e) {
          this.logger.warn({ error: e }, "Gasnow failed, using provider");
        }
      }

      if (!gasPrice) {
        try {
          gasPrice = await this.provider.getGasPrice();
        } catch (e) {
          this.logger.error(
            { chainId: this.chainId, error: jsonifyError(e) },
            "getGasPrice failure, attempting to default to backup gas value.",
          );
          // Default to initial gas price, if available. Otherwise, throw.
          gasPrice = BigNumber.from(this.chainConfig.defaultInitialGas);
          if (!gasPrice) {
            throw e;
          }
        }
        gasPrice = gasPrice.add(gasPrice.mul(gasInitialBumpPercent).div(100));
      }

      // If the gas price is less than the gas minimum, bump it up to minimum.
      if (gasPrice.lt(gasMinimum)) {
        gasPrice = BigNumber.from(gasMinimum);
      }

      // Cache the latest gas price.
      this.cachedGas = { price: gasPrice, timestamp: Date.now() };
      return gasPrice;
    });
  }

  /**
   * Get the current balance for the specified address.
   *
   * @param address The hexadecimal string address whose balance we are getting.
   *
   * @returns A BigNumber representing the current value held by the wallet at the
   * specified address.
   */
  public async getBalance(address: string): Promise<BigNumber> {
    const method = this.getBalance.name;
    return await this.retryWrapper<BigNumber>(method, async () => {
      return await this.provider.getBalance(address);
    });
  }

  /**
   * Estimate gas cost for the specified transaction.
   *
   * @param transaction The ethers TransactionRequest data in question.
   *
   * @returns A BigNumber representing the estimated gas value.
   */
  public async estimateGas(transaction: providers.TransactionRequest): Promise<BigNumber> {
    const method = this.estimateGas.name;
    return await this.retryWrapper<BigNumber>(method, async () => {
      return await this.provider.estimateGas(transaction);
    });
  }

  /// HELPERS
  /**
   * The retry wrapper used for executing multiple retries for RPC requests to providers.
   * This is to circumvent any issues related to unreliable internet/network issues, whether locally,
   * or externally (for the provider's network).
   *
   * @param method The string method name, used for logging.
   * @param targetMethod The actual method callback to execute and wrap in retries.
   */
  private async retryWrapper<T>(method: string, targetMethod: () => Promise<T>): Promise<T> {
    await this.isReady();
    let retries: number;
    const errors: { [attempt: number]: string | undefined } = {};
    for (retries = 1; retries < this.config.rpcProviderMaxRetries; retries++) {
      try {
        return await targetMethod();
      } catch (e) {
        errors[retries] = e.message;
      }
    }
    throw new ChainError(ChainError.reasons.RpcFailure, {
      method,
      chainId: this.chainId,
      errors,
    });
  }

  /**
   * Checks whether our providers are ready for execution. Should be called every time we do any
   * operation in this class.
   */
  private async isReady(): Promise<boolean> {
    // TODO: Do we need both ready and the check below, or is this redundant?
    // provider.ready returns a Promise which will stall until the network has heen established, ignoring
    // errors due to the target node not being active yet. This will ensure we wait until the node is up
    // and running smoothly.
    const ready = await this.provider.ready;
    if (!ready) {
      // Error out, not enough providers are ready.
      throw new ChainError(ChainError.reasons.ProviderNotSynced);
    }
    // TODO: Evaluate whether this.provider.ready covers all cases well enough, and whether we need
    // the additional checks below:
    // Ensure that provider(s) are synced.
    // let outOfSync = 0;
    // await Promise.all(
    //   this._providers.map(async (provider) => {
    //     try {
    //       /* If not syncing, will return something like:
    //        * {
    //        *   "id": 1,
    //        *   "jsonrpc": "2.0",
    //        *   "result": false
    //        * }
    //        */
    //       const result = await provider.send("eth_syncing", []);
    //       if (result.result) {
    //         outOfSync++;
    //       }
    //     } catch (e) {
    //       outOfSync++;
    //     }
    //   }),
    // );
    // We base our evaluation on the quorum (by default, 1). If the quorum isn't 1,
    // we may necessarily need >1 provider to be in sync.
    // if (this._providers.length - outOfSync < this.quorum) {
    //   // Error out, not enough providers are ready.
    //   throw new ChainError(ChainError.reasons.ProviderNotSynced);
    // }
    return true;
  }
}
