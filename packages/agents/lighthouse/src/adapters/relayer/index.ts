import { Logger, RequestContext } from "@connext/nxtp-utils";

import { getRelayerAddress, send } from "./gelato";

export type Relayer = {
  getRelayerAddress: (chainId: number, logger: Logger) => Promise<string>;
  send: (
    chainId: number,
    destinationAddress: string,
    encodedData: string,
    gelatoApiKey: string,
    logger: Logger,
    _requestContext?: RequestContext,
  ) => Promise<string>;
};

export const setupRelayer = async (): Promise<Relayer> => {
  return {
    getRelayerAddress,
    send,
  };
};
