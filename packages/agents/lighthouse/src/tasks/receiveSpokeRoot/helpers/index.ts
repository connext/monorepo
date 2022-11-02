import { RequestContext } from "@connext/nxtp-utils";

export { getReceiveFromOptimismArgs } from "./optimism";
export { getReceiveFromPolygonArgs } from "./polygon";

export type GetReceiveArgsParams = {
  spokeChainId: number;
  hubChainId: number;
  spokeDomainId: string;
  hubDomainId: string;
  spokeProvider: string;
  hubProvider: string;
  sendHash: string;
  _requestContext: RequestContext;
};
