import {
  createLoggingContext,
  delay,
  ERC20Abi,
  jsonifyError,
  Logger,
  NxtpError,
  RequestContext,
} from "@connext/nxtp-utils";
import axios from "axios";
import { BigNumber, Signer, Wallet, providers, constants, Contract, utils } from "ethers";
import { okAsync, ResultAsync } from "neverthrow";

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
import { ReadTransaction, Transaction } from "./types";

const { StaticJsonRpcProvider, FallbackProvider } = providers;

// A provider must be within this many blocks of the "leading" provider to be considered in-sync.
const PROVIDER_MAX_LAG = 40;

/**
 * @classdesc An extension of StaticJsonRpcProvider that intercepts all send() calls to log RPC calls made to
 * providers for debugging purposes.
 */
class SyncProvider extends StaticJsonRpcProvider {
  private readonly connectionInfo: utils.ConnectionInfo;
  private _synced = true;
  public get synced(): boolean {
    return this._synced;
  }
  public lag = 0;
  private syncedBlockNumber = -1;
  private lastSynced = Date.now();
  private isSyncing = false;

  constructor(
    private readonly logger: Logger,
    _connectionInfo: utils.ConnectionInfo | string,
    public readonly chainId: number,
    // Should point to parent ChainRpcProvider cache.
    public parentCache: CachedData,
    private readonly onBlock: (provider: SyncProvider, blockNumber: number, url: string) => Promise<boolean>,
  ) {
    super(_connectionInfo, chainId);
    this.connectionInfo = typeof _connectionInfo === "string" ? { url: _connectionInfo } : _connectionInfo;
    this.sync();
  }

  public async sync(): Promise<void> {
    // TODO: DEBUG: Any provider other than our lead provider may only be synced if it's been 10 sec.
    if (
      this.isSyncing ||
      !this.synced ||
      (this.connectionInfo.url !== this.parentCache.leadingProvider && Date.now() - this.lastSynced < 10_000)
    ) {
      return;
    }
    this.isSyncing = true;
    this.lastSynced = Date.now();
    this.once("block", async (blockNumber: number) => {
      this.syncedBlockNumber = blockNumber;
      try {
        this._synced = await this.onBlock(this, blockNumber, this.connectionInfo.url);
      } finally {
        this.isSyncing = false;
      }
    });
  }

  public send(method: string, params: Array<any>): Promise<any> {
    if (!this.synced) {
      throw new RpcError(RpcError.reasons.OutOfSync);
    }

    if (this.connectionInfo.url !== this.parentCache.leadingProvider) {
      if (method === "eth_getTransactionCount") {
        if (this.parentCache.transactionCount) {
          return this.parentCache.transactionCount as any;
        }
      } else if (method === "eth_gasPrice") {
        if (this.parentCache.gasPrice) {
          return this.parentCache.gasPrice as any;
        }
      }
      // else if (method !== "eth_blockNumber") {
      //   throw new RpcError(RpcError.reasons.OutOfSync);
      // }
    }

    this.logger.debug("RPC method call", undefined, undefined, {
      method,
      url: this.connectionInfo.url,
      leading: this.parentCache.leadingProvider === this.connectionInfo.url,
    });
    return super.send(method, params);
  }
}

type CachedData = {
  leadingProvider: string;
  blockNumber: number;
  gasPrice?: BigNumber;
  transactionCount?: number;
};

/**
 * @classdesc A transaction service provider wrapper that handles the connections to remote providers and parses
 * the responses.
 */
export class ChainRpcProvider {
  // Saving the list of underlying JsonRpcProviders used in FallbackProvider for the event
  // where we need to do a send() call directly on each one (Fallback doesn't raise that interface).
  private readonly _providers: SyncProvider[];
  private readonly provider: providers.FallbackProvider;
  private readonly signer?: Signer;
  private readonly quorum: number;

  private lastUsedGasPrice: BigNumber | undefined = undefined;

  // Cached decimal values per asset.
  private cachedDecimals: Record<string, number> = {};
  // Cache of transient data (i.e. data that can change per block).
  private cache: CachedData = {
    leadingProvider: "",
    blockNumber: -1,
    gasPrice: undefined,
    transactionCount: undefined,
  };
  private isUpdatingCache = false;

  public readonly confirmationsRequired: number;
  public readonly confirmationTimeout: number;

  public get isReadOnly(): boolean {
    return !this.signer;
  }

  /**
   * A class for managing the usage of an ethers FallbackProvider, and for wrapping calls in
   * retries. Will ensure provider(s) are ready before any use case.
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
    protected readonly logger: Logger,
    public readonly chainId: number,
    protected readonly chainConfig: ChainConfig,
    protected readonly config: TransactionServiceConfig,
    signer?: string | Signer,
  ) {
    this.confirmationsRequired = chainConfig.confirmations ?? config.defaultConfirmationsRequired;
    this.confirmationTimeout = chainConfig.confirmationTimeout ?? config.defaultConfirmationTimeout;
    // NOTE: Quorum is set to 1 here, but we may want to reconfigure later. Normally it is half the sum of the weights,
    // which might be okay in our case, but for now we have a low bar.
    // NOTE: This only applies to fallback provider case below.
    this.quorum = chainConfig.quorum ?? 1;

    const { requestContext, methodContext } = createLoggingContext("ChainRpcProvider.constructor");

    // Register a provider for each url.
    // Make sure all providers are ready()
    const providerConfigs = chainConfig.providers;
    const filteredConfigs = providerConfigs.filter((config) => {
      const valid = validateProviderConfig(config);
      if (!valid) {
        this.logger.warn("Configuration was invalid for provider.", requestContext, methodContext, {
          config,
        });
      }
      return valid;
    });
    if (filteredConfigs.length > 0) {
      const hydratedConfigs = filteredConfigs.map((config) => ({
        provider: new SyncProvider(
          logger,
          {
            url: config.url,
            user: config.user,
            password: config.password,
          },
          this.chainId,
          this.cache,
          async (provider: SyncProvider, blockNumber: number, url: string) => {
            provider.lag = Math.max(0, this.cache.blockNumber - blockNumber);
            const synced = provider.lag < PROVIDER_MAX_LAG;
            // Check if this is the latest block.
            if (blockNumber > this.cache.blockNumber) {
              this.cache.blockNumber = blockNumber;
              this.cache.leadingProvider = url;
              if (this.signer && !this.isUpdatingCache) {
                this.isUpdatingCache = true;
                try {
                  // TODO: Do we also need to getGasPrice via gas station?
                  // TODO: Should we manage RPC retries here at all (i.e. use retryWrapper)?
                  // TODO: What about all the nuance involved with the call to get gas price, e.g. setting to at least the minimum, etc.?
                  await Promise.all([
                    provider
                      .getGasPrice()
                      .then((value) => (this.cache.gasPrice = value))
                      .catch((_) => {}),
                    provider
                      .getTransactionCount(await this.signer.getAddress(), "pending")
                      .then((value) => (this.cache.transactionCount = value))
                      .catch((_) => {}),
                  ]);
                  this.logger.debug("New block.", requestContext, methodContext, {
                    blockNumber,
                    cache: {
                      gasPrice: this.cache.gasPrice ? utils.formatUnits(this.cache.gasPrice, "gwei") : undefined,
                      transactionCount: this.cache.transactionCount,
                    },
                    provider: url,
                  });
                } finally {
                  this.isUpdatingCache = false;
                }
              }
            } else if (!synced && provider.synced) {
              // If the provider was previously synced but fell out of sync, debug log:
              this.logger.debug("Provider fell out of sync.", requestContext, methodContext, {
                blockNumber,
                provider: url,
                lag: provider.lag,
              });
            }
            return synced;
          },
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

    if (signer) {
      this.signer = typeof signer === "string" ? new Wallet(signer, this.provider) : signer.connect(this.provider);
    } else {
      this.signer = undefined;
    }
  }

  /**
   * Send the transaction request to the provider.
   *
   * @remarks This method is set to access protected since it should really only be used by the inheriting class,
   * TransactionDispatch, as of the time of writing this.
   *
   * @param tx The transaction used for the request.
   *
   * @returns The ethers TransactionResponse.
   */
  protected sendTransaction(tx: Transaction): ResultAsync<providers.TransactionResponse, TransactionError> {
    // Do any parsing and value handling work here if necessary.
    const { params } = tx;
    const transaction = {
      ...params,
      value: BigNumber.from(params.value || 0),
    };
    return this.resultWrapper<providers.TransactionResponse>(true, async () => {
      return await this.signer!.sendTransaction(transaction);
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
   */
  public confirmTransaction(
    transaction: Transaction,
    confirmations: number = this.confirmationsRequired,
    timeout: number = this.confirmationTimeout,
  ): ResultAsync<providers.TransactionReceipt | null, TransactionError> {
    return this.resultWrapper<providers.TransactionReceipt>(
      true,
      () => {
        // The only way to access the functionality internal to ethers for handling replacement tx.
        // See issue: https://github.com/ethers-io/ethers.js/issues/1775
        return Promise.race(transaction.responses.map((response) => (response as any).wait(confirmations, timeout)));
      },
      false,
    );
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
    return this.resultWrapper<string>(true, async () => {
      try {
        return await this.signer!.call(tx);
      } catch (error) {
        throw new TransactionReadError(TransactionReadError.reasons.ContractReadError, { error });
      }
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
    return this.resultWrapper<BigNumber>(false, async () => {
      const errors: any[] = [];
      // TODO: #147 If quorum > 1, we should make this call to multiple providers.
      const syncedProviders = this._providers.filter((provider) => provider.synced).sort((a, b) => a.lag - b.lag);
      this.logger.debug("DEBUG ESTIMATE GAS", undefined, undefined, {
        syncedProvders: syncedProviders.map((p) => p.lag).join(","),
      });
      for (const provider of syncedProviders) {
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
          if (sanitizedError.type === TransactionReverted.type) {
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
      if (errors.every((e) => e.type === RpcError.type)) {
        throw new RpcError(RpcError.reasons.FailedToSend, { errors });
      }
      throw new UnpredictableGasLimit({ errors });
    });
  }

  /**
   * Get the current gas price for the chain for which this instance is servicing.
   * @returns The BigNumber value for the current gas price.
   */
  public getGasPrice(context: RequestContext): ResultAsync<BigNumber, TransactionError> {
    const { requestContext, methodContext } = createLoggingContext(this.getGasPrice.name, context);
    const hardcoded = this.chainConfig.defaultInitialGas;
    if (hardcoded) {
      this.logger.info("Using hardcoded gas price for chain", requestContext, methodContext, {
        chainId: this.chainId,
        hardcoded,
      });
      return okAsync(BigNumber.from(hardcoded));
    }

    // If it's been less than a minute since we retrieved gas price, send the last update in gas price.
    // TODO: Do we need to compare this price to gas station?
    if (this.cache.gasPrice) {
      return okAsync(this.cache.gasPrice);
    }

    return this.resultWrapper<BigNumber>(false, async () => {
      const { gasInitialBumpPercent, gasMinimum, gasPriceMaxIncreaseScalar } = this.config;
      let gasPrice: BigNumber | undefined = undefined;

      // Use gas station APIs, if available.
      const gasStations = this.chainConfig.gasStations ?? [];
      for (let i = 0; i < gasStations.length; i++) {
        const uri = gasStations[i];
        let response: any;
        try {
          response = await axios.get(uri);
          if (!response || !response.data) {
            continue;
          }
          const { rapid, fast } = response.data;
          if (rapid) {
            gasPrice = BigNumber.from(rapid.toString());
            break;
          } else if (fast) {
            gasPrice = utils.parseUnits(fast.toString(), "gwei");
            break;
          } else {
            this.logger.debug("Gas station response did not have expected params", requestContext, methodContext, {
              uri,
              data: response.data,
            });
          }
        } catch (e) {
          this.logger.debug("Gas station not responding correctly", requestContext, methodContext, {
            uri,
            res: response ? (response?.data ? response.data : response) : undefined,
            error: jsonifyError(e),
          });
        }
      }

      if (gasStations.length > 0 && !gasPrice) {
        this.logger.warn("Gas stations failed, using provider call instead", requestContext, methodContext, {
          gasStations,
        });
      } else if (gasStations.length > 0 && gasPrice) {
        // TODO: Remove this unnecessary provider call, used temporarily for debugging / metrics.
        const providerQuote = await this.provider.getGasPrice();
        this.logger.debug("Retrieved gas prices", requestContext, methodContext, {
          chainId: this.chainId,
          gasStationQuote: utils.parseUnits(gasPrice.toString(), "gwei"),
          providerQuote: utils.parseUnits(providerQuote.toString(), "gwei"),
        });
      }

      // If we did not have a gas station API to use, or the gas station failed, use the provider's getGasPrice method.
      if (!gasPrice) {
        try {
          gasPrice = await this.provider.getGasPrice();
        } catch (error) {
          this.logger.error(
            "getGasPrice failure, attempting to default to backup gas value.",
            requestContext,
            methodContext,
            jsonifyError(error),
            { chainId: this.chainId },
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

      if (
        gasPriceMaxIncreaseScalar !== undefined &&
        gasPriceMaxIncreaseScalar > 100 &&
        this.lastUsedGasPrice !== undefined
      ) {
        // If we have a configured cap scalar, and the gas price is greater than that cap, set it to the cap.
        const max = this.lastUsedGasPrice.mul(gasPriceMaxIncreaseScalar).div(100);
        if (gasPrice.gt(max)) {
          gasPrice = max;
          this.logger.debug("Hit the gas price curbed maximum.", requestContext, methodContext, {
            chainId: this.chainId,
            gasPrice,
            gasPriceMaxIncreaseScalar,
            lastUsedGasPrice: this.lastUsedGasPrice,
          });
        }
        // Update our last used gas price with this tx's gas price. This may be used to determine the cap of
        // subsuquent tx's gas price.
        this.lastUsedGasPrice = gasPrice;
      }

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
    return this.resultWrapper<BigNumber>(false, async () => {
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
    return this.resultWrapper<number>(false, async () => {
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
    return this.resultWrapper<number>(false, async () => {
      const block = await this.provider.getBlock("latest");
      return block.timestamp;
    });
  }

  /**
   * Gets the current blocktime.
   *
   * @returns A number representing the current blocktime.
   */
  public getBlockNumber(): ResultAsync<number, TransactionError> {
    return this.resultWrapper<number>(false, async () => {
      const number = await this.provider.getBlockNumber();
      return number;
    });
  }

  /**
   * Gets the signer's address.
   *
   * @returns A hash string address belonging to the signer.
   */
  public getAddress(): ResultAsync<string, TransactionError> {
    return this.resultWrapper<string>(true, async () => {
      return await this.signer!.getAddress();
    });
  }

  /**
   * Gets a transaction.
   *
   * @param hash - the transaction hash to get the receipt for.
   *
   * @returns A TransactionReceipt instance.
   */
  public getTransactionReceipt(hash: string): ResultAsync<providers.TransactionReceipt, TransactionError> {
    return this.resultWrapper<providers.TransactionReceipt>(false, async () => {
      const receipt = await this.provider.getTransactionReceipt(hash);
      return receipt;
    });
  }

  /**
   * Gets the current transaction count.
   *
   * @param blockTag - the block tag to get the transaction count for. Use "latest" mined-only transactions.
   * Use "pending" for transactions that have not been mined yet, but will (supposedly) be mined in the pending
   * block (essentially, transactions included in the mempool, but this behavior is not consistent).
   *
   * @returns Number of transactions sent; by default, including transactions in the pending (next) block.
   */
  public getTransactionCount(blockTag = "pending"): ResultAsync<number, TransactionError> {
    if (this.cache.transactionCount) {
      return okAsync(this.cache.transactionCount);
    }

    return this.resultWrapper<number>(true, async () => {
      return await this.signer!.getTransactionCount(blockTag);
    });
  }

  /// HELPERS
  /**
   * The result wrapper is used for wrapping and parsing errors, as well as ensuring that providers are ready
   * before any call is made. Also used for executing multiple retries for RPC requests to providers.
   * This is to circumvent any issues related to unreliable internet/network issues, whether locally,
   * or externally (for the provider's network).
   *
   * @param method The method callback to execute and wrap in retries.
   *
   * @returns A ResultAsync instance containing an object of the specified type or an NxtpError.
   */
  private resultWrapper<T>(
    needsSigner: boolean,
    method: () => Promise<T>,
    rpcCanTimeout = true,
  ): ResultAsync<T, NxtpError> {
    const RPC_TIMEOUT = 60_000;
    return ResultAsync.fromPromise(
      this.isReady().then(async () => {
        if (needsSigner && this.isReadOnly) {
          throw new NxtpError("Method requires signer, and no signer was provided.");
        }
        const errors = [];
        let result: T | undefined = undefined;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const _ of Array(5).fill(0)) {
          try {
            const _result = await Promise.race(
              [method()].concat(
                rpcCanTimeout
                  ? [
                      new Promise(async (_res, reject) => {
                        await delay(RPC_TIMEOUT);
                        reject(new RpcError(RpcError.reasons.Timeout));
                      }),
                    ]
                  : [],
              ),
            );
            result = _result;
            break;
          } catch (e) {
            const error = parseError(e);
            // NOTE: If it's an rpc timeout error, we want to go ahead and throw.
            if (error.type === RpcError.type && (error as RpcError).reason != RpcError.reasons.Timeout) {
              errors.push(error);
            } else {
              throw error;
            }
          }
        }
        if (result === undefined) {
          throw new RpcError(RpcError.reasons.FailedToSend, { errors });
        }
        return result;
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
    // provider.ready returns a Promise which will stall until the network has heen established, ignoring
    // errors due to the target node not being active yet. This will ensure we wait until the node is up
    // and running smoothly.
    const ready = await this.provider.ready;
    for (const provider of this._providers) {
      provider.sync();
    }
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
