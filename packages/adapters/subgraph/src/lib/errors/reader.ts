import { NxtpError } from "@connext/nxtp-utils";

export class DomainInvalid extends NxtpError {
  constructor(context: any = {}) {
    super("Domain invalid", context, DomainInvalid.name);
  }
}

export class PrefixInvalid extends NxtpError {
  constructor(context: any = {}) {
    super("Prefix invalid", context, PrefixInvalid.name);
  }
}
