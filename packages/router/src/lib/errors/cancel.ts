import { NxtpError } from "@connext/nxtp-utils";

export class ReceiverTxExists extends NxtpError {
  constructor(transactionId: string, chainId: number, context: any = {}) {
    super(`Receiver Tx ${transactionId} already exists on chain ${chainId}`, context, "ReceiverTxExists");
  }
}
