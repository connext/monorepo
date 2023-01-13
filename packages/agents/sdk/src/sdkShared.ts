import { constants, providers, BigNumber, utils } from "ethers";
import {
  Logger,
  createLoggingContext,
  ChainData,
  getCanonicalHash,
  formatUrl,
  getChainIdFromDomain,
} from "@connext/nxtp-utils";
import { getContractInterfaces, ConnextContractInterfaces } from "@connext/nxtp-txservice";
import { Connext, Connext__factory, IERC20, IERC20__factory } from "@connext/nxtp-contracts";
import memoize from "memoizee";

import { parseConnextLog, validateUri, axiosGetRequest } from "./lib/helpers";
import { AssetData } from "./interfaces";
import { SignerAddressMissing, ContractAddressMissing } from "./lib/errors";
import { NxtpSdkConfig, domainsToChainNames, ChainDeployments } from "./config";

/**
 * @classdesc SDK class encapsulating shared logic to be inherited.
 *
 */
export class NxtpSdkShared {
  readonly config: NxtpSdkConfig;
  readonly chainData: Map<string, ChainData>;
  readonly contracts: ConnextContractInterfaces;
  protected readonly logger: Logger;

  constructor(config: NxtpSdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    this.config = config;
    this.logger = logger;
    this.chainData = chainData;
    this.contracts = getContractInterfaces();
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
  async getAssetsData(): Promise<AssetData[]> {
    const uri = formatUrl(this.config.cartographerUrl!, "assets");
    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
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

  async getCanonicalTokenId(domainId: string, tokenAddress: string): Promise<[string, string]> {
    const connextContract = await this.getConnext(domainId);
    const tokenId = await connextContract.getTokenId(tokenAddress);

    return [tokenId.domain.toString(), tokenId.id];
  }
}
