import { Signer, providers, BigNumber, constants } from "ethers";
import {
  createLoggingContext,
  GAS_ESTIMATES,
  Logger,
  RequestContext,
  MethodContext,
  getNtpTimeSeconds,
} from "@connext/nxtp-utils";

import { TransactionServiceConfig, validateTransactionServiceConfig, ChainConfig } from "./config";
import {
  ReadTransaction,
  ChainNotSupported,
  ConfigurationError,
  ProviderNotConfigured,
  CHAINS_WITH_PRICE_ORACLES,
  getDeployedPriceOracleContract,
  getPriceOracleInterface,
} from "./shared";
import { RpcProviderAggregator } from "./rpcProviderAggregator";

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
   *
   * @returns Encoded hexdata representing result of the read from the chain.
   */
  public async readTx(tx: ReadTransaction): Promise<string> {
    return await this.getProvider(tx.chainId).readContract(tx);
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

  /// CONTRACT READ METHODS
  /**
   * Gets token price in usd from cache or price oracle
   *
   * @param chainId - The network identifier.
   * @param assetId - The asset address to get price for.
   */
  public async getTokenPrice(chainId: number, assetId: string, _requestContext?: RequestContext): Promise<BigNumber> {
    const { requestContext } = createLoggingContext(this.getTokenPrice.name, _requestContext);

    const cachedPriceKey = chainId.toString().concat("-").concat(assetId);
    const cachedTokenPrice = cachedPriceMap.get(cachedPriceKey);
    const curTimeInSecs = await getNtpTimeSeconds();

    // If it's been less than a minute since we retrieved token price, send the last update in token price.
    if (cachedTokenPrice && cachedTokenPrice.timestamp >= curTimeInSecs - 60) {
      return cachedTokenPrice.price;
    }

    const tokenPrice = await this.getTokenPriceFromOnChain(chainId, assetId, requestContext);
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
    _requestContext?: RequestContext,
  ): Promise<BigNumber> {
    const { requestContext } = createLoggingContext(this.getTokenPriceFromOnChain.name, _requestContext);
    const priceOracleContract = getDeployedPriceOracleContract(chainId);
    if (!priceOracleContract) {
      throw new ChainNotSupported(chainId.toString(), requestContext);
    }
    const encodedTokenPriceData = getPriceOracleInterface().encodeFunctionData("getTokenPrice", [assetId]);
    const tokenPrice = await this.readTx({
      chainId,
      to: priceOracleContract.address,
      data: encodedTokenPriceData,
    });
    const tokenPriceInBigNum = BigNumber.from(tokenPrice);
    return tokenPriceInBigNum;
  }

  /**
   * Calculates total router gas fee in token.
   *
   * @param sendingChainId The source chain ID
   * @param sendingChainIdForGasPrice The source chain ID where we're going to gas price on
   * @param sendingAssetId The asset address on source chain
   * @param sendingNativeChainId The network that we're going to get the native token price of sending chain on
   * @param sendingNativeAssetId The native asset id on source chain
   * @param receivingChainId The destination chain ID
   * @param receivingChainIdForGasPrice The destination chain ID where we're going to gas price on
   * @param receivingAssetId The asset address on destination chain
   * @param receivingNativeChainId The network that we're going to get the native token price of receiving chain on
   * @param receivingNativeAssetId The native asset id on destination chain
   * @param outputDecimals Decimal number of receiving asset
   * @param _requestContext Request context instance
   */
  async calculateGasFeeInReceivingToken(
    sendingChainId: number,
    sendingChainIdForGasPrice: number,
    sendingAssetId: string,
    sendingNativeChainId: number,
    sendingNativeAssetId: string,
    receivingChainId: number,
    receivingChainIdForGasPrice: number,
    receivingAssetId: string,
    receivingNativeChainId: number,
    receivingNativeAssetId: string,
    outputDecimals: number,
    _requestContext?: RequestContext,
  ): Promise<BigNumber> {
    const { requestContext, methodContext } = createLoggingContext(
      this.calculateGasFeeInReceivingToken.name,
      _requestContext,
    );
    this.logger.info("Method start", requestContext, methodContext, {
      sendingChainId,
      sendingAssetId,
      sendingChainIdForGasPrice,
      sendingNativeChainId,
      sendingNativeAssetId,
      receivingAssetId,
      receivingChainId,
      receivingChainIdForGasPrice,
      receivingNativeChainId,
      receivingNativeAssetId,
      outputDecimals,
    });

    // NOTE: This is returning zero when doing a rinkeby to goerli tx. I believe this is because the oracle
    // is not configured for goerli so theres no way to translate the price to goerli.
    const [senderFulfillGasFee, receiverPrepareGasFee] = await Promise.all([
      // Calculate gas fees for sender fulfill.
      this.calculateGasFee(
        sendingChainId,
        sendingChainIdForGasPrice,
        sendingAssetId,
        sendingNativeChainId,
        sendingNativeAssetId,
        outputDecimals,
        "fulfill",
        false,
        requestContext,
        methodContext,
      ),
      // Calculate gas fees for receiver prepare.
      this.calculateGasFee(
        receivingChainId,
        receivingChainIdForGasPrice,
        receivingAssetId,
        receivingNativeChainId,
        receivingNativeAssetId,
        outputDecimals,
        "prepare",
        false,
        requestContext,
        methodContext,
      ),
    ]);

    return senderFulfillGasFee.add(receiverPrepareGasFee);
  }

  /**
   * Calculates relayer fee in receiving token.
   *
   * @param receivingChainId - The destination chain ID.
   * @param receivingChainIdForGasPrice - The destination chain ID that we're going to get gas price on.
   * @param receivingAssetId - The asset address on destination chain.
   * @param receivingNativeChainId - The network Id that we're going to get native asset price on.
   * @param receivingNativeAssetId - The native asset address on {receivingNativeChainId}.
   * @param outputDecimals - Decimal number of receiving asset.
   * @param requestContext - Request context instance.
   */
  async calculateGasFeeInReceivingTokenForFulfill(
    receivingChainId: number,
    receivingChainIdForGasPrice: number,
    receivingAssetId: string,
    receivingNativeChainId: number,
    receivingNativeAssetId: string,
    outputDecimals: number,
    _requestContext: RequestContext,
  ): Promise<BigNumber> {
    const { requestContext, methodContext } = createLoggingContext(
      this.calculateGasFeeInReceivingTokenForFulfill.name,
      _requestContext,
    );
    this.logger.info("Method start", requestContext, methodContext, {
      receivingChainId,
      receivingAssetId,
      receivingChainIdForGasPrice,
      receivingNativeChainId,
      receivingNativeAssetId,
      outputDecimals,
    });
    return await this.calculateGasFee(
      receivingChainId,
      receivingChainIdForGasPrice,
      receivingAssetId,
      receivingNativeChainId,
      receivingNativeAssetId,
      outputDecimals,
      "fulfill",
      false,
      requestContext,
      methodContext,
    );
  }

  /**
   * Calculates gas fee for specified chain and asset.
   *
   * @param chainId - The destination chain ID.
   * @param gasPriceChainId - The destination chain ID that we're going to get gas price on.
   * @param assetId - The asset address on destination chain.
   * @param nativeTokenChainId - The chain Id that we're going to get native asset price on.
   * @param nativeTokenAssetId - The native asset address on {nativeTokenChainId}.
   * @param decimals - Decimal number of asset.
   * @param method - Which contract method to calculate gas fees for.
   * @param requestContext - Request context instance.
   * @param methodContext - Method context instance.
   * @param whichChain - Whether it's sender or receiver chain, used for
   * logging purposes only.
   */
  public async calculateGasFee(
    chainId: number,
    gasPriceChainId: number,
    assetId: string,
    nativeTokenChainId: number,
    nativeTokenAssetId: string,
    decimals: number,
    method: "prepare" | "fulfill" | "cancel",
    isRouterContract: boolean,
    requestContext: RequestContext,
    methodContext?: MethodContext,
  ): Promise<BigNumber> {
    // If the list of chains with deployed Price Oracle Contracts does not include
    // this chain ID, return 0.
    if (!CHAINS_WITH_PRICE_ORACLES.includes(chainId) || !CHAINS_WITH_PRICE_ORACLES.includes(nativeTokenChainId)) {
      return constants.Zero;
    }

    // Use Ethereum mainnet's price oracle for token reference if no price oracle is present
    // on the specified chain.
    const [ethPrice, tokenPrice, gasPrice] = await Promise.all([
      this.getTokenPrice(nativeTokenChainId, nativeTokenAssetId),
      this.getTokenPrice(chainId, assetId),
      this.getGasPrice(gasPriceChainId, requestContext),
    ]);

    // https://community.optimism.io/docs/users/fees-2.0.html#fees-in-a-nutshell
    let l1GasInUsd = BigNumber.from(0);
    if (chainId === 10) {
      const gasPriceMainnet = await this.getGasPrice(1, requestContext);
      let gasEstimate = "0";
      if (method === "prepare") {
        gasEstimate = isRouterContract ? GAS_ESTIMATES.prepareRouterContractL1 : GAS_ESTIMATES.prepareL1;
      } else if (method === "fulfill") {
        gasEstimate = isRouterContract ? GAS_ESTIMATES.fulfillRouterContractL1 : GAS_ESTIMATES.fulfillL1;
      } else {
        gasEstimate = isRouterContract ? GAS_ESTIMATES.cancelRouterContractL1 : GAS_ESTIMATES.cancelL1;
      }
      l1GasInUsd = gasPriceMainnet.mul(gasEstimate).mul(ethPrice);
    }

    let gasLimit = BigNumber.from("0");
    if (method === "prepare") {
      gasLimit = BigNumber.from(isRouterContract ? GAS_ESTIMATES.prepareRouterContract : GAS_ESTIMATES.prepare);
    } else if (method === "fulfill") {
      gasLimit = BigNumber.from(isRouterContract ? GAS_ESTIMATES.fulfillRouterContract : GAS_ESTIMATES.fulfill);
    } else {
      gasLimit = BigNumber.from(isRouterContract ? GAS_ESTIMATES.cancelRouterContract : GAS_ESTIMATES.cancel);
    }
    const gasAmountInUsd = gasPrice.mul(gasLimit).mul(ethPrice).add(l1GasInUsd);
    const tokenAmountForGasFee = tokenPrice.isZero()
      ? constants.Zero
      : gasAmountInUsd.div(tokenPrice).div(BigNumber.from(10).pow(18 - decimals));

    this.logger.info(`Calculated gas fee on chain ${chainId} for ${method}`, requestContext, methodContext, {
      tokenAmountForGasFee: tokenAmountForGasFee.toString(),
      l1GasInUsd: l1GasInUsd.toString(),
      ethPrice: ethPrice.toString(),
      tokenPrice: tokenPrice.toString(),
      gasPrice: gasPrice.toString(),
    });

    return tokenAmountForGasFee;
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
