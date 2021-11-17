import { NxtpError } from "@connext/nxtp-utils";

export class NotExistPriceOracle extends NxtpError {
  constructor(chainId: number, context: any = {}) {
    super(`Price Oracle doesn't exist for chain ${chainId}`, context, "NotExistPriceOracle");
  }
}

export class SanitationCheckFailed extends NxtpError {
  constructor(sanitationType: string, transactionId: string, chainId: number, context: any = {}) {
    super(
      `Sanitation check failed for ${sanitationType} for chain ${chainId}, txId: ${transactionId}, tx is already on chain`,
      context,
      "SanitationCheckFailed",
    );
  }
}
