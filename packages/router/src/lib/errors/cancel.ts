import { NxtpError } from "@connext/nxtp-utils";

export class ReceiverTxExists extends NxtpError {
  constructor(transactionId: string, chainId: number, context: any = {}) {
    super(`Receiver Tx ${transactionId} already exists on chain ${chainId}`, context, "ReceiverTxExists");
  }
}

export class SenderTxTooNew extends NxtpError {
  constructor(transactionId: string, chainId: number, preparedTime: number, currentTime: number, context: any = {}) {
    super(
      `Sender tx ${transactionId} on chain ${chainId} too recent, preparedTime: ${preparedTime} currentTime: ${currentTime}`,
      context,
      "SenderTxTooNew",
    );
  }
}
