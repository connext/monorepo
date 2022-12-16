import { providers } from "ethers";
import { Logger, createLoggingContext, ChainData } from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";

import { getChainData } from "./lib/helpers";
import { SignerAddressMissing, ChainDataUndefined } from "./lib/errors";
import { NxtpSdkShared } from "./sdkShared";
import { NxtpSdkConfig, getConfig } from "./config";

/**
 * @classdesc SDK class encapsulating router functions.
 *
 */
export class NxtpSdkRouter extends NxtpSdkShared {
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
    domainId: string;
    amount: string;
    tokenAddress: string;
    router: string;
  }): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.addLiquidityForRouter.name);
    this.logger.info("Method start", requestContext, methodContext, { params });
    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const { domainId, amount, tokenAddress, router } = params;

    const connextContract = await this.getConnext(domainId);
    const txRequest = await connextContract.populateTransaction.addRouterLiquidityFor(amount, tokenAddress, router);

    this.logger.info(
      `${this.addLiquidityForRouter.name} transaction created`,
      requestContext,
      methodContext,
      txRequest,
    );

    return txRequest;
  }

  async removeRouterLiquidity(params: {
    domainId: string;
    amount: string;
    tokenAddress: string;
    recipient: string;
  }): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.removeRouterLiquidity.name);
    this.logger.info("Method start", requestContext, methodContext, { params });
    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const { domainId, amount, tokenAddress, recipient } = params;

    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);

    const txRequest = await connextContract.populateTransaction.removeRouterLiquidity(
      { domain: canonicalDomain, id: canonicalId },
      amount,
      recipient,
    );

    this.logger.info(
      `${this.removeRouterLiquidity.name} transaction created`,
      requestContext,
      methodContext,
      txRequest,
    );

    return txRequest;
  }
}
