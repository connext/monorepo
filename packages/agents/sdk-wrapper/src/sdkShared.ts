import {
  Logger,
  ChainData,
  formatUrl,
  chainIdToDomain as _chainIdToDomain,
  domainToChainId as _domainToChainId,
} from "@connext/nxtp-utils";
import { providers } from "ethers";

import { Connext, IERC20 } from "./typechain-types";
import type { SdkConfig, AssetData, ConnextSupport, ChainDeployments, Options } from "./sdk-types";
import { domainsToChainNames } from "./config";
import { axiosPost, axiosGet } from "./mockable";

export class SdkShared {
  readonly config: SdkConfig;
  readonly chainData: Map<string, ChainData>;
  protected readonly logger: Logger;

  readonly baseUri: string;

  constructor(config: SdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    this.config = config;
    this.logger = logger;
    this.chainData = chainData;
    this.baseUri =
      this.config.network === "local"
        ? "http://localhost:8080"
        : this.config.network === "testnet"
        ? this.config.environment === "staging"
          ? "https://sdk-server.testnet.staging.connext.ninja"
          : "https://sdk-server.testnet.connext.ninja"
        : "https://sdk-server.mainnet.connext.ninja";
  }

  async getConversionRate(chainId: number) {
    const response = await axiosGet(`${this.baseUri}/getConversionRate/${chainId}`);
    return response.data;
  }

  async getProvider(domainId: string): Promise<providers.StaticJsonRpcProvider> {
    const response = await axiosGet(`${this.baseUri}/getProvider/${domainId}`);
    return response.data;
  }

  async getDeploymentAddress(domainId: string, deploymentName: keyof ChainDeployments): Promise<string> {
    const response = await axiosGet(`${this.baseUri}/getDeploymentAddress/${domainId}/${deploymentName}`);
    return response.data;
  }

  async getConnext(domainId: string, options?: Options): Promise<Connext> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };
    const params = {
      domainId,
      options: _options,
    };

    const response = await axiosPost(`${this.baseUri}/getConnext`, params);
    return response.data;
  }

  async getERC20(domainId: string, tokenAddress: string, options?: Options): Promise<IERC20> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };
    const params = {
      domainId,
      tokenAddress,
      options: _options,
    };

    const response = await axiosPost(`${this.baseUri}/getERC20`, params);
    return response.data;
  }

  async getChainId(domainId: string): Promise<number> {
    const response = await axiosGet(`${this.baseUri}/getChainId/${domainId}`);
    return response.data;
  }

  domainToChainName(domainId: string) {
    return domainsToChainNames[domainId];
  }

  chainIdToDomain(chainId: number): number {
    return _chainIdToDomain(chainId);
  }

  domainToChainId(domainId: number): number {
    return _domainToChainId(domainId);
  }

  async getBlockNumberFromUnixTimestamp(domainId: string, unixTimestamp: number) {
    const baseUrl = "https://coins.llama.fi";
    const uri = formatUrl(baseUrl, "block");
    const chainName = this.domainToChainName(domainId);
    const res = await axiosGet(uri + `/${chainName}` + `/${unixTimestamp}`);

    return res.data;
  }

  async approveIfNeeded(
    domainId: string,
    assetId: string,
    amount: string,
    infiniteApprove?: boolean,
    options?: Options,
  ): Promise<providers.TransactionRequest | undefined> {
   
    const originProviderUrl = this.config.chains[domainId]?.providers?.[0];

    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };

    if (originProviderUrl) {
      _options["originProviderUrl"] = originProviderUrl;
    }

    const params = {
      domainId,
      assetId,
      amount,
      infiniteApprove: infiniteApprove ?? true,
      options: _options,
    };

    const response = await axiosPost(`${this.baseUri}/approveIfNeeded`, params);
    return response.data;
  }

  async getAssetsData(): Promise<AssetData[]> {
    const response = await axiosGet(`${this.baseUri}/getAssetsData`);
    return response.data;
  }

  async getActiveLiquidity(domain?: string, local?: string): Promise<any> {
    const response = await axiosGet(`${this.baseUri}/getActiveLiquidity`, {
      params: {
        domain: domain,
        local: local,
      },
    });
    return response.data;
  }

  async getSupported(): Promise<ConnextSupport[]> {
    const response = await axiosGet(`${this.baseUri}/getSupported`);
    return response.data;
  }

  async getAssetsDataByDomainAndAddress(domainId: string, tokenAddress: string): Promise<AssetData | undefined> {
    const response = await axiosGet(`${this.baseUri}/getAssetsDataByDomainAndAddress/${domainId}/${tokenAddress}`);
    return response.data;
  }

  async getAssetsWithSameCanonical(domainId: string, tokenAddress: string): Promise<AssetData[]> {
    const response = await axiosGet(`${this.baseUri}/getAssetsWithSameCanonical/${domainId}/${tokenAddress}`);
    return response.data;
  }

  async getAssetsDataByDomainAndKey(domainId: string, key: string): Promise<AssetData | undefined> {
    const response = await axiosGet(`${this.baseUri}/getAssetsDataByDomainAndKey/${domainId}/${key}`);
    return response.data;
  }

  async isNextAsset(tokenAddress: string): Promise<boolean | undefined> {
    const response = await axiosGet(`${this.baseUri}/isNextAsset/${tokenAddress}`);
    return response.data;
  }

  async changeSignerAddress(signerAddress: string) {
    this.config.signerAddress = signerAddress;
  }

  async parseConnextTransactionReceipt(transactionReceipt: providers.TransactionReceipt) {
    const response = await axiosPost(`${this.baseUri}/parseConnextTransactionReceipt`, transactionReceipt);
    return response.data;
  }

  async calculateCanonicalKey(domainId: string, canonicalId: string): Promise<[string, string]> {
    const response = await axiosGet(`${this.baseUri}/calculateCanonicalKey/${domainId}/${canonicalId}`);
    return response.data;
  }

  async getCanonicalTokenId(domainId: string, tokenAddress: string): Promise<[string, string]> {
    const response = await axiosGet(`${this.baseUri}/getCanonicalTokenId/${domainId}/${tokenAddress}`);
    return response.data;
  }
}
