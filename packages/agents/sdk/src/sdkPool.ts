import { providers, utils } from "ethers";
import { getChainData, Logger, createLoggingContext, ChainData } from "@connext/nxtp-utils";
import {
  getContractInterfaces,
  ConnextContractInterfaces,
  contractDeployments,
  ChainReader,
} from "@connext/nxtp-txservice";

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
  id: string;
  name: string;
  symbol: string;
  address: string;
  assets: string[];
  lpTokenAddress: string;
}

/**
 * @classdesc Lightweight class to facilitate interaction with StableSwap Pools.
 * @dev This class will either interact with internal StableSwapFacet pools or external StableSwap pools
 *      depending on which type of pool is being used for the canonical token.
 *
 */
export class NxtpSdkPool {
  public readonly config: NxtpSdkConfig;
  private readonly logger: Logger;
  private readonly contracts: ConnextContractInterfaces; // Used to read and write to smart contracts.
  private chainReader: ChainReader;

  public readonly chainData: Map<string, ChainData>;

  constructor(config: NxtpSdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    this.config = config;
    this.logger = logger;
    this.chainData = chainData;
    this.contracts = getContractInterfaces();
    this.chainReader = new ChainReader(
      this.logger.child({ module: "ChainReader" }, this.config.logLevel),
      this.config.chains,
    );
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

    return new NxtpSdkPool(nxtpConfig, logger, chainData);
  }

  async getCanonicalTokenId(domain: string, adoptedAsset: string): Promise<string> {
    const tokenRegistryContractAddress = this.config.chains[domain].deployments!.stableSwapFacet;
    if (!tokenRegistryContractAddress) {
      throw new ContractAddressMissing();
    }

    const chainId = await getChainIdFromDomain(domain, this.chainData);

    const data = this.contracts.tokenRegistry.encodeFunctionData("getCanonicalTokenId", [adoptedAsset]);
    const encoded = await this.chainReader.readTx({
      to: tokenRegistryContractAddress,
      data: data,
      chainId: chainId,
    });
    const [, id] = this.contracts.tokenRegistry.decodeFunctionResult("getCanonicalTokenId", encoded);

    return id;
  }

  async calculateTokenAmount(
    domain: string,
    canonicalTokenId: string,
    amounts: string[],
    isDeposit = true,
  ): Promise<string> {
    const { requestContext, methodContext } = createLoggingContext(this.calculateTokenAmount.name);
    this.logger.info("Method start", requestContext, methodContext, { amounts, isDeposit });

    const stableSwapFacetContractAddress = this.config.chains[domain].deployments!.stableSwapFacet;
    if (!stableSwapFacetContractAddress) {
      throw new ContractAddressMissing();
    }

    const chainId = await getChainIdFromDomain(domain, this.chainData);

    const data = this.contracts.stableSwapFacet.encodeFunctionData("calculateSwapTokenAmount", [
      canonicalTokenId,
      amounts,
      true,
    ]);
    const encoded = await this.chainReader.readTx({
      to: stableSwapFacetContractAddress,
      data: data,
      chainId: chainId,
    });
    this.logger.info(`${this.calculateTokenAmount.name} created `, requestContext, methodContext);
    const [amount] = this.contracts.stableSwapFacet.decodeFunctionResult("calculateSwapTokenAmount", encoded);

    return amount;
  }

  // Swap is done by lookup of local/adopted asset in LibConnextStorage.sol:
  //   mapping(bytes32 => SwapUtils.Swap) swapStorages;
  async addLiquidity(
    domain: string,
    adoptedAsset: string,
    amounts: string[], // [0] for adopted asset, [1] for local asset
    deadline?: number,
    estimateGas?: boolean,
  ): Promise<providers.TransactionRequest> {
    // TODO
    // if (!estimateGas) {
    //   await _ensureAllowed;
    // }
    if (!deadline) {
      deadline = 100;
    }

    const { requestContext, methodContext } = createLoggingContext(this.addLiquidity.name);
    this.logger.info("Method start", requestContext, methodContext, { domain, amounts, deadline, estimateGas });

    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const chainId = await getChainIdFromDomain(domain, this.chainData);

    const stableSwapFacetcontractAddress = this.config.chains[domain].deployments!.stableSwapFacet;
    if (!stableSwapFacetcontractAddress) {
      throw new ContractAddressMissing();
    }

    const canonicalTokenId = await this.getCanonicalTokenId(domain, adoptedAsset);
    const minToMint = await this.calculateTokenAmount(domain, canonicalTokenId, amounts);

    const data = this.contracts.stableSwapFacet.encodeFunctionData("addSwapLiquidity", [
      canonicalTokenId,
      amounts,
      minToMint,
      deadline,
    ]);
    const txRequest = {
      to: stableSwapFacetcontractAddress,
      value: 0,
      data,
      from: signerAddress,
      chainId,
    };
    this.logger.info(`${this.addLiquidity.name} transaction created `, requestContext, methodContext);

    return txRequest;
  }
}
