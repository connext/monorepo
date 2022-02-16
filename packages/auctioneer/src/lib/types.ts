import { Wallet, BigNumberish } from "ethers";
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

export type BidParams = {
  recipient: string,
  callTo: string,
  callData: "0x",
  originDomain: string,
  destinationDomain: string,
};

export type Bid = {
  params: BidParams,
  asset: string,
  amount: BigNumberish
};

export type SignedBid = {
  bid: Bid,
  signature: string
}

export type GelatoSendBid = {
  chainId: number,
  dest: string,
  data: string,
  token: string,
  relayerFee: string
}

export type Cache = {
  nxtpId: string,
  bid: SignedBid
}

export type BatchJob = (transactions: MetaTransaction[]) => Promise<void>;

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
