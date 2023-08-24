import { Logger, createLoggingContext, ChainData } from "@connext/nxtp-utils";
import { providers, BigNumber, BigNumberish } from "ethers";

import type {
  SdkConfig,
  SdkXCallParams,
  SdkBumpTransferParams,
  SdkUpdateSlippageParams,
  SdkEstimateRelayerFeeParams,
} from "./sdk-types";
import { axiosPost } from "./mockable";
import { SdkShared } from "./sdkShared";

export class SdkBase extends SdkShared {
  private static _instance: SdkBase;

  constructor(config: SdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    super(config, logger, chainData);
  }

  static async create(_config: SdkConfig, _logger?: Logger, _chainData?: Map<string, ChainData>): Promise<SdkBase> {
    const logger = _logger ? _logger.child({ name: "SdkBase" }) : new Logger({ name: "SdkBase" });

    return (this._instance = new SdkBase(_config, logger, _chainData || new Map<string, ChainData>()));
  }

  async xcall(params: SdkXCallParams): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.xcall.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    const _options = params.options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };

    const response = await axiosPost(`${this.baseUri}/xcall`, { ...params, options: _options });
    return response.data;
  }

  async updateSlippage(params: SdkUpdateSlippageParams): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.updateSlippage.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    const _options = params.options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };

    const response = await axiosPost(`${this.baseUri}/updateSlippage`, { ...params, options: _options });
    return response.data;
  }

  async bumpTransfer(params: SdkBumpTransferParams): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.bumpTransfer.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    const _options = params.options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };

    const response = await axiosPost(`${this.baseUri}/bumpTransfer`, { ...params, options: _options });
    return response.data;
  }

  async estimateRelayerFee(params: SdkEstimateRelayerFeeParams): Promise<BigNumber> {
    const { requestContext, methodContext } = createLoggingContext(this.estimateRelayerFee.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    const response = await axiosPost(`${this.baseUri}/estimateRelayerFee`, params);
    if (response.status !== 200) {
      throw new Error(`Error calling estimateRelayerFee: ${response.status} ${response.statusText}`);
    }

    return BigNumber.from(response.data);
  }

  async calculateAmountReceived(
    originDomain: string,
    destinationDomain: string,
    originTokenAddress: string,
    amount: BigNumberish,
    receiveLocal = false,
    checkFastLiquidity = false,
  ): Promise<{
    amountReceived: BigNumberish;
    originSlippage: BigNumberish;
    routerFee: BigNumberish;
    destinationSlippage: BigNumberish;
    isFastPath: boolean;
  }> {
    const params = {
      originDomain,
      destinationDomain,
      originTokenAddress,
      amount,
      receiveLocal,
      checkFastLiquidity,
    };

    const response = await axiosPost(`${this.baseUri}/calculateAmountReceived`, params);
    const data = response.data;

    return {
      amountReceived: BigNumber.from(data.amountReceived),
      originSlippage: BigNumber.from(data.originSlippage),
      routerFee: BigNumber.from(data.routerFee),
      destinationSlippage: BigNumber.from(data.destinationSlippage),
      isFastPath: data.isFastPath,
    };
  }
}
