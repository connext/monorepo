import { Values, NxtpError } from "@connext/nxtp-utils";
import { Logger } from "ethers/lib/utils";

export class ChainError extends NxtpError {
  static readonly type = "ChainError";
  static readonly reasons = {
    ProviderNotFound: "Provider not found for chainId",
    SignerNotFound: "Signer not found for chainId",
    SenderNotInChannel: "Sender is not a channel participant",
    NegativeDepositAmount: "Cannot deposit a negative amount",
    NotEnoughFunds: "Not enough funds in wallet",
    FailedToDeploy: "Could not deploy vector channel",
    FailedToSendTx: "Failed to send transaction to chain",
    TransferNotRegistered: "Transfer not in registry",
    MissingSigs: "Channel state is not double signed",
    ResolverNeeded: "Transfer resolver must be provided in dispute",
    NotInitialState: "Transfer must be disputed with initial state",
    MultisigDeployed: "Multisig already deployed",
    TransferNotFound: "Transfer is not included in active transfers",
    TxAlreadyMined: "Tranasction already mined",
    TxNotFound: "Transaction not found",
    TxReverted: "Transaction reverted on chain",
    MaxGasPriceReached: "Max gas price reached",
    ConfirmationTimeout: "Timed out waiting for confirmation.",
    NonceExpired: "Failed to confirm a tx whose nonce had expired.",
    InvalidResponse: "Did not receive valid tx response from ethers.",
    RpcFailure: "Could not execute RPC method.",
    ProviderNotSynced: "No provider(s) network were ready for execution.",
    ContractReadFailure: "Could not read from contract.",
    ReplacementGasInvalid:
      "Gas for replacement tx was insufficient. (Gas must be greater than previous transaction's gas.)",
  };

  constructor(public readonly message: Values<typeof ChainError.reasons> | string, public readonly context: any = {}) {
    super(message, context, ChainError.type);
  }

  constructor(public readonly code: ErrorCode, public readonly context: any = {}) {
    super(TransactionError.reasons[code], context, TransactionError.type);
  }
}













// There are three error types here:
// - TransactionError: errors that are used to communicate internally (e.g. already mined)
// - ChainError: errors from on-chain transaction (e.g. reverted)
// - errors due to a transaction service failure. These errors are thrown and uncaught.

// enum RpcError {
//   OUT_OF_SYNC = "OUT_OF_SYNC",
//   TIMEOUT = "TIMEOUT",
//   PROVIDER_NOT_FOUND = "PROVIDER_NOT_FOUND",
//   FAILED_TO_SEND = "",
// }

export class RpcError extends NxtpError {

  constructor(public readonly context: any = {}) {
    s;
  }
}




export enum RevertedCode {
  REPRICED = "REPRICED",
  CANCELLED = "CANCELLED",
  INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS",
}

export class TransactionReverted extends TransactionError {
  /**
   * An error that indicates that the transaction was reverted on-chain.
   */
  static readonly type = TransactionReverted.name;

  static readonly reasons = {
    AlreadyMined: "Transaction already mined.",
    ReplacementGasInvalid: "Gas for replacement tx was insufficient (must be greater than previous transaction's gas).",
    NotEnoughFunds: "Not enough funds in wallet.",

  }
}

export const parseError = (error: any) => {
    /**
 * TODO: Handle possibility of one of these errors occurring.
 * Logger.errors.INSUFFICIENT_FUNDS,
 * Logger.errors.NONCE_EXPIRED,
 * Logger.errors.REPLACEMENT_UNDERPRICED,
 * Logger.errors.CALL_EXCEPTION,
 * Logger.errors.NONCE_EXPIRED,
 * Logger.errors.UNPREDICTABLE_GAS_LIMIT
 * //   case Logger.errors.TRANSACTION_REPLACED:
//     // This will be the replacement receipt (see above).
//     this.receipt = error.receipt;
//     break;
//   case Logger.errors.CALL_EXCEPTION:
//     // This will be the receipt with a status of 0.
//     this.receipt = error.receipt;
//     break;
//   case Logger.errors.TIMEOUT:
//     // Wrap as ChainError timeout for convenience.
//     throw new ChainError(ChainError.reasons.ConfirmationTimeout);
 */
  switch(error.code) {
    case Logger.errors.INSUFFICIENT_FUNDS:
      break;
    case Logger.errors.CALL_EXCEPTION:
      break;
    case Logger.errors.REPLACEMENT_UNDERPRICED:
      break;
    case Logger.errors.NONCE_EXPIRED:
      break;
    case Logger.errors.UNPREDICTABLE_GAS_LIMIT:
      break;
    case Logger.errors.INSUFFICIENT_FUNDS:
      break;
    case Logger.errors.INSUFFICIENT_FUNDS:
      break;
    case Logger.errors.INSUFFICIENT_FUNDS:
      break;
  }
};



// export const parseError = (error: string): TransactionError {
    // TODO: We may want to condense these errors into a few categories: reverted, rpc failure, and needs-a-retry.
  /**
   * Valid errors that may occur during sendTx lifecycle.
   *
   * TxReverted: Indicates the transaction was reverted on-chain.
   *
   * NotEnoughFunds: A variant of the above, specifying that the wallet with which this tx is
   * being submitted does not have sufficient funds to send the transaction.
   *
   * RpcFailure: Indicates the RPC Providers are malfunctioning. If this error persists,
   * ensure you have a sufficient number of backup providers configured.
   *
   * ProviderNotSynced: A variant of the above RpcFailure, essentially indicating the same
   * problem: faulty providers out of sync with the chain. Shouldn't occur so long as we have 1
   * functional provider in the list of available providers.
   *
   * MaxGasPriceReached: Indicates that the transaction bumped gas endlessly, and was never
   * accepted by the chain (0 confirmations, and chain did not revert). Typically indicates on RPC
   * failure but could imply a failure in TransactionService to submit correctly to chain.
   *
   * NotEnoughConfirmations: At some point, we stopped receiving additional confirmations, and
   * never reached the required amount. This error should ultimately never occur - but if it does,
   * it indicates that a chain reorg may have happened, stranding the transaction on an orphan/stale
   * chain.
   */
  //  public static readonly ValidLifecycleErrors: string[] = [
  //   ChainError.reasons.TxReverted,
  //   ChainError.reasons.NotEnoughFunds,
  //   ChainError.reasons.RpcFailure,
  //   ChainError.reasons.ProviderNotSynced,
  //   ChainError.reasons.MaxGasPriceReached,
  //   ChainError.reasons.NotEnoughConfirmations,
  // ];


/**
       * From ethers docs:
       * If the transaction execution failed (i.e. the receipt status is 0), a CALL_EXCEPTION error will be rejected with the following properties:
       * error.transaction - the original transaction
       * error.transactionHash - the hash of the transaction
       * error.receipt - the actual receipt, with the status of 0
       *
       * If the transaction is replaced by another transaction, a TRANSACTION_REPLACED error will be rejected with the following properties:
       * error.hash - the hash of the original transaction which was replaced
       * error.reason - a string reason; one of "repriced", "cancelled" or "replaced"
       * error.cancelled - a boolean; a "repriced" transaction is not considered cancelled, but "cancelled" and "replaced" are
       * error.replacement - the replacement transaction (a TransactionResponse)
       * error.receipt - the receipt of the replacement transaction (a TransactionReceipt)
       */
//  switch (error.code) {

//   default:
//     throw error;
// }
// }



// export class ChainError extends NxtpError {
//   static readonly type = "ChainError";

//   static readonly reasons = {

//     ProviderNotFound: "Provider not found for chainId",
//     SignerNotFound: "Signer not found for chainId",
//     NotEnoughFunds: "Not enough funds in wallet",
//     FailedToSendTx: "Failed to send transaction to chain",
//     TxAlreadyMined: "Transaction already mined",
//     TxNotFound: "Transaction not found",
//     TxReverted: "Transaction reverted on chain",
//     MaxGasPriceReached: "Max gas price reached",
//     ConfirmationTimeout: "Timed out waiting for confirmation.",
//     RpcFailure: "Could not execute RPC method.",
//     ProviderNotSynced: "No provider(s) network were ready for execution.",
//     ContractReadFailure: "Could not read from contract.",

//     NotEnoughConfirmations: "Did not receive sufficient confirmations for transaction. A reorg may have occurred.",
//   };

//   constructor(public readonly message: Values<typeof ChainError.reasons> | string, public readonly context: any = {}) {
//     super(message, context, ChainError.type);
//   }

//   // TODO: Fill out all error cases for translation here.
//   static parseChainErrorReason = (message: string): string | undefined => {
//     if (message.includes("sender doesn't have enough funds")) {
//       return ChainError.reasons.NotEnoughFunds;
//     }
//     return undefined;
//   };
// }
