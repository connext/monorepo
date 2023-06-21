import { providers } from "ethers";
import { Logger, ChainData } from "@connext/nxtp-utils";

import type { SdkConfig, Options } from "./sdk-types";
import { axiosPost } from "./mockable";
import { SdkShared } from "./sdkShared";

/**
 * @classdesc Class that wraps all async SdkRouter functions with requests to hosted server.
 *
 */
export class SdkRouter extends SdkShared {
  private static _instance: SdkRouter;

  constructor(config: SdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    super(config, logger, chainData);
  }

  static async create(_config: SdkConfig, _logger?: Logger, _chainData?: Map<string, ChainData>): Promise<SdkRouter> {
    const logger = _logger ? _logger.child({ name: "SdkRouter" }) : new Logger({ name: "SdkRouter" });

    return (this._instance = new SdkRouter(_config, logger, _chainData || new Map<string, ChainData>()));
  }

  async addLiquidityForRouter(params: {
    domainId: string;
    amount: string;
    tokenAddress: string;
    router: string;
    options?: Options;
  }): Promise<providers.TransactionRequest> {
    const _options = params.options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };

    const response = await axiosPost(`${this.baseUri}/addLiquidityForRouter`, { ...params, options: _options });
    return response.data;
  }

  async removeRouterLiquidity(params: {
    domainId: string;
    amount: string;
    tokenAddress: string;
    recipient: string;
    options?: Options;
  }): Promise<providers.TransactionRequest> {
    const _options = params.options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };

    const response = await axiosPost(`${this.baseUri}/removeRouterLiquidity`, { ...params, options: _options });
    return response.data;
  }

  async removeRouterLiquidityFor(params: {
    domainId: string;
    amount: string;
    tokenAddress: string;
    recipient: string;
    router: string;
    options?: Options;
  }): Promise<providers.TransactionRequest> {
    const _options = params.options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };

    const response = await axiosPost(`${this.baseUri}/removeRouterLiquidityFor`, { ...params, options: _options });
    return response.data;
  }
}
