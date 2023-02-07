import { constants, providers, BigNumber, utils } from "ethers";
import { Logger, createLoggingContext, ChainData, getCanonicalHash, formatUrl } from "@connext/nxtp-utils";
import { getContractInterfaces, ConnextContractInterfaces, ChainReader } from "@connext/nxtp-txservice";
import { Connext, Connext__factory, IERC20, IERC20__factory } from "@connext/smart-contracts";
import memoize from "memoizee";

import { parseConnextLog, validateUri, axiosGetRequest, getChainIdFromDomain } from "./lib/helpers";
import { AssetData, ConnextSupport } from "./interfaces";
import { SignerAddressMissing, ContractAddressMissing } from "./lib/errors";
import { SdkConfig, domainsToChainNames, ChainDeployments } from "./config";

/**
 * @classdesc SDK class encapsulating shared logic to be inherited.
 *
 */
export class SdkShared {
  readonly config: SdkConfig;
  readonly chainData: Map<string, ChainData>;
  readonly contracts: ConnextContractInterfaces;
  protected readonly chainreader: ChainReader;
  protected readonly logger: Logger;

  constructor(config: SdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    this.config = config;
    this.logger = logger;
    this.chainData = chainData;
    this.contracts = getContractInterfaces();
    this.chainreader = new ChainReader(logger.child({ module: "ChainReader" }, this.config.logLevel), config.chains);
  }

  /**
   * Returns the provider specified in the SDK configuration for a specific domain.
   *
   * @param domainId - The domain ID.
   * @returns providers.StaticJsonRpcProvider object.
   */
  getProvider = memoize((domainId: string): providers.StaticJsonRpcProvider => {
    return new providers.StaticJsonRpcProvider(this.config.chains[domainId].providers[0]);
  });

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
    async (domainId: string): Promise<Connext> => {
      const connextAddress = await this.getDeploymentAddress(domainId, "connext");

      const provider = this.getProvider(domainId);
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
  getERC20 = memoize(
    async (domainId: string, tokenAddress: string): Promise<IERC20> => {
      const provider = this.getProvider(domainId);
      return IERC20__factory.connect(tokenAddress, provider);
    },
    { promise: true },
  );

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
        chainId = await getChainIdFromDomain(domainId, this.chainData);
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
    infiniteApprove = true,
  ): Promise<providers.TransactionRequest | undefined> {
    const { requestContext, methodContext } = createLoggingContext(this.approveIfNeeded.name);

    const signerAddress = this.config.signerAddress;
    this.logger.info("Method start", requestContext, methodContext, {
      domainId,
      assetId,
      amount,
      signerAddress,
    });

    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const connextContract = await this.getConnext(domainId);
    const erc20Contract = await this.getERC20(domainId, assetId);

    if (assetId !== constants.AddressZero) {
      const approved = await erc20Contract.allowance(signerAddress, connextContract.address);

      if (BigNumber.from(approved).lt(amount)) {
        const approveData = erc20Contract.populateTransaction.approve(
          connextContract.address,
          infiniteApprove ? constants.MaxUint256 : amount,
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
          chainId: await getChainIdFromDomain(asset.domain),
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

    if (asset) {
      return asset;
    }

    return;
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

    if (asset) {
      return asset;
    }

    return;
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

    if (asset) {
      return utils.getAddress(asset.local) == tokenAddress ? true : false;
    }

    return;
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

    if (asset) {
      return [asset.canonical_domain, asset.canonical_id];
    }

    return ["0", constants.HashZero];
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
