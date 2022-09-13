import { XMessage } from "@connext/nxtp-utils";

import { getUnProcessedMessages } from "./cartographer";

export type Cartographer = {
  getUnProcessedMessages: () => Promise<XMessage[]>;
};

export const setupCartographer = async (): Promise<Cartographer> => {
  return {
    getUnProcessedMessages,
  };
};
