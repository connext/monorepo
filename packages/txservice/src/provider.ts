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

import { validateProviderConfig, ChainConfig } from "./config";
import {
  ConfigurationError,
  GasEstimateInvalid,
  parseError,
  RpcError,
  ServerError,
  TimeoutError,
  TransactionReadError,
  TransactionReverted,
  ProviderCache,
  ReadTransaction,
  SyncProvider,
  OnchainTransaction,
} from "./shared";

const { FallbackProvider } = providers;

// TODO: Move to config; alternatively, configure based on time, not blocks.
// A provider must be within this many blocks of the "leading" provider (provider with the highest block) to be considered in-sync.
const PROVIDER_MAX_LAG = 30;
// Default value for block period time (in ms) if we're unable to attain that info from the providers for some reason.
const DEFAULT_BLOCK_PERIOD = 2_000;

type ChainRpcProviderCache = { gasPrice: BigNumber; transactionCount: number };

/**
 * @classdesc A transaction service provider wrapper that handles the connections to remote providers and parses
 * the responses.
 */
export class ChainRpcProvider {
  // The array of underlying SyncProviders.
  private readonly providers: SyncProvider[];
  // The provider that's most in sync with the chain, and has an active block listener.
  public leadProvider: SyncProvider | undefined;

  // TODO: Remove fallback provider?
  public readonly fallbackProvider: providers.FallbackProvider;
  private readonly signer?: Signer;

  private lastUsedGasPrice: BigNumber | undefined = undefined;

  // Cached decimal values per asset. Saved separately from main cache as decimals obviously don't expire.
  private cachedDecimals: Record<string, number> = {};
  // Cached block length in time (ms), used for optimizing waiting periods.
  private blockPeriod: number = DEFAULT_BLOCK_PERIOD;

  // Cache of transient data (i.e. data that can change per block).
  private cache: ProviderCache<ChainRpcProviderCache>;

  /**
   * A class for managing the usage of an ethers FallbackProvider, and for wrapping calls in
   * retries. Will ensure provider(s) are ready before any use case.
   *
   * @param logger - Logger used for logging.
   * @param signer - Signer instance or private key used for signing transactions.
   * @param chainId - The ID of the chain for which this class's providers will be servicing.
   * @param chainConfig - Configuration for this specified chain, including the providers we'll
   * be using for it.
   * @param config - The shared TransactionServiceConfig with general configuration.
   *
   * @throws ChainError.reasons.ProviderNotFound if no valid providers are found in the
   * configuration.
   */
  constructor(
    protected readonly logger: Logger,
    public readonly chainId: number,
    protected readonly config: ChainConfig,
    signer?: string | Signer,
  ) {
    const { requestContext, methodContext } = createLoggingContext("ChainRpcProvider.constructor");

    // Register a provider for each url.
    // Make sure all providers are ready()
    const providerConfigs = this.config.providers;
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
          {
            url: config.url,
            user: config.user,
            password: config.password,
          },
          this.chainId,
          config.stallTimeout,
          this.config.debug_logRpcCalls,
        ),
        priority: config.priority ?? 1,
        weight: config.weight ?? 1,
        stallTimeout: config.stallTimeout,
      }));
      this.fallbackProvider = new FallbackProvider(hydratedConfigs, 1);
      this.providers = hydratedConfigs.map((p) => p.provider);
    } else {
      // Not enough valid providers were found in configuration.
      // We must throw here, as the router won't be able to support this chain without valid provider configs.
      throw new ConfigurationError(
        [
          {
            parameter: "providers",
            error: "No valid providers were supplied in configuration for this chain.",
            value: providerConfigs,
          },
        ],
        {
          chainId,
        },
      );
    }

    if (signer) {
      this.signer =
        typeof signer === "string" ? new Wallet(signer, this.fallbackProvider) : signer.connect(this.fallbackProvider);
    } else {
      this.signer = undefined;
    }

    // TODO: Make ttl/btl values below configurable ?
    this.cache = new ProviderCache<ChainRpcProviderCache>(this.logger, {
      gasPrice: {
        ttl: 30_000,
      },
      transactionCount: {
        ttl: 2_000,
      },
    });

    // This initial call of sync providers will start the first block listener (on the lead provider) and set up
    // the cache with correct initial values (as well as establish which providers are out-of-sync).
    this.syncProviders();

    // Set up the initial value for block period. Will run asyncronously, and update the value (from the default) when
    // it completes.
    this.setBlockPeriod();
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
  protected async sendTransaction(transaction: OnchainTransaction): Promise<providers.TransactionResponse> {
    this.checkSigner();
    // NOTE: We do not use execute for this call as it should be delegated to fallback provider, who
    // will call the method on all providers.
    // TODO: We may want to adapt execute to take on this functionality as it's the last step towards
    // making fallback provider obsolete (and making this class the real fallback provider).
    this.signer!.connect(this.fallbackProvider);
    return await this.signer!.sendTransaction({
      ...transaction.params,
      value: BigNumber.from(transaction.params.value || 0),
    });
  }

  /**
   * Get the receipt for the transaction with the specified hash, optionally blocking
   * until a specified timeout.
   *
   * @param hash - The hexadecimal hash string of the transaction.
   * @param confirmations - Optional parameter to override the configured number of confirmations
   * required to validate the receipt.
   * @param timeout - Optional timeout parameter in ms to override the configured parameter.
   *
   * @returns The ethers TransactionReceipt, if mined, otherwise null.
   */
  public async confirmTransaction(
    transaction: OnchainTransaction,
    confirmations: number = this.config.confirmations,
    timeout: number = this.config.confirmationTimeout,
  ): Promise<providers.TransactionReceipt> {
    const start = Date.now();
    // Using a timed out variable calculated at the end of the loop - this way we can be sure at
    // least one iteration is completed here.
    let timedOut = false;
    let remainingConfirmations = confirmations;
    let mined = false;
    let reverted: providers.TransactionReceipt[] = [];
    let errors: NxtpError[] = [];
    while (!timedOut) {
      errors = [];
      reverted = [];
      // Populate a list of promises to retrieve every receipt for every hash.
      const _receipts: Promise<providers.TransactionReceipt | null>[] = transaction.responses.map(
        async (response: any) => {
          try {
            return await this.getTransactionReceipt(response.hash);
          } catch (error) {
            errors.push(error);
            return null;
          }
        },
      );
      // Wait until all the 'receipts' (or errors) have been pushed to the list.
      const receipts = (await Promise.all(_receipts)).filter(
        (r) => r !== null && r !== undefined,
      ) as providers.TransactionReceipt[];

      for (const receipt of receipts) {
        if (receipt.status === 1) {
          // Receipt status is successful, check to see if we have enough confirmations.
          mined = true;
          remainingConfirmations = confirmations - receipt.confirmations;
          if (remainingConfirmations <= 0) {
            return receipt;
          }
        } else {
          // Receipt status indicates tx was reverted.
          reverted.push(receipt);
        }
      }

      if (!mined) {
        // If the tx was not mined yet, the tx may have been reverted (or other errors may have occurred).
        if (reverted.length > 0) {
          throw new TransactionReverted(TransactionReverted.reasons.CallException, reverted[0]);
        } else if (errors.length > 0) {
          throw errors[0];
        }
      }

      // If we timed out this round, no need to wait.
      timedOut = Date.now() - start >= timeout;
      if (!timedOut) {
        // If we haven't resolved yet, wait for the designated parity (or target blocks) before we check again.
        await this.wait(remainingConfirmations);
      }
    }
    throw new TimeoutError({
      targetConfirmations: confirmations,
      remainingConfirmations,
      reverted,
      errors,
      timeout,
      timedOut,
      mined,
    });
  }

  /**
   * Execute a read transaction using the passed in transaction data, which includes
   * the target contract which we are reading from.
   *
   * @param tx - Minimal transaction data needed to read from chain.
   *
   * @returns A string of data read from chain.
   * @throws ChainError.reasons.ContractReadFailure in the event of a failure
   * to read from chain.
   */
  public async readTransaction(tx: ReadTransaction): Promise<string> {
    return this.execute<string>(false, async (provider: SyncProvider) => {
      try {
        if (this.signer) {
          return await this.signer.connect(provider).call(tx);
        } else {
          return await provider.call(tx);
        }
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
   * @param transaction - The ethers TransactionRequest data in question.
   *
   * @returns A BigNumber representing the estimated gas value.
   */
  public async estimateGas(transaction: providers.TransactionRequest): Promise<BigNumber> {
    const { gasLimitInflation } = this.config;

    return this.execute(false, async (provider: SyncProvider) => {
      // This call will prepare the transaction params for us (hexlify tx, etc).
      const args = provider.prepareRequest("estimateGas", { transaction });
      const result = await provider.send(args[0], args[1]);
      try {
        return BigNumber.from(result).add(gasLimitInflation ? BigNumber.from(gasLimitInflation) : 0);
      } catch (error) {
        throw new GasEstimateInvalid(result, {
          error: error.message,
        });
      }
    });
  }

  /**
   * Get the current gas price for the chain for which this instance is servicing.
   *
   * @param context - RequestContext instance in which we are executing this method.
   * @param useInitialBoost (default: true) - boolean indicating whether to use the configured initial boost
   * percentage value.
   *
   * @returns The BigNumber value for the current gas price.
   */
  public async getGasPrice(context: RequestContext, useInitialBoost = true): Promise<BigNumber> {
    const { requestContext, methodContext } = createLoggingContext(this.getGasPrice.name, context);

    // Check if there is a hardcoded value specified for this chain. This should usually only be set
    // for testing/overriding purposes.
    const hardcoded = this.config.hardcodedGasPrice;
    if (hardcoded) {
      this.logger.info("Using hardcoded gas price for chain", requestContext, methodContext, {
        chainId: this.chainId,
        hardcoded,
      });
      return BigNumber.from(hardcoded);
    }

    // Check if there is a valid (non-expired) gas price available.
    if (this.cache.data.gasPrice) {
      return this.cache.data.gasPrice;
    }

    const { gasPriceInitialBoostPercent, gasPriceMinimum, gasPriceMaximum, gasPriceMaxIncreaseScalar } = this.config;
    let gasPrice: BigNumber | undefined = undefined;

    // Use gas station APIs, if available.
    const gasStations = this.config.gasStations ?? [];
    for (let i = 0; i < gasStations.length; i++) {
      const uri = gasStations[i];
      let response: any;
      try {
        response = await axios.get(uri);
        if (response && response.data) {
          const { fast } = response.data;
          if (fast) {
            gasPrice = utils.parseUnits(fast.toString(), "gwei");
            break;
          }
        }
        this.logger.debug("Gas station response did not have expected params", requestContext, methodContext, {
          uri,
          data: response.data,
        });
      } catch (e) {
        this.logger.debug("Gas station not responding correctly", requestContext, methodContext, {
          uri,
          res: response ? (response?.data ? response.data : response) : undefined,
          error: jsonifyError(e),
        });
      }
    }

    if (!gasPrice) {
      // If we did not have a gas station API to use, or the gas station failed, use the provider's getGasPrice method.
      gasPrice = await this.execute<BigNumber>(false, async (provider: SyncProvider) => {
        return await provider.getGasPrice();
      });
      if (useInitialBoost) {
        gasPrice = gasPrice.add(gasPrice.mul(gasPriceInitialBoostPercent).div(100));
      }
    }

    // Apply a curbing function (if applicable) - this will curb the effect of dramatic network gas spikes.
    let hitMaximum = false;
    if (
      gasPriceMaxIncreaseScalar !== undefined &&
      gasPriceMaxIncreaseScalar > 100 &&
      this.lastUsedGasPrice !== undefined
    ) {
      // If we have a configured cap scalar, and the gas price is greater than that cap, set it to the cap.
      const curbedPrice = this.lastUsedGasPrice.mul(gasPriceMaxIncreaseScalar).div(100);
      if (gasPrice.gt(curbedPrice)) {
        this.logger.debug("Hit the gas price curbed maximum.", requestContext, methodContext, {
          chainId: this.chainId,
          gasPrice: utils.formatUnits(gasPrice, "gwei"),
          curbedPrice: utils.formatUnits(curbedPrice, "gwei"),
          gasPriceMaxIncreaseScalar,
          lastUsedGasPrice: utils.formatUnits(this.lastUsedGasPrice, "gwei"),
        });
        gasPrice = curbedPrice;
        hitMaximum = true;
      }
    }

    // Final step to ensure we remain within reasonable, configured bounds for gas price.
    // If the gas price is less than absolute gas minimum, bump it up to minimum.
    // If it's greater than (or equal to) the absolute maximum, set it to that maximum (and log).
    const min = BigNumber.from(gasPriceMinimum);
    const max = BigNumber.from(gasPriceMaximum);
    if (gasPrice.lt(min)) {
      gasPrice = min;
    } else if (gasPrice.gte(max)) {
      this.logger.warn("Hit the gas price absolute maximum.", requestContext, methodContext, {
        chainId: this.chainId,
        gasPrice: utils.formatUnits(gasPrice, "gwei"),
        absoluteMax: utils.formatUnits(max, "gwei"),
      });
      gasPrice = max;
      hitMaximum = true;
    }

    // Update our last used gas price with this tx's gas price. This may be used to determine the cap of
    // subsuquent tx's gas price.
    this.lastUsedGasPrice = gasPrice;

    // We only want to cache the gas price if we didn't hit the maximum.
    if (!hitMaximum) {
      this.cache.set({ gasPrice });
    }

    return gasPrice;
  }

  /**
   * Get the current balance for the specified address.
   *
   * @param address - The hexadecimal string address whose balance we are getting.
   * @param assetId - The ID (address) of the asset whose balance we are getting.
   * @param abi (default = ERC20) - The ABI of the token contract to use, if non-native token.
   *
   * @returns A BigNumber representing the current value held by the wallet at the
   * specified address.
   */
  public async getBalance(address: string, assetId: string, abi?: string[]): Promise<BigNumber> {
    return this.execute<BigNumber>(false, async (provider: SyncProvider) => {
      if (assetId === constants.AddressZero) {
        return await provider.getBalance(address);
      } else {
        const contract = new Contract(assetId, abi ?? ERC20Abi, provider);
        return await contract.balanceOf(address);
      }
    });
  }

  /**
   * Get the decimals for the ERC20 token contract.
   *
   * @param address The hexadecimal string address of the asset.
   *
   * @returns A number representing the current decimals.
   */
  public async getDecimalsForAsset(assetId: string): Promise<number> {
    return this.execute<number>(false, async (provider: SyncProvider) => {
      if (this.cachedDecimals[assetId]) {
        return this.cachedDecimals[assetId];
      }

      if (assetId === constants.AddressZero) {
        this.cachedDecimals[assetId] = 18;
        return 18;
      }

      // Get provider
      const decimals = await new Contract(assetId, ERC20Abi, provider).decimals();
      this.cachedDecimals[assetId] = decimals;
      return decimals;
    });
  }

  /**
   * Gets the current block number.
   *
   * @returns A number representing the current block number.
   */
  public async getBlock(
    blockHashOrBlockTag: providers.BlockTag | Promise<providers.BlockTag>,
  ): Promise<providers.Block> {
    return this.execute<providers.Block>(false, async (provider) => {
      return await provider.getBlock(blockHashOrBlockTag);
    });
  }

  /**
   * Gets the current blocktime.
   *
   * @param blockTag (default: "latest") - The block tag to get the blocktime for, could be a block number or a block hash.
   * By default, this will get the current blocktime.
   *
   * @returns A number representing the current blocktime.
   */
  public async getBlockTime(blockTag = "latest"): Promise<number> {
    return this.execute<number>(false, async (provider: SyncProvider) => {
      const block = await provider.getBlock(blockTag);
      return block.timestamp;
    });
  }

  /**
   * Gets the current block number.
   *
   * @returns A number representing the current block number.
   */
  public async getBlockNumber(): Promise<number> {
    return this.execute<number>(false, async (provider: SyncProvider) => {
      return await provider.getBlockNumber();
    });
  }

  /**
   * Gets the signer's address.
   *
   * @returns A hash string address belonging to the signer.
   */
  public async getAddress(): Promise<string> {
    this.checkSigner();
    return await this.signer!.getAddress();
  }

  /**
   * Retrieves a transaction's receipt by the transaction hash.
   *
   * @param hash - the transaction hash to get the receipt for.
   *
   * @returns A TransactionReceipt instance.
   */
  public async getTransactionReceipt(hash: string): Promise<providers.TransactionReceipt> {
    return this.execute<providers.TransactionReceipt>(false, async (provider: SyncProvider) => {
      const receipt = await provider.getTransactionReceipt(hash);
      return receipt;
    });
  }

  /**
   * Returns a hexcode string representation of the contract code at the given
   * address. If there is no contract deployed at the given address, returns "0x".
   *
   * @param address - contract address.
   *
   * @returns Hexcode string representation of contract code.
   */
  public async getCode(address: string): Promise<string> {
    return this.execute<string>(false, async (provider: SyncProvider) => {
      return await provider.getCode(address);
    });
  }

  /**
   * Gets the current transaction count.
   *
   * @param blockTag (default: "latest") - The block tag to get the transaction count for. Use "latest" mined-only transactions.
   * Use "pending" for transactions that have not been mined yet, but will (supposedly) be mined in the pending
   * block (essentially, transactions included in the mempool, but this behavior is not consistent).
   *
   * @returns Number of transactions sent AKA the current nonce.
   */
  public async getTransactionCount(blockTag = "latest"): Promise<number> {
    // TODO: Cache both latest and pending transaction counts separately?
    if (this.cache.data.transactionCount && blockTag === "latest") {
      return this.cache.data.transactionCount;
    }

    return this.execute<number>(true, async (provider: SyncProvider) => {
      const transactionCount = await provider.getTransactionCount(await this.signer!.getAddress(), blockTag);
      this.cache.set({ transactionCount });
      return transactionCount;
    });
  }

  /// HELPERS
  /**
   * A helper to throw a custom error if the method requires a signer but no signer has
   * been injected into the provider.
   *
   * @throws NxtpError if signer is required and not provided.
   */
  private checkSigner() {
    if (!this.signer) {
      throw new NxtpError("Method requires signer, and no signer was provided.");
    }
  }

  /**
   * The RPC method execute wrapper is used for wrapping and parsing errors, as well as ensuring that
   * providers are ready before any call is made. Also used for executing multiple retries for RPC
   * requests to providers. This is to circumvent any issues related to unreliable internet/network
   * issues, whether locally, or externally (for the provider's network).
   *
   * @param method - The method callback to execute and wrap in retries.
   * @returns The object of the specified generic type.
   * @throws NxtpError if the method fails to execute.
   */
  private async execute<T>(needsSigner: boolean, method: (provider: SyncProvider) => Promise<T>): Promise<T> {
    // If we need a signer, check to ensure we have one.
    if (needsSigner) {
      this.checkSigner();
    }
    const errors: any[] = [];
    const syncedProviders = this.shuffleSyncedProviders();
    for (const provider of syncedProviders) {
      try {
        return await method(provider);
      } catch (e) {
        const error = parseError(e);
        // If the error thrown is a timeout or non-RPC or non-Server error, we want to go ahead and throw it.
        // e.g. a TransactionReverted, TransactionReplaced, etc.
        if (
          error.type !== ServerError.type &&
          (error.type !== RpcError.type || (error as RpcError).reason === RpcError.reasons.Timeout)
        ) {
          throw error;
        } else {
          errors.push(error);
        }
      }
    }
    throw new RpcError(RpcError.reasons.FailedToSend, { errors });
  }

  /**
   * Callback method used for handling a block update from synchronized providers.
   *
   * @remarks
   * Since being "in-sync" is actually a relative matter, it's possible to have all providers
   * be out of sync (e.g. 100 blocks behind the current block in reality), but also have them
   * be considered in-sync here, since we only use the highest block among our providers to determine
   * the "true" current block.
   *
   *
   * @param provider - SyncProvider instance this block update applies to.
   * @param blockNumber - Current block number (according to the provider).
   * @param url - URL of the provider.
   * @returns boolean indicating whether the provider is in sync.
   */
  protected async syncProviders(): Promise<void> {
    const { requestContext, methodContext } = createLoggingContext(this.syncProviders.name);

    // Reset the current lead provider.
    this.leadProvider = undefined;

    // First, sync all providers simultaneously.
    await Promise.all(
      this.providers.map((p) => new Promise((resolve, reject) => p.sync().then(resolve).catch(reject))),
    );

    // Find the provider with the highest block number and use that as source of truth.
    const highestBlockNumber = Math.max(...this.providers.map((p) => p.syncedBlockNumber));
    for (const provider of this.providers) {
      const providerBlockNumber = provider.syncedBlockNumber;
      provider.lag = highestBlockNumber - providerBlockNumber;

      // Set synced property, log if the provider went out of sync.
      const synced = provider.lag < PROVIDER_MAX_LAG;
      if (!synced && provider.synced) {
        // If the provider was previously synced but fell out of sync, debug log to notify.
        this.logger.debug("Provider fell out of sync.", undefined, undefined, {
          providerBlockNumber,
          provider: provider.name,
          lag: provider.lag,
        });
      }
      provider.synced = synced;
    }

    // We want to pick the lead provider here at random from the list of 0-lag providers to ensure that we distribute
    // our block listener RPC calls as evenly as possible across all providers.
    const leadProviders = this.shuffleSyncedProviders(true);
    this.leadProvider = leadProviders[(Math.random() * leadProviders.length) | 0];

    this.logger.debug("Synced provider(s).", requestContext, methodContext, {
      highestBlockNumber,
      leadProvider: this.leadProvider.name,
      providers: this.providers
        .filter((p) => p.synced)
        .map((p) => ({
          url: p.name,
          blockNumber: p.syncedBlockNumber,
          lag: p.lag,
        })),
    });
  }

  /**
   * Helper method to stall, possibly until we've surpassed a specified number of blocks. Only works
   * with block number if we're running in synchronized mode.
   *
   * @param numBlocks (default: 1) - the number of blocks to wait.
   */
  private async wait(numBlocks = 1): Promise<void> {
    const pollPeriod = numBlocks * (this.blockPeriod ?? 2_000);
    await delay(pollPeriod);
  }

  /**
   * Helper method for getting tier-shuffled synced providers.
   *
   * @returns all in-sync providers in order of synchronicity with chain, with the lead provider
   * in the first position and the rest shuffled by tier (lag).
   */
  private shuffleSyncedProviders(zeroLagOnly = false): SyncProvider[] {
    const syncedProviders = this.providers.filter((p) => (zeroLagOnly ? p.lag === 0 : p.synced));
    // Tiered shuffling: providers that have the same lag value (e.g. 0) will be shuffled so as to distribute RPC calls
    // as evenly as possible across all providers; at high load, this can translate to higher efficiency (each time we
    // execute an RPC call, we'll be hitting different providers).
    // Shuffle isn't applied to lead provider - instead, we just guarantee that it's in the first position.
    syncedProviders.forEach((p) => {
      p.priority =
        p.lag -
        (this.leadProvider && p.name === this.leadProvider.name ? 1 : Math.random()) -
        p.cps / this.config.maxProviderCPS -
        p.reliability * 2 +
        p.avgExecTime;
    });
    return syncedProviders.sort((a, b) => a.priority - b.priority);
  }

  private async setBlockPeriod(): Promise<void> {
    try {
      const currentBlock = await this.getBlock("latest");
      const previousBlock = await this.getBlock(currentBlock.parentHash);
      this.blockPeriod = currentBlock.timestamp - previousBlock.timestamp;
    } catch (error) {
      // If we can't get the block period, we'll just use a default value.
      this.logger.warn("Could not get block period time, using default.", undefined, undefined, {
        chainId: this.chainId,
        error,
        default: DEFAULT_BLOCK_PERIOD,
      });
    }
  }
}
