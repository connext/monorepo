import { Type, Static } from "@sinclair/typebox";

import { AuctionHeaderSchema, BidSchema } from "./auctions";
// import { ExecuteArgsSchema, CallParamsSchema } from "./xtransfers";
import { TAddress, TDecimalString } from "./primitives";

/// MARK - Sequencer API ----------------------------------------------------------------------------
// TODO: Bid Data is a temporary solution - routers supply the execution args needed for sequencer to encode
// data for `execute` call. Should be replaced by having the sequencer use the subgraph to get the data needed.

// Bids should omit the routers field, since the sequencer will determine this based on the auction round, (i.e.
// in the event of multipath transfers, will be multiple routers' bids).
// TODO: Nested schema references are not working here (specifically)... not sure why.
// -> seeing TypeError: Cannot read properties of undefined (reading 'modifier')
// export const BidDataSchema = Type.Omit(ExecuteArgsSchema, ["routers"]);
export const BidDataSchema = Type.Object({
  params: Type.Object({
    to: TAddress,
    callData: Type.String(),
    originDomain: Type.String(),
    destinationDomain: Type.String(),
  }),
  local: Type.String(),
  feePercentage: TDecimalString,
  amount: TDecimalString,
  nonce: Type.Integer(),
  relayerSignature: Type.String(),
  originSender: TAddress,
});

export type BidData = Static<typeof BidDataSchema>;

export const AuctionsApiPostBidReqSchema = Type.Object({
  transferId: Type.String(),
  // TODO: See Bid Data TODO above. This should be deprecated.
  data: BidDataSchema,
  bid: BidSchema,
});

export type AuctionsApiPostBidReq = Static<typeof AuctionsApiPostBidReqSchema>;

export type AuctionsApiGetAuctionStatusRes = {
  bids: number; // Number of bids that have been received.
  status: string; // The AuctionStatus for a given transfer (“none” | “queued” | “sent” | “executed”).
  attempts: number; // Number of times we’ve sent a meta tx to the relayer (in case multiple attempts needed).
  taskId: string; // Gelato task ID if transfer is “sent”.
  timestamps: {
    start: string; // When the auction started (first bid arrived).
    sent: string; // When we last sent a meta tx to the relayer.
  };
};

/// MARK - Router API -------------------------------------------------------------------------------
