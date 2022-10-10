import { NxtpError, Values } from "@connext/nxtp-utils";

export class DecodeExecuteError extends NxtpError {
  constructor(context: any = {}) {
    super("Failed to decode execute function data.", context, DecodeExecuteError.name);
  }
}

export class ChainNotSupported extends NxtpError {
  constructor(chain: number, context: any = {}) {
    super(
      "Relayer does not support relaying transactions on this chain.",
      { ...context, chain },
      ChainNotSupported.name,
    );
  }
}

export class ParamsInvalid extends NxtpError {
  constructor(context: any = {}) {
    super("Params for `execute` call were invalid.", context, ParamsInvalid.name);
  }
}

export class ContractDeploymentMissing extends NxtpError {
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
