import { RequestContext } from "@connext/nxtp-utils";

import { send, getRelayerAddress } from "./relayer/gelato";

export type Relayer = {
  send: (
    chainId: number,
    destinationAddress: string,
    encodedData: string,
    gelatoApiKey: string,
    _requestContext: RequestContext,
  ) => Promise<string>;
  getRelayerAddress: (chainId: number) => Promise<string>;
};

export const setupRelayer = async (): Promise<Relayer> => {
  return {
    send,
    getRelayerAddress,
  };
};
