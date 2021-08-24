import { Values, NxtpError } from "@connext/nxtp-utils";
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
    super(reason, context);
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

  constructor(public readonly reason: Values<typeof TransactionReverted.reasons>, public readonly context: any = {}) {
    super(reason, context);
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
    GasEstimateFailed: "Operation for gas estimate failed; transaction was reverted on-chain.",
    InsufficientFunds: "Not enough funds in wallet.",
    /**
     * From ethers docs:
     * If the transaction execution failed (i.e. the receipt status is 0), a CALL_EXCEPTION error will be rejected with the following properties:
     * error.transaction - the original transaction
     * error.transactionHash - the hash of the transaction
     * error.receipt - the actual receipt, with the status of 0
     */
    CallException: "An exception occurred during this contract call.",
    /**
     * No difference between the following two errors, except to distinguish a message we
     * get back from providers on execution failure.
     */
    ExecutionFailed: "Transaction would fail on chain.",
    AlwaysFailingTransaction: "Transaction would always fail on chain.",
    GasExceedsAllowance: "Transaction gas exceeds allowance.",
  };

  constructor(
    public readonly reason: Values<typeof TransactionReverted.reasons>,
    public readonly receipt?: providers.TransactionReceipt,
    public readonly context: any = {},
  ) {
    super(reason, context);
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
    super("Transaction replaced.", context);
  }
}

// TODO: #144 Some of these error classes are a bit of an antipattern with the whole "reason" argument structure
// being missing. They won't function as proper NxtpErrors, essentially.
export class TimeoutError extends TransactionError {
  /**
   * An error indicating that an operation (typically confirmation) timed out.
   */
  static readonly type = TimeoutError.name;

  constructor(public readonly context: any = {}) {
    super("Operation timed out.", context);
  }
}

export class UnpredictableGasLimit extends TransactionError {
  /**
   * An error that we get back from ethers when we try to do a gas estimate, but this
   * may need to be handled differently.
   */
  static readonly type = UnpredictableGasLimit.name;

  constructor(public readonly context: any = {}) {
    super("The gas estimate could not be determined.", context);
  }
}

export class AlreadyMined extends TransactionError {
  /**
   * An error indicating that we got a "nonce expired"-like message back from
   * ethers while conducting sendTransaction.
   */
  static readonly type = AlreadyMined.name;

  static readonly reasons = {
    NonceExpired: "Nonce for this transaction is already expired.",
    ReplacementUnderpriced:
      "Gas for replacement tx was insufficient (must be greater than previous transaction's gas).",
  };

  constructor(public readonly reason: Values<typeof AlreadyMined.reasons>, public readonly context: any = {}) {
    super(reason, context);
  }
}

export class ServerError extends TransactionError {
  /**
   * An error indicating that an operation on the node server (such as validation
   * before submitting a transaction) occurred.
   *
   * This error could directly come from geth, or be altered by the node server,
   * depending on which service is used. As a result, we coerce this to a single error
   * type.
   */
  static readonly type = ServerError.name;

  constructor(public readonly context: any = {}) {
    super("Server error occurred", context);
  }
}

export class TransactionKilled extends TransactionError {
  /**
   * An error indicating that the transaction was killed by the monitor loop due to
   * it taking too long, and blocking (potentially too many) transactions in the pending
   * queue.
   * 
   * It will be replaced with a backfill transaction at max gas.
   */
  static readonly type = ServerError.name;

  constructor(public readonly context: any = {}) {
    super("Transaction was killed by monitor loop.", context);
  }
}

export class TransactionServiceFailure extends NxtpError {
  /**
   * An error that indicates that transaction service infrastructure had a critical
   * and unexpected failure.
   */
  static readonly type = TransactionServiceFailure.name;

  static readonly reasons = {
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
    GasEstimateInvalid: "The gas estimate returned was an invalid value.",
  };

  constructor(
    public readonly reason: Values<typeof TransactionServiceFailure.reasons>,
    public readonly context: any = {},
  ) {
    super(reason, context);
  }
}

/**
 * Parses error strings into strongly typed NxtpError.
 * @param error from ethers.js package
 * @returns NxtpError
 */
export const parseError = (error: any): NxtpError => {
  if (error instanceof NxtpError) {
    // If the error has already been parsed into a native error, just return it.
    return error;
  }

  let message = error.message;
  if (error.code === Logger.errors.SERVER_ERROR && error.error && typeof error.error.message === "string") {
    message = error.error.message;
  } else if (typeof error.body === "string") {
    message = error.body;
  } else if (typeof error.responseText === "string") {
    message = error.responseText;
  }
  // Preserve the original message before making it lower case.
  const originalMessage = message;
  message = (message || "").toLowerCase();
  const context = {
    message: originalMessage,
    chainError: { code: error.code, reason: error.reason, data: error.error ? error.error.data : "n/a" },
  };

  if (message.match(/execution reverted/)) {
    return new TransactionReverted(TransactionReverted.reasons.ExecutionFailed, undefined, context);
  } else if (message.match(/always failing transaction/)) {
    return new TransactionReverted(TransactionReverted.reasons.AlwaysFailingTransaction, undefined, context);
  } else if (message.match(/gas required exceeds allowance/)) {
    return new TransactionReverted(TransactionReverted.reasons.GasExceedsAllowance, undefined, context);
  } else if (
    message.match(
      /tx doesn't have the correct nonce|another transaction with same nonce|same hash was already imported|transaction nonce is too low|nonce too low/,
    )
  ) {
    return new AlreadyMined(AlreadyMined.reasons.NonceExpired, context);
  }

  switch (error.code) {
    case Logger.errors.TRANSACTION_REPLACED:
      return new TransactionReplaced(error.receipt, error.replacment, context);
    case Logger.errors.INSUFFICIENT_FUNDS:
      return new TransactionReverted(TransactionReverted.reasons.InsufficientFunds, error.receipt, context);
    case Logger.errors.CALL_EXCEPTION:
      return new TransactionReverted(TransactionReverted.reasons.CallException, error.receipt, context);
    case Logger.errors.NONCE_EXPIRED:
      return new AlreadyMined(AlreadyMined.reasons.NonceExpired, context);
    case Logger.errors.REPLACEMENT_UNDERPRICED:
      return new AlreadyMined(AlreadyMined.reasons.ReplacementUnderpriced, context);
    case Logger.errors.UNPREDICTABLE_GAS_LIMIT:
      return new UnpredictableGasLimit(context);
    case Logger.errors.TIMEOUT:
      return new TimeoutError(context);
    case Logger.errors.NETWORK_ERROR:
      return new RpcError(RpcError.reasons.NetworkError, context);
    case Logger.errors.SERVER_ERROR:
      // TODO: #144 Should this be a TransactionReverted error?
      return new ServerError(context);
    default:
      return error;
  }
};
