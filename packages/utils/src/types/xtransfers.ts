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
  xcall: XTransferMethodCallSchema,

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
  router: TAddress,
  feePercentage: TDecimalString,
  amount: TDecimalString,
  nonce: Type.Number(),
  relayerSignature: Type.String(),
  originSender: TAddress,
});

export type ExecuteArgs = Static<typeof ExecuteArgsSchema>;

export const BidSchema = Type.Object({
  transferId: Type.String(),
  data: ExecuteArgsSchema,
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
  signature: string;
};

export type StoredBid = {
  payload: Bid;
  status: BidStatus;
  lastUpdate: number;
};
