import { ConnextError } from "@connext/utils";

export class SignerAddressMissing extends ConnextError {
  constructor(context: any = {}) {
    super("Signer Address Missing", context, SignerAddressMissing.name);
  }
}

export class ContractAddressMissing extends ConnextError {
  constructor(domainId: string, which: string, context: any = {}) {
    super(
      `Contract address missing for ${domainId}: ${which}`,
      { ...context, domainId, which },
      ContractAddressMissing.name,
    );
  }
}

export class ChainDataUndefined extends ConnextError {
  constructor(context: any = {}) {
    super("Chain Data Undefined", context, ChainDataUndefined.name);
  }
}

export class ParamsInvalid extends ConnextError {
  constructor(context: any = {}) {
    super("Params invalid", context, ParamsInvalid.name);
  }
}

export class UriInvalid extends ConnextError {
  constructor(context: any = {}) {
    super("Uri invalid", context, UriInvalid.name);
  }
}

export class ApiRequestFailed extends ConnextError {
  constructor(context: any = {}) {
    super("Api Request failed", context, ApiRequestFailed.name);
  }
}

export class ParseConnextLogFailed extends ConnextError {
  constructor(context: any = {}) {
    super("Parsing logs failed", context, ParseConnextLogFailed.name);
  }
}

export class CannotUnwrapOnDestination extends ConnextError {
  constructor(reason: string, context: any = {}) {
    super(
      "Cannot fulfill request to unwrap native token on destination due to bad argument: " + reason,
      { ...context },
      CannotUnwrapOnDestination.name,
    );
  }
}

export class SlippageInvalid extends ConnextError {
  constructor(slippage: string, context: any = {}) {
    super("Invalid slippage value. Must be between 0-10000 (inclusive)", { slippage, context }, SlippageInvalid.name);
  }
}
