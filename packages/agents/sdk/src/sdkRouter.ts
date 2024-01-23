import { providers } from "ethers";
import { Logger, createLoggingContext, ChainData } from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";

import { SignerAddressMissing, ProviderMissing } from "./lib/errors";
import { SdkShared } from "./sdkShared";
import { SdkConfig, getConfig } from "./config";
import { Options } from "./interfaces";

/**
 * @classdesc SDK class encapsulating router functions.
 *
 */
export class SdkRouter extends SdkShared {
  private static _instance: SdkRouter;

  constructor(config: SdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    super(config, logger, chainData);
  }

  /**
   * Create a singleton instance of the SdkRouter class.
   *
   * @param _config - SdkConfig object.
   * @param _config.chains - Chain config, at minimum with providers for each chain.
   * @param _config.signerAddress - Signer address for transactions.
   * @param _config.logLevel - (optional) Logging severity level.
   * @param _config.network - (optional) Blockchain environment to interact with.
   * @returns providers.TransactionRequest object.
   *
   * @example:
   * ```ts
   * import { SdkRouter } from "@connext/sdk";
   *
   * const config = {
   *   "chains": {
   *     "6648936": {
   *       "providers": ["https://rpc.ankr.com/eth"]
   *     },
   *     "1869640809": {
   *       "providers": ["https://mainnet.optimism.io"]
   *     },
   *     "1886350457": {
   *       "providers": ["https://polygon-rpc.com"]
   *     },
   *   },
   *   "signerAddress": "<wallet_address>",
   * }
   *
   * const SdkRouter = await SdkRouter.create(config);
   * ```
   */
  static async create(_config: SdkConfig, _logger?: Logger, _chainData?: Map<string, ChainData>): Promise<SdkRouter> {
    const { nxtpConfig, chainData } = await getConfig(_config, contractDeployments, _chainData);
    const logger = _logger
      ? _logger.child({ name: "SdkRouter" })
      : new Logger({ name: "SdkRouter", level: nxtpConfig.logLevel });

    return (this._instance = new SdkRouter(nxtpConfig, logger, chainData));
  }

  /**
   * Returns the transaction request for adding liquidity to a router.
   *
   * @param params - addLiquidityForRouter parameters object.
   * @param params.domainId - The domain ID.
   * @param params.amount - The amount of the token to add.
   * @param params.tokenAddress - The address of the token.
   * @param params.router - The address of the router.
   * @returns providers.TransactionRequest object.
   */
  async addLiquidityForRouter(params: {
    domainId: string;
    amount: string;
    tokenAddress: string;
    router: string;
    options?: Options;
  }): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.addLiquidityForRouter.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    const { domainId, amount, tokenAddress, router, options } = params;

    const isProviderValid = await this.providerSanityCheck({ domains: [domainId], options });
    if (!isProviderValid) {
      throw new ProviderMissing(domainId);
    }

    const connextContract = await this.getConnext(domainId, options);
    const txRequest = await connextContract.populateTransaction.addRouterLiquidityFor(amount, tokenAddress, router);

    this.logger.info(
      `${this.addLiquidityForRouter.name} transaction created`,
      requestContext,
      methodContext,
      txRequest,
    );

    return txRequest;
  }

  /**
   * Returns the transaction request for removing liquidity from a router.
   *
   * @remarks
   * This function is permissioned to the router owner only.
   *
   * @param params - removeRouterLiquidity parameters object.
   * @param params.domainId - The domain ID.
   * @param params.amount - The amount of the token to add.
   * @param params.tokenAddress - The address of the token.
   * @param params.recipient - The address where the removed funds will be delivered.
   * @returns providers.TransactionRequest object.
   */
  async removeRouterLiquidity(params: {
    domainId: string;
    amount: string;
    tokenAddress: string;
    recipient: string;
    options?: Options;
  }): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.removeRouterLiquidity.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    const { domainId, amount, tokenAddress, recipient, options } = params;

    const isProviderValid = await this.providerSanityCheck({ domains: [domainId], options });
    if (!isProviderValid) {
      throw new ProviderMissing(domainId);
    }

    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId, options),
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

  async removeRouterLiquidityFor(params: {
    domainId: string;
    amount: string;
    tokenAddress: string;
    recipient: string;
    router: string;
    options?: Options;
  }): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.removeRouterLiquidityFor.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    const { domainId, amount, tokenAddress, recipient, router, options } = params;

    const isProviderValid = await this.providerSanityCheck({ domains: [domainId], options });
    if (!isProviderValid) {
      throw new ProviderMissing(domainId);
    }

    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId, options),
      this.getCanonicalTokenId(domainId, tokenAddress),
    ]);

    const txRequest = await connextContract.populateTransaction.removeRouterLiquidityFor(
      { domain: canonicalDomain, id: canonicalId },
      amount,
      recipient,
      router,
    );

    this.logger.info(
      `${this.removeRouterLiquidityFor.name} transaction created`,
      requestContext,
      methodContext,
      txRequest,
    );

    return txRequest;
  }
}
