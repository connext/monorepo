import { providers } from "ethers";
import { getChainData, Logger, createLoggingContext, ChainData } from "@connext/nxtp-utils";
import { getContractInterfaces, contractDeployments, ChainReader } from "@connext/nxtp-txservice";
import { ConnextHandler as TConnext, TokenRegistry as TTokenRegistry, IERC20Extended } from "@connext/nxtp-contracts/typechain-types";

import { NxtpSdkConfig, getConfig } from "./config";
import { getChainIdFromDomain } from "./lib/helpers";
import { SignerAddressMissing, ContractAddressMissing, ChainDataUndefined } from "./lib/errors";
import { IPoolStats, IPoolData } from "./interfaces";

export class Pool implements IPoolData {
  chainId: number;
  domainId: string;
  name: string;
  symbol: string; // in the form of <TKN>-mad<TKN>
  tokens: string[]; // [0] is adopted, [1] is representation
  decimals: number[];
  lpTokenAddress: string;
  address?: string; // no address if internal pool

  constructor(
    chainId: number,
    domainId: string,
    name: string,
    symbol: string,
    tokens: string[],
    decimals: number[],
    lpTokenAddress: string,
    address?: string,
  ) {
    this.chainId = chainId;
    this.domainId = domainId;
    this.name = name;
    this.symbol = symbol;
    this.tokens = tokens;
    this.tokens = tokens;
    this.decimals = decimals;
    this.lpTokenAddress = lpTokenAddress;
    this.address = address;
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
    this.erc20 = getContractInterfaces().erc20Extended;AbortController

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

  async getCanonicalFromLocal(domainId: string, address: string): Promise<[string, string]> {
    const tokenRegistryContractAddress = this.config.chains[domainId].deployments!.tokenRegistry;
    if (!tokenRegistryContractAddress) {
      throw new ContractAddressMissing();
    }
    const chainId = await getChainIdFromDomain(domainId, this.chainData);

    const encoded = this.tokenRegistry.encodeFunctionData("getTokenId", [address]);
    const result = await this.chainReader.readTx({
      chainId: chainId,
      to: tokenRegistryContractAddress,
      data: encoded,
    });
    const [canonicalDomain, canonicalTokenId] = this.tokenRegistry.decodeFunctionResult("getTokenId", result);
    return [canonicalDomain, canonicalTokenId];
  }

  async getTokenIndex(domainId: string, canonicalId: string, address: string): Promise<number> {
    const chainId = await getChainIdFromDomain(domainId, this.chainData);
    const connextContract = this.config.chains[domainId].deployments!.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const encoded = this.connext.encodeFunctionData("getSwapTokenIndex", [canonicalId, address]);
    const result = await this.chainReader.readTx({
      chainId: chainId,
      to: connextContract,
      data: encoded,
    });
    const [index] = this.connext.decodeFunctionResult("getSwapTokenIndex", result);

    return index;
  }

  async getTokenBalance(domainId: string, canonicalId: string, address: string) {
    const chainId = await getChainIdFromDomain(domainId, this.chainData);
    const connextContract = this.config.chains[chainId].deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const index = await this.getTokenIndex(domainId, canonicalId, address);

    const encoded = this.connext.encodeFunctionData("getSwapTokenBalance", [canonicalId, index]);
    const result = await this.chainReader.readTx({
      chainId: chainId,
      to: connextContract,
      data: encoded,
    });
    const [balance] = this.connext.decodeFunctionResult("getSwapTokenBalance", result);

    return balance;
  }

  async getTokenAddress(domainId: string, canonicalId: string, index: number) {
    const chainId = await getChainIdFromDomain(domainId, this.chainData);
    const connextContract = this.config.chains[chainId].deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }

    const encoded = this.connext.encodeFunctionData("getSwapToken", [canonicalId, index]);
    const result = await this.chainReader.readTx({
      chainId: chainId,
      to: connextContract,
      data: encoded,
    });
    const [address] = this.connext.decodeFunctionResult("getSwapToken", result);

    return address;
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
    const chainId = await getChainIdFromDomain(domainId, this.chainData);

    const data = this.connext.encodeFunctionData("calculateSwapTokenAmount", [canonicalId, amounts, isDeposit]);
    const encoded = await this.chainReader.readTx({
      to: connextContract,
      data: data,
      chainId: chainId,
    });
    const [amount] = this.connext.decodeFunctionResult("calculateSwapTokenAmount", encoded);

    return amount;
  }

  async calculateRemoveSwapLiquidity(domainId: string, amount: string, canonicalId: string): Promise<string[]> {
    const connextContract = this.config.chains[domainId]?.deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }
    const chainId = await getChainIdFromDomain(domainId, this.chainData);

    const data = this.connext.encodeFunctionData("calculateRemoveSwapLiquidity", [canonicalId, amount]);
    const encoded = await this.chainReader.readTx({
      to: connextContract,
      data: data,
      chainId: chainId,
    });
    const [amounts] = this.connext.decodeFunctionResult("calculateRemoveSwapLiquidity", encoded);

    return amounts;
  }

  async calculateSwap(
    domainId: string,
    canonicalId: string,
    tokenIndexFrom: number,
    tokenIndexTo: number,
    amount: string,
  ): Promise<number> {
    const chainId = await getChainIdFromDomain(domainId, this.chainData);
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
      chainId: chainId,
      to: connextContract,
      data: encoded,
    });
    const [minAmount] = this.connext.decodeFunctionResult("calculateSwap", result);

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
    const chainId = await getChainIdFromDomain(domainId, this.chainData);

    const connextContract = this.config.chains[chainId]?.deployments?.connext;
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
    const chainId = await getChainIdFromDomain(domainId, this.chainData);

    const connextContract = this.config.chains[chainId]?.deployments?.connext;
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

  // ------------------- Swap Operations ------------------- //

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

    const chainId = await getChainIdFromDomain(domainId, this.chainData);
    const chainConfig = this.config.chains[chainId];
    const connextContract = chainConfig.deployments?.connext;
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

    const tokenIndexFrom = await this.getTokenIndex(domainId, from);
    const tokenIndexTo = await this.getTokenIndex(domainId, to);
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

  async getPool(domainId: string, address: string): Promise<Pool | undefined> {
    const [canonicalDomain, canonicalId] = await this.getCanonicalFromLocal(domainId, address);
    const pool = this.pools.get(domainId)?.get(canonicalId);
    if (pool) {
      return pool;
    }

    const chainId = await getChainIdFromDomain(domainId, this.chainData);
    const chainConfig = this.config.chains[chainId];

    const connextContract = chainConfig?.deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }
    const tokenRegistryContract = chainConfig.deployments?.tokenRegistry;
    if (!tokenRegistryContract) {
      throw new ContractAddressMissing();
    }

    const canonicalChainId = await getChainIdFromDomain(canonicalDomain, this.chainData);

    // If the canonical domain is the same as the local domain, then there is no pool
    if (canonicalChainId !== chainId) {
      let encoded = this.connext.encodeFunctionData("canonicalToAdopted", [canonicalId]);
      let result = await this.chainReader.readTx({
        chainId: chainId,
        to: connextContract,
        data: encoded,
      });
      const adopted = this.connext.decodeFunctionResult("canonicalToAdopted", result)[0][1] as string;

      // If the adopted token is the same as the local token, then there is no pool
      if (adopted != address) {
        encoded = this.connext.encodeFunctionData("getSwapLPToken", [canonicalId]);
        result = await this.chainReader.readTx({
          chainId: chainId,
          to: connextContract,
          data: encoded,
        });
        const lpTokenAddress = this.connext.decodeFunctionResult("getSwapLPToken", result)[0][1] as string;

        encoded = this.erc20.encodeFunctionData("decimals");
        result = await this.chainReader.readTx({
          chainId: chainId,
          to: address,
          data: encoded,
        });
        const localDecimals = this.erc20.decodeFunctionResult("decimals", result)[0][1] as number;

        result = await this.chainReader.readTx({
          chainId: chainId,
          to: adopted,
          data: encoded,
        });
        const adoptedDecimals = this.erc20.decodeFunctionResult("decimals", result)[0][1] as number;

        encoded = this.erc20.encodeFunctionData("symbol");
        result = await this.chainReader.readTx({
          chainId: chainId,
          to: adopted,
          data: encoded,
        });
        const tokenSymbol = this.erc20.decodeFunctionResult("symbol", result)[0][1] as string;

        const pool = new Pool(
          chainId,
          domainId,
          canonicalId,
          `${tokenSymbol}-mad${tokenSymbol}`,
          [adopted, address],
          [adoptedDecimals, localDecimals],
          lpTokenAddress,
        );

        return pool;
      }
    }

    return;
  }
}
