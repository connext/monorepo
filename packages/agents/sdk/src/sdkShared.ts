import { constants, providers, BigNumber, utils } from "ethers";
import {
  Logger,
  createLoggingContext,
  ChainData,
  getCanonicalHash,
  formatUrl,
  chainIdToDomain as _chainIdToDomain,
  domainToChainId as _domainToChainId,
  getConversionRate as _getConversionRate,
} from "@connext/nxtp-utils";
import { getContractInterfaces, ConnextContractInterfaces, ChainReader } from "@connext/nxtp-txservice";
import { Connext, Connext__factory, IERC20, IERC20__factory } from "@connext/smart-contracts";
import memoize from "memoizee";

import { parseConnextLog, validateUri, axiosGetRequest } from "./lib/helpers";
import { AssetData, ConnextSupport, Options, ProviderSanityCheck } from "./interfaces";
import { SignerAddressMissing, ContractAddressMissing, ProviderMissing } from "./lib/errors";
import { SdkConfig, domainsToChainNames, ChainDeployments } from "./config";

declare global {
  interface Window {
    ethereum?: providers.ExternalProvider;
    web3?: {
      currentProvider: providers.ExternalProvider;
    };
  }
}

declare const window: Window;

/**
 * @classdesc SDK class encapsulating shared logic to be inherited.
 *
 */
export class SdkShared {
  readonly config: SdkConfig;
  readonly chainData: Map<string, ChainData>;
  readonly contracts: ConnextContractInterfaces;
  protected readonly chainreader: ChainReader;
  readonly logger: Logger;

  constructor(config: SdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    this.config = config;
    this.logger = logger;
    this.chainData = chainData;
    this.contracts = getContractInterfaces();
    this.chainreader = new ChainReader(logger.child({ module: "ChainReader" }, this.config.logLevel), config.chains);
  }

  getConversionRate = memoize(
    async (chainId: number) => {
      return await _getConversionRate(chainId, undefined, undefined);
    },
    { promise: true, maxAge: 1 * 60 * 1000 }, // maxAge: 1 min
  );

  /**
   * Returns the provider specified in the SDK configuration for a specific domain.
   * If a web3 provider is detected in a browser environment that matches the requested domain, it will be used instead.
   *
   * @param domainId - The domain ID.
   * @returns providers.StaticJsonRpcProvider object.
   */
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

  /**
   * Checks if at least one provider is configured for all given domains.
   *
   * @param domainId - The domain ID.
   * @returns Boolean.
   */
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

  getDeploymentAddress = memoize(
    async (domainId: string, deploymentName: keyof ChainDeployments): Promise<string> => {
      const address = this.config.chains[domainId]?.deployments?.[deploymentName];
      if (!address) {
        throw new ContractAddressMissing(domainId, deploymentName);
      }
      return address;
    },
    { promise: true },
  );

  /**
   * Returns the Connext diamond contract for the specified domain.
   *
   * @param domainId - The domain ID.
   * @returns Connext Contract object.
   */
  getConnext = memoize(
    async (domainId: string, options?: Options): Promise<Connext> => {
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
    },
    { promise: true },
  );

  /**
   * Returns the ERC20 contract for the specified domain.
   *
   * @param domainId - The domain ID.
   * @returns ERC20 Contract object.
   */
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

  /**
   * Returns the chain ID for a specified domain.
   *
   * @param domainId - The domain ID.
   * @returns The chain ID.
   */
  getChainId = memoize(
    async (domainId: string): Promise<number> => {
      let chainId = this.config.chains[domainId]?.chainId;
      if (!chainId) {
        chainId = _domainToChainId(+domainId);
      }
      return chainId;
    },
    { promise: true },
  );

  /**
   * Returns the chain name for a specified domain.
   *
   * @param domainId - The domain ID.
   * @returns The chain name.
   */
  static domainToChainName(domainId: string) {
    return domainsToChainNames[domainId];
  }

  /**
   * Returns a domain id for a chain id.
   *
   * @param chainId A chain id number
   * @returns A domain number in number
   */
  static chainIdToDomain(chainId: number): number {
    return _chainIdToDomain(chainId);
  }

  /**
   * Returns a chain id for a domain id
   *
   * @param domainId A domain id number
   * @returns A chain id
   */
  static domainToChainId(domainId: number): number {
    return _domainToChainId(domainId);
  }

  /**
   * Uses an external API to fetch the block number from a unix timestamp.
   *
   * @param domainId - The domain ID.
   * @param unixTimestamp - The unix timestamp.
   * @returns The closest block number.
   */
  static async getBlockNumberFromUnixTimestamp(domainId: string, unixTimestamp: number): Promise<number> {
    const baseUrl = "https://coins.llama.fi";
    const uri = formatUrl(baseUrl, "block");
    const chainName = this.domainToChainName(domainId);
    const res = await axiosGetRequest(uri + `/${chainName}` + `/${unixTimestamp}`);

    return res.height;
  }

  /**
   * Returns the transaction request for an allowance approval.
   *
   * @param domainId - The domain ID.
   * @param assetId - The address of the token.
   * @param amount - The amount of the token.
   * @param infiniteApprove - (optional) Whether to approve an infinite amount.
   * @returns providers.TransactionRequest object.
   */
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

    const connextContract = await this.getConnext(domainId, options);
    const erc20Contract = await this.getERC20(domainId, assetId, options);

    if (assetId !== constants.AddressZero) {
      const approved = await erc20Contract.allowance(_signerAddress, connextContract.address);

      if (BigNumber.from(approved).lt(amount)) {
        const approveData = erc20Contract.populateTransaction.approve(
          connextContract.address,
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

  /**
   * Fetches the list of registered assets.
   *
   * @returns Array of objects containing assets registered to the network, in the form of:
   * ```ts
   * {
   *   "local": "0x2983bf5c334743aa6657ad70a55041d720d225db",
   *   "adopted": "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
   *   "canonical_id": "0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
   *   "canonical_domain": "6648936",
   *   "domain": "1634886255",
   *   "key": "0x12acadfa38ab02479ae587196a9043ee4d8bf52fcb96b7f8d2ba240f03bcd08a",
   *   "id": "0x2983bf5c334743aa6657ad70a55041d720d225db"
   * },
   * ```
   */
  getAssetsData = memoize(
    async (): Promise<AssetData[]> => {
      const uri = formatUrl(this.config.cartographerUrl!, "assets");
      // Validate uri
      validateUri(uri);

      return await axiosGetRequest(uri);
    },
    { promise: true, maxAge: 5 * 60 * 1000 }, // 5 min
  );

  getActiveLiquidity = memoize(
    async (domain?: string, local?: string): Promise<any> => {
      const domainIdentifier = domain ? `domain=eq.${domain.toString()}&` : "";
      const localIdentifier = local ? `local=eq.${local.toLowerCase()}&` : "";

      const searchIdentifier = domainIdentifier + localIdentifier;

      const uri = formatUrl(this.config.cartographerUrl!, "router_liquidity?", searchIdentifier);

      // Validate uri
      validateUri(uri);

      return await axiosGetRequest(uri);
    },
    { promise: true, maxAge: 1 * 60 * 1000 }, // 1 min
  );

  /**
   * Fetches the list of supported networks and assets.
   *
   * @returns Array of objects containing networks and assets supported by the protocol, in the form of:
   * ```ts
   * {
   *   "name": "arbitrum",
   *   "chainId": 42161,
   *   "domainId": "1634886255",
   *   "assets": [
   *     "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
   *     "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
   *   ]
   * },
   * ```
   */
  async getSupported(): Promise<ConnextSupport[]> {
    const data: AssetData[] = await this.getAssetsData();

    const supported: Map<string, ConnextSupport> = new Map();

    for (const asset of data) {
      const support = supported.get(asset.domain);
      if (support) {
        support.assets.push(asset.adopted);
      } else {
        const entry: ConnextSupport = {
          name: domainsToChainNames[asset.domain],
          chainId: _domainToChainId(+asset.domain),
          domainId: asset.domain,
          assets: [asset.adopted],
        };
        supported.set(asset.domain, entry);
      }
    }

    const res = Array.from(supported.values());
    return res;
  }

  /**
   * Retrieve the asset data for a specific domain and address.
   *
   * @param domainId - The domain ID.
   * @param tokenAddress - The local or adopted address.
   * @returns The object containing asset data.
   */
  async getAssetsDataByDomainAndAddress(domainId: string, tokenAddress: string): Promise<AssetData | undefined> {
    const assetsData = await this.getAssetsData();
    const _tokenAddress = utils.getAddress(tokenAddress);

    const asset = assetsData.find((assetData) => {
      return (
        domainId === assetData.domain &&
        (utils.getAddress(assetData.local) == _tokenAddress || utils.getAddress(assetData.adopted) == _tokenAddress)
      );
    });

    return asset;
  }

  /**
   * Retrieve the assets with same canonical id.
   *
   * @param domainId - The domain ID.
   * @param tokenAddress - The local or adopted address.
   * @returns The array of asset data on the other domains with same canonical id.
   */
  async getAssetsWithSameCanonical(domainId: string, tokenAddress: string): Promise<AssetData[]> {
    const assetsData = await this.getAssetsData();
    const _tokenAddress = utils.getAddress(tokenAddress);

    const asset = assetsData.find((assetData) => {
      return (
        domainId === assetData.domain &&
        (utils.getAddress(assetData.local) == _tokenAddress || utils.getAddress(assetData.adopted) == _tokenAddress)
      );
    });

    const otherAssets = assetsData.filter((data) => {
      return asset?.canonical_domain == data.canonical_domain && asset.canonical_id == data.canonical_id;
    });

    return otherAssets;
  }

  /**
   * Retrieve the asset data for a specific domain and key.
   *
   * @param domainId - The domain ID.
   * @param key - The canonical hash of the canonical token.
   * @returns The object containing asset data.
   */
  async getAssetsDataByDomainAndKey(domainId: string, key: string): Promise<AssetData | undefined> {
    const assetsData = await this.getAssetsData();
    const asset = assetsData.find((assetData) => {
      return assetData.domain == domainId && assetData.key == key;
    });

    return asset;
  }

  /**
   * Returns whether the specified token is a Connext-issued (local) token.
   *
   * @param tokenAddress - The address of the token.
   * @returns Boolean or undefined if the specified token is not registered.
   */
  async isNextAsset(tokenAddress: string): Promise<boolean | undefined> {
    const assetsData = await this.getAssetsData();
    const asset = assetsData.find((assetData) => {
      return utils.getAddress(assetData.local) == tokenAddress || utils.getAddress(assetData.adopted) == tokenAddress;
    });

    return asset ? (utils.getAddress(asset.local) == tokenAddress ? true : false) : undefined;
  }

  /**
   * Switches the signer address in the SDK config.
   *
   * @param signerAddress - The new signer address.
   */
  async changeSignerAddress(signerAddress: string) {
    this.config.signerAddress = signerAddress;
  }

  /**
   * Parses a providers.TransactionReceipt for the logs.
   *
   * @param transactionReceipt - providers.TransactionReceipt object.
   * @returns Array of providers.Log objects.
   */
  parseConnextTransactionReceipt(transactionReceipt: providers.TransactionReceipt): any {
    const parsedlogs: any = [];
    transactionReceipt.logs.forEach((log) => {
      parsedlogs.push(parseConnextLog(log));
    });

    return parsedlogs;
  }

  /**
   * Returns the hash of the canonical ID + canonical domain.
   *
   * @remarks
   * This key is used as the unique identifier for a canonical token, across all domains.
   *
   * @param domainId The canonical domain ID of the token.
   * @param canonicalId The canonical ID of the token.
   */
  calculateCanonicalKey(domainId: string, canonicalId: string): string {
    return getCanonicalHash(domainId, canonicalId);
  }

  /**
   * Returns the canonical ID and canonical domain of a token.
   *
   * @param domainId The canonical domain ID of the token.
   * @param tokenAddress The address of the token.
   */
  async getCanonicalTokenId(domainId: string, tokenAddress: string): Promise<[string, string]> {
    const asset = await this.getAssetsDataByDomainAndAddress(domainId, tokenAddress);

    return asset ? [asset.canonical_domain, asset.canonical_id] : ["0", constants.HashZero];
  }

  /**
   * Format an efficient multisend RPC call to get name, symbol, and decimals for a given
   * list of ERC20 tokens.
   * @param domainId
   * @param erc20TokenContracts ethers Contract instances with populated address and interface.
   * @returns ethers utils.Result
   */
  // async getInfoForTokens(domainId: string, erc20TokenContracts: Contract[]): Promise<utils.Result> {
  //   const erc20Iface = getErc20Interface(); // As a backup, in case the interface is not populated correctly.
  //   const txs = erc20TokenContracts
  //     .map((contract) => {
  //       return [
  //         {
  //           to: contract.address,
  //           data: contract.interface.encodeFunctionData("name"),
  //           resultTypes: contract.interface.getFunction("name").outputs ?? erc20Iface.getFunction("name").outputs!,
  //         },
  //         {
  //           to: contract.address,
  //           data: contract.interface.encodeFunctionData("symbol"),
  //           resultTypes: contract.interface.getFunction("symbol").outputs ?? erc20Iface.getFunction("symbol").outputs!,
  //         },
  //         {
  //           to: contract.address,
  //           data: contract.interface.encodeFunctionData("decimals"),
  //           resultTypes:
  //             contract.interface.getFunction("decimals").outputs ?? erc20Iface.getFunction("decimals").outputs!,
  //         },
  //       ];
  //     })
  //     .flat();
  //   return await this.chainreader.multiread({
  //     domain: +domainId,
  //     txs,
  //   });
  // }
}
