import { providers, BigNumber, constants } from "ethers";
import { getChainData, Logger, createLoggingContext, ChainData, getCanonicalHash } from "@connext/nxtp-utils";
import { getContractInterfaces, contractDeployments, ChainReader } from "@connext/nxtp-txservice";
import { Connext as TConnext, IERC20 } from "@connext/nxtp-contracts";

import { NxtpSdkConfig, getConfig, AssetDescription } from "./config";
import { SignerAddressMissing, ContractAddressMissing, ChainDataUndefined, PoolDoesNotExist } from "./lib/errors";
import { IPoolStats, IPoolData } from "./interfaces";

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
  public readonly connext: TConnext["interface"];
  public readonly erc20: IERC20["interface"];

  private readonly logger: Logger;
  private readonly chainReader: ChainReader;

  private pools = new Map<string, Pool>();

  constructor(config: NxtpSdkConfig, logger: Logger, chainData: Map<string, ChainData>, chainReader: ChainReader) {
    this.config = config;
    this.logger = logger;
    this.chainData = chainData;
    this.chainReader = chainReader;
    this.connext = getContractInterfaces().connext;
    this.erc20 = getContractInterfaces().erc20;
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

  /**
   * Returns the default deadline. Set to 1 hour from current time.
   */
  getDefaultDeadline(): number {
    const now = new Date();
    return now.setHours(now.getHours() + 1);
  }

  /**
   * Returns the hash of the canonical id + domain. Used in various pool operations.
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
  ): Promise<number> {
    const connextContract = this.config.chains[domainId].deployments!.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const [canonicalDomain, canonicalId] = await this.getCanonicalToken(domainId, tokenAddress);
    const key = getCanonicalHash(canonicalDomain, canonicalId);

    const encoded = this.connext.encodeFunctionData("calculateSwap", [key, tokenIndexFrom, tokenIndexTo, amount]);
    const result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: encoded,
    });
    const [minAmount] = this.connext.decodeFunctionResult("calculateSwap", result);

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
    const connextContract = this.config.chains[domainId]?.deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const [canonicalDomain, canonicalId] = await this.getCanonicalToken(domainId, tokenAddress);
    const key = getCanonicalHash(canonicalDomain, canonicalId);

    const data = this.connext.encodeFunctionData("calculateSwapTokenAmount", [key, amounts, isDeposit]);
    const encoded = await this.chainReader.readTx({
      to: connextContract,
      data: data,
      chainId: Number(domainId),
    });
    const [amount] = this.connext.decodeFunctionResult("calculateSwapTokenAmount", encoded);

    return amount;
  }

  /**
   * Returns the minimum LP token amount from deposits or withdrawals.
   * @param domainId The domain id of the pool.
   * @param tokenAddress The address of local or adopted token.
   * @param amount The amount of the LP token to burn on withdrawal.
   */
  async calculateRemoveSwapLiquidity(domainId: string, tokenAddress: string, amount: string): Promise<BigNumber[]> {
    const connextContract = this.config.chains[domainId]?.deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const [canonicalDomain, canonicalId] = await this.getCanonicalToken(domainId, tokenAddress);
    const key = getCanonicalHash(canonicalDomain, canonicalId);

    const data = this.connext.encodeFunctionData("calculateRemoveSwapLiquidity", [key, amount]);
    const encoded = await this.chainReader.readTx({
      to: connextContract,
      data: data,
      chainId: Number(domainId),
    });
    const [amounts] = this.connext.decodeFunctionResult("calculateRemoveSwapLiquidity", encoded);

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
    const connextAddr = this.config.chains[domainId].deployments!.connext;
    if (!connextAddr) {
      throw new ContractAddressMissing();
    }

    const [tokenIndexFrom, tokenIndexTo] = await Promise.all([
      this.getPoolTokenIndex(domainId, tokenX, tokenX),
      this.getPoolTokenIndex(domainId, tokenX, tokenY),
    ]);

    const [canonicalDomain, canonicalId] = await this.getCanonicalToken(domainId, tokenX);
    const key = getCanonicalHash(canonicalDomain, canonicalId);

    const amountYData = this.connext.encodeFunctionData("calculateSwap", [key, tokenIndexFrom, tokenIndexTo, amountX]);
    const amountXNoSlippage = BigNumber.from(1000);
    const amountYNoSlippageData = this.connext.encodeFunctionData("calculateSwap", [
      key,
      tokenIndexFrom,
      tokenIndexTo,
      amountXNoSlippage,
    ]);

    const [amountYEncoded, amountYNoSlippageEncoded] = await Promise.all([
      this.chainReader.readTx({
        chainId: Number(domainId),
        to: connextAddr,
        data: amountYData,
      }),
      this.chainReader.readTx({
        chainId: Number(domainId),
        to: connextAddr,
        data: amountYNoSlippageData,
      }),
    ]);

    const [amountY] = this.connext.decodeFunctionResult("calculateSwap", amountYEncoded);
    const [amountYNoSlippage] = this.connext.decodeFunctionResult("calculateSwap", amountYNoSlippageEncoded);

    const rate = BigNumber.from(amountY).mul(BigNumber.from(10).pow(18)).div(amountX);
    const marketRate = BigNumber.from(amountYNoSlippage).mul(BigNumber.from(10).pow(18)).div(amountXNoSlippage);

    return this.calculatePriceImpact(rate, marketRate);
  }

  // ------------------- Read Operations ------------------- //

  async getCanonicalToken(domainId: string, tokenAddress: string): Promise<[string, string]> {
    const connextAddr = this.config.chains[domainId].deployments!.connext;
    if (!connextAddr) {
      throw new ContractAddressMissing();
    }

    const data = this.connext.encodeFunctionData("getTokenId", [tokenAddress]);
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextAddr,
      data: data,
    });
    const [tokenId] = this.connext.decodeFunctionResult("getTokenId", encoded);

    return [tokenId.domain, tokenId.id];
  }

  async getLPTokenAddress(domainId: string, tokenAddress: string): Promise<string> {
    const connextContract = this.config.chains[domainId].deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const [canonicalDomain, canonicalId] = await this.getCanonicalToken(domainId, tokenAddress);
    const key = getCanonicalHash(canonicalDomain, canonicalId);

    const data = this.connext.encodeFunctionData("getSwapLPToken", [key]);
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: data,
    });
    const [lpTokenAddress] = this.connext.decodeFunctionResult("getSwapLPToken", encoded);

    return lpTokenAddress;
  }

  async getLPTokenSupply(domainId: string, lpTokenAddress: string): Promise<BigNumber> {
    const data = this.erc20.encodeFunctionData("totalSupply");
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: lpTokenAddress,
      data: data,
    });
    const [amount] = this.erc20.decodeFunctionResult("totalSupply", encoded);

    return amount;
  }

  async getLPTokenUserBalance(domainId: string, lpTokenAddress: string, userAddress: string): Promise<BigNumber> {
    const data = this.erc20.encodeFunctionData("balanceOf", [userAddress]);
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: lpTokenAddress,
      data: data,
    });
    const [balance] = this.erc20.decodeFunctionResult("balanceOf", encoded);

    return balance;
  }

  async getPoolTokenIndex(domainId: string, tokenAddress: string, poolTokenAddress: string): Promise<number> {
    const connextContract = this.config.chains[domainId].deployments!.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const [canonicalDomain, canonicalId] = await this.getCanonicalToken(domainId, tokenAddress);
    const key = getCanonicalHash(canonicalDomain, canonicalId);

    const data = this.connext.encodeFunctionData("getSwapTokenIndex", [key, poolTokenAddress]);
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: data,
    });
    const [index] = this.connext.decodeFunctionResult("getSwapTokenIndex", encoded);

    return index;
  }

  async getPoolTokenBalance(domainId: string, tokenAddress: string, poolTokenAddress: string): Promise<BigNumber> {
    const connextContract = this.config.chains[domainId].deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const [canonicalDomain, canonicalId] = await this.getCanonicalToken(domainId, tokenAddress);
    const key = getCanonicalHash(canonicalDomain, canonicalId);

    const index = await this.getPoolTokenIndex(domainId, tokenAddress, poolTokenAddress);

    const data = this.connext.encodeFunctionData("getSwapTokenBalance", [key, index]);
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: data,
    });
    const [balance] = this.connext.decodeFunctionResult("getSwapTokenBalance", encoded);

    return balance;
  }

  async getPoolTokenUserBalance(domainId: string, poolTokenAddress: string, userAddress: string): Promise<BigNumber> {
    const data = this.erc20.encodeFunctionData("balanceOf", [userAddress]);
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: poolTokenAddress,
      data: data,
    });
    const [balance] = this.erc20.decodeFunctionResult("balanceOf", encoded);

    return balance;
  }

  async getPoolTokenAddress(domainId: string, tokenAddress: string, index: number) {
    const connextContract = this.config.chains[domainId].deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const [canonicalDomain, canonicalId] = await this.getCanonicalToken(domainId, tokenAddress);
    const key = getCanonicalHash(canonicalDomain, canonicalId);

    const data = this.connext.encodeFunctionData("getSwapToken", [key, index]);
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: data,
    });
    const [poolTokenAddress] = this.connext.decodeFunctionResult("getSwapToken", encoded);

    return poolTokenAddress;
  }

  async getVirtualPrice(domainId: string, tokenAddress: string): Promise<BigNumber> {
    const connextContract = this.config.chains[domainId].deployments!.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const [canonicalDomain, canonicalId] = await this.getCanonicalToken(domainId, tokenAddress);
    const key = getCanonicalHash(canonicalDomain, canonicalId);

    const data = this.connext.encodeFunctionData("getSwapVirtualPrice", [key]);
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: data,
    });
    const [price] = this.connext.decodeFunctionResult("getSwapVirtualPrice", encoded);

    return price;
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

    const connextContract = this.config.chains[domainId]?.deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const [canonicalDomain, canonicalId] = await this.getCanonicalToken(domainId, tokenAddress);
    const key = getCanonicalHash(canonicalDomain, canonicalId);

    const data = this.connext.encodeFunctionData("addSwapLiquidity", [key, amounts, minToMint, deadline]);
    const txRequest = {
      to: connextContract,
      value: 0,
      data,
      from: signerAddress,
    };
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

    const connextContract = this.config.chains[domainId]?.deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const [canonicalDomain, canonicalId] = await this.getCanonicalToken(domainId, tokenAddress);
    const key = getCanonicalHash(canonicalDomain, canonicalId);

    const data = this.connext.encodeFunctionData("removeSwapLiquidity", [key, amount, minAmounts, deadline]);
    const txRequest = {
      to: connextContract,
      value: 0,
      data,
      from: signerAddress,
    };
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
    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const connextContract = this.config.chains[domainId].deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const { requestContext, methodContext } = createLoggingContext(this.swap.name);
    this.logger.info("Method start", requestContext, methodContext, {
      domainId,
      tokenAddress,
      from,
      to,
      amount,
      deadline,
    });

    const [canonicalDomain, canonicalId] = await this.getCanonicalToken(domainId, tokenAddress);
    const key = getCanonicalHash(canonicalDomain, canonicalId);

    const tokenIndexFrom = await this.getPoolTokenIndex(domainId, tokenAddress, from);
    const tokenIndexTo = await this.getPoolTokenIndex(domainId, tokenAddress, to);

    const data = this.connext.encodeFunctionData("swap", [key, tokenIndexFrom, tokenIndexTo, amount, minDy, deadline]);
    const txRequest = {
      to: connextContract,
      value: 0,
      data,
      from: signerAddress,
    };
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
    const [canonicalDomain, canonicalId] = await this.getCanonicalToken(domainId, tokenAddress);

    if (canonicalDomain == domainId) {
      throw new PoolDoesNotExist(domainId, tokenAddress);
    }

    const key: string = getCanonicalHash(canonicalDomain, canonicalId);

    let pool = this.pools.get(key);
    if (pool) {
      return pool;
    }

    const connextContract = this.config.chains[domainId]?.deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    let encoded = this.connext.encodeFunctionData("canonicalToRepresentation(bytes32)", [key]);
    let result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: encoded,
    });
    const local = this.connext.decodeFunctionResult("canonicalToRepresentation(bytes32)", result)[0] as string;

    encoded = this.connext.encodeFunctionData("canonicalToAdopted(bytes32)", [key]);
    result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: encoded,
    });
    const adopted = this.connext.decodeFunctionResult("canonicalToAdopted(bytes32)", result)[0] as string;

    if (local == adopted) {
      throw new PoolDoesNotExist(domainId, tokenAddress);
    }

    encoded = this.connext.encodeFunctionData("getSwapLPToken", [key]);
    result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: encoded,
    });
    const lpTokenAddress = this.connext.decodeFunctionResult("getSwapLPToken", result)[0] as string;

    encoded = this.erc20.encodeFunctionData("decimals");
    result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: adopted,
      data: encoded,
    });
    const adoptedDecimals = this.erc20.decodeFunctionResult("decimals", result)[0] as number;

    result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: local,
      data: encoded,
    });
    const localDecimals = this.erc20.decodeFunctionResult("decimals", result)[0] as number;

    encoded = this.erc20.encodeFunctionData("symbol");
    result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: adopted,
      data: encoded,
    });
    const tokenSymbol = this.erc20.decodeFunctionResult("symbol", result)[0] as string;

    const adoptedBalance = await this.getPoolTokenBalance(domainId, adopted, adopted);
    const localBalance = await this.getPoolTokenBalance(domainId, local, local);

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
          const lpTokenUserBalance = await this.getLPTokenUserBalance(domainId, pool.lpTokenAddress, userAddress);
          const adoptedTokenUserBalance = await this.getPoolTokenUserBalance(domainId, pool.tokens[0], userAddress);
          const localTokenUserBalance = await this.getPoolTokenUserBalance(domainId, pool.tokens[1], userAddress);
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
}
