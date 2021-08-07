import { CrosschainTransaction, TransactionData } from "@connext/nxtp-utils";

import { TransactionStatus as SdkTransactionStatus } from "../../adapters/subgraph/graphqlsdk";

export enum TransactionStatus {
  SenderPrepared,
  SenderFulfilled,
  SenderCancelled,
  ReceiverPrepared,
  ReceiverFulfilled,
  ReceiverCancelled,
}

export type ActiveTransaction = {
  status: TransactionStatus;
  crosschainTx: CrosschainTransaction;
  encryptedCallData: string;
  encodedBid: string;
  bidSignature: string;
  signature?: string; // only there when fulfilled or cancelled
  relayerFee?: string; // only there when fulfilled or cancelled
  callData?: string; // only there when fulfilled
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
