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

export class RelayerProxyHubNotFound extends NxtpError {
  constructor(
    public readonly hubDomain: string,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`RelayerProxyHub not found for domain ${hubDomain}`, {
      ...context,
      requestContext,
      methodContext,
    });
  }
}

export class NoProviderForDomain extends NxtpError {
  constructor(
    public readonly domain: string,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`No provider availble for domain ${domain}`, {
      ...context,
      requestContext,
      methodContext,
    });
  }
}

export class NoHubConnector extends NxtpError {
  constructor(
    public readonly chainId: number,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`No hub connector found for chainId ${chainId}`, {
      ...context,
      requestContext,
      methodContext,
    });
  }
}

export class NoSpokeConnector extends NxtpError {
  constructor(
    public readonly chainId: number,
    public readonly requestContext: RequestContext,
    public readonly methodContext: MethodContext,
    public readonly context: any = {},
  ) {
    super(`No spoke connector found for chainId ${chainId}`, {
      ...context,
      requestContext,
      methodContext,
    });
  }
}
