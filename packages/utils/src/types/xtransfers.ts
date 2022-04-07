import { Type, Static } from "@sinclair/typebox";

import { TAddress, TDecimalString, TIntegerString } from ".";

export enum XTransferStatus {
  XCalled = "XCalled",
  Executed = "Executed",
  Reconciled = "Reconciled",
}

export const XTransferMethodCallSchema = Type.Object({
  caller: TAddress,
  transferringAmount: TIntegerString,
  localAmount: TIntegerString,
  transferringAsset: TAddress,
  localAsset: TAddress,
  transactionHash: Type.String(),
  timestamp: Type.Number(),
  gasPrice: TIntegerString,
  gasLimit: TIntegerString,
  blockNumber: Type.Number(),
});

export const XTransferSchema = Type.Object({
  // Meta
  originDomain: Type.String(),
  destinationDomain: Type.String(),
  status: Type.Enum(XTransferStatus),

  // Transfer Data
  to: TAddress,
  transferId: Type.String(),
  callTo: Type.String(),
  callData: Type.String(),
  idx: Type.Optional(TIntegerString),
  nonce: TIntegerString,
  router: Type.Optional(TAddress),

  // XCalled
  xcall: Type.Optional(XTransferMethodCallSchema),

  // Executed
  execute: Type.Optional(XTransferMethodCallSchema),

  // Reconciled
  reconcile: Type.Optional(XTransferMethodCallSchema),
});
export type XTransfer = Static<typeof XTransferSchema>;

export const CallParamsSchema = Type.Object({
  to: TAddress,
  callData: Type.String(),
  originDomain: Type.String(),
  destinationDomain: Type.String(),
});

export type CallParams = Static<typeof CallParamsSchema>;

export const ExecuteArgsSchema = Type.Object({
  params: CallParamsSchema,
  local: TAddress,
  routers: Type.Array(TAddress),
  feePercentage: TDecimalString,
  amount: TDecimalString,
  nonce: Type.Integer(),
  relayerSignature: Type.String(),
  originSender: TAddress,
});

export type ExecuteArgs = Static<typeof ExecuteArgsSchema>;

// Bids should omit the routers field, since the sequencer will determine this based on
// the auction round (i.e. in the event of multipath transfers, will be multiple routers' bids).
export const BidDataSchema = Type.Omit(ExecuteArgsSchema, ["routers"]);

export type BidData = Static<typeof BidDataSchema>;

export const BidSchema = Type.Object({
  transferId: Type.String(),
  data: BidDataSchema,
  router: TAddress,
  // Which auction round this is - which determines how many router(s) the sequencer may split this
  // transfer between.
  round: Type.Integer(),
});

export type Bid = Static<typeof BidSchema>;

export type ExternalCall = {
  to: string;
  callData: string;
};

export type ReconciledTransaction = {
  externalHash: string;
  local: string;
  amount: string;
  recipient: string;
};

export enum BidStatus {
  Pending = "Pending",
  Sent = "Sent",
}

export type SignedBid = {
  bid: Bid;
  // NOTE: Signature should only be for [transferId, router, round].
  signature: string;
};

export type StoredBid = {
  payload: Bid;
  status: BidStatus;
  lastUpdate: number;
};
