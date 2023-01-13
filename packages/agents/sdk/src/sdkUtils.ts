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

  async getTransfers(params: {
    userAddress?: string;
    routerAddress?: string;
    status?: XTransferStatus;
    transferId?: string;
    transactionHash?: string;
    range?: { limit?: number; offset?: number };
  }): Promise<any> {
    const { userAddress, routerAddress, status, transferId, transactionHash, range } = params;

    const userIdentifier = userAddress ? `xcall_tx_origin=eq.${userAddress.toLowerCase()}&` : "";
    const routerIdentifier = routerAddress ? `routers=cs.%7B${routerAddress.toLowerCase()}%7D&` : "";
    const statusIdentifier = status ? `status=eq.${status}&` : "";
    const transferIdIdentifier = transferId ? `transfer_id=eq.${transferId.toLowerCase()}&` : "";
    const transactionHashIdentifier = transactionHash
      ? `xcall_transaction_hash=eq.${transactionHash.toLowerCase()}&`
      : "";

    const searchIdentifier =
      userIdentifier + routerIdentifier + statusIdentifier + transferIdIdentifier + transactionHashIdentifier;

    const limit = range?.limit ? range.limit : 10;
    const offset = range?.offset ? range.offset : 0;

    const rangeIdentifier = `limit=${limit}&offset=${offset}&`;
    const orderIdentifier = `order=xcall_timestamp.desc`;

    const uri = formatUrl(
      this.config.cartographerUrl!,
      "transfers?",
      searchIdentifier + rangeIdentifier + orderIdentifier + `&${transfersCastForUrl}`,
    );

    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }
}
