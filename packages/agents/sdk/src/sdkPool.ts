/* eslint-disable @typescript-eslint/no-inferrable-types */
import { providers, BigNumber, BigNumberish, constants, utils } from "ethers";
import { getChainData, Logger, createLoggingContext, ChainData, DEFAULT_ROUTER_FEE } from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";
import memoize from "memoizee";

import { NxtpSdkConfig, getConfig } from "./config";
import { SignerAddressMissing, ChainDataUndefined } from "./lib/errors";
import { Pool, PoolAsset, AssetData, AssetType } from "./interfaces";
import { PriceFeed } from "./lib/priceFeed";
import { NxtpSdkShared } from "./sdkShared";

/**
 * @classdesc SDK class encapsulating stableswap pool functions.
 * @dev This class will either interact with internal StableSwapFacet pools or external StableSwap pools
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
   * Returns the default deadline. Set to 1 hour from current time.
   */
  getDefaultDeadline(): number {
    const now = new Date();
    return now.setHours(now.getHours() + 1);
  }

  /**
   * Returns the amount of tokens received on a swap.
   * @param domainId The domain id of the pool.
   * @param tokenAddress The address of local or adopted token.
   * @param tokenIndexFrom The index of the token to sell.
   * @param tokenIndexTo The index of the token to buy.
   * @param amount The number of tokens to sell, in the "From" token's native precision.
   * @returns Minimum amount received, in the "To" token's native precision.
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
   * Returns the minimum LP token amount from deposits or withdrawals.
   * @param domainId The domain id of the pool.
   * @param tokenAddress The address of local or adopted token.
   * @param amounts The amounts of the tokens to deposit/withdraw.
   * @param isDeposit Whether this is a deposit or withdrawal.
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
   * Returns the minimum LP token amount from deposits or withdrawals.
   * @param domainId The domain id of the pool.
   * @param tokenAddress The address of local or adopted token.
   * @param amount The amount of the LP token to burn on withdrawal.
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
   * Returns the price impact depending on whether liquidity is being deposited or withdrawn.
   * @param tokenInputAmount The amount of inbound tokens (LP tokens for withdrawals, total tokens for deposits, dx for swaps).
   * @param tokenOutputAmount The amount of outbound tokens (total tokens for withdrawals, LP tokens for deposits, dy for swaps).
   * @param virtualPrice The current virtual price of the pool.
   * @param isDeposit Whether this is a deposit or withdrawal.
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
   * Returns the price impact of adding liquidity to a pool.
   * @param domainId The domain id of the pool.
   * @param tokenAddress The address of local or adopted token.
   * @param amountX The amount of asset X.
   * @param amountY The amount of asset Y.
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

    let totalAmount = BigNumber.from(amountX).add(BigNumber.from(amountY));

    // Normalize to 18 decimals
    const pool = await this.getPool(domainId, tokenAddress);
    if (pool) {
      const decimals = pool.assets.get(AssetType.LOCAL)!.decimals;
      totalAmount = totalAmount.mul(BigNumber.from(10).pow(18 - decimals));
      return this.calculatePriceImpact(totalAmount, lpTokenAmount, virtualPrice);
    }

    return;
  }

  /**
   * Returns the price impact of removing liquidity from a pool.
   * @param domainId The domain id of the pool.
   * @param tokenAddress The address of local or adopted token.
   * @param amountX The amount of asset X.
   * @param amountY The amount of asset Y.
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

    let totalAmount = BigNumber.from(amountX).add(BigNumber.from(amountY));

    // Normalize to 18 decimals
    const pool = await this.getPool(domainId, tokenAddress);
    if (pool) {
      const decimals = pool.assets.get(AssetType.LOCAL)!.decimals;
      totalAmount = totalAmount.mul(BigNumber.from(10).pow(18 - decimals));
      return this.calculatePriceImpact(lpTokenAmount, totalAmount, virtualPrice, false);
    }

    return;
  }

  /**
   * Returns the price impact of a swap.
   * @param domainId The domain id of the pool.
   * @param amountX The amount of tokens to swap.
   * @param tokenX The address of the token to swap from.
   * @param tokenY The address of the token to swap to.
   */
  async calculateSwapPriceImpact(
    domainId: string,
    amountX: string,
    tokenX: string,
    tokenY: string,
  ): Promise<BigNumber> {
    const [connextContract, [canonicalDomain, canonicalId], tokenIndexFrom, tokenIndexTo] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenX),
      this.getPoolTokenIndex(domainId, tokenX, tokenX),
      this.getPoolTokenIndex(domainId, tokenX, tokenY),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const amountXNoSlippage = BigNumber.from(1000);

    const amountY = await connextContract.calculateSwap(key, tokenIndexFrom, tokenIndexTo, amountX);
    const amountYNoSlippage = await connextContract.calculateSwap(key, tokenIndexFrom, tokenIndexTo, amountXNoSlippage);

    const rate = BigNumber.from(amountY).mul(BigNumber.from(10).pow(18)).div(amountX);
    const marketRate = BigNumber.from(amountYNoSlippage).mul(BigNumber.from(10).pow(18)).div(amountXNoSlippage);

    return this.calculatePriceImpact(rate, marketRate);
  }

  /**
   * Calculates the estimated amount received on the destination domain for a bridge transaction.
   * @param originDomain The domain id of the origin chain.
   * @param destinationDomain The domain id of the destination chain.
   * @param originTokenAddress The address of the token to be bridged from origin.
   * @param amount The amount of the origin token to bridge, in the origin token's native precision.
   * @param receiveLocal Whether the desired destination token is the local asset ("nextAsset").
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
        originPool.assets.get(AssetType.ADOPTED)!.index,
        originPool.assets.get(AssetType.LOCAL)!.index,
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
        destinationPool.assets.get(AssetType.LOCAL)!.index,
        destinationPool.assets.get(AssetType.ADOPTED)!.index,
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
   * @param tokenSymbol The symbol for the token.
   */
  async getTokenPrice(tokenSymbol: string) {
    const price = await this.priceFeed.getPriceByTokenSymbol(tokenSymbol);

    return price;
  }

  // ------------------- Read Operations ------------------- //

  async getLPTokenAddress(domainId: string, tokenAddress: string): Promise<string> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const lpTokenAddress = await connextContract.getSwapLPToken(key);

    return lpTokenAddress;
  }

  async getLPTokenSupply(domainId: string, lpTokenAddress: string): Promise<BigNumber> {
    const erc20Contract = await this.getERC20(domainId, lpTokenAddress);
    const amount = erc20Contract.totalSupply();

    return amount;
  }

  async getTokenUserBalance(domainId: string, tokenAddress: string, userAddress: string): Promise<BigNumber> {
    const erc20Contract = await this.getERC20(domainId, tokenAddress);
    const balance = erc20Contract.balanceOf(userAddress);

    return balance;
  }

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
   * Returns the balances of the tokens in a pool.
   * @param domainId The domain id of the pool.
   * @param tokenAddress The address of local or adopted token.
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

  async getPoolTokenAddress(domainId: string, tokenAddress: string, index: number) {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const poolTokenAddress = await connextContract.getSwapToken(key, index);

    return poolTokenAddress;
  }

  async getVirtualPrice(domainId: string, tokenAddress: string): Promise<BigNumber> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const price = await connextContract.getSwapVirtualPrice(key);

    return price;
  }

  async getRepresentation(domainId: string, tokenAddress: string): Promise<string> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const representation = await connextContract["canonicalToRepresentation(bytes32)"](key);

    return representation;
  }

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
   * Returns the transaction request for adding liquidity to a pool.
   * @param domainId The domain id of the pool.
   * @param tokenAddress The address of local or adopted token.
   * @param amounts The amounts of the tokens to swap.
   * @param minToMint The minimum acceptable amount of LP tokens to mint.
   * @param deadline The deadline for the swap.
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
   * @param domainId The domain id of the pool.
   * @param tokenAddress The address of local or adopted token.
   * @param amount The amount of the token to swap.
   * @param minAmounts The minimum acceptable amounts of each token to burn.
   * @param deadline The deadline for the swap.
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
   * @param domainId The domain id of the pool.
   * @param tokenAddress The address of local or adopted token.
   * @param from The address of the token to sell.
   * @param to The address of the token to buy.
   * @param amount The amount of the selling token to swap.
   * @param minDy The minimum amount of the buying token to receive.
   * @param deadline The deadline for the swap.
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
   * Returns the StableSwap Pool details for a given asset.
   * @param domainId The domain id of the pool.
   * @param tokenAddress The address of local or adopted token.
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

      const assets = new Map<AssetType, PoolAsset>();
      assets.set(AssetType.LOCAL, localAsset);
      assets.set(AssetType.ADOPTED, adoptedAsset);

      const pool: Pool = {
        domainId: domainId,
        name: `${localSymbol}-Pool`,
        symbol: `${localSymbol}-next${localSymbol}`,
        assets: assets,
        lpTokenAddress: lpTokenAddress,
        canonicalHash: key,
      };

      return pool;
    },
    { promise: true, maxAge: 5 * 60 * 1000 }, // 5 min
  );

  /**
   * Returns the Pools that a user has LP tokens for.
   * @param domainId The domain id of the pool.
   * @param userAddress The address of the user to get the pools for.
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
            const adoptedTokenUserBalance = await this.getTokenUserBalance(
              domainId,
              pool.assets.get(AssetType.ADOPTED)!.address,
              userAddress,
            );
            const localTokenUserBalance = await this.getTokenUserBalance(
              domainId,
              pool.assets.get(AssetType.LOCAL)!.address,
              userAddress,
            );
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
      const decimals = pool.assets.get(AssetType.LOCAL)!.decimals;

      let totalVolume = BigNumber.from(0);
      let totalFees = BigNumber.from(0);
      for (const event of tokenSwapEvents) {
        const tokensSold: BigNumber = event.args.tokensSold;
        totalFees = totalFees.add(tokensSold.mul(BigNumber.from(basisPoints)).div(BigNumber.from(FEE_DENOMINATOR)));
        totalVolume = totalVolume.add(tokensSold);
      }

      const reserve0 = pool.assets.get(AssetType.LOCAL)!.balance;
      const reserve1 = pool.assets.get(AssetType.ADOPTED)!.balance;
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
