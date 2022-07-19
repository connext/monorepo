import { providers } from "ethers";
import { getChainData, Logger, createLoggingContext, ChainData } from "@connext/nxtp-utils";
import { getContractInterfaces, contractDeployments, ChainReader } from "@connext/nxtp-txservice";
import { ConnextHandler as TConnext, TokenRegistry as TTokenRegistry, IERC20Extended } from "@connext/nxtp-contracts";

import { NxtpSdkConfig, getConfig } from "./config";
import { SignerAddressMissing, ContractAddressMissing, ChainDataUndefined } from "./lib/errors";
import { IPoolStats, IPoolData } from "./interfaces";

export class Pool implements IPoolData {
  domainId: string;
  name: string;
  symbol: string; // in the form of <TKN>-mad<TKN>
  tokens: string[]; // [0] is adopted, [1] is representation
  decimals: number[];
  lpTokenAddress: string;
  address?: string; // no address if internal pool

  constructor(
    domainId: string,
    name: string,
    symbol: string,
    tokens: string[],
    decimals: number[],
    lpTokenAddress: string,
    address?: string,
  ) {
    this.domainId = domainId;
    this.name = name;
    this.symbol = symbol;
    this.tokens = tokens;
    this.decimals = decimals;
    this.lpTokenAddress = lpTokenAddress;
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

  async getApy(): Promise<{week: string, month: string, year: string, total: string}> {
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

  // pools[domainId][canonicalId] -> Pool
  private pools = new Map<string, Map<string, Pool>>;

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

  async getCanonicalFromLocal(domainId: string, tokenAddress: string): Promise<[number, string]> {
    const tokenRegistryContractAddress = this.config.chains[domainId].deployments!.tokenRegistry;
    if (!tokenRegistryContractAddress) {
      throw new ContractAddressMissing();
    }

    const encoded = this.tokenRegistry.encodeFunctionData("getTokenId", [tokenAddress]);
    const result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: tokenRegistryContractAddress,
      data: encoded,
    });
    const [canonicalDomain, canonicalId] = this.tokenRegistry.decodeFunctionResult("getTokenId", result );
    
    return [canonicalDomain, canonicalId];
  }

  async getLPTokenAddress(domainId: string, canonicalId: string): Promise<string> {
    const connextContract = this.config.chains[domainId].deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const encoded = this.connext.encodeFunctionData("getSwapLPToken", [canonicalId]);
    const result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: encoded,
    });
    const [tokenAddress] = this.connext.decodeFunctionResult("getSwapLPToken", result );

    return tokenAddress;
  }

  async getLPTokenBalance(domainId: string, lpTokenAddress: string, userAddress: string): Promise<number> {
    
    const encoded = this.erc20.encodeFunctionData("balanceOf", [userAddress]);
    const result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: lpTokenAddress,
      data: encoded,
    });
    const [balance] = this.erc20.decodeFunctionResult("balanceOf", result );

    return balance;
  }

  async getPoolTokenIndex(domainId: string, canonicalId: string, tokenAddress: string): Promise<number> {
    const connextContract = this.config.chains[domainId].deployments!.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const encoded = this.connext.encodeFunctionData("getSwapTokenIndex", [canonicalId, tokenAddress]);
    const result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: encoded,
    });
    const [index] = this.connext.decodeFunctionResult("getSwapTokenIndex", result );

    return index;
  }

  async getPoolTokenBalance(domainId: string, canonicalId: string, tokenAddress: string) {
    const connextContract = this.config.chains[domainId].deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const index = await this.getPoolTokenIndex(domainId, canonicalId, tokenAddress);

    const encoded = this.connext.encodeFunctionData("getSwapTokenBalance", [canonicalId, index]);
    const result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: encoded,
    });
    const [balance] = this.connext.decodeFunctionResult("getSwapTokenBalance", result );

    return balance;
  }

  async getPoolTokenAddress(domainId: string, canonicalId: string, index: number) {
    const connextContract = this.config.chains[domainId].deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const encoded = this.connext.encodeFunctionData("getSwapToken", [canonicalId, index]);
    const result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: encoded,
    });
    const [tokenAddress] = this.connext.decodeFunctionResult("getSwapToken", result );

    return tokenAddress;
  }

  async calculateTokenAmount(
    domainId: string,
    canonicalId: string,
    amounts: string[],
    isDeposit = true,
  ): Promise<string> {
    const connextContract = this.config.chains[domainId]?.deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const data = this.connext.encodeFunctionData("calculateSwapTokenAmount", [canonicalId, amounts, isDeposit]);
    const encoded = await this.chainReader.readTx({
      to: connextContract,
      data: data,
      chainId: Number(domainId),
    });
    const [amount] = this.connext.decodeFunctionResult("calculateSwapTokenAmount", encoded );

    return amount;
  }

  async calculateRemoveSwapLiquidity(domainId: string, amount: string, canonicalId: string): Promise<string[]> {
    const connextContract = this.config.chains[domainId]?.deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const data = this.connext.encodeFunctionData("calculateRemoveSwapLiquidity", [canonicalId, amount]);
    const encoded = await this.chainReader.readTx({
      to: connextContract,
      data: data,
      chainId: Number(domainId),
    });
    const [amounts] = this.connext.decodeFunctionResult("calculateRemoveSwapLiquidity", encoded );

    return amounts;
  }

  async calculateSwap(
    domainId: string,
    canonicalId: string,
    tokenIndexFrom: number,
    tokenIndexTo: number,
    amount: string,
  ): Promise<number> {
    const connextContract = this.config.chains[domainId].deployments!.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const encoded = this.connext.encodeFunctionData("calculateSwap", [
      canonicalId,
      tokenIndexFrom,
      tokenIndexTo,
      amount,
    ]);
    const result = await this.chainReader.readTx({
      chainId: Number(domainId),
      to: connextContract,
      data: encoded,
    });
    const [minAmount] = this.connext.decodeFunctionResult("calculateSwap", result );

    return minAmount;
  }

  // ------------------- Pool Operations ------------------- //

  async addLiquidity(
    domainId: string,
    canonicalId: string,
    amounts: string[], // [0] for adopted asset, [1] for local asset
    deadline?: number,
    estimateGas = false,
  ): Promise<providers.TransactionRequest> {
    // TODO: handle estimateGas=true

    // TODO: find the right value for this
    if (!deadline) {
      const now = new Date();
      deadline = now.setHours(now.getHours() + 1);
    }

    const { requestContext, methodContext } = createLoggingContext(this.addLiquidity.name);
    this.logger.info("Method start", requestContext, methodContext, { domainId, amounts, deadline, estimateGas });

    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const connextContract = this.config.chains[domainId]?.deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const minToMint = await this.calculateTokenAmount(domainId, canonicalId, amounts);

    const data = this.connext.encodeFunctionData("addSwapLiquidity", [canonicalId, amounts, minToMint, deadline]);
    const txRequest = {
      to: connextContract,
      value: 0,
      data,
      from: signerAddress,
    };
    this.logger.info(`${this.addLiquidity.name} transaction created `, requestContext, methodContext);

    return txRequest;
  }

  async removeLiquidity(
    domainId: string,
    canonicalId: string,
    amount: string,
    deadline?: number,
    estimateGas = false,
  ): Promise<providers.TransactionRequest> {
    // TODO: handle estimateGas=true

    // TODO: find the right value for this
    if (!deadline) {
      const now = new Date();
      deadline = now.setHours(now.getHours() + 1);
    }

    const { requestContext, methodContext } = createLoggingContext(this.removeLiquidity.name);
    this.logger.info("Method start", requestContext, methodContext, { domainId, amount, deadline, estimateGas });

    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const connextContract = this.config.chains[domainId]?.deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const minAmounts = await this.calculateRemoveSwapLiquidity(domainId, amount, canonicalId);

    const data = this.connext.encodeFunctionData("removeSwapLiquidity", [canonicalId, amount, minAmounts, deadline]);
    const txRequest = {
      to: connextContract,
      value: 0,
      data,
      from: signerAddress,
    };
    this.logger.info(`${this.addLiquidity.name} transaction created `, requestContext, methodContext);

    return txRequest;
  }

  async swap(
    domainId: string,
    canonicalId: string,
    from: string,
    to: string,
    amount: string,
    deadline?: number,
    estimateGas = false,
  ): Promise<providers.TransactionRequest> {
    // TODO: handle estimateGas=true

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
      canonicalId,
      from,
      to,
      amount,
      deadline,
      estimateGas,
    });

    const tokenIndexFrom = await this.getPoolTokenIndex(domainId, canonicalId, from);
    const tokenIndexTo = await this.getPoolTokenIndex(domainId, canonicalId, to);
    const minDy = await this.calculateSwap(domainId, canonicalId, tokenIndexFrom, tokenIndexTo, amount);

    const data = this.connext.encodeFunctionData("swap", [
      canonicalId,
      tokenIndexFrom,
      tokenIndexTo,
      amount,
      minDy,
      deadline,
    ]);
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

  async getPool(domainId: string, tokenAddress: string): Promise<Pool | undefined> {
    const [canonicalDomain, canonicalId] = await this.getCanonicalFromLocal(domainId, tokenAddress);
    const pool = this.pools.get(domainId)?.get(canonicalId);
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

    // If the canonical domain is the same as the local domain, then there is no pool
    if (canonicalDomain !== Number(domainId)) {
      let encoded = this.connext.encodeFunctionData("canonicalToAdopted", [canonicalId]);
      let result = await this.chainReader.readTx({
        chainId: Number(domainId),
        to: connextContract,
        data: encoded,
      });
      const adopted = this.connext.decodeFunctionResult("canonicalToAdopted", result )[0] as string;

      // If the adopted token is the same as the local token, then there is no pool
      if (adopted != tokenAddress) {
        encoded = this.connext.encodeFunctionData("getSwapLPToken", [canonicalId]);
        result = await this.chainReader.readTx({
          chainId: Number(domainId),
          to: connextContract,
          data: encoded,
        });
        const lpTokenAddress = this.connext.decodeFunctionResult("getSwapLPToken", result )[0] as string;

        encoded = this.erc20.encodeFunctionData("decimals");
        result = await this.chainReader.readTx({
          chainId: Number(domainId),
          to: tokenAddress,
          data: encoded,
        });
        const localDecimals = this.erc20.decodeFunctionResult("decimals", result )[0] as number;

        result = await this.chainReader.readTx({
          chainId: Number(domainId),
          to: adopted,
          data: encoded,
        });
        const adoptedDecimals = this.erc20.decodeFunctionResult("decimals", result )[0] as number;

        encoded = this.erc20.encodeFunctionData("symbol");
        result = await this.chainReader.readTx({
          chainId: Number(domainId),
          to: adopted,
          data: encoded,
        });
        const tokenSymbol = this.erc20.decodeFunctionResult("symbol", result )[0] as string;

        const pool = new Pool(
          domainId,
          `${tokenSymbol}-Pool`,
          `${tokenSymbol}-mad${tokenSymbol}`,
          [adopted, tokenAddress],
          [adoptedDecimals, localDecimals],
          lpTokenAddress,
        );

        return pool;
      }
    }

    return;
  }

  async getUserPools(domainId: string, userAddress: string): Promise<Pool[]> {
    const pools: Pool[] = [];

    Object.values(this.config.chains[domainId].assets).forEach(async asset => {
      const pool = await this.getPool(domainId, asset.address);
      const lpToken = pool?.lpTokenAddress;

      if (lpToken && await this.getLPTokenBalance(domainId, lpToken, userAddress)) {
        pools.push(pool);
      }
    });

    return pools;
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
