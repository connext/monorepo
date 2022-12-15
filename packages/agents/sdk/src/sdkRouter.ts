import { constants, providers, BigNumber } from "ethers";
import { Logger, createLoggingContext, ChainData } from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";

import { getChainData, getChainIdFromDomain } from "./lib/helpers";
import { SignerAddressMissing, ChainDataUndefined } from "./lib/errors";
import { NxtpSdkBase } from "./sdkBase";
import { NxtpSdkConfig, getConfig } from "./config";

/**
 * @classdesc SDK class encapsulating router functions.
 *
 */
export class NxtpSdkRouter extends NxtpSdkBase {
  private static _instance: NxtpSdkRouter;

  constructor(config: NxtpSdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    super(config, logger, chainData);
  }

  static async create(
    _config: NxtpSdkConfig,
    _logger?: Logger,
    _chainData?: Map<string, ChainData>,
  ): Promise<NxtpSdkRouter> {
    const chainData = _chainData ?? (await getChainData());
    if (!chainData) {
      throw new ChainDataUndefined();
    }

    const nxtpConfig = await getConfig(_config, contractDeployments, chainData);
    const logger = _logger
      ? _logger.child({ name: "NxtpSdkRouter" })
      : new Logger({ name: "NxtpSdkRouter", level: nxtpConfig.logLevel });

    return this._instance || (this._instance = new NxtpSdkRouter(nxtpConfig, logger, chainData));
  }

  async addLiquidityForRouter(params: {
    domain: string;
    amount: string;
    assetId: string;
    router: string;
  }): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.addLiquidityForRouter.name);
    this.logger.info("Method start", requestContext, methodContext, { params });
    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const { domain, amount, assetId, router } = params;

    const chainId = await getChainIdFromDomain(domain, this.chainData);
    const ConnextContractAddress = this.config.chains[domain].deployments!.connext;

    const value = assetId === constants.AddressZero ? BigNumber.from(amount) : 0;
    const data = this.contracts.connext.encodeFunctionData("addRouterLiquidityFor", [amount, assetId, router]);

    const txRequest = {
      to: ConnextContractAddress,
      value,
      data,
      from: signerAddress,
      chainId,
    };

    this.logger.info(
      `${this.addLiquidityForRouter.name} transaction created`,
      requestContext,
      methodContext,
      txRequest,
    );

    return txRequest;
  }
}
