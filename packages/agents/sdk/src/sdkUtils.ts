import { Logger, ChainData, formatUrl, XTransferStatus, transfersCastForUrl } from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";

import { getChainData, validateUri, axiosGetRequest } from "./lib/helpers";
import { ChainDataUndefined } from "./lib/errors";
import { NxtpSdkConfig, getConfig } from "./config";
import { NxtpSdkShared } from "./sdkShared";

/**
 * @classdesc SDK class encapsulating utility functions.
 *
 */
export class NxtpSdkUtils extends NxtpSdkShared {
  private static _instance: NxtpSdkUtils;

  constructor(config: NxtpSdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    super(config, logger, chainData);
  }

  static async create(
    _config: NxtpSdkConfig,
    _logger?: Logger,
    _chainData?: Map<string, ChainData>,
  ): Promise<NxtpSdkUtils> {
    const chainData = _chainData ?? (await getChainData());
    if (!chainData) {
      throw new ChainDataUndefined();
    }

    const nxtpConfig = await getConfig(_config, contractDeployments, chainData);
    const logger = _logger
      ? _logger.child({ name: "NxtpSdkUtils" })
      : new Logger({ name: "NxtpSdkUtils", level: nxtpConfig.logLevel });

    return this._instance || (this._instance = new NxtpSdkUtils(nxtpConfig, logger, chainData));
  }

  async getRoutersData(): Promise<any> {
    const uri = formatUrl(this.config.cartographerUrl!, "routers_with_balances");
    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }

  async getTransfersByUser(params: {
    userAddress: string;
    status?: XTransferStatus;
    range?: { limit?: number; offset?: number };
  }): Promise<any> {
    const { userAddress, status, range } = params;

    const userIdentifier = `xcall_tx_origin=eq.${userAddress.toLowerCase()}&`;
    const statusIdentifier = status ? `status=eq.${status}` : "";

    const searchIdentifier = userIdentifier + statusIdentifier;

    const limit = range?.limit ? range.limit : 10;
    const offset = range?.offset ? range.offset : 0;

    const rangeIdentifier = `&limit=${limit}&offset=${offset}`;
    const orderIdentifier = `&order=xcall_timestamp.desc`;

    const uri = formatUrl(
      this.config.cartographerUrl!,
      "transfers?",
      searchIdentifier + rangeIdentifier + orderIdentifier + `&${transfersCastForUrl}`,
    );

    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }

  async getTransfers(params: { range?: { limit?: number; offset?: number } }): Promise<any> {
    const { range } = params;

    const limit = range?.limit ? range.limit : 10;
    const offset = range?.offset ? range.offset : 0;

    const rangeIdentifier = `limit=${limit}&offset=${offset}`;
    const orderIdentifier = `&order=xcall_timestamp.desc`;

    const uri = formatUrl(
      this.config.cartographerUrl!,
      "transfers?",
      rangeIdentifier + orderIdentifier + `&${transfersCastForUrl}`,
    );

    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }

  async getTransfersByStatus(params: {
    status: XTransferStatus;
    range?: { limit?: number; offset?: number };
  }): Promise<any> {
    const { status, range } = params;

    const statusIdentifier = `status=eq.${status}`;

    const limit = range?.limit ? range.limit : 10;
    const offset = range?.offset ? range.offset : 0;

    const rangeIdentifier = `&limit=${limit}&offset=${offset}`;
    const orderIdentifier = `&order=xcall_timestamp.desc`;

    const uri = formatUrl(
      this.config.cartographerUrl!,
      "transfers?",
      statusIdentifier + rangeIdentifier + orderIdentifier + `&${transfersCastForUrl}`,
    );

    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }

  async getTransfersByRouter(params: {
    routerAddress: string;
    status?: XTransferStatus;
    range?: { limit?: number; offset?: number };
  }): Promise<any> {
    const { routerAddress, status, range } = params;

    const routerIdentifier = `routers=cs.%7B${routerAddress.toLowerCase()}%7D&`;
    const statusIdentifier = status ? `status=eq.${status}` : "";

    const searchIdentifier = routerIdentifier + statusIdentifier;

    const limit = range?.limit ? range.limit : 10;
    const offset = range?.offset ? range.offset : 0;

    const rangeIdentifier = `&limit=${limit}&offset=${offset}`;
    const orderIdentifier = `&order=xcall_timestamp.desc`;

    const uri = formatUrl(
      this.config.cartographerUrl!,
      "transfers?",
      searchIdentifier + rangeIdentifier + orderIdentifier + `&${transfersCastForUrl}`,
    );

    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }

  async getTransferById(transferId: string): Promise<any> {
    const uri = formatUrl(
      this.config.cartographerUrl!,
      "transfers?",
      `transfer_id=eq.${transferId.toLowerCase()}&${transfersCastForUrl}`,
    );
    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }

  async getTransferByTransactionHash(transactionHash: string): Promise<any> {
    const uri = formatUrl(
      this.config.cartographerUrl!,
      "transfers?",
      `xcall_transaction_hash=eq.${transactionHash.toLowerCase()}&${transfersCastForUrl}`,
    );

    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }
}
