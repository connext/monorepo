import { NxtpError } from "@connext/nxtp-utils";

export class SanitationCheckFailed extends NxtpError {
  constructor(sanitationType: string, transactionId: string, chainId: number, context: any = {}) {
    super(
      `Sanitation check failed for ${sanitationType} for chain ${chainId}, txId: ${transactionId}`,
      context,
      "SanitationCheckFailed",
      "info",
    );
  }
}
