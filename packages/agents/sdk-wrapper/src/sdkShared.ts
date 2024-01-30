import {
  Logger,
  createLoggingContext,
  ChainData,
  formatUrl,
  chainIdToDomain as _chainIdToDomain,
  domainToChainId as _domainToChainId,
} from "@connext/nxtp-utils";
import { providers, BigNumber, ethers, constants } from "ethers";

import { Connext, IERC20, IERC20__factory, Connext__factory } from "./typechain-types";
import type { SdkConfig, AssetData, ConnextSupport, ChainDeployments, Options, ProviderSanityCheck } from "./sdk-types";
import { domainsToChainNames, XERC20REGISTRY_DOMAIN_ADDRESS, LOCKBOX_ADAPTER_DOMAIN_ADDRESS } from "./config";
import { axiosPost, axiosGet } from "./mockable";
import { SignerAddressMissing, ProviderMissing } from "./lib/errors";
import XERC20RegistryAbi from "./lib/abi/XERC20/XERC20Registry.sol/XERC20Registry.json";

declare global {
  interface Window {
    ethereum?: providers.ExternalProvider;
    web3?: {
      currentProvider: providers.ExternalProvider;
    };
  }
}

declare const window: Window;

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
    if (typeof window !== "undefined" && window.ethereum) {
      const browserProvider = new providers.Web3Provider(window.ethereum);
      const browserChainId = (await browserProvider.getNetwork()).chainId;
      const desiredChainId = await this.getChainId(domainId);

      if (browserChainId === desiredChainId) {
        this.logger.info(`Using browser provider for domain: ${domainId}`);
        return browserProvider;
      }
    }

    this.logger.info(`Using static provider for domain: ${domainId}`);
    return new providers.StaticJsonRpcProvider(this.config?.chains[domainId]?.providers?.[0]);
  }

  async providerSanityCheck(params: ProviderSanityCheck): Promise<boolean> {
    const { domains, options } = params;
    let { chains } = this.config;

    if (options && options.chains) {
      chains = options.chains;
    }

    for (const domainId of domains) {
      if (!(domainId in chains)) {
        return false;
      }
      const chain = chains[domainId];
      if ((chain.providers?.length ?? 0) <= 0) {
        return false;
      }
    }

    return true;
  }

  async getDeploymentAddress(domainId: string, deploymentName: keyof ChainDeployments): Promise<string> {
    const response = await axiosGet(`${this.baseUri}/getDeploymentAddress/${domainId}/${deploymentName}`);
    return response.data;
  }

  async getConnext(domainId: string, options?: Options): Promise<Connext> {
    const isProviderValid = await this.providerSanityCheck({ domains: [domainId], options });
    if (!isProviderValid) {
      throw new ProviderMissing(domainId);
    }

    const connextAddress = await this.getDeploymentAddress(domainId, "connext");

    let providerURL = options?.originProviderUrl ?? options?.originProviderUrl;

    if (!providerURL && options?.chains) {
      Object.keys(options.chains).forEach((domain) => {
        if (domain !== domainId) {
          return;
        }
        providerURL = options.chains?.[domain].providers?.[0];
      });
    }

    const provider = providerURL
      ? new providers.StaticJsonRpcProvider(providerURL)
      : await this.getProvider(domainId);

    return Connext__factory.connect(connextAddress, provider);
  }

  async getERC20(domainId: string, tokenAddress: string, options?: Options): Promise<IERC20> {
    const isProviderValid = await this.providerSanityCheck({ domains: [domainId], options });
    if (!isProviderValid) {
      throw new ProviderMissing(domainId);
    }

    let providerURL = options?.originProviderUrl ?? options?.originProviderUrl;

    if (!providerURL && options?.chains) {
      Object.keys(options.chains).forEach((domain) => {
        if (domain !== domainId) {
          return;
        }
        providerURL = options.chains?.[domain].providers?.[0];
      });
    }

    const provider = providerURL ? new providers.StaticJsonRpcProvider(providerURL) : await this.getProvider(domainId);

    return IERC20__factory.connect(tokenAddress, provider);
  }

  async getXERC20Registry(domainId: string, options?: Options): Promise<ethers.Contract> {
    try {
      const isProviderValid = await this.providerSanityCheck({ domains: [domainId], options });
      if (!isProviderValid) {
        throw new ProviderMissing(domainId);
      }

      let providerURL = options?.originProviderUrl ?? options?.originProviderUrl;

      if (!providerURL && options?.chains) {
        Object.keys(options.chains).forEach((domain) => {
          if (domain !== domainId) {
            return;
          }
          providerURL = options.chains?.[domain].providers?.[0];
        });
      }

      const provider = providerURL
        ? new providers.StaticJsonRpcProvider(providerURL)
        : await this.getProvider(domainId);

      const XERC20REGISTRY_ADDRESS = XERC20REGISTRY_DOMAIN_ADDRESS[domainId];

      if (!XERC20REGISTRY_ADDRESS) {
        throw new Error("Registry not deployed on given domain");
      }
      return new ethers.Contract(XERC20REGISTRY_ADDRESS, XERC20RegistryAbi, provider);
    } catch (err: any) {
      throw new Error("Failed to get XERC20 registry Contract");
    }
  }

  async isXERC20WithLockbox(domainId: string, tokenAddress: string, options?: Options): Promise<boolean> {
    try {
      let isLockboxAsset = false;
      // Checking if given asset is erc20 and have a xERC20 representation
      const xerc20Registry = await this.getXERC20Registry(domainId, options);
      const [isXERC20] = await xerc20Registry.isXERC20(tokenAddress);

      if (!isXERC20) {
        try {
          const [xerc20] = await xerc20Registry.getXERC20(tokenAddress);
          if (xerc20) {
            isLockboxAsset = true;
          }
        } catch (err: any) {
          this.logger.info("Asset not registered");
        }
      }
      return isLockboxAsset;
    } catch (err: any) {
      return false;
    }
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
    const { requestContext, methodContext } = createLoggingContext(this.approveIfNeeded.name);

    const isProviderValid = await this.providerSanityCheck({ domains: [domainId], options });
    if (!isProviderValid) {
      throw new ProviderMissing(domainId);
    }

    const _signerAddress = options?.signerAddress ?? this.config.signerAddress;
    this.logger.info("Method start", requestContext, methodContext, {
      domainId,
      assetId,
      amount,
      _signerAddress,
    });

    if (!_signerAddress) {
      throw new SignerAddressMissing();
    }

    this.logger.info("isXERC20WithLockbox", requestContext, methodContext, {
      domainId,
      assetId,
      amount,
      _signerAddress,
    });
    const isValidAsset = await this.isXERC20WithLockbox(domainId, assetId, options);
    const LOCKBOX_ADAPTER_ADDRESS = LOCKBOX_ADAPTER_DOMAIN_ADDRESS[domainId];

    if (isValidAsset && !LOCKBOX_ADAPTER_ADDRESS) {
      throw new Error("Lockbox adapter not deployed on given domain");
    }

    const connextContractAddress = isValidAsset
      ? LOCKBOX_ADAPTER_ADDRESS
      : (await this.getConnext(domainId, options)).address;

    const erc20Contract = await this.getERC20(domainId, assetId, options);

    if (assetId !== constants.AddressZero) {
      const approved = await erc20Contract.allowance(_signerAddress, connextContractAddress);

      if (BigNumber.from(approved).lt(amount)) {
        const approveData = erc20Contract.populateTransaction.approve(
          connextContractAddress,
          infiniteApprove ?? true ? constants.MaxUint256 : amount,
        );
        return approveData;
      } else {
        this.logger.info("Allowance sufficient", requestContext, methodContext, {
          approved: approved.toString(),
          amount,
        });
        return undefined;
      }
    }
    return undefined;
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
