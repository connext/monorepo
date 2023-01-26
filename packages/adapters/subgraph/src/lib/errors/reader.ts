import { ConnextError } from "@connext/utils";

export class DomainInvalid extends ConnextError {
  constructor(domain: string, context: any = {}) {
    super(
      "Domain invalid: no supported subgraph found for given domain.",
      { ...context, invalidDomain: domain },
      DomainInvalid.name,
    );
  }
}

export class PrefixInvalid extends ConnextError {
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

export class DocumentInvalid extends ConnextError {
  constructor(context: any = {}) {
    super("Document invalid", context, DocumentInvalid.name);
  }
}

export class RuntimeError extends ConnextError {
  constructor(context: any = {}) {
    super("Executing the query failed!", context, RuntimeError.name);
  }
}

export class XQueryResultParseError extends ConnextError {
  constructor(context: any = {}) {
    super("Parsing xquery result failed!", context, XQueryResultParseError.name);
  }
}
