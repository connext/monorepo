import { Type, Static } from "@sinclair/typebox";

import { BidSchema } from "./auctions";
import { NxtpErrorJsonSchema } from "./error";
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

export const AuctionsApiBidResponseSchema = Type.Object({
  message: Type.String(),
  transferId: Type.String(),
  bid: BidSchema,
  error: Type.Optional(NxtpErrorJsonSchema),
});
export type AuctionsApiBidResponse = Static<typeof AuctionsApiBidResponseSchema>;

export const AuctionsApiGetAuctionsStatusResponseSchema = Type.Object({
  bids: Type.Array(BidSchema),
  status: Type.String(),
  attempts: Type.Optional(Type.Number()),
  taskId: Type.Optional(Type.String()),
  timestamps: Type.Object({
    start: Type.String(),
    sent: Type.Optional(Type.String()),
  }),
});

export type AuctionsApiGetAuctionStatusResponse = Static<typeof AuctionsApiGetAuctionsStatusResponseSchema>;

export const AuctionsApiGetQueuedResponseSchema = Type.Object({
  queued: Type.Array(Type.String()),
});

export type AuctionsApiGetQueuedResponse = Static<typeof AuctionsApiGetQueuedResponseSchema>;

export const AuctionsApiErrorResponseSchema = Type.Object({
  message: Type.String(),
  error: Type.Optional(NxtpErrorJsonSchema),
});
export type AuctionsApiErrorResponse = Static<typeof AuctionsApiErrorResponseSchema>;

/// MARK - Router API -------------------------------------------------------------------------------
