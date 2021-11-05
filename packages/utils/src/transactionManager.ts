import { Type, Static } from "@sinclair/typebox";

import { TIntegerString, TAddress, TChainId } from "./basic";

// Used to include *all* info for both sending and receiving crosschain data
export const InvariantTransactionDataSchema = Type.Object({
  receivingChainCondition: TAddress,
  sendingChainCondition: TAddress,
  receivingChainTxManagerAddress: TAddress,
  user: TAddress,
  router: TAddress,
  initiator: TAddress,
  sendingAssetId: TAddress,
  receivingAssetId: TAddress,
  sendingChainFallback: TAddress,
  callTo: TAddress,
  receivingAddress: TAddress,
  sendingChainId: TChainId,
  receivingChainId: TChainId,
  callDataHash: Type.RegEx(/^0x[a-fA-F0-9]{64}$/),
  transactionId: Type.RegEx(/^0x[a-fA-F0-9]{64}$/),
  encodedConditionData: Type.RegEx(/^0x[a-fA-F0-9]*/),
});

// Direct matching of Contract types.
export type InvariantTransactionData = Static<typeof InvariantTransactionDataSchema>;

export const VariantTransactionDataSchema = Type.Object({
  amount: TIntegerString,
  expiry: Type.Number(),
  preparedBlockNumber: Type.Number(),
});

export type VariantTransactionData = Static<typeof VariantTransactionDataSchema>;

export const TransactionDataSchema = Type.Intersect([InvariantTransactionDataSchema, VariantTransactionDataSchema]);

export type TransactionData = Static<typeof TransactionDataSchema>;

export const SignedCancelDataSchema = Type.Object({
  invariantDigest: Type.String(),
  relayerFee: TIntegerString,
  cancel: Type.RegEx(/cancel/), // just the string "cancel"
});

export const CrosschainTransactionSchema = Type.Object({
  invariant: InvariantTransactionDataSchema,
  sending: VariantTransactionDataSchema,
  receiving: Type.Optional(VariantTransactionDataSchema),
});

export type CrosschainTransaction = Static<typeof CrosschainTransactionSchema>;

export type SignedCancelData = Static<typeof SignedCancelDataSchema>;

export const SignedFulfillDataSchema = Type.Object({
  invariantDigest: Type.String(),
  relayerFee: TIntegerString,
});

export type SignedFulfillData = Static<typeof SignedFulfillDataSchema>;

// Functions
export type PrepareParams = {
  txData: InvariantTransactionData;
  amount: string;
  expiry: number;
  encryptedCallData: string;
  encodedBid: string;
  bidSignature: string;
};

export type FulfillParams = {
  txData: TransactionData;
  relayerFee: string;
  unlockData: string;
  callData: string;
};

export type CancelParams = {
  txData: TransactionData;
  unlockData: string;
};

// Events
export const TransactionPreparedEventSchema = Type.Object({
  txData: TransactionDataSchema,
  caller: Type.Optional(TAddress),
  encryptedCallData: Type.String(),
  encodedBid: Type.String(),
  bidSignature: Type.String(),
});

export type TransactionPreparedEvent = Static<typeof TransactionPreparedEventSchema>;

export type TransactionFulfilledEvent = {
  txData: TransactionData;
  unlockData: string;
  relayerFee: string;
  callData: string;
  caller: string;
};

export type TransactionCancelledEvent = {
  txData: TransactionData;
  caller: string;
};
