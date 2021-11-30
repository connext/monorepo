import { Signer, providers, BigNumber, constants } from "ethers";
import { createLoggingContext, GAS_ESTIMATES, Logger, RequestContext } from "@connext/nxtp-utils";

import { TransactionServiceConfig, validateTransactionServiceConfig, DEFAULT_CONFIG, ChainConfig } from "./config";
import { ReadTransaction } from "./types";
import { ChainRpcProvider } from "./provider";
import { ChainNotSupported, ConfigurationError, ProviderNotConfigured } from "./error";
import { getDeployedChainIdsForGasFee, getDeployedPriceOracleContract, getPriceOracleInterface } from "./contracts";

const NO_ORACLE_CHAINS: number[] = [];

// TODO: I do not like that this is generally a passthrough class now - all it handles is the mapping. We should
// probably just expose a provider getter method and have the consumer call that to access the target ChainRpcProvider
// directly.
/**
 * @classdesc Performs onchain reads with embedded retries.
 */
export class ChainReader {
  protected providers: Map<number, ChainRpcProvider> = new Map();
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
  constructor(protected readonly logger: Logger, config: Partial<TransactionServiceConfig>, signer?: string | Signer) {
    const { requestContext } = createLoggingContext(this.constructor.name);
    // Set up the config.
    this.config = Object.assign(DEFAULT_CONFIG, config);
    validateTransactionServiceConfig(this.config);
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
    return await this.getProvider(tx.chainId).readTransaction(tx);
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
    return await this.getProvider(chainId).getBalance(address);
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

  public async getCode(chainId: number, address: string): Promise<string> {
    return await this.getProvider(chainId).getCode(address);
  }

  /// CONTRACT READ METHODS
  /**
   * Gets token price in usd from price oracle
   *
   * @param chainId - The network identifier.
   * @param assetId - The asset address to get price for.
   */
  async getTokenPrice(chainId: number, assetId: string, _requestContext?: RequestContext): Promise<BigNumber> {
    const { requestContext } = createLoggingContext(this.getTokenPrice.name, _requestContext);
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
    return BigNumber.from(tokenPrice);
  }

  /**
   * Calculates total router gas fee in token.
   *
   * @param sendingChainId The source chain Id
   * @param sendingAssetId The asset address on source chain
   * @param receivingChainId The destination chain Id
   * @param receivingAssetId The asset address on destination chain
   * @param _outputDecimals Decimal number of receiving asset
   * @param requestContext Request context instance
   */
  async calculateGasFeeInReceivingToken(
    sendingChainId: number,
    sendingAssetId: string,
    receivingChainId: number,
    receivingAssetId: string,
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
      receivingAssetId,
      receivingChainId,
      outputDecimals,
    });

    const chainIdsForGasFee = getDeployedChainIdsForGasFee();

    if (!chainIdsForGasFee.includes(sendingChainId) && !chainIdsForGasFee.includes(receivingChainId)) {
      return constants.Zero;
    }
    let totalCost = constants.Zero;
    // TODO: this is returning zero when doing a rinkeby to goerli tx. i believe this is because the oracle
    // is not configured for goerli so theres no way to translate the price to goerli
    // TODO: we can combine these into just 2 if statements and remove the repeated logic
    // calculate receiving token amount for gas fee
    // if chainIdsForGasFee includes only sendingChainId, calculate gas fee for fulfill transactions
    // if chainIdsForGasFee includes only receivingChainId, calculate gas fee for prepare transactions

    const tokenPricingSendingChain = NO_ORACLE_CHAINS.includes(sendingChainId) ? 1 : sendingChainId;
    const tokenPricingReceivingChain = NO_ORACLE_CHAINS.includes(receivingChainId) ? 1 : receivingChainId;

    this.logger.info("Getting token prices", requestContext, methodContext, {
      tokenPricingSendingChain,
      tokenPricingReceivingChain,
      sendingAssetId,
      receivingAssetId,
      outputDecimals,
    });
    if (chainIdsForGasFee.includes(sendingChainId)) {
      const gasLimitForFulfill = BigNumber.from(GAS_ESTIMATES.fulfill);
      const [ethPriceInSendingChain, receivingTokenPrice, gasPriceInSendingChain] = await Promise.all([
        this.getTokenPrice(tokenPricingSendingChain, constants.AddressZero),
        this.getTokenPrice(tokenPricingSendingChain, sendingAssetId),
        this.getGasPrice(sendingChainId, requestContext),
      ]);

      // https://community.optimism.io/docs/users/fees-2.0.html#fees-in-a-nutshell
      let l1GasInUsd = BigNumber.from(0);
      if (sendingChainId === 10) {
        const gasPriceMainnet = await this.getGasPrice(1, requestContext);
        l1GasInUsd = gasPriceMainnet.mul(GAS_ESTIMATES.fulfillL1).mul(ethPriceInSendingChain);
      }
      const gasAmountInUsd = gasPriceInSendingChain.mul(gasLimitForFulfill).mul(ethPriceInSendingChain).add(l1GasInUsd);
      const tokenAmountForGasFee = receivingTokenPrice.isZero()
        ? constants.Zero
        : gasAmountInUsd.div(receivingTokenPrice).div(BigNumber.from(10).pow(18 - outputDecimals));

      totalCost = totalCost.add(tokenAmountForGasFee);
      this.logger.info("Calculated cost on sending chain", requestContext, methodContext, {
        totalCost: totalCost.toString(),
        l1GasInUsd: l1GasInUsd.toString(),
        ethPriceInSendingChain: ethPriceInSendingChain.toString(),
        receivingTokenPrice: receivingTokenPrice.toString(),
        gasPriceInSendingChain: gasPriceInSendingChain.toString(),
      });
    }

    if (chainIdsForGasFee.includes(receivingChainId)) {
      const gasLimitForPrepare = BigNumber.from(GAS_ESTIMATES.prepare);
      const [ethPriceInReceivingChain, receivingTokenPrice, gasPriceInReceivingChain] = await Promise.all([
        this.getTokenPrice(tokenPricingReceivingChain, constants.AddressZero),
        this.getTokenPrice(tokenPricingReceivingChain, receivingAssetId),
        this.getGasPrice(receivingChainId, requestContext),
      ]);

      // https://community.optimism.io/docs/users/fees-2.0.html#fees-in-a-nutshell
      let l1GasInUsd = BigNumber.from(0);
      if (receivingChainId === 10) {
        const gasPriceMainnet = await this.getGasPrice(1, requestContext);
        l1GasInUsd = gasPriceMainnet.mul(GAS_ESTIMATES.prepareL1).mul(ethPriceInReceivingChain);
      }
      const gasAmountInUsd = gasPriceInReceivingChain
        .mul(gasLimitForPrepare)
        .mul(ethPriceInReceivingChain)
        .add(l1GasInUsd);
      const tokenAmountForGasFee = receivingTokenPrice.isZero()
        ? constants.Zero
        : gasAmountInUsd.div(receivingTokenPrice).div(BigNumber.from(10).pow(18 - outputDecimals));

      totalCost = totalCost.add(tokenAmountForGasFee);
      this.logger.info("Calculated cost on receiving chain", requestContext, methodContext, {
        totalCost: totalCost.toString(),
        tokenAmountForGasFee: tokenAmountForGasFee.toString(),
        l1GasInUsd: l1GasInUsd.toString(),
        ethPriceInSendingChain: ethPriceInReceivingChain.toString(),
        receivingTokenPrice: receivingTokenPrice.toString(),
        gasPriceInSendingChain: gasPriceInReceivingChain.toString(),
      });
    }

    // convert back to the intended decimals
    return totalCost;
  }

  /**
   * Calculates relayer fee in receiving token.
   *
   * @param receivingChainId The destination chain Id
   * @param receivingAssetId The asset address on destination chain
   * @param outputDecimals Decimal number of receiving asset
   * @param requestContext Request context instance
   */
  async calculateGasFeeInReceivingTokenForFulfill(
    receivingChainId: number,
    receivingAssetId: string,
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
      outputDecimals,
    });
    const chaindIdsForGasFee = getDeployedChainIdsForGasFee();

    if (!chaindIdsForGasFee.includes(receivingChainId)) return constants.Zero;
    let totalCost = constants.Zero;

    const tokenPricingReceivingChain = NO_ORACLE_CHAINS.includes(receivingChainId) ? 1 : receivingChainId;

    if (chaindIdsForGasFee.includes(receivingChainId)) {
      const gasLimitForFulfill = BigNumber.from(GAS_ESTIMATES.fulfill);
      const [ethPriceInReceivingChain, receivingTokenPrice, gasPriceInReceivingChain] = await Promise.all([
        this.getTokenPrice(tokenPricingReceivingChain, constants.AddressZero),
        this.getTokenPrice(tokenPricingReceivingChain, receivingAssetId),
        this.getGasPrice(receivingChainId, requestContext),
      ]);

      // https://community.optimism.io/docs/users/fees-2.0.html#fees-in-a-nutshell
      let l1GasInUsd = BigNumber.from(0);
      if (receivingChainId === 10) {
        const gasPriceMainnet = await this.getGasPrice(1, requestContext);
        l1GasInUsd = gasPriceMainnet.mul(GAS_ESTIMATES.prepareL1).mul(ethPriceInReceivingChain);
      }

      const gasAmountInUsd = gasPriceInReceivingChain
        .mul(gasLimitForFulfill)
        .mul(ethPriceInReceivingChain)
        .add(l1GasInUsd);
      const tokenAmountForGasFee = receivingTokenPrice.isZero()
        ? constants.Zero
        : gasAmountInUsd.div(receivingTokenPrice).div(BigNumber.from(10).pow(18 - outputDecimals));

      this.logger.info("Calculated cost on receiving chain for fulfill", requestContext, methodContext, {
        totalCost: totalCost.toString(),
        tokenAmountForGasFee: tokenAmountForGasFee.toString(),
        l1GasInUsd: l1GasInUsd.toString(),
        ethPriceInReceivingChain: ethPriceInReceivingChain.toString(),
        receivingTokenPrice: receivingTokenPrice.toString(),
        gasPriceInReceivingChain: gasPriceInReceivingChain.toString(),
      });

      totalCost = totalCost.add(tokenAmountForGasFee);
    }

    return totalCost;
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
  protected getProvider(chainId: number): ChainRpcProvider {
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
    const chains = this.config.chains;
    Object.keys(chains).forEach((chainId) => {
      // Get this chain's config.
      const chain: ChainConfig = chains[chainId];
      // Ensure at least one provider is configured.
      if (chain.providers.length === 0) {
        const error = new ConfigurationError({
          providers,
        });
        this.logger.error("Failed to create transaction service", context, methodContext, error.toJson(), {
          chainId,
          providers,
        });
        throw error;
      }
      const chainIdNumber = parseInt(chainId);
      const provider = new ChainRpcProvider(this.logger, chainIdNumber, chain, this.config, signer);
      this.providers.set(chainIdNumber, provider);
    });
  }

  private getPriceOracleContract(chainId: number, requestContext: RequestContext): { address: string; abi: any } {
    const priceOracleContract = getDeployedPriceOracleContract(chainId);
    if (!priceOracleContract) {
      throw new ChainNotSupported(chainId.toString(), requestContext);
    }
    return priceOracleContract;
  }
}
