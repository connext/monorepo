import { Bid, ExecuteArgs, OriginTransfer } from "@connext/nxtp-utils";

import { getContext } from "../../sequencer";

export const encodeExecuteFromBids = (bids: Bid[], transfer: OriginTransfer, local: string): string => {
  const {
    adapters: { contracts },
  } = getContext();
  // Sanity check.
  if (!transfer.origin) {
    throw new Error("XTransfer provided did not have XCall present!");
  }

  // Format arguments from XTransfer.
  const args: ExecuteArgs = {
    params: {
      originDomain: transfer.originDomain,
      destinationDomain: transfer.destinationDomain,
      to: transfer.xparams.to,
      callData: transfer.xparams.callData,
      forceSlow: transfer.xparams.forceSlow,
      receiveLocal: transfer.xparams.receiveLocal,
    },
    local,
    routers: bids.map((b) => b.router),
    routerSignatures: bids.map((b) => b.signatures[bids.length.toString()]),
    amount: transfer.origin.assets.bridged.amount,
    nonce: transfer.nonce,
    originSender: transfer.origin.xcall.caller,
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

  const canonicalId = sendingDomainAsset!.canonicalId;

  const destinationDomainAsset = await subgraph.getAssetByCanonicalId(_destinationDomain, canonicalId);

  const localAddress = destinationDomainAsset!.local;
  return localAddress;
};
