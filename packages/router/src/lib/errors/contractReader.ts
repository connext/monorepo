import { NxtpError } from "@connext/nxtp-utils";

export class ContractReaderNotAvailableForChain extends NxtpError {
  constructor(chainId: number, context: any = {}) {
    super(`Contract reader is not available for chainId ${chainId}`, context, "ContractReaderNotAvailableForChain");
  }
}

export class DuplicateTransactionIds extends NxtpError {
  static getMessage(transactionId: string, transactions: any[]) {
    return `Duplicate transaction ids: ${transactionId}. Found ${transactions.length} instances!`;
  }
  constructor(transactionId: string, transactions: any[], context: any = {}) {
    super(
      DuplicateTransactionIds.getMessage(transactionId, transactions),
      {
        transactionId,
        transactions,
        ...context,
      },
      DuplicateTransactionIds.name,
    );
  }
}
