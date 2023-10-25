import { MethodContext, NxtpError, RequestContext } from "@connext/nxtp-utils";

export class NoChainIdForDomain extends NxtpError {
  constructor(
    public readonly hubDomain: string,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`ChainId not available for domain ${hubDomain}`, {
      ...context,
      requestContext,
      methodContext,
    });
  }
}

export class NoSpokeConnector extends NxtpError {
  constructor(
    public readonly hubDomain: string,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`No spokeconnector for domain ${hubDomain}`, {
      ...context,
      requestContext,
      methodContext,
    });
  }
}

export class MissingRequiredDomain extends NxtpError {
  constructor(
    public readonly domain: string,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`Config not available for domain ${domain}`, {
      ...context,
      requestContext,
      methodContext,
    });
  }
}

export class NoSnapshotRoot extends NxtpError {
  constructor(
    public readonly domain: string,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`Snapshot root not available for domain ${domain}`, {
      ...context,
      requestContext,
      methodContext,
    });
  }
}

export class NoSpokeOptimisticRoot extends NxtpError {
  constructor(
    public readonly domain: string,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`SpokeOptimisticRoot not available for domain ${domain}`, {
      ...context,
      requestContext,
      methodContext,
    });
  }
}
