import { Bid, ExecuteArgs, XTransfer } from "@connext/nxtp-utils";

import { getContext } from "../../sequencer";

export const encodeExecuteFromBids = (bids: Bid[], transfer: XTransfer, local: string): string => {
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
    local,
    routers: bids.map((b) => b.router),
    routerSignatures: bids.map((b) => b.signatures[bids.length.toString()]),
    amount: transfer.xcall.localAmount,
    nonce: transfer.nonce,
    originSender: transfer.xcall.caller,
  };
  return contracts.connext.encodeFunctionData("execute", [args]);
};

/**
 * Returns local asset address on destination domain corresponding to local asset on origin domain
 *
 * @param _originDomain
 * @param _originLocalAsset The asset sent over the bridge
 * @param _destinationDomain
 * @returns
 */
export const getDestinationLocalAsset = async (
  _originDomain: string,
  _originLocalAsset: string,
  _destinationDomain: string,
): Promise<string> => {
  const {
    adapters: { subgraph },
  } = getContext();

  // get canonical asset from orgin domain.
  const sendingDomainAsset = await subgraph.getAssetByLocal(_originDomain, _originLocalAsset);

  const canonicalId = sendingDomainAsset!.canonicalId as string;

  const destinationDomainAsset = await subgraph.getAssetByCanonicalId(Number(_destinationDomain), canonicalId);

  const localAddress = destinationDomainAsset!.local;
  return localAddress;
};
