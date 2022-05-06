import { NxtpError } from "@connext/nxtp-utils";

export class DomainInvalid extends NxtpError {
  constructor(domain: string, context: any = {}) {
    super(
      "Domain invalid: no supported subgraph found for given domain.",
      { ...context, invalidDomain: domain },
      DomainInvalid.name,
    );
  }
}

export class PrefixInvalid extends NxtpError {
  constructor(name: string, regexMatch: any, context: any = {}) {
    super(
      "Subgraph prefix name is invalid: unable to parse network from prefix. Did the prefix formatting change?",
      {
        invalidName: name,
        regexMatch,
        ...context,
      },
      PrefixInvalid.name,
    );
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
