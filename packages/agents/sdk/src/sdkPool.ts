/* eslint-disable @typescript-eslint/no-inferrable-types */
import { providers, BigNumber, BigNumberish, constants, utils } from "ethers";
import { getChainData, Logger, createLoggingContext, ChainData, DEFAULT_ROUTER_FEE } from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";
import memoize from "memoizee";

import { NxtpSdkConfig, getConfig } from "./config";
import { SignerAddressMissing, ChainDataUndefined } from "./lib/errors";
import { Pool, PoolAsset, AssetData } from "./interfaces";
import { PriceFeed } from "./lib/priceFeed";
import { NxtpSdkShared } from "./sdkShared";

/**
 * @classdesc SDK class encapsulating stableswap pool functions.
 *
 * @remarks This class will either interact with internal StableSwapFacet pools or external StableSwap pools
 *      depending on which type of pool is being used for each asset.
 *      Note: SDK currently only supports internal StableSwapFacet pools.
 *
 */
export class NxtpSdkPool extends NxtpSdkShared {
  private static _instance: NxtpSdkPool;
  private readonly priceFeed: PriceFeed;

  constructor(config: NxtpSdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    super(config, logger, chainData);
    this.priceFeed = new PriceFeed();
  }

  /**
   * Create a singleton instance of the NxtpSdkPool class.
   *
   * @param _config - NxtpSdkConfig object.
   * @param _config.chains - Chain config, at minimum with providers for each chain.
   * @param _config.signerAddress - Signer address for transactions.
   * @param _config.logLevel - (optional) Logging severity level.
   * @param _config.network - (optional) Blockchain environment to interact with.
   * @returns providers.TransactionRequest object.
   *
   * @example:
   * ```ts
   * import { NxtpSdkPool } from "@connext/nxtp-sdk";
   *
   * const config = {
   *   "chains": {
   *     "6648936": {
   *       "providers": ["https://rpc.ankr.com/eth"]
   *     },
   *     "1869640809": {
   *       "providers": ["https://mainnet.optimism.io"]
   *     },
   *     "1886350457": {
   *       "providers": ["https://polygon-rpc.com"]
   *     },
   *   },
   *   "signerAddress": "<wallet_address>",
   * }
   *
   * const nxtpSdkPool = await NxtpSdkPool.create(config);
   * ```
   */
  static async create(
    _config: NxtpSdkConfig,
    _logger?: Logger,
    _chainData?: Map<string, ChainData>,
  ): Promise<NxtpSdkPool> {
    const chainData = _chainData ?? (await getChainData());
    if (!chainData) {
      throw new ChainDataUndefined();
    }

    const nxtpConfig = await getConfig(_config, contractDeployments, chainData);

    const logger = _logger
      ? _logger.child({ name: "NxtpSdkPool" })
      : new Logger({ name: "NxtpSdkPool", level: nxtpConfig.logLevel });

    return this._instance || (this._instance = new NxtpSdkPool(nxtpConfig, logger, chainData));
  }

  // ------------------- Utils ------------------- //

  /**
   * Set to 1 hour from current time.
   *
   * @returns The default deadline, in unix time.
   */
  getDefaultDeadline(): number {
    const now = new Date();
    return now.setHours(now.getHours() + 1);
  }

  /**
   * Calculates the amount of tokens received on a swap.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param tokenIndexFrom - The index of the token to sell.
   * @param tokenIndexTo - The index of the token to buy.
   * @param amount - The number of tokens to sell, in the "From" token's native decimal precision.
   * @returns Minimum amount received, in the "To" token's native decimal precision.
   */
  async calculateSwap(
    domainId: string,
    tokenAddress: string,
    tokenIndexFrom: number,
    tokenIndexTo: number,
    amount: BigNumberish,
  ): Promise<BigNumber> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const minAmount = await connextContract.calculateSwap(key, tokenIndexFrom, tokenIndexTo, amount);

    return minAmount;
  }

  /**
   * Calculates the minimum LP token amount from deposits or withdrawals.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param amounts - The amounts of the tokens to deposit/withdraw, in the correct index order and
   * in each token's native precision.
   * @param isDeposit - (optional) Whether this is a deposit or withdrawal.
   * @returns Minimum LP tokens received, in 1e18 precision.
   */
  async calculateTokenAmount(
    domainId: string,
    tokenAddress: string,
    amounts: string[],
    isDeposit = true,
  ): Promise<BigNumber> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const amount = await connextContract.calculateSwapTokenAmount(key, amounts, isDeposit);

    return amount;
  }

  /**
   * Calculates the amounts of underlying tokens returned.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param amount - The amount of the LP token to burn on withdrawal.
   * @returns Array containing amount of each underlying token returned, in correct index order.
   */
  async calculateRemoveSwapLiquidity(domainId: string, tokenAddress: string, amount: string): Promise<BigNumber[]> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const amounts = await connextContract.calculateRemoveSwapLiquidity(key, amount);

    return amounts;
  }

  /**
   * Calculates the price impact depending on whether liquidity is being deposited or withdrawn.
   *
   * @param tokenInputAmount - The amount of inbound tokens (LP tokens for withdrawals, total tokens for deposits,
   * dx for swaps), in 1e18 precision.
   * @param tokenOutputAmount - The amount of outbound tokens (total tokens for withdrawals, LP tokens for deposits,
   * dy for swaps), in 1e18 precision.
   * @param virtualPrice - (optional) The current virtual price of the pool.
   * @param isDeposit - (optional) Whether this is a deposit or withdrawal.
   * @returns The price impact.
   */
  calculatePriceImpact(
    tokenInputAmount: BigNumber, // assumed to be 18d precision
    tokenOutputAmount: BigNumber,
    virtualPrice = BigNumber.from(10).pow(18),
    isDeposit = true,
  ): BigNumber {
    // We want to multiply the lpTokenAmount by virtual price
    // Deposits: (VP * output) / input - 1
    // Swaps: (1 * output) / input - 1
    // Withdraws: output / (input * VP) - 1
    if (tokenInputAmount.lte(0)) return constants.Zero;

    return isDeposit
      ? virtualPrice.mul(tokenOutputAmount).div(tokenInputAmount).sub(BigNumber.from(10).pow(18))
      : tokenOutputAmount
          .mul(BigNumber.from(10).pow(36))
          .div(tokenInputAmount.mul(virtualPrice))
          .sub(BigNumber.from(10).pow(18));
  }

  /**
   * Calculates the price impact of adding liquidity to a pool.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param amountX - The amount of token X (index 0 of the pool), in the token's native precision.
   * @param amountY - The amount of token Y (index 1 of the pool), in the token's native precision.
   * @returns Price impact for adding liquidity, in 1e18 precision.
   */
  async calculateAddLiquidityPriceImpact(
    domainId: string,
    tokenAddress: string,
    amountX: string,
    amountY: string,
  ): Promise<BigNumber | undefined> {
    const [virtualPrice, lpTokenAmount] = await Promise.all([
      this.getVirtualPrice(domainId, tokenAddress),
      this.calculateTokenAmount(domainId, tokenAddress, [amountX, amountY]),
    ]);

    // Normalize to 18 decimals
    const pool = await this.getPool(domainId, tokenAddress);
    if (pool) {
      let decimals = [pool.local.decimals, pool.adopted.decimals];
      decimals = pool.local.index == 0 ? decimals : decimals.reverse();
      const totalAmount = [amountX, amountY].reduce(
        (sum, amount, index) => sum.add(BigNumber.from(amount).mul(BigNumber.from(10).pow(18 - decimals[index]))),
        BigNumber.from("0"),
      );
      return this.calculatePriceImpact(totalAmount, lpTokenAmount, virtualPrice);
    }

    return;
  }

  /**
   * Returns the price impact of removing liquidity from a pool.
   *
   * @param domainId - The domain id of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param amountX - The amount of asset X (index 0 of the pool), in the token's native precision.
   * @param amountY - The amount of asset Y (index 1 of the pool), in the token's native precision.
   * @returns The price impact for removing liquidity, in 1e18 precision.
   */
  async calculateRemoveLiquidityPriceImpact(
    domainId: string,
    tokenAddress: string,
    amountX: string,
    amountY: string,
  ): Promise<BigNumber | undefined> {
    const [virtualPrice, lpTokenAmount] = await Promise.all([
      this.getVirtualPrice(domainId, tokenAddress),
      this.calculateTokenAmount(domainId, tokenAddress, [amountX, amountY], false),
    ]);

    // Normalize to 18 decimals
    const pool = await this.getPool(domainId, tokenAddress);
    if (pool) {
      let decimals = [pool.local.decimals, pool.adopted.decimals];
      decimals = pool.local.index == 0 ? decimals : decimals.reverse();
      const totalAmount = [amountX, amountY].reduce(
        (sum, amount, index) => sum.add(BigNumber.from(amount).mul(BigNumber.from(10).pow(18 - decimals[index]))),
        BigNumber.from("0"),
      );
      return this.calculatePriceImpact(lpTokenAmount, totalAmount, virtualPrice, false);
    }

    return;
  }

  /**
   * Calculates the price impact of a swap.
   *
   * @param domainId - The domain id of the pool.
   * @param amountX - The amount of tokens to swap, in the token's native precision.
   * @param tokenX - The address of the token to swap from.
   * @param tokenY - The address of the token to swap to.
   * @returns The price impact for swapping, in 1e18 precision.
   */
  async calculateSwapPriceImpact(
    domainId: string,
    amountX: string,
    tokenX: string,
    tokenY: string,
  ): Promise<BigNumber> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenX),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);

    const [tokenIndexFrom, tokenIndexTo] = await Promise.all([
      connextContract.getSwapTokenIndex(key, tokenX),
      connextContract.getSwapTokenIndex(key, tokenY),
    ]);

    const [tokenXContract, tokenYContract] = await Promise.all([
      this.getERC20(domainId, tokenX),
      this.getERC20(domainId, tokenY),
    ]);

    const [tokenXDecimals, tokenYDecimals] = await Promise.all([tokenXContract.decimals(), tokenYContract.decimals()]);

    const amountY = await connextContract.calculateSwap(key, tokenIndexFrom, tokenIndexTo, amountX);

    return this.calculatePriceImpact(
      BigNumber.from(amountX).mul(BigNumber.from(10).pow(18 - tokenXDecimals)),
      amountY.mul(BigNumber.from(10).pow(18 - tokenYDecimals)),
      BigNumber.from(10).pow(18),
      false,
    );
  }

  /**
   * Calculates the estimated amount received on the destination domain for a bridge transaction.
   *
   * @param originDomain - The domain id of the origin chain.
   * @param destinationDomain - The domain id of the destination chain.
   * @param originTokenAddress - The address of the token to be bridged from origin.
   * @param amount - The amount of the origin token to bridge, in the origin token's native decimal precision.
   * @param receiveLocal - (optional) Whether the desired destination token is the local asset ("nextAsset").
   * @returns Estimated amount received for local/adopted assets, if applicable, in their native decimal precisions.
   */
  async calculateAmountReceived(
    originDomain: string,
    destinationDomain: string,
    originTokenAddress: string,
    amount: BigNumberish,
    receiveLocal = false,
  ): Promise<{
    amountReceived: BigNumberish;
    originSlippage: BigNumberish;
    routerFee: BigNumberish;
    destinationSlippage: BigNumberish;
  }> {
    const { requestContext, methodContext } = createLoggingContext(this.calculateAmountReceived.name);

    const _originTokenAddress = utils.getAddress(originTokenAddress);

    this.logger.info("Method start", requestContext, methodContext, {
      originDomain,
      destinationDomain,
      _originTokenAddress,
      amount,
    });

    // Calculate origin swap
    const originPool = await this.getPool(originDomain, originTokenAddress);
    let originAmountReceived = amount;

    // Swap IFF supplied origin token is an adopted asset
    if (!(await this.isNextAsset(originTokenAddress)) && originPool) {
      originAmountReceived = await this.calculateSwap(
        originDomain,
        _originTokenAddress,
        originPool.adopted.index,
        originPool.local.index,
        amount,
      );
    }

    const originSlippage = BigNumber.from(amount).sub(originAmountReceived).mul(10000).div(amount);
    const feeBps = BigNumber.from(+DEFAULT_ROUTER_FEE * 100);
    const routerFee = BigNumber.from(originAmountReceived).mul(feeBps).div(10000);

    // Calculate destination swap
    const [canonicalDomain, canonicalId] = await this.getCanonicalTokenId(originDomain, originTokenAddress);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const destinationAssetData = await this.getAssetsDataByDomainAndKey(destinationDomain, key);
    if (!destinationAssetData) {
      throw new Error("Origin token cannot be bridged to any token on this destination domain");
    }

    const destinationPool = await this.getPool(destinationDomain, destinationAssetData.local);
    const destinationAmount = BigNumber.from(originAmountReceived).sub(routerFee);
    let destinationAmountReceived = destinationAmount;

    // Swap IFF desired destination token is an adopted asset
    if (!receiveLocal && destinationPool) {
      destinationAmountReceived = await this.calculateSwap(
        destinationDomain,
        destinationAssetData.local,
        destinationPool.local.index,
        destinationPool.adopted.index,
        destinationAmount,
      );
    }

    const destinationSlippage = BigNumber.from(
      destinationAmount.sub(destinationAmountReceived).mul(10000).div(destinationAmount),
    );

    return {
      amountReceived: destinationAmountReceived,
      originSlippage,
      routerFee,
      destinationSlippage,
    };
  }

  /**
   * Fetches the current price of a token.
   *
   * @param tokenSymbol - The symbol for the token.
   * @returns The price of the token.
   */
  async getTokenPrice(tokenSymbol: string) {
    const price = await this.priceFeed.getPriceByTokenSymbol(tokenSymbol);

    return price;
  }

  // ------------------- Read Operations ------------------- //

  /**
   * Reads the LP token address of a pool.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @returns The LP token address.
   */
  async getLPTokenAddress(domainId: string, tokenAddress: string): Promise<string> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const lpTokenAddress = await connextContract.getSwapLPToken(key);

    return lpTokenAddress;
  }

  /**
   * Reads the ERC20 token supply.
   *
   * @param domainId - The domain id of the ERC20 token.
   * @param tokenAddress - The address of the ERC20 token.
   * @returns The balance of the address.
   */
  async getTokenSupply(domainId: string, tokenAddress: string): Promise<BigNumber> {
    const erc20Contract = await this.getERC20(domainId, tokenAddress);
    const amount = erc20Contract.totalSupply();

    return amount;
  }

  /**
   * Reads the ERC20 token balance of an address.
   *
   * @param domainId - The domain id of the ERC20 token.
   * @param tokenAddress - The address of the ERC20 token.
   * @param userAddress - The address to get the balance of.
   * @returns The balance of the address.
   */
  async getTokenUserBalance(domainId: string, tokenAddress: string, userAddress: string): Promise<BigNumber> {
    const erc20Contract = await this.getERC20(domainId, tokenAddress);
    const balance = erc20Contract.balanceOf(userAddress);

    return balance;
  }

  /**
   * Reads the index of a token in a pool.
   *
   * @param domainId - The domain id of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param poolTokenAddress - The address of the token in the pool to get the index for.
   * @returns The index of the specified token in the pool.
   */
  async getPoolTokenIndex(domainId: string, tokenAddress: string, poolTokenAddress: string): Promise<number> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const index = await connextContract.getSwapTokenIndex(key, poolTokenAddress);

    return index;
  }

  /**
   * Reads the balance of a pool token.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param poolTokenAddress - The address of the pool token.
   * @returns The balance of the pool token.
   */
  async getPoolTokenBalance(domainId: string, tokenAddress: string, poolTokenAddress: string): Promise<BigNumber> {
    const [connextContract, index, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getPoolTokenIndex(domainId, tokenAddress, poolTokenAddress),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const balance = await connextContract.getSwapTokenBalance(key, index);

    return balance;
  }

  /**
   * Reads the token address of a specified index in a pool.
   *
   * @param domainId - The domain id of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param index - The index of the token in the pool.
   * @returns The address of the specified token in the pool.
   */
  async getPoolTokenAddress(domainId: string, tokenAddress: string, index: number) {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const poolTokenAddress = await connextContract.getSwapToken(key, index);

    return poolTokenAddress;
  }

  /**
   * Reads the virtual price of a pool.
   *
   * @param domainId - The domain id of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param index - The index of the token in the pool.
   * @returns The virtual price, scaled to the pool's decimal precision (10^18).
   */
  async getVirtualPrice(domainId: string, tokenAddress: string): Promise<BigNumber> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const price = await connextContract.getSwapVirtualPrice(key);

    return price;
  }

  /**
   * Reads the representation asset of the pool.
   *
   * @param domainId - The domain id of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @returns The representation asset - adopted if on the canonical domain, local (nextAsset) otherwise.
   */
  async getRepresentation(domainId: string, tokenAddress: string): Promise<string> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const representation = await connextContract["canonicalToRepresentation(bytes32)"](key);

    return representation;
  }

  /**
   * Reads the adopted asset of the pool.
   *
   * @param domainId - The domain id of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @returns The adopted asset.
   */
  async getAdopted(domainId: string, tokenAddress: string): Promise<string> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const adopted = await connextContract["canonicalToAdopted(bytes32)"](key);

    return adopted;
  }

  // ------------------- Pool Operations ------------------- //

  /**
   * Prepares the transaction request for adding liquidity to a pool.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param amounts - The amounts of the tokens to swap.
   * @param minToMint - (optional) The minimum acceptable amount of LP tokens to mint.
   * @param deadline - (optional) The deadline for the swap.
   * @returns providers.TransactionRequest object.
   */
  async addLiquidity(
    domainId: string,
    tokenAddress: string,
    amounts: string[],
    minToMint = "0",
    deadline = this.getDefaultDeadline(),
  ): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.addLiquidity.name);
    this.logger.info("Method start", requestContext, methodContext, { domainId, amounts, deadline });

    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const txRequest = await connextContract.populateTransaction.addSwapLiquidity(key, amounts, minToMint, deadline);

    this.logger.info(`${this.addLiquidity.name} transaction created `, requestContext, methodContext);

    return txRequest;
  }

  /**
   * Returns the transaction request for removing liquidity from a pool.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param amount - The amount of the token to swap.
   * @param minAmounts - (optional) The minimum acceptable amounts of each token to burn.
   * @param deadline - (optional) The deadline for the swap.
   * @returns providers.TransactionRequest object.
   */
  async removeLiquidity(
    domainId: string,
    tokenAddress: string,
    amount: string,
    minAmounts = ["0", "0"],
    deadline = this.getDefaultDeadline(),
  ): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.removeLiquidity.name);
    this.logger.info("Method start", requestContext, methodContext, { domainId, amount, deadline });

    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const txRequest = await connextContract.populateTransaction.removeSwapLiquidity(key, amount, minAmounts, deadline);

    this.logger.info(`${this.addLiquidity.name} transaction created `, requestContext, methodContext);

    return txRequest;
  }

  /**
   * Returns the transaction request for performing a swap in a pool.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param from - The address of the token to sell.
   * @param to - The address of the token to buy.
   * @param amount - The amount of the selling token to swap.
   * @param minDy - (optional) The minimum amount of the buying token to receive.
   * @param deadline - (optional) The deadline for the swap.
   * @returns providers.TransactionRequest object.
   */
  async swap(
    domainId: string,
    tokenAddress: string,
    from: string,
    to: string,
    amount: string,
    minDy = 0,
    deadline = this.getDefaultDeadline(),
  ): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.swap.name);
    this.logger.info("Method start", requestContext, methodContext, {
      domainId,
      tokenAddress,
      from,
      to,
      amount,
      deadline,
    });

    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const [connextContract, [canonicalDomain, canonicalId], tokenIndexFrom, tokenIndexTo] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
      this.getPoolTokenIndex(domainId, tokenAddress, from),
      this.getPoolTokenIndex(domainId, tokenAddress, to),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);

    const txRequest = await connextContract.populateTransaction.swap(
      key,
      tokenIndexFrom,
      tokenIndexTo,
      amount,
      minDy,
      deadline,
    );

    this.logger.info(`${this.swap.name} transaction created `, requestContext, methodContext);

    return txRequest;
  }

  // ------------------- Pool Data ------------------- //

  /**
   * Retrieves the StableSwap Pool details for a given asset.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @returns Pool object of which the token is an underlying asset.
   */
  getPool = memoize(
    async (domainId: string, tokenAddress: string): Promise<Pool | undefined> => {
      const { requestContext, methodContext } = createLoggingContext(this.getPool.name);
      this.logger.info("Method start", requestContext, methodContext, {
        domainId,
        tokenAddress,
      });

      const [canonicalDomain, canonicalId] = await this.getCanonicalTokenId(domainId, tokenAddress);

      if (canonicalDomain == domainId) {
        this.logger.debug(`No Pool; token ${tokenAddress} is canonical on domain ${domainId}`);
        return;
      }

      const key: string = this.calculateCanonicalKey(canonicalDomain, canonicalId);

      const [local, adopted, lpTokenAddress] = await Promise.all([
        this.getRepresentation(domainId, tokenAddress),
        this.getAdopted(domainId, tokenAddress),
        this.getLPTokenAddress(domainId, tokenAddress),
      ]);

      if (local == adopted) {
        this.logger.debug(`No Pool for token ${tokenAddress} on domain ${domainId}`);
        return;
      }

      const [localErc20Contract, adoptedErc20Contract] = await Promise.all([
        this.getERC20(domainId, local),
        this.getERC20(domainId, adopted),
      ]);

      const [
        adoptedName,
        adoptedSymbol,
        adoptedBalance,
        adoptedDecimals,
        adoptedIdx,
        localName,
        localSymbol,
        localBalance,
        localDecimals,
        localIdx,
      ] = await Promise.all([
        adoptedErc20Contract.name(),
        adoptedErc20Contract.symbol(),
        this.getPoolTokenBalance(domainId, adopted, adopted),
        adoptedErc20Contract.decimals(),
        this.getPoolTokenIndex(domainId, tokenAddress, adopted),
        localErc20Contract.name(),
        localErc20Contract.symbol(),
        this.getPoolTokenBalance(domainId, local, local),
        localErc20Contract.decimals(),
        this.getPoolTokenIndex(domainId, tokenAddress, local),
      ]);

      const localAsset: PoolAsset = {
        address: local,
        name: localName,
        symbol: localSymbol,
        decimals: localDecimals,
        index: localIdx,
        balance: localBalance,
      };

      const adoptedAsset: PoolAsset = {
        address: adopted,
        name: adoptedName,
        symbol: adoptedSymbol,
        decimals: adoptedDecimals,
        index: adoptedIdx,
        balance: adoptedBalance,
      };

      const pool: Pool = {
        domainId: domainId,
        name: `${localSymbol}-Pool`,
        symbol: `${localSymbol}-${localSymbol}`,
        local: localAsset,
        adopted: adoptedAsset,
        lpTokenAddress: lpTokenAddress,
        canonicalHash: key,
      };

      return pool;
    },
    { promise: true, maxAge: 5 * 60 * 1000 }, // 5 min
  );

  /**
   * Retrieves the Pools that a user has LP tokens for.
   *
   * @param domainId - The domain ID of the pool.
   * @param userAddress - The address of the user to get the pools for.
   * @returns Array of Pool objects.
   */
  async getUserPools(
    domainId: string,
    userAddress: string,
  ): Promise<{ info: Pool; lpTokenBalance: BigNumber; poolTokenBalances: BigNumber[] }[]> {
    const { requestContext, methodContext } = createLoggingContext(this.swap.name);
    this.logger.info("Method start", requestContext, methodContext, { domainId, userAddress });

    const result: { info: Pool; lpTokenBalance: BigNumber; poolTokenBalances: BigNumber[] }[] = [];

    const assetsData: AssetData[] = await this.getAssetsData();

    await Promise.all(
      Object.values(assetsData).map(async (data) => {
        if (data.domain === domainId) {
          const pool = await this.getPool(domainId, data.local);
          if (pool) {
            const lpTokenUserBalance = await this.getTokenUserBalance(domainId, pool.lpTokenAddress, userAddress);
            const adoptedTokenUserBalance = await this.getTokenUserBalance(domainId, pool.adopted.address, userAddress);
            const localTokenUserBalance = await this.getTokenUserBalance(domainId, pool.local.address, userAddress);
            result.push({
              info: pool,
              lpTokenBalance: lpTokenUserBalance,
              poolTokenBalances: [adoptedTokenUserBalance, localTokenUserBalance],
            });
          } else {
            this.logger.info("No pool for asset", requestContext, methodContext, { data });
          }
        }
      }),
    );

    return result;
  }

  /**
   * Calculates the fees, liquidity, and volume of a pool for the 24 hours prior to the specified unix time.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of the user to get the pools for.
   * @param unixTimestamp - The unix time to look back 24 hours from.
   * @returns Object containing fees, liquidity, and volume, formatted in the pool token's native decimal precision.
   */
  async getYieldStatsForDay(
    domainId: string,
    tokenAddress: string,
    unixTimestamp: number,
  ): Promise<
    | {
        totalFeesFormatted: number;
        totalLiquidityFormatted: number;
        totalVolume: BigNumber;
        totalVolumeFormatted: number;
      }
    | undefined
  > {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key: string = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const pool = await this.getPool(domainId, tokenAddress);

    if (pool) {
      const endTimestamp = unixTimestamp;
      const endBlock = await NxtpSdkShared.getBlockNumberFromUnixTimestamp(domainId, endTimestamp);

      const startTimestamp = endTimestamp - 86_400; // 24 hours prior
      let startBlock = await NxtpSdkShared.getBlockNumberFromUnixTimestamp(domainId, startTimestamp);

      const perBatch = 2000;
      let endBatchBlock = Math.min(startBlock + perBatch, endBlock);

      const tokenSwapEvents: any[] = [];
      while (startBlock < endBlock) {
        tokenSwapEvents.push(
          ...(await connextContract.queryFilter(
            connextContract.filters.TokenSwap(pool.canonicalHash),
            startBlock,
            endBatchBlock,
          )),
        );
        startBlock = endBatchBlock;
        endBatchBlock = Math.min(endBatchBlock + perBatch, endBlock);
      }

      const swapStorage = await connextContract.getSwapStorage(key);
      const basisPoints = swapStorage.swapFee;
      const FEE_DENOMINATOR = 1e10;
      const decimals = pool.local.decimals;

      let totalVolume = BigNumber.from(0);
      let totalFees = BigNumber.from(0);
      for (const event of tokenSwapEvents) {
        const tokensSold: BigNumber = event.args.tokensSold;
        totalFees = totalFees.add(tokensSold.mul(BigNumber.from(basisPoints)).div(BigNumber.from(FEE_DENOMINATOR)));
        totalVolume = totalVolume.add(tokensSold);
      }

      const reserve0 = pool.local.balance;
      const reserve1 = pool.adopted.balance;
      const totalLiquidity = reserve0.add(reserve1);
      const totalLiquidityFormatted = Number(utils.formatUnits(totalLiquidity, decimals));
      const totalFeesFormatted = Number(utils.formatUnits(totalFees, decimals));
      const totalVolumeFormatted = Number(utils.formatUnits(totalVolume, decimals));

      return {
        totalFeesFormatted,
        totalLiquidityFormatted,
        totalVolume,
        totalVolumeFormatted,
      };
    }

    return;
  }

  /**
   * Calculates apr and apy.
   *
   * @param feesEarned - The total fees earned in the period.
   * @param principal - The principal amount at the start of the period.
   * @param days - The number of days to look back.
   * @returns Object containing apr and apy.
   */
  calculateYield(
    feesEarned: number,
    principal: number,
    days: number,
  ): {
    apr: number;
    apy: number;
  } {
    const rate = feesEarned / principal;
    const period = 365 / days;
    const apr = rate * period;
    const apy = (1 + rate) ** period - 1;
    return { apr, apy };
  }

  /**
   * Calculates the apr, apy, and volume of a pool for the last specified number of days.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of the user to get the pools for.
   * @param days - (optional) The number of days to look back.
   * @returns Object containing apr, apy, and volume formatted in the pool token's native decimal precision.
   */
  getYieldData = memoize(
    async (
      domainId: string,
      tokenAddress: string,
      days: number = 1,
    ): Promise<
      | {
          apr: number;
          apy: number;
          volume: BigNumber;
          volumeFormatted: number;
        }
      | undefined
    > => {
      const provider = this.getProvider(domainId);
      const block = await provider.getBlock("latest");
      const endTimestamp = block.timestamp;

      const yieldStats = await this.getYieldStatsForDay(domainId, tokenAddress, endTimestamp);

      if (yieldStats) {
        const {
          totalFeesFormatted: feesEarnedToday,
          totalLiquidityFormatted: totalLiquidityToday,
          totalVolume,
          totalVolumeFormatted,
        } = yieldStats;

        const { apr, apy } = this.calculateYield(feesEarnedToday, totalLiquidityToday, days);

        return {
          apr: Math.max(apr, 0),
          apy: Math.max(apy, 0),
          volume: totalVolume,
          volumeFormatted: totalVolumeFormatted,
        };
      }

      return;
    },
    { promise: true, maxAge: 5 * 60 * 1000 }, // 5 min
  );

  /**
   * Calculates the apr, apy, and volume of a pool for the last specified number of days.
   *
   * @param totalTokens - The number of reward tokens to be distributed.
   * @param totalBlocks - The total number of blocks to distribute over.
   * @param numPools - The number of pools in the domain for distribution.
   * @param tokenSymbol - The token symbol for price data.
   * @param poolTVL - The current pool TVL.
   * @returns The apr calculated from inputs.
   */
  getLiquidityMiningAprPerPool = memoize(
    async (totalTokens: number, totalBlocks: number, numPools: number, tokenSymbol: string, poolTVL: number) => {
      // Numbers for Optimism:
      //  totalTokens = 250_000
      //  totalBlocks = 657_436 // 3 months
      //  numPools = 2
      const blocksPerDay = 7160;
      const period = 365 / (totalBlocks / blocksPerDay);
      const tokenPrice = await this.getTokenPrice(tokenSymbol);
      const tokenValuePerPool = (totalTokens / numPools) * tokenPrice;
      const rate = tokenValuePerPool / poolTVL;
      const apr = rate * period;

      return apr;
    },
    { promise: true },
  );
}
