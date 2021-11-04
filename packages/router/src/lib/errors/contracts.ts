import { NxtpError } from "@connext/nxtp-utils";

export class NotExistPriceOracle extends NxtpError {
  constructor(chainId: number, context: any = {}) {
    super(`Price Oracle doesn't exist for chain ${chainId}`, context, "NotExistPriceOracle");
  }
}
