import { NxtpError } from "@connext/nxtp-utils";

export class ReceiverTxExists extends NxtpError {
  constructor(transactionId: string, chainId: number, context: any = {}) {
    super(`Receiver Tx ${transactionId} already exists on chain ${chainId}`, context, "ReceiverTxExists");
  }
}

export class SenderTxTooNew extends NxtpError {
  static getMessage(transactionId: string, chainId: number, preparedTime: number, currentTime: number): string {
    return `Sender tx ${transactionId} on chain ${chainId} too recent, preparedTime: ${preparedTime} currentTime: ${currentTime}`;
  }
  constructor(transactionId: string, chainId: number, preparedTime: number, currentTime: number, context: any = {}) {
    super(SenderTxTooNew.getMessage(transactionId, chainId, preparedTime, currentTime), context, "SenderTxTooNew");
  }
}
