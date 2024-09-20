// custom error types for better error handling

export enum MaticJsErrorType {
  BlockNotIncluded = "no_block_found",
  IncorrectTx = "incorrect_transaction",
  TxNotCheckpointed = "transaction_not_checkpointed",
  NoExitHash = "no_exit_hash",
}

// custom errors for better error handling

// InfoError is thrown when the parameters received are valid but incorrect
export class InfoError extends Error {
  type: MaticJsErrorType;

  constructor(type: MaticJsErrorType, message: string) {
    super(message);
    this.type = type;
  }
}
