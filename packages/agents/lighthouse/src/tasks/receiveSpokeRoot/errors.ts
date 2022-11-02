import { MethodContext, NxtpError, RequestContext } from "@connext/nxtp-utils";

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
