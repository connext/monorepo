import { RequestContext } from "@connext/nxtp-utils";

export { getProcessFromOptimismRootArgs } from "./optimism";
export { getProcessFromPolygonRootArgs } from "./polygon";
export { getProcessFromGnosisRootArgs } from "./gnosis";

export type GetProcessArgsParams = {
  spokeChainId: number;
  hubChainId: number;
  spokeDomainId: string;
  hubDomainId: string;
  spokeProvider: string;
  hubProvider: string;
  sendHash: string;
  _requestContext: RequestContext;
};
