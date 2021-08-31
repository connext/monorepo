import {
  TChainId,
  TAddress,
  TIntegerString,
  TransactionDataSchema,
  PrepareParams,
  TransactionPreparedEvent,
  TransactionFulfilledEvent,
  TransactionCancelledEvent,
  CrosschainTransaction,
} from "@connext/nxtp-utils";
import { Type, Static } from "@sinclair/typebox";
import { providers } from "ethers";

export const CrossChainParamsSchema = Type.Object({
  callData: Type.Optional(Type.RegEx(/^0x[a-fA-F0-9]*$/)),
  sendingChainId: TChainId,
  sendingAssetId: TAddress,
  receivingChainId: TChainId,
  receivingAssetId: TAddress,
  callTo: Type.Optional(TAddress),
  receivingAddress: TAddress,
  amount: TIntegerString,
  expiry: Type.Optional(Type.Number()),
  transactionId: Type.Optional(Type.RegEx(/^0x[a-fA-F0-9]{64}$/)),
  slippageTolerance: Type.Optional(Type.String()),
  dryRun: Type.Optional(Type.Boolean()),
  preferredRouter: Type.Optional(TAddress),
});

export type CrossChainParams = Static<typeof CrossChainParamsSchema>;

export const AuctionBidParamsSchema = Type.Object({
  user: TAddress,
  router: TAddress,
  sendingChainId: TChainId,
  sendingAssetId: TAddress,
  amount: TIntegerString,
  receivingChainId: TChainId,
  receivingAssetId: TAddress,
  amountReceived: TIntegerString,
  receivingAddress: TAddress,
  transactionId: Type.RegEx(/^0x[a-fA-F0-9]{64}$/),
  expiry: Type.Number(),
  callDataHash: Type.RegEx(/^0x[a-fA-F0-9]{64}$/),
  callTo: TAddress,
  encryptedCallData: Type.String(),
  sendingChainTxManagerAddress: TAddress,
  receivingChainTxManagerAddress: TAddress,
  bidExpiry: Type.Number(),
});

export type AuctionBidParams = Static<typeof AuctionBidParamsSchema>;

export const TransactionPrepareEventSchema = Type.Object({
  txData: TransactionDataSchema,
  encryptedCallData: Type.String(),
  encodedBid: Type.String(),
  bidSignature: Type.String(),
});

export type TransactionPrepareEventParams = Static<typeof TransactionPrepareEventSchema>;

export const CancelSchema = Type.Object({
  txData: TransactionDataSchema,
  relayerFee: Type.String(),
  signature: Type.String(),
});

export type CancelParams = Static<typeof CancelSchema>;

export const NxtpSdkEvents = {
  SenderTokenApprovalSubmitted: "SenderTokenApprovalSubmitted",
  SenderTokenApprovalMined: "SenderTokenApprovalMined",
  SenderTransactionPrepareSubmitted: "SenderTransactionPrepareSubmitted",
  SenderTransactionPrepared: "SenderTransactionPrepared",
  SenderTransactionFulfilled: "SenderTransactionFulfilled",
  SenderTransactionCancelled: "SenderTransactionCancelled",
  ReceiverPrepareSigned: "ReceiverPrepareSigned",
  ReceiverTransactionPrepared: "ReceiverTransactionPrepared",
  ReceiverTransactionFulfilled: "ReceiverTransactionFulfilled",
  ReceiverTransactionCancelled: "ReceiverTransactionCancelled",
} as const;
export type NxtpSdkEvent = typeof NxtpSdkEvents[keyof typeof NxtpSdkEvents];

export type SenderTokenApprovalSubmittedPayload = {
  assetId: string;
  chainId: number;
  transactionResponse: providers.TransactionResponse;
};

export type SenderTokenApprovalMinedPayload = {
  assetId: string;
  chainId: number;
  transactionReceipt: providers.TransactionReceipt;
};

export type SenderTransactionPrepareSubmittedPayload = {
  prepareParams: PrepareParams;
  transactionResponse: providers.TransactionResponse;
};

export type ReceiverPrepareSignedPayload = {
  signature: string;
  signer: string;
  transactionId: string;
};

export type SdkEvent<T> = T & {
  transactionHash: string;
};

export type SenderTransactionPreparedPayload = SdkEvent<TransactionPreparedEvent>;
export type SenderTransactionFulfilledPayload = SdkEvent<TransactionFulfilledEvent>;
export type SenderTransactionCancelledPayload = SdkEvent<TransactionCancelledEvent>;
export type ReceiverTransactionPreparedPayload = SdkEvent<TransactionPreparedEvent>;
export type ReceiverTransactionFulfilledPayload = SdkEvent<TransactionFulfilledEvent>;
export type ReceiverTransactionCancelledPayload = SdkEvent<TransactionCancelledEvent>;

export interface NxtpSdkEventPayloads {
  [NxtpSdkEvents.SenderTokenApprovalSubmitted]: SenderTokenApprovalSubmittedPayload;
  [NxtpSdkEvents.SenderTokenApprovalMined]: SenderTokenApprovalMinedPayload;
  [NxtpSdkEvents.SenderTransactionPrepareSubmitted]: SenderTransactionPrepareSubmittedPayload;
  [NxtpSdkEvents.SenderTransactionPrepared]: SenderTransactionPreparedPayload;
  [NxtpSdkEvents.SenderTransactionFulfilled]: SenderTransactionFulfilledPayload;
  [NxtpSdkEvents.SenderTransactionCancelled]: SenderTransactionCancelledPayload;
  [NxtpSdkEvents.ReceiverPrepareSigned]: ReceiverPrepareSignedPayload;
  [NxtpSdkEvents.ReceiverTransactionPrepared]: ReceiverTransactionPreparedPayload;
  [NxtpSdkEvents.ReceiverTransactionFulfilled]: ReceiverTransactionFulfilledPayload;
  [NxtpSdkEvents.ReceiverTransactionCancelled]: ReceiverTransactionCancelledPayload;
}

export const HistoricalTransactionStatus = {
  FULFILLED: "FULFILLED",
  CANCELLED: "CANCELLED",
} as const;
export type THistoricalTransactionStatus = typeof HistoricalTransactionStatus[keyof typeof HistoricalTransactionStatus];

export type HistoricalTransaction = {
  status: THistoricalTransactionStatus;
  crosschainTx: CrosschainTransaction;
  preparedTimestamp: number;
  fulfilledTxHash?: string;
};

export type ActiveTransaction = {
  crosschainTx: CrosschainTransaction;
  status: NxtpSdkEvent;
  bidSignature: string;
  encodedBid: string;
  encryptedCallData: string;
  preparedTimestamp: number;
};

export type SubgraphSyncRecord = { synced: boolean; latestBlock: number; syncedBlock: number };
