import { NxtpError } from "@connext/nxtp-utils";

import { TransactionStatus } from "../../adapters/subgraph/runtime/graphqlsdk";

export class NoSenderTxFound extends NxtpError {
  constructor(transactionId: string, context: any = {}) {
    super(`No transaction found for ${transactionId}`, context);
  }
}

export class SenderTxInvalidStatus extends NxtpError {
  constructor(transactionId: string, status: TransactionStatus, context: any = {}) {
    super(`Sender tx ${transactionId} status incorrect: ${status}`, context);
  }
}

export class ReceiverTxInvalidStatus extends NxtpError {
  constructor(transactionId: string, status: TransactionStatus, context: any = {}) {
    super(`Receiver tx ${transactionId} status incorrect: ${status}`, context);
  }
}
