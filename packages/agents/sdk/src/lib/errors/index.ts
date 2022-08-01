import { NxtpError } from "@connext/nxtp-utils";

export class SignerAddressMissing extends NxtpError {
  constructor(context: any = {}) {
    super("Signer Address Missing", context, SignerAddressMissing.name);
  }
}

export class ContractAddressMissing extends NxtpError {
  constructor(context: any = {}) {
    super("Contract Address Missing", context, ContractAddressMissing.name);
  }
}

export class ChainDataUndefined extends NxtpError {
  constructor(context: any = {}) {
    super("Chain Data Undefined", context, ChainDataUndefined.name);
  }
}

export class ParamsInvalid extends NxtpError {
  constructor(context: any = {}) {
    super("Params invalid", context, ParamsInvalid.name);
  }
}

export class UriInvalid extends NxtpError {
  constructor(context: any = {}) {
    super("Uri invalid", context, UriInvalid.name);
  }
}

export class ApiRequestFailed extends NxtpError {
  constructor(context: any = {}) {
    super("Api Request failed", context, ApiRequestFailed.name);
  }
}

export class ParseConnextLogFailed extends NxtpError {
  constructor(context: any = {}) {
    super("Parsing logs failed", context, ParseConnextLogFailed.name);
  }
}
