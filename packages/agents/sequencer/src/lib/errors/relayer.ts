import { NxtpError } from "@connext/nxtp-utils";

export class GelatoSendFailed extends NxtpError {
  constructor(context: any = {}) {
    super(`Gelato Send Failed`, context, GelatoSendFailed.name);
  }
}
