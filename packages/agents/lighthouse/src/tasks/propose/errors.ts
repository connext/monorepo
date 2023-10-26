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
export class NoMerkleTreeAddress extends NxtpError {
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

export class LatestPropagatedSnapshot extends NxtpError {
  constructor(
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`Latest propagated snapshot not available for hub domain`, {
      ...context,
      requestContext,
      methodContext,
    });
  }
}
export class NoRootTimestamp extends NxtpError {
  constructor(
    public readonly aggregateRoot: string,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`No propagated_timestamp available for snapshot with aggregate root ${aggregateRoot}`, {
      ...context,
      requestContext,
      methodContext,
    });
  }
}
