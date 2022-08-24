import { getGelatoRelayerAddress } from "@connext/nxtp-utils";

import { existsSync, readFileSync } from "./shared";

export const getHelpers = () => {
  return {
    relayer: {
      getGelatoRelayerAddress,
    },
    shared: {
      existsSync,
      readFileSync,
    },
  };
};
