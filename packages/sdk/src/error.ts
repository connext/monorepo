import { CancelParams, FulfillParams, jsonifyError, NxtpError, NxtpErrorJson, PrepareParams } from "@connext/nxtp-utils";
import { providers } from "ethers";

/**
 * @classdesc Abstract error class thrown by the `TransactionManager` class.
 */
export class TransactionManagerError extends NxtpError {}

/**
 * @classdesc Error thrown by the `TransactionManager` class if no transactionManager was available for the specified chain.
 */
 export class ChainNotSupported extends TransactionManagerError {
  static readonly type = ChainNotSupported.name;

  constructor(
    public readonly method: string,
    public readonly methodId: string,
    public readonly chainId: number,
    public readonly context: {
      transactionId?: string;
      approveReceipt?: providers.TransactionReceipt;
      assetId?: string;
      amount?: string;
      router?: string;
    } = {},
  ) {
    super("No transactionManager found for chain.", {
      method,
      methodId,
      chainId,
      ...context,
    }, ChainNotSupported.type);
  }
}

/**
 * @classdesc Defines the error thrown by the `TransactionManager` class when a transaction fails to be submitted.
 */
export class SubmitError extends TransactionManagerError {
  static readonly type = "TransactionManagerError";

  constructor(
    public readonly method: string,
    public readonly methodId: string,
    public readonly chainId: number,
    public readonly txserviceError: any,
    public readonly context: {
      transactionId?: string;
      approveReceipt?: providers.TransactionReceipt;
      transactionData?: any;
      params?: PrepareParams | FulfillParams | CancelParams;
    } = {},
  ) {
    super("Error submitting transaction", {
      method,
      methodId,
      chainId,
      txserviceError: jsonifyError(txserviceError as NxtpError),
      ...context,
    }, SubmitError.type);
  }
}