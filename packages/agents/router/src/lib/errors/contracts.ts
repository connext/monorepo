import { NxtpError } from "@connext/nxtp-utils";

export class SanitationCheckFailed extends NxtpError {
  constructor(sanitationType: string, transactionId: string, domain: string, context: any = {}) {
    super(
      `Sanitation check failed for ${sanitationType} for domain ${domain}, txId: ${transactionId}`,
      context,
      "SanitationCheckFailed",
      "info",
    );
  }
}
