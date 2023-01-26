import { MethodContext, ConnextError, RequestContext } from "@connext/utils";

export class NoChainIdForHubDomain extends ConnextError {
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

export class RelayerProxyHubNotFound extends ConnextError {
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

export class NoProviderForDomain extends ConnextError {
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

export class NoHubConnector extends ConnextError {
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

export class NoSpokeConnector extends ConnextError {
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
