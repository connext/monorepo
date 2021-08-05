import { NxtpError } from "@connext/nxtp-utils";

export class ContractReaderNotAvailableForChain extends NxtpError {
  constructor(chainId: number, context: any = {}) {
    super(`Contract reader is not available for chainId ${chainId}`, context);
  }
}
