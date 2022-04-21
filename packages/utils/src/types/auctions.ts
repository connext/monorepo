import { Type, Static } from "@sinclair/typebox";

import { TAddress, TDecimalString, TIntegerString } from "./primitives";

export const BidSchema = Type.Object({
  router: TAddress,
  fee: TDecimalString, // Router % fee.
  // Array indexed by auction round (determines how many router(s) the sequencer may split the transfer between).
  signatures: Type.Record(TIntegerString, Type.String()),
});

export type Bid = Static<typeof BidSchema>;

// Content router needs to sign for on-chain proof that they agreed to supply fast liq. for this transfer.
export type BidSignatureDigest = {
  transferId: string;
  round: number;
  fee: string;
};

/// MARK - Auctions Cache Types ---------------------------------------------------------------------
export enum AuctionStatus {
  None = "None",
  Queued = "Queued",
  Sent = "Sent",
  Executed = "Executed",
}

// Auction metadata, reflected in the header for auctions API and the auction cache.
export const AuctionHeaderSchema = Type.Object({
  // Timestamp of auction start.
  timestamp: Type.String(),
  // Origin domain of transfer.
  origin: Type.String(),
  // Destination domain of transfer.
  destination: Type.String(),
});

export type AuctionHeader = Static<typeof AuctionHeaderSchema>;

// Auction type - used for caching.
export type Auction = AuctionHeader & {
  bids: {
    [router: string]: Bid;
  };
};

// Record of important data for an auction's meta tx.
export type AuctionTask = {
  // Timestamp of when execution meta tx was sent.
  timestamp: string;
  // Gelato task ID.
  // NOTE: Will need to be replaced with a more generic solution when we support relayer aggregation.
  taskId: string;
  // Number of meta tx attempts sent. Should be 1 in 99% of cases.
  attempts: number;
};
/// -------------------------------------------------------------------------------------------------
