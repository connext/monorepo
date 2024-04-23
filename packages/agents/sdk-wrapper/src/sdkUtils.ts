import { BigNumber, BigNumberish } from "ethers";
import { Logger, ChainData, XTransferStatus, XTransferErrorStatus } from "@connext/nxtp-utils";

import type { SdkConfig, RouterBalance, Transfer } from "./sdk-types";
import { axiosPost } from "./mockable";
import { SdkShared } from "./sdkShared";

/**
 * @classdesc Class that wraps all async SdkUtils functions with requests to hosted server.
 *
 */
export class SdkUtils extends SdkShared {
  private static _instance: SdkUtils;

  constructor(config: SdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    super(config, logger, chainData);
  }

  static async create(_config: SdkConfig, _logger?: Logger, _chainData?: Map<string, ChainData>): Promise<SdkUtils> {
    const logger = _logger ? _logger.child({ name: "SdkUtils" }) : new Logger({ name: "SdkUtils" });

    return (this._instance = new SdkUtils(_config, logger, _chainData || new Map<string, ChainData>()));
  }

  async getRoutersData(params?: {
    order?: { orderBy?: string; ascOrDesc?: "asc" | "desc" };
    limit?: number;
  }): Promise<RouterBalance[]> {
    const response = await axiosPost(`${this.baseUri}/getRoutersData`, params ?? {});
    return response.data;
  }

  async getRouterLiquidity(params?: { order?: { orderBy?: string; ascOrDesc?: "asc" | "desc" } }): Promise<any> {
    const response = await axiosPost(`${this.baseUri}/getRouterLiquidity`, params ?? {});
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
  }): Promise<Transfer[]> {
    const response = await axiosPost(`${this.baseUri}/getTransfers`, params ?? {});
    return response.data;
  }

  async checkRouterLiquidity(domainId: string, asset: string, topN?: number): Promise<BigNumber> {
    const params: { domainId: string; asset: string; topN?: number } = {
      domainId,
      asset,
      topN,
    };
    const response = await axiosPost(`${this.baseUri}/checkRouterLiquidity`, params);

    return BigNumber.from(response.data);
  }

  async enoughRouterLiquidity(
    domainId: string, 
    asset: string, 
    minLiquidity: BigNumberish, 
    maxN?: number
  ): Promise<BigNumber> {
    const params: { domainId: string; asset: string; minLiquidity: BigNumberish, maxN?: number } = {
      domainId,
      asset,
      minLiquidity,
      maxN
    };
    const response = await axiosPost(`${this.baseUri}/enoughRouterLiquidity`, params);

    return BigNumber.from(response.data);
  }

  async getLatestAssetPrice(domainId: string, asset: string): Promise<BigNumber> {
    const params: { domainId: string; asset: string } = {
      domainId,
      asset,
    };
    const response = await axiosPost(`${this.baseUri}/getLatestAssetPrice`, params);

    return BigNumber.from(response.data);
  }
}
