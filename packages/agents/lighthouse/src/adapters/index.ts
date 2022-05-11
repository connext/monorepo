import { RequestContext } from "@connext/nxtp-utils";

import { send } from "./relayer/gelato";

export type Relayer = {
  send: (
    chainId: number,
    destinationAddress: string,
    encodedData: string,
    _requestContext: RequestContext,
  ) => Promise<string>;
};

export const setupRelayer = async (): Promise<Relayer> => {
  return {
    send,
  };
};
