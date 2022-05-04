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

export class DocumentInvalid extends NxtpError {
  constructor(context: any = {}) {
    super("Document invalid", context, DocumentInvalid.name);
  }
}

export class RuntimeError extends NxtpError {
  constructor(context: any = {}) {
    super("Executing the query failed!", context, RuntimeError.name);
  }
}

export class XQueryResultParseError extends NxtpError {
  constructor(context: any = {}) {
    super("Parsing xquery result failed!", context, XQueryResultParseError.name);
  }
}
