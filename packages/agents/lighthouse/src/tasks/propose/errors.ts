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
    super(`No MerkleTreeManager for domain ${hubDomain}`, {
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

export class LatestFinalizedSnapshot extends NxtpError {
  constructor(
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`Latest finalized snapshot not available on hub domain`, {
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

export class AggregateRootDuplicated extends NxtpError {
  constructor(
    public readonly aggregateRoot: string,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`Trying to send the same aggregateRoot: ${aggregateRoot}`, {
      ...context,
      requestContext,
      methodContext,
    });
  }
}

export class AggregateRootChecksFailed extends NxtpError {
  constructor(
    public readonly aggregateRoot: string,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`Root checks failed for aggregate root ${aggregateRoot}`, {
      ...context,
      requestContext,
      methodContext,
    });
  }
}

export class WaitTimeNotCompleted extends NxtpError {
  constructor(
    public readonly domain: string,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`Wait time not completed for ${domain}`, {
      ...context,
      requestContext,
      methodContext,
    });
  }
}

export class TooManySafeRoots extends NxtpError {
  constructor(
    public readonly snapshotRoots: string[],
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`Too many safe roots in proposal ${snapshotRoots}`, {
      ...context,
      requestContext,
      methodContext,
    });
  }
}
