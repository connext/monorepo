import { TAddress, TDecimalString, TIntegerString } from ".";
import { Type, Static } from "@sinclair/typebox";

export enum CrossChainTxStatus {
  XCalled = "XCalled",
  Executed = "Executed",
  Reconciled = "Reconciled",
}

export const CrossChainTxSchema = Type.Object({
  // Meta
  originDomain: Type.String(),
  destinationDomain: Type.String(),
  status: Type.Enum(CrossChainTxStatus),

  // Transfer Data
  to: TAddress,
  transferId: Type.String(),
  callTo: Type.String(),
  callData: Type.String(),
  idx: TIntegerString,
  nonce: Type.Number(),
  router: TAddress,

  // XCalled
  xcalledCaller: TAddress,
  xcalledTransferringAmount: TIntegerString,
  xcalledLocalAmount: TIntegerString,
  xcalledTransferringAsset: TAddress,
  xcalledLocalAsset: TAddress,

  // XCalled
  xcalledTransactionHash: Type.Optional(Type.String()),
  xcalledTimestamp: Type.Optional(Type.Number()),
  xcalledGasPrice: Type.Optional(TIntegerString),
  xcalledGasLimit: Type.Optional(TIntegerString),
  xcalledBlockNumber: Type.Optional(Type.Number()),

  // Executed
  executedCaller: Type.Optional(TAddress),
  executedTransferringAmount: Type.Optional(TIntegerString),
  executedLocalAmount: Type.Optional(TIntegerString),
  executedTransferringAsset: Type.Optional(TAddress),
  executedLocalAsset: Type.Optional(TAddress),

  // Executed
  executedTransactionHash: Type.Optional(Type.String()),
  executedTimestamp: Type.Optional(Type.Number()),
  executedGasPrice: Type.Optional(TIntegerString),
  executedGasLimit: Type.Optional(TIntegerString),
  executedBlockNumber: Type.Optional(Type.Number()),
});
export type CrossChainTx = Static<typeof CrossChainTxSchema>;

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
  index: Type.Number(),
  transferId: Type.String(),
  proof: Type.Array(Type.String()),
  relayerSignature: Type.String(),
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

export type FulfilledTransaction = {
  router: string;
  amount: string;
  externalHash: string;
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
