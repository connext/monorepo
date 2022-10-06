import { RootMessage } from "@connext/nxtp-utils";

import { getUnProcessedRootMessages } from "./database";

export type DbClient = {
  getUnProcessedRootMessages: () => Promise<RootMessage[]>;
};

export const setupDbClient = async () => {
  return { getUnProcessedRootMessages };
};
