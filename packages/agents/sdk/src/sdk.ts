import { providers, Signer, Wallet } from "ethers";
import { jsonifyError, Logger, createLoggingContext, XCallArgs } from "@connext/nxtp-utils";
import { TransactionService } from "@connext/nxtp-txservice";

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
  private signer: Signer | Wallet;
  private txservice: TransactionService;
  private readonly logger: Logger;

  constructor(sdkBase: NxtpSdkBase, signer: Signer, txservice: TransactionService, logger: Logger) {
    this.sdkBase = sdkBase;
    this.logger = logger;
    this.signer = signer;
    this.txservice = txservice;
  }

  static async create(nxtpConfig: NxtpSdkConfig, signer: Signer, _logger?: Logger): Promise<NxtpSdk> {
    const logger = _logger || new Logger({ name: "NxtpSdk", level: nxtpConfig.logLevel });

    const sdkBase = await NxtpSdkBase.create(nxtpConfig, logger);
    const txservice = new TransactionService(
      logger.child({ module: "TransactionService" }),
      sdkBase.config.chains,
      signer,
    );
    return new NxtpSdk(sdkBase, signer, txservice, logger);
  }

  public async xcall(
    xcallParams: XCallArgs,
    infiniteApprove = false,
  ): Promise<{ xcallResponse: providers.TransactionReceipt }> {
    const { requestContext, methodContext } = createLoggingContext(this.xcall.name, undefined);

    this.logger.info("Method started", requestContext, methodContext, { xcallParams });

    const approveTxReq = await this.sdkBase.approveIfNeeded(
      xcallParams.params.originDomain,
      xcallParams.transactingAssetId,
      xcallParams.amount,
      infiniteApprove,
    );

    if (approveTxReq) {
      const approveReceipt = await this.txservice.sendTx(
        {
          to: approveTxReq.to!,
          chainId: approveTxReq.chainId!,
          value: approveTxReq.value!,
          data: approveTxReq.data!.toString(),
          from: approveTxReq.from!,
        },
        requestContext,
      );

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

    const xcallResponse = await this.txservice.sendTx(
      {
        to: xcallRequest.to!,
        chainId: xcallRequest.chainId!,
        value: xcallRequest.value!,
        data: xcallRequest.data!.toString(),
        from: xcallRequest.from!,
      },
      requestContext,
    );

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
