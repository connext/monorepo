import { delay, ERC20Abi, NxtpError } from "@connext/nxtp-utils";
import axios from "axios";
import { BigNumber, Signer, Wallet, providers, constants, Contract } from "ethers";
import { okAsync, ResultAsync } from "neverthrow";
import PriorityQueue from "p-queue";
import { BaseLogger } from "pino";

import { TransactionServiceConfig, validateProviderConfig, ChainConfig } from "./config";
import {
  parseError,
  RpcError,
  TransactionError,
  TransactionReadError,
  TransactionReverted,
  TransactionServiceFailure,
  UnpredictableGasLimit,
} from "./error";
import { FullTransaction, CachedGas, ReadTransaction } from "./types";

const { StaticJsonRpcProvider, FallbackProvider } = providers;

const HARDCODED_GAS_PRICE: Record<number, string> = {
  69: "15000000", // optimism
};

class MetaTx {
  constructor(
    public readonly nonce: number,
    public readonly timestamp: number,
    public readonly response: providers.TransactionResponse,
    public readonly validated: boolean,
  ) {}

  public validate = () => {

  }
}

/**
 * @classdesc Will wrap a stack of transaction info and handle all serialized operation on submit and confirm side.
 * 
 * 
 */
class TransactionBuffer {
  // Both of the following are functionally treated as stacks (LIFO).
  private completed: MetaTx[] = []
  private pending: MetaTx[] = []
  // Should be used to access either of the stacks.
  private readonly accessQueue: PriorityQueue = new PriorityQueue({ concurrency: 1 });

  constructor(private readonly logger: BaseLogger, private readonly signer: Signer) {}

  public push(nonce: number, response: providers.TransactionResponse) {
    const timestamp = Date.now();
    // Use the access queue to push.
    this.accessQueue.add(() => {
      this.pending.push(
        {
          nonce,
          timestamp,
          response,
          validated: false,
          
        }
      );
    });
  }

  // So the expected behavior here is that, if the top transaction takes too long (needs to be bumped), we indicate a timeout occurred and
  // then resubmit with bumped price.

  // private async push(meta: MetaTx) {
  private async confirmThread() {
    while (true) {
      if (this.pending.length > 0) {
        // We want to confirm the first tx, and then go through the remaining list and see if they should be flagged to be bumped.
        const meta = this.pending[0];
        // First check the timestamp to see if this transaction has expired.
        

        // Next, 
      } else {
        // wait 1s
        delay(1000);
      }
    }
  }

  
  /**
   * Get the current nonce value for our signer.
   *
   * @remarks
   * Caller should still be prepared to get the incorrect nonce back. For instance,
   * if the provider that just handled our sent tx has suddenly gone offline, this
   * method may give the wrong nonce. This can be solved by making additional calls to
   * submit the tx.
   *
   * @returns A number value for the current nonce.
   *
   * @throws RpcError if we fail to get transaction count from all providers.
   */
  public async getNonce(): Promise<number> {
    // Update nonce value to greatest of all nonce values retrieved.
    const nonce = (await this.getLastTx())?.nonce ?? await this.signer.getTransactionCount("pending");
    return nonce;
  }

  private async getLastTx(): Promise<MetaTx | null> {
    return await this.accessQueue.add(() => {
      if (this.pending.length > 0) {
        return this.pending[this.pending.length - 1];
      } else if (this.completed.length > 0) {
        return this.completed[this.completed.length - 1];
      }
      return null;
    });
  }

}

// TODO: #145 Manage the security of our transactions in the event of a reorg. Possibly raise quorum value,
// implement a lookback, etc.

/**
 * @classdesc A transaction service provider wrapper that handles the connections to remote providers and parses
 * the responses.
 */
export class ChainRpcProvider {
  // Saving the list of underlying JsonRpcProviders used in FallbackProvider for the event
  // where we need to do a send() call directly on each one (Fallback doesn't raise that interface).
  private readonly _providers: providers.JsonRpcProvider[];
  private readonly provider: providers.FallbackProvider;
  private readonly signer: Signer;
  private readonly queue: PriorityQueue = new PriorityQueue({ concurrency: 1 });
  private readonly quorum: number;
  private cachedGas?: CachedGas;
  private cachedDecimals: Record<string, number> = {};

  public readonly confirmationsRequired: number;
  public readonly confirmationTimeout: number;

  private transactionBuffer: TransactionBuffer;

  /**
   * A class for managing the usage of an ethers FallbackProvider, and for wrapping calls in
   * retries. Will ensure provider(s) are ready before any use case.
   *
   * @param logger pino.BaseLogger used for logging.
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
    private readonly logger: BaseLogger,
    signer: string | Signer,
    public readonly chainId: number,
    private readonly chainConfig: ChainConfig,
    private readonly config: TransactionServiceConfig,
  ) {
    this.confirmationsRequired = chainConfig.confirmations ?? config.defaultConfirmationsRequired;
    this.confirmationTimeout = chainConfig.confirmationTimeout ?? config.defaultConfirmationTimeout;
    // NOTE: Quorum is set to 1 here, but we may want to reconfigure later. Normally it is half the sum of the weights,
    // which might be okay in our case, but for now we have a low bar.
    // NOTE: This only applies to fallback provider case below.
    this.quorum = 1;

    // Register a provider for each url.
    // Make sure all providers are ready()
    const providerConfigs = chainConfig.providers;
    const filteredConfigs = providerConfigs.filter((config) => {
      const valid = validateProviderConfig(config);
      if (!valid) {
        this.logger.error({ config }, "Configuration was invalid for provider.");
      }
      return valid;
    });
    if (filteredConfigs.length > 0) {
      const hydratedConfigs = filteredConfigs.map((config) => ({
        provider: new StaticJsonRpcProvider(
          {
            url: config.url,
            user: config.user,
            password: config.password,
          },
          this.chainId,
        ),
        priority: config.priority ?? 1,
        weight: config.weight ?? 1,
        stallTimeout: config.stallTimeout,
      }));
      this.provider = new FallbackProvider(hydratedConfigs, this.quorum);
      this._providers = hydratedConfigs.map((p) => p.provider);
    } else {
      // Not enough valid providers were found in configuration.
      // We must throw here, as the router won't be able to support this chain without valid provider configs.
      throw new TransactionServiceFailure(
        `No valid providers were supplied in configuration for chain ${this.chainId}.`,
      );
    }

    // TODO: #146 We may ought to do this instantiation in the txservice constructor.
    this.signer = typeof signer === "string" ? new Wallet(signer, this.provider) : signer.connect(this.provider);
    this.transactionBuffer = new TransactionBuffer(logger, this.signer);
  }

  /**
   * Send the transaction request to the provider.
   * @param tx The full transaction data for the request.
   * @returns An object containing the response or error if an error occurred,
   * and a success boolean indicating whether the process did result in an error.
   */
  public sendTransaction(tx: FullTransaction): ResultAsync<providers.TransactionResponse, TransactionError> {
    // Do any parsing and value handling work here if necessary.
    const transaction = {
      ...tx,
      value: BigNumber.from(tx.value || 0),
    };

    return this.resultWrapper<providers.TransactionResponse>(async () => {
      return await this.signer.sendTransaction(transaction);
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
   */
  public confirmTransaction(
    response: providers.TransactionResponse,
    confirmations?: number,
    timeout?: number,
  ): ResultAsync<providers.TransactionReceipt, TransactionError> {
    return this.resultWrapper<providers.TransactionReceipt>(() => {
      // The only way to access the functionality internal to ethers for handling replacement tx.
      // See issue: https://github.com/ethers-io/ethers.js/issues/1775
      return (response as any).wait(confirmations ?? this.confirmationsRequired, timeout ?? this.confirmationTimeout);
    });
  }

  /**
   * Execute a read transaction using the passed in transaction data, which includes
   * the target contract which we are reading from.
   * @param tx Minimal transaction data needed to read from chain.
   * @returns A string of data read from chain.
   * @throws ChainError.reasons.ContractReadFailure in the event of a failure
   * to read from chain.
   */
  public readTransaction(tx: ReadTransaction): ResultAsync<string, TransactionError> {
    return this.resultWrapper<string>(async () => {
      try {
        return await this.signer.call(tx);
      } catch (error) {
        throw new TransactionReadError(TransactionReadError.reasons.ContractReadError, { error });
      }
    });
  }

  /**
   * Get the current gas price for the chain for which this instance is servicing.
   * @returns The BigNumber value for the current gas price.
   */
  public getGasPrice(): ResultAsync<BigNumber, TransactionError> {
    const hardcoded = HARDCODED_GAS_PRICE[this.chainId];
    if (hardcoded) {
      this.logger.info({ chainId: this.chainId, hardcoded }, "Using hardcoded gas price for chain");
      return okAsync(BigNumber.from(hardcoded));
    }

    // If it's been less than a minute since we retrieved gas price, send the last update in gas price.
    if (this.cachedGas && Date.now() - this.cachedGas.timestamp < 60000) {
      return okAsync(this.cachedGas.price);
    }

    return this.resultWrapper<BigNumber>(async () => {
      const { gasInitialBumpPercent, gasMinimum } = this.config;
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
        } catch (error) {
          this.logger.error(
            { chainId: this.chainId, error },
            "getGasPrice failure, attempting to default to backup gas value.",
          );
          // Default to initial gas price, if available. Otherwise, throw.
          gasPrice = BigNumber.from(this.chainConfig.defaultInitialGas);
          if (!gasPrice) {
            throw error;
          }
        }
        gasPrice = gasPrice.add(gasPrice.mul(gasInitialBumpPercent).div(100));
      }

      // If the gas price is less than the gas minimum, bump it up to minimum.
      const min = BigNumber.from(gasMinimum);
      if (gasPrice.lt(min)) {
        gasPrice = min;
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
  public getBalance(address: string): ResultAsync<BigNumber, TransactionError> {
    return this.resultWrapper<BigNumber>(async () => {
      return await this.provider.getBalance(address);
    });
  }

  /**
   * Get the decimals for the ERC20 token contract.
   *
   * @param address The hexadecimal string address of the asset.
   *
   * @returns A number representing the current decimals.
   */
  public getDecimalsForAsset(assetId: string): ResultAsync<number, TransactionError> {
    return this.resultWrapper<number>(async () => {
      if (this.cachedDecimals[assetId]) {
        return this.cachedDecimals[assetId];
      }

      if (assetId === constants.AddressZero) {
        this.cachedDecimals[assetId] = 18;
        return 18;
      }

      // Get provider
      const decimals = await new Contract(assetId, ERC20Abi, this.provider).decimals();
      this.cachedDecimals[assetId] = decimals;
      return decimals;
    });
  }

  /**
   * Gets the current blocktime.
   *
   * @returns A number representing the current blocktime.
   */
  public getBlockTime(): ResultAsync<number, TransactionError> {
    return this.resultWrapper<number>(async () => {
      const block = await this.provider.getBlock("latest");
      return block.timestamp;
    });
  }

  /**
   * Estimate gas cost for the specified transaction.
   *
   * @remarks
   *
   * Because estimateGas is almost always our "point of failure" - the point where its
   * indicated by the provider that our tx would fail on chain - and ethers obscures the
   * revert error code when it fails through its typical API, we had to implement our own
   * estimateGas call through RPC directly.
   *
   * @param transaction The ethers TransactionRequest data in question.
   *
   * @returns A BigNumber representing the estimated gas value.
   */
  public estimateGas(transaction: providers.TransactionRequest): ResultAsync<BigNumber, TransactionError> {
    return this.resultWrapper<BigNumber>(async () => {
      const errors: any[] = [];
      // TODO: #147 If quorum > 1, we should make this call to multiple providers.
      for (const provider of this._providers) {
        let result: string;
        try {
          // This call will prepare the transaction params for us (hexlify tx, etc).
          // TODO: #147 Is there any reason prepare should be called for each iteration?
          const args = provider.prepareRequest("estimateGas", { transaction });
          result = await provider.send(args[0], args[1]);
        } catch (error) {
          const sanitizedError = parseError(error);
          // If we get a TransactionReverted error, we can assume that the transaction will fail,
          // and we ought to just throw here.
          if (sanitizedError instanceof TransactionReverted) {
            throw sanitizedError;
          } else {
            errors.push(error);
            continue;
          }
        }

        try {
          return BigNumber.from(result);
        } catch (error) {
          throw new TransactionServiceFailure(TransactionServiceFailure.reasons.GasEstimateInvalid, {
            invalidEstimate: result,
            error: error.message,
          });
        }
      }
      throw new UnpredictableGasLimit({ errors });
    });
  }

  /// HELPERS
  /**
   * The result wrapper used for executing multiple retries for RPC requests to providers.
   * This is to circumvent any issues related to unreliable internet/network issues, whether locally,
   * or externally (for the provider's network).
   *
   * @param method The method callback to execute and wrap in retries.
   */
  private resultWrapper<T>(method: () => Promise<T>): ResultAsync<T, NxtpError> {
    return ResultAsync.fromPromise(
      this.isReady().then(() => {
        // TODO: #148 Reimplement retry ability.
        return method();
      }),
      (error) => {
        // Parse error into TransactionError, etc.
        return parseError(error);
      },
    );
  }

  /**
   * Checks whether our providers are ready for execution. Should be called every time we do any
   * operation in this class.
   */
  private async isReady(): Promise<boolean> {
    const method = this.isReady.name;
    // TODO: #149 Do we need both ready and the check below, or is this redundant?
    // provider.ready returns a Promise which will stall until the network has heen established, ignoring
    // errors due to the target node not being active yet. This will ensure we wait until the node is up
    // and running smoothly.
    const ready = await this.provider.ready;
    if (!ready) {
      // Error out, not enough providers are ready.
      throw new RpcError(RpcError.reasons.OutOfSync, {
        method,
        chainId: this.chainId,
      });
    }
    return true;
  }

}
