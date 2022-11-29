import { providers, BigNumber, constants, utils } from "ethers";
import { getChainData, Logger, createLoggingContext, ChainData, getCanonicalHash } from "@connext/nxtp-utils";
import { getContractInterfaces, contractDeployments, ChainReader } from "@connext/nxtp-txservice";
import { Connext, Connext__factory, IERC20, IERC20__factory } from "@connext/nxtp-contracts";
import BlockDater from "ethereum-block-by-date";

import { NxtpSdkConfig, getConfig, AssetDescription } from "./config";
import { SignerAddressMissing, ContractAddressMissing, ChainDataUndefined, PoolDoesNotExist } from "./lib/errors";
import { IPoolStats, IPoolData } from "./interfaces";
import { PriceFeed } from "./lib/priceFeed";

export class Pool implements IPoolData {
  domainId: string;
  name: string;
  symbol: string; // in the form of <TKN>-next<TKN>
  tokens: string[]; // index order specified when the pool was initialized
  decimals: number[];
  balances: BigNumber[];
  lpTokenAddress: string;
  canonicalHash: string; // hash of the domain and canonicalId
  address?: string; // no address if internal pool

  constructor(
    domainId: string,
    name: string,
    symbol: string,
    tokens: string[],
    decimals: number[],
    balances: BigNumber[],
    lpTokenAddress: string,
    canonicalHash: string,
    address?: string,
  ) {
    this.domainId = domainId;
    this.name = name;
    this.symbol = symbol;
    this.tokens = tokens;
    this.decimals = decimals;
    this.balances = balances;
    this.lpTokenAddress = lpTokenAddress;
    this.canonicalHash = canonicalHash;
    this.address = address;
  }

  async getLiquidity(): Promise<string> {
    // TODO: get this from cartographer
    return "100";
  }

  async getVolume(): Promise<string> {
    // TODO: get this from cartographer
    return "100";
  }

  async getFees(): Promise<string> {
    // TODO: get this from cartographer
    return "100";
  }

  async getApy(): Promise<{ week: string; month: string; year: string; total: string }> {
    // TODO: get this from cartographer
    return {
      week: "100",
      month: "100",
      year: "100",
      total: "100",
    };
  }
}

/**
 * @classdesc Lightweight class to facilitate interaction with StableSwap Pools.
 * @dev This class will either interact with internal StableSwapFacet pools or external StableSwap pools
 *      depending on which type of pool is being used for each asset.
 *      Note: SDK currently only supports internal StableSwapFacet pools.
 *
 */
export class NxtpSdkPool {
  public readonly config: NxtpSdkConfig;
  public readonly chainData: Map<string, ChainData>;
  public readonly connext: Connext["interface"];
  public readonly erc20: IERC20["interface"];

  private readonly logger: Logger;
  private readonly chainReader: ChainReader;
  private readonly priceFeed: PriceFeed;

  private pools = new Map<string, Pool>();

  constructor(config: NxtpSdkConfig, logger: Logger, chainData: Map<string, ChainData>, chainReader: ChainReader) {
    this.config = config;
    this.logger = logger;
    this.chainData = chainData;
    this.chainReader = chainReader;
    this.connext = getContractInterfaces().connext;
    this.erc20 = getContractInterfaces().erc20;
    this.priceFeed = new PriceFeed();
  }

  static async create(
    _config: NxtpSdkConfig,
    _logger?: Logger,
    _chainData?: Map<string, ChainData>,
    _chainReader?: ChainReader,
  ): Promise<NxtpSdkPool> {
    const chainData = _chainData ?? (await getChainData());
    if (!chainData) {
      throw new ChainDataUndefined();
    }

    const nxtpConfig = await getConfig(_config, contractDeployments, chainData);

    const logger = _logger
      ? _logger.child({ name: "NxtpSdkPool" })
      : new Logger({ name: "NxtpSdkPool", level: nxtpConfig.logLevel });

    const chainReader =
      _chainReader ?? new ChainReader(logger.child({ module: "ChainReader" }, nxtpConfig.logLevel), nxtpConfig.chains);

    return new NxtpSdkPool(nxtpConfig, logger, chainData, chainReader);
  }

  // ------------------- Utils ------------------- //

  async getConnext(domainId: string): Promise<Connext> {
    const connextAddress = this.config.chains[domainId]?.deployments?.connext;
    if (!connextAddress) {
      throw new ContractAddressMissing();
    }

    const provider = new providers.JsonRpcProvider(this.config.chains[domainId].providers[0]);
    return Connext__factory.connect(connextAddress, provider);
  }

  async getERC20(domainId: string, tokenAddress: string): Promise<IERC20> {
    const provider = new providers.JsonRpcProvider(this.config.chains[domainId].providers[0]);
    return IERC20__factory.connect(tokenAddress, provider);
  }

  async getBlockNumberFromDate(domainId: string, date: Date): Promise<number> {
    const provider = new providers.JsonRpcProvider(this.config.chains[domainId].providers[0]);
    const blockDater = new BlockDater(provider);

    const closestBlock = await blockDater.getDate(date);

    if (!closestBlock) {
      throw new Error("Could not retrieve block number");
    }
    return closestBlock.block;
  }

  /**
   * Returns the default deadline. Set to 1 hour from current time.
   */
  getDefaultDeadline(): number {
    const now = new Date();
    return now.setHours(now.getHours() + 1);
  }

  /**
   * Returns the hash of the canonical id + domain. Used in various pool operations.
   * @param domainId The canonical domain id of the token.
   * @param tokenAddress The address of the canonical token.
   */
  async calculateCanonicalKey(domainId: string, tokenId: string): Promise<string> {
    return getCanonicalHash(domainId, tokenId);
  }

  /**
   * Returns the amount of tokens received on a swap.
   * @param domainId The domain id of the pool.
   * @param tokenAddress The address of local or adopted token.
   * @param tokenIndexFrom The index of the token to sell.
   * @param tokenIndexTo The index of the token to buy.
   * @param amount The number of tokens to sell.
   */
  async calculateSwap(
    domainId: string,
    tokenAddress: string,
    tokenIndexFrom: number,
    tokenIndexTo: number,
    amount: string,
  ): Promise<BigNumber> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = getCanonicalHash(canonicalDomain, canonicalId);
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
    const key = getCanonicalHash(canonicalDomain, canonicalId);
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
    const key = getCanonicalHash(canonicalDomain, canonicalId);
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
  ): Promise<BigNumber> {
    const [virtualPrice, lpTokenAmount] = await Promise.all([
      this.getVirtualPrice(domainId, tokenAddress),
      this.calculateTokenAmount(domainId, tokenAddress, [amountX, amountY]),
    ]);

    let totalAmount = BigNumber.from(amountX).add(BigNumber.from(amountY));

    // Normalize to 18 decimals
    const pool = await this.getPool(domainId, tokenAddress);
    const decimals = pool.decimals[0];
    totalAmount = totalAmount.mul(BigNumber.from(10).pow(18 - decimals));

    return this.calculatePriceImpact(totalAmount, lpTokenAmount, virtualPrice);
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
  ): Promise<BigNumber> {
    const [virtualPrice, lpTokenAmount] = await Promise.all([
      this.getVirtualPrice(domainId, tokenAddress),
      this.calculateTokenAmount(domainId, tokenAddress, [amountX, amountY], false),
    ]);

    let totalAmount = BigNumber.from(amountX).add(BigNumber.from(amountY));

    // Normalize to 18 decimals
    const pool = await this.getPool(domainId, tokenAddress);
    const decimals = pool.decimals[0];
    totalAmount = totalAmount.mul(BigNumber.from(10).pow(18 - decimals));

    return this.calculatePriceImpact(lpTokenAmount, totalAmount, virtualPrice, false);
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
    const key = getCanonicalHash(canonicalDomain, canonicalId);
    const amountXNoSlippage = BigNumber.from(1000);

    const amountY = await connextContract.calculateSwap(key, tokenIndexFrom, tokenIndexTo, amountX);
    const amountYNoSlippage = await connextContract.calculateSwap(key, tokenIndexFrom, tokenIndexTo, amountXNoSlippage);

    const rate = BigNumber.from(amountY).mul(BigNumber.from(10).pow(18)).div(amountX);
    const marketRate = BigNumber.from(amountYNoSlippage).mul(BigNumber.from(10).pow(18)).div(amountXNoSlippage);

    return this.calculatePriceImpact(rate, marketRate);
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

  async getCanonicalTokenId(domainId: string, tokenAddress: string): Promise<[string, string]> {
    const connextContract = await this.getConnext(domainId);
    const tokenId = await connextContract.getTokenId(tokenAddress);

    return [tokenId.domain.toString(), tokenId.id];
  }

  async getLPTokenAddress(domainId: string, tokenAddress: string): Promise<string> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = getCanonicalHash(canonicalDomain, canonicalId);
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
    const key = getCanonicalHash(canonicalDomain, canonicalId);
    const index = await connextContract.getSwapTokenIndex(key, poolTokenAddress);

    return index;
  }

  async getPoolTokenBalance(domainId: string, tokenAddress: string, poolTokenAddress: string): Promise<BigNumber> {
    const [connextContract, index, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getPoolTokenIndex(domainId, tokenAddress, poolTokenAddress),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = getCanonicalHash(canonicalDomain, canonicalId);
    const balance = await connextContract.getSwapTokenBalance(key, index);

    return balance;
  }

  async getPoolTokenAddress(domainId: string, tokenAddress: string, index: number) {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = getCanonicalHash(canonicalDomain, canonicalId);
    const poolTokenAddress = await connextContract.getSwapToken(key, index);

    return poolTokenAddress;
  }

  async getVirtualPrice(domainId: string, tokenAddress: string): Promise<BigNumber> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = getCanonicalHash(canonicalDomain, canonicalId);
    const price = await connextContract.getSwapVirtualPrice(key);

    return price;
  }

  async canonicalToRepresentation(domainId: string, tokenAddress: string): Promise<string> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = getCanonicalHash(canonicalDomain, canonicalId);
    const representation = await connextContract["canonicalToRepresentation(bytes32)"](key);

    return representation;
  }

  async canonicalToAdopted(domainId: string, tokenAddress: string): Promise<string> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key = getCanonicalHash(canonicalDomain, canonicalId);
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
    const key = getCanonicalHash(canonicalDomain, canonicalId);
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
    const key = getCanonicalHash(canonicalDomain, canonicalId);
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
    const key = getCanonicalHash(canonicalDomain, canonicalId);

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
   * Returns the StableSwap Pool for a given local asset.
   * @param domainId The domain id of the pool.
   * @param tokenAddress The address of local or adopted token.
   */
  async getPool(domainId: string, tokenAddress: string): Promise<Pool> {
    const [canonicalDomain, canonicalId] = await this.getCanonicalTokenId(domainId, tokenAddress);

    if (canonicalDomain == domainId) {
      throw new PoolDoesNotExist(domainId, tokenAddress);
    }

    const key: string = getCanonicalHash(canonicalDomain, canonicalId);

    let pool = this.pools.get(key);
    if (pool) {
      return pool;
    }

    const [local, adopted, lpTokenAddress] = await Promise.all([
      this.canonicalToRepresentation(domainId, tokenAddress),
      this.canonicalToAdopted(domainId, tokenAddress),
      this.getLPTokenAddress(domainId, tokenAddress),
    ]);

    if (local == adopted) {
      throw new PoolDoesNotExist(domainId, tokenAddress);
    }

    const [localErc20Contract, adoptedErc20Contract] = await Promise.all([
      this.getERC20(domainId, local),
      this.getERC20(domainId, adopted),
    ]);

    const [adoptedDecimals, adoptedBalance, tokenSymbol, localDecimals, localBalance] = await Promise.all([
      adoptedErc20Contract.decimals(),
      this.getPoolTokenBalance(domainId, adopted, adopted),
      adoptedErc20Contract.symbol(),
      localErc20Contract.decimals(),
      this.getPoolTokenBalance(domainId, local, local),
    ]);

    // TODO: return pool with same index order as on-chain

    pool = new Pool(
      domainId,
      `${tokenSymbol}-Pool`,
      `${tokenSymbol}-next${tokenSymbol}`,
      [adopted, local],
      [adoptedDecimals, localDecimals],
      [adoptedBalance, localBalance],
      lpTokenAddress,
      key,
    );
    this.pools.set(key, pool);

    return pool;
  }

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

    await Promise.all(
      Object.values(this.config.chains[domainId].assets).map(async (asset: AssetDescription) => {
        let pool;
        try {
          pool = await this.getPool(domainId, asset.address);
        } catch (e: any) {
          this.logger.info("No pool for asset", requestContext, methodContext, { asset });
        }

        if (pool) {
          const lpTokenUserBalance = await this.getTokenUserBalance(domainId, pool.lpTokenAddress, userAddress);
          const adoptedTokenUserBalance = await this.getTokenUserBalance(domainId, pool.tokens[0], userAddress);
          const localTokenUserBalance = await this.getTokenUserBalance(domainId, pool.tokens[1], userAddress);
          result.push({
            info: pool,
            lpTokenBalance: lpTokenUserBalance,
            poolTokenBalances: [adoptedTokenUserBalance, localTokenUserBalance],
          });
        }
      }),
    );

    return result;
  }

  async getPoolStats(domainId: string, tokenAddress: string): Promise<IPoolStats> {
    const pool = await this.getPool(domainId, tokenAddress);

    const stats: IPoolStats = {
      liquidity: await pool.getLiquidity(),
      volume: await pool.getVolume(),
      fees: await pool.getFees(),
      apy: await pool.getApy(),
    };

    return stats;
  }

  async getYieldStatsForDay(
    domainId: string,
    tokenAddress: string,
    unixTimestamp: number,
  ): Promise<{
    totalFeesFormatted: number;
    totalLiquidityFormatted: number;
    totalVolume: BigNumber;
    totalVolumeFormatted: number;
  }> {
    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);
    const key: string = getCanonicalHash(canonicalDomain, canonicalId);
    const pool = await this.getPool(domainId, tokenAddress);

    const endDate = new Date(unixTimestamp * 1000);
    const endBlock = await this.getBlockNumberFromDate(domainId, endDate);
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 1);
    let startBlock = await this.getBlockNumberFromDate(domainId, startDate);

    const perBatch = 1000;
    let endBatchBlock = Math.min(startBlock + perBatch, endBlock);

    const tokenSwapEvents: any[] = [];
    while (startBlock < endBlock) {
      tokenSwapEvents.push(
        ...(await connextContract.queryFilter(connextContract.filters.TokenSwap(), startBlock, endBatchBlock)),
      );

      startBlock = endBatchBlock;
      endBatchBlock = Math.min(endBatchBlock + perBatch, endBlock);
    }

    const swapStorage = await connextContract.getSwapStorage(key);
    const basisPoints = swapStorage.swapFee;
    const FEE_DENOMINATOR = "10000000000"; // 10**10
    const decimals = pool.decimals[0];

    let totalVolume = BigNumber.from(0);
    let totalFees = BigNumber.from(0);
    for (const event of tokenSwapEvents) {
      const tokensSold: BigNumber = event.args.tokensSold;
      totalFees = totalFees.add(tokensSold.mul(BigNumber.from(basisPoints)).div(BigNumber.from(FEE_DENOMINATOR)));

      totalVolume = totalVolume.add(tokensSold);
    }

    const reserveX = pool.balances[0];
    const reserveY = pool.balances[1];
    const totalLiquidity = reserveX.add(reserveY);
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

  calculateYield(
    feesEarned: number,
    feesEarnedAgo: number,
    principal: number,
    days: number,
  ): {
    apr: number;
    apy: number;
  } {
    const rate = (feesEarned - feesEarnedAgo) / principal;
    const period = 365 / days;
    const apr = rate * period;
    const apy = (1 + rate) ** period - 1;
    return { apr, apy };
  }

  async getYieldData(
    domainId: string,
    tokenAddress: string,
    days = 1,
  ): Promise<{
    apr: number;
    apy: number;
    volume: BigNumber;
    volumeFormatted: number;
  }> {
    const provider = new providers.JsonRpcProvider(this.config.chains[domainId].providers[0]);
    const block = await provider.getBlock("latest");
    const endTimestamp = block.timestamp;
    const endDate = new Date(endTimestamp * 1000);
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    const startTimestamp = Math.floor(startDate.getTime() / 1000);

    const {
      totalFeesFormatted: feesEarnedToday,
      totalLiquidityFormatted: totalLiquidityToday,
      totalVolume,
      totalVolumeFormatted,
    } = await this.getYieldStatsForDay(domainId, tokenAddress, endTimestamp);

    let feesEarnedDaysAgo = 0;
    if (days > 1) {
      ({ totalFeesFormatted: feesEarnedDaysAgo } = await this.getYieldStatsForDay(
        domainId,
        tokenAddress,
        startTimestamp,
      ));
    }

    const { apr, apy } = this.calculateYield(feesEarnedToday, feesEarnedDaysAgo, totalLiquidityToday, days);

    return {
      apr: Math.max(apr, 0),
      apy: Math.max(apy, 0),
      volume: totalVolume,
      volumeFormatted: totalVolumeFormatted,
    };
  }

  async getLiquidityMiningAprPerPool(
    totalTokens: number,
    totalBlocks: number,
    numPools: number,
    tokenSymbol: string,
    poolTVL: number,
  ) {
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
  }
}
