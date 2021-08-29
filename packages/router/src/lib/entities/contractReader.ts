import { CrosschainTransaction, TransactionData } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { TransactionStatus as SdkTransactionStatus } from "../../adapters/subgraph/graphqlsdk";

export type ContractReader = {
  getActiveTransactions: () => Promise<ActiveTransaction<any>[]>;
  getTransactionForChain: (
    transactionId: string,
    user: string,
    chainId: number,
  ) => Promise<SingleChainTransaction | undefined>;

  /**
   *
   * Returns available liquidity for the given asset on the TransactionManager on the provided chain.
   *
   * @param assetId - The asset you want to determine router liquidity of
   * @param chainId - The chain you want to determine liquidity on
   * @returns The available balance
   */
  getAssetBalance: (assetId: string, chainId: number) => Promise<BigNumber>;
  getSyncRecord: (chainId: number) => SubgraphSyncRecord;
};

export const CrosschainTransactionStatus = {
  SenderPrepared: "SenderPrepared",
  SenderExpired: "SenderExpired",
  ReceiverNotConfigured: "ReceiverNotConfigured",
  ReceiverFulfilled: "ReceiverFulfilled",
  ReceiverCancelled: "ReceiverCancelled",
  ReceiverExpired: "ReceiverExpired",
} as const;

export type TCrosschainTransactionStatus = typeof CrosschainTransactionStatus[keyof typeof CrosschainTransactionStatus];

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

export type CrosschainTransactionPayload = {
  [CrosschainTransactionStatus.SenderPrepared]: PreparePayload & {
    senderPreparedHash: string;
  };
  [CrosschainTransactionStatus.SenderExpired]: Record<string, never>;
  [CrosschainTransactionStatus.ReceiverNotConfigured]: Record<string, never>;
  [CrosschainTransactionStatus.ReceiverFulfilled]: FulfillPayload & {
    receiverFulfilledHash: string;
  };
  [CrosschainTransactionStatus.ReceiverCancelled]: CancelPayload & {
    receiverCancelledHash: string;
  };
  [CrosschainTransactionStatus.ReceiverExpired]: Record<string, never>;
};

export type ActiveTransaction<T extends TCrosschainTransactionStatus> = {
  status: T;
  crosschainTx: CrosschainTransaction;
  payload: CrosschainTransactionPayload[T];
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

export type SubgraphSyncRecord = { synced: boolean; latestBlock: number; syncedBlock: number };
