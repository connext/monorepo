import { Wallet, BigNumberish } from "ethers";
import {
  AuctionBid,
  ChainData,
  FulfillParams,
  InvariantTransactionData,
  RouterNxtpNatsMessagingService,
  VariantTransactionData,
} from "@connext/nxtp-utils";
import { Logger } from "@connext/nxtp-utils";
import { TransactionService } from "@connext/nxtp-txservice";

// import { WatchtowerConfig } from "../config";
// import { BatchExecutionHandler } from "../utils";
// import { StoreManager, SubgraphReader } from "../adapters";

// /// MARK - App
// export type AppContext = {
//   logger: Logger;
//   wallet: Wallet;
//   peripherals: {
//     subgraph: SubgraphReader;
//     txservice: TransactionService;
//     messaging: RouterNxtpNatsMessagingService;
//     store: StoreManager;
//   };
//   chainData: Map<string, ChainData>;
//   config: WatchtowerConfig;
// };

// export type BindingsContext = AppContext & {
//   supportedChains: {
//     [chain: number]: {
//       batchHandlers: {
//         [id: string]: BatchExecutionHandler;
//       };
//       batchGasLimit: number;
//       multicallContractAddress: string;
//       transactionManagerAddress: string;
//     };
//   };
//   operations: {
//     encodeData: (
//       chain: number,
//       fulfillParams: FulfillParams,
//       signature: string,
//       routerRelayerFeeAsset: string,
//       routerRelayerFee: string,
//     ) => Promise<MetaTransaction>;
//     sendBatch: (transactions: MetaTransaction[]) => Promise<void>;
//     userSurrogateSign: (
//       entity: ReceiverPreparedTransactionEntity,
//     ) => Promise<{ signature: string; relayerFee: string }>;
//   };
// };

export enum TransactionType {
  SenderPrepare = "SenderPrepare",
  SenderFulfill = "SenderFulfill",
  ReceiverPrepare = "ReceiverPrepare",
  ReceiverFulfill = "ReceiverFulfill",
}

export enum TransactionStatus {
  Prepared = "Prepared",
  Fulfilled = "Fulfilled",
  Reconcilled = "Reconcilled",
}

// A transaction that is executable on-chain using the data property.
export type MetaTransaction = {
  transactionId: string;
  // We store type and expiry for lookup and storage in batches.
  type: TransactionType;
  expiry: number;
  // These values are used to submit this meta tx within a batch.
  chain: number;
  to: string;
  data: string;
  gasLimit: number;
};

export type Bid = {
  data: string;
}

export type Cache = {
  nxtpId: string,
  bid: Bid
}

export type BatchJob = (transactions: MetaTransaction[]) => Promise<void>;

export type BatchSendCondition = {
  ttl?: number;
  gasLimit: number;
};

export type BatchExecution = {
  nonce: number; // The nonce of the job in relation to all batch send job history.
  createTimestamp: number; // Timestamp when the batch send job was created.
  executeTimestamp?: number; // Timestamp when the batch send job was executed.
  size: number; // Size of the batch in # of transactions.
  condition: BatchSendCondition; // The condition under which the batch was or will be sent.
};



export type Batch = {
  id: string; // ID is any string preferred to the consumer.
  chain: number;
  transactions: Record<string, MetaTransaction>; // Mapping of transactions by transaction ID.
  history: BatchExecution[]; // Stack of batch executions in order of occurrence.
};

export type StoreChainEntry = {
  batches: {
    [id: string]: Batch;
  };
};

export type Store = {
  [chain: number]: StoreChainEntry;
};

/// MARK - Subgraph
// Convenience format of the Transaction entity stored in subgraph.
export type CoreTransactionEntity = {
  variant: VariantTransactionData;
  invariant: InvariantTransactionData;
  relayerFee: BigNumberish;
  encryptedCallData: string;
};

// A Transaction entity that has both sending and receiving chains prepared.
export type ReceiverPreparedTransactionEntity = {
  decodedBid: AuctionBid;
  receiverPrepareHash: string;
} & CoreTransactionEntity;

// A Transaction entity that has receiving chain fulfilled.
export type ReceiverFulfilledTransactionEntity = {
  receiverFulfillHash: string;
} & ReceiverPreparedTransactionEntity;

// A Transaction entity that *should* have either a receiving chain cancellation or be
// past expiry.
export type CancelledTransactionEntity = {
  receiverCancelHash?: string;
} & CoreTransactionEntity;

/// MARK - API
// Formats for API response values.
export type GetBatchApiResponse = {
  current: {
    id: string;
    size: number;
    ttl: number;
    createTimestamp?: number;
    executeTimestamp?: number;
  };
  average: {
    count: number;
    period: number;
    size: number;
  };
};

export type GetTransactionApiResponse = {
  transaction: Omit<MetaTransaction, "data">;
  batch: {
    id: string;
    size: number;
  };
};
