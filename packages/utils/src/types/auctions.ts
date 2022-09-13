import { Type, Static } from "@sinclair/typebox";

import { TAddress, TIntegerString } from "./primitives";

export const BidSchema = Type.Object({
  routerVersion: Type.String(),
  transferId: Type.String(), // The Transfer ID.
  origin: Type.String(), // Origin domain of the transfer. Needed for sequencer to confirm transfer is valid.
  router: TAddress, // The address of the router sending this bid.
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

/// -------------------------------------------------------------------------------------------------
