import { ConnextError, Values } from "@connext/utils";

export class DecodeExecuteError extends ConnextError {
  constructor(context: any = {}) {
    super("Failed to decode execute function data.", context, DecodeExecuteError.name);
  }
}

export class ChainNotSupported extends ConnextError {
  constructor(chain: number, context: any = {}) {
    super(
      "Relayer does not support relaying transactions on this chain.",
      { ...context, chain },
      ChainNotSupported.name,
    );
  }
}

export class ParamsInvalid extends ConnextError {
  constructor(context: any = {}) {
    super("Params for `execute` call were invalid.", context, ParamsInvalid.name);
  }
}

export class ContractDeploymentMissing extends ConnextError {
  public static contracts = {
    connext: "Connext",
  };

  constructor(contract: Values<typeof ContractDeploymentMissing.contracts>, chain: number, context: any = {}) {
    super(
      `Could not find ${contract} contract deployment address for this chain`,
      { chainId: chain, ...context },
      ContractDeploymentMissing.name,
    );
  }
}
