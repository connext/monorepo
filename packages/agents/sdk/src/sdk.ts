import { providers, Signer } from "ethers";
import { jsonifyError, Logger, createLoggingContext, XCallArgs } from "@connext/nxtp-utils";

import { NxtpSdkBase } from "./sdkBase";
import { SubmitError } from "./lib/errors";
import { NxtpSdkConfig } from "./config";

export const MIN_SLIPPAGE_TOLERANCE = "00.01"; // 0.01%;
export const MAX_SLIPPAGE_TOLERANCE = "15.00"; // 15.0%
export const DEFAULT_SLIPPAGE_TOLERANCE = "0.10"; // 0.10%
export const AUCTION_TIMEOUT = 30_000;
export const META_TX_TIMEOUT = 300_000;

/**
 * @classdesc Lightweight class to facilitate interaction with the Transacp
 * tionManager contract on configured chains.
 *
 */
export class NxtpSdk {
  private readonly sdkBase: NxtpSdkBase;
  private signer: Signer;
  private readonly logger: Logger;

  constructor(sdkBase: NxtpSdkBase, signer: Signer, logger: Logger) {
    this.sdkBase = sdkBase;
    this.logger = logger;
    this.signer = signer;
  }

  public async create(nxtpConfig: NxtpSdkConfig, signer: Signer, _logger?: Logger): Promise<NxtpSdk> {
    const logger = _logger || new Logger({ name: "NxtpSdk", level: nxtpConfig.logLevel });
    let sdkBase = new NxtpSdkBase(nxtpConfig, logger);
    sdkBase = await sdkBase.create(nxtpConfig, logger);
    return new NxtpSdk(sdkBase, signer, logger);
  }

  public async xcall(
    xcallParams: XCallArgs,
    infiniteApprove = false,
  ): Promise<{ xcallResponse: providers.TransactionResponse }> {
    const { requestContext, methodContext } = createLoggingContext(this.xcall.name, undefined);

    this.logger.info("Method started", requestContext, methodContext, { xcallParams });

    const approveTxReq = await this.sdkBase.approveIfNeeded(
      xcallParams.params.originDomain,
      xcallParams.transactingAssetId,
      xcallParams.amount,
      infiniteApprove,
    );

    if (approveTxReq) {
      const approveTxRes = await this.signer.sendTransaction(approveTxReq);

      const approveReceipt = await approveTxRes.wait(1);
      if (approveReceipt?.status === 0) {
        throw new SubmitError(jsonifyError(new Error("Receipt status is 0")), {
          approveReceipt,
        });
      }
      this.logger.info("Mined approve tx", requestContext, methodContext, {
        transactionHash: approveReceipt.transactionHash,
      });
    }

    const xcallRequest = await this.sdkBase.xcall(xcallParams);
    this.logger.info("Generated xcallRequest", requestContext, methodContext, { xcallRequest });

    const xcallResponse = await this.signer.sendTransaction({ ...xcallRequest });

    return { xcallResponse };
  }

  /**
   * Changes the injected signer associated with the SDK.
   *
   * @param signer - New injected signer for the SDK to use.
   */
  public changeInjectedSigner(signer: Signer) {
    this.signer = signer;
  }
}
