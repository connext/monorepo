import { XMessage, SentRootMessage, ProcessedRootMessage } from "@connext/nxtp-utils";

import { getUnProcessedMessages, getSentRootMessages, getProcessedRootMessages } from "./cartographer";

export type Cartographer = {
  getUnProcessedMessages: () => Promise<XMessage[]>;
  getSentRootMessages: () => Promise<SentRootMessage[]>;
  getProcessedRootMessages: () => Promise<ProcessedRootMessage[]>;
};

export const setupCartographer = async (): Promise<Cartographer> => {
  return {
    getUnProcessedMessages,
    getSentRootMessages,
    getProcessedRootMessages,
  };
};
