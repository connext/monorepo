import { providers, BigNumber } from "ethers";
import { getChainData, Logger, createLoggingContext, ChainData, getCanonicalHash } from "@connext/nxtp-utils";
import { getContractInterfaces, contractDeployments, ChainReader } from "@connext/nxtp-txservice";
import { ConnextHandler as TConnext, TokenRegistry as TTokenRegistry, IERC20Extended } from "@connext/nxtp-contracts";

import { NxtpSdkConfig, getConfig } from "./config";
import { SignerAddressMissing, ContractAddressMissing, ChainDataUndefined, PoolDoesNotExist } from "./lib/errors";
import { IPoolStats, IPoolData } from "./interfaces";

export class Pool implements IPoolData {
  domainId: string;
  name: string;
  symbol: string; // in the form of <TKN>-mad<TKN>
  tokens: string[]; // [0] is adopted, [1] is representation
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
  public readonly tokenRegistry: TTokenRegistry["interface"];
  public readonly erc20: IERC20Extended["interface"];

  private readonly logger: Logger;
  private readonly chainReader: ChainReader;

  private pools = new Map<string, Pool>();

  constructor(config: NxtpSdkConfig, logger: Logger, chainData: Map<string, ChainData>, chainReader: ChainReader) {
    this.config = config;
    this.logger = logger;
    this.chainData = chainData;
    this.chainReader = chainReader;
    this.connext = getContractInterfaces().connext;
    this.tokenRegistry = getContractInterfaces().tokenRegistry;
    this.erc20 = getContractInterfaces().erc20Extended;
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

  // ------------------- Read Operations ------------------- //

  async getCanonicalFromLocal(domainId: string, tokenAddress: string): Promise<[string, string]> {
    const tokenRegistryContractAddress = this.config.chains[domainId].deployments!.tokenRegistry;
    if (!tokenRegistryContractAddress) {
      throw new ContractAddressMissing();
    }

    const data = this.tokenRegistry.encodeFunctionData("getTokenId", [tokenAddress]);
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: tokenRegistryContractAddress,
      data: data,
    });
    const [canonicalDomain, canonicalId] = this.tokenRegistry.decodeFunctionResult("getTokenId", encoded);

    return [canonicalDomain, canonicalId];
  }

  async getLPTokenAddress(domainId: string, key: string): Promise<string> {
    const connextContract = this.config.chains[domainId].deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const data = this.connext.encodeFunctionData("getSwapLPToken", [key]);
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: data,
    });
    const [tokenAddress] = this.connext.decodeFunctionResult("getSwapLPToken", encoded);

    return tokenAddress;
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

  async getPoolTokenIndex(domainId: string, key: string, tokenAddress: string): Promise<number> {
    const connextContract = this.config.chains[domainId].deployments!.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const data = this.connext.encodeFunctionData("getSwapTokenIndex", [key, tokenAddress]);
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: data,
    });
    const [index] = this.connext.decodeFunctionResult("getSwapTokenIndex", encoded);

    return index;
  }

  async getPoolTokenBalance(domainId: string, key: string, tokenAddress: string): Promise<BigNumber> {
    const connextContract = this.config.chains[domainId].deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const index = await this.getPoolTokenIndex(domainId, key, tokenAddress);

    const data = this.connext.encodeFunctionData("getSwapTokenBalance", [key, index]);
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: data,
    });
    const [balance] = this.connext.decodeFunctionResult("getSwapTokenBalance", encoded);

    return balance;
  }

  async getPoolTokenUserBalance(domainId: string, tokenAddress: string, userAddress: string): Promise<BigNumber> {
    const data = this.erc20.encodeFunctionData("balanceOf", [userAddress]);
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: tokenAddress,
      data: data,
    });
    const [balance] = this.erc20.decodeFunctionResult("balanceOf", encoded);

    return balance;
  }

  async getPoolTokenAddress(domainId: string, key: string, index: number) {
    const connextContract = this.config.chains[domainId].deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const data = this.connext.encodeFunctionData("getSwapToken", [key, index]);
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: data,
    });
    const [tokenAddress] = this.connext.decodeFunctionResult("getSwapToken", encoded);

    return tokenAddress;
  }

  async getVirtualPrice(domainId: string, key: string): Promise<BigNumber> {
    const connextContract = this.config.chains[domainId].deployments!.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const data = this.connext.encodeFunctionData("getSwapVirtualPrice", [key]);
    const encoded = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: data,
    });
    const [price] = this.connext.decodeFunctionResult("getSwapVirtualPrice", encoded);

    return price;
  }

  async calculateSwap(
    domainId: string,
    key: string,
    tokenIndexFrom: number,
    tokenIndexTo: number,
    amount: string,
  ): Promise<number> {
    const connextContract = this.config.chains[domainId].deployments!.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const encoded = this.connext.encodeFunctionData("calculateSwap", [key, tokenIndexFrom, tokenIndexTo, amount]);
    const result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: encoded,
    });
    const [minAmount] = this.connext.decodeFunctionResult("calculateSwap", result);

    return minAmount;
  }

  async calculateTokenAmount(domainId: string, key: string, amounts: string[], isDeposit = true): Promise<BigNumber> {
    const connextContract = this.config.chains[domainId]?.deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const data = this.connext.encodeFunctionData("calculateSwapTokenAmount", [key, amounts, isDeposit]);
    const encoded = await this.chainReader.readTx({
      to: connextContract,
      data: data,
      chainId: Number(domainId),
    });
    const [amount] = this.connext.decodeFunctionResult("calculateSwapTokenAmount", encoded);

    return amount;
  }

  async calculateRemoveSwapLiquidity(domainId: string, key: string, amount: string): Promise<BigNumber[]> {
    const connextContract = this.config.chains[domainId]?.deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const data = this.connext.encodeFunctionData("calculateRemoveSwapLiquidity", [key, amount]);
    const encoded = await this.chainReader.readTx({
      to: connextContract,
      data: data,
      chainId: Number(domainId),
    });
    const [amounts] = this.connext.decodeFunctionResult("calculateRemoveSwapLiquidity", encoded);

    return amounts;
  }

  // ------------------- Pool Operations ------------------- //

  /**
   * Returns the transaction request for adding liquidity to a pool.
   * @param domainId The domain id of the pool.
   * @param key The hash of the domain and canonicalId of the asset.
   * @param amounts The amounts of the tokens to swap.
   * @param minToMint The minimum acceptable amount of LP tokens to mint.
   * @param deadline The deadline for the swap.
   */
  async addLiquidity(
    domainId: string,
    key: string,
    amounts: number[], // [0] for adopted asset, [1] for local asset
    minToMint = "0",
    deadline?: number,
  ): Promise<providers.TransactionRequest> {
    // TODO: find the right value for this
    if (!deadline) {
      const now = new Date();
      deadline = now.setHours(now.getHours() + 1);
    }

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
   * @param key The hash of the domain and canonicalId of the asset.
   * @param amount The amount of the token to swap.
   * @param minAmounts The minimum acceptable amounts of each token to burn.
   * @param deadline The deadline for the swap.
   */
  async removeLiquidity(
    domainId: string,
    key: string,
    amount: string,
    minAmounts = ["0", "0"],
    deadline?: number,
  ): Promise<providers.TransactionRequest> {
    // TODO: find the right value for this
    if (!deadline) {
      const now = new Date();
      deadline = now.setHours(now.getHours() + 1);
    }

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
   * @param key The hash of the domain and canonicalId of the asset.
   * @param from The address of the token to sell.
   * @param to The address of the token to buy.
   * @param amount The amount of the selling token to swap.
   * @param minDy The minimum amount of the buying token to receive.
   * @param deadline The deadline for the swap.
   */
  async swap(
    domainId: string,
    key: string,
    from: string,
    to: string,
    amount: string,
    minDy = 0,
    deadline?: number,
  ): Promise<providers.TransactionRequest> {
    // TODO: find the right value for this
    if (!deadline) {
      const now = new Date();
      deadline = now.setHours(now.getHours() + 1);
    }

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
      key,
      from,
      to,
      amount,
      deadline,
    });

    const tokenIndexFrom = await this.getPoolTokenIndex(domainId, key, from);
    const tokenIndexTo = await this.getPoolTokenIndex(domainId, key, to);

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
   * @param tokenAddress The address of the local token to get the pool for.
   */
  async getPool(domainId: string, tokenAddress: string): Promise<Pool | undefined> {
    const [canonicalDomain, canonicalId] = await this.getCanonicalFromLocal(domainId, tokenAddress);

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
    const tokenRegistryContract = this.config.chains[domainId].deployments?.tokenRegistry;
    if (!tokenRegistryContract) {
      throw new ContractAddressMissing();
    }

    let encoded = this.connext.encodeFunctionData("canonicalToAdopted(bytes32)", [key]);
    let result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: encoded,
    });
    const adopted = this.connext.decodeFunctionResult("canonicalToAdopted(bytes32)", result)[0] as string;

    if (adopted == tokenAddress) {
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
      to: tokenAddress,
      data: encoded,
    });
    const localDecimals = this.erc20.decodeFunctionResult("decimals", result)[0] as number;

    result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: adopted,
      data: encoded,
    });
    const adoptedDecimals = this.erc20.decodeFunctionResult("decimals", result)[0] as number;

    encoded = this.erc20.encodeFunctionData("symbol");
    result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: adopted,
      data: encoded,
    });
    const tokenSymbol = this.erc20.decodeFunctionResult("symbol", result)[0] as string;

    const localBalance = await this.getPoolTokenBalance(domainId, key, tokenAddress);
    const adoptedBalance = await this.getPoolTokenBalance(domainId, key, adopted);

    pool = new Pool(
      domainId,
      `${tokenSymbol}-Pool`,
      `${tokenSymbol}-next${tokenSymbol}`,
      [adopted, tokenAddress],
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
      Object.values(this.config.chains[domainId].assets).map(async (asset) => {
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
      liquidity: await pool!.getLiquidity(),
      volume: await pool!.getVolume(),
      fees: await pool!.getFees(),
      apy: await pool!.getApy(),
    };

    return stats;
  }
}
