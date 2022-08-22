import { RequestContext } from "@connext/nxtp-utils";

import { send } from "./sequencer";

export type Sequencer = {
  send: (
    transferId: string,
    origin: string,
    relayerFee: { amount: string; asset: string },
    encodedData: string,
    _requestContext: RequestContext,
  ) => Promise<string>;
};

export const setupSequencer = async (): Promise<Sequencer> => {
  return {
    send,
  };
};
