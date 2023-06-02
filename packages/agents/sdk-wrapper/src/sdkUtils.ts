import { utils, BigNumber } from "ethers";
import {
  Logger,
  ChainData,
  formatUrl,
  XTransferStatus,
  transfersCastForUrl,
  XTransferErrorStatus,
  axiosGet,
  axiosPost,
} from "@connext/nxtp-utils";

import { SdkConfig, RouterBalance } from "@connext/sdk-core";
import { SdkShared } from "./sdkShared";

/**
 * @classdesc SDK class encapsulating utility functions.
 *
 */
export class SdkUtils extends SdkShared {
  private static _instance: SdkUtils;

  constructor(config: SdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    super(config, logger, chainData);
  }

  static async create(_config: SdkConfig, _logger?: Logger, _chainData?: Map<string, ChainData>): Promise<SdkUtils> {
    const logger = _logger ? _logger.child({ name: "SdkUtils" }) : new Logger({ name: "SdkUtils" });

    return (this._instance = new SdkUtils(_config, logger, _chainData || new Map()));
  }

  async getRoutersData(params?: {
    order?: { orderBy?: string; ascOrDesc?: "asc" | "desc" };
  }): Promise<RouterBalance[]> {
    const response = await axiosPost(`${this.baseUri}/getRoutersData`, params);

    return response.data;
  }

  async getRouterLiquidity(params?: { order?: { orderBy?: string; ascOrDesc?: "asc" | "desc" } }): Promise<any> {
    const response = await axiosPost(`${this.baseUri}/getRouterLiquidity`, params);

    return response.data;
  }

  async getTransfers(params?: {
    userAddress?: string;
    routerAddress?: string;
    status?: XTransferStatus;
    errorStatus?: XTransferErrorStatus;
    transferId?: string;
    transactionHash?: string;
    xcallCaller?: string;
    range?: { limit?: number; offset?: number };
  }): Promise<any> {
    const response = await axiosPost(`${this.baseUri}/getTransfers`, params);

    return response.data;
  }

  async checkRouterLiquidity(domainId: string, asset: string, topN?: number): Promise<BigNumber> {
    const response = await axiosPost(`${this.baseUri}/checkRouterLiquidity`, params);

    return response.data;
  }
}
