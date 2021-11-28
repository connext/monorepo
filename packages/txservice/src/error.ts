import { Values, NxtpError } from "@connext/nxtp-utils";
import { providers } from "ethers";
import { Logger } from "ethers/lib/utils";

export abstract class TransactionError extends NxtpError {
  /**
   * Generic class for all transaction-related errors. Usually appropriate for these
   * errors to occur throughout transaction lifecycle.
   */
  static readonly type = TransactionError.name;
}

export class MaxBufferLengthError extends TransactionError {
  /**
   * Thrown if a backfill transaction fails and other txs are attempted
   */
  static readonly type = MaxBufferLengthError.name;

  constructor(public readonly context: any = {}) {
    super("Inflight transaction buffer is full.", context, MaxBufferLengthError.type);
  }
}

export class DispatchAborted extends TransactionError {
  /**
   * Thrown if a backfill transaction fails and other txs are attempted
   */
  static readonly type = DispatchAborted.name;

  constructor(public readonly context: any = {}) {
    super(
      "Failed to send backfill transaction, refusing to send any additional transactions",
      context,
      DispatchAborted.type,
    );
  }
}

export class RpcError extends TransactionError {
  static readonly type = RpcError.name;

  /**
   * Indicates the RPC Providers are malfunctioning. If errors of this type persist,
   * ensure you have a sufficient number of backup providers configured.
   */
  static readonly reasons = {
    OutOfSync: "All providers for this chain fell out of sync with the chain.",
    FailedToSend: "Failed to send RPC transaction.",
    NetworkError: "An RPC network error occurred.",
    ConnectionReset: "Connection was reset by peer.",
    Timeout: "Request timed out",
  };

  constructor(public readonly reason: Values<typeof RpcError.reasons>, public readonly context: any = {}) {
    super(reason, context, RpcError.type);
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
    super(reason, context, TransactionReadError.type);
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
    super(reason, context, TransactionReverted.type);
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
    super("Transaction replaced.", context, TransactionReplaced.type);
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
    super("Operation timed out.", context, TimeoutError.type);
  }
}

export class TransactionBackfilled extends TransactionError {
  /**
   * An error indicating that a transaction was replaced by a backfill, likely because it
   * was unresponsive.
   */
  static readonly type = TransactionBackfilled.name;

  constructor(public readonly context: any = {}) {
    super("Transaction was replaced by a backfill.", context, TransactionBackfilled.type);
  }
}

export class UnpredictableGasLimit extends TransactionError {
  /**
   * An error that we get back from ethers when we try to do a gas estimate, but this
   * may need to be handled differently.
   */
  static readonly type = UnpredictableGasLimit.name;

  constructor(public readonly context: any = {}) {
    super("The gas estimate could not be determined.", context, UnpredictableGasLimit.type);
  }
}

export class BadNonce extends TransactionError {
  /**
   * An error indicating that we got a "nonce expired"-like message back from
   * ethers while conducting sendTransaction.
   */
  static readonly type = BadNonce.name;

  static readonly reasons = {
    NonceExpired: "Nonce for this transaction is already expired.",
    ReplacementUnderpriced:
      "Gas for replacement tx was insufficient (must be greater than previous transaction's gas).",
    NonceIncorrect: "Transaction doesn't have the correct nonce",
  };

  constructor(public readonly reason: Values<typeof BadNonce.reasons>, public readonly context: any = {}) {
    super(reason, context, BadNonce.type);
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
    super("Server error occurred", context, ServerError.type);
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
  static readonly type = TransactionKilled.name;

  constructor(public readonly context: any = {}) {
    super("Transaction was killed by monitor loop.", context, TransactionKilled.type);
  }
}

export class MaxAttemptsReached extends NxtpError {
  static readonly type = MaxAttemptsReached.name;

  static getMessage(attempts: number): string {
    return `Reached maximum attempts ${attempts}.`;
  }

  constructor(attempts: number, public readonly context: any = {}) {
    super(MaxAttemptsReached.getMessage(attempts), context, MaxAttemptsReached.type);
  }
}

export class NotEnoughConfirmations extends NxtpError {
  static readonly type = NotEnoughConfirmations.name;

  static getMessage(required: number, hash: string, confs: number): string {
    return `Never reached the required amount of confirmations (${required}) on ${hash} (got: ${confs}). Did a reorg occur?`;
  }

  constructor(required: number, hash: string, confs: number, public readonly context: any = {}) {
    super(NotEnoughConfirmations.getMessage(required, hash, confs), context, NotEnoughConfirmations.type);
  }
}

export class GasEstimateInvalid extends NxtpError {
  static readonly type = GasEstimateInvalid.name;

  static getMessage(returned: string): string {
    return `The gas estimate returned was an invalid value. Got: ${returned}`;
  }

  constructor(returned: string, public readonly context: any = {}) {
    super(GasEstimateInvalid.getMessage(returned), context, GasEstimateInvalid.type);
  }
}

export class ProviderNotConfigured extends NxtpError {
  static readonly type = ProviderNotConfigured.name;

  static getMessage(chainId: string): string {
    return `No provider(s) configured for chain ${chainId}. Make sure this chain's providers are configured.`;
  }

  constructor(public readonly chainId: string, public readonly context: any = {}) {
    super(ProviderNotConfigured.getMessage(chainId), context, ProviderNotConfigured.type);
  }
}

export class ConfigurationError extends NxtpError {
  static readonly type = ConfigurationError.name;

  constructor(public readonly invalidParamaters: any, public readonly context: any = {}) {
    super("Configuration paramater(s) were invalid.", { ...context, invalidParamaters }, ConfigurationError.type);
  }
}

export class InitialSubmitFailure extends NxtpError {
  static readonly type = InitialSubmitFailure.name;

  constructor(public readonly context: any = {}) {
    super(
      "Transaction never submitted: exceeded maximum iterations in initial submit loop.",
      context,
      InitialSubmitFailure.type,
    );
  }
}

// These errors should essentially never happen; they are only used within the block of sanity checks.
export class TransactionProcessingError extends NxtpError {
  static readonly type = TransactionProcessingError.name;

  static readonly reasons = {
    SubmitOutOfOrder: "Submit was called but transaction is already completed.",
    MineOutOfOrder: "Transaction mine or confirm was called, but no transaction has been sent.",
    ConfirmOutOfOrder: "Tried to confirm but tansaction did not complete 'mine' step; no receipt was found.",
    DidNotBump: "Gas price was not incremented from last transaction.",
    DuplicateHash: "Received a transaction response with a duplicate hash!",
    NoReceipt: "No receipt was returned from the transaction.",
    NullReceipt: "Unable to obtain receipt: ethers responded with null.",
    ReplacedButNoReplacement: "Transaction was replaced, but no replacement transaction and/or receipt was returned.",
    DidNotThrowRevert: "Transaction was reverted but TransactionReverted error was not thrown.",
    InsufficientConfirmations: "Receipt did not have enough confirmations, should have timed out!",
  };

  constructor(
    public readonly reason: Values<typeof TransactionProcessingError.reasons>,
    public readonly method: string,
    public readonly context: any = {},
  ) {
    super(
      reason,
      {
        ...context,
        method,
      },
      TransactionProcessingError.type,
    );
  }
}

/**
 * Parses error strings into strongly typed NxtpError.
 * @param error from ethers.js package
 * @returns NxtpError
 */
export const parseError = (error: any): NxtpError => {
  if (error.isNxtpError) {
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
      /another transaction with same nonce|same hash was already imported|transaction nonce is too low|nonce too low|already known/,
    )
  ) {
    return new BadNonce(BadNonce.reasons.NonceExpired, context);
  } else if (message.match(/tx doesn't have the correct nonce|invalid transaction nonce/)) {
    return new BadNonce(BadNonce.reasons.NonceIncorrect, context);
  } else if (message.match(/ECONNRESET|ECONNREFUSED|failed to meet quorum/)) {
    return new RpcError(RpcError.reasons.ConnectionReset, context);
  }

  switch (error.code) {
    case Logger.errors.TRANSACTION_REPLACED:
      return new TransactionReplaced(error.receipt, error.replacement, {
        ...context,
        hash: error.hash,
        reason: error.reason,
        cancelled: error.cancelled,
      });
    case Logger.errors.INSUFFICIENT_FUNDS:
      return new TransactionReverted(TransactionReverted.reasons.InsufficientFunds, error.receipt, context);
    case Logger.errors.CALL_EXCEPTION:
      return new TransactionReverted(TransactionReverted.reasons.CallException, error.receipt, context);
    case Logger.errors.NONCE_EXPIRED:
      return new BadNonce(BadNonce.reasons.NonceExpired, context);
    case Logger.errors.REPLACEMENT_UNDERPRICED:
      return new BadNonce(BadNonce.reasons.ReplacementUnderpriced, context);
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
