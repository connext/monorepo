import { BidData } from "@connext/nxtp-utils";

import { getContext } from "../../sequencer";

export const encodeExecuteFromBid = (routers: string[], bidData: BidData): string => {
  const {
    adapters: { contracts },
  } = getContext();
  return contracts.connext.encodeFunctionData("execute", [
    {
      ...bidData,
      routers,
    },
  ]);
};
