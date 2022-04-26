import { ExecuteArgs, XTransfer } from "@connext/nxtp-utils";

import { getContext } from "../../sequencer";

export const encodeExecuteFromBid = (routers: string[], transfer: XTransfer): string => {
  const {
    adapters: { contracts },
  } = getContext();
  // Sanity check.
  if (!transfer.xcall) {
    throw new Error("XTransfer provided did not have XCall present!");
  }
  // Format arguments from XTransfer.
  const args: ExecuteArgs = {
    nonce: transfer.nonce,
    routers: routers,
    params: {
      originDomain: transfer.originDomain,
      destinationDomain: transfer.destinationDomain,
      to: transfer.callTo,
      callData: transfer.callData,
    },
    local: transfer.xcall.localAsset,
    amount: transfer.xcall.localAmount,
    originSender: transfer.xcall.caller,
  };
  return contracts.connext.encodeFunctionData("execute", [args]);
};
