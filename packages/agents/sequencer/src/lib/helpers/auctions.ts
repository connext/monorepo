import { Bid, ExecuteArgs, OriginTransfer } from "@connext/nxtp-utils";
import { constants } from "ethers";

import { getContext } from "../../sequencer";
import { RoundInvalid } from "../errors";

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
      callback: transfer.xparams.callback ?? constants.AddressZero,
      callbackFee: transfer.xparams.callbackFee ?? "0",
      forceSlow: transfer.xparams.forceSlow,
      receiveLocal: transfer.xparams.receiveLocal,
      recovery: transfer.xparams.recovery,
    },
    local,
    routers: bids.map((b) => b.router),
    routerSignatures: bids.map((b) => b.signatures[bids.length.toString()]),
    amount: transfer.origin.assets.bridged.amount,
    nonce: transfer.nonce,
    originSender: transfer.origin.xcall.caller,
    relayerFee: transfer.origin.xcall.relayerFee,
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

/**
 * Picks up the valid bids and groups the bids by round
 * @param bids - The array of raw bids
 * @param roundDepth - The maximum round which is allowed in the sequencer
 * @returns roundId -> array of bids
 */
export const getBidsRoundMap = (bids: Record<string, Bid>, roundDepth: number): Record<string, Bid[]> => {
  const availableBids: Record<string, Bid[]> = {};
  // Sanity checks and pick up valid bid combinations
  for (let roundIdx = 1; roundIdx <= roundDepth; roundIdx++) {
    const filteredBids = Object.values(bids).filter((bid) => {
      return Array.from(Object.keys(bid.signatures)).includes(roundIdx.toString());
    });

    // We need 2 ^ (roundIdx - 1) of different bids at least for roundIdx
    if (filteredBids.length >= getMinimumBidsCountForRound(roundIdx)) {
      availableBids[roundIdx] = filteredBids;
    }
  }

  return availableBids;
};

/**
 * Calculates the minimum number of bids for the round
 * round 1 -> amount / 1, round 2 -> amount / 2, round 3 -> amount / 4, round4 -> amount / 8
 * @param round The round id to calculate the minimum number of bids for
 * @returns - The number of bids
 */
export const getMinimumBidsCountForRound = (round: number): number => {
  const { config } = getContext();
  if (round < 1 || round > config.auctionRoundDepth || Math.trunc(round) != round) {
    throw new RoundInvalid({ round, auctionRoundDepth: config.auctionRoundDepth });
  }
  return Math.pow(2, round - 1);
};
