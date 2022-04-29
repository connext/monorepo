import { NxtpError } from "@connext/nxtp-utils";

export class RelayerSendFailed extends NxtpError {
  constructor(context: any = {}) {
    super(`Relayer Send Failed`, context, RelayerSendFailed.name);
  }
}
