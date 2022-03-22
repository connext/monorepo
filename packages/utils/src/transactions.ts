import { TAddress, TDecimalString, TIntegerString } from "./basic";
import { Type, Static } from "@sinclair/typebox";

export enum CrossChainTxStatus {
  Prepared = "Prepared",
  Fulfilled = "Fulfilled",
  Reconciled = "Reconciled",
}

export const CrossChainTxSchema = Type.Object({
  // Meta
  originDomain: Type.String(),
  destinationDomain: Type.String(),
  status: Type.Enum(CrossChainTxStatus),

  // Transfer Data
  nonce: Type.Number(),
  transactionId: Type.String(),
  recipient: TAddress,
  router: TAddress,

  // Prepared
  prepareCaller: TAddress,
  prepareTransactingAmount: TIntegerString,
  prepareLocalAmount: TIntegerString,
  prepareTransactingAsset: TAddress,
  prepareLocalAsset: TAddress,
  callTo: TAddress,
  callData: Type.String(),

  // TransactionPrepared
  prepareTransactionHash: Type.Optional(Type.String()),
  prepareTimestamp: Type.Optional(Type.Number()),
  prepareGasPrice: Type.Optional(TIntegerString),
  prepareGasLimit: Type.Optional(TIntegerString),
  prepareBlockNumber: Type.Optional(Type.Number()),

  // Fulfill
  fulfillCaller: Type.Optional(TAddress),
  fulfillTransactingAmount: Type.Optional(TIntegerString),
  fulfillLocalAmount: Type.Optional(TIntegerString),
  fulfillTransactingAsset: Type.Optional(TAddress),
  fulfillLocalAsset: Type.Optional(TAddress),

  // TransactionFulfilled
  fulfillTransactionHash: Type.Optional(Type.String()),
  fulfillTimestamp: Type.Optional(Type.Number()),
  fulfillGasPrice: Type.Optional(TIntegerString),
  fulfillGasLimit: Type.Optional(TIntegerString),
  fulfillBlockNumber: Type.Optional(Type.Number()),

  // Reconciled
  externalCallHash: Type.Optional(Type.String()),
  reconciledTransactionHash: Type.Optional(Type.String()),
  reconciledTimestamp: Type.Optional(Type.Number()),
  reconciledGasPrice: Type.Optional(TIntegerString),
  reconciledGasLimit: Type.Optional(TIntegerString),
  reconciledBlockNumber: Type.Optional(Type.Number()),
});
export type CrossChainTx = Static<typeof CrossChainTxSchema>;

export const CallParamsSchema = Type.Object({
  recipient: TAddress,
  callTo: TAddress,
  callData: Type.String(),
  originDomain: Type.String(),
  destinationDomain: Type.String(),
});

export type CallParams = Static<typeof CallParamsSchema>;

export const FulfillArgsSchema = Type.Object({
  params: CallParamsSchema,
  local: TAddress,
  router: TAddress,
  feePercentage: TDecimalString,
  index: Type.Number(),
  amount: TDecimalString,
  transactionId: Type.String(),
  proof: Type.Array(Type.String()),
  relayerSignature: Type.String(),
});

export type FulfillArgs = Static<typeof FulfillArgsSchema>;

export const BidSchema = Type.Object({
  transactionId: Type.String(),
  data: FulfillArgsSchema,
});

export type Bid = Static<typeof BidSchema>;

export type ExternalCall = {
  recipient: string;
  callTo: string;
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
