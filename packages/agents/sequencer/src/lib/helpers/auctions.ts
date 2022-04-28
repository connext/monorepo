import { Bid, ExecuteArgs, XTransfer } from "@connext/nxtp-utils";

import { getContext } from "../../sequencer";

export const encodeExecuteFromBids = (bids: Bid[], transfer: XTransfer): string => {
  const {
    adapters: { contracts },
  } = getContext();
  // Sanity check.
  if (!transfer.xcall) {
    throw new Error("XTransfer provided did not have XCall present!");
  }
  // Format arguments from XTransfer.
  const args: ExecuteArgs = {
    params: {
      originDomain: transfer.originDomain,
      destinationDomain: transfer.destinationDomain,
      to: transfer.to,
      callData: transfer.callData,
    },
    local: transfer.xcall.localAsset,
    routers: bids.map((b) => b.router),
    routerSignatures: bids.map((b) => b.signatures[bids.length.toString()]),
    amount: transfer.xcall.localAmount,
    nonce: transfer.nonce,
    originSender: transfer.xcall.caller,
  };
  return contracts.connext.encodeFunctionData("execute", [args]);
};
