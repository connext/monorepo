import { NxtpError } from "@connext/nxtp-utils";

export class ApiRequestFailed extends NxtpError {
  constructor(context: any = {}) {
    super("Cartographer api request failed, waiting for next loop", context, ApiRequestFailed.name);
  }
}
