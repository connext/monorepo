import { Values, NxtpError, jsonifyError } from "@connext/nxtp-utils";
import { providers } from "ethers";
import { Logger } from "ethers/lib/utils";

export class TransactionError extends NxtpError {
  /**
   * Generic class for all transaction-related errors. Usually appropriate for these
   * errors to occur throughout transaction lifecycle.
   */
  static readonly type = TransactionError.name;
}

export class RpcError extends TransactionError {
  /**
   * Indicates the RPC Providers are malfunctioning. If errors of this type persist,
   * ensure you have a sufficient number of backup providers configured.
   */
  static readonly reasons = {
    OutOfSync: "All providers for this chain fell out of sync with the chain.",
    FailedToSend: "Failed to send RPC transaction.",
    NetworkError: "An RPC network error occurred.",
    ServerError: "An RPC server error occurred.",
  };

  constructor(public readonly reason: Values<typeof RpcError.reasons>, public readonly context: any = {}) {
    super(reason);
  }
}

export class TransactionReadError extends TransactionError {
  /**
   * An error that indicates that a read transaction failed.
   */
  static readonly type = TransactionReadError.name;

  static readonly reasons = {
    ContractReadError: "An exception occurred while trying to read from the contract.",
  };

  constructor(
    public readonly reason: Values<typeof TransactionReverted.reasons>,
    public readonly context: any = {},
  ) {
    super(reason);
  }
}

export class TransactionReverted extends TransactionError {
  /**
   * An error that indicates that the transaction was reverted on-chain.
   *
   * Could be harmless if this was from a subsuquent attempt, e.g. if the tx
   * was already mined (NonceExpired, AlreadyMined)
   *
   * Alternatively, if this is from the first attempt, it must be thrown as the reversion
   * was for a legitimate reason.
   */
  static readonly type = TransactionReverted.name;

  static readonly reasons = {
    InsufficientFunds: "Not enough funds in wallet.",
    AlreadyMined: "Transaction already mined.",
    NonceExpired: "Nonce for this transaction is already expired.",
    /**
     * From ethers docs:
     * If the transaction execution failed (i.e. the receipt status is 0), a CALL_EXCEPTION error will be rejected with the following properties:
     * error.transaction - the original transaction
     * error.transactionHash - the hash of the transaction
     * error.receipt - the actual receipt, with the status of 0
     */
    CallException: "An exception occurred during this contract call.",
  };

  constructor(
    public readonly reason: Values<typeof TransactionReverted.reasons>,
    public readonly receipt?: providers.TransactionReceipt,
    public readonly context: any = {},
  ) {
    super(reason);
  }
}

export class TransactionReplaced extends TransactionError {
  /**
   * From ethers docs:
   * If the transaction is replaced by another transaction, a TRANSACTION_REPLACED error will be rejected with the following properties:
   * error.hash - the hash of the original transaction which was replaced
   * error.reason - a string reason; one of "repriced", "cancelled" or "replaced"
   * error.cancelled - a boolean; a "repriced" transaction is not considered cancelled, but "cancelled" and "replaced" are
   * error.replacement - the replacement transaction (a TransactionResponse)
   * error.receipt - the receipt of the replacement transaction (a TransactionReceipt)
   */
  static readonly type = TransactionReplaced.name;

  constructor(
    public readonly receipt: providers.TransactionReceipt,
    public readonly replacement: providers.TransactionResponse,
    public readonly context: any = {},
  ) {
    super("Transaction replaced.");
  }
}

export class TimeoutError extends TransactionError {
  /**
   * An error indicating that an operation (typically confirmation) timed out.
   */
  static readonly type = TransactionReplaced.name;

  constructor(public readonly context: any = {}) {
    super("Operation timed out.");
  }
}

export class TransactionServiceFailure extends NxtpError {
  /**
   * An error that indicates that transaction service infrastructure had a critical
   * and unexpected failure.
   */
  static readonly type = TransactionServiceFailure.name;

  static readonly reasons = {
    UnpredictableGasLimit: "The gas limit could not be estimated.",
    Timeout: "Timeout occurred during an RPC operation.",
    ReplacementUnderpriced:
      "Gas for replacement tx was insufficient (must be greater than previous transaction's gas).",
    /**
     * NotEnoughConfirmations: At some point, we stopped receiving additional confirmations, and
     * never reached the required amount. This error should ultimately never occur - but if it does,
     * it indicates that a chain reorg may have happened, stranding the transaction on an orphan/stale
     * chain.
     */
    NotEnoughConfirmations: "Never reached the required amount of confirmations. Did a reorg occur?",
    /**
     * MaxGasPriceReached: Indicates that the transaction bumped gas endlessly, and was never
     * accepted by the chain (0 confirmations, and chain did not revert). Typically indicates on RPC
     * failure but could imply a failure in TransactionService to submit correctly to chain.
     */
    MaxGasPriceReached: "Gas price went over configured limit.",
  };

  constructor(
    public readonly reason: Values<typeof TransactionServiceFailure.reasons>,
    public readonly context: any = {},
  ) {
    super(reason);
  }
}

export const parseError = (error: any): NxtpError => {
  const context = { error: jsonifyError(error) };
  switch (error.code) {
    case Logger.errors.TRANSACTION_REPLACED:
      return new TransactionReplaced(error.receipt, error.replacment, context);
    case Logger.errors.INSUFFICIENT_FUNDS:
      return new TransactionReverted(TransactionReverted.reasons.InsufficientFunds, error.receipt, context);
    case Logger.errors.CALL_EXCEPTION:
      return new TransactionReverted(TransactionReverted.reasons.CallException, error.receipt, context);
    case Logger.errors.NONCE_EXPIRED:
      return new TransactionReverted(TransactionReverted.reasons.NonceExpired, error.receipt, context);
    case Logger.errors.REPLACEMENT_UNDERPRICED:
      return new TransactionServiceFailure(TransactionServiceFailure.reasons.ReplacementUnderpriced, context);
    case Logger.errors.UNPREDICTABLE_GAS_LIMIT:
      return new TransactionServiceFailure(TransactionServiceFailure.reasons.UnpredictableGasLimit, context);
    case Logger.errors.TIMEOUT:
      return new TimeoutError(context);
    case Logger.errors.NETWORK_ERROR:
      return new RpcError(RpcError.reasons.NetworkError, context);
    case Logger.errors.SERVER_ERROR:
      return new RpcError(RpcError.reasons.ServerError, context);
    default:
      throw error;
  }
};
