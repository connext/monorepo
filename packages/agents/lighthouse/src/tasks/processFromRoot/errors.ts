import { MethodContext, NxtpError, RelayerType, RequestContext } from "@connext/nxtp-utils";

export class NoRootAvailable extends NxtpError {
  constructor(
    public readonly spokeChain: number,
    public readonly hubChain: number,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`Data not yet available on hub network ${hubChain} from spoke ${spokeChain}`, {
      ...context,
      spokeChain,
      hubChain,
      requestContext,
      methodContext,
    });
  }
}

// export class MultipleHashesDetected extends NxtpError {
//   constructor(
//     public readonly spokeChain: number,
//     public readonly hubChain: number,
//     public readonly requestContext: RequestContext,
//     public readonly methodContext: MethodContext,
//     public readonly context: any = {},
//   ) {
//     super(`Multiple messages detected for the same hash`, {
//       ...context,
//       spokeChain,
//       hubChain,
//       requestContext,
//       methodContext,
//     });
//   }
// }

export class NoProofForMessage extends NxtpError {
  constructor(
    public readonly spokeChain: number,
    public readonly hubChain: number,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`No proof available for message`, {
      ...context,
      spokeChain,
      hubChain,
      requestContext,
      methodContext,
    });
  }
}

export class ProcessConfigNotAvailable extends NxtpError {
  constructor(
    public readonly spokeDomain: string,
    public readonly hubDomain: string,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`Process config not available for spoke ${spokeDomain} and hub ${hubDomain}`, {
      ...context,
      spokeDomain,
      hubDomain,
      requestContext,
      methodContext,
    });
  }
}

export class ConfirmDataDoesNotMatch extends NxtpError {
  constructor(public readonly confirmData: string, public readonly encoded: string, public readonly context: any = {}) {
    super(`Confirm data does not match`, {
      ...context,
      confirmData,
      encoded,
    });
  }
}

export class RollUpNodeStaked extends NxtpError {
  constructor(
    public readonly stakerCount: number,
    public readonly childStakerCount: number,
    public readonly context: any = {},
  ) {
    super(`Arbitrum rollup node staked!!`, {
      ...context,
      stakerCount,
      childStakerCount,
    });
  }
}

export class CouldNotFindRelayer extends NxtpError {
  constructor(public readonly relayerType: RelayerType, public readonly context: any = {}) {
    super(`Could not find relayer with type ${relayerType}`, {
      ...context,
      relayerType,
    });
  }
}

export class AlreadyProcessed extends NxtpError {
  constructor(
    public readonly spokeDomain: number,
    public readonly hubDomain: number,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`Aleady processed for spoke ${spokeDomain} and hub ${hubDomain}`, {
      ...context,
      spokeDomain,
      hubDomain,
      requestContext,
      methodContext,
    });
  }
}
