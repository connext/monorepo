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

  /**
   * Create a singleton instance of the NxtpSdkRouter class.
   *
   * @param _config - NxtpSdkConfig object.
   * @param _config.chains - Chain config, at minimum with providers for each chain.
   * @param _config.signerAddress - Signer address for transactions.
   * @param _config.logLevel - (optional) One of "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent".
   * @param _config.network - (optional) One of "testnet" | "mainnet".
   * @returns providers.TransactionRequest object.
   *
   * @example:
   * ```ts
   * import { NxtpSdkRouter } from "@connext/nxtp-sdk";
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
   * const NxtpSdkRouter = await NxtpSdkRouter.create(config);
   * ```
   */
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
