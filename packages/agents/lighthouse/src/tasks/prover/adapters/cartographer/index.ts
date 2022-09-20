import { XMessage, RootMessage } from "@connext/nxtp-utils";

import { getUnProcessedMessages, getSentRootMessages, getUnProcessedRootMessages } from "./cartographer";

export type Cartographer = {
  getUnProcessedMessages: () => Promise<XMessage[]>;
  getSentRootMessages: () => Promise<RootMessage[]>;
  getUnProcessedRootMessages: () => Promise<RootMessage[]>;
};

export const setupCartographer = async (): Promise<Cartographer> => {
  return {
    getUnProcessedMessages,
    getSentRootMessages,
    getUnProcessedRootMessages,
  };
};
