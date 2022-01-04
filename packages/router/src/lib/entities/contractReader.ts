import { CrosschainTransaction, TransactionData } from "@connext/nxtp-utils";

import { TransactionStatus as SdkTransactionStatus } from "../../adapters/subgraph/runtime/graphqlsdk";

export const CrosschainTransactionStatus = {
  SenderPrepared: "SenderPrepared",
  SenderExpired: "SenderExpired",
  ReceiverNotConfigured: "ReceiverNotConfigured",
  ReceiverFulfilled: "ReceiverFulfilled",
  ReceiverCancelled: "ReceiverCancelled",
  ReceiverExpired: "ReceiverExpired",
} as const;

export type TCrosschainTransactionStatus = typeof CrosschainTransactionStatus[keyof typeof CrosschainTransactionStatus];

export type Tracker = {
  chainId: number;
  status: TCrosschainTransactionStatus | "Processing";
  block: number;
};

export type ActiveTransactionsTracker = {
  status: string;
  transactionsId: string;
  sendingChainId: number;
  receivingChainId: number;
};

export type PreparePayload = {
  encryptedCallData: string;
  encodedBid: string;
  bidSignature: string;
};

export type CancelPayload = Record<string, never>;

export type FulfillPayload = {
  signature: string;
  relayerFee: string;
  callData: string;
};

export type TransactionHashes = {
  prepareHash: string;
  cancelHash?: string;
  fulfillHash?: string;
};

export type CrosschainTransactionPayload = {
  [CrosschainTransactionStatus.SenderPrepared]: PreparePayload;
  [CrosschainTransactionStatus.SenderExpired]: Record<string, never>;
  [CrosschainTransactionStatus.ReceiverNotConfigured]: Record<string, never>;
  [CrosschainTransactionStatus.ReceiverFulfilled]: FulfillPayload;
  [CrosschainTransactionStatus.ReceiverCancelled]: CancelPayload;
  [CrosschainTransactionStatus.ReceiverExpired]: Record<string, never>;
};

export type ActiveTransaction<T extends TCrosschainTransactionStatus> = {
  status: T;
  crosschainTx: CrosschainTransaction;
  payload: {
    hashes: {
      sending?: TransactionHashes;
      // ^ optional if receiver prepared w.o sender or sender subgraph behind
      receiving?: TransactionHashes;
    };
  } & CrosschainTransactionPayload[T];
};

export type SingleChainTransaction = {
  status: SdkTransactionStatus;
  txData: TransactionData;
  encryptedCallData: string;
  encodedBid: string;
  bidSignature: string;
  signature?: string; // only there when fulfilled or cancelled
  relayerFee?: string; // only there when fulfilled or cancelled
};
