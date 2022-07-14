import { NxtpError } from "@connext/nxtp-utils";

export class ApiRequestFailed extends NxtpError {
  constructor(context: any = {}) {
    super("Cartographer api request failed, waiting for next loop", context, ApiRequestFailed.name);
  }
}

export class DomainNotSupported extends NxtpError {
  constructor(domain: string, transferId: string, context: any = {}) {
    super(
      "Destination domain for this transfer is not supported",
      { ...context, domain, transferId },
      DomainNotSupported.name,
    );
  }
}
