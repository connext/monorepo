import { providers, utils } from "ethers";
import { getChainData, Logger, createLoggingContext, ChainData } from "@connext/nxtp-utils";
import { getContractInterfaces, contractDeployments, ChainReader } from "@connext/nxtp-txservice";
import { ConnextHandler as TConnext, TokenRegistry as TTokenRegistry } from "@connext/nxtp-contracts/typechain-types";

import { NxtpSdkConfig, getConfig } from "./config";
import { getChainIdFromDomain } from "./lib/helpers";
import { SignerAddressMissing, ContractAddressMissing, ChainDataUndefined } from "./lib/errors";

export interface IPoolStats {
  liquidity: number;
  volume: number;
  fees: number;
  apy: {
    year: number;
    total: number;
  };
}

export interface IPoolData {
  chainId: number;
  domainId: string;
  name: string;
  symbol: string;
  address: string;
  assets: string[];
  lpTokenAddress: string;
}

export class Pool implements IPoolData {
  chainId: number;
  domainId: string;
  name: string;
  symbol: string; // in the form of <TKN>-mad<TKN>
  address: string;
  assets: string[]; // [0] is adopted, [1] is representation
  lpTokenAddress: string;

  constructor(
    chainId: number,
    domainId: string,
    name: string,
    symbol: string,
    address: string,
    assets: string[],
    lpTokenAddress: string,
  ) {
    this.chainId = chainId;
    this.domainId = domainId;
    this.name = name;
    this.symbol = symbol;
    this.address = address;
    this.assets = assets;
    this.lpTokenAddress = lpTokenAddress;
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

  private readonly logger: Logger;
  private readonly chainReader: ChainReader;

  constructor(config: NxtpSdkConfig, logger: Logger, chainData: Map<string, ChainData>, chainReader: ChainReader) {
    this.config = config;
    this.logger = logger;
    this.chainData = chainData;
    this.chainReader = chainReader;
    this.connext = getContractInterfaces().connext;
    this.tokenRegistry = getContractInterfaces().tokenRegistry;
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

  async getCanonicalFromLocal(domainId: string, address: string): Promise<{ domain: string; id: string }> {
    const tokenRegistryContractAddress = this.config.chains[domainId].deployments!.tokenRegistry;
    if (!tokenRegistryContractAddress) {
      throw new ContractAddressMissing();
    }
    const chainId = await getChainIdFromDomain(domainId, this.chainData);

    const data = this.tokenRegistry.encodeFunctionData("getTokenId", [address]);
    const encoded = await this.chainReader.readTx({
      to: tokenRegistryContractAddress,
      data: data,
      chainId: chainId,
    });
    const [canonicalDomain, canonicalTokenId] = this.tokenRegistry.decodeFunctionResult("getTokenId", encoded);
    return { domain: canonicalDomain, id: canonicalTokenId };
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

  async calculateRemoveSwapLiquidity(domainId: string, amount: string, canonicalId: string): Promise<number[]> {
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
      chainId,
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

    const minAmounts = this.calculateRemoveSwapLiquidity(domainId, amount, canonicalId);

    const data = this.connext.encodeFunctionData("removeSwapLiquidity", [canonicalId, amount, minAmounts, deadline]);
    const txRequest = {
      to: connextContract,
      value: 0,
      data,
      from: signerAddress,
      chainId,
    };
    this.logger.info(`${this.addLiquidity.name} transaction created `, requestContext, methodContext);

    return txRequest;
  }

  /**
   * @dev Each asset should have a Pool for adopted<>local unless adopted==local
   *      or the asset is already canonical to the local domain.
   */
  async getPools(domainId: string, chainData: Map<string, ChainData>) {
    const chainId = await getChainIdFromDomain(domainId, chainData);
    const chainConfig = this.config.chains[chainId];

    const connextContract = chainConfig?.deployments?.connext;
    if (!connextContract) {
      throw new ContractAddressMissing();
    }
    const tokenRegistryContract = chainConfig.deployments?.tokenRegistry;
    if (!tokenRegistryContract) {
      throw new ContractAddressMissing();
    }

    const pools = new Map<string, Pool>();

    Object.values(chainConfig.assets).forEach(async (asset) => {
      // Fetch the canonical domain and token ID for this local asset
      let encoded = this.tokenRegistry.encodeFunctionData("getTokenId", [asset.address]);
      let result = await this.chainReader.readTx({
        chainId: chainId,
        to: tokenRegistryContract,
        data: encoded,
      });
      const [canonicalDomain, canonicalTokenId] = this.tokenRegistry.decodeFunctionResult("getTokenId", result);
      const canonicalTokenIdBytes = utils.hexlify(canonicalTokenId as string);
      const canonicalChainId = await getChainIdFromDomain(canonicalDomain.toString() as string, this.chainData);

      // If the canonical domain is the same as the local domain, then there is no pool
      if (canonicalChainId !== chainId) {
        encoded = this.connext.encodeFunctionData("canonicalToAdopted", [canonicalTokenIdBytes]);
        result = await this.chainReader.readTx({
          chainId: chainId,
          to: connextContract,
          data: encoded,
        });
        const adopted = this.connext.decodeFunctionResult("canonicalToAdopted", result)[0][1] as string;

        // If the adopted token is the same as the local token, then there is no pool
        if (adopted != asset.address) {
          encoded = this.connext.encodeFunctionData("getSwapLPToken", [canonicalTokenIdBytes]);
          result = await this.chainReader.readTx({
            chainId: chainId,
            to: connextContract,
            data: encoded,
          });
          const lpToken = this.connext.decodeFunctionResult("getSwapLPToken", result)[0][1] as string;

          const pool = new Pool(
            chainId,
            domainId,
            canonicalTokenIdBytes,
            `${asset.symbol}-mad${asset.symbol}`,
            asset.address,
            [adopted, asset.address],
            lpToken,
          );
          pools.set(asset.name, pool);
        }
      }
    });
  }
}
