import { Signer, providers, BigNumber, constants } from "ethers";
import { createLoggingContext, Logger, RequestContext, getNtpTimeSeconds } from "@connext/nxtp-utils";

import { TransactionServiceConfig, validateTransactionServiceConfig, ChainConfig } from "./config";
import {
  ReadTransaction,
  ChainNotSupported,
  ConfigurationError,
  ProviderNotConfigured,
  getDeployedPriceOracleContract,
  getPriceOracleInterface,
  WriteTransaction,
} from "./shared";
import { RpcProviderAggregator } from "./aggregator";

// TODO: Rename to BlockchainService
// TODO: I do not like that this is generally a passthrough class now - all it handles is the mapping. We should
// probably just expose a provider getter method and have the consumer call that to access the target ChainRpcProvider
// directly.

// TODO: Condense caching.
export const cachedPriceMap: Map<string, { timestamp: number; price: BigNumber }> = new Map();
/**
 * @classdesc Performs onchain reads with embedded retries.
 */
export class ChainReader {
  protected providers: Map<number, RpcProviderAggregator> = new Map();
  protected readonly config: TransactionServiceConfig;

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
  constructor(protected readonly logger: Logger, config: any, signer?: string | Signer) {
    const { requestContext } = createLoggingContext(this.constructor.name);
    // Set up the config.
    this.config = validateTransactionServiceConfig(config);
    this.setupProviders(requestContext, signer);
  }

  /// CHAIN READING METHODS
  /**
   * Create a non-state changing contract call. Returns hexdata that needs to be decoded.
   *
   * @param tx - ReadTransaction to create contract call
   * @param tx.chainId - Chain to read transaction on
   * @param tx.to - Address to execute read on
   * @param tx.data - Calldata to send
   * @param blockTag - (optional) Block tag to query, defaults to latest
   *
   * @returns Encoded hexdata representing result of the read from the chain.
   */
  public async readTx(tx: ReadTransaction, blockTag: providers.BlockTag = "latest"): Promise<string> {
    return await this.getProvider(tx.chainId).readContract(tx, blockTag);
  }

  /**
   * Gets the asset balance for a specified address for the specified chain. Optionally pass in the
   * assetId; by default, gets the native asset.
   *
   * @param chainId - The ID of the chain for which this call is related.
   * @param address - The hexadecimal string address whose balance we are getting.
   * @param assetId (default = ETH) - The ID (address) of the asset whose balance we are getting.
   * @param abi - The ABI of the token contract to use for interfacing with it, if applicable (non-native).
   * Defaults to ERC20.
   *
   * @returns BigNumber representing the current value held by the wallet at the
   * specified address.
   */
  public async getBalance(
    chainId: number,
    address: string,
    assetId = constants.AddressZero,
    abi?: string[],
  ): Promise<BigNumber> {
    return await this.getProvider(chainId).getBalance(address, assetId, abi);
  }
  /**
   * Get the current gas price for the chain for which this instance is servicing.
   *
   * @param chainId - The ID of the chain for which this call is related.
   * @param requestContext - The request context.
   * @returns BigNumber representing the current gas price.
   */
  public async getGasPrice(chainId: number, requestContext: RequestContext): Promise<BigNumber> {
    return await this.getProvider(chainId).getGasPrice(requestContext);
  }

  /**
   * Gets the decimals for an asset by chainId
   *
   * @param chainId - The ID of the chain for which this call is related.
   * @param assetId - The hexadecimal string address whose decimals we are getting.
   * @returns number representing the decimals of the asset
   */
  public async getDecimalsForAsset(chainId: number, assetId: string): Promise<number> {
    return await this.getProvider(chainId).getDecimalsForAsset(assetId);
  }

  /**
   * Gets a block
   *
   * @param chainId - The ID of the chain for which this call is related.
   * @returns block representing the specified
   */
  public async getBlock(
    chainId: number,
    blockHashOrBlockTag: providers.BlockTag | Promise<providers.BlockTag>,
  ): Promise<providers.Block | undefined> {
    return await this.getProvider(chainId).getBlock(blockHashOrBlockTag);
  }

  /**
   * Gets the current blocktime
   *
   * @param chainId - The ID of the chain for which this call is related.
   * @returns number representing the current blocktime
   */
  public async getBlockTime(chainId: number): Promise<number> {
    return await this.getProvider(chainId).getBlockTime();
  }

  /**
   * Gets the current block number
   *
   * @param chainId - The ID of the chain for which this call is related.
   * @returns number representing the current block
   */
  public async getBlockNumber(chainId: number): Promise<number> {
    return await this.getProvider(chainId).getBlockNumber();
  }

  /**
   * Gets a trsanction receipt by hash
   *
   * @param chainId - The ID of the chain for which this call is related.
   * @returns number representing the current blocktime
   */
  public async getTransactionReceipt(chainId: number, hash: string): Promise<providers.TransactionReceipt> {
    return await this.getProvider(chainId).getTransactionReceipt(hash);
  }

  /**
   * Returns a hexcode string representation of the contract code at the given
   * address. If there is no contract deployed at the given address, returns "0x".
   *
   * @param address - contract address.
   *
   * @returns Hexcode string representation of contract code.
   */
  public async getCode(chainId: number, address: string): Promise<string> {
    return await this.getProvider(chainId).getCode(address);
  }

  /**
   * Checks estimate for gas limit for given transaction on given chain.
   *
   * @param chainId - chain on which the transaction is intended to be executed.
   * @param tx - transaction to check gas limit for.
   *
   * @returns BigNumber representing the estimated gas limit in gas units.
   * @throws Error if the transaction is invalid, or would be reverted onchain.
   */
  public async getGasEstimate(chainId: number, tx: ReadTransaction | WriteTransaction): Promise<BigNumber> {
    return await this.getProvider(chainId).getGasEstimate(tx);
  }

  /**
   * Checks estimate for gas limit for given transaction on given chain. Includes revert
   * error codes if failure occurs.
   *
   * @param chainId - chain on which the transaction is intended to be executed.
   * @param tx - transaction to check gas limit for.
   *
   * @returns BigNumber representing the estimated gas limit in gas units.
   * @throws Error if the transaction is invalid, or would be reverted onchain.
   */
  public async getGasEstimateWithRevertCode(
    chainId: number,
    tx: ReadTransaction | WriteTransaction,
  ): Promise<BigNumber> {
    return await this.getProvider(chainId).estimateGas({ ...tx, chainId: undefined });
  }

  /// CONTRACT READ METHODS
  /**
   * Gets token price in usd from cache or price oracle
   *
   * @param chainId - The network identifier.
   * @param assetId - The asset address to get price for.
   */
  public async getTokenPrice(
    chainId: number,
    assetId: string,
    blockTag: providers.BlockTag = "latest",
    _requestContext?: RequestContext,
  ): Promise<BigNumber> {
    const { requestContext } = createLoggingContext(this.getTokenPrice.name, _requestContext);

    const cachedPriceKey = chainId.toString().concat("-").concat(assetId).concat(blockTag.toString());
    const cachedTokenPrice = cachedPriceMap.get(cachedPriceKey);
    const curTimeInSecs = getNtpTimeSeconds();

    // If it's been less than a minute since we retrieved token price, send the last update in token price.
    if (cachedTokenPrice && cachedTokenPrice.timestamp >= curTimeInSecs - 60) {
      return cachedTokenPrice.price;
    }

    const tokenPrice = await this.getTokenPriceFromOnChain(chainId, assetId, blockTag, requestContext);
    cachedPriceMap.set(cachedPriceKey, { timestamp: curTimeInSecs, price: tokenPrice });
    return tokenPrice;
  }

  /**
   * Gets token price in usd from price oracle
   *
   * @param chainId - The network identifier.
   * @param assetId - The asset address to get price for.
   */
  public async getTokenPriceFromOnChain(
    chainId: number,
    assetId: string,
    blockTag: providers.BlockTag = "latest",
    _requestContext?: RequestContext,
  ): Promise<BigNumber> {
    const { requestContext } = createLoggingContext(this.getTokenPriceFromOnChain.name, _requestContext);
    const priceOracleContract = getDeployedPriceOracleContract(chainId);
    if (!priceOracleContract || !priceOracleContract.address) {
      throw new ChainNotSupported(chainId.toString(), requestContext);
    }
    const encodedTokenPriceData = getPriceOracleInterface().encodeFunctionData("getTokenPrice", [assetId]);
    const tokenPrice = await this.readTx(
      {
        chainId,
        to: priceOracleContract.address,
        data: encodedTokenPriceData,
      },
      blockTag,
    );
    const tokenPriceInBigNum = BigNumber.from(tokenPrice);
    return tokenPriceInBigNum;
  }

  /**
   * Helper to check for chain support gently.
   *
   * @param chainId - chainID of the chain to check
   * @returns boolean indicating whether chain of chainID is supported by the service
   */
  public isSupportedChain(chainId: number): boolean {
    return this.providers.has(chainId);
  }

  /// HELPERS
  /**
   * Helper to wrap getting provider for specified chain ID.
   * @param chainId The ID of the chain for which we want a provider.
   * @returns The ChainRpcProvider for that chain.
   * @throws TransactionError.reasons.ProviderNotFound if provider is not configured for
   * that ID.
   */
  protected getProvider(chainId: number): RpcProviderAggregator {
    // Ensure that a signer, provider, etc are present to execute on this chainId.
    if (!this.providers.has(chainId)) {
      throw new ProviderNotConfigured(chainId.toString());
    }
    return this.providers.get(chainId)!;
  }

  /**
   * Populate the provider mapping using chain configurations.
   * @param context - The request context object used for logging.
   * @param signer - The signer that will be used for onchain operations.
   */
  protected setupProviders(context: RequestContext, signer?: string | Signer) {
    const { methodContext } = createLoggingContext(this.setupProviders.name, context);
    // For each chain ID / provider, map out all the utils needed for each chain.
    Object.keys(this.config).forEach((chainId) => {
      // Get this chain's config.
      const chain: ChainConfig = this.config[chainId];
      // Ensure at least one provider is configured.
      if (chain.providers.length === 0) {
        const error = new ConfigurationError(
          [
            {
              parameter: "providers",
              error: "No valid providers were supplied in configuration for this chain.",
              value: providers,
            },
          ],
          {
            chainId,
          },
        );
        this.logger.error("Failed to create transaction service", context, methodContext, error.toJson(), {
          chainId,
          providers,
        });
        throw error;
      }
      const chainIdNumber = parseInt(chainId);
      const provider = new RpcProviderAggregator(this.logger, chainIdNumber, chain, signer);
      this.providers.set(chainIdNumber, provider);
    });
  }
}
